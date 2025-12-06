# Impl 06 — QR Verification System

Summary
- Generate signed, time-limited QR tokens per job; scanning records attendance and optionally marks presence on applications.

Checklist
- [ ] Create `supabase/sql/impl-06-qr.sql` (attendances table)
- [ ] Implement `qrService.generateToken(jobId)` (JWT/HS256 or HMAC with `QR_SIGNING_SECRET`)
- [ ] Implement `POST /api/jobs/[id]/qr/generate` (Poster only)
- [ ] Implement `POST /api/qr/scan` (verify token, map `session.userId` -> attendance, insert `attendances` row)
- [ ] Build `/qr/scan` page/UI for mobile scanning flow
- [ ] Consider single-use tokens (store `jti`) and short expiry (15–60m)
- [ ] Unit tests for token generation/scan

Related files
- `api/jobs/[id]/qr/generate`, `api/qr/scan`
- `services/qrService.ts`
