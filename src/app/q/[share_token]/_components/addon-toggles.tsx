"use client";

import { Switch } from "@/components/ui/switch";
import type { QuoteLineItemRow } from "@/lib/admin/types/quote-types";

interface AddonTogglesProps {
  optionalItems: QuoteLineItemRow[];
  toggles: Map<string, boolean>;
  onToggle: (lineItemId: string, enabled: boolean) => void;
  readOnly?: boolean;
}

export function AddonToggles({
  optionalItems,
  toggles,
  onToggle,
  readOnly,
}: AddonTogglesProps) {
  if (optionalItems.length === 0) return null;

  return (
    <div className="space-y-5">
      <p className="text-[11px] text-stone-400 uppercase tracking-[0.2em] font-medium">
        Optional Enhancements
      </p>

      <div className="space-y-1">
        {optionalItems.map((item) => {
          const isEnabled = toggles.get(item.id) ?? false;
          return (
            <div
              key={item.id}
              className={[
                "flex items-center justify-between gap-4 rounded-lg px-5 py-4 transition-colors border",
                isEnabled
                  ? "bg-[#1a5632]/4 border-[#1a5632]/15"
                  : "bg-white border-stone-200",
              ].join(" ")}
            >
              <div className="flex-1 min-w-0">
                <label
                  htmlFor={`addon-${item.id}`}
                  className="text-sm font-medium text-stone-700 cursor-pointer"
                >
                  {item.name}
                </label>
                {item.description && (
                  <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span className="text-sm tabular-nums text-stone-500">
                  +${item.total_price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </span>
                <Switch
                  id={`addon-${item.id}`}
                  checked={isEnabled}
                  onCheckedChange={(checked) =>
                    !readOnly && onToggle(item.id, !!checked)
                  }
                  disabled={readOnly}
                  className="data-[state=checked]:bg-[#1a5632]"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
