# ImpactHub

**ImpactHub** is a dual-sided marketplace and networking platform that bridges the gap between students (B2C) and Corporate Social Responsibility (CSR) initiatives (B2B). It functions as a "LinkedIn for Impact," allowing users to build verified portfolios of community service and gig work while enabling organizations and student leaders to recruit talent for initiatives.

## Core Value Proposition

* **For Job Appliers (Students):** A centralized, verified "Impact Resume" for college/job applications and access to paid/volunteer opportunities.
* **For Job Posters (CSR/Student Leaders):** A streamlined tool to recruit volunteers/gig workers, track impact hours, and generate ESG data.

## User Roles & Permissions

The system relies on a hierarchical permission model.

### Roles

1. **Job Applier (Standard User):** The default role for students.
2. **Job Poster (Power User/Admin):** The role for Student Leaders, NGOs, or Corporate CSR Managers.

### Permission Matrix

| Feature / Action | **Job Applier** | **Job Poster** |
| :--- | :---: | :---: |
| **Create Account / Login** | ✅ | ✅ |
| **View/Edit Own Profile** | ✅ | ✅ |
| **Browse Opportunity Marketplace** | ✅ | ✅ |
| **View Project Details** | ✅ | ✅ |
| **Post New Project** | ❌ | ✅ |
| **Manage Projects** | ❌ | ✅ |

**Critical Logic Note:** A **Job Poster** is a superset of an Applier. A Poster can manage their own events but can also apply to *other* events (e.g., a student leader running a club can still volunteer for a separate beach cleanup).

## Tech Stack

* **Frontend:** Next.js 14+ (App Router)
* **Styling:** Tailwind CSS + Shadcn/ui (for accessible components like Dialogs, Tabs, Dropdowns)
* **Backend/DB:** Supabase (PostgreSQL)
* **State Management:** React Query (for client-side data fetching) or Server Actions
* **Authentication:** Custom developer-auth system (dev/testing only)

## Functional Requirements

### Authentication & Onboarding

* **Tech:** Custom developer-auth using a hardcoded secret string checked by an API route. Session stored via a signed, HttpOnly cookie.
* **Flow:** Minimal developer-auth intended for local/intern testing only.
* **Role Selection:** Users select intent during onboarding: "I want to find opportunities" (Applier) or "I want to organize initiatives" (Poster).

### The "Impact Profile" (User Dashboard)

* **Header:** Avatar, Name, Role Badge, Total Impact Hours.
* **Portfolio Grid:** Masonry layout (Tailwind `columns-2 md:columns-3`) displaying cards of completed past projects.
* **Verification Status:** Each portfolio item shows a "Verified" checkmark if confirmed by a Job Poster.

### The Opportunity Marketplace (Feed)

* **Tech:** Next.js Server Components (RSC) for fast data fetching.
* **Listings:** Cards showing Title, Organization, Location, Type (Volunteer vs. Paid), and Tags.
* **Filters:**
    * *Type:* Volunteer, Micro-Gig (Paid).
    * *Cause:* Environment, Education, Health.
    * *Location:* Remote vs. On-site (Geo-fencing).
    * *Status:* Completed, Ongoing, Accepting Applications.

### Organisational Dashboard

* **Post a Project:** Form to input Title, Description, Requirements, Date/Time, Location, and Compensation.
* **Dashboard Overview:** Poster dashboard showing a poster's projects with server-side pagination and secure actions.

### Profile Management

* **Separate Profiles:** Users can have both an `applicant_profiles` record and a `poster_profiles` record, allowing them to both apply for opportunities and post their own.
* **Profile Creation:** During signup, users select their intent and a corresponding profile is created:
    * "I want to find opportunities" → Creates `applicant_profiles` record
    * "I want to organize initiatives" → Creates `poster_profiles` record
* **Adding Additional Profile:** Users can create a second profile type later through their settings:
    * Applicants can create a `poster_profiles` record to start posting opportunities
    * Posters can create an `applicant_profiles` record to apply for other opportunities
* **Profile Linking:** Both profile types use the same `auth.users.id`, allowing the system to link them for users who have both.
* **Dual Functionality:** Users with both profiles can simultaneously:
    * Apply to opportunities (via `applicant_profiles`)
    * Post and manage their own opportunities (via `poster_profiles`)

## Database Schema

### Core Tables

