-- impl-02-jobs.sql (Now renamed to projects)
-- Creates 'projects' table - stores all unique projects collated from both profile types
create extension if not exists pgcrypto;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'project_type') THEN
        CREATE TYPE project_type AS ENUM ('volunteer','paid');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'project_status') THEN
        CREATE TYPE project_status AS ENUM ('draft','open','ongoing','closed','completed');
    END IF;
END$$;

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  poster_id uuid NOT NULL REFERENCES poster_profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  location text,
  type project_type NOT NULL DEFAULT 'volunteer',
  cause_tags text[],
  status project_status NOT NULL DEFAULT 'open',
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
  -- Project state tracking columns
  is_completed boolean NOT NULL DEFAULT false,
  is_ongoing boolean NOT NULL DEFAULT false,
  is_accepting_applications boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Add comments for documentation
COMMENT ON COLUMN projects.company_name IS 'Name of the company/organization if different from the poster profile';
COMMENT ON COLUMN projects.company_description IS 'Description of the company/organization';
COMMENT ON COLUMN projects.time_commitment IS 'Expected time commitment (e.g., "5-10 hours / week")';
COMMENT ON COLUMN projects.application_deadline IS 'Date when applications close';
COMMENT ON COLUMN projects.requirements IS 'Markdown or text description of requirements';
COMMENT ON COLUMN projects.benefits IS 'Markdown or text description of what the volunteer gains';
COMMENT ON COLUMN projects.image_url IS 'URL for the opportunity cover image';
COMMENT ON COLUMN projects.is_completed IS 'Whether the project is completed';
COMMENT ON COLUMN projects.is_ongoing IS 'Whether the project is currently ongoing';
COMMENT ON COLUMN projects.is_accepting_applications IS 'Whether the project is currently accepting applications';

CREATE INDEX IF NOT EXISTS idx_projects_poster ON projects (poster_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects (status);
CREATE INDEX IF NOT EXISTS idx_projects_cause_tags ON projects USING gin (cause_tags);
CREATE INDEX IF NOT EXISTS idx_projects_is_completed ON projects (is_completed);
CREATE INDEX IF NOT EXISTS idx_projects_is_ongoing ON projects (is_ongoing);
CREATE INDEX IF NOT EXISTS idx_projects_is_accepting_applications ON projects (is_accepting_applications);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION touch_updated_at() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END; $$;

-- Trigger to keep updated_at current
DROP TRIGGER IF EXISTS trg_projects_updated_at ON projects;
CREATE TRIGGER trg_projects_updated_at
BEFORE UPDATE ON projects
FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

-- End impl-02-jobs.sql
