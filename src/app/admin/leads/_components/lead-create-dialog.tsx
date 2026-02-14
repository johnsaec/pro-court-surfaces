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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createLead,
  type LeadCreateData,
} from "@/lib/admin/actions/lead-actions";
import { DEAL_STAGE_LABELS, LEAD_SOURCE_LABELS } from "@/lib/constants";

interface LeadCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LeadCreateDialog({ open, onOpenChange }: LeadCreateDialogProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [dealStage, setDealStage] = useState("new_lead");
  const [leadSource, setLeadSource] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    const data: LeadCreateData = {
      display_name: formData.get("display_name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      deal_stage: dealStage,
      lead_source: leadSource || undefined,
    };

    startTransition(async () => {
      const result = await createLead(data);
      if (result.success) {
        onOpenChange(false);
        setDealStage("new_lead");
        setLeadSource("");
      } else {
        setError(result.error ?? "Something went wrong");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Lead</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Display Name"
            name="display_name"
            required
            placeholder="e.g. John Smith"
          />
          <FormField
            label="Email"
            name="email"
            type="email"
          />
          <FormField
            label="Phone"
            name="phone"
            type="tel"
          />
          <FormField label="Deal Stage" name="deal_stage">
            <Select value={dealStage} onValueChange={setDealStage}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(DEAL_STAGE_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Lead Source" name="lead_source">
            <Select value={leadSource} onValueChange={setLeadSource}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select source..." />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(LEAD_SOURCE_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
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
              {isPending ? "Creating..." : "Create Lead"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
