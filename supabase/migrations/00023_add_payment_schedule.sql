-- Add payment_schedule JSONB column to quotes table
-- NULL = standard 50% deposit / 50% balance
-- Array of {label: string, amount: number} = custom payment milestones
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS payment_schedule JSONB DEFAULT NULL;
