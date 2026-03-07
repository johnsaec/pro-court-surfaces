import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { createNotionPipelineLead } from "@/lib/notion";

export const dynamic = "force-dynamic";

// Catch-up endpoint: syncs any leads missing from Notion
// Call manually or via cron: GET /api/leads/sync-notion?key=YOUR_KEY
export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");
  const validKey = (process.env.NOTION_API_KEY || "").slice(-8);
  if (!key || key !== validKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServerClient();

  const { data: leads, error } = await supabase
    .from("leads")
    .select("id, display_name, first_name, last_name, email, phone, city, project_type, sports, notes")
    .is("notion_page_id", null)
    .order("created_at", { ascending: true })
    .limit(20);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!leads?.length) {
    return NextResponse.json({ message: "All leads synced", synced: 0 });
  }

  const results: { name: string; status: string; notionId?: string }[] = [];

  for (const lead of leads) {
    try {
      const notionPageId = await createNotionPipelineLead({
        name: lead.display_name || `${lead.first_name} ${lead.last_name}`.trim(),
        firstName: lead.first_name || undefined,
        lastName: lead.last_name || undefined,
        email: lead.email || undefined,
        phone: lead.phone || undefined,
        city: lead.city || undefined,
        projectType: lead.project_type || undefined,
        sports: lead.sports?.length ? lead.sports : undefined,
        message: lead.notes || undefined,
        supabaseId: lead.id,
      });

      if (notionPageId) {
        await supabase
          .from("leads")
          .update({ notion_page_id: notionPageId })
          .eq("id", lead.id);
        results.push({ name: lead.display_name, status: "ok", notionId: notionPageId });
      } else {
        results.push({ name: lead.display_name, status: "failed" });
      }
    } catch (err) {
      results.push({
        name: lead.display_name,
        status: `error: ${err instanceof Error ? err.message : String(err)}`,
      });
    }
  }

  return NextResponse.json({ synced: results.filter((r) => r.status === "ok").length, total: leads.length, results });
}
