-- impl-02-jobs.sql
create extension if not exists pgcrypto;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'job_type') THEN
        CREATE TYPE job_type AS ENUM ('volunteer','paid');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'job_status') THEN
        CREATE TYPE job_status AS ENUM ('open','closed','completed');
    END IF;
END$$;

CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  poster_id uuid NOT NULL REFERENCES poster_profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  location text,
  type job_type NOT NULL DEFAULT 'volunteer',
  cause_tags text[],
  status job_status NOT NULL DEFAULT 'open',
  compensation_amount numeric,
  start_time timestamptz,
  end_time timestamptz,
  company_name text,
  company_description text,
  time_commitment text,
  application_deadline timestamptz,
  requirements text,
  benefits text,
  image_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Add comments for documentation
COMMENT ON COLUMN jobs.company_name IS 'Name of the company/organization if different from the poster profile';
COMMENT ON COLUMN jobs.company_description IS 'Description of the company/organization';
COMMENT ON COLUMN jobs.time_commitment IS 'Expected time commitment (e.g., "5-10 hours / week")';
COMMENT ON COLUMN jobs.application_deadline IS 'Date when applications close';
COMMENT ON COLUMN jobs.requirements IS 'Markdown or text description of requirements';
COMMENT ON COLUMN jobs.benefits IS 'Markdown or text description of what the volunteer gains';
COMMENT ON COLUMN jobs.image_url IS 'URL for the opportunity cover image';

CREATE INDEX IF NOT EXISTS idx_jobs_poster ON jobs (poster_id);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs (status);
CREATE INDEX IF NOT EXISTS idx_jobs_cause_tags ON jobs USING gin (cause_tags);

-- End impl-02-jobs.sql
