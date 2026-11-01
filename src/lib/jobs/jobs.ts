import { createServerClient } from "@/lib/supabase/server";

type Supabase = ReturnType<typeof createServerClient>;

/**
 * One job per accepted quote. Safe to call repeatedly, and from the webhook for
 * quotes accepted before jobs existed. Test quotes never become jobs. Failures are
 * logged, not thrown: job tracking must never block an acceptance or a payment.
 */
export async function ensureJobForQuote(supabase: Supabase, quoteId: string): Promise<string | null> {
  try {
    const { data: existing } = await supabase.from("jobs").select("id").eq("quote_id", quoteId).maybeSingle();
    if (existing) return existing.id as string;

    const { data: quote, error: quoteError } = await supabase
      .from("quotes")
      .select(
        "quote_number, total, customer_id, accepted_by_name, accepted_by_email, customer:customers(email, display_name), lead:leads(email, display_name)"
      )
      .eq("id", quoteId)
      .single();
    if (quoteError || !quote) throw new Error(quoteError?.message ?? "Quote not found");
    if (quote.quote_number?.startsWith("TEST-")) return null;

    // What the customer accepted (with add-ons and upcharges), not the quote's starting total.
    const { data: selection } = await supabase
      .from("quote_selections")
      .select("final_total")
      .eq("quote_id", quoteId)
      .limit(1)
      .maybeSingle();
    const contractAmount = selection?.final_total ?? quote.total;
    if (contractAmount == null) throw new Error(`No total on quote ${quote.quote_number}`);

    const contact = (quote.customer ?? quote.lead) as unknown as { email: string | null; display_name: string | null } | null;
    const customerName = quote.accepted_by_name ?? contact?.display_name ?? "Customer";

    const { data: job, error: jobError } = await supabase
      .from("jobs")
      .upsert(
        {
          job_name: `${customerName} — ${quote.quote_number}`,
          customer_name: customerName,
          customer_email: quote.accepted_by_email ?? contact?.email ?? null,
          contract_amount: contractAmount,
          quote_id: quoteId,
          customer_id: quote.customer_id,
        },
        { onConflict: "quote_id" }
      )
      .select("id")
      .single();
    if (jobError || !job) throw new Error(jobError?.message ?? "Job not created");
    return job.id as string;
  } catch (err) {
    console.error("[jobs] ensureJobForQuote failed:", err instanceof Error ? err.message : err);
    return null;
  }
}

/** Records a paid Stripe invoice against the quote's job. A repeat delivery is a no-op. */
export async function recordStripePayment(
  supabase: Supabase,
  quoteId: string,
  invoiceId: string,
  amount: number,
  note: string
) {
  try {
    const jobId = await ensureJobForQuote(supabase, quoteId);
    if (!jobId) return;

    const { error } = await supabase.from("job_payments").insert({
      job_id: jobId,
      kind: "payment",
      amount,
      method: "stripe",
      note,
      stripe_invoice_id: invoiceId,
    });
    // 23505: this invoice is already recorded.
    if (error && error.code !== "23505") throw new Error(error.message);

    const { data: balance } = await supabase.from("job_balances").select("balance").eq("id", jobId).single();
    if (balance && Number(balance.balance) <= 0) {
      await supabase.from("jobs").update({ status: "paid_in_full" }).eq("id", jobId).neq("status", "cancelled");
    }
  } catch (err) {
    console.error("[jobs] recordStripePayment failed:", err instanceof Error ? err.message : err);
  }
}
