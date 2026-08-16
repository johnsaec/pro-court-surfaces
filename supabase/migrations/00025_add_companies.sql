-- Migration: Add companies (account) layer
-- A company is a business account (GC, builder, HOA, etc.) that can own many
-- contacts (customers). One company -> many contacts -> many quotes.
-- Quotes still attach to a contact (customer); the company is reached via the
-- contact's company_id. This leaves the existing quote/acceptance flow untouched.

-- Account type
CREATE TYPE company_type AS ENUM (
  'general_contractor',
  'builder',
  'property_manager',
  'hoa',
  'school',
  'municipality',
  'homeowner',
  'other'
);

CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Identity
  name TEXT NOT NULL,
  company_type company_type DEFAULT 'other',

  -- Contact
  email TEXT,            -- main / accounts-payable email
  phone TEXT,

  -- Location / billing address
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT,
  state TEXT DEFAULT 'TX',
  zip TEXT,

  -- External IDs (optional: invoice the company rather than the contact)
  stripe_customer_id TEXT UNIQUE,

  -- Metadata
  notes TEXT,
  tags TEXT[],

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_companies_name ON companies(name);

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON companies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Link contacts + leads to a company (nullable — a homeowner has no company).
-- ON DELETE SET NULL so deleting a company never destroys contact/lead history.
ALTER TABLE customers ADD COLUMN company_id UUID REFERENCES companies(id) ON DELETE SET NULL;
ALTER TABLE leads     ADD COLUMN company_id UUID REFERENCES companies(id) ON DELETE SET NULL;

CREATE INDEX idx_customers_company ON customers(company_id);
CREATE INDEX idx_leads_company ON leads(company_id);

-- RLS (mirror the permissive Phase-1 policy from 00014_enable_rls.sql)
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin full access" ON companies FOR ALL USING (true);
