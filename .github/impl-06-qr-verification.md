# Impl 06 — QR Verification System

Summary
- Implement per-job QR generation and scan handling to record attendance. QR tokens are server-signed, time-limited, and map to a job. Scanning marks attendance for an authenticated applier and optionally flags the application as present for Poster review.

Technical implementation
- API endpoints:
	- `POST /api/jobs/[id]/qr/generate` — poster-only. Generates a signed token (HMAC or JWT) containing `{ jobId, exp }` and returns a QR payload (URL pointing to `/qr/scan?token=...`).
	- `POST /api/qr/scan` — accepts `{ token }`. Verifies signature and expiry, maps `session.userId` to applicant, and inserts an `attendances` row and/or updates `applications` to mark presence.

- Token format: use JWT (HS256) signed with `process.env.QR_SIGNING_SECRET` or a compact HMAC payload. Include `jti` if you want single-use tokens and store used `jti`s in a table.

Database & SQL
- Run: `supabase/sql/impl-06-qr.sql` which creates `attendances` table and alters `jobs` if needed.

Security considerations
- Token expiry should be short (e.g., 15–60 minutes).
- If tokens are single-use, store used `jti` and reject reuse.

Environment variables
- `QR_SIGNING_SECRET` — secret used to sign QR tokens.
- `DATABASE_URL` — DB connection.

Architecture & SOLID/DRY
- `qrService.generateToken(jobId)` isolates token format and expiry handling.
- `qrService.scan(token, userId)` validates token, checks single-use, and records attendance via repository function.

Test cases (self-test)
- Unit tests:
	- `qrService.generateToken` produces tokens that `qrService.verifyToken` accepts before expiry.
	- `qrService.scan` records an attendance row linked to `application`.
- Manual E2E:
	1. Poster generates QR -> token returned.
	2. Authenticated applier POST `/api/qr/scan` with token -> attendance recorded.
	3. Reusing token when configured single-use -> rejected.
	4. Expired token -> rejected.

Acceptance checklist
- `supabase/sql/impl-06-qr.sql` applied successfully.
- Generated QR tokens verify and scanning records attendance.

Effort: high
