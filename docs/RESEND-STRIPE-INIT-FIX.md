# Fix: lazy-init the Resend & Stripe clients

_Status: ✅ done — shipped in commit `29658c1` (2026-08-16). Hardening for the
external-service clients so a missing/misconfigured API key can't crash a whole
route or the build._

---

## Context — why this change

While building the lead-form email-fallback safety net (`src/app/api/leads/route.ts`,
commit `f0ea221`), a local test of `POST /api/leads` returned a **500 before the
handler ever ran**. Root cause: the Resend client is constructed at
**module-load time**, so when `RESEND_API_KEY` is absent the *import* of the route
throws — defeating the very safety net that's supposed to keep a lead from being
lost.

Stripe has the **identical** anti-pattern, and it's what made a local production
build fail at "Failed to collect page data for `/q/[share_token]`" (the Stripe
constructor throwing `Neither apiKey nor config.authenticator provided` during
static collection).

Goal: make both clients **lazy** so a missing key surfaces at *call time* (where
callers already catch it) instead of *import time* (which crashes the whole
route/page). **No behavior change when keys are present.**

---

## The problem, precisely

Both files build the client eagerly at the top level:

- `src/lib/resend.ts`
  ```ts
  export const resend = new Resend(process.env.RESEND_API_KEY);
  ```
  `new Resend(undefined)` **throws** `Missing API key…`. Any module that imports
  this (transitively) crashes on load.

- `src/lib/stripe.ts`
  ```ts
  export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  ```
  `new Stripe(undefined)` **throws** `Neither apiKey nor config.authenticator
  provided`.

Why it matters:

1. **Defeats the lead safety net.** `route.ts` → `sendEmail` → `@/lib/resend`.
   If the Resend key is ever missing in prod, `/api/leads` 500s at import — the DB
   save + admin-email fallback never execute. The exact failure we just hardened
   against (lost leads) reopens through a different door.
2. **Breaks builds / static collection.** Next.js imports route/page modules
   during build; an eager client with no key aborts the build (observed on
   `/q/[share_token]`).
3. Failure is **loud and total** (whole route dead) instead of **contained**
   (one email/charge fails, caught by existing try/catch).

---

## The fix — lazy singleton getter (same pattern for both)

Replace the eager `const` with a function that constructs on first use and caches.
Import never runs the constructor; the key is only read when a send/charge happens.

### 1. `src/lib/resend.ts`
```ts
import { Resend } from "resend";

let client: Resend | null = null;

/** Lazily construct the Resend client so a missing RESEND_API_KEY never crashes
 *  a route at import time — the error surfaces at send time, where sendEmail()
 *  already catches it. */
export function getResend(): Resend {
  if (!client) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error("RESEND_API_KEY is not set");
    client = new Resend(apiKey);
  }
  return client;
}
```

### 2. `src/lib/email/send-email.ts` (only importer of resend)
- Import `getResend` instead of `resend`.
- Replace the 3 call sites `resend.emails.send(...)` → `getResend().emails.send(...)`.
  All three are already inside the existing `try/catch` that returns
  `{ success: false }`, so a missing-key throw is handled gracefully → the lead
  route's `Promise.allSettled` sees a failure and the safety net proceeds.

### 3. `src/lib/stripe.ts` (mirror the Resend pattern)
```ts
import Stripe from "stripe";

let client: Stripe | null = null;

export function getStripe(): Stripe {
  if (!client) {
    const apiKey = process.env.STRIPE_SECRET_KEY;
    if (!apiKey) throw new Error("STRIPE_SECRET_KEY is not set");
    client = new Stripe(apiKey);
  }
  return client;
}
```

### 4. Update the 4 Stripe importers (mechanical `stripe.` → `getStripe().`)
- `src/app/api/stripe/webhook/route.ts` — `stripe.webhooks.constructEvent`
- `src/app/q/[share_token]/accepted/page.tsx` — `stripe.invoices.retrieve`
- `src/lib/admin/actions/quote-actions.ts` — `customers.list/create`,
  `invoices.create/finalizeInvoice`, `invoiceItems.create`
- `src/lib/quotes/public-actions.ts` — same shape

> The JSX string `dashboard.stripe.com/...` in `collect-balance-button.tsx` is
> not a client usage — leave it.

---

## Non-goals
- No change when keys are present — prod behaves identically.
- Supabase (`createServerClient`) already constructs inside a function — no change.

---

## Verification
1. **Typecheck:** `node_modules/.bin/tsc --noEmit` → exit 0.
2. **Local prod build (proof for Stripe):** with a `.env.local` that has NO
   Stripe/Resend keys, `rm -rf .next && next build` — the `/q/[share_token]`
   collect failure must be gone.
3. **Local runtime (proof for Resend):** `.env.local` with the two Supabase vars
   but NO `RESEND_API_KEY`; `next dev`; `POST /api/leads` → **HTTP 200**
   `{"success":true,...}` (route loads, DB saves, email failure swallowed).
   Pre-fix this was 500 at import. Delete the test lead afterward.
4. Commit only these files; push; smoke-test the live contact form once.
