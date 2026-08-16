import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/email/send-email";

export async function POST(req: NextRequest) {
  let leadId: string | null = null;
  let leadSaved = false;
  let wasUpdate = false;
  let dbErrorMsg: string | null = null;

  // Parse + validate first — if we can't even read the payload, there's nothing to fall back to.
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { name, email, phone, city, projectType, sports, message, attribution } =
    body as {
      name?: string;
      email?: string;
      phone?: string;
      city?: string;
      projectType?: string;
      sports?: string[];
      message?: string;
      attribution?: Record<string, unknown>;
    };

  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required" },
      { status: 400 }
    );
  }

  const nameParts = name.trim().split(/\s+/);
  const firstName = nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

  // ── Step 1: Save to Supabase (best-effort) ──────────────────────────
  // A failure here must NOT lose the lead — we fall through to the email
  // notification so Patrick always gets the contact details.
  try {
    const supabase = createServerClient();

    const { data: existing } = await supabase
      .from("leads")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      const { error: updateError } = await supabase
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

      if (updateError) throw updateError;

      leadId = existing.id;
      leadSaved = true;
      wasUpdate = true;
    } else {
      // Build attribution fields for insert (if provided)
      const attr = attribution as Record<string, unknown> | undefined;
      const attrFields = attr
        ? {
            ft_source: attr.ft_source ?? null,
            ft_medium: attr.ft_medium ?? null,
            ft_campaign: attr.ft_campaign ?? null,
            ft_content: attr.ft_content ?? null,
            ft_term: attr.ft_term ?? null,
            ft_channel: attr.ft_channel ?? null,
            ft_referrer: attr.ft_referrer ?? null,
            ft_landing_page: attr.ft_landing_page ?? null,
            ft_click_id: attr.ft_click_id ?? null,
            ft_click_id_type: attr.ft_click_id_type ?? null,
            ft_timestamp: attr.ft_timestamp ?? null,
            lt_source: attr.lt_source ?? null,
            lt_medium: attr.lt_medium ?? null,
            lt_campaign: attr.lt_campaign ?? null,
            lt_content: attr.lt_content ?? null,
            lt_term: attr.lt_term ?? null,
            lt_channel: attr.lt_channel ?? null,
            lt_referrer: attr.lt_referrer ?? null,
            lt_landing_page: attr.lt_landing_page ?? null,
            lt_click_id: attr.lt_click_id ?? null,
            lt_click_id_type: attr.lt_click_id_type ?? null,
            lt_timestamp: attr.lt_timestamp ?? null,
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

      if (error) throw error;

      leadId = lead.id;
      leadSaved = true;
    }
  } catch (err) {
    // DB is down / paused / rejected the row. Do NOT bail — email the lead through.
    dbErrorMsg = err instanceof Error ? err.message : JSON.stringify(err);
    console.error("[leads/route] DB save failed, falling back to email:", dbErrorMsg);
  }

  // ── Step 2: Notify (always) ─────────────────────────────────────────
  // The admin notification is the safety net: even if the DB save failed,
  // Patrick still receives the lead and can follow up / add it manually.
  const projectLabel = projectType ? projectType.replace(/_/g, " ") : "Not specified";
  const sportsLabel = sports?.length ? sports.join(", ") : "Not specified";
  const attr = attribution as Record<string, unknown> | undefined;

  const adminWarning = leadSaved
    ? ""
    : `⚠️  NOT SAVED TO CRM — the database was unreachable, so this lead is ONLY in this email. Add it to the CRM manually and follow up.
DB error: ${dbErrorMsg}

`;

  const welcomeHtml = leadId
    ? `Hey ${firstName},<br><br>Got your info — I'll follow up within 24 hours with next steps.<br><br>If you have 2 minutes, this helps me prep a better estimate for you:<br><a href="https://www.procourtsurfaces.com/assessment/${leadId}">Complete your court assessment</a><br><br>If it's urgent, call me directly at (512) 893-0466.<br><br>Talk soon,<br>Patrick`
    : `Hey ${firstName},<br><br>Got your info — I'll follow up within 24 hours with next steps.<br><br>If it's urgent, call me directly at (512) 893-0466.<br><br>Talk soon,<br>Patrick`;

  const [welcomeResult, notifyResult] = await Promise.allSettled([
    sendEmail({
      to: email,
      from: "Patrick Johnson <patrick@procourtsurfaces.com>",
      subject: "Quick follow up",
      html: welcomeHtml,
    }),
    sendEmail({
      to: "patrick@procourtsurfaces.com",
      from: "Pro Court Surfaces <quotes@procourtsurfaces.com>",
      subject: `${leadSaved ? "New Lead" : "⚠️ New Lead (DB SAVE FAILED)"}: ${name.trim()}`,
      text: `${adminWarning}- Name: ${name.trim()}
- Email: ${email}
- Phone: ${phone || "Not provided"}
- City: ${city || "Not provided"}
- Project Type: ${projectLabel}
- Sports: ${sportsLabel}
- Notes: ${message || "None"}
- Channel: ${attr?.lt_channel || "direct"}
- Source: ${attr?.lt_source || "none"}
- Medium: ${attr?.lt_medium || "none"}
- Campaign: ${attr?.lt_campaign || "none"}`,
    }),
  ]);

  if (welcomeResult.status === "rejected") {
    console.error("[leads/route] Welcome email failed:", welcomeResult.reason);
  }
  if (notifyResult.status === "rejected") {
    console.error("[leads/route] Admin notification failed:", notifyResult.reason);
  }

  // ── Step 3: Respond ─────────────────────────────────────────────────
  if (leadSaved) {
    // Normal happy path (insert or update).
    return NextResponse.json({ success: true, id: leadId, updated: wasUpdate });
  }

  // DB failed. If we at least got the lead to Patrick by email, treat it as a
  // (degraded) success so the prospect isn't told to retry and doesn't bounce.
  if (notifyResult.status === "fulfilled") {
    console.error("[leads/route] Lead delivered by email only (not in CRM):", email);
    return NextResponse.json({ success: true, id: null, emailedOnly: true });
  }

  // Total failure: DB down AND we couldn't email. Now it's a real error.
  return NextResponse.json(
    { error: "Failed to save lead", detail: dbErrorMsg ?? "unknown" },
    { status: 500 }
  );
}
