import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/email/send-email";
import { createNotionPipelineLead } from "@/lib/notion";

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
      .select("id")
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

    // Send plain text welcome email (don't block response on failure)
    const assessmentUrl = `https://www.procourtsurfaces.com/assessment/${lead.id}`;
    sendEmail({
      to: email,
      subject: `Thanks for reaching out, ${firstName} - Pro Court Surfaces`,
      text: `Hey ${firstName},

Thanks for reaching out to Pro Court Surfaces! I got your info and will follow up personally within 24 hours.

For immediate or urgent quotes, give me a call anytime: (512) 893-0466

Want to speed things up? Fill out a quick court assessment so I can give you a more accurate estimate right away:
${assessmentUrl}

Totally optional — I can gather everything when we talk. But if you have 2 minutes, it helps me prep a better quote for you.

In the meantime, check out some of our recent work:
https://www.procourtsurfaces.com/#portfolio

Patrick Johnson
Pro Court Surfaces - Founder
Austin, TX 78704
(512) 893-0466 | patrick@procourtsurfaces.com
www.procourtsurfaces.com`,
    }).catch((err) =>
      console.error("[leads/route] Welcome email failed:", err)
    );

    // Sync to Notion Pipeline (fire-and-forget)
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
    })
      .then(async (notionPageId) => {
        if (notionPageId) {
          await supabase
            .from("leads")
            .update({ notion_page_id: notionPageId })
            .eq("id", lead.id);
          console.log("[leads/route] Notion sync OK:", notionPageId);
        }
      })
      .catch((err) =>
        console.error("[leads/route] Notion sync failed:", err)
      );

    return NextResponse.json({ success: true, id: lead.id });
  } catch (err) {
    console.error("[leads/route] Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
