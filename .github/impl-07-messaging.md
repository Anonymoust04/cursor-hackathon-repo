# Impl 07 — Messaging & Notifications

Summary
- Lightweight threads and messages tied optionally to jobs; in-app notifications for status changes and verifications.

Checklist
- [ ] Create `supabase/sql/impl-07-messaging.sql` (threads, messages, notifications)
- [ ] Implement APIs: `POST /api/threads`, `GET /api/threads`, `POST /api/threads/[id]/messages`, `GET /api/threads/[id]/messages`
- [ ] Enforce participant checks (authorize sender belongs to thread)
- [ ] Implement notifications API: `GET /api/notifications`
- [ ] Add hooks to create notifications when application status changes or verification occurs
- [ ] Unit tests for messaging flows and notification creation

Related files
- `api/threads/*`, `api/notifications/*`
- `services/messagingService.ts`
