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
