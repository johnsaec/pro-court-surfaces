-- Migration: Create portfolio_projects table (website case studies)
--
-- This is NOT the old `projects` table (dropped in 00022, its fields flattened
-- onto `quotes`). This is the *marketing portfolio*: published case studies that
-- power /projects and /projects/[slug]. It replaces the hard-coded array in
-- src/lib/projects.ts as the source of truth.
--
-- Photos live in the Supabase Storage bucket `project-photos` (public read);
-- the *_src columns hold the public URLs to objects in that bucket.

CREATE TABLE portfolio_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- URL + card identity
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  location TEXT NOT NULL,            -- "City, TX"
  court_type TEXT NOT NULL,          -- "Multi-Sport Court", "Pickleball Court", …
  service TEXT NOT NULL,             -- "Full Resurface", "Tennis-to-Pickleball Conversion"
  category TEXT NOT NULL,            -- card/hero eyebrow
  summary TEXT NOT NULL,             -- one-line card + subtitle

  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  keywords TEXT,

  -- Imagery (public URLs into the project-photos bucket)
  hero_src TEXT NOT NULL,
  hero_alt TEXT NOT NULL,
  before_src TEXT NOT NULL,
  before_alt TEXT NOT NULL,
  after_src TEXT NOT NULL,
  after_alt TEXT NOT NULL,
  gallery JSONB NOT NULL DEFAULT '[]',   -- [{ src, alt }]

  -- Structured content
  facts JSONB NOT NULL DEFAULT '[]',     -- [{ label, value }]
  colors TEXT[] NOT NULL DEFAULT '{}',   -- ["Blue", "Green", "White lines"]
  body TEXT[] NOT NULL DEFAULT '{}',     -- story paragraphs
  testimonial JSONB,                     -- { quote, attribution } | null

  -- Optional link back to the CRM job this case study came from
  quote_id UUID REFERENCES quotes(id) ON DELETE SET NULL,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,

  -- Publishing
  is_published BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_portfolio_projects_published ON portfolio_projects(is_published, sort_order);

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON portfolio_projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS: admin full access; public can read only published rows.
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin full access" ON portfolio_projects
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public read published" ON portfolio_projects
  FOR SELECT USING (is_published = true);
