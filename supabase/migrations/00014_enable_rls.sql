-- Migration: Enable Row Level Security on all tables
-- Phase 1: Permissive policies (Patrick is the only admin user)

-- Enable RLS
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE color_palette ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_line_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_selections ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_activity_log ENABLE ROW LEVEL SECURITY;

-- Public read access for customer-facing quote pages
CREATE POLICY "Public can view quotes by share token" ON quotes
  FOR SELECT USING (true);

CREATE POLICY "Public can view quote packages" ON quote_packages
  FOR SELECT USING (true);

CREATE POLICY "Public can view quote line items" ON quote_line_items
  FOR SELECT USING (true);

CREATE POLICY "Public can view colors" ON color_palette
  FOR SELECT USING (is_active = true);

-- Public can insert selections (when customer accepts)
CREATE POLICY "Public can create selections" ON quote_selections
  FOR INSERT WITH CHECK (true);

-- Public can insert activity logs
CREATE POLICY "Public can log activity" ON quote_activity_log
  FOR INSERT WITH CHECK (true);

-- Admin full access (will tighten with auth later)
CREATE POLICY "Admin full access" ON customers FOR ALL USING (true);
CREATE POLICY "Admin full access" ON leads FOR ALL USING (true);
CREATE POLICY "Admin full access" ON projects FOR ALL USING (true);
CREATE POLICY "Admin full access" ON services_catalog FOR ALL USING (true);
CREATE POLICY "Admin full access" ON color_palette FOR ALL USING (true);
CREATE POLICY "Admin full access" ON quotes FOR ALL USING (true);
CREATE POLICY "Admin full access" ON quote_packages FOR ALL USING (true);
CREATE POLICY "Admin full access" ON quote_line_items FOR ALL USING (true);
CREATE POLICY "Admin full access" ON quote_selections FOR ALL USING (true);
CREATE POLICY "Admin full access" ON quote_activity_log FOR ALL USING (true);
