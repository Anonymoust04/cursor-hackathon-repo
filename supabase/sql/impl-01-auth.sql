-- impl-01-auth.sql
-- Creates 'profiles' table and supporting types
create extension if not exists pgcrypto;

-- roles enum
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'profile_role') THEN
        CREATE TYPE profile_role AS ENUM ('applier','poster');
    END IF;
END$$;

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role profile_role NOT NULL,
  full_name text,
  avatar_url text,
  impact_hours int NOT NULL DEFAULT 0,
  onboarding_completed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles (role);

-- End impl-01-auth.sql
