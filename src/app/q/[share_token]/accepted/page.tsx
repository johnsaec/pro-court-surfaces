import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { paymentSplit } from "@/lib/quotes/quote-format";
import { getQuoteByShareToken } from "@/lib/quotes/public-queries";
import { createServerClient } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe";
import { AcceptedPage } from "./_components/accepted-page";

export default async function QuoteAcceptedPage({
  params,
}: {
  params: Promise<{ share_token: string }>;
}) {
  const { share_token } = await params;

  const quote = await getQuoteByShareToken(share_token);
  if (!quote) notFound();

  // If quote hasn't been accepted yet, redirect back to the quote page
  if (quote.status !== "accepted" && quote.status !== "deposit_paid") {
    redirect(`/q/${share_token}`);
  }

  // Fetch selection data (what the customer chose)
  const supabase = createServerClient();
  const { data: selection } = await supabase
    .from("quote_selections")
    .select(
      `*, selected_package:quote_packages(name, tier, quote_line_items(
        id, name, total_price, is_optional
      ))`
    )
    .eq("quote_id", quote.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  // Fetch Stripe invoice details if available
  let invoiceUrl: string | null = null;
  let invoiceStatus: string | null = null;
  let invoiceDueDate: string | null = null;
  let clientSecret: string | null = null;

  if (quote.stripe_invoice_id) {
    try {
      const invoice = await getStripe().invoices.retrieve(quote.stripe_invoice_id, {
        expand: ["confirmation_secret"],
      });
      invoiceUrl = invoice.hosted_invoice_url ?? null;
      invoiceStatus = invoice.status ?? null;
      // Only an open invoice can still be paid on this page.
      if (invoice.status === "open") clientSecret = invoice.confirmation_secret?.client_secret ?? null;
      if (invoice.due_date) {
        invoiceDueDate = new Date(invoice.due_date * 1000).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          timeZone: "America/Chicago",
        });
      }
    } catch {
      // Stripe fetch failed — still show the page
    }
  }

  // Use first milestone from custom schedule, or default 50%
  const hasCustomSchedule =
    quote.payment_schedule &&
    Array.isArray(quote.payment_schedule) &&
    quote.payment_schedule.length > 0;

  const depositPct = Number(quote.deposit_percent ?? 30);
  const depositAmount = hasCustomSchedule
    ? (quote.payment_schedule as { label: string; amount: number }[])[0].amount
    : paymentSplit(selection?.final_total ?? quote.total ?? 0, depositPct).depositAmount;

  // Where Stripe sends the customer back after a bank-verification redirect.
  const h = await headers();
  const host = h.get("host") ?? "www.procourtsurfaces.com";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${proto}://${host}`;

  return (
    <AcceptedPage
      quote={quote}
      selection={selection}
      depositAmount={depositAmount}
      depositPercent={hasCustomSchedule ? null : depositPct}
      invoiceUrl={invoiceUrl}
      invoiceStatus={invoiceStatus}
      invoiceDueDate={invoiceDueDate}
      clientSecret={clientSecret}
      publishableKey={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? null}
      returnUrl={`${origin}/q/${share_token}/accepted`}
    />
  );
}
