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
    await supabase
      .from("quotes")
      .update({ status: "deposit_paid" })
      .eq("stripe_invoice_id", invoiceId);

    // Send deposit-paid confirmation email (fire-and-forget)
    try {
      const { data: quote } = await supabase
        .from("quotes")
        .select("*, customer:customers(*), lead:leads(*)")
        .eq("stripe_invoice_id", invoiceId)
        .single();

      if (quote) {
        const recipientEmail =
          quote.customer?.email ?? quote.lead?.email;
        const recipientName =
          quote.customer?.display_name ??
          quote.lead?.display_name ??
          "Customer";
        const depositAmount = (invoice.amount_paid ?? 0) / 100;

        if (recipientEmail) {
          await sendEmail({
            to: recipientEmail,
            subject: `Payment Received — Quote ${quote.quote_number}`,
            react: DepositPaidEmail({
              customerName: recipientName,
              quoteNumber: quote.quote_number,
              depositAmount,
            }),
          });
        }
      }
    } catch (err) {
      console.error("[webhook] Deposit email error:", err instanceof Error ? err.message : err);
    }
  }

  return NextResponse.json({ received: true });
}
