import { notFound, redirect } from "next/navigation";
import { getQuoteByShareToken } from "@/lib/quotes/public-queries";
import { getColors } from "@/lib/admin/queries/color-queries";
import { logQuoteActivity } from "@/lib/quotes/public-actions";
import { createServerClient } from "@/lib/supabase/server";
import { QuotePage } from "./_components/quote-page";

export default async function PublicQuotePage({
  params,
}: {
  params: Promise<{ share_token: string }>;
}) {
  const { share_token } = await params;

  const [quote, colors] = await Promise.all([
    getQuoteByShareToken(share_token),
    getColors(),
  ]);

  if (!quote) notFound();

  // If already accepted or deposit paid, redirect to confirmation page
  if (quote.status === "accepted" || quote.status === "deposit_paid") {
    redirect(`/q/${share_token}/accepted`);
  }

  // Fire-and-forget: log "viewed" activity
  logQuoteActivity(quote.id, "viewed");

  // Update viewed_at and status if still "sent"
  if (quote.status === "sent") {
    const supabase = createServerClient();
    supabase
      .from("quotes")
      .update({
        viewed_at: new Date().toISOString(),
        status: "viewed",
      })
      .eq("id", quote.id)
      .then();
  }

  return <QuotePage quote={quote} colors={colors} />;
}
