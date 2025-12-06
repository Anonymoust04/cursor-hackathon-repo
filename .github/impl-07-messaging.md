# Impl 07 — Messaging & Notifications

Summary
- Add a lightweight threads/messages system allowing Posters to initiate conversations with applicants and applicants to reply. Implement in-app notifications for application status changes and verifications.

Technical implementation
- Database: `threads` (id, job_id nullable, created_by, created_at) and `messages` (id, thread_id, sender_id, body, created_at, read_at). Optionally store `participants` in a join table for quick permission checks.

- API endpoints:
	- `POST /api/threads` — poster-only for threads tied to a job; returns `threadId`.
	- `GET /api/threads` — list threads that include `session.userId`.
	- `POST /api/threads/[id]/messages` — insert message if `session.userId` is participant.
	- `GET /api/threads/[id]/messages` — paginated messages.

Notification delivery
- Emit in-app notifications (push optional later). Implement `notifications` table: `id, user_id, type, payload, read_at, created_at` and an API `GET /api/notifications`.

Architecture / SOLID/DRY
- Messaging service (`messagingService`) contains message validation and participant checks; route handlers call the service.
- Reuse an `authorize` helper to check thread participation (DRY).

Environment variables
- `DATABASE_URL` — DB connection.

Test cases (self-test)
- Unit tests:
	- `messagingService.createThread` creates a thread and participant records.
	- `messagingService.postMessage` validates sender is participant.
- Manual E2E:
	1. Poster creates a thread for applicant -> thread visible to both users.
	2. Applicant replies -> message visible to poster and applicant.
	3. Unrelated applier POST to create a thread with a poster without application -> 403.
	4. Notification is created when application status changes and appears in `GET /api/notifications`.

SQL scripts
- Run: `supabase/sql/impl-07-messaging.sql` to create `threads`, `messages`, and `notifications` tables and helpful indexes.

Acceptance checklist
- Messaging tables created and endpoints enforce participant checks.
- Notifications are enqueued on status changes and visible to target users.

Effort: high
