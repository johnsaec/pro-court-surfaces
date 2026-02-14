"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Star } from "lucide-react";
import {
  QUOTE_STATUS_LABELS,
  QUOTE_STATUS_COLORS,
  PACKAGE_TIER_LABELS,
  UNIT_OF_MEASURE_LABELS,
  PROJECT_TYPE_LABELS,
} from "@/lib/constants";
import type { QuoteDetail } from "@/lib/admin/types/quote-types";

function ColorSwatch({ label, color }: { label: string; color: { name: string; hex_code: string } | null }) {
  if (!color) return null;
  return (
    <div className="flex items-center gap-2">
      <span
        className="size-4 rounded-full border shrink-0"
        style={{ backgroundColor: color.hex_code }}
      />
      <span className="text-sm">
        <span className="text-muted-foreground">{label}:</span> {color.name}
      </span>
    </div>
  );
}

export function QuotePreview({ quote }: { quote: QuoteDetail }) {
  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">{quote.quote_number}</h2>
          <p className="text-muted-foreground">
            Version {quote.version} &middot;{" "}
            {new Date(quote.created_at).toLocaleDateString()}
          </p>
        </div>
        <Badge className={QUOTE_STATUS_COLORS[quote.status]}>
          {QUOTE_STATUS_LABELS[quote.status] ?? quote.status}
        </Badge>
      </div>

      {/* Customer & Project */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Customer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">
              {quote.customer?.display_name ?? "Unknown"}
            </p>
            {quote.customer?.email && (
              <p className="text-sm text-muted-foreground">
                {quote.customer.email}
              </p>
            )}
            {quote.customer?.phone && (
              <p className="text-sm text-muted-foreground">
                {quote.customer.phone}
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Project
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">
              {quote.project?.name ?? "Unknown"}
            </p>
            {quote.project?.project_type && (
              <p className="text-sm text-muted-foreground">
                {PROJECT_TYPE_LABELS[quote.project.project_type] ??
                  quote.project.project_type}
              </p>
            )}
            {quote.project?.city && (
              <p className="text-sm text-muted-foreground">
                {quote.project.city}
                {quote.project.state ? `, ${quote.project.state}` : ""}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Cover note */}
      {quote.cover_note && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm whitespace-pre-wrap">{quote.cover_note}</p>
          </CardContent>
        </Card>
      )}

      {/* Colors */}
      {(quote.color_inside || quote.color_outside || quote.color_lines) && (
        <div className="flex flex-wrap gap-4">
          <ColorSwatch label="Inside" color={quote.color_inside} />
          <ColorSwatch label="Outside" color={quote.color_outside} />
          <ColorSwatch label="Lines" color={quote.color_lines} />
        </div>
      )}

      {/* Packages */}
      {quote.quote_packages.map((pkg) => (
        <Card key={pkg.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                {pkg.name}
                <Badge variant="secondary">
                  {PACKAGE_TIER_LABELS[pkg.tier] ?? pkg.tier}
                </Badge>
                {pkg.is_recommended && (
                  <Badge className="bg-yellow-100 text-yellow-800">
                    <Star className="size-3 fill-yellow-600 text-yellow-600 mr-1" />
                    Recommended
                  </Badge>
                )}
              </CardTitle>
              <span className="text-lg font-semibold tabular-nums">
                ${pkg.subtotal.toFixed(2)}
              </span>
            </div>
            {pkg.description && (
              <p className="text-sm text-muted-foreground">{pkg.description}</p>
            )}
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead className="text-right">Unit Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pkg.quote_line_items.map((li) => (
                  <TableRow
                    key={li.id}
                    className={li.is_optional ? "opacity-60" : ""}
                  >
                    <TableCell>
                      <div>
                        <span className="font-medium">{li.name}</span>
                        {li.is_optional && (
                          <Badge variant="outline" className="ml-2 text-xs">
                            Optional
                          </Badge>
                        )}
                      </div>
                      {li.description && (
                        <p className="text-xs text-muted-foreground">
                          {li.description}
                        </p>
                      )}
                    </TableCell>
                    <TableCell>
                      {li.unit_of_measure
                        ? UNIT_OF_MEASURE_LABELS[li.unit_of_measure] ??
                          li.unit_of_measure
                        : "—"}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {li.quantity}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      ${li.unit_price.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums font-medium">
                      ${li.total_price.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}

      <Separator />

      {/* Totals */}
      <div className="flex flex-col items-end gap-1 text-sm">
        <div>
          Subtotal:{" "}
          <span className="font-medium tabular-nums">
            ${(quote.subtotal ?? 0).toFixed(2)}
          </span>
        </div>
        {(quote.discount_amount ?? 0) > 0 && (
          <div>
            Discount:{" "}
            <span className="font-medium text-red-600 tabular-nums">
              -${(quote.discount_amount ?? 0).toFixed(2)}
            </span>
          </div>
        )}
        <div className="text-lg font-bold tabular-nums">
          Total: ${(quote.total ?? 0).toFixed(2)}
        </div>
      </div>

      {/* Terms */}
      {quote.terms_and_conditions && (
        <>
          <Separator />
          <div>
            <h3 className="font-semibold mb-2">Terms & Conditions</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {quote.terms_and_conditions}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
