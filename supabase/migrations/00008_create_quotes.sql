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
