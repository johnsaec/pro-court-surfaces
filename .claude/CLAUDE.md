# Pro Court Surfaces — Quote Builder Platform

## Project Overview
Multi-tenant court resurfacing quote builder for Pro Court Surfaces (Austin, TX). Allows admin to create interactive quotes for leads/customers, who can view, accept, and pay deposits online.

**Owner:** Patrick (Pro Court Surfaces)
**Local path:** `C:\Dev\pro-court-surfaces`
**Dev URL:** http://localhost:3000

## Tech Stack
- **Framework:** Next.js 16 (App Router, Turbopack)
- **Database:** Supabase (PostgreSQL) — hosted at `houhjzmgrjemutjfytgu.supabase.co`
- **Auth:** Supabase Auth (admin only)
- **Styling:** Tailwind CSS + shadcn/ui
- **Payments:** Stripe (Invoicing API, not Checkout)
- **Email:** Resend (HTML emails via @react-email/components + @react-email/render)
- **Deployment:** Not yet deployed (local dev only)

## Environment Variables (.env.local)
```
NEXT_PUBLIC_SUPABASE_URL=https://houhjzmgrjemutjfytgu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
STRIPE_SECRET_KEY=sk_test_... (real test key)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... (real test key)
STRIPE_WEBHOOK_SECRET=whsec_... (see .env.local — do not commit real value)
RESEND_API_KEY=re_... (see .env.local — do not commit real value)
EMAIL_FROM=Pro Court Surfaces <quotes@procourtsurfaces.com>
```

## Database Schema (25 migrations)
Key tables: `companies`, `customers`, `leads`, `quotes`, `quote_packages`, `quote_line_items`, `quote_selections`, `quote_activity_log`, `services_catalog`, `color_palette`

> **NOTE:** The `projects` table was **dropped** in migration `00022` and its fields were flattened onto `quotes` (there is no `project_id` anymore). The `companies` account layer was added in `00025`.

### Important ENUMs
- `quote_status`: draft, sent, viewed, accepted, declined, expired, revised, deposit_paid, completed
- `deal_stage`: cold, new_lead, qualified_lead, proposal_stage, proposal_sent, buyer_interested, won, lost, converted
- `project_type`: new_court_full_build, new_court_surfacing_only, repair_resurfacing, conversion_tennis_to_pickleball, color_coating_only, crack_repair_only, other
- `company_type`: general_contractor, builder, property_manager, hoa, school, municipality, homeowner, other

### Key Schema Details
- `quotes` has BOTH `lead_id` (nullable) and `customer_id` (nullable) — one must be set (CHECK constraint)
- `quotes.deposit_due_days` INTEGER DEFAULT 7 — configurable invoice due date
- `quotes.accepted_by_name` / `accepted_by_email` — captures who signed (may differ from customer)
- `quotes.stripe_balance_invoice_id` — Stripe invoice ID for remaining 50% balance
- `quotes.share_token` — unique 8-char token for public quote URLs
- `quotes.selected_package` — 'good', 'better', 'best' (set by customer on public page)
- Court colors: `quotes.color_inside`, `quotes.color_outside`, `quotes.color_lines`
- Pricing: `quotes.final_total` (after any adjustments to calculated total)
- `quotes.payment_schedule` JSONB — NULL = standard 50/50; array of `{label, amount}` = custom milestones
- Court colors also include NVZ (kitchen): `quotes.color_nvz_id`, `quote_selections.color_nvz`
- `leads` table has: first_name, last_name, email, phone, city, address_line1, state (default 'TX'), zip (NO `company` column — use `company_id` FK instead)
- `leads` UTM attribution: first-touch `ft_*` and last-touch `lt_*` columns (source/medium/campaign/content/term/channel/referrer/landing_page/click_id/click_id_type/timestamp)
- `companies` (account layer): `customers.company_id` and `leads.company_id` are nullable FKs → `companies.id`. One company → many contacts → many quotes. Quotes reach a company through their `customer`

## File Structure
```
src/
├── app/
│   ├── admin/
│   │   ├── companies/          # Company/account CRUD (GCs, builders, HOAs)
│   │   ├── customers/          # Customer (contact) CRUD
│   │   ├── leads/              # Lead management
│   │   └── quotes/
│   │       ├── page.tsx        # Quotes list
│   │       ├── new/page.tsx    # Create quote
│   │       ├── _components/    # Shared quote UI (quote-builder, quote-preview, collect-balance-button, download-pdf-button, etc.)
│   │       └── [id]/
│   │           ├── page.tsx    # Quote detail/edit
│   │           └── preview/page.tsx # Read-only preview with action buttons
│   ├── q/
│   │   └── [share_token]/
│   │       ├── page.tsx        # Public quote page (customer-facing)
│   │       └── accepted/
│   │           └── page.tsx    # Post-acceptance confirmation page
│   └── api/
│       ├── quotes/[id]/pdf/    # PDF generation endpoint
│       └── stripe/webhook/     # Stripe webhook (deposit_paid + completed)
├── components/
│   ├── ui/                     # shadcn/ui primitives
│   └── admin/                  # Admin layout components (page-header, etc.)
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Browser Supabase client
│   │   └── server.ts           # Server Supabase client
│   ├── stripe.ts               # Stripe singleton instance
│   ├── resend.ts               # Resend singleton instance
│   ├── constants.ts            # All enum label/color maps
│   ├── admin/
│   │   ├── actions/quote-actions.ts  # Server actions: save, send, delete, collectBalance
│   │   ├── queries/quote-queries.ts  # Admin quote data fetching
│   │   └── types/quote-types.ts      # TypeScript types (QuoteDetail, QuoteBuilderState, etc.)
│   ├── quotes/
│   │   └── public-actions.ts   # Server actions: acceptQuote, logQuoteActivity
│   └── email/
│       ├── send-email.ts       # Resend send wrapper
│       └── templates/          # React Email templates (quote-sent, quote-accepted, deposit-paid, balance-due)
└── public/
    └── (logo files go here)
```

