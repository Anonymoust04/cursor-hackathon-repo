# Impl 01 — Auth & Onboarding


Summary
- This implementation provides a minimal developer-only authentication system for local/intern testing and onboarding. It is NOT intended for production.

Goals
- Fast developer login using a single secret (`DEV_AUTH_SECRET`).
- Persistent session stored in a signed, HttpOnly cookie (`sid`).
- A small set of helpers in `lib/auth.ts` to keep controllers thin and testable.
- Onboarding flow that upserts a `profiles` row and records `onboarding_completed`.

Implementation stages (detailed)

Stage A — Auth primitives and signing
- Create `lib/auth.ts` with: `signSession(payload)`, `verifySession(token)`, `setSessionCookie(res, payload)`, `clearSessionCookie(res)`.
- Signing: use HMAC (e.g., `crypto.createHmac('sha256', COOKIE_SIGNING_SECRET')`) or `jose` to produce compact tokens. Include `iat` and `exp` based on `DEV_SESSION_TTL`.
- Keep token payload minimal: `{ userId: uuid, iat }`.
- Tests: unit tests for sign/verify and cookie creation/parse.

Stage B — Login API route (`POST /api/auth/login`)
- Input: `{ secret, displayName, role }`.
- Guard: return 401 if `secret !== process.env.DEV_AUTH_SECRET`.
- Behavior:
	- Create a `userId` server-side if not provided (uuidv4).
	- Upsert `profiles` row using `db.upsertProfile(userId, { full_name: displayName, role })`.
	- Call `setSessionCookie(res, { userId, iat })` to set signed HttpOnly cookie `sid` with proper `Max-Age` and `SameSite=Lax`.
	- Return 200 with minimal profile info.
- Error cases: missing fields (400), invalid secret (401), DB failure (500).
- Acceptance: After login, `GET /api/auth/me` (Stage C) returns the upserted profile.

Stage C — Session introspection (`GET /api/auth/me`) and logout
- `GET /api/auth/me`: reads `sid` cookie, verifies via `verifySession`, looks up `profiles` row and returns user object.
- `POST /api/auth/logout`: clears cookie using `clearSessionCookie` and returns 204.
- Acceptance: routes return correct errors for missing/invalid cookie (401) and success for valid cookie (200).

Stage D — Middleware & route protection
- Implement `middleware.ts` that:
	- Runs on protected API routes (e.g., `api/jobs`, `api/poster/*`, `api/applications/*`).
	- Reads `sid` cookie, verifies, attaches `request.session = { userId }` or returns 401.
	- Uses `COOKIE_SIGNING_SECRET` and honors `DEV_SESSION_TTL`.
- Also provide a lightweight helper `requireSession(req)` that controllers can call.

Stage E — Onboarding flow and profile upsert
- On first login or when `onboarding_completed` is false, UI should POST onboarding info (role selection, full name, avatar_url optional) to `POST /api/auth/onboard` or included in `/api/auth/login`.
- Server will upsert `profiles` row and set `onboarding_completed = true`.
- DB: ensure `supabase/sql/impl-01-auth.sql` creates the `profiles` table with `onboarding_completed boolean default false`.
- Acceptance: After onboarding, `/api/auth/me` reflects `onboarding_completed: true` and profile fields populated.

Stage F — Tests, docs, and dev ergonomics
- Unit tests for `lib/auth` and auth routes (happy path, invalid secret, expired token).
- Add docs snippet to `.github/docs.md` showing env vars and example `curl` calls for login/logout.
- Add example dev user seed (optional) in `supabase/sql/impl-01-auth.sql` for quick testing.

Security notes & constraints
- This is dev-only: clearly document `DEV_AUTH_SECRET` must NOT be used in production.
- Use secure cookie flags: `HttpOnly`, `Secure` (enabled in prod), `SameSite=Lax`.
- Server-side checks must still validate `profile.role` when performing role-restricted actions (defense-in-depth).

Acceptance criteria
- `POST /api/auth/login` accepts valid secret and returns 200 with cookie set.
- `GET /api/auth/me` returns the upserted profile when cookie present.
- `POST /api/auth/logout` clears session cookie and further requests are 401.
- `middleware.ts` blocks protected routes without valid session.

Estimated effort
- Dev: 6–10 hours (helpers, 3 API routes, middleware, tests, docs).

Related files
- `lib/auth.ts`
- `api/auth/*` (`login`, `logout`, `me`, optional `onboard`)
- `middleware.ts`

