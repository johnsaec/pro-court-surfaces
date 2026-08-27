-- Migration: Add two premium prep/repair services used to differentiate quote tiers
--   * Full Strip to Concrete  — grind/remove existing surface down to bare concrete
--   * ATS Faultline Glue-and-Roll Repair Kit — premium crack repair system
-- Client price for the ATS kit is $9/linear ft (cost basis ~$2.08/lf: $625 per 300 ft mat).

INSERT INTO services_catalog (name, description, category, unit_of_measure, base_price, line_item_type, is_add_on, sort_order) VALUES
  ('Full Strip to Concrete', 'Grind and remove existing acrylic/coating system down to bare concrete', 'surfacing', 'per_sqft', 1.75, 'base_service', false, 15),
  ('ATS Faultline Glue-and-Roll Repair Kit', 'ATS Sports Faultline glue-and-roll structural crack repair system', 'repair', 'per_linear_ft', 9.00, 'base_service', false, 25);
