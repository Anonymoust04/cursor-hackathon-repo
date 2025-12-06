# Impl 03 — Applications & Self-Apply Guard (RLS)

Summary
- Applications lifecycle with self-apply prevention, apply/withdraw flows, and user views.

Checklist
- [ ] Create `supabase/sql/impl-03-applications.sql` (applications table, `prevent_self_apply()` trigger)
- [ ] Implement DB repo: `db/applications` (create, withdraw, list by user/job)
- [ ] Implement `POST /api/jobs/[id]/apply` (prevent self-apply server-side)
- [ ] Implement `DELETE /api/applications/[id]` (withdraw -> `status='withdrawn'`)
- [ ] Implement `GET /api/my/applications`
- [ ] Add RLS policies for `applications` table (INSERT for authenticated, UPDATE by poster or applicant)
- [ ] Unit tests for application service and self-apply guard

Related files
- `supabase/sql/impl-03-applications.sql`
- `api/applications/*`, `api/jobs/[id]/apply`
- `db/applications.ts`
