-- Migration: Quote document fields — configurable deposit %, structured conditions, signature toggle
--
-- deposit_percent : standard-branch deposit percentage (default 30). The deposit
--   invoice = deposit_percent% of the total; the balance invoice = the remaining
--   (100 - deposit_percent)%. Custom payment_schedule quotes ignore this.
-- conditions      : resolved clause snapshots [{section, title, body}] assembled by
--   scripts/quotes/clauses.mjs from the quote's facts. Snapshots (not codes) so an
--   issued quote is stable even if the clause config changes later.
-- show_signature  : when true, the PDF renders a physical Accepted-By signature block
--   (for GC-facing proposals that are signed rather than accepted online).
--
-- Apply via the Supabase dashboard SQL editor (CLI not linked).

ALTER TABLE quotes ADD COLUMN IF NOT EXISTS deposit_percent NUMERIC NOT NULL DEFAULT 30;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS conditions JSONB;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS show_signature BOOLEAN NOT NULL DEFAULT false;
