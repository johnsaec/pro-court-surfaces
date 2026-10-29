"use client";

import { Switch } from "@/components/ui/switch";
import { fmtMoney, fmtQty } from "@/lib/quotes/quote-format";
import type { QuotePackageRow, QuoteLineItemRow } from "@/lib/admin/types/quote-types";
import { Check } from "lucide-react";

interface PackageSelectorProps {
  packages: QuotePackageRow[];
  selectedPackageId: string | null;
  onSelect: (packageId: string) => void;
  toggles: Map<string, boolean>;
  onToggle: (lineItemId: string, enabled: boolean) => void;
  readOnly?: boolean;
}

// Same columns as the PDF line-item table: Item · Qty · Unit Price · Total.
// On phones Qty × Unit Price drops under the item name.
function LineRow({
  item,
  striped,
  toggle,
}: {
  item: QuoteLineItemRow;
  striped: boolean;
  toggle?: { checked: boolean; onChange: (v: boolean) => void; disabled?: boolean };
}) {
  const onRequest = item.is_optional && item.total_price === 0;
  return (
    <div
      className={[
        "grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_4rem_6rem_6.5rem] gap-x-3 px-3 py-2.5 border-b border-gray-300/70 text-sm",
        striped ? "bg-gray-100" : "",
      ].join(" ")}
    >
      <div className="min-w-0">
        <div className="flex items-start gap-3">
          {toggle && (
            <Switch
              id={`addon-${item.id}`}
              checked={toggle.checked}
              onCheckedChange={(v) => !toggle.disabled && toggle.onChange(!!v)}
              disabled={toggle.disabled}
              aria-label={`Add ${item.name}`}
              className="mt-0.5 shrink-0 data-[state=checked]:bg-[#1a5632]"
            />
          )}
          <div className="min-w-0">
            <label htmlFor={toggle ? `addon-${item.id}` : undefined} className="text-gray-800">
              {item.name}
            </label>
            {item.description && (
              <p className="text-xs text-gray-500 mt-0.5 leading-snug">{item.description}</p>
            )}
            {!onRequest && (
              <p className="sm:hidden text-xs text-gray-500 mt-1 tabular-nums">
                {fmtQty(item.quantity)} × {fmtMoney(item.unit_price)}
              </p>
            )}
          </div>
        </div>
      </div>
      <span className="hidden sm:block text-right tabular-nums text-gray-700">{fmtQty(item.quantity)}</span>
      <span className="hidden sm:block text-right tabular-nums text-gray-700">
        {onRequest ? "" : fmtMoney(item.unit_price)}
      </span>
      <span className="text-right tabular-nums text-gray-800">
        {onRequest ? "On request" : fmtMoney(item.total_price)}
      </span>
    </div>
  );
}

export function PackageSelector({
  packages,
  selectedPackageId,
  onSelect,
  toggles,
  onToggle,
  readOnly,
}: PackageSelectorProps) {
  const isSinglePackage = packages.length === 1;

  return (
    <div>
      <h2 className="text-base font-bold text-[#1a5632] mb-3">
        {isSinglePackage ? "Selected Package" : "Package Options"}
      </h2>

      <div className="space-y-6">
        {packages.map((pkg) => {
          const isSelected = pkg.id === selectedPackageId;
          const selectable = !isSinglePackage && !readOnly;
          const included = pkg.quote_line_items.filter((li) => !li.is_optional);
          const addons = pkg.quote_line_items.filter((li) => li.is_optional);

          return (
            <div
              key={pkg.id}
              className={[
                "rounded-md transition-shadow",
                !isSinglePackage && isSelected ? "ring-2 ring-[#1a5632] ring-offset-4 ring-offset-white" : "",
                readOnly && !isSelected ? "opacity-40" : "",
              ].join(" ")}
            >
              {/* Package header: grey bar with name + green subtotal, like the PDF */}
              <div
                role={selectable ? "radio" : undefined}
                aria-checked={selectable ? isSelected : undefined}
                tabIndex={selectable ? 0 : undefined}
                onClick={() => selectable && onSelect(pkg.id)}
                onKeyDown={(e) => {
                  if (selectable && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    onSelect(pkg.id);
                  }
                }}
                className={[
                  "flex items-center justify-between gap-4 rounded-md bg-gray-100 px-4 py-3",
                  selectable ? "cursor-pointer hover:bg-gray-200/70" : "",
                ].join(" ")}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {!isSinglePackage && (
                    <span
                      className={[
                        "shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center",
                        isSelected ? "border-[#1a5632] bg-[#1a5632]" : "border-gray-400 bg-white",
                      ].join(" ")}
                    >
                      {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="font-bold text-gray-800 leading-snug">
                      {pkg.name}
                      {pkg.is_recommended && !isSinglePackage && (
                        <span className="ml-2 align-middle text-[10px] font-semibold uppercase tracking-wider text-white bg-[#1a5632] px-2 py-0.5 rounded">
                          Recommended
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <span className="font-bold text-[#1a5632] tabular-nums shrink-0">
                  {fmtMoney(pkg.subtotal)}
                </span>
              </div>
              {pkg.description && (
                <p className="text-xs text-gray-500 mt-2 px-1">{pkg.description}</p>
              )}

              {/* Line items table */}
              <div className="mt-2">
                <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_4rem_6rem_6.5rem] gap-x-3 rounded-sm bg-[#1a5632] px-3 py-2 text-xs font-bold text-white">
                  <span>Item</span>
                  <span className="hidden sm:block text-right">Qty</span>
                  <span className="hidden sm:block text-right">Unit Price</span>
                  <span className="text-right">Total</span>
                </div>
                {included.map((item, i) => (
                  <LineRow key={item.id} item={item} striped={i % 2 === 1} />
                ))}
                {addons.length > 0 && (
                  <>
                    <p className="text-xs font-bold uppercase text-gray-500 mt-3 mb-1 px-1">
                      Optional Add-Ons (not included in total)
                      {isSelected && !readOnly && (
                        <span className="normal-case font-normal"> · switch on to add</span>
                      )}
                    </p>
                    {addons.map((item, i) => (
                      <LineRow
                        key={item.id}
                        item={item}
                        striped={i % 2 === 1}
                        toggle={
                          isSelected
                            ? {
                                checked: toggles.get(item.id) ?? false,
                                onChange: (v) => onToggle(item.id, v),
                                disabled: readOnly,
                              }
                            : undefined
                        }
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
