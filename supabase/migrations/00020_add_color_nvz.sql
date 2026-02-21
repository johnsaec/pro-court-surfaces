-- Add NVZ (Non-Volley Zone / Kitchen) color to quotes
ALTER TABLE quotes
  ADD COLUMN color_nvz_id UUID REFERENCES color_palette(id) ON DELETE SET NULL;

-- Add NVZ color snapshot to quote_selections
ALTER TABLE quote_selections
  ADD COLUMN color_nvz TEXT;

-- Add NVZ color preference to leads
ALTER TABLE leads
  ADD COLUMN color_nvz TEXT;
