# Information Architecture & Sitemap: DiziBrand Media

This document defines the complete structural hierarchy, URL taxonomy, navigation systems, and cross-linking strategies across the Public Website, Super Admin Portal, Team Portal, and Client Portal.

---

## 1. Global System Hierarchy

```
                                  [dizibrandmedia.com]
                                            │
        ┌───────────────────────────────────┼───────────────────────────────────┐
        ▼                                   ▼                                   ▼
 [Public Website]                   [Internal Portals]                   [Client Portal]
  / (Homepage)                       /admin (Super Admin)                 /portal (Client Org)
  /services/*                        /team  (Team Portal)                 /portal/projects/*
  /digital-cmo                                                            /portal/invoices/*
  /digital-cto                                                            /portal/support/*
  /industries/*
  /work/*
  /insights/*
  /book-consultation
  /free-audit
  /freelancers
```

---

## 2. Public Website URL Structure

### A. Core & Brand Pages
- `/` — Homepage (18 required sections, animated ecosystem visual, primary CTAs)
- `/about` — Origin, philosophy, executive leadership, global operating model
- `/team` — Core leadership and practice heads (neutral placeholders until verified)
- `/careers` — Open positions, culture, benefits, application flow
- `/freelancers` — External specialist network application and vetting intake
- `/contact` — Headquarters, regional hubs, contact channels, interactive lead intake

### B. Executive Leadership (Fractional C-Suite)
- `/digital-cmo` — Fractional Chief Marketing Officer service offering, strategic frameworks, deliverables
- `/digital-cto` — Fractional Chief Technology Officer service offering, tech architecture, AI adoption roadmaps

### C. Services & Solutions (`/services/...`)
- `/services` — Comprehensive capabilities index
- **Marketing & Growth**:
  - `/services/marketing-and-growth` — Strategic marketing overview
  - `/services/performance-marketing` — Paid acquisition (Meta, Google, LinkedIn, programmatic)
  - `/services/lead-generation` — B2B outbound, inbound lead magnets, ABM pipelines
  - `/services/seo` — Technical SEO, content strategy, international SEO
  - `/services/social-media` — Organic brand growth, B2B thought leadership
  - `/services/branding` — Brand identity, design systems, messaging guides
- **Technology & Engineering**:
  - `/services/technology` — Engineering capabilities overview
  - `/services/website-development` — High-performance corporate Next.js websites
  - `/services/software-development` — Custom web apps, APIs, microservices
  - `/services/app-development` — Cross-platform iOS & Android mobile apps
  - `/services/saas-development` — Multi-tenant cloud SaaS products
  - `/services/crm-erp` — Salesforce, HubSpot, custom CRM/ERP implementations
- **AI & Automation**:
  - `/services/ai-automation` — Robotic process automation, workflow intelligence
  - `/services/ai-agents` — Autonomous LLM agents, customer service bots, agentic workflows
- **Data & Intelligence**:
  - `/services/data-analytics` — Data pipelines, modern data stack, attribution modeling
  - `/services/business-intelligence` — Executive dashboards, KPI monitoring, predictive forecasting
- **Transformation**:
  - `/services/digital-transformation` — Legacy modernization, cloud migration, operational re-platforming

### D. Industry Solutions (`/industries/...`)
- `/industries` — Industries index
- `/industries/saas-b2b` — SaaS & B2B Technology
- `/industries/ecommerce-d2c` — E-commerce & Direct-to-Consumer
- `/industries/real-estate-proptech` — Real Estate & Property Technology
- `/industries/healthcare-healthtech` — Healthcare & Life Sciences
- `/industries/education-edtech` — Education & EdTech
- `/industries/bfsi-fintech` — Banking, Financial Services, Insurance & FinTech
- `/industries/manufacturing-logistics` — Manufacturing, Supply Chain & Logistics

### E. Work, Case Studies & Insights
- `/work` — Case studies portfolio filterable by industry, service, and outcome
- `/work/[slug]` — Deep-dive case study (with "Pending verification" markers until client approval)
- `/insights` — Articles, playbooks, whitepapers, thought leadership
- `/insights/[slug]` — Editorial article with author attribution, reading time, table of contents
- `/insights/category/[slug]` — Filtered insight archive

### F. Conversion Funnels & Tools
- `/book-consultation` — Strategy call scheduler with consultation type and calendar adapter
- `/free-audit` — Interactive audit intake (Website, SEO, Social, Ads, CRO, Digital Presence)

### G. Legal & Governance
- `/privacy-policy` — GDPR, CCPA, and DPDP-compliant data privacy statement
- `/terms-of-service` — Service usage agreements, intellectual property terms
- `/cookie-policy` — Tracking transparency, consent banner configuration

---

## 3. Super Admin / Management Portal IA (`/admin/...`)

Strictly restricted to `SUPER_ADMIN` and `MANAGEMENT` roles:
- `/admin` — Executive Cockpit: Pipeline value, conversion rates, MRR, active projects, team utilization
- `/admin/crm`
  - `/admin/crm/leads` — Master lead table, filterable by country, service, score, status
  - `/admin/crm/leads/[id]` — Detailed lead view, score breakdown, notes, call logs, meeting history
  - `/admin/crm/pipeline` — Kanban board (New → Contacted → Qualified → Meeting → Proposal → Negotiation → Won/Lost)
  - `/admin/crm/companies` — Company profiles, associated contacts, revenue history
  - `/admin/crm/contacts` — Individual business contacts directory
  - `/admin/crm/proposals` — Proposal builder, status tracking, approval states
