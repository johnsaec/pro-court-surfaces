import { getStripe } from "@/lib/stripe";
import { createServerClient } from "@/lib/supabase/server";

type DepositInvoiceInput = {
  quoteId: string;
  quoteNumber: string;
  existingInvoiceId: string | null;
  customerId: string | null;
  existingStripeCustomerId: string | null;
  customerName: string;
  customerEmail: string;
  amount: number; // dollars, already rounded to the cent
  description: string;
  dueDays: number;
};

/**
 * Exactly one deposit invoice per quote:
 *  1. A quote that already has an invoice reuses it (never creates a second).
 *  2. Every Stripe create call carries an idempotency key derived from the quote,
 *     so a retried request returns the original object instead of a duplicate.
 * Paying on the quote page and paying from Stripe's email both settle this same
 * invoice, and Stripe refuses payment on an invoice that is already paid.
 */
export async function ensureDepositInvoice(input: DepositInvoiceInput): Promise<string> {
  if (input.existingInvoiceId) return input.existingInvoiceId;

  const stripe = getStripe();
  const supabase = createServerClient();
  const key = (step: string) => `deposit-${input.quoteId}-${step}`;

  let stripeCustomerId = input.existingStripeCustomerId ?? undefined;
  if (!stripeCustomerId) {
    const existing = await stripe.customers.list({ email: input.customerEmail, limit: 1 });
    stripeCustomerId =
      existing.data[0]?.id ??
      (
        await stripe.customers.create(
          { name: input.customerName, email: input.customerEmail },
          { idempotencyKey: key("customer") }
        )
      ).id;

    if (input.customerId) {
      await supabase
        .from("customers")
        .update({ stripe_customer_id: stripeCustomerId })
        .eq("id", input.customerId);
    }
  }

  const invoice = await stripe.invoices.create(
    {
      customer: stripeCustomerId,
      collection_method: "send_invoice",
      days_until_due: input.dueDays,
      // ACH first (lowest fees), card as the alternative — on the quote page's
      // payment form and on Stripe's emailed invoice alike.
      payment_settings: {
        payment_method_types: ["us_bank_account", "card"],
        payment_method_options: { us_bank_account: { verification_method: "automatic" } },
      },
      metadata: { quote_id: input.quoteId, kind: "deposit" },
    },
    { idempotencyKey: key("invoice") }
  );

  await stripe.invoiceItems.create(
    {
      customer: stripeCustomerId,
      invoice: invoice.id,
      amount: Math.round(input.amount * 100),
      currency: "usd",
      description: input.description,
    },
    { idempotencyKey: key("item") }
  );

  const finalized = await stripe.invoices.finalizeInvoice(invoice.id!);

  await supabase
    .from("quotes")
    .update({ stripe_invoice_id: finalized.id })
    .eq("id", input.quoteId);

  // Email it explicitly: finalizing alone only emails when the account's
  // "email finalized invoices" setting is on, and live and test settings differ.
  // A send failure is logged, not thrown — the invoice is still payable on the page.
  try {
    await stripe.invoices.sendInvoice(finalized.id!);
  } catch (err) {
    console.error("[ensureDepositInvoice] sendInvoice failed:", err instanceof Error ? err.message : err);
  }

  return finalized.id!;
}
