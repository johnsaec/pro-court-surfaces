import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { createServerClient } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/email/send-email";
import { DepositPaidEmail } from "@/lib/email/templates/deposit-paid";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "invoice.paid") {
    const invoice = event.data.object;
    const invoiceId = invoice.id;
    const paidAmount = (invoice.amount_paid ?? 0) / 100;
    const supabase = createServerClient();

    // Stripe can deliver the same event more than once. Each transition only fires
    // from its expected prior status (accepted → deposit_paid, deposit_paid →
    // completed), so a repeat updates zero rows and is skipped: no second log
    // entry, no second email.
    const { data: depositRows } = await supabase
      .from("quotes")
      .update({ status: "deposit_paid" })
      .eq("stripe_invoice_id", invoiceId)
      .eq("status", "accepted")
      .select("id");

    const { data: balanceRows } = depositRows?.length
      ? { data: [] }
      : await supabase
          .from("quotes")
          .update({ status: "completed" })
          .eq("stripe_balance_invoice_id", invoiceId)
          .eq("status", "deposit_paid")
          .select("id");

    const transition = depositRows?.length
      ? { quoteId: depositRows[0].id as string, event: "deposit_paid", label: "Deposit" }
      : balanceRows?.length
        ? { quoteId: balanceRows[0].id as string, event: "completed", label: "Balance" }
        : null;

    if (!transition) {
      // Repeat delivery, or an invoice that isn't ours.
      return NextResponse.json({ received: true, duplicate: true });
    }

    await supabase.from("quote_activity_log").insert({
      quote_id: transition.quoteId,
      event_type: transition.event,
      event_data: { amount: paidAmount, stripe_invoice_id: invoiceId, stripe_event_id: event.id },
    });

    // Confirmation emails (fire-and-forget)
    try {
      const { data: quote } = await supabase
        .from("quotes")
        .select("*, customer:customers(*), lead:leads(*)")
        .eq("id", transition.quoteId)
        .single();

      if (quote) {
        const recipientEmail = quote.customer?.email ?? quote.lead?.email;
        const recipientName =
          quote.customer?.display_name ?? quote.lead?.display_name ?? "Customer";

        if (recipientEmail) {
          await sendEmail({
            to: recipientEmail,
            subject: `Payment Received — Quote ${quote.quote_number}`,
            react: DepositPaidEmail({
              customerName: recipientName,
              quoteNumber: quote.quote_number,
              depositAmount: paidAmount,
            }),
          });
        }

        await sendEmail({
          to: "patrick@procourtsurfaces.com",
          subject: `${recipientName} paid ${transition.label.toLowerCase()} $${paidAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })} — ${quote.quote_number}`,
          text: `${recipientName} paid the ${transition.label.toLowerCase()} of $${paidAmount.toFixed(2)} on quote ${quote.quote_number}.\nStripe invoice: ${invoiceId}`,
        });
      }
    } catch (err) {
      console.error("[webhook] Payment email error:", err instanceof Error ? err.message : err);
    }
  }

  // ACH: the payment was submitted but takes 3–5 business days to clear.
  // invoice.paid (above) fires when it does.
  if (event.type === "payment_intent.processing") {
    await handleProcessing(event.data.object, event.id);
  }

  // ACH bounced (insufficient funds, closed account…). The invoice stays open.
  if (event.type === "invoice.payment_failed") {
    await handlePaymentFailed(event.data.object, event.id);
  }

  return NextResponse.json({ received: true });
}

type Supabase = ReturnType<typeof createServerClient>;
const PATRICK = "patrick@procourtsurfaces.com";
const usd = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

async function findQuoteByInvoice(supabase: Supabase, invoiceId: string) {
  const { data } = await supabase
    .from("quotes")
    .select("id, quote_number, customer:customers(email, display_name), lead:leads(email, display_name)")
    .or(`stripe_invoice_id.eq.${invoiceId},stripe_balance_invoice_id.eq.${invoiceId}`)
    .maybeSingle();
  if (!data) return null;
  const contact = (data.customer ?? data.lead) as unknown as { email: string | null; display_name: string | null } | null;
  return {
    id: data.id as string,
    quoteNumber: data.quote_number as string,
    email: contact?.email ?? null,
    name: contact?.display_name ?? "Customer",
  };
}

