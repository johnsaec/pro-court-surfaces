---
name: quote-check
description: Check a Pro Court Surfaces quote for internal consistency before it goes out — math, line items that contradict the fine print (e.g. included bird baths vs a "leveling of low spots" exclusion), cover-note amounts, banned words like "mobilization", spelling, and missing info. Runs scripts/quotes/quote-check.mjs, then an AI read of the PDF, then proposes fixes and rebuilds on approval. Use when the user says "check quote PCS-2026-0022", "check the quote", "is this quote ready to send", "proofread the quote", or as the last step of the quote skill.
---

# Quote check: rules + AI review

Make sure a quote says the same thing everywhere: line items, cover note, and
fine print. Two passes: a rules script for everything deterministic, then your
own read of the rendered PDF for everything the rules can't express. Report
problems with a proposed fix for each, and rebuild only after Patrick approves.

## Guardrails
- **Report + propose, never silently change.** Apply fixes only after Patrick says
  which ones (all / pick). This includes clause wording changes picked up on rebuild.
- **Never change a price without explicit OK.** Price-affecting fixes are proposals only.
- **Never email the customer.** "Ready to send" is the end state, not sending.
- Mark AI findings as **AI** in the report, so Patrick knows which are judgment calls.

## Step 1 — Rules pass
```bash
node scripts/quotes/quote-check.mjs --quote <id|PCS-number> --text    # saved quote
cat brief.json | node scripts/quotes/quote-check.mjs --brief --text   # before build, no writes
```
Drop `--text` for JSON. Exit code 1 = errors. Each finding has a `proposed_fix`,
which is a brief edit: an override op, a `conditions_context` key, or a
`conditions_overrides` entry (`{remove: "<clause code>"}` /
`{replace: "<clause code>", body}`).

Rule groups (see `RULES` in the script; word lists in `scripts/quotes/check-config.mjs`):
math · line items vs clauses · cover note vs quote · language (banned terms,
brand spellings, term variants) · missing info (address, colors, email).

## Step 2 — AI pass (saved quotes)
Fetch the PDF (needs the dev server; start it on a random 3001–3999 port if it's down):
```bash
curl -s -w "%{http_code} %{content_type}\n" -o "quotes/<lead>-<quote-number>.pdf" \
  "http://localhost:<port>/api/quotes/<quote-id>/pdf"
```
Read the PDF with the Read tool, then go through this checklist:
1. **Promised vs excluded.** Anything included in a line or the cover note that an
   exclusion, warranty, or condition takes back (or the reverse).
2. **Clause fits scope.** Every clause makes sense for *this* job: no tennis
   language on a pickleball-only court, no "resurfacing over existing coating"
   when the quote grinds it off, no crack quantities that aren't on the quote.
3. **Optional add-ons.** If an add-on isn't selected, is it clear who handles that work?
4. **Numbers.** Totals, deposit/balance, and every dollar figure in the cover note
   agree with the line items.
5. **Wording.** Same term spelled one way everywhere; line names match the cover
   note; typos; tone matches the other quotes (plain, specific, no filler).
6. **Missing.** Job address, colors, contact, and anything the lead's notes say the
   customer asked for that isn't on the quote.
7. **Layout.** Near-empty pages, orphaned headings, line names that wrap badly.

Don't re-report what the rules pass already found.

## Step 2b — PDF vs link parity
```bash
node scripts/quotes/quote-parity.mjs --quote <id|PCS-number>
```
Every fact must appear in both the PDF and the customer link (see the `quote-parity`
skill). A mismatch is an **error**. The customer accepts from the link, so it must
show the same scope and fine print as the PDF.

## Step 3 — Report
One table, errors first:

| # | Sev | Source | Where | Problem | Proposed fix |
|---|-----|--------|-------|---------|--------------|

- `Sev`: error / warning / nit.
- `Source`: rules or **AI**.

End with either **"Ready to send"** (no errors) or **"Not ready: N errors"**. Then ask
which fixes to apply.

## Step 4 — Apply approved fixes
1. Edit the quote's brief (keep its `id` so the quote number and share link stay the same).
2. `cat brief.json | node scripts/quotes/quote-check.mjs --brief --text` must have no errors.
3. `cat brief.json | node scripts/quotes/quote-build.mjs --mode build`
4. Re-fetch the PDF, then re-run Steps 1–2 until clean.

If a fix can't be expressed in the brief (a clause needs new wording for every
quote), propose a change to `scripts/quotes/clauses.mjs` instead, and say it
affects future quotes.

## Adding a rule
- **New banned word, brand spelling, or term variant:** add a line to
  `scripts/quotes/check-config.mjs`.
- **New contradiction type:** add a function to `RULES` in
  `scripts/quotes/quote-check.mjs`. It returns `finding(rule, severity, where, message, proposed_fix)`.
- **When the AI pass catches something twice:** promote it to a rule.
