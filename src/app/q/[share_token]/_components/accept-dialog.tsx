"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { PaymentMilestone } from "@/lib/admin/types/quote-types";

interface AcceptDialogProps {
  open: boolean;
  onClose: () => void;
  onAccept: (name: string, email: string) => Promise<void>;
  defaultEmail: string | null;
  total: number;
  paymentSchedule?: PaymentMilestone[] | null;
  depositPercent?: number;
}

export function AcceptDialog({
  open,
  onClose,
  onAccept,
  defaultEmail,
  total,
  paymentSchedule,
  depositPercent = 30,
}: AcceptDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(defaultEmail ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasCustomSchedule = paymentSchedule && paymentSchedule.length > 0;
  const depositAmount = hasCustomSchedule
    ? paymentSchedule[0].amount
    : (total * depositPercent) / 100;
  const depositLabel = hasCustomSchedule
    ? paymentSchedule[0].label
    : `${depositPercent}% Deposit`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Please enter your name and email.");
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      await onAccept(name.trim(), email.trim());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && !isSubmitting && onClose()}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-lg">Accept Quote & Pay {depositLabel}</DialogTitle>
            <DialogDescription className="text-sm leading-relaxed">
              {hasCustomSchedule ? (
                <>
                  Your first payment of{" "}
                  <span className="font-semibold tabular-nums text-stone-700">
                    ${depositAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>{" "}
                  ({depositLabel}) will be invoiced to your email. Total quote: ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}.
                </>
              ) : (
                <>
                  A {depositPercent}% deposit of{" "}
                  <span className="font-semibold tabular-nums text-stone-700">
                    ${depositAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>{" "}
                  will be invoiced to your email to confirm your booking. Total quote: ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}.
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          {/* Payment schedule breakdown */}
          {hasCustomSchedule && paymentSchedule.length > 1 && (
            <div className="border rounded-md p-3 my-3 space-y-1.5">
              <p className="text-xs font-medium text-muted-foreground">Payment Schedule</p>
              {paymentSchedule.map((m, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className={i === 0 ? "font-medium" : "text-muted-foreground"}>
                    {i + 1}. {m.label}
                  </span>
                  <span className={`tabular-nums ${i === 0 ? "font-medium" : "text-muted-foreground"}`}>
                    ${m.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="accept-name" className="text-sm">
                Full Name
              </Label>
              <Input
                id="accept-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                disabled={isSubmitting}
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accept-email" className="text-sm">
                Email
              </Label>
              <Input
                id="accept-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={isSubmitting}
                required
                className="h-11"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 text-sm font-medium text-stone-600 hover:text-stone-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={[
                "px-6 py-2.5 rounded-lg text-sm font-semibold transition-all",
                isSubmitting
                  ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                  : "bg-[#1a5632] text-white hover:bg-[#143f26] active:scale-[0.98] shadow-sm",
              ].join(" ")}
            >
              {isSubmitting ? "Submitting..." : `Accept & Pay $${depositAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
