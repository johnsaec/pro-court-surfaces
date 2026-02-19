import { createServerClient } from "@/lib/supabase/server";

export type ActivityLogEntry = {
  id: string;
  quote_id: string;
  event_type: string;
  event_data: Record<string, unknown>;
  created_at: string;
};

export async function getQuoteActivityLog(
  quoteId: string
): Promise<ActivityLogEntry[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("quote_activity_log")
    .select("id, quote_id, event_type, event_data, created_at")
    .eq("quote_id", quoteId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as ActivityLogEntry[];
}

export async function getRecentActivity(
  limit = 10
): Promise<(ActivityLogEntry & { quote_number: string })[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("quote_activity_log")
    .select("id, quote_id, event_type, event_data, created_at, quote:quotes(quote_number)")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  return ((data ?? []) as unknown as Array<ActivityLogEntry & { quote: { quote_number: string } | null }>).map((row) => ({
    id: row.id,
    quote_id: row.quote_id,
    event_type: row.event_type,
    event_data: row.event_data,
    created_at: row.created_at,
    quote_number: row.quote?.quote_number ?? "—",
  }));
}
