import { NextRequest, NextResponse } from "next/server";
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

  return NextResponse.json({ received: true });
}
