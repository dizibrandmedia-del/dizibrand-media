# User Personas & Stakeholder Analysis: DiziBrand Media

This document defines the primary personas across prospective clients, internal executives, operations, delivery specialists, and client stakeholders.

---

## 1. Prospective Decision-Maker Personas (Clients)

### Persona 1: The Visionary Founder / CEO
- **Representative Profile**: Alex Vance, Founder & CEO, FinTech Scale-Up
- **Company Stage**: Series A, 45 employees, scaling rapidly across US & UK.
- **Pain Points**:
  - Burned out by managing 4 separate agency vendors with disjointed reporting.
  - Needs enterprise-grade software architecture and AI automation, but cannot afford a $350k/year full-time CTO yet.
  - Wants a strategic partner who understands unit economics, CAC, LTV, and enterprise security.
- **Goals**:
  - Rapidly build and deploy custom client-facing AI agents.
  - Scale customer acquisition predictably.
  - Have one accountable executive partner (Digital CMO + Digital CTO).
- **Portal & Touchpoints**:
  - Website: Hero ecosystem visual, Digital CMO/CTO pages, Case studies, Book Consultation.
  - Client Portal: Executive dashboard, milestone roadmap, high-level deliverables review, contract/invoice approval.

### Persona 2: The Enterprise Marketing Director
- **Representative Profile**: Sarah Jenkins, VP of Marketing, Mid-Market B2B SaaS
- **Company Stage**: $20M ARR, 180 employees.
- **Pain Points**:
  - In-house marketing team lacks technical engineering bandwidth for deep CRO, HubSpot/Salesforce automation, and international SEO architecture.
  - Traditional ad agencies fail to understand complex technical products.
- **Goals**:
  - Scale high-intent qualified pipeline across North America and EMEA.
  - Modernize web presence with high Core Web Vitals and interactive product demos.
- **Portal & Touchpoints**:
  - Website: Performance Marketing, SEO, Free Audit tool.
  - Client Portal: Campaign deliverables, asset approvals, analytics reports, shared meeting agendas.

### Persona 3: The SME Growth Leader (India / International)
- **Representative Profile**: Rajesh Patel, Managing Director, Manufacturing & D2C Brand (India & UAE)
- **Company Stage**: $8M annual revenue, expanding globally.
- **Pain Points**:
  - Needs transparent pricing in local currency (INR/USD), clear milestones, and structured delivery.
  - Hesitant about digital transformation costs without clear ROI.
- **Goals**:
  - Re-platform legacy e-commerce to headless commerce, implement automated CRM and WhatsApp business workflows.
- **Portal & Touchpoints**:
  - Website: E-commerce, CRM/ERP, WhatsApp direct booking, INR budget options.
  - Client Portal: Invoices, payment history, milestone progress tracking.

---

## 2. Internal Administrative & Leadership Personas

### Persona 4: Super Admin / Managing Executive
- **Representative Profile**: Lead Principal / Managing Partner at DiziBrand Media
- **Responsibilities**:
  - Overall business governance, revenue tracking, client health, sales pipeline oversight.
  - Content approval for CMS, team utilization, contract sign-offs, and security audits.
- **Key Needs**:
  - Real-time visibility into lead pipeline, conversion rates by country and service.
  - Financial health (invoiced vs collected, pipeline value).
  - Complete control over RBAC, team roles, and system audit logs.
- **Portal**: **Super Admin / Management Portal** (Full access across CRM, CMS, Projects, Team, Financials, Settings).

### Persona 5: Sales & Business Development Representative
- **Representative Profile**: Senior Growth Consultant at DiziBrand Media
- **Responsibilities**:
  - Responding to inbound leads within minutes.
  - Running discovery calls, qualifying budgets, creating proposals, negotiating scopes.
- **Key Needs**:
  - Instant notification on new qualified leads with automated lead score breakdown.
  - Structured pipeline stages: New → Contacted → Qualified → Meeting → Proposal → Negotiation → Won/Lost.
  - Activity log: recording call notes, scheduling meetings, tracking proposal interactions.
- **Portal**: **Team Portal (Sales View)** (Access limited to assigned leads, opportunities, proposals, calendar).

---

## 3. Delivery & Operations Personas

### Persona 6: Project Manager / Delivery Lead
- **Representative Profile**: Technical Delivery Lead at DiziBrand Media
- **Responsibilities**:
  - Translating won proposals into active projects, milestones, tasks, and sprints.
  - Coordinating specialists, developers, designers, and vetted freelancers.
  - Managing deadlines, deliverable approvals, and client communications.
- **Key Needs**:
  - Kanban/Gantt milestone boards, task dependency management, time logs, deliverable status.
  - Centralized document repository and client feedback feed.
- **Portal**: **Team Portal (Project Manager View)** (Manage assigned projects, milestones, tasks, team allocation, client change requests).

### Persona 7: Technical Specialist / Full-Stack & AI Engineer
- **Representative Profile**: Senior AI & Full-Stack Engineer at DiziBrand Media
- **Responsibilities**:
  - Executing project tasks: building Next.js applications, training AI agents, writing API integrations, optimizing data pipelines.
- **Key Needs**:
  - Clear task briefs, technical specifications, asset attachments, and deadline tracking.
  - Frictionless submission of deliverables for PM review.
- **Portal**: **Team Portal (Specialist / Employee View)** (Assigned tasks, subtasks, asset uploads, status toggles, discussion threads).

### Persona 8: Vetted Freelancer / External Specialist
- **Representative Profile**: Freelance Motion Designer / Specialized Cloud Architect
- **Responsibilities**:
  - Delivering discrete contracted tasks under PM supervision.
- **Key Needs**:
  - Strict scope visibility: access ONLY to their assigned tasks and deliverables.
  - No visibility into client commercial terms, invoices, or other team members' rates.
  - Real-time status on milestone payment approvals.
- **Portal**: **Team Portal (Freelancer View)** (Restricted to assigned tasks, deliverable uploads, and own payment status).

---

## 4. Client Stakeholder Persona

### Persona 9: Client Project Manager / Team Contact
- **Representative Profile**: Technical Product Manager at Client Organization
- **Responsibilities**:
  - Day-to-day coordination with DiziBrand delivery team.
  - Reviewing draft deliverables, providing structured feedback, approving milestones.
- **Key Needs**:
  - Clean, distraction-free portal with transparent project velocity.
  - Ability to raise support tickets or change requests easily.
  - Access to all project files, meeting recordings, contracts, and invoices.
- **Portal**: **Client Portal** (Strictly isolated to client's own organization data).

---

## 5. Persona-to-Portal Access Mapping Summary

| Persona | Primary Portal | Access Level / Role | Key Scope |
| :--- | :--- | :--- | :--- |
| Super Admin / Managing Exec | Super Admin Portal | `SUPER_ADMIN` / `MANAGEMENT` | Global system, CRM, CMS, Financials, RBAC, Logs |
| Sales Representative | Team Portal | `SALES` | Assigned Leads, Pipeline, Meetings, Proposals |
| Project Manager | Team Portal | `PROJECT_MANAGER` | Assigned Projects, Milestones, Tasks, Team, Approvals |
| Specialist / Employee | Team Portal | `EMPLOYEE` | Assigned Tasks, Deliverables, Specs, Status |
| Freelancer | Team Portal | `FREELANCER` | Assigned Tasks, Deliverables, Own Payment Status |
| Client Stakeholder | Client Portal | `CLIENT` | Organization-scoped Projects, Docs, Invoices, Tickets |
| Prospective Client | Public Website | `ANONYMOUS` | Public pages, Lead Forms, Audit, Consultation booking |
