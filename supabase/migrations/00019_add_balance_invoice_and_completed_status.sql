-- Add column for the second (balance) Stripe invoice
ALTER TABLE quotes ADD COLUMN stripe_balance_invoice_id TEXT;

-- Add 'completed' status for when full balance is paid
ALTER TYPE quote_status ADD VALUE 'completed';
