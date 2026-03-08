-- Migration: Remove projects table, flatten project fields onto quotes
-- Run Steps 1-4 together in Supabase SQL Editor

-- Step 1: Add project-level columns to quotes
ALTER TABLE quotes
  ADD COLUMN IF NOT EXISTS project_type project_type,
  ADD COLUMN IF NOT EXISTS sports sport_type[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS address_line1 TEXT,
  ADD COLUMN IF NOT EXISTS city TEXT,
  ADD COLUMN IF NOT EXISTS state TEXT DEFAULT 'TX',
  ADD COLUMN IF NOT EXISTS zip TEXT,
  ADD COLUMN IF NOT EXISTS square_feet NUMERIC,
  ADD COLUMN IF NOT EXISTS number_of_courts INTEGER,
  ADD COLUMN IF NOT EXISTS court_age_years NUMERIC,
  ADD COLUMN IF NOT EXISTS cracks_present BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS crack_length_ft NUMERIC,
  ADD COLUMN IF NOT EXISTS bird_bath_count INTEGER,
  ADD COLUMN IF NOT EXISTS bird_bath_area_sqft NUMERIC;

-- Step 2: Migrate existing data from projects into quotes
UPDATE quotes q
SET
  project_type = p.project_type,
  sports = COALESCE(p.sports, '{}'),
  address_line1 = p.address_line1,
  city = p.city,
  state = p.state,
  zip = p.zip,
  square_feet = p.square_feet,
  number_of_courts = p.number_of_courts,
  court_age_years = p.court_age_years,
  cracks_present = COALESCE(p.cracks_present, false),
  crack_length_ft = p.crack_length_ft,
  bird_bath_count = p.bird_bath_count,
  bird_bath_area_sqft = p.bird_bath_area_sqft
FROM projects p
WHERE q.project_id = p.id;

-- Step 3: Drop project_id from quotes
DROP INDEX IF EXISTS idx_quotes_project_version;
DROP INDEX IF EXISTS idx_quotes_project;
ALTER TABLE quotes DROP COLUMN IF EXISTS project_id;

-- Step 4: Drop projects table
ALTER TABLE projects DROP CONSTRAINT IF EXISTS fk_projects_accepted_quote;
DROP POLICY IF EXISTS "Admin full access" ON projects;
DROP TABLE IF EXISTS projects;
