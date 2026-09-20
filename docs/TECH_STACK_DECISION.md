# Technology Stack Decisions & Architectural Rationale: DiziBrand Media

This document records the architectural decisions, evaluated alternatives, tradeoffs, and finalized technology selections for the DiziBrand Media Website & Business Platform.

---

## 1. Summary of Technology Choices

| Layer | Chosen Technology | Primary Alternatives Evaluated | Rationale & Tradeoffs |
| :--- | :--- | :--- | :--- |
| **Framework** | **Next.js 14+ (App Router)** | Remix, Nuxt.js, Astro | Industry standard for hybrid SSR/SSG, edge routing, server components, and API routes. Ideal for high SEO public site + dynamic authenticated portals. |
| **Language** | **TypeScript 5.x (Strict)** | JavaScript, Go | End-to-end type safety from Prisma database schema to frontend UI components and API payloads. |
| **Styling** | **Tailwind CSS + Headless UI** | CSS Modules, Styled Components | High performance, zero runtime overhead, design token consistency, rapid prototyping of accessible components. |
| **Motion** | **Framer Motion** | GSAP, Vanilla CSS Animations | Declarative React integration, performant layout animations, spring physics, hardware-accelerated transforms for the business ecosystem visual. |
| **Database** | **PostgreSQL 15+** | MySQL, MongoDB | Relational integrity, ACID compliance, rich JSONB support for dynamic schemas, row-level tenant security, mature ecosystem. |
| **ORM** | **Prisma ORM** | Drizzle, TypeORM | Declarative schema definition, automatic type generation, bulletproof migration engine, rich query API with relation filters. |
| **Authentication** | **Auth.js (NextAuth v5)** | Clerk, Supabase Auth, Custom JWT | Self-hosted within application, direct integration with Prisma, JWT session strategy for zero-latency edge verification + database revocation. |
| **Headless CMS** | **Sanity.io (+ Prisma fallback)** | Strapi, Contentful, Ghost | Cloud-native structured content lake, zero infrastructure to maintain, real-time collaboration, GROQ queries, coupled with local Prisma caching. |
| **Form Validation** | **Zod + React Hook Form** | Yup, Joi, Formik | Isomorphic validation: identical schemas used in browser client forms and server-side API route handlers. |
| **Testing** | **Vitest + Playwright** | Jest + Cypress | Vitest shares Vite/esbuild speed and ESM compatibility; Playwright provides cross-browser E2E testing with trace viewer and video capture. |
| **File Storage** | **S3-Compatible Adapter (R2/S3)** | Local disk, Firebase Storage | Cloudflare R2 / AWS S3 with signed upload URLs ensures secure, scalable document and asset storage without vendor lock-in. |
| **Deployment** | **Vercel / Docker Container** | AWS ECS, Railway | Zero-config edge deployment for Next.js on Vercel; Dockerfile provided for self-hosted containerized enterprise deployments. |

---

## 2. Deep-Dive: Headless CMS Decision (Sanity vs. Strapi)

### Evaluation Context
The platform requires a robust CMS for managing:
- 20+ service pages, industry pages, case studies, and insights.
- Team profiles, FAQs, homepage sections, and SEO metadata.

### Comparison Matrix

| Criteria | Sanity.io | Strapi |
| :--- | :--- | :--- |
| **Hosting & Ops** | Fully managed content lake; zero database/server maintenance. | Self-hosted Node.js + DB; requires updates, backups, monitoring. |
| **Content Modeling** | Code-as-schema in TypeScript (`defineType`, `defineField`). | GUI-driven content-type builder with JSON files. |
| **Live Collaboration** | Real-time presence, multi-user editing, revision history. | Limited real-time collaboration without enterprise license. |
| **Querying** | GROQ & GraphQL with deep projection and CDN caching. | REST and GraphQL with plugin ecosystem. |
| **Asset Pipeline** | Global asset CDN with on-the-fly image transformations. | Upload provider plugin dependent. |
| **Next.js Integration**| Official `@sanity/next-sanity` with visual live editing. | Custom fetch wrappers and revalidation webhooks. |

### Final Decision: **Sanity.io with Prisma Content Module**
**Decision**: Adopt **Sanity.io** as the primary headless CMS for marketing editorial teams, while embedding a **Prisma-backed CMS table schema** inside PostgreSQL as an internal fallback/cache.
**Why**:
1. Zero operational overhead: The engineering team does not need to maintain, patch, or scale a separate Strapi server cluster.
2. Structured content as code: Content schemas live in version-controlled TypeScript files alongside the application codebase.
3. Edge performance: GROQ queries can be cached at the edge with Next.js `fetch` cache tags, revalidated instantly via Sanity webhooks.

---

## 3. Deep-Dive: Authentication & Session Strategy

### Chosen Approach: Auth.js (NextAuth v5) + JWT Strategy
- **Session Handling**: Encrypted JWT cookies containing user ID, role, and organization ID.
- **Edge Middleware**: Next.js Edge Middleware inspects the JWT payload in `<1ms` without querying PostgreSQL on every static/cached page request.
- **Database Revocation & Sensitive Operations**: For critical operations (role change, user deactivation, financial transaction), the server route handler validates the active session directly against the PostgreSQL `Users` table.
- **Multi-Tenant Scoping**: The client user's JWT contains their `companyId`. Server-side data queries automatically inject `WHERE companyId = session.user.companyId` to guarantee tenant isolation.

---

## 4. Third-Party Integration Architecture (Pluggable Adapters)

To prevent vendor lock-in and enable seamless local development, all external integrations use TypeScript interface adapters:

```
src/lib/adapters/
├── email/
│   ├── email-adapter.interface.ts
│   ├── resend-adapter.ts
│   └── mock-email-adapter.ts
├── calendar/
│   ├── calendar-adapter.interface.ts
│   ├── calcom-adapter.ts
│   └── mock-calendar-adapter.ts
├── storage/
│   ├── storage-adapter.interface.ts
│   ├── s3-adapter.ts
│   └── mock-storage-adapter.ts
├── payment/
│   ├── payment-adapter.interface.ts
│   ├── stripe-adapter.ts
│   ├── razorpay-adapter.ts
│   └── mock-payment-adapter.ts
└── whatsapp/
    ├── whatsapp-adapter.interface.ts
    ├── twilio-whatsapp-adapter.ts
    └── direct-link-adapter.ts
```

In development or test environments, the system automatically falls back to `mock-*` adapters if third-party credentials are not configured, preventing runtime crashes while maintaining full end-to-end functionality.
