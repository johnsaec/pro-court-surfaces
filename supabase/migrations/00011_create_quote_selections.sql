-- Migration: Create quote_selections table
-- Records what the customer chose when they accepted a quote.

CREATE TABLE quote_selections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Relationships
  quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  selected_package_id UUID NOT NULL REFERENCES quote_packages(id),

  -- Optional line item toggles
  toggled_line_items JSONB NOT NULL DEFAULT '[]',

  -- Color selections at time of acceptance (snapshot)
  color_inside TEXT,
  color_outside TEXT,
  color_lines TEXT,

  -- Final price
  final_total NUMERIC NOT NULL,

  -- Customer info
  accepted_by_name TEXT,
  accepted_by_email TEXT,
  ip_address INET,
  user_agent TEXT,

  -- Timestamp
  accepted_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_selections_quote ON quote_selections(quote_id);
