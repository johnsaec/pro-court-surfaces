-- Migration: Create all enum types
-- These must exist before any tables reference them

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
-- Migration: Create the updated_at trigger function
-- Shared by all tables to auto-set updated_at on row changes

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- Migration: Create customers table
-- Graduated leads with a real relationship. Reusable across multiple projects.

CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Identity
  first_name TEXT,
  last_name TEXT,
  display_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,

  -- Location
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT,
  state TEXT DEFAULT 'TX',
  zip TEXT,

  -- External IDs
  stripe_customer_id TEXT UNIQUE,
  notion_page_id TEXT UNIQUE,

  -- Metadata
  notes TEXT,
  tags TEXT[],

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_stripe ON customers(stripe_customer_id);

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
-- Migration: Create leads table
-- Top-of-funnel prospects. Includes court condition assessment data.

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
  lead_source_detail TEXT,

  -- Court details (from intake form)
  project_type project_type,
  sports sport_type[] DEFAULT '{}',
  square_feet NUMERIC,
  number_of_courts INTEGER,
  court_age_years NUMERIC,

  -- Condition assessment
  cracks_present BOOLEAN DEFAULT false,
  crack_length_ft NUMERIC,
  bird_bath_count INTEGER,
  bird_bath_area_sqft NUMERIC,
  blistering_boiling BOOLEAN DEFAULT false,
  paint_chipping BOOLEAN DEFAULT false,

  -- Concrete details
  broom_finish BOOLEAN DEFAULT false,
  vapor_barrier BOOLEAN DEFAULT false,
  concrete_pour_date TEXT,

  -- Color preferences (freeform text from intake)
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
  form_type TEXT,
  second_step_complete BOOLEAN DEFAULT false,

  -- Conversion
  customer_id UUID REFERENCES customers(id),
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

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
-- Migration: Create services_catalog table
-- Menu of services with base pricing. Admin-managed.

CREATE TABLE services_catalog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Service definition
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,

  -- Pricing
  unit_of_measure unit_of_measure NOT NULL,
  base_price NUMERIC NOT NULL,

  -- Classification
  line_item_type line_item_type NOT NULL DEFAULT 'base_service',
  is_add_on BOOLEAN DEFAULT false,

  -- Display
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON services_catalog
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
-- Migration: Create color_palette table
-- Manufacturer color options for the interactive color selector.