- `/admin/projects`
  - `/admin/projects/active` — All active client engagements, health indicators (Green/Amber/Red)
  - `/admin/projects/[id]` — Full project management view (milestones, tasks, financial status)
- `/admin/cms`
  - `/admin/cms/pages` — Homepage & landing page section content managers
  - `/admin/cms/services` — Service descriptions, deliverables lists, pricing tiers
  - `/admin/cms/case-studies` — Case study editor (draft, pending verification, published)
  - `/admin/cms/insights` — Blog / article publishing engine with rich markdown editor
  - `/admin/cms/team` — Executive & practice head profiles
  - `/admin/cms/seo` — Global metadata, sitemap overrides, Open Graph tags
- `/admin/team`
  - `/admin/team/members` — Employee and specialist directory, skills, allocation
  - `/admin/team/freelancers` — Freelancer applicant pool, vetting status, contracts
- `/admin/finance`
  - `/admin/finance/invoices` — Global invoice ledger, pending, paid, overdue
  - `/admin/finance/contracts` — Executed master services agreements (MSAs) & statements of work (SOWs)
- `/admin/settings`
  - `/admin/settings/users` — User management, invite triggers
  - `/admin/settings/roles` — RBAC permissions matrix inspector
  - `/admin/settings/audit-logs` — Immutable audit log of all administrative actions
  - `/admin/settings/integrations` — API keys & adapter health (Email, WhatsApp, Calendar, Storage)

---

## 4. Team Portal IA (`/team/...`)

A single, unified portal with role-based component rendering and route guards:

### Shared Routes
- `/team` — Personalized home dashboard based on role (Sales vs PM vs Employee vs Freelancer)
- `/team/profile` — User profile, notification preferences, credentials

### Sales View (`/team/sales/...`)
- `/team/sales/leads` — My assigned leads & score indicators
- `/team/sales/pipeline` — Personal deal pipeline
- `/team/sales/meetings` — Scheduled calls & calendar sync
- `/team/sales/proposals` — Draft and delivered proposals

### Project Manager View (`/team/pm/...`)
- `/team/pm/projects` — Assigned projects
- `/team/pm/projects/[id]/milestones` — Milestone roadmap & Gantt view
- `/team/pm/projects/[id]/tasks` — Sprint task board (To Do, In Progress, In Review, Done)
- `/team/pm/projects/[id]/team` — Resource allocation and workload balancing
- `/team/pm/projects/[id]/client-approvals` — Deliverable approval requests & change orders

### Specialist / Employee View (`/team/specialist/...`)
- `/team/specialist/tasks` — My assigned tasks across all projects, sorted by due date
- `/team/specialist/tasks/[id]` — Task detail, technical requirements, file attachments
- `/team/specialist/deliverables` — Deliverable upload & review submission

### Freelancer View (`/team/freelancer/...`)
- `/team/freelancer/tasks` — Strictly assigned tasks and milestones
- `/team/freelancer/tasks/[id]` — Scope brief, deliverable upload
- `/team/freelancer/payments` — Milestone approval status and payment release status (restricted to own tasks)

---

## 5. Client Portal IA (`/portal/...`)

Strictly isolated to client organization contacts:
- `/portal` — Organization Dashboard: Active projects summary, upcoming milestones, recent deliverables
- `/portal/projects` — Projects list for the organization
- `/portal/projects/[id]`
  - `/portal/projects/[id]/overview` — Scope, timeline, assigned DiziBrand team
  - `/portal/projects/[id]/milestones` — High-level milestone progress tracker
  - `/portal/projects/[id]/deliverables` — Asset review and formal approval interface
  - `/portal/projects/[id]/documents` — Executed SOWs, architecture diagrams, reports
- `/portal/invoices` — Billing history, pending invoices, receipt downloads, payment link
- `/portal/meetings` — Recorded strategy sessions, upcoming calendar links
- `/portal/support` — Open support tickets, change requests, SLAs

---

## 6. Content Taxonomy & Cross-Linking Architecture

To maximize SEO equity and user conversion velocity, content entities are interconnected:

```
                  ┌───────────────┐
                  │    Services   │
                  └───────┬───────┘
                          │ (Offers solution for)
                          ▼
                  ┌───────────────┐
      ┌───────────┤  Industries   ├───────────┐
      │           └───────────────┘           │
      │ (Addresses)               (Provides)  │
      ▼                                       ▼
┌───────────────┐                       ┌───────────────┐
│  Case Studies │◀──────────────────────┤   Insights    │
└───────────────┘   (References proof)  └───────────────┘
```

1. **Service Pages** link to:
   - Specific relevant Industry solutions (e.g., Performance Marketing -> E-commerce & D2C).
   - Proven Case Studies demonstrating that capability.
   - Authoritative Insights authored by the Digital CMO / CTO.
2. **Industry Pages** link to:
   - Primary bundled Services recommended for that sector.
   - Sector-specific Case Studies and client challenges.
3. **Case Studies** link to:
   - Executed Services.
   - Client Industry.
   - Relevant Insights explaining the methodology.
4. **Insights** link to:
   - Recommended Service for solving the discussed problem.
   - Direct CTA to `/book-consultation` or `/free-audit`.
