"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
import { QUOTE_STATUS_LABELS, QUOTE_STATUS_COLORS } from "@/lib/constants";

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
      // Reset toggles for new package
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

  // Detect court type from quote sports or project_type
  const courtType: "pickleball" | "tennis" =
    quote.sports?.includes("pickleball") || quote.project_type === "pickleball_court"
      ? "pickleball"
      : "tennis";

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold">
                Quote {quote.quote_number}
              </h1>
              <p className="text-sm text-muted-foreground">
                {quote.city && `${quote.city}${quote.state ? `, ${quote.state}` : ""}`}
              </p>
            </div>
            {isAccepted && (
              <Badge className={QUOTE_STATUS_COLORS.accepted}>
                {QUOTE_STATUS_LABELS.accepted}
              </Badge>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-8 space-y-8 pb-28">
        {/* Cover note */}
        {quote.cover_note && (
          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground whitespace-pre-wrap">
              {quote.cover_note}
            </p>
          </div>
        )}

        {/* Package selector */}
        <PackageSelector
          packages={quote.quote_packages}
          selectedPackageId={selectedPackageId}
          onSelect={handlePackageSelect}
          readOnly={isAccepted}
        />

        {/* Add-ons */}
        {optionalItems.length > 0 && (
          <>
            <Separator />
            <AddonToggles
              optionalItems={optionalItems}
              toggles={toggles}
              onToggle={handleToggle}
              readOnly={isAccepted}
            />
          </>
        )}

        {/* Color selector */}
        <Separator />
        <ColorSelector
          courtType={courtType}
          colors={colors}
          colorSelections={colorSelections}
          onColorChange={handleColorChange}
          readOnly={isAccepted}
        />

        {/* Terms */}
        {quote.terms_and_conditions && (
          <>
            <Separator />
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Terms & Conditions</h3>
              <p className="text-xs text-muted-foreground whitespace-pre-wrap">
                {quote.terms_and_conditions}
              </p>
            </div>
          </>
        )}
      </main>

      {/* Running total bar */}
      <RunningTotal
        total={total}
        hasSelection={!!selectedPackageId}
        onAcceptClick={() => setShowAcceptDialog(true)}
        readOnly={isAccepted}
      />

      {/* Accept dialog */}
      <AcceptDialog
        open={showAcceptDialog}
        onClose={() => setShowAcceptDialog(false)}
        onAccept={handleAccept}
        defaultEmail={quote.customer?.email ?? quote.lead?.email ?? null}
        total={total}
      />
    </div>
  );
}
