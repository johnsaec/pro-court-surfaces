# Pro Court Surfaces — Quote Builder Platform

## Project Overview
Multi-tenant court resurfacing quote builder for Pro Court Surfaces (Austin, TX). Allows admin to create interactive quotes for leads/customers, who can view, accept, and pay deposits online.

**Owner:** Patrick (Pro Court Surfaces)
**Local path:** `C:\Dev\pro-court-surfaces`
**Dev URL:** http://localhost:3000

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Database:** Supabase (PostgreSQL) — hosted at `houhjzmgrjemutjfytgu.supabase.co`
- **Auth:** Supabase Auth (admin only)
- **Styling:** Tailwind CSS + shadcn/ui
- **Payments:** Stripe (Invoicing API, not Checkout)
- **Email:** Resend (not yet wired to UI)
- **Deployment:** Not yet deployed (local dev only)

## Environment Variables (.env.local)
```
NEXT_PUBLIC_SUPABASE_URL=https://houhjzmgrjemutjfytgu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
STRIPE_SECRET_KEY=sk_test_... (real test key)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... (real test key)
STRIPE_WEBHOOK_SECRET=whsec_9153291666c61eaab6fc12556f092826ee1d8c5c3408207a8f017214f13cf723
RESEND_API_KEY=re_P3REV7rt_DsakgSyGQUeuKabhyFoVgVUP
EMAIL_FROM=Pro Court Surfaces <quotes@procourtsurfaces.com>
```

## Database Schema (18 migrations)
Key tables: `customers`, `leads`, `projects`, `quotes`, `quote_phases`, `quote_line_items`, `invoices`, `payments`

### Important ENUMs
- `quote_status`: draft, sent, viewed, accepted, declined, expired, completed, deposit_paid
- `deal_stage`: new, contacted, qualified, proposal, negotiation, won, lost, converted
- `project_type`: tennis_court, pickleball_court, basketball_court, multi_sport, other

### Key Schema Details
- `quotes` has BOTH `lead_id` (nullable) and `customer_id` (nullable) — one must be set (CHECK constraint)
- `quotes.deposit_due_days` INTEGER DEFAULT 7 — configurable invoice due date
- `quotes.accepted_by_name` / `accepted_by_email` — captures who signed (may differ from customer)
- `quotes.share_token` — unique 8-char token for public quote URLs
- `quotes.selected_package` — 'good', 'better', 'best' (set by customer on public page)
- Court colors: `quotes.color_inside`, `quotes.color_outside`, `quotes.color_lines`
- Pricing: `quotes.final_total` (after any adjustments to calculated total)
- `leads` table has: first_name, last_name, email, phone, company, address_line1, city, state (default 'TX'), zip

## File Structure
```
src/
├── app/
│   ├── admin/
│   │   ├── customers/          # Customer CRUD
│   │   ├── leads/              # Lead management
│   │   ├── projects/           # Project management
│   │   └── quotes/
│   │       ├── page.tsx        # Quotes list
│   │       ├── new/page.tsx    # Create quote
│   │       └── [id]/
│   │           ├── page.tsx    # Quote detail
│   │           └── edit/page.tsx # Quote builder (edit mode)
│   ├── q/
│   │   └── [share_token]/
│   │       ├── page.tsx        # Public quote page (customer-facing)
│   │       └── accepted/
│   │           └── page.tsx    # Post-acceptance confirmation page
│   └── api/
│       └── stripe/
│           └── webhook/
│               └── route.ts    # Stripe webhook handler (invoice.paid → deposit_paid)
├── components/
│   └── quotes/
│       ├── QuoteBuilder.tsx    # Main quote builder component (21 files, 8 phases)
│       ├── quote-builder/      # Sub-components (phases, package selector, color picker, etc.)
│       └── public/             # Customer-facing quote components
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Browser Supabase client
│   │   └── server.ts           # Server Supabase client
│   ├── stripe.ts               # Stripe singleton instance
│   ├── queries/
│   │   ├── quote-queries.ts    # Admin quote data fetching (includes lead joins)
│   │   └── public-queries.ts   # Public quote fetching by share_token
│   ├── actions/
│   │   ├── quote-actions.ts    # Server actions: save/update quotes
│   │   ├── public-actions.ts   # Server actions: accept quote, create Stripe invoice, lead→customer conversion
│   │   └── project-actions.ts  # Server actions: project CRUD
│   ├── types/
│   │   └── quote-types.ts      # TypeScript types (QuoteFormData, LeadOption, etc.)
│   ├── reducers/
│   │   └── quote-reducer.ts    # Quote builder state (SET_LEAD clears customer, SET_CUSTOMER clears lead)
│   └── constants/
│       └── quote-constants.ts  # Status labels/colors, package names, court colors
└── public/
    └── (logo files go here)
```

## Quote Builder Architecture
The quote builder uses a **reducer pattern** with 8 phases:
1. Customer/Lead Selection (tabs: Lead | Existing Customer)
2. Project Details (court type, dimensions, location)
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
   - Stores `stripe_invoice_id` and `stripe_hosted_url` on quote
4. Redirects to `/q/[share_token]/accepted` — shows confirmation, deposit amount, "Pay Now" button (links to Stripe hosted invoice)
5. Visiting `/q/[share_token]` after acceptance auto-redirects to `/accepted`
6. Stripe webhook (`invoice.paid`) → updates quote status to `deposit_paid`

## What's Done (Sprints 1-4)
- ✅ Full admin CRUD (customers, leads, projects, quotes)
- ✅ Quote Builder with 8 phases, 3 package tiers, line items
- ✅ Customer-facing quote page at /q/[share_token]
- ✅ Package selector and court color diagram on public page
- ✅ Stripe deposit invoicing (50% of total)
- ✅ Lead-to-customer conversion on acceptance
- ✅ Stripe webhook for payment confirmation
- ✅ Acceptance flow with redirect to confirmation page

## What's Pending
- ✅ **Resend email templates:** quote-sent, quote-accepted (admin notification), deposit-paid, balance-due (template only)
- ❌ **PDF generation:** Downloadable quote document with logo, line items, colors, terms (@react-pdf/renderer)
- ❌ **"Collect Remaining Balance" button** in admin — creates second Stripe invoice for remaining 50%
- ❌ **Sprint 5:** Dashboard stats, activity log, mobile responsive, error handling polish
- ❌ **Future:** Kanban board for leads, conversational quote creation, multi-tenant support

## Development Notes
- **Stripe CLI for webhooks:** Run `stripe listen --forward-to localhost:3000/api/stripe/webhook` in a separate terminal alongside `npm run dev`
- **Supabase migrations:** Located in `/supabase/migrations/` — 18 migrations total. Run via Supabase CLI or dashboard SQL editor
- **Column naming:** Use `color_inside`, `color_outside`, `color_lines` (not `interior_color` etc.) and `final_total` (not `total`)
- **Lead vs Customer:** Most quotes are for leads. The `lead_id`/`customer_id` pattern with CHECK constraint enforces one must be set
- **Logo storage:** Put brand assets in `/public/` folder — served statically by Next.js

## Conventions
- Server actions in `src/lib/actions/`
- Data fetching in `src/lib/queries/`
- Types in `src/lib/types/`
- All Supabase calls use service role client for server actions
- shadcn/ui components for all UI elements
- Form state managed by useReducer in quote builder
