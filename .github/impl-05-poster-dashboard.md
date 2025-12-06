# Impl 05 — Poster Dashboard & Tracking

Summary
- Build a Poster dashboard showing a poster's jobs, applicant tracking table (accept/reject/verify actions), and analytics (applicant counts, verified hours). Focus on server-side pagination and secure actions.

Technical implementation
- UI components:
	- `PosterDashboard` (container) — fetches poster jobs via `GET /api/poster/jobs?page=&limit=`.
	- `ApplicantTable` — paginated table with `accept`, `reject`, `verify` actions wired to secure endpoints.
	- `AnalyticsSummary` — executes server-side computed queries for counts and sums.

- APIs:
	- `GET /api/poster/jobs` — returns jobs with minimal applicant counts and links to applicant list endpoints.
	- `GET /api/poster/jobs/[id]/applicants?page=&limit=` — paginated applicants for job.
	- `PATCH /api/applications/[id]/accept` and `/reject` — poster-only.

Architecture / SOLID/DRY
- Controller/service/repository: `posterService.getJobsWithStats(posterId, page, limit)` does the DB query; UI invokes controller routes only.
- Keep presentation (components) separate from data-fetching hooks (DRY): `usePosterJobs()` hook wraps fetching/pagination logic.

Environment variables
- `DATABASE_URL` — DB connection for server.

Test cases (self-test)
- Unit tests:
	- `posterService.getJobsWithStats` returns counts matching direct SQL queries.
	- `ApplicantTable` actions call correct endpoints and handle errors.
- Manual E2E:
	1. Poster loads dashboard: jobs visible and paginated.
	2. Poster accepts an application — observe `applications.status` update and analytics count update.
	3. Poster verifies an application — analytics reflect verified hours.

SQL & queries
- Consider `supabase/sql/impl-05-analytics.sql` (view) that provides `poster_job_stats(poster_id)` view with `job_id, applicant_count, verified_hours_sum`.

Acceptance checklist
- Poster endpoints return paginated results and only for `poster_id == session.userId`.
- UI actions update DB and analytics in near-real-time.

Effort: medium
