"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
    <Card>
      <CardHeader>
        <CardTitle>Optional Add-Ons</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {optionalItems.map((item) => {
          const isEnabled = toggles.get(item.id) ?? false;
          return (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <Label
                  htmlFor={`addon-${item.id}`}
                  className="text-sm font-medium cursor-pointer"
                >
                  {item.name}
                </Label>
                {item.description && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {item.description}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-sm font-medium tabular-nums text-muted-foreground">
                  +${item.total_price.toFixed(2)}
                </span>
                <Switch
                  id={`addon-${item.id}`}
                  checked={isEnabled}
                  onCheckedChange={(checked) =>
                    !readOnly && onToggle(item.id, !!checked)
                  }
                  disabled={readOnly}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
