---
name: quote
description: Build a Pro Court Surfaces quote from a quote-ready lead using system templates. Assembles a brief (package tiers, colors, overrides), runs scripts/quotes/quote-build.mjs to write the quote + packages + line items, then fetches the PDF. Use when the user says "build a quote for <lead>", "quote the <name> job", "make Joseph a quote", or "put together a proposal for <lead>".
---

# Quote: build from the facts

Turn a quote-ready lead into a real quote (packages, line items, PDF). Facts come
from the lead — this skill only makes the **decisions** (which systems, tiers,
colors, per-quote tweaks) and runs the builder.

## Guardrails
- **Prices come from the catalog, not your head.** The builder pulls each step's
  price from `services_catalog`. Only change a price via a deliberate `reprice` or
  `addCustom` override in the brief — never hand-type a rate.
- **Don't build on missing facts.** If the lead isn't quote-ready the builder will
  refuse and list what's missing → run the `pre-quote` skill first.
- **Editing an existing quote reuses its `id`.** A build without `id` creates a NEW
  quote (new number + share token). To revise, put the quote's `id` in the brief.
- Every quote needs `lead_id` (the fact source) — set on the brief.

## Step 1 — Load a quote-ready lead
Fetch the lead by name/id. Confirm `deal_stage='proposal_stage'` and that the
required facts are present (square_feet, number_of_courts, sports, city, etc.).
If not ready, offer to run `pre-quote` instead of guessing.

## Step 2 — Decide the packages
Pick 1–3 systems from `scripts/quotes/systems.mjs` and map them to tiers
(`good`/`better`/`best`). Typical: a standard acrylic system + a premium Cushion X.
Mark one `recommended: true` — that package drives the quote's headline total (and
the 50% deposit). Choose colors, and any per-quote overrides from the lead facts
(e.g. new slab → keep grind; existing court → `laykold-resurface-existing`; drop a
step with `{op:"remove"}`; enable an optional repair with `{op:"setOptional",
optional:false}`).

## Step 3 — Assemble the brief JSON
Write a brief (decisions only — no facts):
```jsonc
{
  "lead_id": "<uuid>",
  "packages": [
    { "tier": "good", "template": "laykold-resurface-existing", "recommended": true,
      "overrides": [] },
    { "tier": "best", "template": "cushion-x-premium" }
  ],
  "colors": { "inside": "US Open Blue", "outside": "US Open Green", "lines": "White" },
  "cover_note": "…",
  "deposit_percent": 30,          // default 30; deposit invoiced at accept, balance = 100-pct at completion
  "show_signature": false,        // true for GC-facing proposals that are signed by hand
  "conditions_context": {         // drives which conditions/exclusions/warranty clauses render
    "slab": "existing",           // "new" | "existing"
    "coated": false,              // existing surface already coated?
    "primer": "latex",            // "solvent" (Acrytech Solvent Primer, adds adhesion-test + temp clauses) | "latex" (Acrylock)
    "moisture_barrier": "none",   // "known" | "unknown" (adds vapor-barrier clause) | "none"
    "facility": null,             // "religious" adds prayer-time coordination; "hoa"/"school"/null otherwise
    "crack_repair": true          // a crack-repair line is on the quote (adds crack-scope clause)
  },
  "deposit_due_days": 7, "discount_amount": 0
}
```
Derive `conditions_context` from the lead facts + scope: new slab vs existing (project_type/notes), which primer the chosen system uses (solvent on bare uncoated concrete, latex otherwise), whether a moisture barrier is known, the facility type, and whether the quote includes crack repair. `assembleConditions` (in `scripts/quotes/clauses.mjs`) turns this into the substrate-conditions / exclusions / warranty sections stored on the quote and rendered in the PDF.
Override ops: `remove` · `reprice{unit_price}` · `setQty{qty}` ·
`setOptional{optional}` · `add{code,qtyRule,qty?,optional?}` ·
`addCustom{name,line_item_type,unit_of_measure,quantity,unit_price}`.

## Step 4 — Preview (no writes)
```bash
cat brief.json | node "scripts/quotes/quote-build.mjs" --mode preview
```
Review the per-package line items, totals, deposit %, and the resolved `conditions`
list (section — title) with Patrick. If the builder reports missing facts, stop and
route back to `pre-quote`.

## Step 5 — Build
```bash
cat brief.json | node "scripts/quotes/quote-build.mjs" --mode build
```
Prints the quote id, number, and share token. On a later edit, add that `id` to the
brief and re-run `build` (idempotent — replaces packages, keeps the same quote).

## Step 6 — Fetch the PDF
Needs the dev server (`npm run dev`). Save into the repo `quotes/` folder:
```bash
curl -s -w "%{http_code} %{content_type}\n" \
  -o "quotes/<lead-name>-<quote-number>.pdf" \
  "http://localhost:3000/api/quotes/<quote-id>/pdf"
```
Confirm `200 application/pdf`. If the server isn't up, tell Patrick to start it.

## Report
Quote number + id, the `/q/<share_token>` customer URL, each package total, which
tier is recommended, and the saved PDF path. Ask before sending — the `quote` skill
does not email the customer.
