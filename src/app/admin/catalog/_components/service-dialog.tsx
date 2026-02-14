"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/admin/form-field";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createService,
  updateService,
  type ServiceFormData,
} from "@/lib/admin/actions/catalog-actions";
import {
  SERVICE_CATEGORY_LABELS,
  UNIT_OF_MEASURE_LABELS,
  LINE_ITEM_TYPE_LABELS,
} from "@/lib/constants";
import type { Service } from "@/lib/admin/queries/catalog-queries";

interface ServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service?: Service | null;
}

export function ServiceDialog({
  open,
  onOpenChange,
  service,
}: ServiceDialogProps) {
  const isEditing = !!service;
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState(service?.category ?? "surfacing");
  const [unitOfMeasure, setUnitOfMeasure] = useState(
    service?.unit_of_measure ?? "per_sqft"
  );
  const [lineItemType, setLineItemType] = useState(
    service?.line_item_type ?? "base_service"
  );
  const [isAddOn, setIsAddOn] = useState(service?.is_add_on ?? false);
  const [isActive, setIsActive] = useState(service?.is_active ?? true);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    const data: ServiceFormData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      category,
      unit_of_measure: unitOfMeasure,
      base_price: parseFloat(formData.get("base_price") as string),
      line_item_type: lineItemType,
      is_add_on: isAddOn,
      sort_order: parseInt(formData.get("sort_order") as string) || 0,
      is_active: isActive,
    };

    startTransition(async () => {
      const result = isEditing
        ? await updateService(service.id, data)
        : await createService(data);

      if (result.success) {
        onOpenChange(false);
      } else {
        setError(result.error ?? "Something went wrong");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Service" : "New Service"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Name"
              name="name"
              required
              defaultValue={service?.name ?? ""}
              placeholder="e.g. Court Resurfacing"
            />
            <FormField
              label="Base Price"
              name="base_price"
              type="number"
              step="0.01"
              min="0"
              required
              defaultValue={service?.base_price ?? ""}
              placeholder="0.00"
            />
            <FormField label="Category" name="category">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(SERVICE_CATEGORY_LABELS).map(
                    ([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Unit of Measure" name="unit_of_measure">
              <Select value={unitOfMeasure} onValueChange={setUnitOfMeasure}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(UNIT_OF_MEASURE_LABELS).map(
                    ([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Line Item Type" name="line_item_type">
              <Select value={lineItemType} onValueChange={setLineItemType}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(LINE_ITEM_TYPE_LABELS).map(
                    ([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </FormField>
            <FormField
              label="Sort Order"
              name="sort_order"
              type="number"
              defaultValue={service?.sort_order ?? 0}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={service?.description ?? ""}
              rows={2}
            />
          </div>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Switch
                id="is_add_on"
                checked={isAddOn}
                onCheckedChange={setIsAddOn}
              />
              <Label htmlFor="is_add_on">Add-On Service</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="is_active"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
              <Label htmlFor="is_active">Active</Label>
            </div>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending
                ? "Saving..."
                : isEditing
                  ? "Save Changes"
                  : "Create Service"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
