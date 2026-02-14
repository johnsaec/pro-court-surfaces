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
