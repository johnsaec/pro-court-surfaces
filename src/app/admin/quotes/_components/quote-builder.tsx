"use client";

import { useReducer, useState, useTransition, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
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
  ProjectOption,
  QuoteDetail,
  QuoteSavePayload,
} from "@/lib/admin/types/quote-types";

interface QuoteBuilderProps {
  quote?: QuoteDetail;
  customers: CustomerOption[];
  projects: ProjectOption[];
  services: Service[];
  colors: Color[];
}

export function QuoteBuilder({
  quote,
  customers,
  projects: initialProjects,
  services,
  colors,
}: QuoteBuilderProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState(initialProjects);

  const [state, dispatch] = useReducer(
    quoteBuilderReducer,
    quote,
    (q) => (q ? stateFromQuote(q) : createEmptyState())
  );

  const selectedProject = useMemo(
    () => projects.find((p) => p.id === state.project_id) ?? null,
    [projects, state.project_id]
  );

  const subtotal = getRecommendedPackageSubtotal(state);
  const total = Math.max(0, subtotal - state.discount_amount);

  const handleProjectCreated = useCallback((newProject: ProjectOption) => {
    setProjects((prev) => [...prev, newProject]);
  }, []);

  function handleSave() {
    if (!state.customer_id || !state.project_id) {
      setError("Please select a customer and project.");
      return;
    }
    if (state.packages.length === 0) {
      setError("Please add at least one package.");
      return;
    }

    setError(null);

    const payload: QuoteSavePayload = {
      id: quote?.id,
      customer_id: state.customer_id,
      project_id: state.project_id,
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
      cover_note: state.cover_note || null,
      terms_and_conditions: state.terms_and_conditions || null,
      internal_notes: state.internal_notes || null,
      discount_amount: state.discount_amount,
      subtotal,
      total,
    };

    startTransition(async () => {
      const result = await saveQuote(payload);
      if (result.success) {
        router.push("/admin/quotes");
      } else {
        setError(result.error ?? "Failed to save quote");
      }
    });
  }

  return (
    <div className="max-w-5xl space-y-8">
      <CustomerProjectSection
        state={state}
        customers={customers}
        projects={projects}
        dispatch={dispatch}
        onProjectCreated={handleProjectCreated}
      />

      <Separator />

      <PackageBuilderSection
        state={state}
        services={services}
        project={selectedProject}
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
      <div className="flex items-center justify-end gap-6 text-sm">
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
      <div className="flex gap-3">
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
