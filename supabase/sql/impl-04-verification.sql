-- impl-04-verification.sql
-- Adds verification fields and ensures profiles.impact_hours default

ALTER TABLE applications
  ADD COLUMN IF NOT EXISTS verified_at timestamptz,
  ADD COLUMN IF NOT EXISTS hours_awarded int NOT NULL DEFAULT 0;

ALTER TABLE profiles
  ALTER COLUMN impact_hours SET DEFAULT 0;

-- Optionally add an index on verified_at for reporting
CREATE INDEX IF NOT EXISTS idx_applications_verified_at ON applications (verified_at);

-- End impl-04-verification.sql
