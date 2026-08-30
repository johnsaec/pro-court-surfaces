import { CheckCircle2, Clock, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { QuoteDetail } from "@/lib/admin/types/quote-types";

type SelectionData = {
  final_total: number;
  accepted_by_name: string | null;
  accepted_by_email: string | null;
  color_inside: string | null;
  color_outside: string | null;
  color_nvz: string | null;
  color_lines: string | null;
  selected_package: {
    name: string;
    tier: string;
    quote_line_items: {
      name: string;
      total_price: number;
      is_optional: boolean;
    }[];
  } | null;
} | null;

interface AcceptedPageProps {
  quote: QuoteDetail;
  selection: SelectionData;
  depositAmount: number;
  depositPercent: number | null;
  invoiceUrl: string | null;
  invoiceStatus: string | null;
  invoiceDueDate: string | null;
}

export function AcceptedPage({
  quote,
  selection,
  depositAmount,
  depositPercent,
  invoiceUrl,
  invoiceStatus,
  invoiceDueDate,
}: AcceptedPageProps) {
  const isDepositPaid = quote.status === "deposit_paid";
  const totalAmount = selection?.final_total ?? quote.total ?? 0;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <p className="text-sm text-muted-foreground">
            Quote {quote.quote_number}
          </p>
          <p className="text-sm text-muted-foreground">
            {quote.city && `${quote.city}${quote.state ? `, ${quote.state}` : ""}`}
          </p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10 space-y-8">
        {/* Success banner */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <CheckCircle2 className="size-14 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold">Quote Accepted</h1>
          <p className="text-muted-foreground">
            Thank you{selection?.accepted_by_name ? `, ${selection.accepted_by_name}` : ""}!
            Your quote has been accepted
            {invoiceUrl ? " and a deposit invoice has been sent." : "."}
          </p>
        </div>

        <Separator />

        {/* Payment status */}
        <div className="rounded-lg border bg-background p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Deposit Payment</h2>
            {isDepositPaid ? (
              <Badge className="bg-teal-100 text-teal-700">
                <CreditCard className="size-3 mr-1" />
                Deposit Paid
              </Badge>
            ) : (
              <Badge className="bg-amber-100 text-amber-700">
                <Clock className="size-3 mr-1" />
                Invoice Sent
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Quote Total</p>
              <p className="font-semibold text-lg tabular-nums">
                ${totalAmount.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">
                {depositPercent ? `${depositPercent}% Deposit Due` : "Deposit Due"}
              </p>
              <p className="font-semibold text-lg tabular-nums">
                ${depositAmount.toFixed(2)}
              </p>
            </div>
            {invoiceDueDate && !isDepositPaid && (
              <div>
                <p className="text-muted-foreground">Due Date</p>
                <p className="font-medium">{invoiceDueDate}</p>
              </div>
            )}
            {quote.accepted_at && (
              <div>
                <p className="text-muted-foreground">Accepted On</p>
                <p className="font-medium">
                  {new Date(quote.accepted_at).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>

          {invoiceUrl && !isDepositPaid && (
            <Button asChild size="lg" className="w-full mt-2">
              <a href={invoiceUrl} target="_blank" rel="noopener noreferrer">
                <CreditCard className="size-4 mr-2" />
                Pay Now — ${depositAmount.toFixed(2)}
              </a>
            </Button>
          )}

          {!invoiceUrl && !isDepositPaid && (
            <p className="text-sm text-muted-foreground text-center pt-2">
              Your deposit invoice will follow by email shortly. Thanks for choosing
              Pro Court Surfaces — we&apos;ll be in touch to schedule your project.
            </p>
          )}

          {isDepositPaid && (
            <p className="text-sm text-muted-foreground text-center pt-2">
              Your deposit has been received. We&apos;ll be in touch to schedule your project.
            </p>
          )}
        </div>

        {/* Package summary */}
        {selection?.selected_package && (
          <>
            <Separator />
            <div className="rounded-lg border bg-background p-6 space-y-4">
              <h2 className="font-semibold text-lg">
                {selection.selected_package.name}
              </h2>

              <div className="space-y-2">
                {selection.selected_package.quote_line_items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-sm"
                  >
                    <span>
                      {item.name}
                      {item.is_optional && (
                        <span className="text-muted-foreground ml-1">(add-on)</span>
                      )}
                    </span>
                    <span className="tabular-nums font-medium">
                      ${item.total_price.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Colors */}
              {(selection.color_inside || selection.color_outside || selection.color_nvz || selection.color_lines) && (
                <>
                  <Separator />
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                    {selection.color_inside && (
                      <div>
                        <p className="text-muted-foreground">Inside</p>
                        <p className="font-medium">{selection.color_inside}</p>
                      </div>
                    )}
                    {selection.color_outside && (
                      <div>
                        <p className="text-muted-foreground">Outside</p>
                        <p className="font-medium">{selection.color_outside}</p>
                      </div>
                    )}
                    {selection.color_nvz && (
                      <div>
                        <p className="text-muted-foreground">NVZ</p>
                        <p className="font-medium">{selection.color_nvz}</p>
                      </div>
                    )}
                    {selection.color_lines && (
                      <div>
                        <p className="text-muted-foreground">Lines</p>
                        <p className="font-medium">{selection.color_lines}</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
