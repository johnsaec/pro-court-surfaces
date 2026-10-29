import { CheckCircle2, Clock, Download } from "lucide-react";
import type { QuoteDetail } from "@/lib/admin/types/quote-types";
import { DepositPayment } from "./deposit-payment";
import { fmtMoney } from "@/lib/quotes/quote-format";

type SelectionData = {
  final_total: number;
  accepted_by_name: string | null;
  accepted_by_email: string | null;
  color_inside: string | null;
  color_outside: string | null;
  color_nvz: string | null;
  color_lines: string | null;
  toggled_line_items: { line_item_id: string; is_enabled: boolean }[] | null;
  selected_package: {
    name: string;
    tier: string;
    quote_line_items: {
      id: string;
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
  clientSecret: string | null;
  publishableKey: string | null;
  returnUrl: string;
}

// Same look as the quote page (src/app/q/[share_token]/_components/quote-page.tsx):
// cream page, white card with the green accent bar and header rule, bold green
// section titles, stone palette.
function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-bold text-[#1a5632] mb-2">{children}</h2>;
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[7.25rem_1fr] sm:grid-cols-[9rem_1fr] text-sm leading-6">
      <span className="font-semibold text-stone-700">{label}:</span>
      <span className="text-stone-800 tabular-nums">{value}</span>
    </div>
  );
}

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Chicago",
  });

