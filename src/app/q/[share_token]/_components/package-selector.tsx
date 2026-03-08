"use client";

import { PACKAGE_TIER_LABELS, UNIT_OF_MEASURE_LABELS } from "@/lib/constants";
import type { QuotePackageRow } from "@/lib/admin/types/quote-types";
import { Check } from "lucide-react";

interface PackageSelectorProps {
  packages: QuotePackageRow[];
  selectedPackageId: string | null;
  onSelect: (packageId: string) => void;
  readOnly?: boolean;
}

export function PackageSelector({
  packages,
  selectedPackageId,
  onSelect,
  readOnly,
}: PackageSelectorProps) {
  const isSinglePackage = packages.length === 1;

  return (
    <div className="space-y-5">
      <p className="text-[11px] text-stone-400 uppercase tracking-[0.2em] font-medium">
        {isSinglePackage ? "Your Proposal" : "Select Your Package"}
      </p>

      <div className="space-y-4">
        {packages.map((pkg) => {
          const isSelected = pkg.id === selectedPackageId;
          const nonOptionalItems = pkg.quote_line_items.filter(
            (li) => !li.is_optional
          );
          const packageTotal = nonOptionalItems.reduce(
            (sum, li) => sum + li.total_price,
            0
          );
          const tierLabel = PACKAGE_TIER_LABELS[pkg.tier] ?? pkg.tier;

          return (
            <div
              key={pkg.id}
              role={isSinglePackage ? undefined : "radio"}
              aria-checked={isSinglePackage ? undefined : isSelected}
              tabIndex={isSinglePackage || readOnly ? undefined : 0}
              onClick={() => !readOnly && !isSinglePackage && onSelect(pkg.id)}
              onKeyDown={(e) => {
                if (!readOnly && !isSinglePackage && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  onSelect(pkg.id);
                }
              }}
              className={[
                "relative rounded-lg border bg-white transition-all duration-200",
                !isSinglePackage && !readOnly && "cursor-pointer",
                isSelected
                  ? "border-[#1a5632] shadow-sm ring-1 ring-[#1a5632]/20"
                  : "border-stone-200 hover:border-stone-300",
                readOnly && !isSelected ? "opacity-40" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {/* Recommended ribbon */}
              {pkg.is_recommended && !isSinglePackage && (
                <div className="absolute -top-3 right-6">
                  <span className="inline-block bg-[#1a5632] text-white text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                    Recommended
                  </span>
                </div>
              )}

              <div className="p-6 sm:p-8">
                {/* Top row: radio + tier + package name */}
                <div className="flex items-start gap-4">
                  {/* Radio indicator (only for multi-package) */}
                  {!isSinglePackage && (
                    <div
                      className={[
                        "mt-0.5 shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                        isSelected
                          ? "border-[#1a5632] bg-[#1a5632]"
                          : "border-stone-300",
                      ].join(" ")}
                    >
                      {isSelected && (
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      )}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    {/* Tier badge */}
                    {!isSinglePackage && (
                      <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#1a5632] bg-[#1a5632]/8 px-2.5 py-0.5 rounded mb-2">
                        {tierLabel}
                      </span>
                    )}

                    {/* Package name */}
                    <h3
                      className="text-xl sm:text-2xl text-stone-800"
                      style={{ fontFamily: "var(--font-display), serif" }}
                    >
                      {pkg.name}
                    </h3>

                    {/* Description */}
                    {pkg.description && (
                      <p className="text-sm text-stone-500 mt-2 leading-relaxed">
                        {pkg.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Line items */}
                <div className="mt-6 border-t border-stone-100 pt-5">
                  <div className="space-y-3">
                    {nonOptionalItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-baseline justify-between gap-4"
                      >
                        <div className="flex-1 min-w-0">
                          <span className="text-sm text-stone-700">
                            {item.name}
                          </span>
                          {item.unit_of_measure &&
                            item.unit_of_measure !== "flat_rate" && (
                              <span className="text-xs text-stone-400 ml-2">
                                {item.quantity} &times;{" "}
                                {UNIT_OF_MEASURE_LABELS[item.unit_of_measure] ??
                                  item.unit_of_measure}
                              </span>
                            )}
                        </div>
                        <span className="text-sm font-medium tabular-nums text-stone-700 shrink-0">
                          ${item.total_price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Package total */}
                  <div className="mt-5 pt-4 border-t border-stone-200 flex items-baseline justify-between">
                    <span className="text-sm font-medium text-stone-500">
                      Package Total
                    </span>
                    <span
                      className="text-2xl font-semibold tabular-nums text-stone-800"
                      style={{ fontFamily: "var(--font-display), serif" }}
                    >
                      ${packageTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
