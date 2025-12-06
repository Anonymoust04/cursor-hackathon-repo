# Impl 02 — Jobs Schema & Posting

Summary
- Create `jobs` schema and implement poster-only create/edit/delete API plus public feed and job detail pages.

Technical implementation
- API routes (Next.js):
	- `POST /api/jobs` — poster-only create. Validates `session.userId` and `profile.role == 'poster'` server-side.
	- `GET /api/jobs` — public feed with pagination and optional filters (`type`, `cause`, `location`).
	- `GET /api/jobs/[id]` — public job detail.
	- `PATCH /api/jobs/[id]`, `DELETE /api/jobs/[id]` — owner-only mutations enforced server-side.

- UI components:
	- `JobCard` (presentational), `JobForm` (controlled form), `JobsFeed` (data fetching with pagination). Keep components small and single-purpose (SOLID).

Database & SQL
- Run: `supabase/sql/impl-02-jobs.sql`. The script creates enums, `jobs` table, indexes (GIN on `cause_tags`) and FK to `profiles`.

Architecture / Design notes
- Controller/service/repository separation: API route handlers call services (business logic) which call a DB repository layer. This keeps routes thin and testable (Single Responsibility).
- Validation: reuse a `validateJobPayload` function (DRY) used in both server-side and client-side form validation code.

Environment variables
- `DATABASE_URL` — Postgres connection.

Test cases (self-test)
- Unit tests:
	- Validate `validateJobPayload` with missing title and invalid type.
	- Service tests for `createJob` ensuring `poster_id` set to current `userId`.
- Manual / E2E:
	1. As a `poster`, POST `/api/jobs` with valid payload -> 201 and job appears in `GET /api/jobs`.
	2. As non-poster, POST `/api/jobs` -> 403.
	3. Public `GET /api/jobs` returns entries without cookie.

SQL notes (indexing & constraints)
- Add GIN index on `cause_tags` for tag filtering.
- Index on `poster_id` and `status` for fast poster queries.

Acceptance checklist
- `supabase/sql/impl-02-jobs.sql` runs and `jobs` table exists.
- Poster can create/update/delete their job; others cannot.

Effort: medium
