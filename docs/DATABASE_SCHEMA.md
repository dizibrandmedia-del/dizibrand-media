# Database Schema Specification: DiziBrand Media

This document defines the normalized PostgreSQL relational database schema for the DiziBrand Media platform, structured for Prisma ORM.

---

## 1. Schema Overview & Statistics

- **Total Entities**: 35 normalized tables
- **Total Enums**: 14 domain-specific enumeration types
- **Multi-Tenant Scoping**: All client-accessible records enforce `companyId` foreign key isolation.
- **Auditability**: All transactional records include `createdAt`, `updatedAt`, and optional soft-delete `deletedAt`.

---

## 2. Enumerations

```prisma
enum Role {
  SUPER_ADMIN
  MANAGEMENT
  SALES
  PROJECT_MANAGER
  EMPLOYEE
  FREELANCER
  CLIENT
}

enum LeadStatus {
  NEW
  CONTACTED
  QUALIFIED
  MEETING
  PROPOSAL
  NEGOTIATION
  WON
  LOST
}

enum BudgetTier {
  UNDER_2500
  TIER_2500_5000
  TIER_5000_10000
  TIER_10000_25000
  ABOVE_25000
  NOT_SURE
  INR_UNDER_2L
  INR_2L_4L
  INR_4L_8L
  INR_8L_20L
  INR_ABOVE_20L
}

enum ProjectStatus {
  PLANNING
  KICKOFF
  ACTIVE
  ON_HOLD
  IN_REVIEW
  COMPLETED
  ARCHIVED
}

enum MilestoneStatus {
  UPCOMING
  IN_PROGRESS
  PENDING_CLIENT_APPROVAL
  APPROVED
  COMPLETED
}

enum TaskStatus {
  BACKLOG
  TODO
  IN_PROGRESS
  IN_REVIEW
  COMPLETED
  BLOCKED
}

enum Priority {
  LOW
  MEDIUM
  HIGH
  URGENT
}

enum ProposalStatus {
  DRAFT
  INTERNAL_REVIEW
  SENT
  VIEWED
  ACCEPTED
  REJECTED
  EXPIRED
}

enum ContractStatus {
  DRAFT
  SENT_FOR_SIGNATURE
  EXECUTED
  AMENDED
  TERMINATED
}

enum InvoiceStatus {
  DRAFT
  SENT
  PARTIALLY_PAID
  PAID
  OVERDUE
  VOIDED
}

enum PaymentMethod {
  STRIPE
  RAZORPAY
  BANK_TRANSFER
  WIRE
}

enum TicketCategory {
  BUG
  CHANGE_REQUEST
  GENERAL_QUESTION
  ASSET_REQUEST
  BILLING
}

enum TicketStatus {
  OPEN
  IN_PROGRESS
  AWAITING_CLIENT_RESPONSE
  RESOLVED
  CLOSED
}

enum AuditAction {
  CREATE
  UPDATE
  DELETE
  LOGIN
  LOGOUT
  ROLE_CHANGE
  STATUS_CHANGE
  PAYMENT_RECORDED
  DELIVERABLE_APPROVED
}
```

---

## 3. Entity Definitions & Relational Architecture

### A. Identity, Authentication & Access Control

#### `User`
Primary identity table for all system users across all 3 portals.
- `id`: String (UUID/cuid) - Primary Key
- `name`: String
- `email`: String - Unique
- `emailVerified`: DateTime?
- `passwordHash`: String? (null if using OAuth/SSO)
- `image`: String?
- `phone`: String?
- `role`: Role (Default: `CLIENT`)
- `companyId`: String? -> References `Company.id` (Required for `CLIENT` role)
- `isActive`: Boolean (Default: `true`)
- `createdAt`: DateTime (Default: `now()`)
- `updatedAt`: DateTime (Updated at `now()`)
- *Indexes*: `[email]`, `[companyId]`, `[role]`

#### `Permission`
Fine-grained capability flags for administrative roles.
- `id`: String - Primary Key
- `code`: String - Unique (e.g., `crm:leads:delete`, `cms:publish`, `finance:invoices:create`)
- `description`: String

#### `RolePermission`
Join table mapping roles to explicit permissions.
- `id`: String - Primary Key
- `role`: Role
- `permissionId`: String -> References `Permission.id`
- *Unique Constraint*: `[role, permissionId]`

