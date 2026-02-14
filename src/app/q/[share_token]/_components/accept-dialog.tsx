"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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

interface AcceptDialogProps {
  open: boolean;
  onClose: () => void;
  onAccept: (name: string, email: string) => Promise<void>;
  defaultEmail: string | null;
  total: number;
}

export function AcceptDialog({
  open,
  onClose,
  onAccept,
  defaultEmail,
  total,
}: AcceptDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(defaultEmail ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    } catch {
      setError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && !isSubmitting && onClose()}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Accept Quote</DialogTitle>
            <DialogDescription>
              Confirm your acceptance of this quote for{" "}
              <span className="font-semibold tabular-nums">
                ${total.toFixed(2)}
              </span>
              . Enter your name and email below.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="accept-name">Full Name</Label>
              <Input
                id="accept-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                disabled={isSubmitting}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accept-email">Email</Label>
              <Input
                id="accept-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={isSubmitting}
                required
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Confirm Acceptance"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
