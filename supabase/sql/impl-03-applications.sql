-- impl-03-applications.sql
create extension if not exists pgcrypto;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'application_status') THEN
        CREATE TYPE application_status AS ENUM ('pending','accepted','rejected','verified','withdrawn');
    END IF;
END$$;

CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  applicant_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status application_status NOT NULL DEFAULT 'pending',
  hours_awarded int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  verified_at timestamptz
);

CREATE INDEX IF NOT EXISTS idx_applications_job ON applications (job_id);
CREATE INDEX IF NOT EXISTS idx_applications_applicant ON applications (applicant_id);

-- Trigger to prevent self-apply: posters cannot apply to their own job
CREATE OR REPLACE FUNCTION prevent_self_apply() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE
  poster uuid;
BEGIN
  SELECT poster_id INTO poster FROM jobs WHERE id = NEW.job_id;
  IF poster IS NULL THEN
    RAISE EXCEPTION 'Job not found';
  END IF;
  IF poster = NEW.applicant_id THEN
    RAISE EXCEPTION 'Self-application is not allowed';
  END IF;
  RETURN NEW;
END; $$;

DROP TRIGGER IF EXISTS trg_prevent_self_apply ON applications;
CREATE TRIGGER trg_prevent_self_apply
BEFORE INSERT ON applications
FOR EACH ROW EXECUTE FUNCTION prevent_self_apply();

-- Keep updated_at current
CREATE OR REPLACE FUNCTION touch_updated_at() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END; $$;

DROP TRIGGER IF EXISTS trg_touch_updated_at ON applications;
CREATE TRIGGER trg_touch_updated_at
BEFORE UPDATE ON applications
FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

-- End impl-03-applications.sql
