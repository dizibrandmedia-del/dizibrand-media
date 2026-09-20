# Test Strategy & Quality Assurance Framework: DiziBrand Media

This document defines the comprehensive test strategy, testing pyramid, toolchains, coverage requirements, and verification protocols for the DiziBrand Media platform.

---

## 1. Testing Pyramid & Approach

```
                  ┌───────────────────────┐
                  │    E2E Tests (10%)    │  Playwright
                  │ Critical User Flows   │
                  ├───────────────────────┤
                  │ Integration (30%)     │  Vitest + Supertest
                  │ API Routes & DAL      │  Prisma Mock / Test DB
                  ├───────────────────────┤
                  │ Unit Tests (60%)      │  Vitest + RTL
                  │ Domain Logic & Schemas│
                  └───────────────────────┘
```

- **Unit Testing (60%)**: Focus on pure business logic, lead scoring computations, Zod validation schemas, utility functions, and isolated React component states.
- **Integration Testing (30%)**: Verify API route handlers, database queries via Prisma, NextAuth authentication flow, RBAC access control guards, and adapter fallbacks.
- **End-to-End Testing (10%)**: Automated cross-browser tests in Playwright verifying complete user journeys across the Public Website, Admin Portal, Team Portal, and Client Portal.

---

## 2. Testing Toolchain

| Category | Tool / Framework | Purpose |
| :--- | :--- | :--- |
| **Test Runner** | **Vitest** | Fast ESM-native unit and integration test runner with TypeScript support. |
| **Component Testing**| **React Testing Library** | Behavior-driven React component testing with accessible DOM queries. |
| **E2E Automation** | **Playwright** | Headless and headful browser automation (Chromium, Firefox, WebKit) with video/trace capture. |
| **Accessibility** | **@axe-core/playwright** | Automated WCAG 2.1 AA compliance auditing. |
| **Performance** | **Lighthouse CI** | Automated Core Web Vitals benchmarking (LCP, CLS, INP). |
| **API Mocking** | **MSW (Mock Service Worker)** | Intercepting third-party integration requests (Resend, Stripe, Cal.com). |

---

## 3. Detailed Test Suites & Cases

### A. Unit Tests (`tests/unit/...`)

#### 1. Lead Scoring Engine (`lead-scoring.test.ts`)
- **Test 1.1**: Computes maximum score (100) for enterprise budget (>$25k/INR 20L+), corporate domain, high-priority service, and detailed description.
- **Test 1.2**: Computes baseline score for minimal submission with personal email (`@gmail.com`).
- **Test 1.3**: Correctly handles INR budget tiers and maps them to equivalent scoring weight.
- **Test 1.4**: Emits score breakdown JSON matching individual factor weights.
- **Test 1.5**: Never triggers automatic rejection solely on low score.

#### 2. Zod Validation Schemas (`validations.test.ts`)
- **Test 2.1**: Lead form schema rejects invalid emails and missing required fields.
- **Test 2.2**: Lead form schema enforces telephone formatting and privacy consent.
- **Test 2.3**: Free Audit schema validates selected audit type (Website, SEO, Social, Ads, CRO, Digital Presence).
- **Test 2.4**: Proposal creation schema validates positive decimal amounts and valid future expiration date.

#### 3. RBAC Data Access Layer Guards (`rbac-dal.test.ts`)
- **Test 3.1**: `assertAuthorized` throws 401 when session is null.
- **Test 3.2**: `assertAuthorized` throws 403 when role is `SALES` attempting to access project financial ledgers.
- **Test 3.3**: `assertAuthorized` throws 403 when role is `CLIENT` without `companyId`.
- **Test 3.4**: `assertAuthorized` throws 403 when client user requests data belonging to a different `companyId`.

---

### B. Integration Tests (`tests/integration/...`)

#### 1. Lead Submission API (`api-leads.test.ts`)
- **Test 1.1**: `POST /api/leads` validates payload, creates Lead record in DB, and returns `201 Created` with sanitized lead ID.
- **Test 1.2**: `POST /api/leads` rejects spam submissions failing honeypot check.
- **Test 1.3**: `POST /api/leads` triggers asynchronous sales assignment and notification adapter.

#### 2. Project Delivery & Milestone API (`api-projects.test.ts`)
- **Test 2.1**: `PATCH /api/milestones/[id]/status` transitions status to `COMPLETED` when all required deliverables are approved.
- **Test 2.2**: Prevents milestone completion if client approval is required but pending.

#### 3. Client Portal Tenant Isolation (`client-isolation.test.ts`)
- **Test 3.1**: Authenticated client session queries `/api/portal/projects` and receives *only* projects matching `session.user.companyId`.
- **Test 3.2**: Attempt to fetch project belonging to another organization returns `404 Not Found` or `403 Forbidden`.

---

### C. End-to-End (E2E) Test Scenarios (`tests/e2e/...`)

#### Scenario 1: Prospect Inbound Journey
1. Visitor navigates to `/`.
2. Verifies hero section displays exact headline: *"Your Business Deserves More Than an Agency."*
3. Interacts with the Animated Business Ecosystem node graph.
4. Clicks "Book a Strategy Call" -> redirected to `/book-consultation`.
5. Fills and submits the multi-step consultation form.
6. Verifies confirmation message and checks that a CRM record is created.

#### Scenario 2: Super Admin CRM Workflow
1. Super Admin logs into `/admin`.
2. Navigates to `/admin/crm/leads`.
3. Verifies newly created lead appears with calculated score.
4. Opens lead detail view, adds a call note, updates status to `Qualified`.
5. Moves lead to `Won` -> confirms project onboarding trigger dialog appears.

#### Scenario 3: Client Deliverable Approval
1. Client user logs into `/portal`.
2. Navigates to active project -> Milestones -> Deliverables.
3. Opens deliverable preview, enters a feedback comment.
4. Clicks "Approve Deliverable".
5. Verifies deliverable status updates to `Approved` and audit log entry is recorded.

#### Scenario 4: Team Portal Role Views
1. Logs in as `EMPLOYEE` -> verifies only assigned tasks appear; financial menus are absent.
2. Logs in as `FREELANCER` -> verifies only assigned tasks appear; client contract amounts and team billing rates are completely inaccessible.

---

## 4. Accessibility & Performance Verification

- **Automated A11y Audit**:
  - Run `@axe-core/playwright` on all public pages and portal dashboards.
  - Zero critical or serious accessibility violations permitted.
  - Full keyboard navigation test: `Tab`, `Shift+Tab`, `Enter`, `Space`, `Escape`.
- **Performance Benchmarking**:
  - Lighthouse CI run on Mobile and Desktop profiles.
  - Performance Score >= 90 on public landing pages.
  - Core Web Vitals:
    - **Largest Contentful Paint (LCP)**: <= 2.5 seconds
    - **Cumulative Layout Shift (CLS)**: <= 0.1
    - **Interaction to Next Paint (INP)**: <= 200 milliseconds