#### `Session`
Auth.js active session tracking.
- `id`: String - Primary Key
- `sessionToken`: String - Unique
- `userId`: String -> References `User.id` (Cascade delete)
- `expires`: DateTime

---

### B. CRM & Lead Management

#### `Company`
Represents client organizations, partner firms, and prospective enterprise accounts.
- `id`: String - Primary Key
- `name`: String
- `website`: String?
- `industryId`: String? -> References `Industry.id`
- `country`: String
- `city`: String?
- `annualRevenue`: String?
- `employeeCount`: String?
- `createdAt`: DateTime
- `updatedAt`: DateTime

#### `Contact`
Individual business contacts associated with a Company.
- `id`: String - Primary Key
- `companyId`: String -> References `Company.id`
- `firstName`: String
- `lastName`: String
- `email`: String - Unique
- `phone`: String?
- `jobTitle`: String?
- `isPrimary`: Boolean (Default: `false`)
- `createdAt`: DateTime

#### `Lead`
Inbound prospect record captured from public website forms, audits, or outbound sourcing.
- `id`: String - Primary Key
- `firstName`: String
- `lastName`: String
- `email`: String
- `phone`: String?
- `country`: String
- `companyName`: String
- `website`: String?
- `serviceId`: String? -> References `Service.id`
- `serviceName`: String?
- `projectDescription`: String (Text)
- `budgetTier`: BudgetTier
- `timeline`: String?
- `status`: LeadStatus (Default: `NEW`)
- `score`: Int (Default: `0`, calculated by Lead Scoring Engine)
- `scoreBreakdown`: Json? (Stores scoring factor points)
- `source`: String (Default: `website_lead_form`)
- `utmSource`: String?
- `utmMedium`: String?
- `utmCampaign`: String?
- `assignedToId`: String? -> References `User.id` (Sales representative)
- `companyId`: String? -> References `Company.id` (Linked when qualified)
- `privacyConsent`: Boolean (Default: `true`)
- `createdAt`: DateTime
- `updatedAt`: DateTime
- *Indexes*: `[status]`, `[score]`, `[assignedToId]`, `[email]`, `[country]`

#### `LeadScoreHistory`
Tracks progression of lead scores over time based on engagement.
- `id`: String - Primary Key
- `leadId`: String -> References `Lead.id`
- `scoreBefore`: Int
- `scoreAfter`: Int
- `reason`: String
- `createdAt`: DateTime

#### `Call`
Phone and discovery call records.
- `id`: String - Primary Key
- `leadId`: String? -> References `Lead.id`
- `companyId`: String? -> References `Company.id`
- `conductedById`: String -> References `User.id`
- `callDate`: DateTime
- `durationSeconds`: Int?
- `outcome`: String?
- `notes`: String (Text)
- `createdAt`: DateTime

#### `Meeting`
Scheduled consultations, strategy sessions, and kickoff calls.
- `id`: String - Primary Key
- `title`: String
- `leadId`: String? -> References `Lead.id`
- `projectId`: String? -> References `Project.id`
- `companyId`: String? -> References `Company.id`
- `hostId`: String -> References `User.id`
- `scheduledAt`: DateTime
- `durationMinutes`: Int (Default: `45`)
- `meetingUrl`: String?
- `calendarEventId`: String?
- `status`: String (Scheduled, Completed, Cancelled, No-Show)
- `notes`: String?

#### `Note`
Free-form collaborative notes attached to leads, companies, or projects.
- `id`: String - Primary Key
- `content`: String (Text)
- `authorId`: String -> References `User.id`
- `leadId`: String? -> References `Lead.id`
- `companyId`: String? -> References `Company.id`
- `projectId`: String? -> References `Project.id`
- `createdAt`: DateTime

#### `Activity`
Chronological timeline events across CRM and Projects.
- `id`: String - Primary Key
- `actorId`: String? -> References `User.id`
- `entityType`: String (Lead, Project, Invoice, Task)
- `entityId`: String
- `action`: String
- `description`: String
- `metadata`: Json?
- `createdAt`: DateTime
- *Indexes*: `[entityType, entityId]`, `[actorId]`

---

### C. Commercials, Proposals & Contracts

