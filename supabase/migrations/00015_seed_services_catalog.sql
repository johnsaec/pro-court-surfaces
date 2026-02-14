-- Migration: Seed services_catalog with initial pricing data
-- Patrick will adjust these prices — this is a starting point.

INSERT INTO services_catalog (name, description, category, unit_of_measure, base_price, line_item_type, is_add_on, sort_order) VALUES
  ('Court Resurfacing (Acrylic System)', 'Full acrylic resurfacing system application', 'surfacing', 'per_sqft', 0.85, 'base_service', false, 10),
  ('Crack Repair - Standard', 'Standard crack filling and repair', 'repair', 'per_linear_ft', 3.50, 'base_service', false, 20),
  ('Crack Repair - Structural (membrane)', 'Structural membrane crack repair system', 'repair', 'per_linear_ft', 8.00, 'base_service', false, 30),
  ('Bird Bath Leveling', 'Low spot leveling to eliminate standing water', 'repair', 'each', 150.00, 'base_service', false, 40),
  ('Pickleball Game Lines', 'Regulation pickleball court line striping', 'lines', 'per_court', 350.00, 'game_lines', false, 50),
  ('Tennis Game Lines', 'Regulation tennis court line striping', 'lines', 'per_court', 450.00, 'game_lines', false, 60),
  ('Basketball Lines (overlay)', 'Basketball court line overlay striping', 'lines', 'per_court', 250.00, 'game_lines', true, 70),
  ('Volleyball Lines (overlay)', 'Volleyball court line overlay striping', 'lines', 'per_court', 200.00, 'game_lines', true, 80),
  ('Net Post Installation', 'Professional net post installation', 'equipment', 'each', 275.00, 'add_on', true, 90),
  ('Pressure Washing', 'High-pressure surface cleaning and preparation', 'surfacing', 'per_sqft', 0.15, 'base_service', false, 100),
  ('Primer Application', 'Acrylic primer coat application', 'surfacing', 'per_sqft', 0.20, 'base_service', false, 110),
  ('Color Coating (per coat)', 'Acrylic color coating application per coat', 'surfacing', 'per_sqft', 0.35, 'color_application', false, 120);
