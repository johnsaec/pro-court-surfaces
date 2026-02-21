-- Insert lead: Tuan Nguyen
INSERT INTO leads (
  first_name, last_name, display_name, email, phone,
  address_line1, city, state, zip,
  deal_stage, project_type, sports
) VALUES (
  'Tuan', 'Nguyen', 'Tuan Nguyen', 'rin2602@gmail.com', '512-909-1939',
  '209 Sutton Place', 'Georgetown', 'TX', '78628',
  'proposal_sent', 'pickleball_court', ARRAY['pickleball']
);

-- Create project for Tuan
INSERT INTO projects (
  customer_id, name, address_line1, city, state, zip,
  project_type, sports, number_of_courts
) VALUES (
  NULL, 'Nguyen Pickleball Court', '209 Sutton Place', 'Georgetown', 'TX', '78628',
  'pickleball_court', ARRAY['pickleball'], 1
);

-- Create quote linked to lead and project, with colors
-- Colors: Inside=Sandstone, Outside=Slate, NVZ=Competition Blue, Lines=White
INSERT INTO quotes (
  lead_id, project_id,
  color_inside_id, color_outside_id, color_nvz_id, color_lines_id,
  subtotal, total, status, deposit_due_days
) VALUES (
  (SELECT id FROM leads WHERE email = 'rin2602@gmail.com' ORDER BY created_at DESC LIMIT 1),
  (SELECT id FROM projects WHERE name = 'Nguyen Pickleball Court' ORDER BY created_at DESC LIMIT 1),
  (SELECT id FROM color_palette WHERE name = 'Sandstone' LIMIT 1),
  (SELECT id FROM color_palette WHERE name = 'Slate' LIMIT 1),
  (SELECT id FROM color_palette WHERE name = 'Competition Blue' LIMIT 1),
  (SELECT id FROM color_palette WHERE name = 'White' LIMIT 1),
  5700, 5700, 'draft', 7
);

-- Create single package (Good tier)
INSERT INTO quote_packages (
  quote_id, tier, name, description, subtotal, is_recommended, sort_order
) VALUES (
  (SELECT id FROM quotes WHERE lead_id = (SELECT id FROM leads WHERE email = 'rin2602@gmail.com' ORDER BY created_at DESC LIMIT 1) ORDER BY created_at DESC LIMIT 1),
  'good', 'Good Package', NULL, 5700, true, 0
);

-- Insert line items
INSERT INTO quote_line_items (package_id, name, description, line_item_type, unit_of_measure, quantity, unit_price, total_price, is_optional, is_included_by_default, sort_order)
VALUES
  (
    (SELECT id FROM quote_packages WHERE quote_id = (SELECT id FROM quotes WHERE lead_id = (SELECT id FROM leads WHERE email = 'rin2602@gmail.com' ORDER BY created_at DESC LIMIT 1) ORDER BY created_at DESC LIMIT 1) LIMIT 1),
    'Concrete Prep', NULL, 'base_service', 'flat_rate', 1, 1000, 1000, false, true, 0
  ),
  (
    (SELECT id FROM quote_packages WHERE quote_id = (SELECT id FROM quotes WHERE lead_id = (SELECT id FROM leads WHERE email = 'rin2602@gmail.com' ORDER BY created_at DESC LIMIT 1) ORDER BY created_at DESC LIMIT 1) LIMIT 1),
    '2 Coat Acrylic Paint System', NULL, 'base_service', 'flat_rate', 1, 4700, 4700, false, true, 1
  ),
  (
    (SELECT id FROM quote_packages WHERE quote_id = (SELECT id FROM quotes WHERE lead_id = (SELECT id FROM leads WHERE email = 'rin2602@gmail.com' ORDER BY created_at DESC LIMIT 1) ORDER BY created_at DESC LIMIT 1) LIMIT 1),
    'Warranty', NULL, 'base_service', 'flat_rate', 1, 0, 0, false, true, 2
  );
