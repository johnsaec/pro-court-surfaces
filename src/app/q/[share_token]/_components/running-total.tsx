"use client";

import type { PaymentMilestone } from "@/lib/admin/types/quote-types";

interface RunningTotalProps {
  total: number;
  hasSelection: boolean;
  onAcceptClick: () => void;
  readOnly?: boolean;
  paymentSchedule?: PaymentMilestone[] | null;
}

export function RunningTotal({
  total,
  hasSelection,
  onAcceptClick,
  readOnly,
  paymentSchedule,
}: RunningTotalProps) {
  if (readOnly) return null;

  // First milestone amount, or default 50%
  const depositAmount =
    paymentSchedule && paymentSchedule.length > 0
      ? paymentSchedule[0].amount
      : total / 2;

  const depositLabel =
    paymentSchedule && paymentSchedule.length > 0
      ? paymentSchedule[0].label
      : "50% Deposit";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-stone-200 bg-white/95 backdrop-blur-sm supports-[backdrop-filter]:bg-white/90">
      <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs text-stone-400 mb-0.5">Estimated Total</p>
          <p
            className="text-2xl sm:text-3xl font-semibold tabular-nums text-stone-800"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
        </div>
        <button
          disabled={!hasSelection}
          onClick={onAcceptClick}
          className={[
            "shrink-0 px-6 py-3 rounded-lg text-sm font-semibold transition-all",
            hasSelection
              ? "bg-[#1a5632] text-white hover:bg-[#143f26] active:scale-[0.98] shadow-sm"
              : "bg-stone-200 text-stone-400 cursor-not-allowed",
          ].join(" ")}
        >
          <span className="hidden sm:inline">
            Accept & Pay {depositLabel} — ${depositAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
          <span className="sm:hidden">
            Accept — ${depositAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
        </button>
      </div>
    </div>
  );
}
