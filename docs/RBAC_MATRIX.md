# Role-Based Access Control (RBAC) Matrix: DiziBrand Media

This document defines the security boundaries, authorization matrix, and access enforcement policies across all 7 system roles and exactly 3 operational portals.

---

## 1. Role Definitions & Portal Assignment

| Role | Portal Assignment | Description & Scope |
| :--- | :--- | :--- |
| **`SUPER_ADMIN`** | **Super Admin Portal** (`/admin`) | Unrestricted system-wide access. Manages users, permissions, infrastructure, financial ledgers, and audit logs. |
| **`MANAGEMENT`** | **Super Admin Portal** (`/admin`) | Executive leadership. Full visibility into CRM, pipeline, projects, CMS, and finance; restricted from deleting audit logs or managing root credentials. |
| **`SALES`** | **Team Portal** (`/team/sales`) | Business development. Access to assigned leads, opportunities, proposals, discovery calls, and meetings. No access to delivery tasks or client invoices. |
| **`PROJECT_MANAGER`** | **Team Portal** (`/team/pm`) | Delivery leadership. Full access to assigned projects, milestones, tasks, team allocation, deliverable reviews, and client change requests. |
| **`EMPLOYEE` / Specialist** | **Team Portal** (`/team/specialist`) | Technical execution (Devs, Designers, AI engineers). Access strictly to assigned tasks, specifications, subtasks, and deliverable submissions. |
| **`FREELANCER`** | **Team Portal** (`/team/freelancer`) | External contractor. Strictly limited to assigned tasks, deliverable uploads, and own payment approval status. Zero access to client commercial terms. |
| **`CLIENT`** | **Client Portal** (`/portal`) | Client organization stakeholder. Strictly scoped to own company (`companyId` isolation): view active projects, milestones, deliverables, approve assets, view invoices, raise tickets. |

---

## 2. Role/Portal Access Flow Diagram

```mermaid
flowchart TD
    User([User Logs In / Authenticates]) --> AuthCheck{Valid Credentials?}
    AuthCheck -->|No| LoginError[401 Unauthorized / Redirect to Login]
    AuthCheck -->|Yes| SessionIssue[Issue Signed JWT Session]
    
    SessionIssue --> RoleRouter{Inspect session.user.role}
    
    %% Portal Routing
    RoleRouter -->|SUPER_ADMIN or MANAGEMENT| SuperAdminBranch[Access Super Admin Portal: /admin]
    RoleRouter -->|SALES| TeamSalesBranch[Access Team Portal: /team/sales]
    RoleRouter -->|PROJECT_MANAGER| TeamPMBranch[Access Team Portal: /team/pm]
    RoleRouter -->|EMPLOYEE| TeamSpecBranch[Access Team Portal: /team/specialist]
    RoleRouter -->|FREELANCER| TeamFreeBranch[Access Team Portal: /team/freelancer]
    RoleRouter -->|CLIENT| ClientBranch[Access Client Portal: /portal]

    %% Guard Verification
    subgraph SuperAdminSecurity["Admin Security Boundary"]
        SuperAdminBranch --> SA_Guard{Verify Role IN [SUPER_ADMIN, MANAGEMENT]}
        SA_Guard -->|Pass| AdminViews[Executive Cockpit, CRM, CMS, Finance, RBAC, Logs]
        SA_Guard -->|Fail| Forbidden_403[403 Forbidden]
    end

    subgraph TeamSecurity["Team Security Boundary (Single Portal)"]
        TeamSalesBranch & TeamPMBranch & TeamSpecBranch & TeamFreeBranch --> Team_Guard{Verify Role IN [SALES, PM, EMPLOYEE, FREELANCER]}
        Team_Guard -->|Pass| DynamicRoleView{Render Dynamic View based on Role}
        DynamicRoleView --> SalesView[Sales: Assigned Leads & Pipeline]
        DynamicRoleView --> PMView[PM: Assigned Projects & Sprints]
        DynamicRoleView --> SpecView[Spec: Assigned Tasks & Deliverables]
        DynamicRoleView --> FreeView[Free: Assigned Tasks & Own Payment Status]
        Team_Guard -->|Fail| Forbidden_403
    end

    subgraph ClientSecurity["Client Security Boundary (Multi-Tenant)"]
        ClientBranch --> Client_Guard{Verify Role == CLIENT}
        Client_Guard -->|Pass| TenantFilter[Inject WHERE companyId == session.companyId]
        TenantFilter --> ClientViews[Company Projects, Milestones, Invoices, Tickets]
        Client_Guard -->|Fail| Forbidden_403
    end
```

