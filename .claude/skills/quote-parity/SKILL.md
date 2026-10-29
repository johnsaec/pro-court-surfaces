---
name: quote-parity
description: Confirm a Pro Court Surfaces quote's PDF and its customer link (/q/<share_token>) show the same thing — every line item, price, total, deposit split, cover note, and condition/exclusion/warranty clause. Runs scripts/quotes/quote-parity.mjs, then a visual side-by-side. Use when the user says "check the PDF and link match", "parity check PCS-2026-0022", "is the link the same as the PDF", after changing the quote page or PDF template, or as part of quote-check before sending.
---

# Quote parity: PDF vs customer link

The customer can accept and pay from the link, and the PDF is what gets emailed and
filed. They must say the same thing — especially the fine print. Both render from
the same data and the same helpers (`src/lib/quotes/quote-format.ts`), so a mismatch
means one template dropped or reworded something.

## Guardrails
- **Never trigger a fake view.** Don't open the customer link with a plain curl or
  browser. The script sends `x-pcs-internal: 1`; for screenshots use
  `?pcs_internal=1`. Both skip view logging. A plain fetch flips the quote to
  "viewed", which is a false signal.
- **Never click Accept** on a real quote. It converts the lead and starts invoicing.
- Report only; template fixes go to Patrick before they ship.

## Step 1: Rules pass
```bash
node scripts/quotes/quote-parity.mjs --quote <uuid|PCS-number>                       # live site
node scripts/quotes/quote-parity.mjs --quote <uuid|PCS-number> --base http://localhost:<port>   # unpushed changes
```
- Checks every fact from the database (header, contact, project, note, each package,
  line, add-on, total, deposit/balance, colors, each clause line) appears in BOTH
  the PDF text and the rendered page. Script payloads are stripped, so data the
  page fetches but doesn't show counts as missing.
- Diffs every dollar figure between the two.
- Exit 1 = mismatch. `--json` for machine output.
- Accepted quotes redirect to the confirmation page. The script notes it, and
  parity doesn't apply.

## Step 2: Visual pass
Screenshot the link at desktop and phone width (headless Chrome has a ~500px minimum
window, so for phone width load the page in a 390px iframe):
```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --hide-scrollbars `
  --user-data-dir="<scratch>\prof" --window-size=1280,4200 --virtual-time-budget=8000 `
  --screenshot="<scratch>\web.png" "http://localhost:<port>/q/<token>?pcs_internal=1"
```
Read the screenshots and the PDF (Read tool). Compare section order (header ·
Prepared For · Project Details · Note · Package table · Summary · Colors · Payment
Terms · Conditions · Exclusions · Schedule · Warranty · Acceptance), the green
section titles, table columns, and that nothing is cut off on the phone.

## Step 3: Report
- `✓ PDF and link match` + facts checked, or a table of what's missing where.
- Name the likely template: web → `src/app/q/[share_token]/_components/`, PDF →
  `src/lib/pdf/quote-pdf-document.tsx`.
- If the live site fails but localhost passes, the fix isn't deployed yet.

## Adding to the check
New quote fields: add a `fact(...)` line in `quote-parity.mjs` and render the field
in both templates using the helpers in `quote-format.ts`.
