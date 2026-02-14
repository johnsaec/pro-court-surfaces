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
