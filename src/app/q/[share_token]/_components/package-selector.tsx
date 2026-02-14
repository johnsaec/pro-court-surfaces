"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PACKAGE_TIER_LABELS, UNIT_OF_MEASURE_LABELS } from "@/lib/constants";
import type { QuotePackageRow } from "@/lib/admin/types/quote-types";
import { CheckCircle2 } from "lucide-react";

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
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Choose Your Package</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {packages.map((pkg) => {
          const isSelected = pkg.id === selectedPackageId;
          const nonOptionalItems = pkg.quote_line_items.filter(
            (li) => !li.is_optional
          );
          const packageTotal = nonOptionalItems.reduce(
            (sum, li) => sum + li.total_price,
            0
          );

          return (
            <Card
              key={pkg.id}
              className={`relative cursor-pointer transition-all ${
                isSelected
                  ? "border-primary ring-2 ring-primary/20"
                  : "hover:border-muted-foreground/40"
              } ${readOnly && !isSelected ? "opacity-50" : ""}`}
              onClick={() => !readOnly && onSelect(pkg.id)}
            >
              {pkg.is_recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground shadow-sm">
                    Recommended
                  </Badge>
                </div>
              )}

              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Badge variant="outline">
                      {PACKAGE_TIER_LABELS[pkg.tier] ?? pkg.tier}
                    </Badge>
                    <CardTitle className="text-lg">{pkg.name}</CardTitle>
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                  )}
                </div>
                {pkg.description && (
                  <p className="text-sm text-muted-foreground">
                    {pkg.description}
                  </p>
                )}
              </CardHeader>

              <CardContent className="space-y-3">
                <ul className="space-y-1.5 text-sm">
                  {nonOptionalItems.map((item) => (
                    <li key={item.id} className="flex justify-between">
                      <span className="text-muted-foreground">
                        {item.name}
                        {item.unit_of_measure && item.unit_of_measure !== "flat_rate" && (
                          <span className="text-xs ml-1">
                            ({item.quantity} × {UNIT_OF_MEASURE_LABELS[item.unit_of_measure] ?? item.unit_of_measure})
                          </span>
                        )}
                      </span>
                      <span className="font-medium tabular-nums">
                        ${item.total_price.toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="border-t pt-3 flex justify-between items-center">
                  <span className="font-medium">Package Total</span>
                  <span className="text-lg font-bold tabular-nums">
                    ${packageTotal.toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
