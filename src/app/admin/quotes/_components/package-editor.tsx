"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { LineItemRow } from "./line-item-row";
import { ServicePickerDialog } from "./service-picker-dialog";
import { createEmptyLineItem, computePackageSubtotal } from "@/lib/admin/quote-builder-reducer";
import type { Service } from "@/lib/admin/queries/catalog-queries";
import type { PackageState, ProjectOption, QuoteBuilderAction } from "@/lib/admin/types/quote-types";

interface PackageEditorProps {
  pkg: PackageState;
  services: Service[];
  project: ProjectOption | null;
  dispatch: React.Dispatch<QuoteBuilderAction>;
}

export function PackageEditor({
  pkg,
  services,
  project,
  dispatch,
}: PackageEditorProps) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const subtotal = computePackageSubtotal(pkg.line_items);

  return (
    <div className="space-y-4">
      {/* Package metadata */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label>Package Name</Label>
          <Input
            value={pkg.name}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_PACKAGE",
                packageKey: pkg._key,
                field: "name",
                value: e.target.value,
              })
            }
          />
        </div>
        <div className="space-y-1.5">
          <Label>Description</Label>
          <Textarea
            value={pkg.description}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_PACKAGE",
                packageKey: pkg._key,
                field: "description",
                value: e.target.value,
              })
            }
            rows={1}
          />
        </div>
      </div>

      {/* Line items table */}
      {pkg.line_items.length > 0 ? (
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Optional</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {pkg.line_items.map((item) => (
                <LineItemRow
                  key={item._key}
                  item={item}
                  packageKey={pkg._key}
                  dispatch={dispatch}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground text-sm">
          No line items yet. Add a service from the catalog or create a custom item.
        </div>
      )}

      {/* Footer: add buttons + subtotal */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setPickerOpen(true)}
          >
            <Plus className="size-4 mr-1" />
            From Catalog
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              dispatch({
                type: "ADD_LINE_ITEM",
                packageKey: pkg._key,
                item: createEmptyLineItem(),
              })
            }
          >
            <Plus className="size-4 mr-1" />
            Custom Item
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-destructive"
            onClick={() =>
              dispatch({ type: "REMOVE_PACKAGE", packageKey: pkg._key })
            }
          >
            <Trash2 className="size-4 mr-1" />
            Remove Package
          </Button>
        </div>
        <div className="text-sm font-medium tabular-nums">
          Subtotal: ${subtotal.toFixed(2)}
        </div>
      </div>

      <ServicePickerDialog
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        services={services}
        packageKey={pkg._key}
        project={project}
        dispatch={dispatch}
      />
    </div>
  );
}
