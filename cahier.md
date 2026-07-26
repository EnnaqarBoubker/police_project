# Project Specification (Cahier des Charges)
## Security Reports & Violations Management System — "Sûreté Régionale de Nador System"

**Version:** 1.1
**Stack:** Laravel + React.js + Inertia.js
**Database:** MySQL / MariaDB

---

## 1. Overview

This project is a web application designed to digitize and centralize the recording and tracking of general security reports and violations. The system is organized around an interactive calendar, shared daily/monthly summaries, and a simple two-role access model: a **Super Admin** who only handles account approval, and **Admins** who manage all operational data collaboratively on a single shared dataset.

This document was derived from initial wireframes and refined based on direct clarifications from the project owner.

---

## 2. Context & Objectives

### 2.1 Context
Security units currently rely on manual/paper-based or disconnected methods to log reports and violations, making tracking, searching, and periodic reporting difficult. This project digitizes that process into one unified platform.

### 2.2 Objectives
- Digitize the daily recording of security reports/violations.
- Organize records in an interactive calendar for quick access by date.
- Provide automatic daily and monthly summaries.
- Secure access through a manual account-approval workflow.
- Give all approved admins full visibility over the same shared data (no data silos per user).
- Keep the UI simple and fast, suited for field/daily use.
- Allow future extensions (advanced statistics, PDF/Excel export, notifications, etc.).

---

## 3. Actors & Roles

| Actor | Description | Permissions |
|---|---|---|
| **Super Admin** | Sole system-level authority | **Only** approves or rejects new admin account requests. Does **not** manage operational data (reports/calendar) directly — that is the Admins' domain. Optionally can view a global read-only overview. |
| **Admin** | Any approved regular user | Full operational control: create/edit/delete reports, use the calendar, view daily/monthly summaries, and **see all data entered by every admin** (fully shared dataset, not siloed per user). |

> **Key rule (clarified):** Super Admin's role is strictly limited to account approval. Admins collectively own and fully see all records — everyone works on one common, shared dataset.

---

## 4. General Functional Flow

1. **Login / Register screen** — username + password (and password confirmation on registration).
2. On registration, the new account is created with status **"pending"**.
3. **Super Admin** reviews pending requests and **approves or rejects** them. This is the Super Admin's only responsibility in the system.
4. Once approved, the admin logs in and lands on the **Calendar** (monthly view, current day highlighted).
5. Clicking a **day** on the calendar shows the list of reports recorded on that date **by all admins** (shared view), plus a button to **add a new record** ("أضف جهة").
6. Clicking a specific **record/name** from that list opens its **detail page** (full name, date, age, gender, marital status, location, violation type, count, notes...).
7. A **Daily & Monthly Summary** page aggregates counts across all records, visible to every admin.

---

## 5. Detailed Functional Requirements

### 5.1 Authentication Module
- Registration: name, username/email, password, password confirmation.
- Login: username + password.
- Account status: `pending` / `approved` / `rejected`.
- No access to any page of the system until status = `approved`.
- User is notified of their request's outcome (approved/rejected).
- Password reset available (self-service and/or via Super Admin).

### 5.2 Super Admin Panel (Approval Only)
- List of pending account requests, with **Approve** / **Reject** actions.
- List of all existing admin accounts, with ability to deactivate/reactivate or delete an account.
- **No dashboard for reports/statistics is required for Super Admin** — that lives in the Admin space. (Optional read-only global view can be added later if desired.)

### 5.3 Admin Workspace (Shared Data)
- Full access to the interactive calendar.
- Full CRUD (create, read, update, delete) on all reports — **regardless of which admin created them**.
- Access to daily/monthly summaries covering the entire shared dataset.
- Search and filter across all records.

### 5.4 Interactive Calendar
- Monthly grid view, current day visually highlighted (as shown in the wireframe).
- Every day is clickable.
- Clicking a day shows all records logged that date (shared across admins) + an "Add entry" action for that same date.
- Navigation between months (previous/next).
- Visual indicator (color) for days that already contain records vs. empty days.

### 5.5 Add / Edit Report (Violation Record)
Fields derived from the wireframe:

| Field | Type | Notes |
|---|---|---|
| Name (person/subject of the record) | Text | Required |
| Report date | Date | Auto-linked to the selected calendar day |
| Age | Number | Optional |
| Gender | Select (Male / Female) | — |
| Marital status | Select (Single, Married, Divorced...) | — |
| Location | Select from a list of centers/zones | Extendable list (e.g., Zone 1, Zone 2...) |
| Violation type / subject of report | Text or select list | Required |
| Count | Number | Number of cases within the same record |
| Additional notes | Long text | Optional |

- "Add entry" button to attach an additional party/location linked to the record.
- Any admin can edit or delete any record (shared ownership model), unless a future refinement restricts this (see §9).

