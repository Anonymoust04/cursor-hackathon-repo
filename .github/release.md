# Release — Deployment & Prod Checklist

Summary
- Production checklist for deployment and required environment variables.

Checklist
- [ ] Define production env variables and secrets (DEV_AUTH_SECRET only for dev)
- [ ] Ensure DB migrations applied and RLS policies verified
- [ ] Add monitoring/alerts and backup strategy for Postgres
- [ ] Create deployment instructions (Vercel/Supabase) and runbook
