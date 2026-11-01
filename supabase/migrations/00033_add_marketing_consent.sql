-- Migration: Marketing email consent on leads
--
-- Set only when someone ticks the unchecked box on a website form. A false value
-- means no consent was given, so the lead must not be added to MailerLite.

ALTER TABLE leads
  ADD COLUMN marketing_opt_in BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN marketing_opt_in_at TIMESTAMPTZ,
  ADD COLUMN marketing_opt_in_source TEXT;

COMMENT ON COLUMN leads.marketing_opt_in IS 'True only if the lead ticked the marketing email box';
COMMENT ON COLUMN leads.marketing_opt_in_at IS 'When the box was ticked';
COMMENT ON COLUMN leads.marketing_opt_in_source IS 'Form that collected consent, e.g. homepage_contact';
