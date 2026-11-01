-- Migration: Create jobs + job_payments (what's owed on each closed job)
--
-- A job is a closed deal, whether it came from an accepted quote or was closed
-- outside the quote system. The balance is always calculated from the rows below
-- (view: job_balances), never typed in. QuickBooks remains the official books.

CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  job_name TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  status TEXT NOT NULL DEFAULT 'open'
    CHECK (status IN ('open', 'complete', 'paid_in_full', 'cancelled')),

  contract_amount NUMERIC(12,2) NOT NULL CHECK (contract_amount >= 0),
  closed_on DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,

  -- Links out (all optional). One job per quote.
  quote_id UUID UNIQUE REFERENCES quotes(id) ON DELETE SET NULL,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  qb_customer_id TEXT,               -- QuickBooks customer/Project ID

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_jobs_status ON jobs(status);

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TABLE job_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,

  -- payment:      money received (positive)
  -- refund:       money returned (positive; subtracted from payments)
  -- change_order: changes what's owed (negative for a credit)
  kind TEXT NOT NULL DEFAULT 'payment'
    CHECK (kind IN ('payment', 'refund', 'change_order')),
  amount NUMERIC(12,2) NOT NULL,
  method TEXT CHECK (method IN ('stripe', 'check', 'zelle', 'cash', 'ach', 'other')),
  entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
  note TEXT,
  stripe_invoice_id TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  CHECK (kind = 'change_order' OR amount > 0)
);

CREATE INDEX idx_job_payments_job ON job_payments(job_id);

-- Stripe can deliver an event more than once: one payment row per paid invoice.
CREATE UNIQUE INDEX idx_job_payments_stripe_invoice
  ON job_payments(stripe_invoice_id)
  WHERE stripe_invoice_id IS NOT NULL AND kind = 'payment';

CREATE VIEW job_balances WITH (security_invoker = true) AS
SELECT
  j.id,
  j.job_name,
  j.customer_name,
  j.customer_email,
  j.status,
  j.closed_on,
  j.contract_amount,
  COALESCE(SUM(p.amount) FILTER (WHERE p.kind = 'change_order'), 0) AS change_orders,
  COALESCE(SUM(p.amount) FILTER (WHERE p.kind = 'payment'), 0)
    - COALESCE(SUM(p.amount) FILTER (WHERE p.kind = 'refund'), 0) AS paid,
  j.contract_amount
    + COALESCE(SUM(p.amount) FILTER (WHERE p.kind = 'change_order'), 0)
    - COALESCE(SUM(p.amount) FILTER (WHERE p.kind = 'payment'), 0)
    + COALESCE(SUM(p.amount) FILTER (WHERE p.kind = 'refund'), 0) AS balance
FROM jobs j
LEFT JOIN job_payments p ON p.job_id = j.id
GROUP BY j.id;

-- RLS on with no policies: only the service role (server code + scripts) can reach
-- these. The browser's public key gets nothing.
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_payments ENABLE ROW LEVEL SECURITY;