#### `Proposal`
Commercial pitch and scope document prepared for qualified prospects.
- `id`: String - Primary Key
- `proposalNumber`: String - Unique (e.g., `PROP-2026-001`)
- `leadId`: String? -> References `Lead.id`
- `companyId`: String -> References `Company.id`
- `createdById`: String -> References `User.id`
- `title`: String
- `scopeOverview`: String (Text)
- `totalAmount`: Decimal (12, 2)
- `currency`: String (Default: `USD`)
- `status`: ProposalStatus (Default: `DRAFT`)
- `validUntil`: DateTime
- `viewedAt`: DateTime?
- `acceptedAt`: DateTime?
- `pdfUrl`: String?
- `createdAt`: DateTime
- `updatedAt`: DateTime

#### `Contract`
Executed legal agreement (MSA / SOW).
- `id`: String - Primary Key
- `contractNumber`: String - Unique (e.g., `CTR-2026-001`)
- `proposalId`: String? -> References `Proposal.id`
- `companyId`: String -> References `Company.id`
- `title`: String
- `status`: ContractStatus (Default: `DRAFT`)
- `signedDate`: DateTime?
- `effectiveDate`: DateTime
- `expiryDate`: DateTime?
- `documentUrl`: String
- `createdAt`: DateTime

#### `Invoice`
Billing statements issued to client organizations.
- `id`: String - Primary Key
- `invoiceNumber`: String - Unique (e.g., `INV-2026-001`)
- `companyId`: String -> References `Company.id`
- `projectId`: String? -> References `Project.id`
- `amount`: Decimal (12, 2)
- `taxAmount`: Decimal (12, 2) (Default: `0.00`)
- `totalAmount`: Decimal (12, 2)
- `currency`: String (Default: `USD`)
- `status`: InvoiceStatus (Default: `DRAFT`)
- `dueDate`: DateTime
- `paidAt`: DateTime?
- `stripePaymentIntentId`: String?
- `razorpayOrderId`: String?
- `pdfUrl`: String?
- `createdAt`: DateTime
- `updatedAt`: DateTime
- *Indexes*: `[companyId]`, `[status]`, `[dueDate]`

#### `Payment`
Individual payment transactions.
- `id`: String - Primary Key
- `invoiceId`: String -> References `Invoice.id`
- `amount`: Decimal (12, 2)
- `currency`: String
- `method`: PaymentMethod
- `transactionReference`: String?
- `status`: String (Success, Failed, Pending, Refunded)
- `paymentDate`: DateTime
- `createdAt`: DateTime

---

### D. Project Delivery, Milestones & Tasks

#### `Project`
Central delivery engagement entity.
- `id`: String - Primary Key
- `projectCode`: String - Unique (e.g., `PRJ-0101`)
- `name`: String
- `companyId`: String -> References `Company.id`
- `leadId`: String? -> References `Lead.id`
- `managerId`: String? -> References `User.id` (Assigned PM)
- `status`: ProjectStatus (Default: `PLANNING`)
- `health`: String (Green, Amber, Red - Default: `Green`)
- `startDate`: DateTime?
- `targetDate`: DateTime?
- `completedDate`: DateTime?
- `budget`: Decimal (12, 2)?
- `currency`: String (Default: `USD`)
- `createdAt`: DateTime
- `updatedAt`: DateTime
- *Indexes*: `[companyId]`, `[managerId]`, `[status]`

#### `Milestone`
Major project phase or deliverable checkpoint.
- `id`: String - Primary Key
- `projectId`: String -> References `Project.id` (Cascade delete)
- `title`: String
- `description`: String?
- `order`: Int
- `status`: MilestoneStatus (Default: `UPCOMING`)
- `dueDate`: DateTime?
- `completedDate`: DateTime?
- `isClientApprovalRequired`: Boolean (Default: `true`)
- `clientApprovedAt`: DateTime?
- `clientApprovedById`: String? -> References `User.id`
- `createdAt`: DateTime

#### `Task`
Actionable unit of work assigned to team members or freelancers.
- `id`: String - Primary Key
- `milestoneId`: String -> References `Milestone.id`
- `projectId`: String -> References `Project.id`
- `title`: String
- `description`: String? (Text)
- `status`: TaskStatus (Default: `TODO`)
- `priority`: Priority (Default: `MEDIUM`)
- `assignedToId`: String? -> References `User.id`
- `dueDate`: DateTime?
- `estimatedHours`: Decimal (5, 2)?
- `actualHours`: Decimal (5, 2)?
- `createdAt`: DateTime
- `updatedAt`: DateTime
- *Indexes*: `[projectId]`, `[milestoneId]`, `[assignedToId]`, `[status]`

