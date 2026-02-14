-- Migration: Seed color_palette with common court colors
-- SportMaster is the primary manufacturer Patrick uses.
-- Hex codes are approximations for the UI preview.

INSERT INTO color_palette (name, hex_code, manufacturer, product_line, color_code, recommended_for, is_premium, premium_upcharge, sort_order) VALUES
  -- SportMaster Blues
  ('US Open Blue', '#1B4D8C', 'SportMaster', 'ColorPlus', 'SM-1024', '{inside,outside}', false, 0, 10),
  ('Light Blue', '#6BA3D6', 'SportMaster', 'ColorPlus', 'SM-1025', '{inside,outside}', false, 0, 20),
  ('Navy Blue', '#1A2744', 'SportMaster', 'ColorPlus', 'SM-1026', '{inside,outside}', false, 0, 30),

  -- SportMaster Greens
  ('Championship Green', '#2D5A27', 'SportMaster', 'ColorPlus', 'SM-2010', '{inside,outside}', false, 0, 40),
  ('Light Green', '#7CB342', 'SportMaster', 'ColorPlus', 'SM-2011', '{inside,outside}', false, 0, 50),
  ('Forest Green', '#1B3D1A', 'SportMaster', 'ColorPlus', 'SM-2012', '{inside,outside}', false, 0, 60),

  -- SportMaster Reds/Terracotta
  ('Red Clay', '#C1440E', 'SportMaster', 'ColorPlus', 'SM-3010', '{inside,outside}', false, 0, 70),
  ('Brick Red', '#8B2500', 'SportMaster', 'ColorPlus', 'SM-3011', '{inside,outside}', false, 0, 80),
  ('Sandstone', '#D2B48C', 'SportMaster', 'ColorPlus', 'SM-3012', '{inside,outside}', false, 0, 90),

  -- SportMaster Neutrals
  ('Cool Gray', '#8E8E8E', 'SportMaster', 'ColorPlus', 'SM-4010', '{inside,outside}', false, 0, 100),
  ('Dove Gray', '#B0B0B0', 'SportMaster', 'ColorPlus', 'SM-4011', '{inside,outside}', false, 0, 110),
  ('Charcoal', '#36454F', 'SportMaster', 'ColorPlus', 'SM-4012', '{inside,outside}', false, 0, 120),

  -- Line Colors
  ('White', '#FFFFFF', 'SportMaster', 'ColorPlus', 'SM-5001', '{lines}', false, 0, 130),
  ('Yellow', '#FFD700', 'SportMaster', 'ColorPlus', 'SM-5002', '{lines}', false, 0, 140),
  ('Black', '#1A1A1A', 'SportMaster', 'ColorPlus', 'SM-5003', '{lines}', false, 0, 150),
  ('Orange', '#FF6B00', 'SportMaster', 'ColorPlus', 'SM-5004', '{lines}', false, 0, 160),

  -- Premium Colors
  ('Tournament Purple', '#4A0082', 'SportMaster', 'ColorPlus Premium', 'SM-6001', '{inside,outside}', true, 0.05, 170),
  ('Sunset Orange', '#FF4500', 'SportMaster', 'ColorPlus Premium', 'SM-6002', '{inside,outside}', true, 0.05, 180);
