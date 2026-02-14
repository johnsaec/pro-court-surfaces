import type { QuotePackageRow } from "@/lib/admin/types/quote-types";
import type { Color } from "@/lib/admin/queries/color-queries";

export type LineItemToggle = {
  line_item_id: string;
  is_enabled: boolean;
};

export type ColorSelections = {
  inside_id: string | null;
  outside_id: string | null;
  lines_id: string | null;
};

export function computePackageTotal(
  pkg: QuotePackageRow,
  toggles: Map<string, boolean>,
  colorSelections: ColorSelections,
  colors: Color[]
): number {
  let total = 0;

  for (const item of pkg.quote_line_items) {
    if (item.is_optional) {
      // Optional items only count if toggled on
      const isEnabled = toggles.get(item.id);
      if (isEnabled) {
        total += item.total_price;
      }
    } else {
      // Non-optional items always count
      total += item.total_price;
    }
  }

  // Add premium color upcharges
  const selectedColorIds = [
    colorSelections.inside_id,
    colorSelections.outside_id,
    colorSelections.lines_id,
  ];

  for (const colorId of selectedColorIds) {
    if (!colorId) continue;
    const color = colors.find((c) => c.id === colorId);
    if (color?.is_premium) {
      total += color.premium_upcharge;
    }
  }

  return total;
}
