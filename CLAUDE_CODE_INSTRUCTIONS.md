# Pro Court Surfaces — Platform Build Instructions

## Project Overview

You are building a custom quoting and invoicing platform for **Pro Court Surfaces**, a tennis and pickleball court resurfacing business based in Austin, Texas. The owner (Patrick) operates as a solo entrepreneur specializing in court surfacing work for residential homeowners, HOAs, and commercial facilities.

### What This App Does

1. **Manages leads/customers** — tracks prospects from first contact through project completion
2. **Generates interactive quotes** — customers receive a branded link where they can select packages, toggle add-ons, pick court colors, and accept a quote
3. **Handles payments** — accepted quotes convert to Stripe invoices; customer pays via hosted payment page
4. **Generates PDFs** — auto-generates quote PDFs on acceptance for records

### What This App Does NOT Do (Yet)

- Accounting sync (QBO integration is Phase 2)
- Partner/referral management (Phase 2)
- Vendor bill tracking (Phase 2)
- Job scheduling or field management

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 14+ (App Router) on Vercel | Customer-facing quote pages + admin dashboard |
| **Database** | Supabase (Postgres) | All data, auth, file storage (quote PDFs) |
| **Payments** | Stripe | Invoices + payment collection only ("dumb payment pipe") |
| **Email** | Resend | Transactional emails (quote delivery, payment receipts) |
| **Styling** | Tailwind CSS + shadcn/ui | UI components |
| **CRM (existing)** | Notion Pipeline | Patrick's current lead tracker — Supabase is the source of truth, Notion stays as a lightweight view for now |

### Key Architecture Decisions

- **Stripe is a payment pipe only.** All quoting logic, package configuration, and pricing lives in Supabase. Stripe just receives the final line items and collects money.
- **No Stripe Quotes API.** Stripe Quotes don't support optional/selectable line items. We build our own interactive quote experience.
- **Supabase is the single source of truth.** Notion Pipeline may sync from Supabase later, but Supabase owns the data.
- **Fresh build, not a migration.** There's an old Loveable/Supabase codebase — ignore it entirely. Reference it only if you need copy/content ideas. Start clean.

---

## Supabase Schema — Phase 1

### Important Notes Before You Start

- Use `uuid` primary keys everywhere (Supabase default with `gen_random_uuid()`)
- Use `timestamptz` for all timestamps
- Use snake_case for all column names
- Add `created_at` and `updated_at` to every table
- Set up Row Level Security (RLS) on all tables — but initially with permissive policies since Patrick is the only admin user. We'll tighten later.
- Create an `updated_at` trigger function that auto-updates the column on row changes

### Enum Types

Create these as Postgres enums before the tables:

```sql
-- Deal/lead lifecycle
CREATE TYPE deal_stage AS ENUM (
  'cold',
  'new_lead',
  'qualified_lead',
  'proposal_stage',
  'proposal_sent',
  'buyer_interested',
  'won',
  'lost'
);

-- How the lead found us
CREATE TYPE lead_source AS ENUM (
  'inbound',
  'outbound',
  'referral',
  'event',
  'partner',
  'website',
  'linkedin',
  'ai_search',
  'permit_mining',
  'other'
);

-- What kind of court project
CREATE TYPE project_type AS ENUM (
  'new_court_full_build',
  'new_court_surfacing_only',
  'repair_resurfacing',
  'conversion_tennis_to_pickleball',
  'color_coating_only',
  'crack_repair_only',
  'other'
);

-- Sports the court supports
CREATE TYPE sport_type AS ENUM (
  'pickleball',
  'tennis',
  'basketball',
  'volleyball',
  'multi_sport'
);

-- Quote status lifecycle
CREATE TYPE quote_status AS ENUM (
  'draft',
  'sent',
  'viewed',
  'accepted',
  'declined',
  'expired',
  'revised'
);

-- Quote line item type
CREATE TYPE line_item_type AS ENUM (
  'base_service',
  'add_on',
  'material',
  'color_application',
  'game_lines',
  'discount',
  'other'
);

-- Package tier
CREATE TYPE package_tier AS ENUM (
  'good',
  'better',
  'best'
);

-- Unit of measure for services
CREATE TYPE unit_of_measure AS ENUM (
  'per_sqft',
  'per_linear_ft',
  'per_court',
  'flat_rate',
  'per_hour',
  'each'
);
```

