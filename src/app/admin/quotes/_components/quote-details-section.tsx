"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2 } from "lucide-react";
import type { Color } from "@/lib/admin/queries/color-queries";
import type {
  QuoteBuilderState,
  QuoteBuilderAction,
  PaymentMilestone,
} from "@/lib/admin/types/quote-types";

interface QuoteDetailsSectionProps {
  state: QuoteBuilderState;
  colors: Color[];
  dispatch: React.Dispatch<QuoteBuilderAction>;
}

const NONE_VALUE = "__none__";
const LINE_COLOR_NAMES = new Set(["white", "black", "gray", "yellow"]);

function ColorSelect({
  label,
  field,
  value,
  colors,
  dispatch,
}: {
  label: string;
  field: "color_inside_id" | "color_outside_id" | "color_lines_id" | "color_nvz_id";
  value: string;
  colors: Color[];
  dispatch: React.Dispatch<QuoteBuilderAction>;
}) {
  const activeColors = colors.filter((c) => c.is_active);
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Select
        value={value || NONE_VALUE}
        onValueChange={(v) =>
          dispatch({
            type: "SET_COLOR",
            field,
            value: v === NONE_VALUE ? "" : v,
          })
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select color..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={NONE_VALUE}>None</SelectItem>
          {activeColors.map((c) => (
            <SelectItem key={c.id} value={c.id}>
              <span className="flex items-center gap-2">
                <span
                  className="size-3 rounded-full border shrink-0"
                  style={{ backgroundColor: c.hex_code }}
                />
                {c.name}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function QuoteDetailsSection({
  state,
  colors,
  dispatch,
}: QuoteDetailsSectionProps) {
  function handleMilestoneChange(
    index: number,
    field: "label" | "amount",
    value: string
  ) {
    const updated = [...state.payment_schedule];
    if (field === "amount") {
      updated[index] = { ...updated[index], amount: parseFloat(value) || 0 };
    } else {
      updated[index] = { ...updated[index], label: value };
    }
    dispatch({ type: "SET_PAYMENT_SCHEDULE", schedule: updated });
  }

  function addMilestone() {
    const labels = ["Deposit", "Mid-Project", "Final Balance", "Payment"];
    const nextLabel =
      state.payment_schedule.length < labels.length
        ? labels[state.payment_schedule.length]
        : `Payment ${state.payment_schedule.length + 1}`;

    dispatch({
      type: "SET_PAYMENT_SCHEDULE",
      schedule: [
        ...state.payment_schedule,
        { label: nextLabel, amount: 0 },
      ],
    });
  }

  function removeMilestone(index: number) {
    dispatch({
      type: "SET_PAYMENT_SCHEDULE",
      schedule: state.payment_schedule.filter((_, i) => i !== index),
    });
  }

  function handlePaymentModeChange(mode: string) {
    dispatch({ type: "SET_FIELD", field: "payment_mode", value: mode });
    if (mode === "custom" && state.payment_schedule.length === 0) {
      // Seed with 2 milestones
      dispatch({
        type: "SET_PAYMENT_SCHEDULE",
        schedule: [
          { label: "Deposit", amount: 0 },
          { label: "Final Balance", amount: 0 },
        ],
      });
    }
  }

  const scheduleTotal = state.payment_schedule.reduce(
    (sum, m) => sum + m.amount,
    0
  );

  return (
    <div className="space-y-6">
      {/* Colors */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Colors</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ColorSelect
            label="Inside Color"
            field="color_inside_id"
            value={state.color_inside_id}
            colors={colors}
            dispatch={dispatch}
          />
          <ColorSelect
            label="Outside Color"
            field="color_outside_id"
            value={state.color_outside_id}
            colors={colors}
            dispatch={dispatch}
          />
          <ColorSelect
            label="NVZ (Kitchen) Color"
            field="color_nvz_id"
            value={state.color_nvz_id}
            colors={colors}
            dispatch={dispatch}
          />
          <ColorSelect
            label="Lines Color"
            field="color_lines_id"
            value={state.color_lines_id}
            colors={colors.filter((c) => LINE_COLOR_NAMES.has(c.name.toLowerCase()))}
            dispatch={dispatch}
          />
        </div>
      </div>

      <Separator />

      {/* Messaging */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Messaging & Terms</h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-1.5">
            <Label>Cover Note</Label>
            <Textarea
              value={state.cover_note}
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "cover_note",
                  value: e.target.value,
                })
              }
              rows={3}
              placeholder="Personal message shown at the top of the quote..."
            />
          </div>
          <div className="space-y-1.5">
            <Label>Terms & Conditions</Label>
            <Textarea
              value={state.terms_and_conditions}
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "terms_and_conditions",
                  value: e.target.value,
                })
              }
              rows={3}
              placeholder="Payment terms, warranty info, scheduling notes..."
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Payment Terms */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Payment Terms</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Payment Schedule</Label>
            <Select
              value={state.payment_mode}
              onValueChange={handlePaymentModeChange}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard (50% Deposit)</SelectItem>
                <SelectItem value="custom">Custom Schedule</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Invoice Due (Days)</Label>
            <Input
              type="number"
              value={state.deposit_due_days}
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "deposit_due_days",
                  value: parseInt(e.target.value) || 7,
                })
              }
              min={1}
              placeholder="7"
            />
          </div>
        </div>

        {/* Custom payment milestones */}
        {state.payment_mode === "custom" && (
          <div className="space-y-3 rounded-md border p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                Payment Milestones
              </p>
              <p className="text-xs text-muted-foreground tabular-nums">
                Schedule total: ${scheduleTotal.toFixed(2)}
              </p>
            </div>

            {state.payment_schedule.map((milestone, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-5 shrink-0">
                  {i + 1}.
                </span>
                <Input
                  value={milestone.label}
                  onChange={(e) =>
                    handleMilestoneChange(i, "label", e.target.value)
                  }
                  placeholder="Label"
                  className="flex-1"
                />
                <div className="relative w-32">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    $
                  </span>
                  <Input
                    type="number"
                    value={milestone.amount || ""}
                    onChange={(e) =>
                      handleMilestoneChange(i, "amount", e.target.value)
                    }
                    placeholder="0.00"
                    step="0.01"
                    min={0}
                    className="pl-7 tabular-nums"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeMilestone(i)}
                  className="shrink-0 size-8 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addMilestone}
              className="w-full"
            >
              <Plus className="size-3.5 mr-1.5" />
              Add Milestone
            </Button>
          </div>
        )}
      </div>

      <Separator />

      {/* Internal + discount */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Internal</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Internal Notes</Label>
            <Textarea
              value={state.internal_notes}
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "internal_notes",
                  value: e.target.value,
                })
              }
              rows={2}
              placeholder="Notes visible only to your team..."
            />
          </div>
          <div className="space-y-1.5">
            <Label>Discount Amount ($)</Label>
            <Input
              type="number"
              value={state.discount_amount || ""}
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "discount_amount",
                  value: parseFloat(e.target.value) || 0,
                })
              }
              min={0}
              step="0.01"
              placeholder="0.00"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
