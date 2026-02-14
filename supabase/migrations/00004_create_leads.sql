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