---

### Table: `customers`

Graduated leads who have a real relationship. A lead becomes a customer when they accept a quote or when Patrick manually promotes them. Customers are reusable across multiple projects.

```sql
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Identity
  first_name TEXT,
  last_name TEXT,
  display_name TEXT NOT NULL,  -- could be company name for HOAs, or "First Last" for residential
  email TEXT,
  phone TEXT,
  
  -- Location
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT,
  state TEXT DEFAULT 'TX',
  zip TEXT,
  
  -- External IDs
  stripe_customer_id TEXT UNIQUE,  -- set when first Stripe invoice is created
  notion_page_id TEXT UNIQUE,      -- if synced from Notion pipeline
  
  -- Metadata
  notes TEXT,
  tags TEXT[],  -- flexible tagging: ['residential', 'hoa', 'commercial', 'repeat']
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_stripe ON customers(stripe_customer_id);
```

---

### Table: `leads`

Top-of-funnel prospects. Not yet customers. Includes court condition assessment data collected from intake forms.

```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Identity (may be sparse for cold leads)
  first_name TEXT,
  last_name TEXT,
  display_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  city TEXT,
  
  -- Deal tracking
  deal_stage deal_stage NOT NULL DEFAULT 'new_lead',
  lead_source lead_source,
  lead_source_detail TEXT,  -- freeform: "referred by John at StarWoodland", "Austin permit #12345"
  
  -- Court details (from intake form)
  project_type project_type,
  sports sport_type[] DEFAULT '{}',
  square_feet NUMERIC,
  number_of_courts INTEGER,
  court_age_years NUMERIC,
  
  -- Condition assessment
  cracks_present BOOLEAN DEFAULT false,
  crack_length_ft NUMERIC,      -- total linear feet of cracks
  bird_bath_count INTEGER,       -- number of low spots holding water
  bird_bath_area_sqft NUMERIC,   -- total area of bird baths
  blistering_boiling BOOLEAN DEFAULT false,
  paint_chipping BOOLEAN DEFAULT false,
  
  -- Concrete details
  broom_finish BOOLEAN DEFAULT false,
  vapor_barrier BOOLEAN DEFAULT false,
  concrete_pour_date TEXT,  -- kept as text, user often just knows "about 5 years ago"
  
  -- Color preferences (from intake form - freeform text)
  color_inside TEXT,
  color_outside TEXT,
  color_lines TEXT,
  
  -- Add-on interest flags (from intake form)
  wants_basketball_lines BOOLEAN DEFAULT false,
  wants_volleyball_lines BOOLEAN DEFAULT false,
  wants_net BOOLEAN DEFAULT false,
  wants_fence BOOLEAN DEFAULT false,
  wants_lights BOOLEAN DEFAULT false,
  interested_in_financing BOOLEAN DEFAULT false,
  
  -- Form tracking
  form_type TEXT,                 -- which intake form they filled out
  second_step_complete BOOLEAN DEFAULT false,
  
  -- Conversion
  customer_id UUID REFERENCES customers(id),  -- set when lead converts to customer
  converted_at TIMESTAMPTZ,
  
  -- External IDs
  notion_page_id TEXT UNIQUE,
  
  -- Notes
  notes TEXT,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_leads_deal_stage ON leads(deal_stage);
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_customer ON leads(customer_id);
```

---

### Table: `projects`

A specific court job. Ties a customer to a location and scope of work. A customer can have multiple projects (e.g., they come back for a second court later). A project can have multiple quote versions.

```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Relationships
  customer_id UUID NOT NULL REFERENCES customers(id),
  lead_id UUID REFERENCES leads(id),  -- the lead that spawned this project
  
  -- Project info
  name TEXT NOT NULL,  -- e.g., "Travis Country Blue Valley - 4 Court Conversion"
  project_type project_type,
  sports sport_type[] DEFAULT '{}',
  
  -- Site details
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT,
  state TEXT DEFAULT 'TX',
  zip TEXT,
  
  -- Court specs
  square_feet NUMERIC,
  number_of_courts INTEGER,
  court_age_years NUMERIC,
  
  -- Condition (copied from lead or entered fresh during site visit)
  cracks_present BOOLEAN DEFAULT false,
  crack_length_ft NUMERIC,
  bird_bath_count INTEGER,
  bird_bath_area_sqft NUMERIC,
  blistering_boiling BOOLEAN DEFAULT false,
  paint_chipping BOOLEAN DEFAULT false,
  broom_finish BOOLEAN DEFAULT false,
  vapor_barrier BOOLEAN DEFAULT false,
  concrete_pour_date TEXT,
  
  -- Status
  status TEXT NOT NULL DEFAULT 'quoting',  -- quoting, scheduled, in_progress, completed, cancelled
  
  -- Financials (summary, rolled up from accepted quote)
  accepted_quote_id UUID,  -- FK added after quotes table exists
  total_price NUMERIC,     -- final accepted price
  material_cost NUMERIC,   -- internal cost tracking
  
  -- Notes
  notes TEXT,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_projects_customer ON projects(customer_id);
CREATE INDEX idx_projects_status ON projects(status);
```

