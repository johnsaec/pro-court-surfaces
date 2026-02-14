"use client";

import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import type { Color } from "@/lib/admin/queries/color-queries";

type CourtZone = "outside" | "inside" | "lines";

const ZONE_LABELS: Record<CourtZone, string> = {
  outside: "Outside Court Color",
  inside: "Inside Court Color",
  lines: "Line Color",
};

interface ColorPickerSheetProps {
  open: boolean;
  zone: CourtZone | null;
  colors: Color[];
  selectedColorId: string | null;
  onSelect: (colorId: string) => void;
  onClose: () => void;
}

export function ColorPickerSheet({
  open,
  zone,
  colors,
  selectedColorId,
  onSelect,
  onClose,
}: ColorPickerSheetProps) {
  // Group colors by manufacturer
  const grouped = colors.reduce<Record<string, Color[]>>((acc, color) => {
    if (!color.is_active) return acc;
    const key = color.manufacturer;
    if (!acc[key]) acc[key] = [];
    acc[key].push(color);
    return acc;
  }, {});

  const sortedManufacturers = Object.keys(grouped).sort();

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent side="bottom" className="max-h-[70vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{zone ? ZONE_LABELS[zone] : "Select Color"}</SheetTitle>
          <SheetDescription>
            Choose a color for the {zone ?? ""} area of the court.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 px-4 pb-6">
          {sortedManufacturers.map((manufacturer) => (
            <div key={manufacturer}>
              <h4 className="text-sm font-medium text-muted-foreground mb-3">
                {manufacturer}
              </h4>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                {grouped[manufacturer].map((color) => {
                  const isSelected = color.id === selectedColorId;
                  return (
                    <button
                      key={color.id}
                      onClick={() => {
                        onSelect(color.id);
                        onClose();
                      }}
                      className={`flex flex-col items-center gap-1.5 rounded-lg p-2 transition-colors ${
                        isSelected
                          ? "bg-primary/10 ring-2 ring-primary"
                          : "hover:bg-muted"
                      }`}
                    >
                      <div
                        className="w-10 h-10 rounded-full border-2 shadow-sm"
                        style={{
                          backgroundColor: color.hex_code,
                          borderColor: isSelected
                            ? "hsl(var(--primary))"
                            : "hsl(var(--border))",
                        }}
                      />
                      <span className="text-xs text-center leading-tight line-clamp-2">
                        {color.name}
                      </span>
                      {color.is_premium && (
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                          +${(color.premium_upcharge / 100).toFixed(0)}
                        </Badge>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
