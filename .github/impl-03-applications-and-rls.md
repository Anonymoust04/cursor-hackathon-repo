# Impl 03 — Applications & Self-Apply Guard

Summary
- Add `applications` table with lifecycle statuses and implement apply/withdraw flows. Enforce that posters cannot apply to their own jobs via a DB trigger and server-side guard.

Technical implementation
- API endpoints:
	- `POST /api/jobs/[id]/apply` — create application. Server reads `session.userId` as `applicant_id`. Before insert, server performs a check that `applicant_id !== jobs.poster_id` (defense-in-depth) and the DB trigger prevents any bypass.
	- `DELETE /api/applications/[id]` — applicant withdraw (soft-delete via `status='withdrawn'` recommended).
	- `GET /api/my/applications` — lists current user's applications.

- Business rules:
	- Self-apply is forbidden.
	- Applicants can withdraw only their own applications.
	- Posters can `accept`, `reject`, and later `verify` applications for their jobs.

Database & SQL
- Run: `supabase/sql/impl-03-applications.sql`. This creates `applications` table and a trigger function `prevent_self_apply()` that checks `jobs.poster_id` and rejects inserts when equal.

Architecture / SOLID/DRY
- Service layer `applicationsService` exposes `applyForJob(jobId, applicantId)` and `withdrawApplication(applicationId, userId)`. Keep route handlers thin and delegate to services.
- Reuse `db` repository functions (DRY) for reads/writes.

Environment variables
- `DATABASE_URL` — DB connection used by server scripts.

Test cases (self-test)
- Unit tests:
	- `applicationsService.applyForJob` rejects when job.poster_id === applicantId.
	- `applicationsService.withdrawApplication` only allows owner to withdraw.
- Manual E2E tests:
	1. As non-poster, POST `/api/jobs/{id}/apply` -> 201, row in `applications` with `status='pending'`.
	2. As poster, POST `/api/jobs/{id}/apply` -> 403/400; no DB row created.
	3. Applicant DELETE `/api/applications/{id}` -> `status='withdrawn'` or row removed.

SQL notes
- Trigger function prevents self-apply and returns clear error message suitable for surfaced API error.

Acceptance checklist
- `supabase/sql/impl-03-applications.sql` creates table and trigger successfully.
- Server-side apply endpoint enforces self-apply guard.

Effort: medium
