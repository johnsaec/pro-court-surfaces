const NOTION_API_KEY = process.env.NOTION_API_KEY;
const PIPELINE_DB_ID = "2706eb69ce9180b0800dcc3e3660fbb5";

async function fetchWithRetry(
  url: string,
  options: RequestInit,
  maxRetries = 2
): Promise<Response> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      // Retry on 5xx or 429 (rate limit)
      if ((response.status >= 500 || response.status === 429) && attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 500; // 500ms, 1000ms
        console.warn(`[notion] Retry ${attempt + 1}/${maxRetries} after ${response.status}, waiting ${delay}ms`);
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }
      return response;
    } catch (err) {
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 500;
        console.warn(`[notion] Retry ${attempt + 1}/${maxRetries} after fetch error, waiting ${delay}ms`);
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }
      throw err;
    }
  }
  // Unreachable, but TypeScript needs it
  throw new Error("[notion] Max retries exceeded");
}

export async function createNotionPipelineLead(lead: {
  name: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  city?: string;
  projectType?: string;
  sports?: string[];
  message?: string;
  dealStage?: string;
  supabaseId: string;
}): Promise<string | null> {
  if (!NOTION_API_KEY) {
    console.warn("[notion] NOTION_API_KEY not set, skipping Notion sync");
    return null;
  }

  const properties: Record<string, unknown> = {
    Name: {
      title: [{ text: { content: lead.name } }],
    },
    "Deal Stage": {
      select: { name: notionDealStage(lead.dealStage) || "New Lead" },
    },
    "Lead Source": {
      multi_select: [{ name: "Website" }],
    },
  };

  if (lead.firstName) {
    properties["First Name"] = {
      rich_text: [{ text: { content: lead.firstName } }],
    };
  }
  if (lead.lastName) {
    properties["Last Name"] = {
      rich_text: [{ text: { content: lead.lastName } }],
    };
  }
  if (lead.email) {
    properties["Email"] = { email: lead.email };
  }
  if (lead.phone) {
    properties["Phone Number"] = { phone_number: lead.phone };
  }
  if (lead.city) {
    properties["City"] = {
      rich_text: [{ text: { content: lead.city } }],
    };
  }
  if (lead.projectType) {
    properties["Project Type"] = {
      rich_text: [{ text: { content: lead.projectType } }],
    };
  }
  if (lead.sports?.length) {
    properties["Sports"] = {
      multi_select: lead.sports.map((s) => ({
        name: s.charAt(0).toUpperCase() + s.slice(1),
      })),
    };
  }

  const notes: string[] = [];
  if (lead.message) notes.push(lead.message);
  notes.push(`Supabase ID: ${lead.supabaseId}`);

  properties["Notes"] = {
    rich_text: [{ text: { content: notes.join("\n") } }],
  };

  properties["Lead Created At"] = {
    date: { start: new Date().toISOString().split("T")[0] },
  };

  const response = await fetchWithRetry("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${NOTION_API_KEY}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify({
      parent: { database_id: PIPELINE_DB_ID },
      properties,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error("[notion] Failed to create Pipeline lead:", err);
    return null;
  }

  const data = await response.json();
  return data.id as string;
}

// Maps Supabase `deal_stage` enum values to the Notion "Deal Stage" select
// option names. Notion has no "Converted" option, so a converted lead (accepted
// quote → customer) maps to the closest terminal win state, "Won".
const DEAL_STAGE_TO_NOTION: Record<string, string> = {
  cold: "Cold",
  new_lead: "New Lead",
  qualified_lead: "Qualified Lead",
  proposal_stage: "Proposal Stage",
  proposal_sent: "Proposal Sent",
  buyer_interested: "Buyer Interested",
  won: "Won",
  lost: "Lost",
  converted: "Won",
};

export function notionDealStage(dealStage: string | null | undefined): string | undefined {
  if (!dealStage) return undefined;
  return DEAL_STAGE_TO_NOTION[dealStage];
}

export async function updateNotionPipelineLead(
  notionPageId: string,
  fields: {
    phone?: string;
    city?: string;
    projectType?: string;
    sports?: string[];
    message?: string;
    dealStage?: string;
  }
): Promise<boolean> {
  if (!NOTION_API_KEY) {
    console.warn("[notion] NOTION_API_KEY not set, skipping Notion update");
    return false;
  }

  const properties: Record<string, unknown> = {};

  if (fields.dealStage) {
    const stage = notionDealStage(fields.dealStage);
    if (stage) {
      properties["Deal Stage"] = { select: { name: stage } };
    }
  }
  if (fields.phone) {
    properties["Phone Number"] = { phone_number: fields.phone };
  }
  if (fields.city) {
    properties["City"] = {
      rich_text: [{ text: { content: fields.city } }],
    };
  }
  if (fields.projectType) {
    properties["Project Type"] = {
      rich_text: [{ text: { content: fields.projectType } }],
    };
  }
  if (fields.sports?.length) {
    properties["Sports"] = {
      multi_select: fields.sports.map((s) => ({
        name: s.charAt(0).toUpperCase() + s.slice(1),
      })),
    };
  }
  if (fields.message) {
    properties["Notes"] = {
      rich_text: [{ text: { content: fields.message } }],
    };
  }

  properties["Lead Updated At"] = {
    date: { start: new Date().toISOString().split("T")[0] },
  };

  if (Object.keys(properties).length === 1) return true; // only date, nothing to update

  const response = await fetchWithRetry(`https://api.notion.com/v1/pages/${notionPageId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${NOTION_API_KEY}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify({ properties }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error("[notion] Failed to update Pipeline lead:", err);
    return false;
  }

  return true;
}
