"use client";

import { useState } from "react";
import { DollarSign, ExternalLink, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { collectBalance } from "@/lib/admin/actions/quote-actions";

type Props = {
  quoteId: string;
  status: string;
  stripeBalanceInvoiceId: string | null;
  balanceAmount: number;
};

export function CollectBalanceButton({
  quoteId,
  status,
  stripeBalanceInvoiceId,
  balanceAmount,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Already has a balance invoice — show link to view it
  if (stripeBalanceInvoiceId) {
    return (
      <Button variant="outline" asChild>
        <a
          href={`https://dashboard.stripe.com/test/invoices/${stripeBalanceInvoiceId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink className="size-4 mr-1" />
          View Balance Invoice
        </a>
      </Button>
    );
  }

  // Only show for deposit_paid quotes
  if (status !== "deposit_paid") return null;

  async function handleClick() {
    setLoading(true);
    setError(null);

    const result = await collectBalance(quoteId);

    if (result.success && result.invoiceUrl) {
      toast.success("Balance invoice created and sent");
      window.open(result.invoiceUrl, "_blank");
    } else if (!result.success) {
      const msg = result.error ?? "Something went wrong";
      setError(msg);
      toast.error(msg);
    }

    setLoading(false);
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <Button onClick={handleClick} disabled={loading}>
        {loading ? (
          <Loader2 className="size-4 mr-1 animate-spin" />
        ) : (
          <DollarSign className="size-4 mr-1" />
        )}
        Collect Remaining Balance (${balanceAmount.toLocaleString()})
      </Button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
