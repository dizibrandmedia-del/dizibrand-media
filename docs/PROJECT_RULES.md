# Project Rules, Coding Standards & Non-Negotiables: DiziBrand Media

This document defines the strict engineering standards, architectural constraints, and operational non-negotiables that all contributors and automated agents must adhere to across the DiziBrand Media platform.

---

## 1. Absolute Non-Negotiables

1. **Strict Editorial & Proof Integrity**:
   - **Never invent or fabricate** client logos, testimonials, awards, revenue metrics, case study statistics, country claims, or team biographies.
   - All demo data must be explicitly flagged with `[DEMO / TEST DATA]`.
   - All unverified public portfolio items must display the `[Pending verification]` badge.
2. **Exactly Three Portals**:
   - Super Admin / Management Portal (`/admin`)
   - Team Portal (`/team`) — Sales, PMs, Specialists, and Freelancers share this single portal with strict role-based views.
   - Client Portal (`/portal`) — Tenant-isolated.
   - Under no circumstances shall separate portals be created for Sales, PMs, or Freelancers.
3. **Server-Enforced Tenant Isolation**:
   - Client data access must be scoped to `session.user.companyId` at the database query layer.
   - Client access must never rely merely on frontend UI conditional rendering.
4. **No Secrets in Codebase**:
   - Never commit API keys, database connection strings, JWT secrets, or cloud storage keys to version control.
   - All secrets must be loaded via environment variables with complete documentation in `.env.example`.

---

## 2. Codebase Architecture & Directory Conventions

```
src/
├── app/                  # Next.js App Router (Routes & Layouts)
│   ├── (public)/         # Public marketing pages (Home, Services, CMO, CTO)
│   ├── (auth)/           # Authentication flows (Login, Register, Password Reset)
│   ├── admin/            # Super Admin & Management Portal
│   ├── team/             # Unified Team Portal (Sales, PM, Dev, Freelancer)
│   ├── portal/           # Tenant-isolated Client Portal
│   └── api/              # Server-side Route Handlers & Webhooks
├── components/           # Reusable React UI Components
│   ├── ui/               # Headless/Accessible primitives (Button, Modal, Input, Badge)
│   ├── website/          # Marketing components (HeroEcosystem, Nav, Footer)
│   ├── admin/            # Admin widgets, CRM pipeline board, CMS forms
│   ├── team/             # Sprint task boards, milestone views, time trackers
│   └── client/           # Milestone review cards, invoice tables, ticket forms
├── lib/                  # Core Utilities, Domain Logic & Infrastructure
│   ├── auth/             # Auth.js / NextAuth configuration & DAL guards
│   ├── db/               # Prisma client singleton
│   ├── domain/           # Shared business logic (CRM, Projects, Scoring, Billing)
│   ├── adapters/         # Third-party integrations (Email, Cal, WhatsApp, S3)
│   ├── validations/      # Zod validation schemas
│   └── analytics/        # Analytics event dispatcher
├── types/                # Shared TypeScript type definitions
└── styles/               # Global CSS, Tailwind base & utility classes
```

---

## 3. TypeScript & Coding Standards

- **Strict Mode Enabled**: `tsconfig.json` must have `"strict": true`, `"noImplicitAny": true`, and `"strictNullChecks": true`.
- **No `any` Types**: All API responses, form states, and database queries must be strongly typed. Use `unknown` with type guards if payload structure is dynamic.
- **File Naming**:
  - React Components: `kebab-case.tsx` (e.g., `hero-ecosystem.tsx`, `lead-form.tsx`).
  - Modules & Utilities: `kebab-case.ts` (e.g., `lead-scoring.ts`, `prisma.ts`).
  - Route Handlers: `route.ts`.
  - Pages & Layouts: `page.tsx`, `layout.tsx`.
- **Validation-First**:
  - Every API endpoint accepting `POST`, `PUT`, or `PATCH` must parse the request body with a Zod schema using `schema.safeParse()`.
  - Client-side forms must use `react-hook-form` paired with `@hookform/resolvers/zod`.

---

## 4. State & UI Component Guidelines

- **Loading & Skeleton States**: Every page and dynamic widget must implement a `<Skeleton>` or suspense fallback to prevent layout shifts.
- **Empty States**: Tables, pipeline columns, and task lists must provide clear, actionable empty states with contextual CTAs.
- **Error Boundaries**: Client-side error boundaries (`error.tsx`) must be implemented for each route group to prevent single-component crashes from breaking the entire page.

---

## 5. Accessibility & SEO Standards

- **Accessibility (WCAG 2.1 AA)**:
  - All interactive elements must have visible focus rings (`focus-visible:ring-2`).
  - Color contrast ratio must meet or exceed 4.5:1 for normal text and 3:1 for large text.
  - All form controls must have associated `<label>` tags with matching `htmlFor` or `aria-label`.
  - Modals and drawers must trap keyboard focus and dismiss on `Escape`.
- **SEO & Web Vitals**:
  - Each public page must define explicit `metadata` (Title, Description, Canonical URL, OpenGraph).
  - Schema.org JSON-LD structured data must be embedded on the homepage, service pages, and organization profiles.
  - Images must use `next/image` with explicit `width`, `height`, and descriptive `alt` text.
  - Core Web Vitals targets: **LCP < 2.5s**, **CLS < 0.1**, **INP < 200ms**.

---

## 6. Commit & Pull Request Standards

- Follow Conventional Commits:
  - `feat: add animated hero business ecosystem node graph`
  - `fix: enforce companyId tenant check in client project query`
  - `docs: update RBAC matrix and database schema documentation`
  - `test: add unit tests for lead scoring engine`
- PR Checklist:
  - [ ] TypeScript compiles cleanly with zero errors (`npx tsc --noEmit`).
  - [ ] Lint checks pass (`npm run lint`).
  - [ ] Relevant unit and integration tests pass (`npm test`).
  - [ ] No hard-coded secrets or credentials exist.
  - [ ] Zero fake testimonials, client logos, or false claims introduced.
