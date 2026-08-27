---
name: scan-inbox-leads
description: Scan Patrick's Gmail inbox for potential new court-resurfacing leads, dedup each against the Notion Pipeline and the Supabase CRM, and write genuinely new ones to both (no auto-reply email). Use when the user says "scan my inbox for leads", "check the inbox for new leads", "any new leads in email", or "triage the inbox".
---

# Scan inbox for new leads

Triage the Gmail inbox for prospective Pro Court Surfaces leads, skip anyone
already in the CRM or Notion, and record the genuinely-new ones in both systems.
The customer is **not** emailed — this is internal capture only.

## Guardrails
- **Clear leads auto-write; unsure ones are held for review.** After dedup,
  split new candidates into *clear* (real inquiry, has a name + at least one of
  email/phone) and *unsure* (spam-ish, vague, no real contact info, or you're
  not confident it's a court-resurfacing prospect). Auto-ingest the clear ones;
  list the unsure ones and ask before writing them.
- **The script sends no email.** Do not fall back to the `/api/leads` route — it
  auto-replies to the prospect and notifies Patrick, which is wrong here.
- Never invent contact details. If a field isn't in the email, leave it out.

## Step 1 — Pull candidate emails from the inbox
Use the Gmail MCP tools (`mcp__claude_ai_Gmail__search_threads`, then
`get_thread` / `get_message` for bodies). Default scope: inbox threads from the
last ~14 days. If the user gave a narrower scope (a label, sender, or date
range), use that instead.

A good starting search: `in:inbox newer_than:14d`. Read enough of each thread to
judge intent — don't rely on the snippet alone for anything you'll write.

## Step 2 — Judge intent (per email)
Keep an email as a **lead candidate** only if the sender is a real person asking
about court work — resurfacing, new court build, pickleball/tennis conversion,
a quote, pricing, or availability. **Skip**: newsletters, marketing, vendors,
receipts/invoices, platform notifications, personal mail, and anything already
clearly a booked customer thread.

For each candidate, extract what's actually present:
`name`, `email`, `phone`, `city`, `projectType`, `sports`, `message`
(a one-line summary of what they want), and `sourceEmail` (the Gmail message id
or a short subject+date reference, for traceability).

- `projectType` must be one of the DB enum values or omitted:
  `new_court_full_build`, `new_court_surfacing_only`, `repair_resurfacing`,
  `conversion_tennis_to_pickleball`, `color_coating_only`, `crack_repair_only`,
  `other`. If unsure, omit it.
- `sports` (omit if not stated) uses lowercase values like `pickleball`,
  `tennis`, `basketball`.

## Step 3 — Dedup (check mode)
Write the candidate array to a temp file and run the check pass. It looks each
one up in Supabase `leads`, Supabase `customers`, and the Notion Pipeline DB
(by email; secondary phone match on leads).

```bash
cat candidates.json | node "scripts/scan-leads/lead-ingest.mjs" --mode check
```

Each result has a `status`: `new`, `exists_lead`, `exists_customer`, or
`exists_notion`. Only `new` candidates proceed.

## Step 4 — Split and write
- **Clear + new** → ingest automatically:
  ```bash
  cat clear-new.json | node "scripts/scan-leads/lead-ingest.mjs" --mode ingest
  ```
  Ingest inserts into `leads` (`deal_stage=new_lead`, `lead_source=inbound`,
  `lead_source_detail="email inbox scan"`) and creates a Notion Pipeline page,
  storing the `notion_page_id` back on the lead. It re-dedups defensively, so
  it's safe to re-run.
- **Unsure + new** → list them for the user (name, contact, why you're unsure,
  the source email) and ask which to write. Ingest only the approved ones.

## Step 5 — Report
Summarize: how many threads scanned, how many candidates, how many were already
known (and where), how many written, and any Notion sync failures (the lead is
still safely in the DB; note it so Patrick can retry). Include names/emails so
Patrick can eyeball the batch.

## Notes
- The script reads `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and
  `NOTION_API_KEY` from `.env.local`. Run it from the repo root.
- Gmail connector is read/send scope (no modify), so you can read the inbox but
  can't label threads as processed. Track what you've handled within the run.
- Notion Pipeline DB id is hardcoded in the script (matches `src/lib/notion.ts`).
