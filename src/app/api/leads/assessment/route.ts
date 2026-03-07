import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { leadId, ...fields } = body;

    if (!leadId) {
      return NextResponse.json(
        { error: "Missing lead ID" },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Verify lead exists
    const { data: lead } = await supabase
      .from("leads")
      .select("id")
      .eq("id", leadId)
      .maybeSingle();

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    const updateData: Record<string, unknown> = {
      second_step_complete: true,
      form_type: "step2",
    };

    // Court details
    if (fields.squareFeet) updateData.square_feet = Number(fields.squareFeet);
    if (fields.numberOfCourts)
      updateData.number_of_courts = Number(fields.numberOfCourts);
    if (fields.courtAgeYears)
      updateData.court_age_years = Number(fields.courtAgeYears);
    if (fields.sports?.length) updateData.sports = fields.sports;

    // Condition
    if (fields.cracksPresent !== undefined)
      updateData.cracks_present = fields.cracksPresent;
    if (fields.crackLengthFt)
      updateData.crack_length_ft = Number(fields.crackLengthFt);
    if (fields.birdBathCount)
      updateData.bird_bath_count = Number(fields.birdBathCount);
    if (fields.blisteringBoiling !== undefined)
      updateData.blistering_boiling = fields.blisteringBoiling;
    if (fields.paintChipping !== undefined)
      updateData.paint_chipping = fields.paintChipping;

    // Concrete
    if (fields.broomFinish !== undefined)
      updateData.broom_finish = fields.broomFinish;
    if (fields.vaporBarrier === "yes") updateData.vapor_barrier = true;
    else if (fields.vaporBarrier === "no") updateData.vapor_barrier = false;
    if (fields.concretePourDate)
      updateData.concrete_pour_date = fields.concretePourDate;

    // Colors
    if (fields.colorInside) updateData.color_inside = fields.colorInside;
    if (fields.colorOutside) updateData.color_outside = fields.colorOutside;
    if (fields.colorLines) updateData.color_lines = fields.colorLines;

    // Add-ons
    if (fields.wantsBasketballLines !== undefined)
      updateData.wants_basketball_lines = fields.wantsBasketballLines;
    if (fields.wantsVolleyballLines !== undefined)
      updateData.wants_volleyball_lines = fields.wantsVolleyballLines;
    if (fields.wantsNet !== undefined) updateData.wants_net = fields.wantsNet;
    if (fields.wantsFence !== undefined)
      updateData.wants_fence = fields.wantsFence;
    if (fields.wantsLights !== undefined)
      updateData.wants_lights = fields.wantsLights;
    if (fields.interestedInFinancing !== undefined)
      updateData.interested_in_financing = fields.interestedInFinancing;

    // Notes (append, don't overwrite)
    if (fields.notes) {
      const { data: existing } = await supabase
        .from("leads")
        .select("notes")
        .eq("id", leadId)
        .single();

      updateData.notes = existing?.notes
        ? `${existing.notes}\n\nAssessment notes: ${fields.notes}`
        : `Assessment notes: ${fields.notes}`;
    }

    const { error } = await supabase
      .from("leads")
      .update(updateData)
      .eq("id", leadId);

    if (error) {
      console.error("[assessment] Supabase update error:", error.message);
      return NextResponse.json(
        { error: "Failed to save assessment" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[assessment] Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