## Quote Builder Architecture
The quote builder uses a **reducer pattern** with 8 phases:
1. Customer/Lead Selection (tabs: Lead | Existing Customer)
2. Project Details (court type, dimensions, location) — these fields live directly on `quotes` now (the `projects` table was removed in 00022)
3. Court Assessment (surface condition, repairs needed)
4. Scope of Work (package tiers: Good/Better/Best)
5. Line Items (per-package pricing, quantities, unit costs)
6. Court Colors (inside, outside, lines — with visual diagram)
7. Terms & Conditions
8. Review & Save

### Package Tiers
Each quote has 3 packages (Good, Better, Best) with different line items and totals. Customer selects their package on the public quote page.

## Acceptance & Payment Flow
1. Customer visits `/q/[share_token]` — sees quote with package selector, colors, line items
2. Clicks **"Accept & Pay Deposit (50%)"** → modal captures signer name/email
3. Server action (`public-actions.ts`):
   - Sets quote status → `accepted`
   - If quote linked to lead (not customer): creates customer record from lead data, updates lead stage → `converted`
   - Finds or creates Stripe Customer
   - Creates Stripe Invoice for 50% of `final_total` with `deposit_due_days` due date
   - Stores `stripe_invoice_id` on quote
4. Redirects to `/q/[share_token]/accepted` — shows confirmation, deposit amount, "Pay Now" button (links to Stripe hosted invoice)
5. Visiting `/q/[share_token]` after acceptance auto-redirects to `/accepted`
6. Stripe webhook (`invoice.paid`) → updates quote status to `deposit_paid`
7. Admin clicks **"Collect Remaining Balance"** on quote preview → creates second Stripe Invoice for remaining 50%, sends `BalanceDueEmail`
8. Stripe webhook (`invoice.paid` for balance invoice) → updates quote status to `completed`

## What's Done (Sprints 1-5)
- ✅ Full admin CRUD (companies, customers, leads, quotes)
- ✅ Quote Builder with 8 phases, 3 package tiers, line items
- ✅ Customer-facing quote page at /q/[share_token]
- ✅ Package selector and court color diagram on public page
- ✅ Stripe deposit invoicing (50% of total)
- ✅ Lead-to-customer conversion on acceptance
- ✅ Stripe webhook for payment confirmation (deposit → `deposit_paid`, balance → `completed`)
- ✅ Acceptance flow with redirect to confirmation page
- ✅ Resend email templates: quote-sent, quote-accepted (admin notification), deposit-paid, balance-due
- ✅ PDF generation: Downloadable quote document with @react-pdf/renderer
- ✅ "Collect Remaining Balance" button in admin preview — creates second Stripe invoice for remaining 50%, sends balance-due email
- ✅ Dashboard with stat cards (total quotes, pipeline value, deposits, completed revenue), recent quotes table, activity timeline
- ✅ Mobile responsive: admin sidebar drawer, mobile card layouts for leads/customers/catalog/quotes tables, responsive dashboard grid
- ✅ Error handling: root + admin + public error boundaries, branded 404 pages, loading skeletons, Toaster on public quote pages
- ✅ Kanban board for leads: drag-and-drop pipeline view with @dnd-kit, list/board view toggle, optimistic stage updates

## What's Pending
- ❌ **Future:** Conversational quote creation, multi-tenant support

## Development Notes
- **Stripe CLI for webhooks:** Run `stripe listen --forward-to localhost:3000/api/stripe/webhook` in a separate terminal alongside `npm run dev`
- **Supabase migrations:** Located in `/supabase/migrations/` — 25 migrations total. Run via Supabase CLI or dashboard SQL editor
- **Column naming:** Use `color_inside`, `color_outside`, `color_lines` (not `interior_color` etc.) and `final_total` (not `total`)
- **Lead vs Customer:** Most quotes are for leads. The `lead_id`/`customer_id` pattern with CHECK constraint enforces one must be set
- **Company vs Customer:** A `customer` is a *person/contact*; a `company` is the *account* (GC, builder, HOA). A contact optionally belongs to a company via `customers.company_id`. Quotes always attach to a contact, never directly to a company
- **Logo storage:** Put brand assets in `/public/` folder — served statically by Next.js

## Conventions
- Admin server actions in `src/lib/admin/actions/`
- Admin data fetching in `src/lib/admin/queries/`
- Admin types in `src/lib/admin/types/`
- Public (customer-facing) actions in `src/lib/quotes/`
- Email templates in `src/lib/email/templates/` (React Email components)
- Constants/enums in `src/lib/constants.ts`
- All Supabase calls use service role client for server actions
- shadcn/ui components for all UI elements
- Form state managed by useReducer in quote builder
- Supabase CLI not linked (no access token) — run migrations via dashboard SQL editor
