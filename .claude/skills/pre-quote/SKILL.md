---
name: pre-quote
description: Gather every fact a quote needs onto a Pro Court Surfaces lead, then mark it quote-ready. Reads the lead + its source email, fills gaps by asking Patrick (never inventing measurements), writes facts back to the leads row, and flips deal_stage to proposal_stage. Use when the user says "pre-quote this lead", "get <name> ready for a quote", "gather the facts for <lead>", or "what do we still need to quote <name>".
---

# Pre-quote: assemble the facts

Get a lead to **quote-ready** — every fact the `quote` skill needs, living on the
`leads` row itself. This skill does the fact-finding. It does **not** create a
quote (that's the `quote` skill).

## Guardrails
- **Never invent measurements or prices.** If a fact isn't in the lead, the email
  thread, or from Patrick, leave it blank and flag it. A square-foot number you
  guessed is worse than a blank.
- **Facts live on the lead, nowhere else.** Write them to the `leads` columns —
  don't stash them in a side file or a quote. One source of truth.
- **Quote-ready is a real bar.** Only set `deal_stage='proposal_stage'` once the
  required facts are actually present.

## Required facts (what "quote-ready" means)
Core (always): `square_feet`, `number_of_courts`, `project_type`, `sports`,
`city`, `address_line1`, `state`.
Condition (existing courts): `crack_length_ft`, `bird_bath_count` — and note in
`notes` if the court is new slab vs existing (drives grind vs smooth-pad, strip, repairs).
Colors (if known): `color_inside`, `color_outside`, `color_lines`, `color_nvz`
(freeform text intake — the `quote` skill maps these to palette colors).

## Step 1 — Load the lead
Fetch by name / id / email from Supabase `leads` (read-only). Show what's already
present and what's missing against the required-facts list above.

## Step 2 — Mine the source email
If the lead came from an email (see `lead_source_detail` / the scan), pull that
thread via the Gmail MCP tools and extract any facts stated there before asking
Patrick. Dimensions, court count, sport, condition, colors, address.

## Step 3 — Ask Patrick only for the gaps
List the still-missing facts and ask. Keep it tight — only what can't be derived.
Convert anything relative ("about 60 by 120") into the actual numbers. If a
measurement is genuinely unknown, say so and leave it blank (don't guess).

## Step 4 — Write facts back to the lead
Update the `leads` row columns with the confirmed facts (a small service-role
`node` update against `leads`, mirroring the env/client pattern in
`scripts/scan-leads/lead-ingest.mjs`). `sports` is a `sport_type[]`
(`pickleball`/`tennis`/`basketball`/`volleyball`/`multi_sport`); `project_type`
is the DB enum.

## Step 5 — Write a brief summary to notes
Append a short prose recap to `leads.notes` (don't clobber existing notes):
scope, new-vs-existing, condition, colors, which surfacing systems likely fit,
budget/timeline signals. This is the human-readable brief the `quote` skill reads.

Also capture the **clause-driving facts** the `quote` skill needs for
`conditions_context` (so the right conditions/exclusions/warranty render):
new slab vs existing court; is an existing surface already coated; whether the
system will use a **solvent** primer (bare uncoated concrete) or **latex**; is a
sub-slab **moisture barrier** known/unknown; the **facility** type (e.g.
religious → prayer-time coordination); and whether crack repair is in scope.

## Step 6 — Flip the quote-ready signal
When the required facts are all present, set `deal_stage='proposal_stage'`. That's
the flag the `quote` skill keys on. If facts are still missing, leave the stage
as-is and tell Patrick exactly what's outstanding.

## Report
Summarize: facts now on the lead, what (if anything) is still missing, and whether
it's quote-ready. If ready, tell Patrick he can run `quote <lead>`.
