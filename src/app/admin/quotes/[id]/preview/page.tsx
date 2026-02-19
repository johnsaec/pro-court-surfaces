import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/admin/page-header";
import { getQuoteById } from "@/lib/admin/queries/quote-queries";
import { QuotePreview } from "../../_components/quote-preview";
import { DownloadPdfButton } from "../../_components/download-pdf-button";
import { CollectBalanceButton } from "../../_components/collect-balance-button";

export default async function QuotePreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const quote = await getQuoteById(id);

  if (!quote) notFound();

  return (
    <>
      <PageHeader
        title={`Preview: ${quote.quote_number}`}
        description="Read-only preview of the customer-facing quote."
      >
        <div className="flex gap-2 items-start">
          <Button variant="outline" asChild>
            <Link href="/admin/quotes">
              <ArrowLeft className="size-4 mr-1" />
              Back
            </Link>
          </Button>
          <DownloadPdfButton quoteId={id} />
          <CollectBalanceButton
            quoteId={id}
            status={quote.status}
            stripeBalanceInvoiceId={quote.stripe_balance_invoice_id ?? null}
            balanceAmount={Math.round((quote.total ?? 0) / 2)}
          />
          <Button asChild>
            <Link href={`/admin/quotes/${id}`}>
              <Pencil className="size-4 mr-1" />
              Edit
            </Link>
          </Button>
        </div>
      </PageHeader>
      <div className="mt-6">
        <QuotePreview quote={quote} />
      </div>
    </>
  );
}
