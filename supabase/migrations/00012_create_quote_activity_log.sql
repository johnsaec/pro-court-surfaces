-- Migration: Create quote_activity_log table
-- Tracks every event on a quote for audit trail and analytics.

CREATE TABLE quote_activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,

  event_type TEXT NOT NULL,
  event_data JSONB DEFAULT '{}',

  ip_address INET,
  user_agent TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_activity_quote ON quote_activity_log(quote_id);
CREATE INDEX idx_activity_type ON quote_activity_log(event_type);
