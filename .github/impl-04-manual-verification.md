# Impl 04 — Manual Verification & Impact Hours

Summary
- Poster verifies accepted applications, awards hours, and increments `profiles.impact_hours` transactionally.

Checklist
- [ ] Implement PATCH endpoints: `/api/applications/[id]/accept`, `/reject`, `/verify`
- [ ] Implement `verificationService.verifyApplication(applicationId, posterId, hours)`
- [ ] Perform atomic DB transaction to update `applications` (status -> `verified`, `verified_at`, `hours_awarded`) and increment `profiles.impact_hours`
- [ ] Make verified applications immutable
- [ ] Emit notification upon verification (create `notifications` row)
- [ ] Unit tests for verification flow and transactionality

Related files
- `api/applications/*`
- `services/verificationService.ts`
