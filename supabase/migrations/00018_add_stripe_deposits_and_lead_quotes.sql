-- Migration: Add Stripe deposit flow + lead-based quotes
-- (1) Allow quotes to target leads (not just customers)
-- (2) Support 50% deposit invoicing via Stripe

-- New enum values
ALTER TYPE quote_status ADD VALUE 'deposit_paid';
ALTER TYPE deal_stage ADD VALUE 'converted';

-- Quotes: add lead support + deposit config + acceptance info
ALTER TABLE quotes
  ADD COLUMN lead_id UUID REFERENCES leads(id),
  ADD COLUMN deposit_due_days INTEGER DEFAULT 7,
  ADD COLUMN accepted_by_name TEXT,
  ADD COLUMN accepted_by_email TEXT;

-- Make customer_id nullable (lead-based quotes won't have one initially)
ALTER TABLE quotes ALTER COLUMN customer_id DROP NOT NULL;

-- Must have either a lead or a customer
ALTER TABLE quotes ADD CONSTRAINT chk_quotes_lead_or_customer
  CHECK (lead_id IS NOT NULL OR customer_id IS NOT NULL);

-- Projects: make customer_id nullable (lead-based projects)
ALTER TABLE projects ALTER COLUMN customer_id DROP NOT NULL;

-- Leads: add address fields for customer conversion
ALTER TABLE leads
  ADD COLUMN address_line1 TEXT,
  ADD COLUMN state TEXT DEFAULT 'TX',
  ADD COLUMN zip TEXT;

-- Index for lead-based quote lookups
CREATE INDEX idx_quotes_lead ON quotes(lead_id);
