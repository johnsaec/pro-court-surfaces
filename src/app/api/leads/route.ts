import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/email/send-email";

export async function POST(req: NextRequest) {
  let leadId: string | null = null;

  try {
    const body = await req.json();
    const { name, email, phone, city, projectType, sports, message } = body;

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
- Notes: ${message || "None"}`,
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
