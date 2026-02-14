-- Migration: Replace color_palette with AT Sports Acrytech colors
-- Removes all SportMaster seed data and inserts Players Choice + Specialty lines.

DELETE FROM color_palette;

INSERT INTO color_palette (name, hex_code, manufacturer, product_line, recommended_for, is_premium, premium_upcharge, sort_order) VALUES
  -- Players Choice (standard pricing)
  ('Frost Blue',        '#A8C4E0', 'AT Sports Acrytech', 'Players Choice', '{inside,outside}', false, 0, 10),
  ('Light Blue',        '#1A3F8F', 'AT Sports Acrytech', 'Players Choice', '{inside,outside}', false, 0, 20),
  ('Irish Green',       '#00875A', 'AT Sports Acrytech', 'Players Choice', '{inside,outside}', false, 0, 30),
  ('Forest Green',      '#1C3A1C', 'AT Sports Acrytech', 'Players Choice', '{inside,outside}', false, 0, 40),
  ('Standard Orange',   '#C05A20', 'AT Sports Acrytech', 'Players Choice', '{inside,outside}', false, 0, 50),
  ('Standard Blue',     '#0A2463', 'AT Sports Acrytech', 'Players Choice', '{inside,outside}', false, 0, 60),
  ('Competition Blue',  '#0C1B6E', 'AT Sports Acrytech', 'Players Choice', '{inside,outside}', false, 0, 70),
  ('Competition Green', '#1B5E3A', 'AT Sports Acrytech', 'Players Choice', '{inside,outside}', false, 0, 80),
  ('Medium Green',      '#2D5A27', 'AT Sports Acrytech', 'Players Choice', '{inside,outside}', false, 0, 90),
  ('Beige',             '#B8A67A', 'AT Sports Acrytech', 'Players Choice', '{inside,outside}', false, 0, 100),
  ('Sandstone',         '#C4A76C', 'AT Sports Acrytech', 'Players Choice', '{inside,outside}', false, 0, 110),
  ('Terracotta',        '#A0522D', 'AT Sports Acrytech', 'Players Choice', '{inside,outside}', false, 0, 120),
  ('Classic Red',       '#7B1818', 'AT Sports Acrytech', 'Players Choice', '{inside,outside}', false, 0, 130),
  ('Black',             '#1A1A1A', 'AT Sports Acrytech', 'Players Choice', '{inside,outside,lines}', false, 0, 140),
  ('Gray',              '#808080', 'AT Sports Acrytech', 'Players Choice', '{inside,outside}', false, 0, 150),
  ('Slate',             '#5A6478', 'AT Sports Acrytech', 'Players Choice', '{inside,outside}', false, 0, 160),

  -- Specialty (premium pricing)
  ('Bright Orange',     '#FF6B1A', 'AT Sports Acrytech', 'Specialty', '{inside,outside}', true, 0.05, 200),
  ('Coral',             '#FF6B6B', 'AT Sports Acrytech', 'Specialty', '{inside,outside}', true, 0.05, 210),
  ('Pro Purple',        '#2E1A6E', 'AT Sports Acrytech', 'Specialty', '{inside,outside}', true, 0.05, 220),
  ('Crimson',           '#8B0030', 'AT Sports Acrytech', 'Specialty', '{inside,outside}', true, 0.05, 230),
  ('Kiwi',              '#4CAF50', 'AT Sports Acrytech', 'Specialty', '{inside,outside}', true, 0.05, 240),
  ('Passion Pink',      '#FF69B4', 'AT Sports Acrytech', 'Specialty', '{inside,outside}', true, 0.05, 250),
  ('Caribbean Blue',    '#0077B6', 'AT Sports Acrytech', 'Specialty', '{inside,outside}', true, 0.05, 260),
  ('Bright Yellow',     '#FFB800', 'AT Sports Acrytech', 'Specialty', '{inside,outside}', true, 0.05, 270),
  ('Ultra Violet',      '#5C2D91', 'AT Sports Acrytech', 'Specialty', '{inside,outside}', true, 0.05, 280),
  ('Bright Red',        '#CC0000', 'AT Sports Acrytech', 'Specialty', '{inside,outside}', true, 0.05, 290),
  ('Lime',              '#32CD32', 'AT Sports Acrytech', 'Specialty', '{inside,outside}', true, 0.05, 300),
  ('Sea Green',         '#00897B', 'AT Sports Acrytech', 'Specialty', '{inside,outside}', true, 0.05, 310),
  ('Sky Blue',          '#87CEEB', 'AT Sports Acrytech', 'Specialty', '{inside,outside}', true, 0.05, 320),
  ('Viva Violet',       '#7B2D8B', 'AT Sports Acrytech', 'Specialty', '{inside,outside}', true, 0.05, 330),
  ('Nautical Navy',     '#0A1628', 'AT Sports Acrytech', 'Specialty', '{inside,outside}', true, 0.05, 340);
