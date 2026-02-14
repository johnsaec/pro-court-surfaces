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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { MultiSelectInput } from "@/components/admin/multi-select-input";
import {
  createColor,
  updateColor,
  type ColorFormData,
} from "@/lib/admin/actions/color-actions";
import { COLOR_RECOMMENDED_OPTIONS } from "@/lib/constants";
import type { Color } from "@/lib/admin/queries/color-queries";

interface ColorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  color?: Color | null;
}

export function ColorDialog({ open, onOpenChange, color }: ColorDialogProps) {
  const isEditing = !!color;
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [hexCode, setHexCode] = useState(color?.hex_code ?? "#000000");
  const [isPremium, setIsPremium] = useState(color?.is_premium ?? false);
  const [isActive, setIsActive] = useState(color?.is_active ?? true);
  const [recommendedFor, setRecommendedFor] = useState<string[]>(
    color?.recommended_for ?? []
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    const data: ColorFormData = {
      name: formData.get("name") as string,
      hex_code: hexCode,
      manufacturer: formData.get("manufacturer") as string,
      product_line: formData.get("product_line") as string,
      color_code: formData.get("color_code") as string,
      recommended_for: recommendedFor,
      is_premium: isPremium,
      premium_upcharge: parseFloat(
        formData.get("premium_upcharge") as string
      ) || 0,
      sort_order: parseInt(formData.get("sort_order") as string) || 0,
      is_active: isActive,
    };

    startTransition(async () => {
      const result = isEditing
        ? await updateColor(color.id, data)
        : await createColor(data);

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
            {isEditing ? "Edit Color" : "New Color"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Name"
              name="name"
              required
              defaultValue={color?.name ?? ""}
              placeholder="e.g. US Open Blue"
            />
            <div className="space-y-1.5">
              <Label htmlFor="hex_code">Hex Code</Label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={hexCode}
                  onChange={(e) => setHexCode(e.target.value.toUpperCase())}
                  className="h-9 w-12 cursor-pointer rounded border border-input p-0.5"
                />
                <input
                  id="hex_code"
                  name="hex_code"
                  value={hexCode}
                  onChange={(e) => setHexCode(e.target.value.toUpperCase())}
                  className="h-9 flex-1 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
                  placeholder="#000000"
                  required
                />
              </div>
            </div>
            <FormField
              label="Manufacturer"
              name="manufacturer"
              required
              defaultValue={color?.manufacturer ?? "SportMaster"}
            />
            <FormField
              label="Product Line"
              name="product_line"
              defaultValue={color?.product_line ?? ""}
            />
            <FormField
              label="Color Code"
              name="color_code"
              defaultValue={color?.color_code ?? ""}
            />
            <FormField
              label="Sort Order"
              name="sort_order"
              type="number"
              defaultValue={color?.sort_order ?? 0}
            />
          </div>
          <MultiSelectInput
            label="Recommended For"
            name="recommended_for"
            value={recommendedFor}
            onChange={setRecommendedFor}
            options={[...COLOR_RECOMMENDED_OPTIONS]}
            mode="checkbox"
          />
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Switch
                id="is_premium"
                checked={isPremium}
                onCheckedChange={setIsPremium}
              />
              <Label htmlFor="is_premium">Premium Color</Label>
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
          {isPremium && (
            <FormField
              label="Premium Upcharge"
              name="premium_upcharge"
              type="number"
              step="0.01"
              min="0"
              defaultValue={color?.premium_upcharge ?? 0}
              placeholder="0.00"
            />
          )}
          {!isPremium && (
            <input type="hidden" name="premium_upcharge" value="0" />
          )}
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
                  : "Create Color"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
