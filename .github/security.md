# Security — RLS, Middleware, and Authorization

Summary
- Row-level security, middleware session checks, and server-side authorization helpers.

Checklist
- [ ] Implement RLS policies for `jobs`, `applications`, `attendances`, `threads`
- [ ] Implement `middleware.ts` to verify `sid` cookie using `COOKIE_SIGNING_SECRET`
- [ ] Implement server-side `authorize` helpers for common checks (isPoster, isOwner, isParticipant)
- [ ] Add DB triggers/constraints (e.g., prevent self-apply)
- [ ] Add security-focused unit/integration tests
