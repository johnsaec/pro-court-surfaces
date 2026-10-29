// Shared formatting for the quote PDF (src/lib/pdf/quote-pdf-document.tsx) and the
// public quote page (src/app/q/[share_token]). Both render from these helpers so the
// two documents can't drift apart; scripts/quotes/quote-parity.mjs checks they agree.
import type { ConditionSection, QuoteDetail } from "@/lib/admin/types/quote-types";

const TZ = "America/Chicago";

export function fmtMoney(amount: number | null | undefined): string {
  return `$${(amount ?? 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function fmtQty(qty: number | string | null | undefined): string {
  return Number(qty ?? 0).toLocaleString("en-US");
}

function fmtDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: TZ,
  });
}

export function quoteDates(quote: Pick<QuoteDetail, "created_at" | "expires_at">) {
  const created = new Date(quote.created_at);
  const expires = quote.expires_at
    ? new Date(quote.expires_at)
    : new Date(created.getTime() + 30 * 86400000);
  return { createdDate: fmtDate(created), validThrough: fmtDate(expires) };
}

const cents = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

/** Deposit rounded to the cent, balance = the remainder, so the two always add up
 *  to the total and print identically everywhere (and match the Stripe invoice). */
export function paymentSplit(total: number, depositPercent: number | null | undefined) {
  const depositPct = Number(depositPercent ?? 30);
  const depositAmount = cents((total * depositPct) / 100);
  return {
    depositPct,
    depositAmount,
    balancePct: 100 - depositPct,
    balanceAmount: cents(total - depositAmount),
  };
}

export function groupConditions(conditions: ConditionSection[] | null | undefined) {
  const groups: { section: string; items: ConditionSection[] }[] = [];
  for (const c of conditions ?? []) {
    let g = groups.find((x) => x.section === c.section);
    if (!g) {
      g = { section: c.section, items: [] };
      groups.push(g);
    }
    g.items.push(c);
  }
  return groups;
}