#### `Subtask`
Atomic checklist items within a task.
- `id`: String - Primary Key
- `taskId`: String -> References `Task.id` (Cascade delete)
- `title`: String
- `isCompleted`: Boolean (Default: `false`)
- `completedAt`: DateTime?
- `createdAt`: DateTime

#### `Deliverable`
Formal output submitted for internal or client review.
- `id`: String - Primary Key
- `projectId`: String -> References `Project.id`
- `milestoneId`: String? -> References `Milestone.id`
- `title`: String
- `description`: String?
- `fileUrl`: String?
- `externalLink`: String?
- `status`: String (Draft, In_Review, Approved, Changes_Requested)
- `submittedById`: String -> References `User.id`
- `reviewedById`: String? -> References `User.id`
- `feedback`: String? (Text)
- `createdAt`: DateTime
- `updatedAt`: DateTime

#### `ProjectMember`
Team members and specialists staffed on a project.
- `id`: String - Primary Key
- `projectId`: String -> References `Project.id`
- `userId`: String -> References `User.id`
- `roleInProject`: String (Lead Dev, Designer, SEO Specialist, etc.)
- *Unique Constraint*: `[projectId, userId]`

---

### E. Collaboration, Documents & Support

#### `FileAttachment`
Metadata for uploaded files stored in S3/Cloudflare R2.
- `id`: String - Primary Key
- `fileName`: String
- `fileSize`: Int
- `mimeType`: String
- `s3Key`: String
- `s3Url`: String
- `uploadedById`: String -> References `User.id`
- `companyId`: String? -> References `Company.id`
- `projectId`: String? -> References `Project.id`
- `taskId`: String? -> References `Task.id`
- `createdAt`: DateTime

#### `Message`
Comment threads on tasks, deliverables, and project milestones.
- `id`: String - Primary Key
- `content`: String (Text)
- `authorId`: String -> References `User.id`
- `projectId`: String? -> References `Project.id`
- `taskId`: String? -> References `Task.id`
- `deliverableId`: String? -> References `Deliverable.id`
- `isInternalOnly`: Boolean (Default: `false` - true hides message from client)
- `createdAt`: DateTime

#### `SupportTicket`
Client inquiries, bugs, and change requests.
- `id`: String - Primary Key
- `ticketNumber`: String - Unique (e.g., `TCK-1001`)
- `companyId`: String -> References `Company.id`
- `projectId`: String? -> References `Project.id`
- `createdById`: String -> References `User.id`
- `assignedToId`: String? -> References `User.id`
- `title`: String
- `description`: String (Text)
- `category`: TicketCategory
- `priority`: Priority (Default: `MEDIUM`)
- `status`: TicketStatus (Default: `OPEN`)
- `resolvedAt`: DateTime?
- `createdAt`: DateTime
- `updatedAt`: DateTime
- *Indexes*: `[companyId]`, `[status]`

#### `Notification`
In-app and email alert notifications.
- `id`: String - Primary Key
- `userId`: String -> References `User.id` (Cascade delete)
- `title`: String
- `body`: String
- `link`: String?
- `isRead`: Boolean (Default: `false`)
- `createdAt`: DateTime

---

### F. Talent & Freelancer Management

#### `FreelancerProfile`
Extended profile for vetted freelance specialists.
- `id`: String - Primary Key
- `userId`: String - Unique -> References `User.id`
- `skills`: String[] (PostgreSQL Array or JSON)
- `hourlyRate`: Decimal (8, 2)?
- `currency`: String (Default: `USD`)
- `portfolioUrl`: String?
- `githubUrl`: String?
- `linkedinUrl`: String?
- `availabilityHoursPerWeek`: Int?
- `isVetted`: Boolean (Default: `false`)
- `vettedDate`: DateTime?
- `notes`: String?

#### `FreelancerApplication`
Inbound applications from `/freelancers`.
- `id`: String - Primary Key
- `fullName`: String
- `email`: String - Unique
- `phone`: String?
- `portfolioUrl`: String
- `primarySpecialty`: String
- `experienceYears`: Int
- `desiredHourlyRate`: String
- `resumeUrl`: String?
- `status`: String (Pending, Reviewing, Accepted, Rejected)
- `reviewedById`: String? -> References `User.id`
- `createdAt`: DateTime