**Table: `applicant_profiles`**
* `id` (PK, uuid)
* `auth_user_id` (uuid, NOT NULL) - Links to auth.users.id (Supabase Auth user ID)
* `full_name` (text)
* `avatar_url` (text)
* `impact_hours` (int)
* `characteristics` (jsonb) - Applicant characteristics (skills, interests, bio, etc.)
* `projects_completed` (uuid[]) - Array of completed project IDs (references projects.id)
* `projects_ongoing` (uuid[]) - Array of ongoing project IDs (references projects.id)
* `projects_applied_to` (uuid[]) - Array of project IDs the applicant has applied to (references projects.id)
* `onboarding_completed` (boolean)
* `created_at` (timestamptz)
* `updated_at` (timestamptz)

**Table: `poster_profiles`**
* `id` (PK, uuid)
* `auth_user_id` (uuid, NOT NULL) - Links to auth.users.id (Supabase Auth user ID)
* `organization_name` (text) - Name of the organization
* `full_name` (text) - Contact person name
* `avatar_url` (text)
* `organization_description` (text)
* `organization_data` (jsonb) - Additional organization info (website, social links, etc.)
* `projects_completed` (uuid[]) - Array of completed project IDs (references projects.id)
* `projects_ongoing` (uuid[]) - Array of ongoing project IDs (references projects.id where is_ongoing = true)
* `projects_inviting_applications` (uuid[]) - Array of project IDs currently accepting applications (references projects.id where is_accepting_applications = true)
* `onboarding_completed` (boolean)
* `created_at` (timestamptz)
* `updated_at` (timestamptz)

**Table: `projects`**
* `id` (PK, uuid) - Unique project identifier stored in profile arrays
* `poster_id` (FK -> poster_profiles.id)
* `title` (text)
* `description` (text)
* `status` (enum: 'draft', 'open', 'ongoing', 'closed', 'completed')
* `type` (enum: 'volunteer', 'paid')
* `cause_tags` (array)
* `location` (text)
* `company_name` (text)
* `company_description` (text)
* `time_commitment` (text)
* `application_deadline` (timestamptz)
* `requirements` (text)
* `benefits` (text)
* `image_url` (text)
* `is_completed` (boolean) - Whether the project is completed
* `is_ongoing` (boolean) - Whether the project is currently ongoing
* `is_accepting_applications` (boolean) - Whether the project is currently accepting applications
* `compensation_amount` (numeric)
* `start_time` (timestamptz)
* `end_time` (timestamptz)
* `created_at` (timestamptz)
* `updated_at` (timestamptz)

## API Routes

### Authentication

* `POST /api/auth/login` - Supabase login (body: `{ email, password }`)
  * Authenticates user via Supabase Auth
  * Returns session object
* `POST /api/auth/logout` - Clears session cookie
* `GET /api/auth/me` - Returns profiles for current session
  * Returns both `applicant` and `poster` profiles if they exist
  * Returns `{ user, profiles: { applicant, poster }, hasApplicantProfile, hasPosterProfile }`
* `POST /api/auth/create-profile` - Create a second profile type (body: `{ profileType: 'applicant' | 'poster', organizationName?: string, fullName?: string }`)
  * Allows users who already have one profile type to create the other
  * Requires authentication
  * For poster profiles, `organizationName` is required

### Projects

* `GET /api/projects` - Public project feed with pagination and optional filters (`type`, `cause`, `location`, `status`, `is_accepting_applications`)
* `GET /api/projects/[id]` - Public project detail
* `POST /api/projects` - Create project (Poster only, validates `session.userId` exists in `poster_profiles`)
  * Returns created project with unique `id` that should be stored in profile arrays
* `PATCH /api/projects/[id]` - Update project (Owner only)
* `DELETE /api/projects/[id]` - Delete project (Owner only)


## Security

### Row Level Security (RLS)

* **Projects Table:**
    * `SELECT`: Public
    * `INSERT/UPDATE/DELETE`: Only users where `auth.uid() == poster_id` (poster_id references poster_profiles)
    * Projects are unique and identified by their `id` which is stored in profile arrays
* **Applications Table:**
    * `INSERT`: Authenticated users with applicant profiles
    * `UPDATE`: Only `poster_id` of the parent Project (to accept/verify) OR `applicant_id` (to withdraw)
* **Self-Application Constraint:**
    * Database trigger `prevent_self_apply()` prevents users from applying to their own projects

### Middleware

