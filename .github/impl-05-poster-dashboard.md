# Impl 05 — Poster Dashboard & Analytics

Summary
- Poster-facing APIs and UI: job list, applicant tracking, and analytics summary.

Checklist
- [ ] Implement `GET /api/poster/jobs?page=&limit=` (jobs with minimal applicant counts)
- [ ] Implement `GET /api/poster/jobs/[id]/applicants?page=&limit=` (paginated applicants)
- [ ] Create `poster_job_stats(poster_id)` SQL view (optional) or aggregate queries
- [ ] Build UI components: `PosterDashboard`, `ApplicantTable`, `AnalyticsSummary`
- [ ] Wire accept/reject/verify actions to secure endpoints
- [ ] Unit/integration tests for poster APIs

Related files
- `api/poster/*`
- `services/posterService.ts`
- `components/PosterDashboard/*`
