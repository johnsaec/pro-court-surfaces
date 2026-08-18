import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { createNotionPipelineLead } from "@/lib/notion";
import { sendEmail } from "@/lib/email/send-email";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Cron job: syncs unprocessed leads to Notion (every 30 min).
// Only emails Patrick if leads were actually synced.
// Manual: GET /api/leads/sync-notion?key=pcs-sync-2026
export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");
  const authHeader = req.headers.get("authorization");
  const isVercelCron = authHeader === `Bearer ${process.env.CRON_SECRET}`;

  if (!isVercelCron && key !== "pcs-sync-2026") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServerClient();

  // Find leads not yet synced to Notion
  const { data: leads, error } = await supabase
    .from("leads")
    .select("id, display_name, first_name, last_name, email, phone, city, project_type, sports, notes, deal_stage")
    .is("notion_page_id", null)
    .order("created_at", { ascending: true })
    .limit(20);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!leads?.length) {
    return NextResponse.json({ message: "All leads synced", synced: 0 });
  }

  const results: { name: string; email: string; status: string }[] = [];

  for (const lead of leads) {
    try {
      // 1. Sync to Notion
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
        dealStage: lead.deal_stage || undefined,
        supabaseId: lead.id,
      });

      if (!notionPageId) {
        results.push({ name: lead.display_name, email: lead.email, status: "notion_failed" });
        continue;
      }

      // 2. Save Notion page ID
      await supabase
        .from("leads")
        .update({ notion_page_id: notionPageId })
        .eq("id", lead.id);

      results.push({ name: lead.display_name, email: lead.email, status: "ok" });
    } catch (err) {
      results.push({
        name: lead.display_name,
        email: lead.email,
        status: `error: ${err instanceof Error ? err.message : String(err)}`,
      });
    }
  }

  const synced = results.filter((r) => r.status === "ok");

  // 4. Email Patrick a summary
  if (synced.length > 0) {
    const summary = synced
      .map((r) => `- ${r.name} (${r.email})`)
      .join("\n");

    await sendEmail({
      to: "patrick@procourtsurfaces.com",
      from: "Pro Court Surfaces <quotes@procourtsurfaces.com>",
      subject: `${synced.length} new lead${synced.length > 1 ? "s" : ""} synced to Notion`,
      text: `The following lead${synced.length > 1 ? "s were" : " was"} synced to your Notion pipeline:\n\n${summary}\n\nView pipeline: https://www.notion.so/2706eb69ce9180b0800dcc3e3660fbb5`,
    });
  }

  return NextResponse.json({
    synced: synced.length,
    total: leads.length,
    results,
  });
}
