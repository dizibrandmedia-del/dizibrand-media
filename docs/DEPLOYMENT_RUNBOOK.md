# Deployment & Operational Runbook: DiziBrand Media

This runbook documents the deployment architecture, environment configuration, database migration workflows, disaster recovery procedures, and operational monitoring for the DiziBrand Media platform.

---

## 1. Deployment Topology

The platform supports two deployment models:
1. **Cloud Native (Recommended)**:
   - **Frontend & Edge API**: Vercel (Edge Network + Serverless Functions).
   - **Database**: Managed PostgreSQL (Supabase, Neon, AWS RDS, or Hostinger Managed DB).
   - **Object Storage**: Cloudflare R2 / AWS S3.
   - **Headless CMS**: Sanity.io.
2. **Containerized (Self-Hosted)**:
   - Single Docker container or Docker Compose cluster running the Next.js standalone server alongside PostgreSQL.

---

## 2. Environment Variables Configuration

The platform requires the following environment variables (defined in `.env.example`):

### Core Application & Database
```bash
# Server Runtime
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://dizibrandmedia.com

# PostgreSQL Connection String (Direct and Pooled)
DATABASE_URL="postgresql://dizibrand_user:PASSWORD@ep-db-pooler.postgres.database.azure.com:5432/dizibrand_prod?sslmode=require"
DIRECT_URL="postgresql://dizibrand_user:PASSWORD@ep-db-direct.postgres.database.azure.com:5432/dizibrand_prod?sslmode=require"

# Auth.js / NextAuth
NEXTAUTH_URL=https://dizibrandmedia.com
NEXTAUTH_SECRET=generate_with_openssl_rand_hex_32
```

### Storage & Third-Party Adapters
```bash
# Object Storage (Cloudflare R2 / AWS S3)
STORAGE_PROVIDER=s3 # or mock for local dev
S3_ACCESS_KEY_ID=your_access_key
S3_SECRET_ACCESS_KEY=your_secret_key
S3_REGION=auto
S3_BUCKET_NAME=dizibrand-media-assets
S3_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com

# Email Service (Resend / SendGrid)
EMAIL_PROVIDER=resend # or mock
RESEND_API_KEY=re_your_api_key
EMAIL_FROM="DiziBrand Media <notifications@dizibrandmedia.com>"
SALES_NOTIFY_EMAIL="growth@dizibrandmedia.com"

# Payment Gateways (Stripe & Razorpay)
PAYMENT_PROVIDER=stripe # or razorpay / mock
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

RAZORPAY_KEY_ID=rzp_live_...
RAZORPAY_KEY_SECRET=rzp_secret_...
RAZORPAY_WEBHOOK_SECRET=rzp_whsec_...

# Calendar Integration (Cal.com / Google)
CALENDAR_PROVIDER=calcom # or mock
CALCOM_API_KEY=cal_live_...
NEXT_PUBLIC_CALCOM_LINK=dizibrand-media/strategy-call

# Headless CMS (Sanity.io)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=sk_read_...
SANITY_REVALIDATE_SECRET=your_revalidate_secret

# Anti-Spam & Security
TURNSTILE_SECRET_KEY=0x4AAAAAA...
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAA...
```

---

## 3. Database Migration & Seeding Procedures

### Running Migrations in Production
```bash
# 1. Apply pending Prisma migrations safely to production DB
npx prisma migrate deploy

# 2. Generate Prisma Client bindings
npx prisma generate
```

### Seeding Demo Data (Non-Production / Staging)
```bash
# Seed initial demo data (users, sample leads, projects)
# Notice: All seed records are explicitly flagged [DEMO / TEST DATA]
npm run db:seed
```

---

## 4. Preview Deployment & CI/CD Workflow

1. **Pull Request Trigger**:
   - Every GitHub PR triggers automated CI:
     - `npx tsc --noEmit` (Strict TypeScript check)
     - `npm run lint` (ESLint static analysis)
     - `npm test` (Vitest unit & integration test suite)
2. **Preview Environment Provisioning**:
   - Vercel automatically deploys an isolated preview branch with unique URL: `https://dizibrand-media-git-[branch].vercel.app`.
   - Staging PostgreSQL database used for preview runs.
3. **Automated Smoke Testing**:
   - Playwright E2E tests run against the preview URL to verify core routes and lead submission before PR merge.

---

## 5. Production Deployment & Verification Checklist

Before releasing to production:
- [ ] All CI checks pass (TypeScript, Lint, Tests).
- [ ] Database migrations deployed (`npx prisma migrate deploy`).
- [ ] Environment variables verified via runtime validation (`src/lib/env.ts`).
- [ ] `/api/health` returns `200 OK` with database connection verified.
- [ ] SSL certificate active and HSTS headers present.
- [ ] Zero fake metrics, logos, or unverified claims present on public pages.
- [ ] Lead submission test on `/contact` creates a record in the production CRM and dispatches test alert.
- [ ] Client Portal login and tenant isolation verified.
- [ ] Vercel/Cloudflare edge cache configured with revalidation webhooks.

---

## 6. Health Checks, Monitoring & Alerting

### Health Check Endpoint: `/api/health`
- Endpoint: `GET /api/health`
- Response Payload:
  ```json
  {
    "status": "healthy",
    "timestamp": "2026-09-20T09:28:00.000Z",
    "version": "1.0.0",
    "services": {
      "database": "connected",
      "storage": "operational",
      "email": "operational"
    }
  }
  ```
- Uptime monitoring (e.g., BetterStack, Pingdom) configured to poll `/api/health` every 60 seconds.

### Error Tracking & Log Aggregation
- Centralized error tracking via Sentry captures unhandled client and server exceptions.
- Critical errors (e.g., database connection loss, payment webhook failure) immediately dispatch an alert to the engineering on-call channel.

---

## 7. Disaster Recovery & Backup Plan

- **Automated PostgreSQL Backups**: Daily full backups with 30-day retention; point-in-time recovery (PITR) enabled with 7-day write-ahead log (WAL) retention.
- **Object Storage**: S3/R2 bucket versioning enabled to prevent accidental file deletion or overwrite.
- **RTO (Recovery Time Objective)**: < 1 hour.
- **RPO (Recovery Point Objective)**: < 15 minutes (via WAL replication).
