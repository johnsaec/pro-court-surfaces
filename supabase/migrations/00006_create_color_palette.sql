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
