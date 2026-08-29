"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { PackageSelector } from "./package-selector";
import { AddonToggles } from "./addon-toggles";
import { ColorSelector } from "./color-selector";
import { RunningTotal } from "./running-total";
import { AcceptDialog } from "./accept-dialog";
import { acceptQuote } from "@/lib/quotes/public-actions";
import { computePackageTotal } from "@/lib/quotes/quote-calculator";
import type { ColorSelections } from "@/lib/quotes/quote-calculator";
import type { QuoteDetail } from "@/lib/admin/types/quote-types";
import type { Color } from "@/lib/admin/queries/color-queries";

type CourtZone = "outside" | "inside" | "lines" | "nvz";

interface QuotePageProps {
  quote: QuoteDetail;
  colors: Color[];
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

  // Get optional items from selected package
  const optionalItems = useMemo(
    () =>
      selectedPackage?.quote_line_items.filter((li) => li.is_optional) ?? [],
    [selectedPackage]
  );

  // Compute total
  const total = useMemo(() => {
    if (!selectedPackage) return 0;
    return computePackageTotal(selectedPackage, toggles, colorSelections, colors);
  }, [selectedPackage, toggles, colorSelections, colors]);

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
  // Visual: show the base court only for now (overlay lines disabled — pricing unchanged).
  const sports: string[] = [];

  const contactName = quote.customer?.display_name ?? quote.lead?.display_name;
  const createdDate = new Date(quote.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Brand accent bar */}
      <div className="h-1.5 bg-[#1a5632]" />

      {/* Header */}
      <header className="border-b border-stone-200 bg-white">
        <div className="max-w-2xl mx-auto px-6 py-8 sm:py-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1
                className="text-2xl sm:text-3xl text-[#1a5632]"
                style={{ fontFamily: "var(--font-display), serif" }}
              >
                Pro Court Surfaces
              </h1>
              <p className="text-sm text-stone-400 mt-1 tracking-wide">
                Austin, Texas
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-semibold text-stone-700 tracking-wide">
                {quote.quote_number}
              </p>
              <p className="text-xs text-stone-400 mt-1">{createdDate}</p>
              {quote.version > 1 && (
                <p className="text-xs text-stone-400">v{quote.version}</p>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-2xl mx-auto px-6 py-10 sm:py-14 space-y-10 pb-36">
        {/* Prepared for + project summary */}
        <section
          className="animate-[fadeInUp_0.5s_ease-out_both]"
        >
          <p className="text-[11px] text-stone-400 uppercase tracking-[0.2em] font-medium mb-3">
            Prepared for
          </p>
          {contactName && (
            <p
              className="text-2xl text-stone-800"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              {contactName}
            </p>
          )}
          {(quote.city || quote.address_line1) && (
            <p className="text-sm text-stone-500 mt-1.5">
              {quote.address_line1 && `${quote.address_line1}, `}
              {quote.city}
              {quote.state ? `, ${quote.state}` : ""}
              {quote.zip ? ` ${quote.zip}` : ""}
            </p>
          )}
          {(quote.square_feet || quote.number_of_courts) && (
            <div className="flex gap-6 mt-4 text-sm text-stone-500">
              {quote.number_of_courts && (
                <span>
                  {quote.number_of_courts} court{quote.number_of_courts > 1 ? "s" : ""}
                </span>
              )}
              {quote.square_feet && (
                <span>{quote.square_feet.toLocaleString()} sq ft</span>
              )}
            </div>
          )}
        </section>

        {/* Cover note */}
        {quote.cover_note && (
          <section
            className="border-l-2 border-[#1a5632]/30 pl-6 animate-[fadeInUp_0.5s_ease-out_0.1s_both]"
          >
            <p className="text-stone-600 whitespace-pre-wrap leading-relaxed">
              {quote.cover_note}
            </p>
          </section>
        )}

        <hr className="border-stone-200" />

        {/* Package selector */}
        <section className="animate-[fadeInUp_0.5s_ease-out_0.15s_both]">
          <PackageSelector
            packages={quote.quote_packages}
            selectedPackageId={selectedPackageId}
            onSelect={handlePackageSelect}
            readOnly={isAccepted}
          />
        </section>

        {/* Add-ons */}
        {optionalItems.length > 0 && (
          <>
            <hr className="border-stone-200" />
            <section className="animate-[fadeInUp_0.5s_ease-out_0.2s_both]">
              <AddonToggles
                optionalItems={optionalItems}
                toggles={toggles}
                onToggle={handleToggle}
                readOnly={isAccepted}
              />
            </section>
          </>
        )}

        {/* Color selector */}
        <hr className="border-stone-200" />
        <section className="animate-[fadeInUp_0.5s_ease-out_0.25s_both]">
          <ColorSelector
            courtType={courtType}
            sports={sports}
            colors={colors}
            colorSelections={colorSelections}
            onColorChange={handleColorChange}
            readOnly={isAccepted}
          />
        </section>

        {/* Terms */}
        {quote.terms_and_conditions && (
          <>
            <hr className="border-stone-200" />
            <section className="animate-[fadeInUp_0.5s_ease-out_0.3s_both]">
              <p className="text-[11px] text-stone-400 uppercase tracking-[0.2em] font-medium mb-3">
                Terms & Conditions
              </p>
              <p className="text-xs text-stone-400 whitespace-pre-wrap leading-relaxed">
                {quote.terms_and_conditions}
              </p>
            </section>
          </>
        )}
      </main>

      {/* Payment schedule (shown above running total if custom) */}
      {quote.payment_schedule && quote.payment_schedule.length > 1 && (
        <div className="max-w-2xl mx-auto px-6 pb-4">
          <div className="rounded-lg border border-stone-200 bg-white p-5">
            <p className="text-[11px] text-stone-400 uppercase tracking-[0.2em] font-medium mb-3">
              Payment Schedule
            </p>
            <div className="space-y-2">
              {quote.payment_schedule.map((m, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-stone-600">
                    {i + 1}. {m.label}
                  </span>
                  <span className="tabular-nums font-medium text-stone-700">
                    ${m.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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
