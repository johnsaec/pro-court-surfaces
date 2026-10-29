"use client";

import type { PaymentMilestone } from "@/lib/admin/types/quote-types";
import { paymentSplit } from "@/lib/quotes/quote-format";

interface RunningTotalProps {
  total: number;
  hasSelection: boolean;
  onAcceptClick: () => void;
  readOnly?: boolean;
  paymentSchedule?: PaymentMilestone[] | null;
  depositPercent?: number;
}

export function RunningTotal({
  total,
  hasSelection,
  onAcceptClick,
  readOnly,
  paymentSchedule,
  depositPercent = 30,
}: RunningTotalProps) {
  if (readOnly) return null;

  // First milestone amount, or deposit_percent% of total
  const depositAmount =
    paymentSchedule && paymentSchedule.length > 0
      ? paymentSchedule[0].amount
      : paymentSplit(total, depositPercent).depositAmount;

  const depositLabel =
    paymentSchedule && paymentSchedule.length > 0
      ? paymentSchedule[0].label
      : `${depositPercent}% Deposit`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t-2 border-[#1a5632] bg-white/95 backdrop-blur-sm supports-[backdrop-filter]:bg-white/90">
      <div className="max-w-3xl mx-auto px-4 sm:px-12 py-3 sm:py-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs text-gray-500 mb-0.5">Total</p>
          <p className="text-xl sm:text-2xl font-bold tabular-nums text-[#1a5632]">
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
              : "bg-gray-200 text-gray-400 cursor-not-allowed",
          ].join(" ")}
        >
          <span className="hidden sm:inline">
            Accept & Pay {depositLabel} — ${depositAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
          <span className="sm:hidden">
            Accept & Pay — ${depositAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
        </button>
      </div>
    </div>
  );
}
