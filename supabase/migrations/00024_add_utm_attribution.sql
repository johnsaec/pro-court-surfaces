-- Migration: Add UTM attribution columns to leads table
-- Supports first-touch and last-touch attribution for paid ads tracking

-- First-touch attribution (set once when lead is created)
ALTER TABLE leads ADD COLUMN IF NOT EXISTS ft_source TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS ft_medium TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS ft_campaign TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS ft_content TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS ft_term TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS ft_channel TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS ft_referrer TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS ft_landing_page TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS ft_click_id TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS ft_click_id_type TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS ft_timestamp TIMESTAMPTZ;

-- Last-touch attribution (most recent source before conversion)
ALTER TABLE leads ADD COLUMN IF NOT EXISTS lt_source TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS lt_medium TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS lt_campaign TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS lt_content TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS lt_term TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS lt_channel TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS lt_referrer TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS lt_landing_page TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS lt_click_id TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS lt_click_id_type TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS lt_timestamp TIMESTAMPTZ;

-- Indexes for reporting queries
CREATE INDEX IF NOT EXISTS idx_leads_ft_channel ON leads(ft_channel);
CREATE INDEX IF NOT EXISTS idx_leads_lt_channel ON leads(lt_channel);
CREATE INDEX IF NOT EXISTS idx_leads_ft_source ON leads(ft_source);
CREATE INDEX IF NOT EXISTS idx_leads_lt_source ON leads(lt_source);
