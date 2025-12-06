-- impl-07-messaging.sql
create extension if not exists pgcrypto;

CREATE TABLE IF NOT EXISTS threads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs(id) ON DELETE SET NULL,
  created_by uuid NOT NULL, -- Can be either applicant_profiles.id or poster_profiles.id
  created_by_type text NOT NULL CHECK (created_by_type IN ('applicant', 'poster')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS thread_participants (
  thread_id uuid REFERENCES threads(id) ON DELETE CASCADE,
  participant_id uuid NOT NULL, -- Can be either applicant_profiles.id or poster_profiles.id
  participant_type text NOT NULL CHECK (participant_type IN ('applicant', 'poster')),
  PRIMARY KEY (thread_id, participant_id, participant_type)
);

CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id uuid NOT NULL REFERENCES threads(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL, -- Can be either applicant_profiles.id or poster_profiles.id
  sender_type text NOT NULL CHECK (sender_type IN ('applicant', 'poster')),
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  read_at timestamptz
);

CREATE INDEX IF NOT EXISTS idx_messages_thread ON messages (thread_id, created_at);

CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL, -- Can be either applicant_profiles.id or poster_profiles.id
  user_type text NOT NULL CHECK (user_type IN ('applicant', 'poster')),
  type text NOT NULL,
  payload jsonb,
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications (user_id, user_type, read_at);

-- End impl-07-messaging.sql
