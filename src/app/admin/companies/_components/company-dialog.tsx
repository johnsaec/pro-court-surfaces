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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createCompany,
  updateCompany,
  type CompanyFormData,
} from "@/lib/admin/actions/company-actions";
import { COMPANY_TYPE_LABELS } from "@/lib/constants";
import type { Company } from "@/lib/admin/queries/company-queries";

interface CompanyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  company?: Company | null;
}

export function CompanyDialog({
  open,
  onOpenChange,
  company,
}: CompanyDialogProps) {
  const isEditing = !!company;
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [companyType, setCompanyType] = useState(
    company?.company_type ?? "general_contractor"
  );
  const [tags, setTags] = useState<string[]>(company?.tags ?? []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    const data: CompanyFormData = {
      name: formData.get("name") as string,
      company_type: companyType,
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
        ? await updateCompany(company.id, data)
        : await createCompany(data);

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
            {isEditing ? "Edit Company" : "New Company"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Company Name"
              name="name"
              required
              defaultValue={company?.name ?? ""}
              placeholder="e.g. ABC Construction"
            />
            <FormField label="Type" name="company_type">
              <Select value={companyType} onValueChange={setCompanyType}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(COMPANY_TYPE_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
            <FormField
              label="Email"
              name="email"
              type="email"
              defaultValue={company?.email ?? ""}
            />
            <FormField
              label="Phone"
              name="phone"
              type="tel"
              defaultValue={company?.phone ?? ""}
            />
            <FormField
              label="Address Line 1"
              name="address_line1"
              defaultValue={company?.address_line1 ?? ""}
            />
            <FormField
              label="Address Line 2"
              name="address_line2"
              defaultValue={company?.address_line2 ?? ""}
            />
            <FormField
              label="City"
              name="city"
              defaultValue={company?.city ?? ""}
            />
            <FormField
              label="State"
              name="state"
              defaultValue={company?.state ?? "TX"}
            />
            <FormField
              label="ZIP"
              name="zip"
              defaultValue={company?.zip ?? ""}
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
              defaultValue={company?.notes ?? ""}
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
                  : "Create Company"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
