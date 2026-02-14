"use server";

import { createServerClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import type { LineItemToggle, ColorSelections } from "./quote-calculator";

type AcceptPayload = {
  quote_id: string;
  package_id: string;
  customer_name: string;
  customer_email: string;
  toggled_line_items: LineItemToggle[];
  color_selections: ColorSelections;
  total_price: number;
};

export async function acceptQuote(payload: AcceptPayload) {
  const supabase = createServerClient();

  // Insert quote_selections record
  const { error: selectionError } = await supabase
    .from("quote_selections")
    .insert({
      quote_id: payload.quote_id,
      selected_package_id: payload.package_id,
      customer_name: payload.customer_name,
      customer_email: payload.customer_email,
      toggled_line_items: payload.toggled_line_items,
      color_inside_id: payload.color_selections.inside_id,
      color_outside_id: payload.color_selections.outside_id,
      color_lines_id: payload.color_selections.lines_id,
      total_price: payload.total_price,
    });

  if (selectionError) {
    return { success: false, error: selectionError.message };
  }

  // Update quote status to accepted
  const { error: updateError } = await supabase
    .from("quotes")
    .update({
      status: "accepted",
      accepted_at: new Date().toISOString(),
    })
    .eq("id", payload.quote_id);

  if (updateError) {
    return { success: false, error: updateError.message };
  }

  // Log acceptance activity (fire-and-forget)
  logQuoteActivity(payload.quote_id, "accepted", {
    package_id: payload.package_id,
    customer_name: payload.customer_name,
    customer_email: payload.customer_email,
  });

  return { success: true };
}

export async function logQuoteActivity(
  quote_id: string,
  event_type: string,
  data?: Record<string, unknown>
) {
  try {
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
    const userAgent = headersList.get("user-agent") ?? null;

    const supabase = createServerClient();
    await supabase.from("quote_activity_log").insert({
      quote_id,
      event_type,
      data: data ?? {},
      ip_address: ip,
      user_agent: userAgent,
    });
  } catch {
    // Fire-and-forget — don't let logging failures break the flow
  }
}