CREATE TABLE color_palette (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Color info
  name TEXT NOT NULL,
  hex_code TEXT NOT NULL,
  manufacturer TEXT NOT NULL,
  product_line TEXT,
  color_code TEXT,

  -- Usage
  recommended_for TEXT[],
  is_premium BOOLEAN DEFAULT false,
  premium_upcharge NUMERIC DEFAULT 0,

  -- Display
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON color_palette
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
-- Migration: Create projects table
-- A specific court job. Ties a customer to a location and scope of work.
-- accepted_quote_id FK is added later after quotes table exists.

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Relationships
  customer_id UUID NOT NULL REFERENCES customers(id),
  lead_id UUID REFERENCES leads(id),

  -- Project info
  name TEXT NOT NULL,
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

  -- Condition
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
  status TEXT NOT NULL DEFAULT 'quoting',

  -- Financials (rolled up from accepted quote)
  accepted_quote_id UUID,
  total_price NUMERIC,
  material_cost NUMERIC,

  -- Notes
  notes TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_projects_customer ON projects(customer_id);
CREATE INDEX idx_projects_status ON projects(status);

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
-- Migration: Create quotes table and quote_number helpers
-- Core quoting entity. Each quote gets a unique shareable link.

-- Sequence for human-readable quote numbers
CREATE SEQUENCE quote_number_seq START 1;

-- Function to generate quote numbers in PCS-YYYY-NNNN format
CREATE OR REPLACE FUNCTION generate_quote_number()
RETURNS TEXT AS $$
BEGIN
  RETURN 'PCS-' || EXTRACT(YEAR FROM now())::TEXT || '-' || LPAD(nextval('quote_number_seq')::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;

-- Function to generate URL-safe share tokens
CREATE OR REPLACE FUNCTION generate_share_token()
RETURNS TEXT AS $$
DECLARE
  raw_token TEXT;
  clean_token TEXT;
BEGIN
  raw_token := encode(gen_random_bytes(6), 'base64');
  -- Make URL-safe: replace +, /, = with alphanumeric chars
  clean_token := replace(replace(replace(raw_token, '+', 'x'), '/', 'y'), '=', '');
  RETURN lower(substring(clean_token from 1 for 8));
END;
$$ LANGUAGE plpgsql;

CREATE TABLE quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Relationships
  project_id UUID NOT NULL REFERENCES projects(id),
  customer_id UUID NOT NULL REFERENCES customers(id),

  -- Identification
  quote_number TEXT UNIQUE NOT NULL DEFAULT generate_quote_number(),
  share_token TEXT UNIQUE NOT NULL DEFAULT generate_share_token(),
  version INTEGER NOT NULL DEFAULT 1,

  -- Status
  status quote_status NOT NULL DEFAULT 'draft',

  -- Dates
  sent_at TIMESTAMPTZ,
  viewed_at TIMESTAMPTZ,
  accepted_at TIMESTAMPTZ,
  declined_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,

  -- Messaging
  cover_note TEXT,
  terms_and_conditions TEXT,

  -- Color selections
  color_inside_id UUID REFERENCES color_palette(id),
  color_outside_id UUID REFERENCES color_palette(id),
  color_lines_id UUID REFERENCES color_palette(id),

  -- Totals (computed from packages + selections)
  subtotal NUMERIC,
  discount_amount NUMERIC DEFAULT 0,
  total NUMERIC,

  -- PDF
  pdf_storage_path TEXT,

  -- Stripe
  stripe_invoice_id TEXT,

  -- Metadata
  internal_notes TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_quotes_share_token ON quotes(share_token);
CREATE INDEX idx_quotes_project ON quotes(project_id);
CREATE INDEX idx_quotes_customer ON quotes(customer_id);
CREATE INDEX idx_quotes_status ON quotes(status);
CREATE UNIQUE INDEX idx_quotes_project_version ON quotes(project_id, version);

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON quotes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
-- Migration: Create quote_packages table
-- Each quote presents up to 3 package tiers (Good / Better / Best).

CREATE TABLE quote_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Relationships
  quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,

  -- Package definition
  tier package_tier NOT NULL,
  name TEXT NOT NULL,
  description TEXT,

  -- Pricing (sum of its line items)
  subtotal NUMERIC NOT NULL DEFAULT 0,

  -- Display
  is_recommended BOOLEAN DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_quote_packages_quote ON quote_packages(quote_id);
CREATE UNIQUE INDEX idx_quote_packages_tier ON quote_packages(quote_id, tier);

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON quote_packages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
-- Migration: Create quote_line_items table
-- Individual items within each package tier.

CREATE TABLE quote_line_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Relationships
  package_id UUID NOT NULL REFERENCES quote_packages(id) ON DELETE CASCADE,
  service_id UUID REFERENCES services_catalog(id),

  -- Item details
  name TEXT NOT NULL,
  description TEXT,
  line_item_type line_item_type NOT NULL DEFAULT 'base_service',

  -- Pricing
  unit_of_measure unit_of_measure,
  quantity NUMERIC NOT NULL DEFAULT 1,
  unit_price NUMERIC NOT NULL,
  total_price NUMERIC NOT NULL,

  -- Add-on behavior
  is_optional BOOLEAN DEFAULT false,
  is_included_by_default BOOLEAN DEFAULT true,

  -- Display
  sort_order INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_line_items_package ON quote_line_items(package_id);

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON quote_line_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
-- Migration: Create quote_selections table
-- Records what the customer chose when they accepted a quote.

CREATE TABLE quote_selections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Relationships
  quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  selected_package_id UUID NOT NULL REFERENCES quote_packages(id),

  -- Optional line item toggles
  toggled_line_items JSONB NOT NULL DEFAULT '[]',

  -- Color selections at time of acceptance (snapshot)
  color_inside TEXT,
  color_outside TEXT,
  color_lines TEXT,

  -- Final price
  final_total NUMERIC NOT NULL,

  -- Customer info
  accepted_by_name TEXT,
  accepted_by_email TEXT,
  ip_address INET,
  user_agent TEXT,

  -- Timestamp
  accepted_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_selections_quote ON quote_selections(quote_id);
-- Migration: Create quote_activity_log table
-- Tracks every event on a quote for audit trail and analytics.

CREATE TABLE quote_activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,

  event_type TEXT NOT NULL,
  event_data JSONB DEFAULT '{}',

  ip_address INET,
  user_agent TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_activity_quote ON quote_activity_log(quote_id);
CREATE INDEX idx_activity_type ON quote_activity_log(event_type);
-- Migration: Add foreign key for accepted_quote_id on projects
-- Deferred because quotes table must exist first.

ALTER TABLE projects
  ADD CONSTRAINT fk_projects_accepted_quote
  FOREIGN KEY (accepted_quote_id) REFERENCES quotes(id);
-- Migration: Enable Row Level Security on all tables
-- Phase 1: Permissive policies (Patrick is the only admin user)

-- Enable RLS
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

-- Public read access for customer-facing quote pages
CREATE POLICY "Public can view quotes by share token" ON quotes
  FOR SELECT USING (true);

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

-- Admin full access (will tighten with auth later)
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
-- Migration: Seed services_catalog with initial pricing data
-- Patrick will adjust these prices — this is a starting point.

INSERT INTO services_catalog (name, description, category, unit_of_measure, base_price, line_item_type, is_add_on, sort_order) VALUES
  ('Court Resurfacing (Acrylic System)', 'Full acrylic resurfacing system application', 'surfacing', 'per_sqft', 0.85, 'base_service', false, 10),
  ('Crack Repair - Standard', 'Standard crack filling and repair', 'repair', 'per_linear_ft', 3.50, 'base_service', false, 20),
  ('Crack Repair - Structural (membrane)', 'Structural membrane crack repair system', 'repair', 'per_linear_ft', 8.00, 'base_service', false, 30),
  ('Bird Bath Leveling', 'Low spot leveling to eliminate standing water', 'repair', 'each', 150.00, 'base_service', false, 40),
  ('Pickleball Game Lines', 'Regulation pickleball court line striping', 'lines', 'per_court', 350.00, 'game_lines', false, 50),
  ('Tennis Game Lines', 'Regulation tennis court line striping', 'lines', 'per_court', 450.00, 'game_lines', false, 60),
  ('Basketball Lines (overlay)', 'Basketball court line overlay striping', 'lines', 'per_court', 250.00, 'game_lines', true, 70),
  ('Volleyball Lines (overlay)', 'Volleyball court line overlay striping', 'lines', 'per_court', 200.00, 'game_lines', true, 80),
  ('Net Post Installation', 'Professional net post installation', 'equipment', 'each', 275.00, 'add_on', true, 90),
  ('Pressure Washing', 'High-pressure surface cleaning and preparation', 'surfacing', 'per_sqft', 0.15, 'base_service', false, 100),
  ('Primer Application', 'Acrylic primer coat application', 'surfacing', 'per_sqft', 0.20, 'base_service', false, 110),
  ('Color Coating (per coat)', 'Acrylic color coating application per coat', 'surfacing', 'per_sqft', 0.35, 'color_application', false, 120);
-- Migration: Seed color_palette with common court colors
-- SportMaster is the primary manufacturer Patrick uses.
-- Hex codes are approximations for the UI preview.

INSERT INTO color_palette (name, hex_code, manufacturer, product_line, color_code, recommended_for, is_premium, premium_upcharge, sort_order) VALUES
  -- SportMaster Blues
  ('US Open Blue', '#1B4D8C', 'SportMaster', 'ColorPlus', 'SM-1024', '{inside,outside}', false, 0, 10),
  ('Light Blue', '#6BA3D6', 'SportMaster', 'ColorPlus', 'SM-1025', '{inside,outside}', false, 0, 20),
  ('Navy Blue', '#1A2744', 'SportMaster', 'ColorPlus', 'SM-1026', '{inside,outside}', false, 0, 30),

  -- SportMaster Greens
  ('Championship Green', '#2D5A27', 'SportMaster', 'ColorPlus', 'SM-2010', '{inside,outside}', false, 0, 40),
  ('Light Green', '#7CB342', 'SportMaster', 'ColorPlus', 'SM-2011', '{inside,outside}', false, 0, 50),
  ('Forest Green', '#1B3D1A', 'SportMaster', 'ColorPlus', 'SM-2012', '{inside,outside}', false, 0, 60),

  -- SportMaster Reds/Terracotta
  ('Red Clay', '#C1440E', 'SportMaster', 'ColorPlus', 'SM-3010', '{inside,outside}', false, 0, 70),
  ('Brick Red', '#8B2500', 'SportMaster', 'ColorPlus', 'SM-3011', '{inside,outside}', false, 0, 80),
  ('Sandstone', '#D2B48C', 'SportMaster', 'ColorPlus', 'SM-3012', '{inside,outside}', false, 0, 90),

  -- SportMaster Neutrals
  ('Cool Gray', '#8E8E8E', 'SportMaster', 'ColorPlus', 'SM-4010', '{inside,outside}', false, 0, 100),
  ('Dove Gray', '#B0B0B0', 'SportMaster', 'ColorPlus', 'SM-4011', '{inside,outside}', false, 0, 110),
  ('Charcoal', '#36454F', 'SportMaster', 'ColorPlus', 'SM-4012', '{inside,outside}', false, 0, 120),

  -- Line Colors
  ('White', '#FFFFFF', 'SportMaster', 'ColorPlus', 'SM-5001', '{lines}', false, 0, 130),
  ('Yellow', '#FFD700', 'SportMaster', 'ColorPlus', 'SM-5002', '{lines}', false, 0, 140),
  ('Black', '#1A1A1A', 'SportMaster', 'ColorPlus', 'SM-5003', '{lines}', false, 0, 150),
  ('Orange', '#FF6B00', 'SportMaster', 'ColorPlus', 'SM-5004', '{lines}', false, 0, 160),

  -- Premium Colors
  ('Tournament Purple', '#4A0082', 'SportMaster', 'ColorPlus Premium', 'SM-6001', '{inside,outside}', true, 0.05, 170),
  ('Sunset Orange', '#FF4500', 'SportMaster', 'ColorPlus Premium', 'SM-6002', '{inside,outside}', true, 0.05, 180);
