/**
 * DiziBrand Media - Service Capabilities Data
 * Comprehensive architectural and delivery specifications for all 15 core service practices.
 */

export interface ServiceData {
  slug: string;
  name: string;
  category: string;
  badge: string;
  headline: string;
  subheadline: string;
  description: string;
  challenges: { title: string; desc: string }[];
  capabilities: { title: string; desc: string; icon: string }[];
  techStack: { category: string; technologies: string[] }[];
  deliverables: string[];
  metrics: { label: string; value: string; context: string }[];
  faqs: { question: string; answer: string }[];
}

export const SERVICES_DATA: Record<string, ServiceData> = {
  'website-development': {
    slug: 'website-development',
    name: 'Enterprise Website Development',
    category: 'Technology & Software Engineering',
    badge: 'HIGH-PERFORMANCE WEB ARCHITECTURE',
    headline: 'Ultra-Fast, High-Converting Web Platforms Built on Next.js',
    subheadline:
      'We engineer enterprise-grade web applications with Next.js 14, TypeScript, and Tailwind CSS designed for sub-second load times, flawless Core Web Vitals, and maximum conversion rates.',
    description:
      'Your website is the primary digital face and conversion engine of your enterprise. We replace slow, bloated legacy WordPress or template sites with bespoke, modern React/Next.js architectures that score 95+ on Google PageSpeed, dominate organic search, and turn traffic into qualified pipeline.',
    challenges: [
      {
        title: 'Sluggish Load Times & Poor Core Web Vitals',
        desc: 'Legacy monolithic sites suffer from heavy JavaScript bloat, slow server response times, and poor mobile rendering, bleeding 40%+ of potential visitors.',
      },
      {
        title: 'Weak Conversion Funnels & Friction',
        desc: 'Generic templates lack clear customer journey mapping, interactive demo embeds, and friction-free lead capture forms.',
      },
      {
        title: 'Rigid CMS & High Maintenance Overhead',
        desc: 'Marketing teams are locked out of rapid landing page creation or face constant plugin vulnerabilities and broken dependencies.',
      },
      {
        title: 'Inadequate Technical SEO Architecture',
        desc: 'Missing JSON-LD structured data, poor canonicalization, and sluggish server-side rendering cripple search engine indexing.',
      },
    ],
    capabilities: [
      {
        title: 'Next.js 14 App Router Architecture',
        desc: 'Server Components (RSC), static site generation (SSG), and incremental static regeneration (ISR) for optimal speed and SEO.',
        icon: 'Code2',
      },
      {
        title: 'Headless CMS & Content Velocity',
        desc: 'Integration with Sanity, Strapi, or Contentful empowering marketing teams to launch pages without developer bottlenecks.',
        icon: 'Layers',
      },
      {
        title: 'Conversion Rate Optimization (CRO)',
        desc: 'Data-driven UI/UX design with strategic CTAs, micro-animations, social proof blocks, and frictionless lead capture.',
        icon: 'Zap',
      },
      {
        title: 'Enterprise Security & Performance Auditing',
        desc: 'Bank-grade SSL/TLS, automated CI/CD pipelines, CDN edge caching via Cloudflare/Vercel, and strict CSP headers.',
        icon: 'Shield',
      },
    ],
    techStack: [
      { category: 'Frontend Framework', technologies: ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS'] },
      { category: 'State & Animation', technologies: ['Framer Motion', 'Zustand', 'Radix UI / Shadcn'] },
      { category: 'Content & CMS', technologies: ['Sanity.io', 'Strapi Headless', 'MDX', 'Contentful'] },
      { category: 'Hosting & Edge', technologies: ['Vercel Enterprise', 'AWS CloudFront', 'Cloudflare DNS / WAF'] },
    ],
    deliverables: [
      'Custom bespoke UI/UX responsive design in Figma',
      'Next.js 14 production codebase with 100% TypeScript typing',
      'Perfect 95+ Google PageSpeed & Core Web Vitals score',
      'Headless CMS setup with modular page builder components',
      'Full technical SEO schemas (Organization, Service, FAQ, Breadcrumb)',
      'Analytics & tracking integration (GA4, GTM, Meta Pixel, PostHog)',
      '30-day post-launch hypercare & warranty support',
    ],
    metrics: [
      { label: 'Page Load Speed', value: '< 0.7s', context: 'Average TTFB across global edge locations' },
      { label: 'Conversion Lift', value: '+42%', context: 'Average increase in form submissions post-launch' },
      { label: 'Core Web Vitals', value: '99/100', context: 'Google PageSpeed score on mobile & desktop' },
      { label: 'Uptime Reliability', value: '99.99%', context: 'Enterprise SLA backed by global CDN edge' },
    ],
    faqs: [
      {
        question: 'Why choose Next.js over traditional WordPress or Webflow?',
        answer:
          'Next.js delivers enterprise-grade performance, complete code ownership, zero plugin security vulnerabilities, and limitless customization. It allows your website to scale seamlessly into client portals, SaaS apps, or e-commerce platforms without needing a total rebuild.',
      },
      {
        question: 'How long does an enterprise website build typically take?',
        answer:
          'A typical corporate build takes 4 to 8 weeks depending on scope, including strategy, wireframing, high-fidelity UI design, development, content migration, and rigorous QA testing.',
      },
      {
        question: 'Will our internal marketing team be able to edit content without writing code?',
        answer:
          'Yes. We integrate headless CMS platforms like Sanity or Strapi, giving your marketing team an intuitive visual editor to update copy, publish blog posts, and create new landing pages using pre-built design components.',
      },
    ],
  },

  'software-development': {
    slug: 'software-development',
    name: 'Custom Software & API Engineering',
    category: 'Technology & Software Engineering',
    badge: 'MISSION-CRITICAL SYSTEMS',
    headline: 'Bespoke Software Architectures Built for Enterprise Scale',
    subheadline:
      'We design, develop, and maintain robust custom software systems, scalable microservices, and secure API integrations that power your core business operations.',
    description:
      'Off-the-shelf software rarely fits complex business workflows. Our software engineering practice delivers tailored, scalable web applications, event-driven backends, and multi-system integrations built with clean code and enterprise-grade reliability.',
    challenges: [
      {
        title: 'Legacy System Inefficiencies',
        desc: 'Outdated monoliths that cannot scale, lack documentation, and create severe technical debt.',
      },
      {
        title: 'Fragmented Operational Tools',
        desc: 'Siloed departments relying on manual data transfers, spreadsheets, and disconnected commercial tools.',
      },
      {
        title: 'API Bottlenecks & Downtime',
        desc: 'Unreliable integrations failing during peak loads, resulting in lost revenue and customer frustration.',
      },
      {
        title: 'Security & Compliance Vulnerabilities',
        desc: 'Inadequate authentication, lack of audit trails, and non-compliance with SOC-2, GDPR, or ISO standards.',
      },
    ],
    capabilities: [
      {
        title: 'Microservices & Distributed Systems',
        desc: 'Decoupled, modular backends engineered with Node.js, Go, or Python for high concurrency and zero downtime.',
        icon: 'Cpu',
      },
      {
        title: 'RESTful & GraphQL API Development',
        desc: 'High-throughput APIs with comprehensive OpenAPI documentation, rate limiting, and webhook systems.',
        icon: 'Code2',
      },
      {
        title: 'Database Architecture & Optimization',
        desc: 'Relational (PostgreSQL, MySQL) and NoSQL (MongoDB, Redis) databases tuned for sub-millisecond query execution.',
        icon: 'Database',
      },
      {
        title: 'DevOps, CI/CD & Cloud Infrastructure',
        desc: 'Automated testing and deployment pipelines on AWS, GCP, or Azure with Docker and Kubernetes containerization.',
        icon: 'Cloud',
      },
    ],
    techStack: [
      { category: 'Backend Languages', technologies: ['Node.js', 'TypeScript', 'Python', 'Go'] },
      { category: 'Frameworks & Runtimes', technologies: ['NestJS', 'FastAPI', 'Express', 'Next.js'] },
      { category: 'Databases & Caching', technologies: ['PostgreSQL', 'Prisma ORM', 'Redis', 'MongoDB'] },
      { category: 'DevOps & Cloud', technologies: ['Docker', 'Kubernetes', 'AWS ECS/Lambda', 'GitHub Actions'] },
    ],
    deliverables: [
      'System architecture design & technical specifications',
      'Production-ready backend API service with full test coverage',
      'Secure authentication & role-based access control (RBAC)',
      'Automated CI/CD deployment pipelines & staging environments',
      'Comprehensive OpenAPI / Swagger API documentation',
      'Post-deployment monitoring and uptime alerting setup',
    ],
    metrics: [
      { label: 'API Response Time', value: '< 45ms', context: '99th percentile across high-concurrency endpoints' },
      { label: 'Code Test Coverage', value: '> 85%', context: 'Automated unit, integration, and E2E tests' },
      { label: 'System Uptime', value: '99.99%', context: 'Guaranteed enterprise cloud availability' },
      { label: 'Deployment Frequency', value: 'Daily', context: 'Automated continuous delivery pipelines' },
    ],
    faqs: [
      {
        question: 'Do we own the intellectual property (IP) and source code?',
        answer:
          'Yes, 100%. All source code, architecture diagrams, documentation, and digital assets belong entirely to your company upon milestone completion.',
      },
      {
        question: 'Can you integrate with our existing ERP, CRM, or legacy databases?',
        answer:
          'Yes. We specialize in building secure middleware and API bridges that seamlessly connect modern web interfaces with legacy databases, SAP, Salesforce, or proprietary on-premise systems.',
      },
    ],
  },

  'saas-development': {
    slug: 'saas-development',
    name: 'SaaS Platform Development',
    category: 'Technology & Software Engineering',
    badge: 'MULTI-TENANT CLOUD ARCHITECTURE',
    headline: 'Build, Launch, and Scale Modern Multi-Tenant SaaS Products',
    subheadline:
      'From MVP to enterprise scale, we architect multi-tenant SaaS platforms with automated provisioning, subscription billing, team hierarchies, and scalable cloud infrastructure.',
    description:
      'Launching a successful software-as-a-service product requires more than great UI—it demands rock-solid multi-tenancy, granular RBAC, seamless Stripe/billing integration, and low-latency data isolation. We partner with founders and enterprise innovators to turn SaaS ideas into revenue-generating platforms.',
    challenges: [
      {
        title: 'Complex Multi-Tenancy & Data Isolation',
        desc: 'Balancing shared cloud compute with strict tenant data security and compliance requirements.',
      },
      {
        title: 'Subscription & Usage-Based Billing Friction',
        desc: 'Handling tier changes, prorations, usage metering, and multi-currency global payments without revenue leakage.',
      },
      {
        title: 'User Onboarding & Activation Drop-Off',
        desc: 'New users abandoning trials due to confusing setup flows, lack of guided tours, and slow initial value realization.',
      },
      {
        title: 'Scaling Under Rapid User Growth',
        desc: 'Database deadlocks, unoptimized queries, and compute bottlenecks as user concurrency multiplies.',
      },
    ],
    capabilities: [
      {
        title: 'Multi-Tenant Data Architecture',
        desc: 'Row-level security (RLS) or schema-per-tenant architectures ensuring absolute isolation and high throughput.',
        icon: 'Database',
      },
      {
        title: 'Stripe & Paddle Billing Integration',
        desc: 'Recurring subscriptions, metered usage, automated invoicing, customer self-serve portals, and tax compliance.',
        icon: 'Zap',
      },
      {
        title: 'Enterprise Auth & SSO (SAML / Okta)',
        desc: 'Role-based access control (RBAC), multi-factor authentication, and enterprise Single Sign-On for enterprise sales.',
        icon: 'Shield',
      },
      {
        title: 'Product Analytics & Onboarding Workflows',
        desc: 'In-app onboarding checklists, feature flags, and cohort analytics to drive day-1 user activation.',
        icon: 'BarChart3',
      },
    ],
    techStack: [
      { category: 'Full-Stack Framework', technologies: ['Next.js 14', 'React', 'Node.js', 'TypeScript'] },
      { category: 'Database & ORM', technologies: ['PostgreSQL', 'Supabase', 'Prisma', 'Redis'] },
      { category: 'Auth & Security', technologies: ['Clerk', 'NextAuth', 'Auth0', 'WorkOS (SSO)'] },
      { category: 'Payments & Cloud', technologies: ['Stripe Billing', 'AWS', 'Vercel Enterprise', 'Docker'] },
    ],
    deliverables: [
      'Multi-tenant web application codebase',
      'Complete authentication & organization team workspace system',
      'Stripe subscription billing & self-service customer portal',
      'Super-admin analytics dashboard for MRR, churn, and active users',
      'Automated email transactional workflows (Resend / SendGrid)',
      'Security audit report & production deployment configuration',
    ],
    metrics: [
      { label: 'Time to MVP Launch', value: '8-12 Wks', context: 'From conceptual design to paying customer alpha' },
      { label: 'Trial-to-Paid Conversion', value: '+34%', context: 'Achieved with frictionless onboarding flows' },
      { label: 'System Scalability', value: '100K+ DAU', context: 'Architecture tested for concurrent enterprise users' },
      { label: 'Payment Success Rate', value: '99.5%', context: 'Via smart retries and localized Stripe gateways' },
    ],
    faqs: [
      {
        question: 'Do you help with product roadmap and monetization strategy?',
        answer:
          'Yes. Our fractional Digital CTO and Digital CMO work with you to define your packaging, pricing tiers, freemium vs. reverse-trial mechanics, and feature prioritization for launch.',
      },
      {
        question: 'Can you handle enterprise SSO requirements for B2B deals?',
        answer:
          'Absolutely. We integrate standard SAML 2.0 / OIDC protocols through providers like WorkOS or Auth0, allowing your SaaS to close enterprise contracts requiring Okta, Azure AD, or Google Workspace SSO.',
      },
    ],
  },

  'app-development': {
    slug: 'app-development',
    name: 'Mobile App Development',
    category: 'Technology & Software Engineering',
    badge: 'CROSS-PLATFORM & NATIVE MOBILE',
    headline: 'Engaging iOS & Android Apps Engineered for App Store Dominance',
    subheadline:
      'We craft high-performance, intuitive mobile applications using React Native and Flutter, delivering native 60fps experiences with a unified codebase.',
    description:
      'Mobile users expect instant responsiveness, offline capability, and seamless biometric authentication. Our mobile engineering team builds world-class mobile apps for consumer brands, enterprise field operations, and digital services.',
    challenges: [
      {
        title: 'Fragmented Codebases & Double Dev Cost',
        desc: 'Building separate native Swift and Kotlin teams doubles engineering cost, maintenance overhead, and release cycles.',
      },
      {
        title: 'App Store Rejections & Review Delays',
        desc: 'Non-compliance with Apple Human Interface or Google Play policy leading to costly launch postponements.',
      },
      {
        title: 'Poor Offline Capability & Performance',
        desc: 'Apps that freeze or crash in low-connectivity environments, creating poor user ratings.',
      },
      {
        title: 'Clunky Push Notification Strategies',
        desc: 'Irrelevant spam notifications causing instant app uninstalls instead of personalized re-engagement.',
      },
    ],
    capabilities: [
      {
        title: 'Cross-Platform React Native & Flutter',
        desc: 'Single codebase powering both iOS and Android with zero compromise on native look, feel, and performance.',
        icon: 'Smartphone',
      },
      {
        title: 'Offline-First Architecture',
        desc: 'Local SQLite/WatermelonDB data caching ensuring users can browse, draft, and work without active internet.',
        icon: 'Database',
      },
      {
        title: 'Push Notifications & Deep Linking',
        desc: 'Personalized messaging triggers via OneSignal or Firebase with intelligent deep linking into specific screens.',
        icon: 'Zap',
      },
      {
        title: 'Biometrics, Camera & Hardware Access',
        desc: 'Seamless integration with FaceID, fingerprint readers, GPS location, camera scanner, and Bluetooth devices.',
        icon: 'Shield',
      },
    ],
    techStack: [
      { category: 'Mobile Frameworks', technologies: ['React Native', 'Expo', 'Flutter', 'TypeScript'] },
      { category: 'State & Storage', technologies: ['Redux Toolkit', 'Zustand', 'AsyncStorage', 'WatermelonDB'] },
      { category: 'Backend & APIs', technologies: ['GraphQL', 'tRPC', 'REST', 'Supabase'] },
      { category: 'Distribution & CI', technologies: ['Fastlane', 'App Store Connect', 'Google Play Console', 'EAS'] },
    ],
    deliverables: [
      'Interactive mobile UI/UX prototypes in Figma',
      'Cross-platform iOS and Android mobile codebase',
      'App Store and Google Play compliance submission management',
      'Push notification & deep linking infrastructure',
      'Crashlytics & real-time telemetry monitoring',
      'Post-launch update & maintenance support',
    ],
    metrics: [
      { label: 'Codebase Sharing', value: '92%', context: 'Shared code across iOS and Android platforms' },
      { label: 'App Store Rating', value: '4.8★', context: 'Average user satisfaction across client releases' },
      { label: 'Crash-Free Sessions', value: '99.8%', context: 'Industry-leading stability verified by Sentry' },
      { label: 'Time to App Store', value: '6-10 Wks', context: 'Rapid build-to-submission cycle' },
    ],
    faqs: [
      {
        question: 'Should we build with React Native or Native (Swift/Kotlin)?',
        answer:
          'For 95% of modern consumer and business apps, React Native or Flutter is the optimal choice. It provides identical 60fps performance and native UI components while reducing engineering costs and development time by up to 50%.',
      },
      {
        question: 'Do you manage the App Store and Google Play approval process?',
        answer:
          'Yes. We handle end-to-end publishing, metadata configuration, screenshot generation, privacy manifest documentation, and review resolution until your app is live.',
      },
    ],
  },

  'ai-automation': {
    slug: 'ai-automation',
    name: 'AI & Workflow Automation',
    category: 'AI & Autonomous Automation',
    badge: 'ENTERPRISE INTELLIGENCE & RPA',
    headline: 'Eliminate Repetitive Work with Enterprise AI Automation',
    subheadline:
      'We design and deploy custom LLM workflows, robotic process automation (RPA), and intelligent document processing pipelines that save hundreds of engineering and operations hours weekly.',
    description:
      'Modern enterprises are drowning in manual data entry, repetitive customer inquiries, and slow operational handoffs. We build intelligent automation pipelines using state-of-the-art AI models, connecting your existing software stack into an autonomous, self-healing operational engine.',
    challenges: [
      {
        title: 'High Labor Costs on Repetitive Tasks',
        desc: 'Valuable knowledge workers wasting 30%+ of their time on copy-pasting data, triaging emails, and updating CRMs.',
      },
      {
        title: 'Slow Customer Response Times',
        desc: 'Customer support queues taking hours or days to answer routine product and order status queries.',
      },
      {
        title: 'Error-Prone Manual Data Processing',
        desc: 'Human transcription errors in invoice processing, contract reviews, and financial reconciliation.',
      },
      {
        title: 'Unconnected SaaS Silos',
        desc: 'Data trapped across disparate tools with no real-time synchronization or unified trigger mechanisms.',
      },
    ],
    capabilities: [
      {
        title: 'Intelligent Document Processing (IDP)',
        desc: 'Automated extraction, classification, and validation of data from PDFs, invoices, contracts, and receipts.',
        icon: 'Bot',
      },
      {
        title: 'Autonomous Workflow Orchestration',
        desc: 'Multi-step automation flows built on n8n, Make, or custom Node.js workers connecting 500+ SaaS apps.',
        icon: 'Zap',
      },
      {
        title: 'Enterprise Knowledge RAG Systems',
        desc: 'Retrieval-Augmented Generation systems allowing employees to query internal documentation with verifiable citations.',
        icon: 'Database',
      },
      {
        title: 'AI Customer Support Pipelines',
        desc: 'Intelligent ticket classification, sentiment analysis, draft response generation, and automated resolution.',
        icon: 'MessageCircle',
      },
    ],
    techStack: [
      { category: 'AI Models & APIs', technologies: ['OpenAI GPT-4o', 'Anthropic Claude 3.5', 'Gemini Pro', 'Llama 3'] },
      { category: 'Vector Databases', technologies: ['Pinecone', 'Qdrant', 'pgvector (PostgreSQL)', 'Weaviate'] },
      { category: 'Orchestration', technologies: ['LangChain', 'LlamaIndex', 'n8n Enterprise', 'Temporal.io'] },
      { category: 'Integrations', technologies: ['Salesforce', 'HubSpot', 'Slack', 'Zendesk', 'Stripe'] },
    ],
    deliverables: [
      'Enterprise workflow audit & automation blueprint',
      'Production-deployed automation pipelines with error-handling',
      'Private vector database setup for corporate knowledge',
      'Custom webhook triggers & API integrations',
      'Executive dashboard tracking hours saved and ROI metrics',
      'Staff training documentation & ongoing maintenance',
    ],
    metrics: [
      { label: 'Weekly Hours Saved', value: '120+ hrs', context: 'Average operational time reclaimed per client' },
      { label: 'Document Processing Time', value: '-94%', context: 'From 25 minutes down to 8 seconds per invoice' },
      { label: 'First-Response Time', value: '< 15s', context: 'Across automated support and lead capture workflows' },
      { label: 'Accuracy Rate', value: '99.2%', context: 'Validated via human-in-the-loop review queues' },
    ],
    faqs: [
      {
        question: 'Is our corporate data safe and kept private?',
        answer:
          'Yes. We enforce zero-data-retention enterprise API agreements with model providers. Your proprietary company data is never used to train public models, and all sensitive data can be encrypted or processed on-premise.',
      },
      {
        question: 'What happens if an automated workflow encounters an error?',
        answer:
          'All our automation systems include self-healing logic, automated error retries, and fallback human-in-the-loop routing to ensure zero data loss or disrupted business operations.',
      },
    ],
  },

  'ai-agents': {
    slug: 'ai-agents',
    name: 'Autonomous AI Agents',
    category: 'AI & Autonomous Automation',
    badge: 'AUTONOMOUS REASONING & EXECUTION',
    headline: 'Deploy Autonomous AI Agents That Execute Complex Business Operations',
    subheadline:
      'We engineer goal-driven AI agents equipped with memory, tool execution, and multi-step reasoning capabilities to automate sales outreach, customer care, and technical triage 24/7.',
    description:
      'Unlike simple chatbots that regurgitate canned text, autonomous AI agents can reason, browse the web, query internal databases, make API calls, and complete multi-step tasks independently. We build custom agentic architectures that act as tireless digital employees.',
    challenges: [
      {
        title: 'Limitations of Simple Chatbots',
        desc: 'Traditional rule-based bots frustrate customers with generic "I didn\'t understand that" responses and inability to take action.',
      },
      {
        title: 'High Support & Sales Overhead',
        desc: 'Scaling support and outbound sales teams requires constant hiring, training, and ballooning payroll costs.',
      },
      {
        title: 'Delayed Lead Qualification',
        desc: 'Inbound leads waiting hours for a sales rep to respond, resulting in 60%+ drop in conversion rates.',
      },
      {
        title: 'Fragmented Task Execution',
        desc: 'Complex tasks requiring an employee to check 4 different platforms to resolve a single customer request.',
      },
    ],
    capabilities: [
      {
        title: 'Multi-Agent Collaborative Systems',
        desc: 'Specialized agent swarms (e.g. Researcher, Copywriter, Reviewer) coordinating to execute complex business objectives.',
        icon: 'Users',
      },
      {
        title: 'Tool Use & Function Calling',
        desc: 'Agents that can read and write to your CRM, issue refunds via Stripe, schedule meetings, and update tickets.',
        icon: 'Code2',
      },
      {
        title: 'Persistent Memory & Context',
        desc: 'Short-term and long-term memory architectures that remember customer preferences, past interactions, and enterprise policies.',
        icon: 'Database',
      },
      {
        title: 'Guardrails & Hallucination Prevention',
        desc: 'Strict deterministic guardrails, schema enforcement, and confidence scoring to ensure 100% brand-safe responses.',
        icon: 'Shield',
      },
    ],
    techStack: [
      { category: 'Agent Frameworks', technologies: ['LangGraph', 'CrewAI', 'AutoGen', 'Custom TypeScript Engine'] },
      { category: 'Foundation Models', technologies: ['Claude 3.5 Sonnet', 'GPT-4o', 'DeepSeek-V3', 'Mistral Large'] },
      { category: 'Memory & Storage', technologies: ['Redis OM', 'Pinecone', 'PostgreSQL', 'S3'] },
      { category: 'Monitoring & Eval', technologies: ['LangSmith', 'Arize Phoenix', 'Helicone', 'OpenTelemetry'] },
    ],
    deliverables: [
      'Autonomous agent persona and capability specification',
      'Full agentic codebase with function calling and API connectors',
      'Integration into your communication channels (Web, WhatsApp, Slack)',
      'Human-in-the-loop escalation dashboard for edge cases',
      'Comprehensive prompt engineering and behavioral testing suite',
      'Continuous evaluation & telemetry logging pipeline',
    ],
    metrics: [
      { label: 'Autonomous Resolution', value: '72%', context: 'Customer inquiries resolved without human intervention' },
      { label: 'Lead Response Time', value: '< 30s', context: 'Instant qualification and meeting scheduling 24/7' },
      { label: 'Operational Cost Reduction', value: '-55%', context: 'Compared to traditional outsourced tier-1 support' },
      { label: 'Task Execution Accuracy', value: '98.8%', context: 'Enforced via deterministic validation schemas' },
    ],
    faqs: [
      {
        question: 'How do autonomous agents differ from standard AI chatbots?',
        answer:
          'Chatbots only generate text based on prompts. Autonomous agents have tools: they can query your database, make API calls, verify data, execute transactions, and loop through multi-step workflows until a goal is achieved.',
      },
      {
        question: 'Can agents be trusted not to hallucinate or make promises to clients?',
        answer:
          'Yes. We implement deterministic guardrails using tools like NeMo Guardrails, schema validation, and strict API permission boundaries. If confidence falls below a set threshold, the agent automatically escalates the ticket to a human.',
      },
    ],
  },

  'performance-marketing': {
    slug: 'performance-marketing',
    name: 'Performance Marketing & Paid Acquisition',
    category: 'Marketing & Customer Acquisition',
    badge: 'ROI-FOCUSED MEDIA BUYING',
    headline: 'Scale Profitable Customer Acquisition Across Google, Meta & LinkedIn',
    subheadline:
      'We combine mathematical media buying, high-velocity creative testing, and first-party conversion tracking to generate predictable, profitable revenue growth.',
    description:
      'Wasting ad spend on unqualified clicks and vanity impressions drains growth capital. Our performance marketing practice manages multi-million dollar ad budgets with algorithmic precision, rigorous creative experimentation, and deep server-side attribution.',
    challenges: [
      {
        title: 'Rising Customer Acquisition Costs (CAC)',
        desc: 'Ad platforms becoming increasingly expensive and saturated, eroding gross margins.',
      },
      {
        title: 'Signal Loss & Attribution Blind Spots',
        desc: 'iOS 14.5+ privacy updates and cookie deprecation blinding standard pixels to true conversion sources.',
      },
      {
        title: 'Creative Fatigue & Ad Burnout',
        desc: 'Winning ads fatiguing in weeks without a continuous creative testing pipeline.',
      },
      {
        title: 'Poor Alignment with Downstream Pipeline',
        desc: 'Marketing generating cheap leads that sales reps dismiss as unqualified spam.',
      },
    ],
    capabilities: [
      {
        title: 'Server-Side Tracking & CAPI',
        desc: 'Meta Conversions API, Google Enhanced Conversions, and LinkedIn CAPI for 99%+ attribution accuracy.',
        icon: 'BarChart3',
      },
      {
        title: 'High-Velocity Creative Engine',
        desc: 'Weekly iterations of direct-response video hooks, static graphics, and copy angles designed to convert.',
        icon: 'Zap',
      },
      {
        title: 'Omnichannel Media Management',
        desc: 'Integrated full-funnel buying across Google Search/Performance Max, Meta, LinkedIn Ads, and YouTube.',
        icon: 'Target',
      },
      {
        title: 'Bid Strategy & Budget Optimization',
        desc: 'Value-based bidding (tROAS / tCPA) linked directly to downstream CRM revenue stages.',
        icon: 'TrendingUp',
      },
    ],
    techStack: [
      { category: 'Ad Platforms', technologies: ['Google Ads', 'Meta Ads Manager', 'LinkedIn Campaign Manager', 'TikTok Ads'] },
      { category: 'Attribution & Tracking', technologies: ['Server-Side GTM', 'Stape.io', 'Triple Whale', 'Northbeam'] },
      { category: 'Creative Production', technologies: ['Figma', 'Adobe Premiere Pro', 'After Effects', 'Midjourney'] },
      { category: 'Reporting & CRM', technologies: ['Looker Studio', 'HubSpot', 'Salesforce', 'BigQuery'] },
    ],
    deliverables: [
      'Comprehensive media audit & acquisition roadmap',
      'Full tracking setup with server-side CAPI & offline conversion sync',
      'Custom campaign structure & audience targeting framework',
      'Weekly high-converting creative batches (copy + video + static)',
      'Live executive performance dashboard updated hourly',
      'Weekly strategic syncs & budget reallocation recommendations',
    ],
    metrics: [
      { label: 'Average ROAS Increase', value: '+68%', context: 'Within the first 90 days of account restructuring' },
      { label: 'CAC Reduction', value: '-32%', context: 'Through value-based bidding and CAPI data density' },
      { label: 'Monthly Ad Spend Managed', value: '$2.5M+', context: 'Across global B2B, SaaS, and D2C brands' },
      { label: 'Tracking Accuracy', value: '99.4%', context: 'Server-to-server verified conversion attribution' },
    ],
    faqs: [
      {
        question: 'What is the minimum ad spend budget required to partner?',
        answer:
          'We typically partner with brands spending at least $10,000 / month across paid channels to ensure sufficient conversion data density for statistical testing and algorithmic bidding.',
      },
      {
        question: 'Do you create the ad creatives, or do we need to supply them?',
        answer:
          'We produce all direct-response ad creatives in-house, including motion graphics, static visual concepts, video editing, and ad copy. We can also incorporate your raw brand footage and assets.',
      },
    ],
  },

  'lead-generation': {
    slug: 'lead-generation',
    name: 'B2B Lead Generation & Account-Based Marketing',
    category: 'Marketing & Customer Acquisition',
    badge: 'HIGH-INTENT PIPELINE CREATION',
    headline: 'Build a Predictable B2B Pipeline of Enterprise Decision-Makers',
    subheadline:
      'We combine hyper-targeted outbound infrastructure, account-based marketing (ABM), and intent data signals to book qualified meetings with your dream clients.',
    description:
      'Cold emailing spam lists is dead. Modern B2B demand generation requires precision targeting, multi-touch omnichannel outreach, and verified intent signals. We build end-to-end outbound engines that deliver high-ticket enterprise conversations directly to your sales calendar.',
    challenges: [
      {
        title: 'Spam Filters & Deliverability Destruction',
        desc: 'Cold outreach landing in spam due to improper domain warming, lack of SPF/DKIM/DMARC, and generic copy.',
      },
      {
        title: 'Unqualified Leads Wasting Rep Time',
        desc: 'Sales reps spending hours on discovery calls with companies that lack budget, authority, or need.',
      },
      {
        title: 'Inability to Reach C-Suite Executives',
        desc: 'Traditional gatekeepers and crowded inboxes blocking access to key VP and C-level decision-makers.',
      },
      {
        title: 'Unpredictable Sales Cycles',
        desc: 'Rollercoaster revenue months with feast-or-famine pipeline distribution.',
      },
    ],
    capabilities: [
      {
        title: 'Secondary Domain & Inbox Infrastructure',
        desc: 'Dedicated outreach domains with SPF, DKIM, DMARC, and automated deliverability warming protocols.',
        icon: 'Shield',
      },
      {
        title: 'Intent Data & Technographic Scraping',
        desc: 'Targeting prospects showing active intent signals (funding rounds, hiring spikes, software tech stack).',
        icon: 'Target',
      },
      {
        title: 'Personalized Multi-Touch Sequences',
        desc: 'Coordinated touches across Email, LinkedIn outreach, and personalized video messages.',
        icon: 'MessageCircle',
      },
      {
        title: 'CRM Handoff & Calendar Booking',
        desc: 'Direct calendar integration routing pre-qualified leads to account executives with full background briefing.',
        icon: 'Zap',
      },
    ],
    techStack: [
      { category: 'Data & Enrichment', technologies: ['Apollo.io', 'Clay.com', 'ZoomInfo', 'Clearbit'] },
      { category: 'Outreach & Sending', technologies: ['Instantly.ai', 'Smartlead', 'Salesloft', 'Lemlist'] },
      { category: 'CRM & Pipeline', technologies: ['HubSpot Enterprise', 'Salesforce', 'Close.com', 'Calendly'] },
      { category: 'Deliverability & DNS', technologies: ['Google Workspace', 'Outlook 365', 'Warmup Inbox', 'Mailflow'] },
    ],
    deliverables: [
      'Ideal Customer Profile (ICP) definition & Total Addressable Market list',
      'Isolated outbound domain & inbox architecture (10+ warm inboxes)',
      'Clay enrichment waterfalls for phone, verified email, and intent data',
      'High-converting copywriting sequences with personalization variables',
      'Real-time Slack notification alerts for positive replies',
      'Weekly lead qualification and pipeline velocity reviews',
    ],
    metrics: [
      { label: 'Inbox Deliverability', value: '98.5%', context: 'Primary inbox placement rate across warmed domains' },
      { label: 'Qualified Meetings Booked', value: '25-45/mo', context: 'Average monthly B2B enterprise pipeline generated' },
      { label: 'Reply-to-Meeting Rate', value: '28%', context: 'Conversion of interested replies into scheduled calls' },
      { label: 'Pipeline Value Generated', value: '$1.8M+', context: 'Average quarterly sales pipeline per engagement' },
    ],
    faqs: [
      {
        question: 'Will outbound emailing put our primary company domain at risk?',
        answer:
          'Never. We purchase secondary lookalike domains and configure separate Google/Microsoft inboxes. Your primary company email domain is never used for cold outreach, ensuring your business domain reputation remains 100% protected.',
      },
      {
        question: 'What qualifies as a "qualified lead" in your campaigns?',
        answer:
          'We agree upon strict qualification criteria before launching: minimum company size, target geography, job title/seniority, and expressed budget or timeline. Only prospects meeting these filters are booked onto your calendar.',
      },
    ],
  },

  'seo': {
    slug: 'seo',
    name: 'Technical & Global SEO',
    category: 'Marketing & Customer Acquisition',
    badge: 'ORGANIC REVENUE DOMINANCE',
    headline: 'Capture High-Intent Search Demand with Engineering-Led SEO',
    subheadline:
      'We combine programmatic SEO, technical crawlability optimization, and authority-building content to turn Google into your most profitable inbound acquisition channel.',
    description:
      'SEO is no longer just about stuffing keywords into blog posts. Modern search dominance requires architectural site health, semantic entity optimization, Core Web Vitals excellence, and authoritative backlinks. We engineer organic search engines that compound value over years.',
    challenges: [
      {
        title: 'Algorithmic Traffic Drops & Volatility',
        desc: 'Websites being penalized by Google Helpful Content and Core updates due to low-quality, generic AI content.',
      },
      {
        title: 'Crawl Budget Waste & Indexing Issues',
        desc: 'Search engine bots failing to discover or index critical product and service pages due to JavaScript rendering issues.',
      },
      {
        title: 'Targeting Vanity Keywords Without Intent',
        desc: 'Ranking for informational search terms that generate high traffic but zero qualified sales pipeline.',
      },
      {
        title: 'Slow International & Regional Scaling',
        desc: 'Struggling to expand into global markets without proper hreflang tagging and localized subfolder architecture.',
      },
    ],
    capabilities: [
      {
        title: 'Deep Technical Architecture Auditing',
        desc: 'Resolving indexation bottlenecks, redirect chains, canonical errors, and Core Web Vitals page speed issues.',
        icon: 'Code2',
      },
      {
        title: 'Programmatic SEO & Content Velocity',
        desc: 'Architecting scalable database-driven landing pages capturing thousands of long-tail high-intent keywords.',
        icon: 'Database',
      },
      {
        title: 'Semantic Entity & Schema Engineering',
        desc: 'Implementing JSON-LD schemas (Organization, Product, FAQ, LocalBusiness) to secure rich snippet real estate.',
        icon: 'Layers',
      },
      {
        title: 'High-Authority Editorial Link Building',
        desc: 'Securing contextual backlinks from high-DR industry publications and authoritative news outlets.',
        icon: 'Globe',
      },
    ],
    techStack: [
      { category: 'Audit & Crawling', technologies: ['Screaming Frog', 'Ahrefs', 'Semrush', 'Google Search Console'] },
      { category: 'Technical SEO', technologies: ['JSON-LD Schemas', 'Next.js App Router', 'Cloudflare Workers', 'Sitebulb'] },
      { category: 'Content Intelligence', technologies: ['Surfer SEO', 'Clearscope', 'MarketMuse', 'Custom Python Scripts'] },
      { category: 'Analytics', technologies: ['Google Analytics 4', 'BigQuery', 'Looker Studio', 'Search Console API'] },
    ],
    deliverables: [
      'Comprehensive technical site health & crawlability audit',
      'Full JSON-LD structured data implementation across all page types',
      'High-intent keyword taxonomy & competitor content gap matrix',
      'Programmatic landing page architecture and template design',
      'Monthly authoritative backlink acquisition & PR placements',
      'Live rank tracking and organic revenue attribution reporting',
    ],
    metrics: [
      { label: 'Organic Traffic Growth', value: '+185%', context: 'Average YoY increase in non-branded search visits' },
      { label: 'Keywords in Top 3', value: '420+', context: 'High-intent commercial terms dominating page 1' },
      { label: 'Technical Health Score', value: '98/100', context: 'Verified via Screaming Frog and Ahrefs crawl audits' },
      { label: 'Inbound Revenue Lift', value: '+74%', context: 'Qualified inbound demo requests from organic search' },
    ],
    faqs: [
      {
        question: 'How long before we see tangible organic traffic and revenue results?',
        answer:
          'Technical fixes and schema implementations often yield improvements within 30 to 45 days. Major organic compounding and high-volume rankings typically achieve peak momentum between months 3 and 6.',
      },
      {
        question: 'Do you use automated AI tools to write thousands of blog posts?',
        answer:
          'No. We adhere strictly to Google\'s helpful content guidelines. We use AI for research and clustering, but all published content is architected, reviewed, and enhanced by domain experts to ensure originality and conversion power.',
      },
    ],
  },

  'branding': {
    slug: 'branding',
    name: 'Brand Identity & Positioning',
    category: 'Marketing & Customer Acquisition',
    badge: 'CATEGORY CREATION & IDENTITY',
    headline: 'Carve Out an Unmistakable Market Position That Commands Premium Pricing',
    subheadline:
      'We craft iconic brand identity systems, compelling narrative frameworks, and design guidelines that differentiate your business and build immediate authority.',
    description:
      'In crowded markets, the best product doesn\'t always win—the most clearly positioned brand does. We help ambitious companies uncover their unique value proposition, design memorable visual identities, and articulate a story that resonates with enterprise buyers.',
    challenges: [
      {
        title: 'Commoditization & Price Pressure',
        desc: 'Competing on price because prospective customers cannot distinguish your offering from legacy rivals.',
      },
      {
        title: 'Inconsistent Visual Identity Across Touchpoints',
        desc: 'Marketing, sales decks, website, and product UI using different fonts, colors, and messaging styles.',
      },
      {
        title: 'Generic, Jargon-Heavy Value Propositions',
        desc: 'Vague mission statements that say everything and mean nothing to prospective decision-makers.',
      },
      {
        title: 'Lack of Premium Perceived Value',
        desc: 'Amateurish visual assets undermining enterprise credibility and preventing high-ticket contract sizes.',
      },
    ],
    capabilities: [
      {
        title: 'Strategic Market Positioning & Narrative',
        desc: 'Category definition, competitor battlecards, and core messaging pillars that establish market leadership.',
        icon: 'Compass',
      },
      {
        title: 'Visual Identity & Design Systems',
        desc: 'Logo systems, typography rules, color palettes, iconography, and comprehensive brand books.',
        icon: 'Palette',
      },
      {
        title: 'Enterprise Collateral & Sales Enablement',
        desc: 'High-stakes pitch decks, one-pagers, case study templates, and trade show collateral.',
        icon: 'Layers',
      },
      {
        title: 'Digital Brand Expression & UI Kits',
        desc: 'Component libraries and design tokens bridging the gap between brand identity and production web applications.',
        icon: 'Code2',
      },
    ],
    techStack: [
      { category: 'Design Tools', technologies: ['Figma', 'Adobe Illustrator', 'Photoshop', 'InDesign'] },
      { category: 'Design Systems', technologies: ['Tailwind CSS Tokens', 'Storybook', 'Radix UI', 'CSS Custom Properties'] },
      { category: 'Motion & 3D', technologies: ['After Effects', 'Spline 3D', 'Blender', 'Lottie'] },
      { category: 'Brand Assets', technologies: ['SVG Vectors', 'WebP/AVIF', 'Custom Web Fonts', 'Design Guidelines PDF'] },
    ],
    deliverables: [
      'Comprehensive brand strategy & positioning playbook',
      'Master logo suite (primary, secondary, favicon, monochrome)',
      'Complete typography, color palette & design token specifications',
      'Custom iconography and illustration asset library',
      'Investor & sales pitch deck templates in Figma/Keynote',
      '100+ page enterprise brand guidelines document',
    ],
    metrics: [
      { label: 'Perceived Value Lift', value: '+45%', context: 'Ability to command higher average contract values (ACV)' },
      { label: 'Sales Win Rate', value: '+28%', context: 'With cohesive, professional enterprise sales collateral' },
      { label: 'Brand Recall', value: '3.2x', context: 'Measured across post-campaign buyer awareness surveys' },
      { label: 'Time-to-Market', value: '4 Wks', context: 'From kickoff to final brand book and design tokens' },
    ],
    faqs: [
      {
        question: 'What is included in the final brand identity delivery?',
        answer:
          'You receive full vector files (SVG, EPS, AI), web-ready PNG/WebP exports, digital design tokens for developers, Figma design libraries, and an interactive brand book detailing exact usage rules.',
      },
      {
        question: 'Can you update our existing brand without losing our recognized logo?',
        answer:
          'Yes. We specialize in brand refreshes—modernizing typography, color harmony, and digital execution while preserving the equity and recognition of your original visual marks.',
      },
    ],
  },

  'marketing-and-growth': {
    slug: 'marketing-and-growth',
    name: 'Full-Funnel Marketing & Growth',
    category: 'Marketing & Customer Acquisition',
    badge: 'OMNICHANNEL REVENUE ENGINE',
    headline: 'Unified Marketing Strategies That Drive Sustainable Enterprise Revenue',
    subheadline:
      'We orchestrate end-to-end growth across paid acquisition, organic search, outbound sales, and retention loops under fractional executive leadership.',
    description:
      'Fragmented marketing teams operate in silos: paid media doesn\'t speak to SEO, and sales doesn\'t receive qualified leads. We deploy a unified growth engine led by seasoned Digital CMOs that aligns every channel toward pipeline generation and enterprise value.',
    challenges: [
      {
        title: 'Siloed Marketing Channels & Blended Confusion',
        desc: 'Agencies and internal teams fighting over attribution rather than collaborating on holistic pipeline growth.',
      },
      {
        title: 'High Burn Rate on Unproven Experiments',
        desc: 'Testing random marketing tactics without a systematic growth framework or clear hypothesis validation.',
      },
      {
        title: 'Lack of Senior Strategic Leadership',
        desc: 'Junior marketers executing campaigns without seasoned executive guidance on unit economics and CAC payback.',
      },
      {
        title: 'Low Customer Retention & High Churn',
        desc: 'Focusing exclusively on acquisition while neglecting customer lifecycle marketing and expansion revenue.',
      },
    ],
    capabilities: [
      {
        title: 'Fractional CMO Leadership',
        desc: 'Executive guidance on go-to-market strategy, marketing budget allocation, and team mentorship.',
        icon: 'TrendingUp',
      },
      {
        title: 'Omnichannel Growth Engine',
        desc: 'Synchronized campaigns across paid ads, organic search, outbound ABM, and content distribution.',
        icon: 'Target',
      },
      {
        title: 'Full-Funnel Lifecycle Marketing',
        desc: 'Automated email onboarding, customer expansion triggers, and win-back sequences that maximize LTV.',
        icon: 'RefreshCw',
      },
      {
        title: 'Attribution & Unit Economics Modeling',
        desc: 'Real-time cohort analysis, CAC payback tracking, and channel-by-channel profitability dashboards.',
        icon: 'BarChart3',
      },
    ],
    techStack: [
      { category: 'Growth Stack', technologies: ['HubSpot Enterprise', 'Customer.io', 'Segment', 'PostHog'] },
      { category: 'Acquisition Channels', technologies: ['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'Organic SEO'] },
      { category: 'Outreach & ABM', technologies: ['Apollo.io', 'Clay', 'Instantly', 'Salesforce'] },
      { category: 'BI & Analytics', technologies: ['Looker Studio', 'BigQuery', 'Tableau', 'Mixpanel'] },
    ],
    deliverables: [
      'Quarterly growth roadmap and North Star metric definition',
      'Integrated paid, organic, and outbound campaign execution',
      'Customer lifecycle marketing sequences and automations',
      'Weekly executive reporting dashboards and strategic syncs',
      'Continuous conversion rate optimization (CRO) testing',
      'Complete playbooks and SOPs documented for your team',
    ],
    metrics: [
      { label: 'Blended CAC Reduction', value: '-35%', context: 'Achieved through organic and paid channel synergy' },
      { label: 'Annual Revenue Growth', value: '+142%', context: 'Average ARR/revenue growth across full-funnel clients' },
      { label: 'LTV Expansion', value: '+28%', context: 'Through automated lifecycle marketing and upsell flows' },
      { label: 'CAC Payback Period', value: '< 6 Mo', context: 'Accelerated capital recycling for scalable growth' },
    ],
    faqs: [
      {
        question: 'How does your growth team integrate with our internal employees?',
        answer:
          'We act as an extension of your company. Our fractional CMO joins your leadership calls, while our specialized execution pods (media buyers, copywriters, developers) execute alongside your in-house team.',
      },
      {
        question: 'What size companies benefit most from this engagement?',
        answer:
          'Typically businesses generating between $1M and $25M in annual revenue looking to scale to the next tier without the overhead of hiring an entire full-time executive and marketing department.',
      },
    ],
  },

  'technology': {
    slug: 'technology',
    name: 'Technology Architecture & Digital Transformation',
    category: 'Technology & Software Engineering',
    badge: 'ENTERPRISE TECH STACK MODERNIZATION',
    headline: 'Future-Proof Your Business with Modern Cloud & Software Architecture',
    subheadline:
      'We modernize legacy architectures, migrate workloads to cloud-native platforms, and implement scalable technical foundations under fractional Digital CTO leadership.',
    description:
      'Technical debt is the silent killer of enterprise agility. When systems become slow, brittle, and difficult to maintain, business innovation grinds to a halt. Our technology practice provides strategic engineering leadership to modernize legacy systems, automate deployments, and eliminate technical risk.',
    challenges: [
      {
        title: 'Crippling Technical Debt & Legacy Monoliths',
        desc: 'Core business applications built on outdated frameworks that are expensive to maintain and impossible to scale.',
      },
      {
        title: 'High Cloud Infrastructure Costs',
        desc: 'Unmonitored AWS or Azure bills multiplying without corresponding performance or capacity improvements.',
      },
      {
        title: 'Slow Feature Delivery Cycles',
        desc: 'Engineering teams spending 70%+ of their time fixing bugs rather than shipping customer-requested features.',
      },
      {
        title: 'Security & Compliance Deficits',
        desc: 'Lack of automated security scanning, audit logs, and compliance controls required for enterprise sales.',
      },
    ],
    capabilities: [
      {
        title: 'Fractional CTO Advisory',
        desc: 'Senior technical leadership for architectural reviews, vendor evaluations, team scaling, and board advisory.',
        icon: 'Cpu',
      },
      {
        title: 'Cloud Modernization & Migration',
        desc: 'Re-architecting on-premise and monolithic workloads into serverless and containerized cloud services.',
        icon: 'Cloud',
      },
      {
        title: 'CI/CD & DevOps Automation',
        desc: 'Automated testing, staging environments, and zero-downtime deployment pipelines using GitHub Actions and Docker.',
        icon: 'Zap',
      },
      {
        title: 'Security Governance & SOC-2 Prep',
        desc: 'Vulnerability assessments, data encryption at rest/transit, role-based access control, and compliance roadmaps.',
        icon: 'Shield',
      },
    ],
    techStack: [
      { category: 'Cloud Providers', technologies: ['Amazon Web Services (AWS)', 'Google Cloud Platform (GCP)', 'Cloudflare'] },
      { category: 'Containers & Compute', technologies: ['Docker', 'Kubernetes (EKS/GKE)', 'AWS Lambda', 'Fargate'] },
      { category: 'Infrastructure as Code', technologies: ['Terraform', 'Pulumi', 'AWS CDK', 'GitHub Actions'] },
      { category: 'Monitoring & Logs', technologies: ['Datadog', 'Sentry', 'CloudWatch', 'Prometheus / Grafana'] },
    ],
    deliverables: [
      'Comprehensive architectural review & technical debt roadmap',
      'Infrastructure as Code (Terraform) scripts for reproducible environments',
      'Automated CI/CD pipelines with automated test gates',
      'Cloud cost optimization audit saving 20-40% on monthly spend',
      'Security posture report and SOC-2 readiness checklist',
      'Engineering hiring rubrics and technical interview support',
    ],
    metrics: [
      { label: 'Cloud Cost Reduction', value: '-35%', context: 'Average monthly infrastructure savings post-optimization' },
      { label: 'Release Velocity', value: '4x', context: 'Acceleration in deployment frequency with automated CI/CD' },
      { label: 'Downtime Incidents', value: '-85%', context: 'Reduction in production outages via resilient cloud design' },
      { label: 'Build & Test Time', value: '< 6 Min', context: 'From git push to automated staging deployment' },
    ],
    faqs: [
      {
        question: 'How does a Fractional CTO differ from hiring a full-time CTO?',
        answer:
          'A Fractional CTO provides the identical high-level architectural acumen, governance, and leadership of a $350k+/year enterprise CTO at a fraction of the cost, scaling up or down based on your development cycle.',
      },
      {
        question: 'Can you help us migrate our legacy database without downtime?',
        answer:
          'Yes. We use dual-writing, CDC (Change Data Capture), and incremental migration patterns to ensure zero downtime and zero data loss during database migrations.',
      },
    ],
  },

  'data-analytics': {
    slug: 'data-analytics',
    name: 'Data Analytics & Multi-Touch Attribution',
    category: 'Data & Analytics',
    badge: 'PRECISE ATTRIBUTION & TRACKING',
    headline: 'Uncover the True ROI of Every Marketing Dollar and Customer Journey',
    subheadline:
      'We architect first-party data pipelines, server-side attribution models, and centralized data warehouses that provide crystal-clear visibility into revenue drivers.',
    description:
      'Making capital allocation decisions based on flawed, sampled, or incomplete data is dangerous. We build robust data engineering pipelines that unify touchpoints from ad clicks to CRM deal closes, giving leadership undeniable clarity on where to invest.',
    challenges: [
      {
        title: 'Attribution Blind Spots & Duplicate Counting',
        desc: 'Google Ads and Meta both claiming 100% credit for the same sale, distorting real channel profitability.',
      },
      {
        title: 'Fragmented Customer Journey Data',
        desc: 'Inability to track a user as they move between web visits, email clicks, sales demos, and in-app events.',
      },
      {
        title: 'Data Silos in Disparate SaaS Platforms',
        desc: 'Valuable customer data locked in Stripe, HubSpot, Google Ads, and Mixpanel with no single source of truth.',
      },
      {
        title: 'Slow, Manual Spreadsheet Reporting',
        desc: 'Marketing and finance teams spending hours every Monday manually exporting and stitching together CSVs.',
      },
    ],
    capabilities: [
      {
        title: 'First-Party Tracking & Server-Side GTM',
        desc: 'Cookieless, server-to-server event tracking that bypasses ad blockers and restores 100% data fidelity.',
        icon: 'Shield',
      },
      {
        title: 'Data Warehouse Architecture',
        desc: 'Centralized cloud data lakes in Snowflake, BigQuery, or PostgreSQL with automated ELT pipelines.',
        icon: 'Database',
      },
      {
        title: 'Multi-Touch Attribution Modeling',
        desc: 'Algorithmic, W-shaped, and Markov chain attribution models measuring true touchpoint impact.',
        icon: 'BarChart3',
      },
      {
        title: 'Customer Data Platform (CDP) Setup',
        desc: 'Unified customer profiles powering real-time personalization, audience sync, and churn prediction.',
        icon: 'Users',
      },
    ],
    techStack: [
      { category: 'Data Warehouses', technologies: ['Google BigQuery', 'Snowflake', 'PostgreSQL', 'AWS Redshift'] },
      { category: 'ELT & Pipelines', technologies: ['Fivetran', 'dbt', 'Airbyte', 'Segment'] },
      { category: 'Tracking & Tagging', technologies: ['Server-Side Google Tag Manager', 'Stape.io', 'PostHog', 'Mixpanel'] },
      { category: 'Attribution', technologies: ['Custom Python Models', 'Triple Whale', 'Rockerbox', 'Northbeam'] },
    ],
    deliverables: [
      'Comprehensive data audit & event taxonomy mapping',
      'Server-side GTM tracking setup on your custom domain',
      'Automated ELT pipelines syncing marketing and CRM data to BigQuery/Snowflake',
      'Clean dbt data transformation models for revenue attribution',
      'Executive multi-touch attribution dashboard in Looker Studio',
      'Full documentation and data dictionary for internal analysts',
    ],
    metrics: [
      { label: 'Attributed Revenue Accuracy', value: '99.2%', context: 'Compared to 65% with standard browser cookies' },
      { label: 'Reporting Time Saved', value: '15 hrs/wk', context: 'Replaced manual spreadsheet exports with automated dashboards' },
      { label: 'Ad Waste Eliminated', value: '24%', context: 'Identified and paused underperforming non-converting campaigns' },
      { label: 'Data Latency', value: '< 15 Min', context: 'Near real-time data sync across all marketing channels' },
    ],
    faqs: [
      {
        question: 'Why is server-side tracking superior to traditional client-side pixels?',
        answer:
          'Browser pixels are heavily blocked by ad blockers, Brave browser, and iOS Safari tracking restrictions, causing up to 35% of conversions to be missed. Server-side tracking routes events securely through your own domain, restoring 100% data integrity.',
      },
      {
        question: 'Can you connect our HubSpot or Salesforce data with our paid ad platforms?',
        answer:
          'Yes. We set up closed-loop offline conversion imports that send CRM deal stage changes back to Google and Meta, training ad algorithms to target high-value buyers rather than cheap clicks.',
      },
    ],
  },

  'business-intelligence': {
    slug: 'business-intelligence',
    name: 'Executive Business Intelligence & Dashboards',
    category: 'Data & Analytics',
    badge: 'REAL-TIME EXECUTIVE METRICS',
    headline: 'Real-Time Executive Visibility into MRR, Churn, Margins & Growth',
    subheadline:
      'We turn raw business data into stunning, real-time executive dashboards that give CEOs, CFOs, and leadership teams immediate clarity to make fast decisions.',
    description:
      'Executive decisions should never be made on gut feeling or stale month-old reports. We design automated, interactive business intelligence dashboards that connect your financial, sales, marketing, and product data into a single pane of glass.',
    challenges: [
      {
        title: 'Stale, Outdated Financial & Operational Reports',
        desc: 'Waiting until the 15th of the following month to know whether current campaigns and revenue targets were hit.',
      },
      {
        title: 'Conflicting Numbers Across Departments',
        desc: 'Sales reporting one revenue number while marketing and finance report completely different figures.',
      },
      {
        title: 'Cluttered Dashboards Nobody Uses',
        desc: 'Overly complex reports packed with 50 vanity charts that fail to highlight actionable business insights.',
      },
      {
        title: 'Lack of Cohort & LTV/CAC Forecasting',
        desc: 'Inability to predict cash runway, churn inflection points, or customer lifetime value across customer tiers.',
      },
    ],
    capabilities: [
      {
        title: 'Executive C-Suite KPI Dashboards',
        desc: 'Clean, high-level dashboards showing MRR/ARR, gross margins, CAC payback, and burn rate at a glance.',
        icon: 'BarChart3',
      },
      {
        title: 'Cohort & Churn Analysis',
        desc: 'Visual customer retention curves and net revenue retention (NRR) heatmaps by acquisition month and plan.',
        icon: 'TrendingUp',
      },
      {
        title: 'Automated Executive Alerting',
        desc: 'Automated Slack and email alerts triggered when key metrics (e.g. churn spike, conversion drop) deviate from baseline.',
        icon: 'Zap',
      },
      {
        title: 'Cross-Functional Data Unification',
        desc: 'Single source of truth uniting Stripe, Quickbooks, HubSpot, Google Ads, and custom product databases.',
        icon: 'Layers',
      },
    ],
    techStack: [
      { category: 'BI Platforms', technologies: ['Looker Studio', 'PowerBI', 'Tableau', 'Metabase'] },
      { category: 'Cloud Warehouses', technologies: ['Google BigQuery', 'PostgreSQL', 'Snowflake', 'Amazon Athena'] },
      { category: 'Data Modeling', technologies: ['SQL', 'dbt (Data Build Tool)', 'Python / Pandas'] },
      { category: 'Alerting & Delivery', technologies: ['Slack Webhooks', 'Email Digests', 'Zapier / n8n'] },
    ],
    deliverables: [
      'KPI discovery workshop and metric definition dictionary',
      'Automated data pipeline connecting financial and CRM sources',
      'C-Suite Executive Dashboard (Desktop + Mobile optimized)',
      'Sales Pipeline & Marketing Efficiency drill-down dashboards',
      'Automated weekly email summary digest for board and investors',
      'Staff training session on dashboard exploration and filtering',
    ],
    metrics: [
      { label: 'Decision Velocity', value: '3x Faster', context: 'Real-time data eliminates waiting for month-end reconciliation' },
      { label: 'Single Source of Truth', value: '100%', context: 'Zero discrepancies between sales, marketing, and accounting' },
      { label: 'Executive Adoption', value: '94%', context: 'Weekly active usage rate among leadership and board members' },
      { label: 'Setup Time', value: '3-5 Wks', context: 'From kickoff to fully automated live production dashboards' },
    ],
    faqs: [
      {
        question: 'Which BI platform do you recommend for our company?',
        answer:
          'For most high-growth companies, Looker Studio or Metabase provides the best balance of cost-efficiency, speed, and ease of sharing. For enterprise clients with complex on-premise governance, we implement Microsoft PowerBI or Tableau.',
      },
      {
        question: 'Can the dashboards be viewed securely on mobile devices?',
        answer:
          'Yes. All dashboards we design are fully responsive and optimized for mobile viewing, allowing executives to check critical metrics on their phones at any time.',
      },
    ],
  },

  'crm-erp': {
    slug: 'crm-erp',
    name: 'CRM & ERP Engineering',
    category: 'Technology & Software Engineering',
    badge: 'ENTERPRISE WORKFLOW AUTOMATION',
    headline: 'Modernize Your Core Business Operations with Custom CRM & ERP Solutions',
    subheadline:
      'We architect, customize, and integrate enterprise CRM and ERP systems that eliminate manual data entry, streamline deal flow, and connect your entire company.',
    description:
      'When your business outgrows disconnected spreadsheets and generic out-of-the-box setups, you need tailored CRM and ERP workflows. We design custom extensions, bidirectional data synchronizations, and automated pipeline rules that empower your sales, operations, and finance teams.',
    challenges: [
      {
        title: 'Disconnected Sales & Fulfillment Teams',
        desc: 'Deals closed in the CRM failing to trigger automated provisioning, invoicing, or project handoffs in operations.',
      },
      {
        title: 'Messy, Duplicate & Inaccurate CRM Data',
        desc: 'Thousands of duplicate contacts, missing phone numbers, and outdated records ruining sales rep productivity.',
      },
      {
        title: 'Expensive, Unused Enterprise Software Features',
        desc: 'Paying enterprise license fees for Salesforce or SAP while utilizing only 10% of their actual capabilities.',
      },
      {
        title: 'Lack of Custom Business Logic Support',
        desc: 'Struggling to configure complex pricing tiers, approval hierarchies, or commission structures.',
      },
    ],
    capabilities: [
      {
        title: 'HubSpot & Salesforce Architecture',
        desc: 'Custom object modeling, lead scoring algorithms, automated deal stages, and CPQ (Configure, Price, Quote) setups.',
        icon: 'Database',
      },
      {
        title: 'ERP & Billing Integration',
        desc: 'Bidirectional sync connecting CRM won deals directly to QuickBooks, NetSuite, Xero, or custom databases.',
        icon: 'Zap',
      },
      {
        title: 'Automated Lead Routing & SLAs',
        desc: 'Instant round-robin lead assignment, geographic territory distribution, and Slack escalation alerts for missed SLAs.',
        icon: 'Users',
      },
      {
        title: 'Custom API Middleware & Webhooks',
        desc: 'Bespoke Node.js middleware synchronizing proprietary customer portals with enterprise CRM backends.',
        icon: 'Code2',
      },
    ],
    techStack: [
      { category: 'CRM Platforms', technologies: ['HubSpot Enterprise', 'Salesforce Sales Cloud', 'Zoho CRM', 'Pipedrive'] },
      { category: 'ERP & Accounting', technologies: ['NetSuite', 'QuickBooks Online', 'Xero', 'SAP Business One'] },
      { category: 'Middleware & Sync', technologies: ['Node.js', 'n8n', 'Zapier Enterprise', 'AWS Lambda'] },
      { category: 'Data Cleaning', technologies: ['Clay', 'OpenRefine', 'Custom SQL Deduplication', 'ZoomInfo'] },
    ],
    deliverables: [
      'Current-state workflow audit and target architecture blueprint',
      'Custom object schema design and database relationship mapping',
      'Automated pipeline stages, validation rules, and email notifications',
      'Bidirectional accounting & ERP synchronization bridge',
      'Comprehensive data cleansing and deduplication migration',
      'Interactive team training sessions and operational SOP documentation',
    ],
    metrics: [
      { label: 'Admin Time Saved', value: '8 hrs/rep/wk', context: 'Eliminated manual logging and duplicate data entry' },
      { label: 'Lead Response Speed', value: '< 2 Min', context: 'From form submission to automated rep assignment' },
      { label: 'Data Accuracy Rate', value: '99.5%', context: 'Enforced through required fields and automated validation' },
      { label: 'Pipeline Velocity', value: '+35%', context: 'Faster deal cycles through automated follow-up reminders' },
    ],
    faqs: [
      {
        question: 'Can you migrate our data from our old CRM without losing historical records?',
        answer:
          'Yes. We execute secure, tested migration scripts that map custom fields, historical notes, email threads, and deal stages with 100% data integrity and zero record loss.',
      },
      {
        question: 'Do you provide ongoing support and administration after implementation?',
        answer:
          'Yes. We offer fractional CRM/ERP administration packages to continuously maintain workflows, build new custom reports, and train new team members as your company expands.',
      },
    ],
  },
};