### 5.6 Daily & Monthly Summary
- Automatic count of records logged for the current day.
- Cumulative monthly total for the selected month.
- Filter summary by center/location or violation type.
- Export to PDF/Excel — proposed for a future iteration.

### 5.7 Search & Filters
- Search by name or record ID.
- Filter by date, center, gender, marital status, violation type.

---

## 6. Proposed Technical Architecture

### 6.1 Stack

| Layer | Technology |
|---|---|
| Backend | Laravel (PHP) — business logic, auth, controllers |
| Frontend | React.js via Inertia.js (SPA without a fully separate REST API) |
| Database | MySQL / MariaDB |
| Auth | Laravel Breeze/Fortify + Inertia, with a manual approval workflow layered on top |
| Styling | TailwindCSS |
| Frontend state | React state / Inertia shared props |

Recommended: a modular Laravel structure (Controllers, Form Requests, Policies, Resources), Inertia pages organized by role (Admin space vs. Super Admin approval space), and Laravel Policies/Gates to enforce the "approval-only" restriction for Super Admin and full shared access for Admins.

### 6.2 Proposed Database Schema

| Table | Key Fields |
|---|---|
| `users` | id, name, username, email, password, role (`admin` / `superadmin`), status (`pending`/`approved`/`rejected`), created_at |
| `centers` | id, name (e.g., Bouqana 1, Bouqana 2), created_at |
| `reports` | id, created_by (user_id), center_id, full_name, age, gender, marital_status, violation_type, report_date, count, notes, created_at |
| `report_entities` | id, report_id, entity_name, entity_type, created_at |

> Note: `created_by` is kept for traceability (who logged the record), but it does **not** restrict visibility — all admins can read/write all `reports` regardless of `created_by`.

### 6.3 Main Routes (example)

```
POST   /register                        Register new account (status = pending)
POST   /login                           Login (blocked unless status = approved)

GET    /superadmin/requests             List pending account requests
POST   /superadmin/requests/{id}/approve  Approve an account
POST   /superadmin/requests/{id}/reject   Reject an account
GET    /superadmin/admins               List/manage existing admin accounts

GET    /calendar                        Monthly calendar view
GET    /calendar/{date}                 Records for a specific date (shared)

POST   /reports                         Create a new report
GET    /reports/{id}                    Report details
PUT    /reports/{id}                    Update a report
DELETE /reports/{id}                    Delete a report

GET    /summary/daily?date=             Daily summary (shared dataset)
GET    /summary/monthly?month=          Monthly summary (shared dataset)
```

### 6.4 Authorization Rules

- **Super Admin**: authorized only on account-approval endpoints (`/superadmin/*`). No access to report CRUD routes.
- **Admin**: authorized on all `reports`, `calendar`, and `summary` routes; sees and can act on records from every admin (shared dataset).
- Enforced via a Laravel Policy/Gate, e.g. `ReportPolicy` allows any `admin` role to view/update/delete any report; `SuperAdminPolicy` restricts Super Admin strictly to the `users`/approval resource.

---

## 7. Non-Functional Requirements

- **Security:** password hashing (bcrypt), CSRF protection (built into Laravel/Inertia), role-based access control.
- **Performance:** fast calendar/summary queries even as data grows (indexes on date/center fields).
- **Usability:** simple UI suited for quick field/daily entry.
- **Compatibility:** modern browsers, responsive layout for smaller screens.
- **Scalability:** modular structure allowing future modules (advanced reports, notifications, exports).

---

## 8. Deliverables

- Full web application (Laravel + React + Inertia), deployment-ready.
- Structured database with Migrations and Seeders.
- UI for both roles: Login/Register, Admin workspace (calendar, reports, summaries), Super Admin approval panel.
- Short technical documentation (README) for setup and run instructions.

---

## 9. Open Points for Future Refinement

- Should Super Admin have an optional **read-only** overview of the shared data (for oversight), even though they cannot edit it? *(Not required now, but easy to add later.)*
- Should there be any per-center restriction among admins later (e.g., an admin only sees their own center's data), or does full sharing remain permanent? *(Currently: full sharing, no restriction.)*
- Export functionality (PDF/Excel) timeline.

---

## 10. Estimated Timeline

| Phase | Duration | Deliverable |
|---|---|---|
| UI/UX design + DB schema | 1 week | Final mockups + schema |
| Core setup (Laravel + Inertia + Auth + approval workflow) | 1 week | Login/registration + Super Admin approval flow |
| Calendar & reports module | 2 weeks | Report CRUD + interactive calendar (shared data) |
| Summaries & statistics | 1 week | Daily/monthly summary views |
| Testing & bug fixing | 1 week | Stable, production-ready system |

---

## 11. Conclusion

This document defines a clear, lean access model: **Super Admin exists solely to approve accounts**, while **Admins share one common, fully visible dataset** for all reports and violations, organized through an interactive calendar and daily/monthly summaries — built on Laravel, React.js, and Inertia.js for fast development and easy long-term maintenance.