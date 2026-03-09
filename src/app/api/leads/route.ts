import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/email/send-email";

export async function POST(req: NextRequest) {
  let leadId: string | null = null;

  try {
    const body = await req.json();
    const { name, email, phone, city, projectType, sports, message, attribution } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    const supabase = createServerClient();

    // ── Step 1: Save to Supabase (critical) ──────────────────────────
    const { data: existing } = await supabase
      .from("leads")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
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

      return NextResponse.json({ success: true, id: existing.id, updated: true });
    }

    // Build attribution fields for insert (if provided)
    const attrFields = attribution
      ? {
          ft_source: attribution.ft_source ?? null,
          ft_medium: attribution.ft_medium ?? null,
          ft_campaign: attribution.ft_campaign ?? null,
          ft_content: attribution.ft_content ?? null,
          ft_term: attribution.ft_term ?? null,
          ft_channel: attribution.ft_channel ?? null,
          ft_referrer: attribution.ft_referrer ?? null,
          ft_landing_page: attribution.ft_landing_page ?? null,
          ft_click_id: attribution.ft_click_id ?? null,
          ft_click_id_type: attribution.ft_click_id_type ?? null,
          ft_timestamp: attribution.ft_timestamp ?? null,
          lt_source: attribution.lt_source ?? null,
          lt_medium: attribution.lt_medium ?? null,
          lt_campaign: attribution.lt_campaign ?? null,
          lt_content: attribution.lt_content ?? null,
          lt_term: attribution.lt_term ?? null,
          lt_channel: attribution.lt_channel ?? null,
          lt_referrer: attribution.lt_referrer ?? null,
          lt_landing_page: attribution.lt_landing_page ?? null,
          lt_click_id: attribution.lt_click_id ?? null,
          lt_click_id_type: attribution.lt_click_id_type ?? null,
          lt_timestamp: attribution.lt_timestamp ?? null,
        }
      : {};

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
        ...attrFields,
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

    leadId = lead.id;

    // ── Step 2: Send emails (critical, awaited) ──────────────────────
    const assessmentUrl = `https://www.procourtsurfaces.com/assessment/${lead.id}`;
    const projectLabel = projectType ? projectType.replace(/_/g, " ") : "Not specified";
    const sportsLabel = sports?.length ? sports.join(", ") : "Not specified";

    const [welcomeResult, notifyResult] = await Promise.allSettled([
      sendEmail({
        to: email,
        from: "Patrick Johnson <patrick@procourtsurfaces.com>",
        subject: "Quick follow up",
        html: `Hey ${firstName},<br><br>Got your info — I'll follow up within 24 hours with next steps.<br><br>If you have 2 minutes, this helps me prep a better estimate for you:<br><a href="${assessmentUrl}">Complete your court assessment</a><br><br>If it's urgent, call me directly at (512) 893-0466.<br><br>Talk soon,<br>Patrick`,
      }),
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
- Notes: ${message || "None"}
- Channel: ${attribution?.lt_channel || "direct"}
- Source: ${attribution?.lt_source || "none"}
- Medium: ${attribution?.lt_medium || "none"}
- Campaign: ${attribution?.lt_campaign || "none"}`,
      }),
    ]);

    if (welcomeResult.status === "rejected") {
      console.error("[leads/route] Welcome email failed:", welcomeResult.reason);
    }
    if (notifyResult.status === "rejected") {
      console.error("[leads/route] Admin notification failed:", notifyResult.reason);
    }

    // Lead saved + emails sent. Notion handled by cron.
    return NextResponse.json({ success: true, id: lead.id });
  } catch (err) {
    console.error("[leads/route] Unexpected error:", err);
    // If we saved the lead but crashed on emails, it's still in Supabase
    if (leadId) {
      console.error("[leads/route] Lead was saved (id:", leadId, ") but post-save steps failed");
      return NextResponse.json({ success: true, id: leadId, partial: true });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
