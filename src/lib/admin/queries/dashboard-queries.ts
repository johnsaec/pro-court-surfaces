import { createServerClient } from "@/lib/supabase/server";
import type { QuoteListRow } from "@/lib/admin/types/quote-types";

export type DashboardStats = {
  totalQuotes: number;
  pipelineValue: number;
  depositsCollected: number;
  completedRevenue: number;
};

export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = createServerClient();

  const { data: quotes, error } = await supabase
    .from("quotes")
    .select("status, total");

  if (error) throw new Error(error.message);

  const rows = quotes ?? [];

  const totalQuotes = rows.length;

  // Pipeline = sent + viewed + accepted quotes
  const pipelineStatuses = ["sent", "viewed", "accepted"];
  const pipelineValue = rows
    .filter((q) => pipelineStatuses.includes(q.status))
    .reduce((sum, q) => sum + (q.total ?? 0), 0);

  // Deposits collected = deposit_paid quotes (50% of their total)
  const depositsCollected = rows
    .filter((q) => q.status === "deposit_paid")
    .reduce((sum, q) => sum + Math.round((q.total ?? 0) / 2), 0);

  // Completed revenue = completed quotes (full total)
  const completedRevenue = rows
    .filter((q) => q.status === "completed")
    .reduce((sum, q) => sum + (q.total ?? 0), 0);

  return { totalQuotes, pipelineValue, depositsCollected, completedRevenue };
}

export async function getRecentQuotes(limit = 5): Promise<QuoteListRow[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("quotes")
    .select(
      `id, quote_number, status, version, subtotal, total, created_at, updated_at,
       customer:customers(display_name),
       project:projects!quotes_project_id_fkey(name),
       lead:leads(display_name, email, phone)`
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return (data ?? []) as unknown as QuoteListRow[];
}