* `middleware.ts` verifies `sid` cookie signature using `process.env.COOKIE_SIGNING_SECRET`
* Blocks protected API routes (returns 401) when invalid
* Cookie-based session verification

### Defense-in-Depth

* Server-side authorization checks in addition to database constraints
* Role-based access control enforced at multiple layers

## Getting Started

### Prerequisites

* Node.js 18+ installed
* PostgreSQL database (via Supabase)
* Environment variables configured

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cursor-hackathon-repo
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file with the following:
```env
# Supabase Configuration (Required)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Optional: For custom auth/session management
DEV_AUTH_SECRET=your-dev-auth-secret
COOKIE_SIGNING_SECRET=your-cookie-signing-secret
DEV_SESSION_TTL=604800
DATABASE_URL=your-postgres-connection-string
```

4. Run database migrations:
Execute SQL scripts in order:
* `supabase/sql/impl-01-auth.sql` - Creates `applicant_profiles` and `poster_profiles` tables
* `supabase/sql/impl-02-jobs.sql` - Creates `projects` table (renamed from jobs), enums, indexes (GIN on `cause_tags`)
  * Projects store all unique project data collated from both profile types
  * Each project has a unique `id` that is stored in profile arrays
  * Includes status tracking columns: `is_completed`, `is_ongoing`, `is_accepting_applications`

5. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

6. Open `http://localhost:3000` in your browser.

## Architecture & Design Principles

### SOLID Principles

* **Single Responsibility:** Auth responsibilities separated: `lib/auth` (sign/verify), `api/auth` (routes), `db/profiles` (DB access)
* **Controller/Service/Repository Separation:** API route handlers call services (business logic) which call DB repository layer
* **Component Design:** Keep components small and single-purpose (e.g., `JobCard`, `JobForm`, `JobsFeed`)

### DRY (Don't Repeat Yourself)

* Reuse DB access functions: `getOrCreateProfile(userId, props)` used by login and onboarding
* Reuse validation: `validateProjectPayload` function used in both server-side and client-side form validation

### Architecture Layers

* **Presentation Layer:** UI components (React components)
* **Data Fetching Layer:** Custom hooks (e.g., `usePosterJobs()`) wrap fetching/pagination logic
* **Controller Layer:** API route handlers (thin, delegate to services)
* **Service Layer:** Business logic (to be implemented for future features)
* **Repository Layer:** DB access functions

## Implementation Details

### Impl 01: Auth & Onboarding

* Minimal developer-auth using hardcoded secret string
* Session stored via signed, HttpOnly cookie
* Onboarding creates `profiles` row and sets completed flag
* Middleware verifies `sid` cookie signature
* Helpers in `lib/auth.ts` for signing, cookie, and session management

**Environment Variables:**
* `DEV_AUTH_SECRET` - Developer login secret (required for login in dev)
* `COOKIE_SIGNING_SECRET` - HMAC secret used to sign session cookies
* `DEV_SESSION_TTL` - Session lifetime (seconds), default 604800
* `DATABASE_URL` - Postgres connection string

### Impl 02: Projects Schema & Posting

* Creates `projects` table with enums, indexes (GIN on `cause_tags`)
* Projects are unique entities with unique IDs stored in profile arrays
* Includes status tracking: `is_completed`, `is_ongoing`, `is_accepting_applications`
* Poster-only create/edit/delete API
* Public feed and project detail pages
* Controller/service/repository separation
* Validation reuse with `validateProjectPayload`

**SQL Notes:**
* GIN index on `cause_tags` for tag filtering
* Indexes on `poster_id`, `status`, `is_completed`, `is_ongoing`, `is_accepting_applications` for fast queries
* Projects table is the source of truth for all project data


## User Experience (UX) Flow

### Scenario A: The Student (Applier)

1. **Land:** Home page -> Login
2. **Browse:** Filters feed for "Weekend Beach Cleanup"
3. **View:** Clicks on opportunity to see details
4. **Profile:** Views own impact profile with completed projects

### Scenario B: The CSR Lead (Poster)

1. **Dashboard:** Clicks "Post Opportunity"
2. **Form:** Fills out details for "Graphic Design for Charity"
3. **Manage:** Views own projects in dashboard
4. **Profile:** Views organization impact profile

## Future Direction

The following features were planned but are not yet implemented. They are documented here for future development:

### Applications System (Impl 03)

