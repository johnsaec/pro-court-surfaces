"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Download } from "lucide-react";
import { PackageSelector } from "./package-selector";
import { ColorSelector } from "./color-selector";
import { RunningTotal } from "./running-total";
import { AcceptDialog } from "./accept-dialog";
import { acceptQuote } from "@/lib/quotes/public-actions";
import { computePackageTotal } from "@/lib/quotes/quote-calculator";
import { fmtMoney, quoteDates, paymentSplit, groupConditions } from "@/lib/quotes/quote-format";
import { PROJECT_TYPE_LABELS } from "@/lib/constants";
import type { ColorSelections } from "@/lib/quotes/quote-calculator";
import type { QuoteDetail } from "@/lib/admin/types/quote-types";
import type { Color } from "@/lib/admin/queries/color-queries";

type CourtZone = "outside" | "inside" | "lines" | "nvz";

interface QuotePageProps {
  quote: QuoteDetail;
  colors: Color[];
}

// Layout mirrors the PDF (src/lib/pdf/quote-pdf-document.tsx) section for section:
// header · Prepared For · Project Details · Note · Package · Summary · Colors ·
// Payment Terms · Conditions/Exclusions/Warranty · Acceptance.
function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-base font-bold text-[#1a5632] mb-2">{children}</h2>;
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[7.5rem_1fr] text-sm leading-6">
      <span className="font-bold text-gray-800">{label}:</span>
      <span className="text-gray-800 break-words">{value}</span>
    </div>
  );
}

