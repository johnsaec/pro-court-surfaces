"use client";

import { useReducer, useState, useTransition, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CustomerProjectSection } from "./customer-project-section";
import { PackageBuilderSection } from "./package-builder-section";
import { QuoteDetailsSection } from "./quote-details-section";
import {
  quoteBuilderReducer,
  createEmptyState,
  stateFromQuote,
  getRecommendedPackageSubtotal,
} from "@/lib/admin/quote-builder-reducer";
import { saveQuote } from "@/lib/admin/actions/quote-actions";
import type { Service } from "@/lib/admin/queries/catalog-queries";
import type { Color } from "@/lib/admin/queries/color-queries";
import type {
  CustomerOption,
  LeadOption,
  ProjectData,
  QuoteDetail,
  QuoteSavePayload,
} from "@/lib/admin/types/quote-types";

interface QuoteBuilderProps {
  quote?: QuoteDetail;
  customers: CustomerOption[];
  leads: LeadOption[];
  services: Service[];
  colors: Color[];
}

export function QuoteBuilder({
  quote,
  customers,
  leads,
  services,
  colors,
}: QuoteBuilderProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [state, dispatch] = useReducer(
    quoteBuilderReducer,
    quote,
    (q) => (q ? stateFromQuote(q) : createEmptyState())
  );

  // Derive project data for the service picker
  const projectData: ProjectData = useMemo(
    () => ({
      square_feet: state.square_feet ? parseFloat(state.square_feet) : null,
      number_of_courts: state.number_of_courts ? parseInt(state.number_of_courts) : null,
      crack_length_ft: state.crack_length_ft ? parseFloat(state.crack_length_ft) : null,
      bird_bath_count: state.bird_bath_count ? parseInt(state.bird_bath_count) : null,
    }),
    [state.square_feet, state.number_of_courts, state.crack_length_ft, state.bird_bath_count]
  );

  const subtotal = getRecommendedPackageSubtotal(state);
  const total = Math.max(0, subtotal - state.discount_amount);

  function handleSave() {
    if (!state.customer_id && !state.lead_id) {
      setError("Please select a customer or lead.");
      return;
    }
    if (state.packages.length === 0) {
      setError("Please add at least one package.");
      return;
    }

    setError(null);

    const payload: QuoteSavePayload = {
      id: quote?.id,
      customer_id: state.customer_id || null,
      lead_id: state.lead_id || null,
      project_type: state.project_type || null,
      sports: state.sports.length ? state.sports : null,
      square_feet: state.square_feet ? parseFloat(state.square_feet) : null,
      number_of_courts: state.number_of_courts ? parseInt(state.number_of_courts) : null,
      city: state.city || null,
      address_line1: state.address_line1 || null,
      state: state.state || null,
      crack_length_ft: state.crack_length_ft ? parseFloat(state.crack_length_ft) : null,
      bird_bath_count: state.bird_bath_count ? parseInt(state.bird_bath_count) : null,
      packages: state.packages.map((pkg) => ({
        tier: pkg.tier,
        name: pkg.name,
        description: pkg.description,
        is_recommended: pkg.is_recommended,
        sort_order: pkg.sort_order,
        line_items: pkg.line_items.map((li, idx) => ({
          service_id: li.service_id,
          name: li.name,
          description: li.description,
          line_item_type: li.line_item_type,
          unit_of_measure: li.unit_of_measure,
          quantity: li.quantity,
          unit_price: li.unit_price,
          total_price: li.total_price,
          is_optional: li.is_optional,
          is_included_by_default: li.is_included_by_default,
          sort_order: idx,
        })),
      })),
      color_inside_id: state.color_inside_id || null,
      color_outside_id: state.color_outside_id || null,
      color_lines_id: state.color_lines_id || null,
      color_nvz_id: state.color_nvz_id || null,
      cover_note: state.cover_note || null,
      terms_and_conditions: state.terms_and_conditions || null,
      internal_notes: state.internal_notes || null,
      discount_amount: state.discount_amount,
      deposit_due_days: state.deposit_due_days,
      deposit_percent: state.deposit_percent,
      show_signature: state.show_signature,
      payment_schedule:
        state.payment_mode === "custom" && state.payment_schedule.length > 0
          ? state.payment_schedule
          : null,
      subtotal,
      total,
    };

    startTransition(async () => {
      const result = await saveQuote(payload);
      if (result.success) {
        toast.success(quote ? "Quote updated" : "Quote created");
        router.push("/admin/quotes");
      } else {
        const msg = result.error ?? "Failed to save quote";
        setError(msg);
        toast.error(msg);
      }
    });
  }

  return (
    <div className="max-w-5xl space-y-8">
      <CustomerProjectSection
        state={state}
        customers={customers}
        leads={leads}
        dispatch={dispatch}
      />

      <Separator />

      <PackageBuilderSection
        state={state}
        services={services}
        projectData={projectData}
        dispatch={dispatch}
      />

      <Separator />

      <QuoteDetailsSection
        state={state}
        colors={colors}
        dispatch={dispatch}
      />

      <Separator />

      {/* Totals */}
      <div className="flex flex-wrap items-center justify-end gap-6 text-sm">
        <div className="text-muted-foreground">
          Subtotal: <span className="font-medium text-foreground tabular-nums">${subtotal.toFixed(2)}</span>
        </div>
        {state.discount_amount > 0 && (
          <div className="text-muted-foreground">
            Discount: <span className="font-medium text-red-600 tabular-nums">-${state.discount_amount.toFixed(2)}</span>
          </div>
        )}
        <div className="text-base font-semibold tabular-nums">
          Total: ${total.toFixed(2)}
        </div>
      </div>

      {/* Actions */}
      {error && <p className="text-sm text-destructive">{error}</p>}
      <div className="flex flex-wrap gap-3">
        <Button onClick={handleSave} disabled={isPending}>
          {isPending
            ? "Saving..."
            : quote
              ? "Update Quote"
              : "Create Quote"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/quotes")}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
