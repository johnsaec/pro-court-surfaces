-- Migration: Granular rate-card services + stable `code` slug on services_catalog
--
-- Adds a stable, human-readable `code` (natural key) to services_catalog so the
-- quote-build tooling (scripts/quotes/systems.mjs + quote-build.mjs) can reference
-- catalog services independently of their display `name` (which is rendered on the
-- customer PDF and will be edited for wording). Backfills the 14 existing rows, then
-- seeds the granular per-step surfacing services used by the system templates.
--
-- Apply via the Supabase dashboard SQL editor (CLI not linked).

-- ── Part A: add + backfill `code` ───────────────────────────────────────
ALTER TABLE services_catalog ADD COLUMN IF NOT EXISTS code TEXT;

UPDATE services_catalog SET code = 'court-resurfacing-acrylic' WHERE name = 'Court Resurfacing (Acrylic System)';
UPDATE services_catalog SET code = 'full-strip-to-concrete'    WHERE name = 'Full Strip to Concrete';
UPDATE services_catalog SET code = 'crack-repair-standard'     WHERE name = 'Crack Repair - Standard';
UPDATE services_catalog SET code = 'ats-faultline-repair'      WHERE name = 'ATS Faultline Glue-and-Roll Repair Kit';
UPDATE services_catalog SET code = 'crack-repair-structural'   WHERE name = 'Crack Repair - Structural (membrane)';
UPDATE services_catalog SET code = 'bird-bath-leveling'        WHERE name = 'Bird Bath Leveling';
UPDATE services_catalog SET code = 'pickleball-lines'          WHERE name = 'Pickleball Game Lines';
UPDATE services_catalog SET code = 'tennis-lines'             WHERE name = 'Tennis Game Lines';
UPDATE services_catalog SET code = 'basketball-lines'         WHERE name = 'Basketball Lines (overlay)';
UPDATE services_catalog SET code = 'volleyball-lines'         WHERE name = 'Volleyball Lines (overlay)';
UPDATE services_catalog SET code = 'net-post-install'         WHERE name = 'Net Post Installation';
UPDATE services_catalog SET code = 'pressure-washing'        WHERE name = 'Pressure Washing';
UPDATE services_catalog SET code = 'primer-application'      WHERE name = 'Primer Application';
UPDATE services_catalog SET code = 'color-coating-per-coat'  WHERE name = 'Color Coating (per coat)';

-- Guard: every existing row must have a code before we enforce uniqueness.
-- If this raises, a display name drifted — reconcile the UPDATE above before continuing.
DO $$
DECLARE missing INT;
BEGIN
  SELECT count(*) INTO missing FROM services_catalog WHERE code IS NULL;
  IF missing > 0 THEN
    RAISE EXCEPTION 'services_catalog has % row(s) with NULL code — reconcile name-keyed backfill before adding the unique constraint', missing;
  END IF;
END $$;

ALTER TABLE services_catalog ADD CONSTRAINT services_catalog_code_key UNIQUE (code);

-- ── Part B: granular per-step surfacing services ────────────────────────
-- Prices captured from the live quoting rate card. Editable in-app going forward;
-- the system templates reference these by `code` and pull the current base_price.
INSERT INTO services_catalog (name, description, category, unit_of_measure, base_price, line_item_type, is_add_on, sort_order, code) VALUES
  ('Diamond Grind Prep', 'Full diamond grind of the slab to open the surface profile (CSP), remove laitance/curing compounds, and create mechanical tooth for coating adhesion.', 'surfacing', 'per_sqft', 1.00, 'base_service', false, 200, 'diamond-grind'),
  ('Smooth-Pad Prep (No Grind)', 'Requires a smooth, hard-troweled slab. Wash, degrease, and prep the finished pad — no grind (used under cushioned systems).', 'surfacing', 'per_sqft', 0.00, 'base_service', false, 205, 'smooth-pad-prep-no-grind'),
  ('Adhesion Promoter', 'Roll-applied acrylic bonding primer to lock the surfacing system to new concrete.', 'surfacing', 'per_sqft', 0.40, 'base_service', false, 210, 'adhesion-promoter'),
  ('Black Acrylic Resurfacer (Laykold)', 'Squeegee coat of black Laykold acrylic resurfacer (sand-filled) to build the base layer and fill surface texture.', 'surfacing', 'per_sqft', 1.00, 'base_service', false, 215, 'acrylic-resurfacer-black'),
  ('Laykold Color Coats (2 layers)', 'Two color layers of Laykold 100% acrylic, sand-loaded surfacing in the selected court colors.', 'surfacing', 'per_sqft', 2.00, 'color_application', false, 220, 'laykold-color-coats-2'),
  ('Cushion X Base System', 'Multiple squeegee coats of the Cushion X rubberized cushion system, built up for uniform shock absorption.', 'surfacing', 'per_sqft', 4.00, 'base_service', false, 225, 'cushion-x-base'),
  ('Acrylic Color Coats', 'Two coats of 100% acrylic, sand-loaded color surfacing in the selected court colors.', 'surfacing', 'per_sqft', 2.10, 'color_application', false, 230, 'acrylic-color-coats'),
  ('Pickleball Striping', 'Layout and paint regulation pickleball lines (2" textured white), including the non-volley zone (kitchen).', 'lines', 'per_sqft', 0.50, 'game_lines', false, 235, 'pickleball-striping');
