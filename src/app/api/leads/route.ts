import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/email/send-email";
import { createNotionPipelineLead, updateNotionPipelineLead } from "@/lib/notion";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, city, projectType, sports, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Split name into first/last
    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    const supabase = createServerClient();

    // Check for duplicate by email
    const { data: existing } = await supabase
      .from("leads")
      .select("id, notion_page_id")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      // Update existing lead with new info rather than creating a dupe
      await supabase
        .from("leads")
        .update({
          phone: phone || undefined,
          city: city || undefined,
          project_type: projectType && projectType !== "" ? projectType : undefined,
          sports: sports?.length ? sports : undefined,
          notes: message && message !== ""
            ? `Website form (updated): ${message}`
            : undefined,
        })
        .eq("id", existing.id);

      // Sync to Notion (awaited — must complete before response)
      const notionFields = {
        phone: phone || undefined,
        city: city || undefined,
        projectType: projectType && projectType !== "" ? projectType : undefined,
        sports: sports?.length ? sports : undefined,
        message: message && message !== "" ? `Website form (updated): ${message}` : undefined,
      };

      try {
        if (existing.notion_page_id) {
          await updateNotionPipelineLead(existing.notion_page_id, notionFields);
        } else {
          const notionPageId = await createNotionPipelineLead({
            name: name.trim(),
            firstName,
            lastName: lastName || undefined,
            email,
            ...notionFields,
            supabaseId: existing.id,
          });
          if (notionPageId) {
            await supabase
              .from("leads")
              .update({ notion_page_id: notionPageId })
              .eq("id", existing.id);
            console.log("[leads/route] Notion sync (dedup) OK:", notionPageId);
          }
        }
      } catch (err) {
        console.error("[leads/route] Notion sync (dedup) failed:", err);
      }

      return NextResponse.json({ success: true, id: existing.id, updated: true });
    }

    // Create new lead
    const { data: lead, error } = await supabase
      .from("leads")
      .insert({
        first_name: firstName,
        last_name: lastName || null,
        display_name: name.trim(),
        email,
        phone: phone || null,
        city: city || null,
        deal_stage: "new_lead",
        lead_source: "website",
        lead_source_detail: "contact form",
        project_type: projectType && projectType !== "" ? projectType : null,
        sports: sports?.length ? sports : [],
        form_type: "step1",
        notes: message && message !== "" ? `Website form: ${message}` : null,
      })
      .select("id")
      .single();

    if (error) {
      console.error("[leads/route] Supabase insert error:", JSON.stringify(error));
      return NextResponse.json(
        { error: "Failed to save lead", detail: error.message },
        { status: 500 }
      );
    }

    // Run emails + Notion sync in parallel, all awaited before response
    const assessmentUrl = `https://www.procourtsurfaces.com/assessment/${lead.id}`;
    const projectLabel = projectType ? projectType.replace(/_/g, " ") : "Not specified";
    const sportsLabel = sports?.length ? sports.join(", ") : "Not specified";

    const [, , notionResult] = await Promise.allSettled([
      // Welcome email to lead
      sendEmail({
        to: email,
        from: "Patrick Johnson <patrick@procourtsurfaces.com>",
        subject: "Quick follow up",
        text: `Hey ${firstName},

Got your info — I'll follow up within 24 hours with next steps.

If you have 2 minutes, this helps me prep a better estimate for you:
${assessmentUrl}

If it's urgent, call me directly at (512) 893-0466.

Talk soon,
Patrick`,
      }),
      // Notify Patrick of new lead
      sendEmail({
        to: "patrick@procourtsurfaces.com",
        from: "Pro Court Surfaces <quotes@procourtsurfaces.com>",
        subject: `New Lead: ${name.trim()}`,
        text: `- Name: ${name.trim()}
- Email: ${email}
- Phone: ${phone || "Not provided"}
- City: ${city || "Not provided"}
- Project Type: ${projectLabel}
- Sports: ${sportsLabel}
- Notes: ${message || "None"}`,
      }),
      // Sync to Notion Pipeline (awaited — not fire-and-forget)
      createNotionPipelineLead({
        name: name.trim(),
        firstName,
        lastName: lastName || undefined,
        email,
        phone: phone || undefined,
        city: city || undefined,
        projectType: projectType || undefined,
        sports: sports?.length ? sports : undefined,
        message: message || undefined,
        supabaseId: lead.id,
      }),
    ]);

    // Save Notion page ID back to Supabase
    if (notionResult.status === "fulfilled" && notionResult.value) {
      await supabase
        .from("leads")
        .update({ notion_page_id: notionResult.value })
        .eq("id", lead.id);
      console.log("[leads/route] Notion sync OK:", notionResult.value);
    } else if (notionResult.status === "rejected") {
      console.error("[leads/route] Notion sync failed:", notionResult.reason);
    }

    return NextResponse.json({ success: true, id: lead.id });
  } catch (err) {
    console.error("[leads/route] Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
