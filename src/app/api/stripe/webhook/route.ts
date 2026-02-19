import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
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
    event = stripe.webhooks.constructEvent(
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
    const supabase = createServerClient();

    // Check if this is a deposit invoice or balance invoice
    const { data: depositQuote } = await supabase
      .from("quotes")
      .select("id")
      .eq("stripe_invoice_id", invoiceId)
      .maybeSingle();

    const { data: balanceQuote } = await supabase
      .from("quotes")
      .select("id")
      .eq("stripe_balance_invoice_id", invoiceId)
      .maybeSingle();

    if (depositQuote) {
      // Deposit invoice paid → deposit_paid
      await supabase
        .from("quotes")
        .update({ status: "deposit_paid" })
        .eq("id", depositQuote.id);

      // Log activity
      await supabase.from("quote_activity_log").insert({
        quote_id: depositQuote.id,
        event_type: "deposit_paid",
        event_data: { amount: (invoice.amount_paid ?? 0) / 100 },
      });
    } else if (balanceQuote) {
      // Balance invoice paid → completed
      await supabase
        .from("quotes")
        .update({ status: "completed" })
        .eq("id", balanceQuote.id);

      // Log activity
      await supabase.from("quote_activity_log").insert({
        quote_id: balanceQuote.id,
        event_type: "completed",
        event_data: { amount: (invoice.amount_paid ?? 0) / 100 },
      });
    }

    // Send confirmation email (fire-and-forget)
    const quoteId = depositQuote?.id ?? balanceQuote?.id;
    if (quoteId) {
      try {
        const { data: quote } = await supabase
          .from("quotes")
          .select("*, customer:customers(*), lead:leads(*)")
          .eq("id", quoteId)
          .single();

        if (quote) {
          const recipientEmail =
            quote.customer?.email ?? quote.lead?.email;
          const recipientName =
            quote.customer?.display_name ??
            quote.lead?.display_name ??
            "Customer";
          const paidAmount = (invoice.amount_paid ?? 0) / 100;

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
        }
      } catch (err) {
        console.error("[webhook] Payment email error:", err instanceof Error ? err.message : err);
      }
    }
  }

  return NextResponse.json({ received: true });
}