export function AcceptedPage({
  quote,
  selection,
  depositAmount,
  depositPercent,
  invoiceUrl,
  invoiceStatus,
  invoiceDueDate,
  clientSecret,
  publishableKey,
  returnUrl,
}: AcceptedPageProps) {
  // Stripe's own invoice status counts too: the paid webhook can land a few
  // seconds after the customer is already looking at this page.
  const isDepositPaid = quote.status === "deposit_paid" || invoiceStatus === "paid";
  const canPayHere = !!clientSecret && !!publishableKey && !isDepositPaid;
  const totalAmount = selection?.final_total ?? quote.total ?? 0;
  const balanceAmount = Math.round((totalAmount - depositAmount) * 100) / 100;
  const firstName = selection?.accepted_by_name?.split(" ")[0];

  // Only what was bought: required lines + add-ons switched on
  const boughtLines =
    selection?.selected_package?.quote_line_items.filter(
      (item) =>
        !item.is_optional ||
        selection.toggled_line_items?.some((t) => t.line_item_id === item.id && t.is_enabled)
    ) ?? [];

  const colors = [
    ["Outside", selection?.color_outside],
    ["Inside", selection?.color_inside],
    ["NVZ", selection?.color_nvz],
    ["Lines", selection?.color_lines],
  ].filter(([, v]) => !!v) as [string, string][];

  return (
    <div className="min-h-screen bg-[#faf8f5] sm:py-10">
      <div className="max-w-3xl mx-auto bg-white sm:rounded-xl sm:shadow-sm sm:border sm:border-stone-200 overflow-hidden">
        {/* Brand accent bar */}
        <div className="h-1.5 bg-[#1a5632]" />
        <main className="px-4 sm:px-12 pt-8 sm:pt-10 pb-12 space-y-8">
          {/* Header — matches the quote page */}
          <header className="flex items-start justify-between gap-4 border-b-2 border-[#1a5632] pb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1a5632] leading-tight">
                Pro Court Surfaces
              </h1>
              <p className="text-sm text-stone-500 mt-0.5 tracking-wide">Austin, TX</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-lg sm:text-xl font-semibold text-stone-800 tracking-wide">
                {quote.quote_number}
              </p>
              {quote.accepted_at && (
                <p className="text-xs text-stone-500 mt-0.5">Accepted {fmtDate(quote.accepted_at)}</p>
              )}
              {quote.city && (
                <p className="text-xs text-stone-500">
                  {quote.city}
                  {quote.state ? `, ${quote.state}` : ""}
                </p>
              )}
            </div>
          </header>

          <div className="flex justify-end -mt-5">
            <a
              href={`/q/${quote.share_token}/pdf`}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1a5632] hover:underline"
            >
              <Download className="w-3.5 h-3.5" /> Download PDF
            </a>
          </div>

          {/* Status */}
          <section className="flex items-start gap-4">
            <CheckCircle2 className="size-10 shrink-0 text-[#1a5632]" />
            <div>
              <p className="text-2xl font-bold text-stone-800">
                {isDepositPaid ? "Deposit Received" : "Quote Accepted"}
              </p>
              <p className="mt-1 text-[15px] text-stone-600 leading-relaxed">
                Thank you{firstName ? `, ${firstName}` : ""}! Your quote has been accepted
                {isDepositPaid
                  ? " and your deposit has been received. We'll be in touch to schedule your project."
                  : canPayHere
                    ? ". Pay your deposit below to lock in your spot on the schedule."
                    : invoiceUrl
                      ? " and your deposit invoice has been emailed to you."
                      : ". Your deposit invoice will follow by email shortly."}
              </p>
            </div>
          </section>

          {/* Deposit */}
          <section className="rounded-xl border-2 border-[#1a5632] px-5 sm:px-8 py-6">
            <div className="flex items-center justify-between gap-3 mb-3">
              <SectionTitle>Deposit Payment</SectionTitle>
              {isDepositPaid ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#1a5632]/10 px-2.5 py-1 text-xs font-semibold text-[#1a5632]">
                  <CheckCircle2 className="size-3.5" /> Paid
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">
                  <Clock className="size-3.5" /> Due
                </span>
              )}
            </div>

            <div className="rounded-lg border border-stone-200 bg-stone-50 px-5 py-4 mb-5">
              <InfoRow label="Project total" value={fmtMoney(totalAmount)} />
              <InfoRow
                label={depositPercent ? `Deposit (${depositPercent}%)` : "Deposit"}
                value={<span className="font-bold text-[#1a5632]">{fmtMoney(depositAmount)}</span>}
              />
              {depositPercent && (
                <InfoRow label={`Balance (${100 - depositPercent}%)`} value={`${fmtMoney(balanceAmount)} at completion`} />
              )}
              {invoiceDueDate && !isDepositPaid && <InfoRow label="Deposit due" value={invoiceDueDate} />}
            </div>

            {canPayHere && (
              <DepositPayment
                publishableKey={publishableKey!}
                clientSecret={clientSecret!}
                amount={depositAmount}
                returnUrl={returnUrl}
                hostedInvoiceUrl={invoiceUrl}
                billingName={selection?.accepted_by_name ?? quote.accepted_by_name ?? ""}
                billingEmail={selection?.accepted_by_email ?? quote.accepted_by_email ?? ""}
              />
            )}

            {/* Fallback: Stripe's hosted invoice page when the form can't load here */}
            {invoiceUrl && !isDepositPaid && !canPayHere && invoiceStatus === "open" && (
              <a
                href={invoiceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-lg bg-[#1a5632] px-6 py-4 text-center text-base font-semibold text-white shadow-sm transition-all hover:bg-[#143f26]"
              >
                Pay Deposit — {fmtMoney(depositAmount)}
              </a>
            )}

            {!invoiceUrl && !isDepositPaid && (
              <p className="text-sm text-stone-600 text-center">
                Your deposit invoice will follow by email shortly. Thanks for choosing Pro Court
                Surfaces — we&apos;ll be in touch to schedule your project.
              </p>
            )}

            {isDepositPaid && (
              <div className="rounded-lg bg-[#1a5632]/[0.06] px-5 py-5 text-center">
                <CheckCircle2 className="mx-auto size-9 text-[#1a5632]" />
                <p className="mt-2 font-bold text-stone-800">Deposit received — {fmtMoney(depositAmount)}</p>
                <p className="mt-1 text-sm text-stone-600">
                  Thank you! We&apos;ll be in touch to schedule your project.
                </p>
              </div>
            )}
          </section>

          {/* What they accepted */}
          {selection?.selected_package && (
            <section>
              <SectionTitle>Your Selection</SectionTitle>
              <div className="flex items-center justify-between gap-4 rounded-lg border border-stone-200 bg-stone-50 px-4 py-3.5">
                <p className="font-bold text-stone-800 leading-snug">{selection.selected_package.name}</p>
              </div>
              <div className="mt-2">
                <div className="grid grid-cols-[1fr_auto] gap-x-3 rounded-t-md bg-[#1a5632] px-3 py-2 text-xs font-semibold tracking-wide text-white">
                  <span>Item</span>
                  <span className="text-right">Total</span>
                </div>
                {boughtLines.map((item, i) => (
                  <div
                    key={item.id}
                    className={[
                      "grid grid-cols-[1fr_auto] gap-x-3 px-3 py-2.5 border-b border-stone-200 text-sm",
                      i % 2 === 1 ? "bg-stone-50" : "",
                    ].join(" ")}
                  >
                    <span className="text-stone-800">
                      {item.name}
                      {item.is_optional && <span className="ml-1.5 text-xs text-stone-500">(add-on)</span>}
                    </span>
                    <span className="text-right tabular-nums text-stone-800">{fmtMoney(item.total_price)}</span>
                  </div>
                ))}
                <div className="flex items-baseline justify-between px-3 pt-3">
                  <span className="text-lg font-bold text-stone-800">Total</span>
                  <span className="text-2xl font-bold tabular-nums text-[#1a5632]">{fmtMoney(totalAmount)}</span>
                </div>
              </div>
            </section>
          )}

          {/* Colors */}
          {colors.length > 0 && (
            <section>
              <SectionTitle>Court Colors</SectionTitle>
              {colors.map(([label, value]) => (
                <InfoRow key={label} label={label} value={value} />
              ))}
            </section>
          )}

          <footer className="flex justify-between border-t border-stone-200 pt-2 text-xs text-stone-400">
            <span>Pro Court Surfaces — Austin, TX</span>
            <span>{quote.quote_number}</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
