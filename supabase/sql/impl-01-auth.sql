-- impl-01-auth.sql
-- Creates 'applicant_profiles' and 'poster_profiles' tables
create extension if not exists pgcrypto;

-- Applicant Profiles Table
CREATE TABLE IF NOT EXISTS applicant_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id uuid NOT NULL, -- Links to auth.users.id (Supabase Auth user ID)
  full_name text,
  avatar_url text,
  impact_hours int NOT NULL DEFAULT 0,
  characteristics jsonb, -- Store applicant characteristics (skills, interests, bio, etc.)
  projects_completed uuid[], -- Array of completed project/job IDs
  projects_ongoing uuid[], -- Array of ongoing project/job IDs (from applications with status 'accepted')
  projects_applied_to uuid[], -- Array of job IDs the applicant has applied to
  onboarding_completed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_applicant_profiles_created_at ON applicant_profiles (created_at);
CREATE INDEX IF NOT EXISTS idx_applicant_profiles_auth_user_id ON applicant_profiles (auth_user_id);

-- Poster Profiles Table (Organizations)
CREATE TABLE IF NOT EXISTS poster_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id uuid NOT NULL, -- Links to auth.users.id (Supabase Auth user ID)
  organization_name text NOT NULL,
  full_name text, -- Contact person name
  avatar_url text,
  organization_description text,
  organization_data jsonb, -- Additional organization info (website, social links, etc.)
  projects_completed uuid[], -- Array of completed job IDs
  projects_ongoing uuid[], -- Array of ongoing job IDs (jobs with status 'open')
  projects_inviting_applications uuid[], -- Array of job IDs currently accepting applications
  onboarding_completed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_poster_profiles_created_at ON poster_profiles (created_at);
CREATE INDEX IF NOT EXISTS idx_poster_profiles_org_name ON poster_profiles (organization_name);
CREATE INDEX IF NOT EXISTS idx_poster_profiles_auth_user_id ON poster_profiles (auth_user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION touch_updated_at() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END; $$;

-- Triggers to keep updated_at current
DROP TRIGGER IF EXISTS trg_applicant_profiles_updated_at ON applicant_profiles;
CREATE TRIGGER trg_applicant_profiles_updated_at
BEFORE UPDATE ON applicant_profiles
FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

DROP TRIGGER IF EXISTS trg_poster_profiles_updated_at ON poster_profiles;
CREATE TRIGGER trg_poster_profiles_updated_at
BEFORE UPDATE ON poster_profiles
FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

-- End impl-01-auth.sql