---

### G. CMS, Editorial & Content

#### `Service`
Official service offerings catalog.
- `id`: String - Primary Key
- `slug`: String - Unique (e.g., `performance-marketing`, `ai-agents`, `digital-cmo`)
- `title`: String
- `tagline`: String
- `category`: String (Marketing, Technology, AI, Data, Leadership)
- `description`: String (Text)
- `benefits`: Json (Array of bullet points)
- `deliverables`: Json (Array of tangible deliverables)
- `isFeatured`: Boolean (Default: `false`)
- `order`: Int (Default: `0`)
- `createdAt`: DateTime

#### `Industry`
Target industry solutions.
- `id`: String - Primary Key
- `slug`: String - Unique (e.g., `saas-b2b`, `ecommerce-d2c`)
- `name`: String
- `headline`: String
- `overview`: String (Text)
- `challenges`: Json
- `solutions`: Json
- `order`: Int (Default: `0`)

#### `CaseStudy`
Portfolio items with strict verification flags.
- `id`: String - Primary Key
- `slug`: String - Unique
- `title`: String
- `clientName`: String (e.g., "B2B SaaS Scale-Up" if confidential)
- `isVerified`: Boolean (Default: `false` - MUST BE TRUE TO PUBLISH PUBLICLY)
- `verificationStatus`: String (Default: `Pending verification`)
- `industryId`: String? -> References `Industry.id`
- `serviceId`: String? -> References `Service.id`
- `challenge`: String (Text)
- `solution`: String (Text)
- `results`: Json? (e.g., verified metrics only)
- `featuredImage`: String?
- `isPublished`: Boolean (Default: `false`)
- `createdAt`: DateTime

#### `TeamProfile`
Leadership team and practice heads.
- `id`: String - Primary Key
- `fullName`: String
- `roleTitle`: String (e.g., "Practice Lead, AI Automation")
- `bio`: String (Text)
- `avatarUrl`: String?
- `linkedinUrl`: String?
- `isLeadership`: Boolean (Default: `false`)
- `order`: Int (Default: `0`)

#### `BlogPost`
Insights, playbooks, and thought leadership articles.
- `id`: String - Primary Key
- `slug`: String - Unique
- `title`: String
- `excerpt`: String
- `content`: String (Text/Markdown)
- `authorId`: String -> References `User.id`
- `category`: String
- `tags`: String[]
- `coverImage`: String?
- `readingTimeMinutes`: Int
- `isPublished`: Boolean (Default: `false`)
- `publishedAt`: DateTime?
- `createdAt`: DateTime
- `updatedAt`: DateTime

#### `Testimonial`
Client reviews subject to strict verification.
- `id`: String - Primary Key
- `authorName`: String
- `authorTitle`: String
- `companyName`: String
- `content`: String (Text)
- `isVerified`: Boolean (Default: `false`)
- `isPublished`: Boolean (Default: `false`)
- `createdAt`: DateTime

#### `CmsPage`
Dynamic page section copy, meta titles, descriptions.
- `id`: String - Primary Key
- `path`: String - Unique (e.g., `/`, `/about`, `/contact`)
- `metaTitle`: String
- `metaDescription`: String
- `ogImage`: String?
- `contentJson`: Json
- `updatedAt`: DateTime

---

### H. Governance, Analytics & System Health

#### `AnalyticsEvent`
Client-side and server-side tracking events for conversion optimization.
- `id`: String - Primary Key
- `eventName`: String (e.g., `page_view`, `cta_click`, `form_submit`, `book_call`)
- `userId`: String?
- `sessionId`: String?
- `url`: String
- `referrer`: String?
- `country`: String?
- `metadata`: Json?
- `timestamp`: DateTime (Default: `now()`)
- *Indexes*: `[eventName]`, `[timestamp]`

#### `AuditLog`
Immutable compliance and security trail.
- `id`: String - Primary Key
- `actorId`: String? -> References `User.id`
- `actorEmail`: String?
- `action`: AuditAction
- `entityType`: String
- `entityId`: String
- `ipAddress`: String?
- `userAgent`: String?
- `changes`: Json? (Before and after state snapshots)
- `createdAt`: DateTime (Default: `now()`)
- *Indexes*: `[actorId]`, `[action]`, `[entityType, entityId]`, `[createdAt]`
