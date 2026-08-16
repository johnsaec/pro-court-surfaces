# Database Structure & Company-Layer Changes

_Last updated: 2026-08-16 · migration `00025` applied_

This doc explains (1) what we just changed and why, and (2) the **current** full
database structure so future-you doesn't have to re-read 25 migration files.

---

## Part 1 — What changed (and why)

### The problem
The CRM modeled everyone as a *person* — `customers` and `leads` both have
`first_name` / `last_name` / `display_name`. There was no concept of a **business
account**. A general contractor (GC) we might resurface courts for repeatedly is
really a *company* with one or more contacts (owner, project manager, the person
who pays). There was:

- nowhere to record "this contact belongs to ABC Construction," and
- no way to see "this GC = N jobs, $X lifetime value."

CLAUDE.md also claimed a `leads.company` column that **never existed**, plus other
stale facts (wrong migration count, wrong enum values, and references to a
`projects` table that was dropped back in migration `00022`).

### What we did

**1. Added a company/account layer (migration `00025`).**
A new `companies` table with a nullable `company_id` foreign key on both
`customers` and `leads`. The model is:

```
one company  →  many contacts (customers)  →  many quotes
```

A quote still attaches to a **contact** (`customer_id`), never directly to a
company. The company is reached *through* the contact. This was deliberate — it
means the entire quote-building and acceptance flow was left completely untouched;
the company grouping just sits on top.

Design choices worth remembering:
- `company_id` is **nullable** — a homeowner has no company, and that's fine.
- The FK uses `ON DELETE SET NULL` — deleting a company never destroys contact or
  lead history; those rows just become "no company" again.
- Companies are **not** linked to quotes directly (no `quotes.company_id`), on
  purpose, to keep the accept/invoice path unchanged.

