"use server";

import { createServerClient } from "@/lib/supabase/server";

export async function logAdminQuoteActivity(
  quoteId: string,
  eventType: string,
  eventData: Record<string, unknown> = {}
) {
  const supabase = createServerClient();

  const { error } = await supabase.from("quote_activity_log").insert({
    quote_id: quoteId,
    event_type: eventType,
    event_data: eventData,
  });

  if (error) {
    console.error("[logAdminQuoteActivity]", error.message);
  }
}
