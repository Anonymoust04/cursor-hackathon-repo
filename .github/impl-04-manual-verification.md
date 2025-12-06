# Impl 04 — Manual Verification & Impact

Summary
- Implement Poster-led verification where a Poster marks an accepted application as `verified`, awards hours, and the system atomically increments the applicant's `profiles.impact_hours`. Verified applications become immutable.

Technical implementation
- API: `PATCH /api/applications/[id]/verify` — accepts `{ hours_awarded }`. Server checks:
	1. `session.userId` is the job's `poster_id`,
	2. application `status === 'accepted'` (only accepted apps may be verified),
	3. then runs a DB transaction to update `applications` (set `status='verified', verified_at=now(), hours_awarded`) and `profiles` (`impact_hours = impact_hours + hours_awarded`).

Atomicity & consistency
- Use a single DB transaction (BEGIN/COMMIT) so both application status and profile hours update together. If increment fails, rollback.

Database & SQL
- Run: `supabase/sql/impl-04-verification.sql` — alters `applications` to add `verified_at` and `hours_awarded` and ensures `profiles.impact_hours` default 0.

Architecture / SOLID/DRY
- Verification logic lives in `verificationService.verifyApplication(applicationId, posterId, hours)` which performs authorization and transactional updates. Route handler only parses input and calls service.

Environment variables
- `DATABASE_URL` — DB connection.

Test cases (self-test)
- Unit tests:
	- `verificationService` rejects verification if user is not poster.
	- `verificationService` rejects if application is not `accepted`.
	- Transaction rolls back on DB error.
- Manual E2E:
	1. Poster accepts an application -> `status='accepted'`.
	2. Poster calls `PATCH /api/applications/{id}/verify` with `{ hours_awarded: 4 }` -> `status='verified'`, `verified_at` set, `applications.hours_awarded=4`, `profiles.impact_hours` increased by 4.
	3. Attempt further status change on that application -> rejected.

Acceptance checklist
- `supabase/sql/impl-04-verification.sql` applied successfully.
- Verify endpoint updates both `applications` and `profiles` in a single transaction.

Effort: medium
