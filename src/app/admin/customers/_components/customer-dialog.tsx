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
import { MultiSelectInput } from "@/components/admin/multi-select-input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  createCustomer,
  updateCustomer,
  type CustomerFormData,
} from "@/lib/admin/actions/customer-actions";
import type { Customer } from "@/lib/admin/queries/customer-queries";

interface CustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer?: Customer | null;
}

export function CustomerDialog({
  open,
  onOpenChange,
  customer,
}: CustomerDialogProps) {
  const isEditing = !!customer;
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>(customer?.tags ?? []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    const data: CustomerFormData = {
      display_name: formData.get("display_name") as string,
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address_line1: formData.get("address_line1") as string,
      address_line2: formData.get("address_line2") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      zip: formData.get("zip") as string,
      notes: formData.get("notes") as string,
      tags,
    };

    startTransition(async () => {
      const result = isEditing
        ? await updateCustomer(customer.id, data)
        : await createCustomer(data);

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
            {isEditing ? "Edit Customer" : "New Customer"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Display Name"
              name="display_name"
              required
              defaultValue={customer?.display_name ?? ""}
              placeholder="e.g. John Smith"
            />
            <FormField
              label="Email"
              name="email"
              type="email"
              defaultValue={customer?.email ?? ""}
            />
            <FormField
              label="First Name"
              name="first_name"
              defaultValue={customer?.first_name ?? ""}
            />
            <FormField
              label="Last Name"
              name="last_name"
              defaultValue={customer?.last_name ?? ""}
            />
            <FormField
              label="Phone"
              name="phone"
              type="tel"
              defaultValue={customer?.phone ?? ""}
            />
            <FormField
              label="Address Line 1"
              name="address_line1"
              defaultValue={customer?.address_line1 ?? ""}
            />
            <FormField
              label="Address Line 2"
              name="address_line2"
              defaultValue={customer?.address_line2 ?? ""}
            />
            <FormField
              label="City"
              name="city"
              defaultValue={customer?.city ?? ""}
            />
            <FormField
              label="State"
              name="state"
              defaultValue={customer?.state ?? "TX"}
            />
            <FormField
              label="ZIP"
              name="zip"
              defaultValue={customer?.zip ?? ""}
            />
          </div>
          <MultiSelectInput
            label="Tags"
            name="tags"
            value={tags}
            onChange={setTags}
            placeholder="Add tags..."
          />
          <div className="space-y-1.5">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              defaultValue={customer?.notes ?? ""}
              rows={3}
            />
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
                  : "Create Customer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
