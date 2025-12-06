# Impl 01 — Auth & Onboarding

## Summary
- This implementation provides a production-ready authentication system using Supabase Auth.
- It replaces the previous "dev-only" secret mechanism with secure email/password authentication.

## Goals
- Secure user authentication using Supabase Auth (Email/Password).
- Automatic profile creation upon signup.
- Persistent sessions managed by Supabase client.
- Integration with Next.js App Router.

## Implementation Stages (Detailed)

### Stage A — Supabase Configuration
- **File**: `lib/supabase.ts`
- **Purpose**: Initialize the Supabase client for server-side usage.
- **Env Vars**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

### Stage B — Signup API Route (`POST /api/signup`)
- **Input**: `{ email, password, fullName, role }`.
- **Behavior**:
    1.  Calls `supabase.auth.signUp({ email, password })`.
    2.  If successful, inserts a row into the `profiles` table with `id` (from auth), `full_name`, and `role`.
    3.  Returns the user object or error.
- **Database**: Relies on `profiles` table created via `supabase/sql/impl-01-auth.sql`.

### Stage C — Login API Route (`POST /api/login`)
- **Input**: `{ email, password }`.
- **Behavior**:
    1.  Calls `supabase.auth.signInWithPassword({ email, password })`.
    2.  Returns the session object or error.

### Stage D — Frontend Integration
- **Login Page** (`app/login/page.tsx`):
    - Form submits to `/api/login`.
    - Handles success (redirect) and error states.
    - Enforces light mode design.
- **Signup Page** (`app/signup/page.tsx`):
    - Form submits to `/api/signup`.
    - Includes fields for `fullName`, `email`, `password`, `confirmPassword`, and `role`.
    - Enforces light mode design.

### Stage E — Middleware & Route Protection (Future)
- Implement `middleware.ts` to protect routes (e.g., `/dashboard`) by checking for active Supabase sessions.

## Security Notes
- Passwords are never stored in plain text; Supabase handles hashing and storage.
- `profiles` table is linked to `auth.users` via `id`.
- Environment variables must be set in `.env.local`.

## Acceptance Criteria
- [x] `POST /api/signup` creates a new Auth user and Profile row.
- [x] `POST /api/login` successfully authenticates a user.
- [x] Frontend forms correctly interact with API endpoints.
- [x] UI enforces light mode and specific color palette.

## Related Files
- `lib/supabase.ts`
- `app/api/login/route.ts`
- `app/api/signup/route.ts`
- `app/login/page.tsx`
- `app/signup/page.tsx`
- `supabase/sql/impl-01-auth.sql`