**2. Built the app around it.**
- Admin CRUD at `/admin/companies` (list, create/edit dialog, and a detail page
  that rolls up contacts + their quotes into "contacts / total quotes / won jobs /
  lifetime value" stat cards).
- A "Companies" item in the admin sidebar.
- A company selector on the customer dialog and the lead edit form.
- The quote picker now shows `Contact — Company` when a company is set.
- On lead→customer conversion (`acceptQuote`), the new customer inherits the
  lead's `company_id`.

**3. Reconciled the docs.**
`.claude/CLAUDE.md` was corrected: migration count, enum values, removal of all
`projects` references, and the phantom `leads.company` claim.

### Files touched
- `supabase/migrations/00025_add_companies.sql` (new)
- `src/lib/constants.ts` — `COMPANY_TYPE_LABELS` / `COMPANY_TYPE_COLORS`
- `src/lib/admin/queries/company-queries.ts` (new)
- `src/lib/admin/queries/customer-queries.ts`, `lead-queries.ts` — `company_id`
- `src/lib/admin/types/quote-types.ts` — option types
- `src/lib/admin/actions/company-actions.ts` (new)
- `src/lib/admin/actions/customer-actions.ts`, `lead-actions.ts` — `company_id`
- `src/app/admin/companies/**` (new route: page, detail, dialog, table, button)
- `src/app/admin/customers/**`, `admin/leads/[id]/**`, `admin/quotes/**` — wiring
- `src/lib/quotes/public-actions.ts` — carry `company_id` on conversion
- `src/components/admin/sidebar-nav.tsx` — nav item
- `.claude/CLAUDE.md` — doc reconciliation

---

## Part 2 — Current database structure

**9 core tables.** The `projects` table no longer exists (dropped in `00022`; its
fields live on `quotes` now).

### Relationship map

```
                 companies
                  ▲     ▲
     company_id   │     │   company_id   (both nullable FKs, ON DELETE SET NULL)
                  │     │
      customers ──┘     └── leads
        ▲                    │
        │ customer_id        │ customer_id  (set when a lead converts)
        │              ┌─────┘
        │              ▼
        │           (lead becomes a customer on quote acceptance)
        │
        │  quotes.customer_id (nullable)
        │  quotes.lead_id     (nullable)   ── CHECK: at least one must be set
        ▼
      quotes ───────────────► color_palette   (4 color FKs: inside/outside/lines/nvz)
        │  1                   services_catalog (referenced by line items)
        ├──< quote_packages (Good / Better / Best)
        │        │ 1
        │        └──< quote_line_items ──► services_catalog
        ├──< quote_selections   (snapshot of what the customer accepted)
        └──< quote_activity_log (audit trail: viewed, accepted, paid…)
```
`──<` = one-to-many. A company has many contacts; a contact has many quotes; a
quote has many packages; a package has many line items.

### Tables

**`companies`** — business accounts (NEW in 00025)
`id, name, company_type, email, phone, address_line1/2, city, state, zip,
stripe_customer_id, notes, tags[], created_at, updated_at`
- `company_type` enum: `general_contractor, builder, property_manager, hoa,
  school, municipality, homeowner, other`

**`customers`** — individual contacts (a graduated lead / repeat buyer)
`id, first_name, last_name, display_name, email, phone, address_line1/2, city,
state, zip, stripe_customer_id, notion_page_id, company_id → companies, notes,
tags[], created_at, updated_at`

**`leads`** — top-of-funnel prospects (form submissions)
Identity + court condition intake + add-on interest flags, plus:
`deal_stage, lead_source, lead_source_detail, customer_id → customers,
company_id → companies, converted_at`, color prefs, and UTM attribution columns
(`ft_*` first-touch, `lt_*` last-touch).
- `deal_stage` enum: `cold, new_lead, qualified_lead, proposal_stage,
  proposal_sent, buyer_interested, won, lost, converted`

**`quotes`** — the core quoting entity (one shareable link each)
`id, quote_number (PCS-YYYY-NNNN), share_token, version, status,
customer_id (nullable), lead_id (nullable),` project fields flattened in from the
old projects table (`project_type, sports[], address_line1, city, state, zip,
square_feet, number_of_courts, court_age_years, cracks_present, …`), color FKs
(`color_inside_id, color_outside_id, color_lines_id, color_nvz_id → color_palette`),
totals (`subtotal, discount_amount, total`), Stripe (`stripe_invoice_id,
stripe_balance_invoice_id`), `deposit_due_days, payment_schedule (JSONB),
accepted_by_name/email`, timestamps.
- CHECK constraint: `lead_id IS NOT NULL OR customer_id IS NOT NULL`
- `quote_status` enum: `draft, sent, viewed, accepted, declined, expired, revised,
  deposit_paid, completed`

**`quote_packages`** — Good / Better / Best tiers per quote
`id, quote_id → quotes (cascade), tier, name, description, subtotal,
is_recommended, sort_order`

**`quote_line_items`** — priced rows inside a package
`id, package_id → quote_packages (cascade), service_id → services_catalog,
name, description, line_item_type, unit_of_measure, quantity, unit_price,
total_price, is_optional, is_included_by_default, sort_order`

**`quote_selections`** — snapshot of what the customer accepted
`id, quote_id → quotes (cascade), selected_package_id → quote_packages,
toggled_line_items (JSONB), color_inside/outside/lines/nvz (TEXT snapshots),
final_total, accepted_by_name/email, ip_address, user_agent, accepted_at`
> Colors are stored as **plain text snapshots** here (not FKs) on purpose — if the
> palette changes later, an accepted quote still shows what was actually agreed to.

**`quote_activity_log`** — audit trail
`id, quote_id → quotes (cascade), event_type, event_data (JSONB), ip_address,
user_agent, created_at`

**`services_catalog`** — the priced service menu (admin-managed reference data)
`id, name, description, category, unit_of_measure, base_price, line_item_type,
is_add_on, sort_order, is_active`

**`color_palette`** — manufacturer color options for the selector
`id, name, hex_code, manufacturer, product_line, color_code, recommended_for[],
is_premium, premium_upcharge, sort_order, is_active`

### Conventions carried across every table
- PK is a UUID (`gen_random_uuid()`).
- Timestamps are `TIMESTAMPTZ`, with an `update_updated_at` trigger on tables that
  have `updated_at`.
- RLS is enabled with a permissive "Admin full access" policy (single-admin phase;
  will tighten when real auth lands). Public read/insert policies exist only for
  the customer-facing quote flow.

---

## Quick "how do I…" reference

- **See a GC's whole history:** `/admin/companies/[id]` — stat cards + every
  contact's quotes.
- **Attach a contact to a company:** edit the customer (or lead) and pick the
  company in the selector.
- **Add a new company:** `/admin/companies` → "Add Company".
- **Quote for a repeat GC contact:** the quote picker's Existing Customer dropdown
  shows `Contact — Company`.
