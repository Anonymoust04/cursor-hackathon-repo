-- impl-06-qr.sql
-- Adds attendances table and optional job QR fields
create extension if not exists pgcrypto;

ALTER TABLE jobs
  ADD COLUMN IF NOT EXISTS qr_token text,
  ADD COLUMN IF NOT EXISTS qr_expires_at timestamptz;

CREATE TABLE IF NOT EXISTS attendances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  applicant_id uuid NOT NULL REFERENCES applicant_profiles(id) ON DELETE CASCADE,
  application_id uuid REFERENCES applications(id) ON DELETE SET NULL,
  scanned_at timestamptz NOT NULL DEFAULT now(),
  scanner_id uuid REFERENCES poster_profiles(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_attendances_job_applicant ON attendances(job_id, applicant_id);

-- Optional single-use token tracking
CREATE TABLE IF NOT EXISTS used_qr_tokens (
  jti text PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- End impl-06-qr.sql
