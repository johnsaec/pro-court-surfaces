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
