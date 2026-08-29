-- Add "talking" deal stage (staying-in-touch / slow follow-up nurture bucket).
-- Mirrors the "Talking" option added to the Notion pipeline board.
-- Placed before 'cold' so it sorts to the front of the pipeline.
ALTER TYPE deal_stage ADD VALUE IF NOT EXISTS 'talking' BEFORE 'cold';