---

## 3. Comprehensive Entity Permissions Matrix

**Legend**:
- `C` = Create
- `R` = Read
- `U` = Update
- `D` = Delete
- `(A)` = Restricted to Assigned records only
- `(O)` = Restricted to Own Organization records only (`companyId`)
- `-` = No Access (403 Forbidden)

| Entity / Resource | Super Admin | Management | Sales | Project Manager | Employee | Freelancer | Client |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Leads** | CRUD | CRUD | CRUD (A) | R (A) | - | - | - |
| **Companies** | CRUD | CRUD | RU (A) | RU (A) | - | - | R (O) |
| **Contacts** | CRUD | CRUD | CRUD (A) | RU (A) | - | - | RU (O) |
| **Proposals** | CRUD | CRUD | CRU (A) | R (A) | - | - | R (O) |
| **Contracts** | CRUD | CRUD | R (A) | R (A) | - | - | R (O) |
| **Invoices** | CRUD | CRUD | R | R (A) | - | - | R (O) |
| **Payments** | CRUD | CRUD | R | - | - | R (Own status) | R (O) |
| **Projects** | CRUD | CRUD | R (A) | CRUD (A) | R (A) | R (A) | R (O) |
| **Milestones** | CRUD | CRUD | - | CRUD (A) | R (A) | R (A) | RU (O Approvals) |
| **Tasks** | CRUD | CRUD | - | CRUD (A) | RU (A Status) | RU (A Status) | R (O High-level) |
| **Subtasks** | CRUD | CRUD | - | CRUD (A) | CRUD (A) | RU (A) | - |
| **Deliverables** | CRUD | CRUD | - | CRUD (A) | CRU (A) | CRU (A) | RU (O Review/Approve) |
| **Files / Storage** | CRUD | CRUD | R (A) | CRUD (A) | CR (A) | CR (A) | CR (O) |
| **Support Tickets**| CRUD | CRUD | R | CRUD (A) | RU (A) | - | CRU (O) |
| **Freelancers** | CRUD | CRUD | - | RU (Vetting) | - | RU (Own Profile) | - |
| **CMS Pages** | CRUD | CRUD | - | - | - | - | - |
| **Services / Ind.**| CRUD | CRUD | R | R | R | R | R (Public) |
| **Case Studies** | CRUD | CRUD | R | R | - | - | R (Published) |
| **User Mgmt** | CRUD | RU | - | - | - | - | - |
| **Audit Logs** | R | R | - | - | - | - | - |

---

## 4. Server-Side Enforcement Mechanisms

### A. Next.js Edge Middleware
Edge middleware inspects `req.nextauth.token` before any page or route handler is invoked:
- `/admin/*`: Rejects request if `token.role NOT IN ['SUPER_ADMIN', 'MANAGEMENT']`.
- `/team/*`: Rejects request if `token.role NOT IN ['SALES', 'PROJECT_MANAGER', 'EMPLOYEE', 'FREELANCER']`.
- `/portal/*`: Rejects request if `token.role !== 'CLIENT'` or if `token.companyId` is missing.

### B. Route Handler & Server Action Guards (Data Access Layer)
Every mutation and query validates permission within the server-side execution context:

```typescript
export async function assertAuthorized(
  session: Session | null, 
  allowedRoles: Role[], 
  companyIdCheck?: string
) {
  if (!session?.user) {
    throw new ApiError(401, 'Authentication required');
  }

  if (!allowedRoles.includes(session.user.role)) {
    throw new ApiError(403, 'Insufficient permissions for this resource');
  }

  if (session.user.role === 'CLIENT') {
    if (!session.user.companyId) {
      throw new ApiError(403, 'Client account is not associated with an active organization');
    }
    if (companyIdCheck && session.user.companyId !== companyIdCheck) {
      throw new ApiError(403, 'Access to requested organization record is forbidden');
    }
  }
}
```

### C. Freelancer Data Isolation
In the Team Portal, queries executed on behalf of a `FREELANCER` user automatically append:
`WHERE assignedToId = session.user.id`.
Under no circumstances are company financial figures, client contract amounts, or other team members' billing rates returned in API payloads to freelancers.
