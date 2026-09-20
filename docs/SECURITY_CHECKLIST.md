# Security Checklist & Threat Mitigation: DiziBrand Media

This document details the security controls, OWASP Top 10 mitigations, compliance measures, and operational safeguards implemented across the DiziBrand Media platform.

---

## 1. OWASP Top 10 Mitigation Matrix

| OWASP Vulnerability | Risk Level | Mitigation Strategy & Implementation | Verification Method |
| :--- | :---: | :--- | :--- |
| **A01: Broken Access Control** | **Critical** | Multi-tier RBAC: Edge middleware validates JWT role; Server-side Data Access Layer (DAL) enforces `WHERE companyId = session.user.companyId` for client queries. Freelancer queries restricted to assigned tasks. | Integration tests in `tests/integration/client-isolation.test.ts` verifying cross-tenant 403 rejection. |
| **A02: Cryptographic Failures** | **High** | HTTPS enforced in production (`Strict-Transport-Security: max-age=63072000`). Session tokens stored in `__Secure-` HTTP-only, SameSite=Lax cookies. Passwords hashed using `bcrypt` (work factor 12) or `argon2id`. | SSL Labs A+ rating, cookie flag audit in browser devtools. |
| **A03: Injection (SQL / XSS)** | **High** | 100% parameterized queries via Prisma ORM (no raw SQL concatenations). React automatically escapes JSX content against XSS. Zod sanitizes and strips unknown payload fields. | Automated code analysis, Zod schema unit tests, input fuzzing. |
| **A04: Insecure Design** | **Medium** | Architecture designed with tenant boundaries, rate limiting on lead submissions, and anti-spam verification (honeypot + Turnstile/reCAPTCHA adapter). | Threat modeling review and load testing on `/api/leads`. |
| **A05: Security Misconfiguration** | **Medium** | Automated deployment of HTTP security headers (CSP, X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy). Minimal error messages exposed to clients. | SecurityHeaders.com audit, staging configuration verification. |
| **A06: Vulnerable Components** | **Medium** | Automated `npm audit` in CI pipeline. Dependabot alerts enabled. Pinning production dependency versions in `package-lock.json`. | Zero high/critical vulnerabilities in `npm audit`. |
| **A07: Auth & Identification Failures** | **High** | Secure session expiration (30 days with rolling refresh). Rate limiting on `/api/auth/callback/credentials`. Cryptographically random 32-byte tokens for password reset and invitations (expiring in 72h). | Brute-force simulation, token expiration validation tests. |
| **A08: Software & Data Integrity** | **Medium** | File uploads do not touch the application server directly; client requests presigned S3/R2 upload URLs with strict MIME type (`image/*`, `application/pdf`) and size limits (<25MB). | File upload validation tests with spoofed MIME types. |
| **A09: Logging & Monitoring Failures** | **Medium** | Immutable `AuditLogs` table logs all sensitive actions (role modification, lead status changes, payments, user deactivations). No PII or credentials logged. | Audit log inspection after administrative mutations. |
| **A10: Server-Side Request Forgery (SSRF)** | **Low** | External webhooks and calendar links must match an allowlist of approved domains (`cal.com`, `google.com`, `stripe.com`, `razorpay.com`). | Webhook URL validation tests rejecting internal IPs (`127.0.0.1`, `169.254.169.254`). |

---

## 2. HTTP Security Headers Specification

Next.js `next.config.js` configures the following production headers:

```javascript
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://*.sanity.io https://api.stripe.com https://api.razorpay.com;",
  },
];
```

---

## 3. Data Privacy & Regulatory Compliance (GDPR, CCPA, DPDP Act 2023)

- **Explicit Consent**: All public lead forms, audit requests, and consultation bookings require an unchecked opt-in checkbox for data processing:
  `"I agree to the privacy policy and consent to DiziBrand Media contacting me regarding this inquiry."`
- **Data Subject Rights**:
  - Right to Access: Client users can export their account data and invoices via the Client Portal.
  - Right to Erasure ("Right to be Forgotten"): Super Admin can trigger hard-delete or anonymization of non-financial lead records upon verified request.
  - Financial records (Invoices, Contracts) are retained in compliance with statutory tax retention periods.
- **Data Minimization**: The platform only collects information necessary to execute the commercial engagement (Name, Business Email, Company, Project Needs, Budget).

---

## 4. Secrets & Environment Variable Policy

1. **No Committed Secrets**:
   - `.gitignore` includes `.env`, `.env.local`, `.env.production`.
   - `.env.example` provides comprehensive documentation with dummy placeholder values for every required variable.
2. **Runtime Validation**:
   - Application startup validates all required environment variables using a Zod schema in `src/lib/env.ts`.
   - Missing required keys fail fast with a descriptive error message before any HTTP listener binds.
