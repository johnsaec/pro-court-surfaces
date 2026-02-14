-- Migration: Create all enum types
-- These must exist before any tables reference them

-- Deal/lead lifecycle
CREATE TYPE deal_stage AS ENUM (
  'cold',
  'new_lead',
  'qualified_lead',
  'proposal_stage',
  'proposal_sent',
  'buyer_interested',
  'won',
  'lost'
);

-- How the lead found us
CREATE TYPE lead_source AS ENUM (
  'inbound',
  'outbound',
  'referral',
  'event',
  'partner',
  'website',
  'linkedin',
  'ai_search',
  'permit_mining',
  'other'
);

-- What kind of court project
CREATE TYPE project_type AS ENUM (
  'new_court_full_build',
  'new_court_surfacing_only',
  'repair_resurfacing',
  'conversion_tennis_to_pickleball',
  'color_coating_only',
  'crack_repair_only',
  'other'
);

-- Sports the court supports
CREATE TYPE sport_type AS ENUM (
  'pickleball',
  'tennis',
  'basketball',
  'volleyball',
  'multi_sport'
);

-- Quote status lifecycle
CREATE TYPE quote_status AS ENUM (
  'draft',
  'sent',
  'viewed',
  'accepted',
  'declined',
  'expired',
  'revised'
);

-- Quote line item type
CREATE TYPE line_item_type AS ENUM (
  'base_service',
  'add_on',
  'material',
  'color_application',
  'game_lines',
  'discount',
  'other'
);

-- Package tier
CREATE TYPE package_tier AS ENUM (
  'good',
  'better',
  'best'
);

-- Unit of measure for services
CREATE TYPE unit_of_measure AS ENUM (
  'per_sqft',
  'per_linear_ft',
  'per_court',
  'flat_rate',
  'per_hour',
  'each'
);