---

### Table: `services_catalog`

The menu of services Patrick offers, with base pricing. Used to populate quote line items. Admin-managed.

```sql
CREATE TABLE services_catalog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Service definition
  name TEXT NOT NULL,           -- e.g., "Court Resurfacing", "Crack Repair", "Pickleball Game Lines"
  description TEXT,             -- shown on quote
  category TEXT NOT NULL,       -- 'surfacing', 'repair', 'lines', 'equipment', 'other'
  
  -- Pricing
  unit_of_measure unit_of_measure NOT NULL,
  base_price NUMERIC NOT NULL,  -- price per unit (e.g., $0.85 per sqft)
  
  -- Classification
  line_item_type line_item_type NOT NULL DEFAULT 'base_service',
  is_add_on BOOLEAN DEFAULT false,  -- shows as toggleable add-on vs core service
  
  -- Display
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

**Seed data to include:**

| name | unit | base_price | category | is_add_on |
|------|------|-----------|----------|-----------|
| Court Resurfacing (Acrylic System) | per_sqft | 0.85 | surfacing | false |
| Crack Repair - Standard | per_linear_ft | 3.50 | repair | false |
| Crack Repair - Structural (membrane) | per_linear_ft | 8.00 | repair | false |
| Bird Bath Leveling | each | 150.00 | repair | false |
| Pickleball Game Lines | per_court | 350.00 | lines | false |
| Tennis Game Lines | per_court | 450.00 | lines | false |
| Basketball Lines (overlay) | per_court | 250.00 | lines | true |
| Volleyball Lines (overlay) | per_court | 200.00 | lines | true |
| Net Post Installation | each | 275.00 | equipment | true |
| Pressure Washing | per_sqft | 0.15 | surfacing | false |
| Primer Application | per_sqft | 0.20 | surfacing | false |
| Color Coating (per coat) | per_sqft | 0.35 | surfacing | false |

*(Patrick will adjust these prices — this is a starting point)*

---

### Table: `color_palette`

Manufacturer color options for the interactive color selector.

```sql
CREATE TABLE color_palette (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Color info
  name TEXT NOT NULL,            -- e.g., "US Open Blue", "Championship Green"
  hex_code TEXT NOT NULL,        -- e.g., "#1B4D8C" for rendering
  manufacturer TEXT NOT NULL,    -- "SportMaster", "DecoTurf", "California Sports Surfaces"
  product_line TEXT,             -- e.g., "SportMaster ColorPlus"
  color_code TEXT,               -- manufacturer's code, e.g., "SM-1024"
  
  -- Usage
  recommended_for TEXT[],        -- ['inside', 'outside', 'lines'] — where this color works
  is_premium BOOLEAN DEFAULT false,  -- if it costs extra
  premium_upcharge NUMERIC DEFAULT 0,
  
  -- Display
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

---

### Table: `quotes`

The core quoting entity. Each quote gets a unique shareable link. A project can have multiple quote versions (revisions).

```sql
CREATE TABLE quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Relationships
  project_id UUID NOT NULL REFERENCES projects(id),
  customer_id UUID NOT NULL REFERENCES customers(id),
  
  -- Identification
  quote_number TEXT UNIQUE NOT NULL,  -- human-readable: "PCS-2026-0042"
  share_token TEXT UNIQUE NOT NULL,   -- URL-safe token for public link: "a8f3x9k2"
  version INTEGER NOT NULL DEFAULT 1, -- increments for revisions
  
  -- Status
  status quote_status NOT NULL DEFAULT 'draft',
  
  -- Dates
  sent_at TIMESTAMPTZ,
  viewed_at TIMESTAMPTZ,
  accepted_at TIMESTAMPTZ,
  declined_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,  -- optional expiration
  
  -- Messaging
  cover_note TEXT,          -- personal message from Patrick shown at top of quote
  terms_and_conditions TEXT, -- legal/warranty text shown at bottom
  
  -- Color selections (what customer picked in the color selector)
  color_inside_id UUID REFERENCES color_palette(id),
  color_outside_id UUID REFERENCES color_palette(id),
  color_lines_id UUID REFERENCES color_palette(id),
  
  -- Totals (computed from packages + selections, stored for quick access)
  subtotal NUMERIC,
  discount_amount NUMERIC DEFAULT 0,
  total NUMERIC,
  
  -- PDF
  pdf_storage_path TEXT,  -- Supabase Storage path for generated PDF
  
  -- Stripe
  stripe_invoice_id TEXT,  -- set when quote is accepted and invoice is created
  
  -- Metadata
  internal_notes TEXT,  -- Patrick's private notes, not shown to customer
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_quotes_share_token ON quotes(share_token);
CREATE INDEX idx_quotes_project ON quotes(project_id);
CREATE INDEX idx_quotes_customer ON quotes(customer_id);
CREATE INDEX idx_quotes_status ON quotes(status);
CREATE UNIQUE INDEX idx_quotes_project_version ON quotes(project_id, version);
```

**Quote Number Generation:**
Use a Postgres sequence or a function. Format: `PCS-YYYY-NNNN` (e.g., `PCS-2026-0001`).

```sql
CREATE SEQUENCE quote_number_seq START 1;

CREATE OR REPLACE FUNCTION generate_quote_number()
RETURNS TEXT AS $$
BEGIN
  RETURN 'PCS-' || EXTRACT(YEAR FROM now())::TEXT || '-' || LPAD(nextval('quote_number_seq')::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;
```

**Share Token Generation:**
8-character alphanumeric. Generate in application code or via a Postgres function using `encode(gen_random_bytes(6), 'base64')` cleaned to URL-safe characters.

---

### Table: `quote_packages`

Each quote presents up to 3 package tiers (Good / Better / Best). Each package is a pre-configured bundle of line items.

```sql
CREATE TABLE quote_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Relationships
  quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  
  -- Package definition
  tier package_tier NOT NULL,        -- good, better, best
  name TEXT NOT NULL,                -- e.g., "Essential Resurface", "Pro Resurface", "Championship Package"
  description TEXT,                  -- short pitch for this tier
  
  -- Pricing (sum of its line items)
  subtotal NUMERIC NOT NULL DEFAULT 0,
  
  -- Display
  is_recommended BOOLEAN DEFAULT false,  -- highlight badge on the "Better" tier
  sort_order INTEGER NOT NULL DEFAULT 0,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_quote_packages_quote ON quote_packages(quote_id);
CREATE UNIQUE INDEX idx_quote_packages_tier ON quote_packages(quote_id, tier);
```

---

### Table: `quote_line_items`

Individual items within each package. Every service, material, add-on, or discount is a line item.

```sql
CREATE TABLE quote_line_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Relationships
  package_id UUID NOT NULL REFERENCES quote_packages(id) ON DELETE CASCADE,
  service_id UUID REFERENCES services_catalog(id),  -- null for custom/one-off items
  
  -- Item details
  name TEXT NOT NULL,
  description TEXT,
  line_item_type line_item_type NOT NULL DEFAULT 'base_service',
  
  -- Pricing
  unit_of_measure unit_of_measure,
  quantity NUMERIC NOT NULL DEFAULT 1,
  unit_price NUMERIC NOT NULL,
  total_price NUMERIC NOT NULL,  -- quantity * unit_price (or manual override for flat-rate)
  
  -- Add-on behavior
  is_optional BOOLEAN DEFAULT false,   -- customer can toggle this on/off
  is_included_by_default BOOLEAN DEFAULT true,  -- for optional items: start toggled on or off?
  
  -- Display
  sort_order INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_line_items_package ON quote_line_items(package_id);
```

---

### Table: `quote_selections`

What the customer actually chose. Recorded when they interact with the quote page and click "Accept."

```sql
CREATE TABLE quote_selections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Relationships
  quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  selected_package_id UUID NOT NULL REFERENCES quote_packages(id),
  
  -- Optional line item toggles (which optional items did they turn on/off?)
  toggled_line_items JSONB NOT NULL DEFAULT '[]',
  -- Format: [{"line_item_id": "uuid", "selected": true/false}, ...]
  
  -- Color selections at time of acceptance (snapshot)
  color_inside TEXT,
  color_outside TEXT,
  color_lines TEXT,
  
  -- Final price (computed from package + toggle adjustments)
  final_total NUMERIC NOT NULL,
  
  -- Customer info
  accepted_by_name TEXT,   -- typed name as signature
  accepted_by_email TEXT,
  ip_address INET,
  user_agent TEXT,
  
  -- Timestamp
  accepted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_selections_quote ON quote_selections(quote_id);
```

---

### Table: `quote_activity_log`

Tracks every event on a quote for audit trail and analytics.

```sql
CREATE TABLE quote_activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  
  event_type TEXT NOT NULL,  -- 'created', 'sent', 'viewed', 'opened_link', 'selected_package', 'toggled_addon', 'accepted', 'declined', 'expired', 'revised', 'pdf_generated', 'invoice_created', 'payment_received'
  
  event_data JSONB DEFAULT '{}',  -- flexible payload for event-specific data
  
  ip_address INET,
  user_agent TEXT,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_activity_quote ON quote_activity_log(quote_id);
CREATE INDEX idx_activity_type ON quote_activity_log(event_type);
```

---

### Add Foreign Key for Accepted Quote on Projects

```sql
ALTER TABLE projects
  ADD CONSTRAINT fk_projects_accepted_quote
  FOREIGN KEY (accepted_quote_id) REFERENCES quotes(id);
```

---

### Auto-Update Trigger

```sql
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables
CREATE TRIGGER set_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON services_catalog FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON color_palette FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON quotes FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON quote_packages FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON quote_line_items FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

---

### Row Level Security (Phase 1 — Permissive)

For now, Patrick is the only user. Set up RLS with wide-open policies that we'll tighten later when admin auth is in place.

```sql
-- Enable RLS on all tables
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE color_palette ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_line_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_selections ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_activity_log ENABLE ROW LEVEL SECURITY;

-- Service role bypasses RLS. For the app, use anon key with policies:

-- Public read access for quote pages (customer-facing, filtered by share_token)
CREATE POLICY "Public can view quotes by share token" ON quotes
  FOR SELECT USING (true);  -- App code filters by share_token

CREATE POLICY "Public can view quote packages" ON quote_packages
  FOR SELECT USING (true);

CREATE POLICY "Public can view quote line items" ON quote_line_items
  FOR SELECT USING (true);

CREATE POLICY "Public can view colors" ON color_palette
  FOR SELECT USING (is_active = true);

-- Public can insert selections (when customer accepts)
CREATE POLICY "Public can create selections" ON quote_selections
  FOR INSERT WITH CHECK (true);

-- Public can insert activity logs
CREATE POLICY "Public can log activity" ON quote_activity_log
  FOR INSERT WITH CHECK (true);

-- Admin has full access (tighten with auth later)
CREATE POLICY "Admin full access" ON customers FOR ALL USING (true);
CREATE POLICY "Admin full access" ON leads FOR ALL USING (true);
CREATE POLICY "Admin full access" ON projects FOR ALL USING (true);
CREATE POLICY "Admin full access" ON services_catalog FOR ALL USING (true);
CREATE POLICY "Admin full access" ON color_palette FOR ALL USING (true);
CREATE POLICY "Admin full access" ON quotes FOR ALL USING (true);
CREATE POLICY "Admin full access" ON quote_packages FOR ALL USING (true);
CREATE POLICY "Admin full access" ON quote_line_items FOR ALL USING (true);
CREATE POLICY "Admin full access" ON quote_selections FOR ALL USING (true);
CREATE POLICY "Admin full access" ON quote_activity_log FOR ALL USING (true);
```

---

## Application Routes & Pages

### Public (Customer-Facing)

| Route | Purpose |
|-------|---------|
| `/q/[share_token]` | Interactive quote page. The main customer experience. |
| `/q/[share_token]/accepted` | Confirmation page after acceptance |
| `/q/[share_token]/pdf` | PDF download or view |

### Admin (Patrick's Dashboard)

| Route | Purpose |
|-------|---------|
| `/admin` | Dashboard — pipeline summary, recent activity |
| `/admin/leads` | Lead management list/board |
| `/admin/customers` | Customer directory |
| `/admin/projects` | Project list with status |
| `/admin/projects/[id]` | Single project — quotes, status, notes |
| `/admin/quotes/new` | Create new quote (select customer/project, build packages) |
| `/admin/quotes/[id]` | View/edit a specific quote |
| `/admin/quotes/[id]/preview` | Preview what customer sees |
| `/admin/catalog` | Manage services catalog and pricing |
| `/admin/colors` | Manage color palette |
| `/admin/settings` | Account settings, Stripe connection, email config |

### API Routes

| Route | Purpose |
|-------|---------|
| `/api/quotes/[share_token]` | GET — fetch quote data for public page |
| `/api/quotes/[share_token]/accept` | POST — record acceptance, create Stripe invoice |
| `/api/quotes/[share_token]/activity` | POST — log view/interaction events |
| `/api/stripe/webhook` | POST — handle Stripe payment events |
| `/api/admin/quotes` | CRUD for quotes (protected) |
| `/api/admin/leads` | CRUD for leads (protected) |
| `/api/admin/customers` | CRUD for customers (protected) |
| `/api/email/send-quote` | POST — trigger quote email via Resend |

---

## The Quote Flow (End to End)

### 1. Patrick Creates a Quote (Admin)

1. Goes to `/admin/quotes/new`
2. Selects existing customer or creates new one
3. Selects or creates project (auto-populates court details from lead data)
4. Builds up to 3 package tiers:
   - Picks services from catalog
   - Adjusts quantities based on court specs (e.g., sqft * rate)
   - Marks certain items as optional/toggleable add-ons
   - Sets one package as "recommended"
5. Writes a personal cover note
6. Saves as draft or sends immediately

### 2. Customer Receives Quote (Email)

1. Resend sends a branded email with:
   - Patrick's cover note
   - Summary of the project
   - CTA button: "View Your Quote" → `https://procourtquotes.com/q/a8f3x9k2`
2. Email also includes a static PDF attachment as fallback

### 3. Customer Interacts with Quote (Public Page)

The quote page at `/q/[share_token]` shows:

1. **Header** — Pro Court Surfaces branding, project name, date
2. **Cover Note** — Patrick's personal message
3. **Package Selector** — 3 cards (Good / Better / Best) with:
   - Package name and description
   - List of included items with prices
   - "Recommended" badge on one
   - Total for each tier
4. **Add-Ons Section** — toggle switches for optional items (basketball lines, volleyball lines, net posts, etc.) with price impact shown live
5. **Color Selector** — interactive court diagram showing:
   - Inside court color (tap to pick from palette)
   - Outside court color (tap to pick from palette)  
   - Line color (tap to pick from palette)
   - Live preview updates as colors change
6. **Running Total** — sticky bar showing current price as they toggle options
7. **Accept Button** — "Accept & Proceed to Payment"
8. **Terms** — expandable T&C section

### 4. Customer Accepts

1. Customer clicks Accept
2. Modal asks for their name (as signature) and confirms email
3. `quote_selections` record is created with their choices
4. `quote_activity_log` records the acceptance
5. Quote status → `accepted`
6. **Backend creates a Stripe Invoice:**
   - Creates/retrieves Stripe Customer
   - Creates Invoice with final line items (selected package + toggled add-ons)
   - Finalizes invoice
   - Gets hosted invoice URL
7. Customer is redirected to Stripe's hosted payment page
8. PDF is auto-generated and stored in Supabase Storage

### 5. Payment Completes (Stripe Webhook)

1. Stripe fires `invoice.paid` webhook
2. App updates project with payment status
3. Sends confirmation email via Resend
4. Logs event in activity log

---

## Color Selector Feature

This is a key differentiator. Build a React component that:

1. Renders a **top-down court diagram** (SVG or Canvas) showing:
   - Inside playing area
   - Outside/surround area
   - Game lines
2. Each zone is **tappable/clickable** — opens a color picker drawer/modal
3. Color picker shows **swatches from the `color_palette` table**, grouped by manufacturer
4. Selecting a color **instantly updates the court preview**
5. Color names are shown below the diagram
6. If a color is `is_premium`, show a small upcharge badge

The court diagram should support at minimum:
- Single pickleball court
- Dual pickleball courts (side by side)
- Single tennis court
- Tennis court with 4 pickleball overlay courts

The diagram type is determined by the project's `sports` and `number_of_courts` fields.

---

## Stripe Integration Details

### Environment Variables Needed

```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Stripe Objects We Create

1. **Customer** — created when first invoice is needed. Store `stripe_customer_id` on our `customers` table.
2. **Invoice** — created when quote is accepted. Line items mirror the selected package + add-ons.
3. **Webhook** — listen for `invoice.paid`, `invoice.payment_failed`

### We Do NOT Use

- Stripe Quotes API (doesn't support optional items)
- Stripe Checkout Sessions (we want invoice-style payment, not cart)
- Stripe Products/Prices (our catalog lives in Supabase, not Stripe)

---

## Resend Email Integration

### Environment Variables

```
RESEND_API_KEY=re_...
EMAIL_FROM=quotes@procourtquotes.com  (or whatever domain Patrick sets up)
```

### Emails to Send

1. **Quote Delivery** — "Your quote from Pro Court Surfaces is ready" + link + optional PDF
2. **Quote Reminder** — if not viewed after X days
3. **Acceptance Confirmation** — "Your quote has been accepted" + Stripe payment link
4. **Payment Confirmation** — "Payment received" + PDF receipt

---

## Supabase Storage

Create a bucket called `quote-pdfs` for storing generated PDF files.

```
quote-pdfs/
  {quote_id}/
    PCS-2026-0042-v1.pdf
```

Use a server-side PDF generation library (e.g., `@react-pdf/renderer` or `puppeteer` on a Vercel serverless function) to create branded PDFs from quote data.

---

## Development Order (Suggested)

### Sprint 1: Foundation
1. Set up Next.js project with Tailwind + shadcn/ui
2. Set up Supabase project and run all migrations
3. Seed services catalog and color palette
4. Build basic admin layout with navigation
5. Build CRUD for customers, leads, services catalog

### Sprint 2: Quote Builder
6. Build quote creation form (admin side)
7. Package builder UI (add line items from catalog, set quantities)
8. Quote preview (admin sees what customer will see)

### Sprint 3: Customer-Facing Quote Page
9. Build `/q/[share_token]` public page
10. Package selector component
11. Add-on toggle component
12. Color selector component with court diagram
13. Running total calculator
14. Accept flow + signature capture

### Sprint 4: Payments & Notifications
15. Stripe integration (create invoice on acceptance)
16. Stripe webhook handler
17. Resend email integration (send quote, confirmations)
18. PDF generation

### Sprint 5: Polish
19. Admin dashboard with pipeline stats
20. Quote activity log viewer
21. Mobile responsiveness
22. Error handling and edge cases

---

## Existing Data Context

Patrick currently has leads in a Notion database called "Pipeline" with these deal stages: Cold → New Lead → Qualified Lead → Proposal Stage → Proposal Sent → Buyer Interested → Won → Lost. The Notion data includes about 30 records (mix of real and test leads).

For now, **don't build a Notion sync.** Patrick will manually create leads/customers in the new system. Notion sync can be added later as a nice-to-have.

There's also an old Loveable/Supabase instance — **do not connect to it or migrate from it.** Fresh Supabase project, clean slate.

---

## Domain & Environment

- **Quote links domain:** TBD — likely `procourtquotes.com` or `quotes.procourtsurfaces.com`
- **Admin dashboard:** same domain, under `/admin` route with auth
- **Vercel project:** new project, connected to GitHub repo
- **Supabase project:** new project (Patrick will create and share credentials)

---

## Key Business Rules

1. **Quote expiration:** Optional. If set, quote page shows countdown and blocks acceptance after expiry.
2. **Quote versioning:** Creating a revision on an existing project auto-increments version number and sets previous version to `revised` status.
3. **Quote number format:** `PCS-YYYY-NNNN`, auto-incrementing per year.
4. **Price calculation:** Always computed server-side from line items. The displayed total on the public page should match what gets sent to Stripe.
5. **Color selections are part of the quote.** They feed into the materials list and affect the PDF output.
6. **No user accounts for customers.** Quotes are accessed via share token (like a magic link). No login required.
7. **Admin auth:** Use Supabase Auth with a single admin account (Patrick's email + password). Can expand to team later.
