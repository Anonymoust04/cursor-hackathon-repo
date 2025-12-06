# Impl 02 — Jobs Schema & Posting

Summary
- Jobs schema, indexes, validation, and Poster-only CRUD APIs.

Checklist
- [ ] Create `supabase/sql/impl-02-jobs.sql` (enums, `jobs` table, GIN index on `cause_tags`)
- [ ] Implement DB repo: `db/jobs` functions (list, getById, create, update, delete)
- [ ] Implement public APIs: `GET /api/jobs` (filters, pagination), `GET /api/jobs/[id]`
- [ ] Implement Poster-only APIs: `POST /api/jobs`, `PATCH /api/jobs/[id]`, `DELETE /api/jobs/[id]`
- [ ] Implement `validateJobPayload` and reuse in client/server
- [ ] Add unit tests for validation and repo functions

Related files
- `supabase/sql/impl-02-jobs.sql`
- `api/jobs/*`
- `db/jobs.ts`
