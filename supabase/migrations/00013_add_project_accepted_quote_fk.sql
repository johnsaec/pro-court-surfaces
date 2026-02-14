-- Migration: Add foreign key for accepted_quote_id on projects
-- Deferred because quotes table must exist first.

ALTER TABLE projects
  ADD CONSTRAINT fk_projects_accepted_quote
  FOREIGN KEY (accepted_quote_id) REFERENCES quotes(id);
