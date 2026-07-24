# POLICE System

Security reports & violations management system. Built with Laravel, Inertia.js, React, and Tailwind CSS, per `cahier.md`.

## Stack

- Laravel 10 (PHP 8.2+)
- Inertia.js + React 18
- Tailwind CSS
- MySQL / MariaDB

## Setup

```bash
composer install
npm install
cp .env.example .env   # already provided in this repo, adjust DB credentials if needed
php artisan key:generate
php artisan migrate --seed
npm run build           # or `npm run dev` while developing
php artisan serve
```

The app expects a `police` database (see `DB_DATABASE` in `.env`). Create it first if it doesn't exist:

```sql
CREATE DATABASE police CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## Seeded credentials

All seeded accounts use the password `password`.

| Role | Username | Status | Notes |
|---|---|---|---|
| Super Admin | `superadmin` | approved | Only handles account approval |
| Admin | `admin1` | approved | Full CRUD on the shared dataset |
| Admin | `admin2` | approved | Full CRUD on the shared dataset |
| Admin | `pendingadmin` | pending | Use this to test the approval flow |

Centers seeded: Bouqana 1, Bouqana 2, Zone 1, Zone 2. A handful of sample reports are seeded across the current month so the calendar isn't empty on first load.

## How the approval workflow works

1. Anyone can register at `/register` (name, username, email, password). The account is created with `role = admin` and `status = pending`, and the user is **not** logged in — they land on an "awaiting approval" screen.
2. A Super Admin logs in (`superadmin` / `password`) and lands on `/superadmin/requests`, the only screen they have. They approve or reject pending accounts there, and manage existing admins (deactivate/reactivate/delete) at `/superadmin/admins`.
3. Login is blocked server-side for any account that isn't `status = approved` and `is_active = true` — pending and rejected users get an inline error explaining why. This is re-checked on every authenticated request (`EnsureUserIsApproved` middleware), so a deactivation takes effect immediately even mid-session.
4. Once approved, an admin logs in and lands on `/calendar`. From there they have full CRUD on reports, and **see the entire shared dataset** — every report created by every admin, never scoped to just their own. `created_by` is stored for traceability only.
5. Super Admin and Admin are mutually exclusive route spaces, enforced by a `role:admin` / `role:superadmin` route middleware: a Super Admin gets a 403 on any `/calendar`, `/reports`, or `/summary` route, and an Admin gets a 403 on any `/superadmin/*` route.

## Authorization

- `App\Policies\ReportPolicy` — any approved admin can view/create/update/delete any report (shared ownership, not scoped by `created_by`).
- `App\Http\Middleware\EnsureUserHasRole` (alias `role:`) — restricts route groups to specific roles.
- `App\Http\Middleware\EnsureUserIsApproved` (alias `approved`) — re-verifies approval/active status on every request.

## Project structure notes

- Aggregation logic for the calendar's per-day counts and the daily/monthly summary lives in `App\Services\ReportSummaryService`, not in controllers.
- `App\Http\Requests\StoreReportRequest` / `UpdateReportRequest` validate the report fields per the cahier de charge (name and violation type required, age/notes optional, etc.).
- Centers/zones are an extendable list — admins can add a new one inline from the report form (`POST /centers`).

## Out of scope (see "Open Points" in `cahier.md`)

PDF/Excel export, notifications, and per-center data restriction were intentionally left out of this pass. The shared-dataset model and the `ReportSummaryService`/`ReportPolicy` seams should make these straightforward to add later without restructuring.