// Stripe can deliver an event more than once: log (and email) only the first time
// a given key is seen for this quote. Returns false on a repeat.
async function logOnce(
  supabase: Supabase,
  quoteId: string,
  eventType: string,
  dedupeKey: string,
  data: Record<string, unknown>
) {
  const { data: existing } = await supabase
    .from("quote_activity_log")
    .select("id")
    .eq("quote_id", quoteId)
    .eq("event_type", eventType)
    .eq("event_data->>dedupe_key", dedupeKey)
    .limit(1);
  if (existing?.length) return false;
  await supabase
    .from("quote_activity_log")
    .insert({ quote_id: quoteId, event_type: eventType, event_data: { ...data, dedupe_key: dedupeKey } });
  return true;
}

async function handleProcessing(pi: Stripe.PaymentIntent, eventId: string) {
  try {
    const payments = await getStripe().invoicePayments.list({
      payment: { type: "payment_intent", payment_intent: pi.id },
      limit: 1,
    });
    const inv = payments.data[0]?.invoice;
    const invoiceId = typeof inv === "string" ? inv : inv?.id;
    if (!invoiceId) return; // not one of our invoices

    const supabase = createServerClient();
    const quote = await findQuoteByInvoice(supabase, invoiceId);
    if (!quote) return;

    const amount = pi.amount / 100;
    const first = await logOnce(supabase, quote.id, "payment_processing", pi.id, {
      amount,
      stripe_invoice_id: invoiceId,
      stripe_event_id: eventId,
    });
    if (!first) return;

    if (quote.email) {
      await sendEmail({
        to: quote.email,
        subject: `Bank Payment Submitted — Quote ${quote.quoteNumber}`,
        react: DepositPaidEmail({
          customerName: quote.name,
          quoteNumber: quote.quoteNumber,
          depositAmount: amount,
          status: "processing",
        }),
      });
    }
    await sendEmail({
      to: PATRICK,
      subject: `${quote.name} started a ${usd(amount)} bank payment — ${quote.quoteNumber}`,
      text: `${quote.name} submitted a ${usd(amount)} ACH payment on quote ${quote.quoteNumber}. It clears in 3–5 business days; you'll get a "paid" email when it does.
Stripe invoice: ${invoiceId}`,
    });
  } catch (err) {
    console.error("[webhook] processing handler error:", err instanceof Error ? err.message : err);
  }
}

async function handlePaymentFailed(invoice: Stripe.Invoice, eventId: string) {
  try {
    const invoiceId = invoice.id;
    if (!invoiceId) return;
    const supabase = createServerClient();
    const quote = await findQuoteByInvoice(supabase, invoiceId);
    if (!quote) return;

    // Find the failed payment to tell bank bounces from card declines. A declined
    // card is shown to the customer on the spot, so only bank failures email.
    const payments = await getStripe().invoicePayments.list({ invoice: invoiceId, limit: 5 });
    const piRef = payments.data.find((p) => p.status !== "paid")?.payment.payment_intent;
    const pi = piRef
      ? typeof piRef === "string"
        ? await getStripe().paymentIntents.retrieve(piRef)
        : piRef
      : null;
    const error = pi?.last_payment_error;
    const isBank = error?.payment_method?.type === "us_bank_account";
    const reason = error?.message ?? "The bank declined the transfer.";
    const amount = (invoice.amount_due ?? 0) / 100;

    const first = await logOnce(supabase, quote.id, "payment_failed", eventId, {
      amount,
      reason,
      method: error?.payment_method?.type ?? null,
      stripe_invoice_id: invoiceId,
    });
    if (!first || !isBank) return;

    if (quote.email && invoice.hosted_invoice_url) {
      await sendEmail({
        to: quote.email,
        subject: `Your bank payment didn't go through — Quote ${quote.quoteNumber}`,
        text: `Hi ${quote.name},

Your ${usd(amount)} bank payment for quote ${quote.quoteNumber} didn't go through (${reason}).

You can pay again by bank transfer or card here:
${invoice.hosted_invoice_url}

Questions? Just reply to this email.

Pro Court Surfaces`,
      });
    }
    await sendEmail({
      to: PATRICK,
      subject: `Bank payment FAILED — ${quote.name} ${usd(amount)} — ${quote.quoteNumber}`,
      text: `${quote.name}'s ${usd(amount)} ACH payment on quote ${quote.quoteNumber} failed: ${reason}
The invoice is still open and the customer was emailed a link to pay again.
Stripe invoice: ${invoiceId}`,
    });
  } catch (err) {
    console.error("[webhook] payment_failed handler error:", err instanceof Error ? err.message : err);
  }
}
