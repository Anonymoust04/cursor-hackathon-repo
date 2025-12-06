-- impl-04-verification.sql
-- Adds verification fields and ensures applicant_profiles.impact_hours default
-- Note: verified_at and hours_awarded are already in applications table from impl-03
-- This migration ensures they exist and adds index

ALTER TABLE applications
  ADD COLUMN IF NOT EXISTS verified_at timestamptz,
  ADD COLUMN IF NOT EXISTS hours_awarded int NOT NULL DEFAULT 0;

ALTER TABLE applicant_profiles
  ALTER COLUMN impact_hours SET DEFAULT 0;

-- Optionally add an index on verified_at for reporting
CREATE INDEX IF NOT EXISTS idx_applications_verified_at ON applications (verified_at);

-- End impl-04-verification.sql
