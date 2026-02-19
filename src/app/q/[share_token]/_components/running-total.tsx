"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface RunningTotalProps {
  total: number;
  hasSelection: boolean;
  onAcceptClick: () => void;
  readOnly?: boolean;
}

export function RunningTotal({
  total,
  hasSelection,
  onAcceptClick,
  readOnly,
}: RunningTotalProps) {
  if (readOnly) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="max-w-3xl mx-auto px-4 pt-2 pb-1">
        <p className="text-xs text-muted-foreground">
          By paying your deposit, you agree to our{" "}
          <Link
            href="/terms"
            target="_blank"
            className="underline underline-offset-2 hover:text-foreground"
          >
            terms &amp; conditions
          </Link>{" "}
          for this project.
        </p>
      </div>
      <div className="max-w-3xl mx-auto px-4 pb-3 flex items-center justify-between">
        <div className="text-sm">
          <span className="text-muted-foreground">Estimated Total</span>
          <span className="ml-2 text-2xl font-bold tabular-nums">
            ${total.toFixed(2)}
          </span>
        </div>
        <Button
          size="lg"
          disabled={!hasSelection}
          onClick={onAcceptClick}
        >
          Accept &amp; Pay Deposit (50%)
        </Button>
      </div>
    </div>
  );
}
