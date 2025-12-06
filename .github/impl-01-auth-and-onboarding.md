# Impl 01 — Auth & Onboarding

Summary
- Minimal developer-auth using a hardcoded secret string checked by an API route. Session stored via a signed, HttpOnly cookie. Onboarding creates a `profiles` row and sets a completed flag. This is intentionally non-production and intended for local/intern testing only.

Technical implementation
- API routes (Next.js App Router):
	- `POST /api/auth/login` (body: `{ secret, displayName, role }`): Verifies `secret === process.env.DEV_AUTH_SECRET`. On success:
		- generate `userId = gen_random_uuid()` server-side,
		- upsert `profiles` row using `userId` and supplied `displayName`/`role`,
		- set a signed cookie `sid` containing `{ userId, iat }`.
	- `POST /api/auth/logout`: clears cookie.
	- `GET /api/auth/me`: returns profile for current session.

- Middleware: `middleware.ts` verifies `sid` cookie signature using `process.env.COOKIE_SIGNING_SECRET` and blocks protected API routes (returns 401) when invalid.

- Helpers: put signing, cookie, and session helpers in `lib/auth.ts` to follow SRP and DRY.

Architecture and SOLID/DRY notes
- Keep auth responsibilities separated: `lib/auth` (sign/verify), `api/auth` (routes), `db/profiles` (DB access). This enforces Single Responsibility and keeps code testable.
- Reuse DB access functions (DRY): `getOrCreateProfile(userId, props)` used by login and onboarding.

Environment variables
- `DEV_AUTH_SECRET` — developer login secret (required for login in dev).
- `COOKIE_SIGNING_SECRET` — HMAC secret used to sign session cookies.
- `DEV_SESSION_TTL` — session lifetime (seconds), default 604800.
- `DATABASE_URL` — Postgres connection string for server.

SQL script
- Run: `supabase/sql/impl-01-auth.sql` — creates `profiles` table and role enum.

Example server pseudo-code (concise)
```ts
// lib/auth.ts
import crypto from 'crypto'
export function sign(payload, secret) { /* HMAC sign + base64 */ }
export function verify(token, secret) { /* verify and return payload */ }
```

```ts
// app/api/auth/login/route.ts (pseudo)
export async function POST(req) {
	const { secret, displayName, role } = await req.json()
	if (secret !== process.env.DEV_AUTH_SECRET) return new Response(null,{status:401})
	const userId = crypto.randomUUID()
	await db.upsertProfile({ id: userId, full_name: displayName, role })
	const token = sign({ userId, iat: Date.now() }, process.env.COOKIE_SIGNING_SECRET)
	return new Response(JSON.stringify({ userId }), { status: 200, headers: { 'Set-Cookie': `sid=${token}; HttpOnly; Path=/;` } })
}
```

Test cases (self-test)
- Unit tests:
	- `lib/auth.sign` and `lib/auth.verify` roundtrip with sample payload.
	- `db.upsertProfile` creates/returns row.
- Manual E2E:
	1. `POST /api/auth/login` with `{ secret: DEV_AUTH_SECRET, displayName: 'Alice', role: 'applier' }` -> 200 and `sid` cookie set.
	2. `GET /api/auth/me` with cookie -> returns profile JSON with `id`, `role`, `onboarding_completed=false`.
	3. Access protected endpoint `/api/jobs/create` without cookie -> 401; with cookie -> 403 (if not poster) or 200 (if poster).

Acceptance checklist
- `supabase/sql/impl-01-auth.sql` runs and creates `profiles` table.
- `POST /api/auth/login` sets a valid `sid` cookie and creates/returns `userId`.
- Middleware blocks unauthorized requests.

Effort: low