export function QuotePage({ quote, colors }: QuotePageProps) {
  const router = useRouter();
  const isAccepted = quote.status === "accepted" || quote.status === "deposit_paid";

  // Default to recommended package
  const recommendedPkg = quote.quote_packages.find((p) => p.is_recommended);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(
    recommendedPkg?.id ?? quote.quote_packages[0]?.id ?? null
  );

  // Toggle state for optional line items
  const [toggles, setToggles] = useState<Map<string, boolean>>(() => {
    const initial = new Map<string, boolean>();
    const pkg = recommendedPkg ?? quote.quote_packages[0];
    if (pkg) {
      for (const item of pkg.quote_line_items) {
        if (item.is_optional) {
          initial.set(item.id, item.is_included_by_default);
        }
      }
    }
    return initial;
  });

  // Color selections
  const [colorSelections, setColorSelections] = useState<ColorSelections>({
    inside_id: quote.color_inside_id,
    outside_id: quote.color_outside_id,
    lines_id: quote.color_lines_id,
    nvz_id: quote.color_nvz_id,
  });

  const [showAcceptDialog, setShowAcceptDialog] = useState(false);

  // Get the selected package
  const selectedPackage = useMemo(
    () => quote.quote_packages.find((p) => p.id === selectedPackageId) ?? null,
    [quote.quote_packages, selectedPackageId]
  );

  const selectedAddons = useMemo(
    () =>
      selectedPackage?.quote_line_items.filter(
        (li) => li.is_optional && toggles.get(li.id)
      ) ?? [],
    [selectedPackage, toggles]
  );

  // Compute total (the quote-level discount comes off the selected package)
  const total = useMemo(() => {
    if (!selectedPackage) return 0;
    const gross = computePackageTotal(selectedPackage, toggles, colorSelections, colors);
    return Math.max(0, Math.round((gross - (quote.discount_amount ?? 0)) * 100) / 100);
  }, [selectedPackage, toggles, colorSelections, colors, quote.discount_amount]);

  // Handlers
  const handlePackageSelect = useCallback(
    (packageId: string) => {
      setSelectedPackageId(packageId);
      const pkg = quote.quote_packages.find((p) => p.id === packageId);
      if (pkg) {
        const newToggles = new Map<string, boolean>();
        for (const item of pkg.quote_line_items) {
          if (item.is_optional) {
            newToggles.set(item.id, item.is_included_by_default);
          }
        }
        setToggles(newToggles);
      }
    },
    [quote.quote_packages]
  );

  const handleToggle = useCallback((lineItemId: string, enabled: boolean) => {
    setToggles((prev) => {
      const next = new Map(prev);
      next.set(lineItemId, enabled);
      return next;
    });
  }, []);

  const handleColorChange = useCallback((zone: CourtZone, colorId: string) => {
    setColorSelections((prev) => {
      const key =
        zone === "inside"
          ? "inside_id"
          : zone === "outside"
            ? "outside_id"
            : zone === "nvz"
              ? "nvz_id"
              : "lines_id";
      return { ...prev, [key]: colorId };
    });
  }, []);

  const handleAccept = useCallback(
    async (name: string, email: string) => {
      if (!selectedPackageId || !selectedPackage) return;

      const toggledLineItems = Array.from(toggles.entries()).map(
        ([line_item_id, is_enabled]) => ({ line_item_id, is_enabled })
      );

      const result = await acceptQuote({
        quote_id: quote.id,
        package_id: selectedPackageId,
        customer_name: name,
        customer_email: email,
        toggled_line_items: toggledLineItems,
        color_selections: colorSelections,
        total_price: total,
      });

      if (result.success) {
        router.push(`/q/${quote.share_token}/accepted`);
      } else {
        throw new Error(result.error ?? "Failed to accept quote");
      }
    },
    [selectedPackageId, selectedPackage, toggles, colorSelections, total, quote, router]
  );

  // Base court = the largest sport present (tennis court is the base slab that
  // pickleball / basketball lines overlay onto). Only a pure-pickleball job
  // (no tennis) uses the pickleball base.
  const courtType: "pickleball" | "tennis" =
    quote.sports?.includes("tennis") ? "tennis" : "pickleball";
  const sports = quote.sports ?? [];

  const contact = quote.customer ?? quote.lead;
  const organization = contact?.company?.name ?? null;
  const projectType = quote.project_type
    ? (PROJECT_TYPE_LABELS[quote.project_type] ?? quote.project_type)
    : null;
  const { createdDate, validThrough } = quoteDates(quote);
  const hasCustomSchedule =
    Array.isArray(quote.payment_schedule) && quote.payment_schedule.length > 1;
  const isMultiPackage = quote.quote_packages.length > 1;
  const baseSubtotal = selectedPackage?.subtotal ?? 0;
  const { depositPct, depositAmount, balancePct, balanceAmount } = paymentSplit(
    total,
    quote.deposit_percent
  );
  const conditionGroups = groupConditions(quote.conditions);
  const pdfHref = `/q/${quote.share_token}/pdf`;

  return (
    <div className="min-h-screen bg-gray-50 sm:py-8">
      <div className="max-w-3xl mx-auto bg-white sm:rounded-md sm:shadow-sm sm:border sm:border-gray-200">
        <main className="px-4 sm:px-12 pt-8 sm:pt-12 pb-40 space-y-7">
          {/* Header — brand left, quote number/dates right, green rule */}
          <header className="flex items-start justify-between gap-4 border-b-2 border-[#1a5632] pb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1a5632] leading-tight">
                Pro Court Surfaces
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">Austin, TX</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-lg sm:text-xl font-bold text-gray-800">{quote.quote_number}</p>
              <p className="text-xs text-gray-500 mt-0.5">{createdDate}</p>
              <p className="text-xs text-gray-500">Valid through {validThrough}</p>
              <p className="text-xs text-gray-500">Version {quote.version}</p>
            </div>
          </header>

          <div className="flex justify-end -mt-4">
            <a
              href={pdfHref}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1a5632] hover:underline"
            >
              <Download className="w-3.5 h-3.5" /> Download PDF
            </a>
          </div>

          {/* Prepared For */}
          {contact && (
            <section>
              <SectionTitle>Prepared For</SectionTitle>
              {organization && <InfoRow label="Organization" value={organization} />}
              <InfoRow label="Contact" value={contact.display_name} />
              {contact.email && <InfoRow label="Email" value={contact.email} />}
              {contact.phone && <InfoRow label="Phone" value={contact.phone} />}
            </section>
          )}

          {/* Project Details */}
          {(projectType || quote.city || quote.square_feet) && (
            <section>
              <SectionTitle>Project Details</SectionTitle>
              {quote.address_line1 && (
                <InfoRow
                  label="Address"
                  value={[quote.address_line1, quote.city, quote.state, quote.zip]
                    .filter(Boolean)
                    .join(", ")}
                />
              )}
              {projectType && <InfoRow label="Type" value={projectType} />}
              {quote.number_of_courts && <InfoRow label="Courts" value={quote.number_of_courts} />}
              {quote.square_feet && (
                <InfoRow label="Square Feet" value={quote.square_feet.toLocaleString()} />
              )}
            </section>
          )}

          {/* Cover note */}
          {quote.cover_note && (
            <section>
              <SectionTitle>Note</SectionTitle>
              <p className="rounded-md bg-gray-100 px-4 py-3 text-sm italic text-gray-800 whitespace-pre-wrap leading-relaxed">
                {quote.cover_note}
              </p>
            </section>
          )}

          {/* Packages + inline add-on switches */}
          <section>
            <PackageSelector
              packages={quote.quote_packages}
              selectedPackageId={selectedPackageId}
              onSelect={handlePackageSelect}
              toggles={toggles}
              onToggle={handleToggle}
              readOnly={isAccepted}
            />
          </section>

          {/* Summary — subtotal, chosen add-ons, total, deposit/balance */}
          <section className="rounded-md bg-gray-100 px-4 py-3 text-sm">
            <div className="flex justify-between py-1">
              <span className="text-gray-800">
                Subtotal{isMultiPackage && selectedPackage ? ` (${selectedPackage.name})` : ""}
              </span>
              <span className="font-bold tabular-nums text-gray-800">{fmtMoney(baseSubtotal)}</span>
            </div>
            {selectedAddons.map((li) => (
              <div key={li.id} className="flex justify-between py-1">
                <span className="text-gray-800">+ {li.name}</span>
                <span className="font-bold tabular-nums text-gray-800">{fmtMoney(li.total_price)}</span>
              </div>
            ))}
            {quote.discount_amount != null && quote.discount_amount > 0 && (
              <div className="flex justify-between py-1">
                <span className="text-gray-800">Discount</span>
                <span className="font-bold tabular-nums text-gray-800">-{fmtMoney(quote.discount_amount)}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-gray-300 mt-1 pt-2">
              <span className="text-lg font-bold text-gray-800">Total</span>
              <span className="text-lg font-bold tabular-nums text-[#1a5632]">{fmtMoney(total)}</span>
            </div>
            {!hasCustomSchedule && total > 0 && (
              <p className="border-t border-gray-300 mt-2 pt-2 text-gray-800">
                Deposit ({depositPct}%): {fmtMoney(depositAmount)} due at signing · Balance (
                {balancePct}%): {fmtMoney(balanceAmount)} at completion
              </p>
            )}
          </section>

          {/* Court colors (interactive) */}
          <section>
            <ColorSelector
              courtType={courtType}
              sports={sports}
              colors={colors}
              colorSelections={colorSelections}
              onColorChange={handleColorChange}
              readOnly={isAccepted}
            />
          </section>

          {/* Payment Terms */}
          {hasCustomSchedule ? (
            <section>
              <SectionTitle>Payment Schedule</SectionTitle>
              <div className="rounded-md bg-gray-100 px-4 py-3 space-y-1.5">
                {quote.payment_schedule!.map((m, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-800">
                      {i + 1}. {m.label}
                    </span>
                    <span className="tabular-nums font-bold text-gray-800">{fmtMoney(m.amount)}</span>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            total > 0 && (
              <section>
                <SectionTitle>Payment Terms</SectionTitle>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-md bg-gray-100 px-4 py-3">
                    <p className="text-2xl font-bold text-[#1a5632]">{depositPct}%</p>
                    <p className="text-xs text-gray-500 mt-0.5">Deposit — due at contract execution</p>
                  </div>
                  <div className="rounded-md bg-gray-100 px-4 py-3">
                    <p className="text-2xl font-bold text-[#1a5632]">{balancePct}%</p>
                    <p className="text-xs text-gray-500 mt-0.5">Balance — due at substantial completion</p>
                  </div>
                </div>
              </section>
            )
          )}

          {/* Substrate conditions / exclusions / warranty — same clauses as the PDF */}
          {conditionGroups.map((g) => (
            <section key={g.section}>
              <h2 className="text-lg font-bold text-[#1a5632] mb-2">{g.section}</h2>
              <div className="space-y-3">
                {g.items.map((c, i) => (
                  <div key={i}>
                    {c.title !== g.section && (
                      <h3 className="text-sm font-bold text-gray-800">{c.title}</h3>
                    )}
                    {c.body.split("\n").map((line, j) => (
                      <p key={j} className="text-[13px] text-gray-500 leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Freeform terms (if any) */}
          {quote.terms_and_conditions && (
            <section>
              <SectionTitle>Additional Terms</SectionTitle>
              <p className="text-[13px] text-gray-500 whitespace-pre-wrap leading-relaxed">
                {quote.terms_and_conditions}
              </p>
            </section>
          )}

          {/* Acceptance — online acceptance replaces the PDF signature lines */}
          {!isAccepted && (
            <section className="border-t border-gray-200 pt-6">
              <SectionTitle>Acceptance</SectionTitle>
              <p className="text-sm text-gray-600 leading-relaxed">
                Review the scope, conditions, and exclusions above. Clicking{" "}
                <span className="font-semibold text-gray-800">Accept &amp; Pay Deposit</span>{" "}
                records your acceptance of this estimate (your typed name serves as your
                signature). Your {depositPct}% deposit invoice follows.
              </p>
            </section>
          )}

          <footer className="flex justify-between border-t border-gray-300 pt-2 text-xs text-gray-500">
            <span>Pro Court Surfaces — Austin, TX</span>
            <span>{quote.quote_number}</span>
          </footer>
        </main>
      </div>

      {/* Running total bar */}
      <RunningTotal
        total={total}
        hasSelection={!!selectedPackageId}
        onAcceptClick={() => setShowAcceptDialog(true)}
        readOnly={isAccepted}
        paymentSchedule={quote.payment_schedule}
        depositPercent={Number(quote.deposit_percent ?? 30)}
      />

      {/* Accept dialog */}
      <AcceptDialog
        open={showAcceptDialog}
        onClose={() => setShowAcceptDialog(false)}
        onAccept={handleAccept}
        defaultEmail={quote.customer?.email ?? quote.lead?.email ?? null}
        total={total}
        paymentSchedule={quote.payment_schedule}
        depositPercent={Number(quote.deposit_percent ?? 30)}
      />
    </div>
  );
}
