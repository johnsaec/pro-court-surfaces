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