* **Applications Table:** Track applicant submissions to projects with status lifecycle (pending, accepted, rejected, verified, withdrawn)
* **Apply/Withdraw Flows:** Allow applicants to apply to projects and withdraw applications
* **Self-Apply Prevention:** Database trigger and server-side guards to prevent users from applying to their own projects
* **API Endpoints:** 
  * `POST /api/projects/[id]/apply` - Create application
  * `DELETE /api/applications/[id]` - Withdraw application
  * `GET /api/my/applications` - List user's applications
  * `PATCH /api/applications/[id]/accept` - Accept application (Poster only)
  * `PATCH /api/applications/[id]/reject` - Reject application (Poster only)

### Manual Verification & Impact Hours (Impl 04)

* **Verification Flow:** Allow posters to verify completed applications and award impact hours
* **Transaction Safety:** Atomic updates to both applications and applicant profiles
* **API Endpoint:** `PATCH /api/applications/[id]/verify` - Verify completion and award hours
* **Impact Hours Tracking:** Automatic increment of `applicant_profiles.impact_hours` upon verification

### Poster Dashboard & Analytics (Impl 05)

* **Dashboard Components:** Full poster dashboard showing all projects with applicant tracking
* **Applicant Management:** Paginated table view to manage applications (accept, reject, verify)
* **Analytics View:** SQL view (`poster_project_stats`) computing applicant counts and verified hours per project
* **API Endpoints:**
  * `GET /api/poster/projects` - List poster's projects with stats (paginated)
  * `GET /api/poster/projects/[id]/applicants` - Get applicants for a specific project

### QR Verification System (Impl 06)

* **QR Generation:** Generate time-limited, signed QR tokens for project events
* **Attendance Tracking:** `attendances` table to record check-ins via QR scanning
* **Security:** JWT/HMAC signed tokens with short expiry (15-60 minutes) and optional single-use tracking
* **API Endpoints:**
  * `POST /api/projects/[id]/qr/generate` - Generate QR code (Poster only)
  * `POST /api/qr/scan` - Scan QR code and record attendance
* **Database Tables:** `attendances`, `used_qr_tokens`

### Messaging & Notifications System (Impl 07)

* **Threads System:** Lightweight messaging allowing posters to initiate conversations with applicants
* **Message Exchange:** Participants can send/receive messages within threads they belong to
* **Notifications:** In-app notifications for application status changes, verifications, and new messages
* **Database Tables:** `threads`, `thread_participants`, `messages`, `notifications`
* **API Endpoints:**
  * `POST /api/threads` - Create thread (Poster only for project-related threads)
  * `GET /api/threads` - List user's threads
  * `POST /api/threads/[id]/messages` - Send message in thread
  * `GET /api/threads/[id]/messages` - Get thread messages (paginated)
  * `GET /api/notifications` - Get user notifications

## Testing

Each implementation includes:

### Unit Tests

* Service layer functions (e.g., `lib/auth.sign`, `lib/auth.verify`)
* Validation functions (e.g., `validateProjectPayload`)
* Repository functions (e.g., profile and project data access)

### Manual E2E Tests

* Authentication flow: Login, session verification, protected route access
* Project creation: Poster creates project, non-poster cannot
* Profile management: Create and view applicant/poster profiles

### Acceptance Checklists

Each implementation document includes an acceptance checklist for verification.

## Development Notes

### Environment Variables Summary

* `DEV_AUTH_SECRET` - Developer login secret (required for login in dev)
* `COOKIE_SIGNING_SECRET` - HMAC secret used to sign session cookies
* `DEV_SESSION_TTL` - Session lifetime (seconds), default 604800
* `DATABASE_URL` - Postgres connection string for server

### Code Organization

* `lib/auth.ts` - Auth helpers (sign, verify, cookie, session)
* `api/auth/` - Authentication API routes
* `api/projects/` - Project management API routes
* `db/` - Database repository functions
* `services/` - Business logic services
* `components/` - React UI components

### Key Implementation Files

* `middleware.ts` - Cookie verification and route protection
* `supabase/sql/impl-01-auth.sql` - Creates `applicant_profiles` and `poster_profiles` tables
* `supabase/sql/impl-02-projects.sql` - Projects table and indexes

## Documentation

Detailed implementation documentation is available in the `.github` folder:

* `.github/main-prd.md` - Product Requirements Document
* `.github/impl-01-auth-and-onboarding.md` - Auth & Onboarding Implementation
* `.github/impl-02-jobs-schema-posting.md` - Projects Schema & Posting Implementation
