/**
 * DiziBrand Media - Industry Specializations Data
 * Comprehensive domain data for the 7 primary vertical solutions.
 */

export interface IndustryData {
  slug: string;
  name: string;
  badge: string;
  headline: string;
  subheadline: string;
  description: string;
  challenges: { title: string; desc: string }[];
  playbook: { title: string; desc: string; icon: string }[];
  techStack: { category: string; technologies: string[] }[];
  deliverables: string[];
  metrics: { label: string; value: string; context: string }[];
  faqs: { question: string; answer: string }[];
}

export const INDUSTRIES_DATA: Record<string, IndustryData> = {
  'saas-b2b': {
    slug: 'saas-b2b',
    name: 'SaaS & B2B Technology',
    badge: 'B2B SCALE-UPS & ENTERPRISE CLOUD',
    headline: 'Accelerate ARR Velocity & Scale Your B2B Tech Stack',
    subheadline:
      'We combine fractional Digital CMO leadership, account-based marketing (ABM), and Next.js full-stack engineering to compress CAC payback periods.',
    description:
      'B2B software companies cannot rely on generic agency tactics. High churn, prolonged sales cycles, and complex buyer committees demand high-conviction product-led growth, programmatic SEO, and enterprise software engineering.',
    challenges: [
      {
        title: 'Lengthening Enterprise Sales Cycles',
        desc: '6 to 9 month sales cycles drain capital without orchestrated multi-stakeholder ABM and retargeting workflows.',
      },
      {
        title: 'High Customer Acquisition Cost (CAC)',
        desc: 'Paid media efficiency collapses when landing pages are slow, messaging is unfocused, and product value is obscured.',
      },
      {
        title: 'Slow Product Engineering Velocity',
        desc: 'Internal engineering teams are bogged down in backlog debt, delaying critical customer-facing feature releases.',
      },
      {
        title: 'Disconnected Data & Attribution Gaps',
        desc: 'Inability to connect CRM deal stages back to initial touchpoints leaves executives guessing where to allocate marketing capital.',
      },
    ],
    playbook: [
      {
        title: 'Account-Based Marketing (ABM) Engine',
        desc: 'Algorithmic targeting of Tier-1 enterprise accounts with personalized landing pages, IP-lookup triggers, and executive outreach.',
        icon: 'Target',
      },
      {
        title: 'Autonomous AI Support & Onboarding Agents',
        desc: 'Custom-built LLM agents integrated with your knowledge base to guide trial users, answer technical questions, and deflect support tickets.',
        icon: 'Bot',
      },
      {
        title: 'High-Velocity Next.js Web Platforms',
        desc: 'Ultra-fast marketing websites built on Next.js 14 App Router with sub-second page loads, boosting organic search rankings and conversion.',
        icon: 'Code2',
      },
      {
        title: 'Full-Funnel Closed-Loop Attribution',
        desc: 'Snowflake/BigQuery pipelines syncing HubSpot/Salesforce data back to ad networks for value-based bidding.',
        icon: 'BarChart3',
      },
    ],
    techStack: [
      { category: 'Frontend & Web', technologies: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
      { category: 'Backend & APIs', technologies: ['Node.js', 'PostgreSQL', 'Prisma ORM', 'tRPC / REST'] },
      { category: 'AI & Automation', technologies: ['LangChain', 'OpenAI API', 'Pinecone Vector DB', 'n8n'] },
      { category: 'Analytics & CRM', technologies: ['HubSpot Enterprise', 'Segment', 'PostHog', 'Mixpanel'] },
    ],
    deliverables: [
      'Fractional Digital CMO & CTO leadership sprints',
      'High-conversion Next.js marketing website & resource hub',
      'Autonomous customer support & lead qualification AI agents',
      'Enterprise ABM campaign architecture & creative suite',
      'Closed-loop CRM & pipeline attribution dashboard',
      'Technical SEO & programmatic content matrix',
    ],
    metrics: [
      { label: 'CAC Payback Reduction', value: '-38%', context: 'Average improvement across B2B SaaS engagements' },
      { label: 'Pipeline Velocity', value: '+2.4x', context: 'Qualified demo-to-opportunity acceleration' },
      { label: 'Page Load Speed', value: '< 0.8s', context: 'Core Web Vitals 99+ score on desktop and mobile' },
      { label: 'Support Ticket Deflection', value: '64%', context: 'Via autonomous tier-1 AI support agents' },
    ],
    faqs: [
      {
        question: 'How do your Fractional Digital CMO and CTO collaborate with our internal team?',
        answer:
          'Our practice leads embed directly into your executive cadences, sprint planning, and Slack/Teams channels. We do not operate as an outsourced vendor; we act as senior growth and engineering leaders who direct strategy and execute with dedicated specialist pods.',
      },
      {
        question: 'Can you build custom AI tools directly into our existing SaaS app?',
        answer:
          'Yes. Our technology practice specializes in building secure, SOC-2 compliant AI microservices, RAG search pipelines, and vector database integrations that connect to your existing backend via REST or GraphQL APIs.',
      },
    ],
  },

  'ecommerce-d2c': {
    slug: 'ecommerce-d2c',
    name: 'E-Commerce & Direct-to-Consumer (D2C)',
    badge: 'OMNICHANNEL D2C & RETAIL BRANDS',
    headline: 'Scale Omnichannel Revenue, ROAS & Customer Lifetime Value',
    subheadline:
      'High-velocity headless commerce storefronts, first-party data capture, and algorithmic media buying that turns one-time shoppers into high-LTV advocates.',
    description:
      'With rising ad platform CPMs and iOS privacy restrictions, successful e-commerce brands need more than basic Shopify themes and ad boosting. We engineer custom headless Next.js storefronts, predictive repurchase workflows, and unified attribution models.',
    challenges: [
      {
        title: 'Collapsing Meta & Google ROAS',
        desc: 'Relying solely on ad algorithms without first-party customer data leads to volatile CAC and eroding margins.',
      },
      {
        title: 'Shopify Monolith Speed Bottlenecks',
        desc: 'Bloated app scripts and heavy Liquid themes cause slow mobile page loads that slash conversion rates.',
      },
      {
        title: 'Low Second-Order Retention',
        desc: 'Acquiring customers at breakeven without automated post-purchase upsell engines creates unsustainable economics.',
      },
      {
        title: 'Inventory & ERP Disconnect',
        desc: 'Disjointed stock synchronization across marketplaces, warehouses, and the primary storefront creates stockouts.',
      },
    ],
    playbook: [
      {
        title: 'Headless Next.js Storefront Engineering',
        desc: 'Decoupled storefront architecture delivering instant page navigation, sub-second checkout paths, and higher mobile conversions.',
        icon: 'Zap',
      },
      {
        title: 'First-Party Customer Data Platform (CDP)',
        desc: 'Server-side tracking (CAPI) and customer cohort segmentation for precision retargeting and privacy-safe ad signals.',
        icon: 'Layers',
      },
      {
        title: 'Algorithmic Omnichannel Media Buying',
        desc: 'Multi-platform media execution across Meta, Google Performance Max, TikTok, and Amazon Ads with rigorous margin controls.',
        icon: 'TrendingUp',
      },
      {
        title: 'Predictive Lifecycle Marketing',
        desc: 'Automated Klaviyo & WhatsApp flows triggered by consumption cycles, repurchase likelihood, and predictive LTV scoring.',
        icon: 'Clock',
      },
    ],
    techStack: [
      { category: 'Storefront', technologies: ['Next.js Commerce', 'Shopify Storefront API', 'Tailwind CSS'] },
      { category: 'Backend & Data', technologies: ['Shopify Plus', 'Supabase', 'Stripe', 'Klaviyo API'] },
      { category: 'Tracking & Attribution', technologies: ['Triple Whale', 'Elevar CAPI', 'Google Tag Manager Server-Side'] },
      { category: 'Automation', technologies: ['WhatsApp Business API', 'Make.com', 'Zapier Enterprise'] },
    ],
    deliverables: [
      'Custom Headless Next.js E-Commerce storefront',
      'Server-side tracking & Meta/Google CAPI audit',
      'Omnichannel performance creative matrix & video ad production',
      'Automated Klaviyo & WhatsApp retention funnels',
      'Real-time gross margin and blended ROAS dashboard',
    ],
    metrics: [
      { label: 'Blended ROAS', value: '4.2x', context: 'Average sustained omnichannel return on ad spend' },
      { label: 'Mobile Conversion Rate', value: '+46%', context: 'Post headless Next.js architecture migration' },
      { label: 'Repeat Purchase Rate', value: '34%', context: 'Within 90 days via automated predictive flows' },
      { label: 'Checkout Abandonment', value: '-22%', context: 'Optimized frictionless 1-click checkout' },
    ],
    faqs: [
      {
        question: 'Do we need to abandon our existing Shopify backend?',
        answer:
          'No. We keep your existing Shopify Plus or standard Shopify backend for inventory, fulfillment, and checkout security, while deploying a custom high-speed Next.js frontend that delivers 3x faster page loads.',
      },
      {
        question: 'How do you handle international currencies and localized shipping?',
        answer:
          'We leverage Shopify Markets and multi-currency Stripe integrations, allowing dynamic currency conversion, localized tax calculations, and localized storefront content based on visitor geolocation.',
      },
    ],
  },

  'real-estate-proptech': {
    slug: 'real-estate-proptech',
    name: 'Real Estate & PropTech',
    badge: 'LUXURY REAL ESTATE & PROPTECH PLATFORMS',
    headline: 'High-Intent Investor Acquisition & Interactive Property Tech',
    subheadline:
      'We build high-converting property showcase portals, automated WhatsApp lead qualification funnels, and precision geo-targeted investor campaigns.',
    description:
      'Real estate developers, brokerage houses, and PropTech scale-ups require high-trust digital presentation, verified buyer routing, and automated site-visit scheduling to convert high-ticket property transactions.',
    challenges: [
      {
        title: 'Low Quality & Junk Inquiries',
        desc: 'Generic ad forms attract unqualified leads that waste sales agents’ time and inflate cost-per-verified-buyer.',
      },
      {
        title: 'Slow Lead Response Times',
        desc: 'Inquiries left untouched for more than 15 minutes have a 90% lower conversion rate into site visits.',
      },
      {
        title: 'Static & Uninspiring Property Websites',
        desc: 'Flat PDF brochures and standard WordPress themes fail to communicate luxury value and architectural prestige.',
      },
      {
        title: 'Lack of Lead Attribution Across Channels',
        desc: 'Channel managers cannot determine whether walk-ins originated from Google search, Instagram, or referral networks.',
      },
    ],
    playbook: [
      {
        title: 'Interactive 3D Property Portals',
        desc: 'Next.js property portals with interactive floor plans, 360-degree virtual tours, and unit availability maps.',
        icon: 'Building2',
      },
      {
        title: 'Instant WhatsApp Qualification Bot',
        desc: 'Automated conversational bot that pre-qualifies buyers by budget, location preference, and timeline within 30 seconds.',
        icon: 'MessageCircle',
      },
      {
        title: 'High-Net-Worth (HNW) Digital Campaigns',
        desc: 'Hyper-targeted search and display campaigns targeting high-income demographics, NRI investors, and commercial buyers.',
        icon: 'Target',
      },
      {
        title: 'Automated Site-Visit Booking Engine',
        desc: 'Direct calendar integration allowing qualified buyers to book guided physical or virtual tours directly into sales team calendars.',
        icon: 'Clock',
      },
    ],
    techStack: [
      { category: 'Web Experience', technologies: ['Next.js 14', 'Three.js / 3D Canvas', 'Tailwind CSS'] },
      { category: 'CRM & Automation', technologies: ['Salesforce Real Estate', 'HubSpot', 'WhatsApp Cloud API'] },
      { category: 'Mapping & Geo', technologies: ['Google Maps Platform', 'Mapbox GL', 'GeoTargeting APIs'] },
      { category: 'Media Buying', technologies: ['Google Ads Search & Local', 'Meta Ads', 'LinkedIn Ads'] },
    ],
    deliverables: [
      'Bespoke luxury property showcase platform',
      'Automated WhatsApp pre-qualification & calendar engine',
      'High-intent NRI and domestic investor acquisition campaigns',
      'Digital brochure, video walkthrough, and virtual tour integration',
      'Centralized CRM lead distribution & agent performance dashboard',
    ],
    metrics: [
      { label: 'Verified Lead Rate', value: '78%', context: 'Pre-qualified by budget and timeline before sales touch' },
      { label: 'Site-Visit Conversion', value: '+3.1x', context: 'Increase in scheduled walkthroughs' },
      { label: 'Lead Response Time', value: '< 45s', context: 'Instant automated WhatsApp outreach' },
      { label: 'Cost Per Booking', value: '-42%', context: 'Efficiency gain against traditional property portals' },
    ],
    faqs: [
      {
        question: 'Can your platform integrate with our existing real estate CRM?',
        answer:
          'Yes. We build native webhooks and API connections into Salesforce, LeadSquared, HubSpot, Zoho, or any proprietary CRM your sales organization uses.',
      },
    ],
  },

  'healthcare-healthtech': {
    slug: 'healthcare-healthtech',
    name: 'Healthcare & HealthTech',
    badge: 'PATIENT-CENTRIC HEALTHCARE & DIGITAL HEALTH',
    headline: 'Compliant Digital Health Platforms & Patient Acquisition',
    subheadline:
      'HIPAA, DPDP, and GDPR-ready patient booking portals, telehealth architectures, and local/national medical specialty growth engines.',
    description:
      'Healthcare providers and HealthTech platforms operate in high-regulation, high-trust environments. We design digital experiences that respect patient privacy while streamlining appointment booking and expanding specialty clinical reach.',
    challenges: [
      {
        title: 'Strict Patient Privacy & Compliance',
        desc: 'Healthcare digital tools must comply with DPDP, HIPAA, and medical advertising standards without compromising user experience.',
      },
      {
        title: 'Fragmented Appointment Systems',
        desc: 'Disconnected EHR systems lead to double-bookings, missed patient appointments, and administrative overhead.',
      },
      {
        title: 'Trust & Reputation Vulnerabilities',
        desc: 'Patients conduct extensive research before choosing healthcare providers; poor digital presence loses patients to competing hospitals.',
      },
      {
        title: 'High No-Show Rates',
        desc: 'Lack of automated multi-channel reminders and frictionless re-scheduling leads to costly unfilled clinical slots.',
      },
    ],
    playbook: [
      {
        title: 'HIPAA & DPDP-Compliant Patient Portals',
        desc: 'Secure Next.js patient web applications with end-to-end encryption, multi-factor authentication, and EHR integrations.',
        icon: 'Shield',
      },
      {
        title: 'Medical Specialty SEO & Local Authority',
        desc: 'Condition-specific clinical content and local SEO ensuring your doctors and hospital clinics rank #1 for high-intent search queries.',
        icon: 'Compass',
      },
      {
        title: 'Automated Patient Communication Engine',
        desc: 'SMS and WhatsApp appointment confirmations, digital prep instructions, and automated post-consultation follow-up.',
        icon: 'Clock',
      },
      {
        title: 'Telehealth & Remote Consultation Suite',
        desc: 'WebRTC-powered video consultation modules embedded directly into your patient portal with automated digital prescriptions.',
        icon: 'Zap',
      },
    ],
    techStack: [
      { category: 'Frontend', technologies: ['Next.js', 'React', 'Tailwind CSS', 'Accessible Radix UI'] },
      { category: 'Compliance & Security', technologies: ['AES-256 Encryption', 'HIPAA BAA Cloud', 'OAuth2 / SAML'] },
      { category: 'Communication', technologies: ['Twilio Health API', 'WhatsApp Cloud API', 'WebRTC'] },
      { category: 'Analytics', technologies: ['Privacy-Compliant Mixpanel', 'Server-Side GTM'] },
    ],
    deliverables: [
      'Compliant doctor directory & online appointment booking portal',
      'Local clinic & specialty hospital SEO architecture',
      'Automated SMS & WhatsApp patient reminder workflows',
      'Doctor profile & verified patient testimonial management system',
      'Executive patient acquisition & no-show reduction dashboard',
    ],
    metrics: [
      { label: 'Patient No-Show Rate', value: '-62%', context: 'Through automated WhatsApp & SMS reminder cadences' },
      { label: 'Online Bookings', value: '+185%', context: 'Increase in direct digital appointment scheduling' },
      { label: 'Organic Search Traffic', value: '+3.8x', context: 'Clinical specialty keyword visibility' },
      { label: 'Security Score', value: '100%', context: 'Full compliance with DPDP & HIPAA data handling' },
    ],
    faqs: [
      {
        question: 'How do you ensure patient data privacy in marketing campaigns?',
        answer:
          'We strictly avoid placing client-side tracking pixels (like standard Meta Pixel) on sensitive clinical pages. We utilize server-side anonymized event gateways that strip all PHI (Protected Health Information) before sending compliance-safe conversion signals.',
      },
    ],
  },

  'education-edtech': {
    slug: 'education-edtech',
    name: 'Education & EdTech',
    badge: 'HIGHER EDUCATION, K-12 & EDTECH PLATFORMS',
    headline: 'Scale Student Enrollments & Engineer Modern Learning Tech',
    subheadline:
      'We engineer enrollment acquisition engines, custom Learning Management Systems (LMS), and interactive student dashboards.',
    description:
      'EdTech platforms and educational institutions face high student churn and intense acquisition competition. We build digital ecosystems that guide prospective students from initial curiosity to enrollment and lifelong learning.',
    challenges: [
      {
        title: 'Skyrocketing Student Acquisition Cost',
        desc: 'Broad-target digital ads without tailored career outcome messaging yield unsustainable cost-per-enrolled-student.',
      },
      {
        title: 'Clunky Legacy LMS Platforms',
        desc: 'Outdated learning portals frustrate students, reduce course completion rates, and trigger refund requests.',
      },
      {
        title: 'Complex Multi-Stage Admissions Funnels',
        desc: 'Students drop out during lengthy application forms without automated nudges and interactive counselors.',
      },
      {
        title: 'Lack of Verified Placement Proof',
        desc: 'Modern students demand transparent career outcomes, alumni verification, and peer reviews before committing.',
      },
    ],
    playbook: [
      {
        title: 'High-Conversion Admissions Funnels',
        desc: 'Multi-step interactive enrollment flows with instant scholarship eligibility calculators and counselor scheduling.',
        icon: 'Target',
      },
      {
        title: 'Modern Next.js LMS Engineering',
        desc: 'Custom learning dashboards with video streaming, interactive quizzes, progress tracking, and certificate generation.',
        icon: 'Code2',
      },
      {
        title: 'AI Admissions Counselor Agents',
        desc: '24/7 AI counselors answering syllabus questions, checking prerequisites, and guiding applicants through submission.',
        icon: 'Bot',
      },
      {
        title: 'Alumni & Placement Verification Hub',
        desc: 'Searchable alumni career trajectories, salary benchmarks, and employer networks to maximize enrollment confidence.',
        icon: 'Layers',
      },
    ],
    techStack: [
      { category: 'LMS Platform', technologies: ['Next.js 14', 'PostgreSQL', 'Prisma ORM', 'Mux Video Streaming'] },
      { category: 'Admissions & CRM', technologies: ['HubSpot Education', 'Zoho CRM', 'WhatsApp Cloud API'] },
      { category: 'AI Assistants', technologies: ['LangChain', 'OpenAI GPT-4o', 'Vector Search'] },
      { category: 'Acquisition', technologies: ['Google Search & YouTube Ads', 'Meta Ads', 'LinkedIn Education'] },
    ],
    deliverables: [
      'Custom enrollment portal with multi-step application flow',
      'AI admissions assistant for instant student inquiry handling',
      'Search engine optimization (SEO) for degrees and course keywords',
      'Automated email and WhatsApp applicant nurturing cadences',
      'Executive student acquisition and cohort retention analytics',
    ],
    metrics: [
      { label: 'Cost Per Enrollment', value: '-35%', context: 'Optimized multi-touch admissions funnel' },
      { label: 'Application Completion', value: '+54%', context: 'Frictionless multi-step digital form design' },
      { label: 'Inquiry Response Time', value: '< 15s', context: 'Instant automated AI counselor support' },
      { label: 'Course Completion Rate', value: '+28%', context: 'On custom intuitive Next.js LMS platforms' },
    ],
    faqs: [
      {
        question: 'Can you integrate with existing university student information systems (SIS)?',
        answer:
          'Yes. We build custom API connectors and data bridges to sync applicant data directly into Banner, PeopleSoft, Ellucian, or custom SQL databases.',
      },
    ],
  },

  'bfsi-fintech': {
    slug: 'bfsi-fintech',
    name: 'BFSI & FinTech',
    badge: 'FINANCIAL SERVICES, WEALTH & FINTECH',
    headline: 'Bank-Grade FinTech Platforms & High-Trust Growth',
    subheadline:
      'We build institutional-grade web applications, secure payment integrations, and compliance-first wealth acquisition engines.',
    description:
      'Financial services, wealth management firms, and FinTech platforms require the highest standards of security, regulatory compliance, and brand authority. We engineer high-trust platforms that turn cautious prospects into verified account holders.',
    challenges: [
      {
        title: 'Stringent Regulatory Compliance',
        desc: 'Financial marketing and software must adhere to strict advertising disclosures, data residency laws, and audit controls.',
      },
      {
        title: 'High User Trust Barrier',
        desc: 'Prospects hesitate to link bank accounts or deposit funds on platforms with generic design or unclear security credentials.',
      },
      {
        title: 'Friction in KYC / Onboarding',
        desc: 'Drop-offs spike during identity verification and document upload if the UX is not optimized for mobile devices.',
      },
      {
        title: 'Complex Security Requirements',
        desc: 'Platforms must defend against fraud, rate-limiting attacks, and credential stuffing while maintaining rapid response times.',
      },
    ],
    playbook: [
      {
        title: 'Bank-Grade Web & Portal Engineering',
        desc: 'Next.js architecture with CSP headers, CSRF tokens, strict rate limiting, and encrypted session management.',
        icon: 'Shield',
      },
      {
        title: 'Frictionless Mobile-First KYC Flow',
        desc: 'Step-by-step document upload, biometric verification integration, and instant status updates that minimize drop-off.',
        icon: 'Zap',
      },
      {
        title: 'High-Trust Financial Authority Marketing',
        desc: 'Thought leadership, research playbooks, and targeted campaigns that establish institutional credibility.',
        icon: 'BarChart3',
      },
      {
        title: 'Secure API & Payment Integrations',
        desc: 'Native integrations with Stripe, Razorpay, Plaid, and core banking APIs with full transaction idempotency.',
        icon: 'Code2',
      },
    ],
    techStack: [
      { category: 'Frontend & Security', technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Strict CSP & HSTS'] },
      { category: 'Database & Auth', technologies: ['PostgreSQL', 'Prisma', 'NextAuth.js', 'Audit Logging Engine'] },
      { category: 'Financial APIs', technologies: ['Stripe', 'Razorpay', 'Plaid', 'Banking Webhooks'] },
      { category: 'Compliance', technologies: ['PCI-DSS compliant workflows', 'SOC-2 compliant infrastructure'] },
    ],
    deliverables: [
      'Institutional-grade client portal and public web presence',
      'Optimized digital KYC and account opening onboarding flow',
      'High-net-worth investor acquisition & thought leadership engine',
      'Cryptographic tamper-evident audit logging system',
      'Executive pipeline, transaction volume, and CAC dashboard',
    ],
    metrics: [
      { label: 'KYC Completion Rate', value: '+41%', context: 'Streamlined mobile-first identity verification' },
      { label: 'Security & Audit Grade', value: 'A+', context: 'Zero critical vulnerabilities on automated penetration scans' },
      { label: 'Cost Per Verified Account', value: '-29%', context: 'Optimized high-intent search & content funnel' },
      { label: 'Platform Uptime SLA', value: '99.99%', context: 'High-availability cloud container infrastructure' },
    ],
    faqs: [
      {
        question: 'Do you handle regulatory compliance for financial marketing?',
        answer:
          'Yes. All copy, disclaimers, and interactive calculators are designed in strict accordance with relevant financial regulatory guidelines (e.g. SEBI/RBI in India, SEC/FINRA in the US, FCA in the UK).',
      },
    ],
  },

  'manufacturing-logistics': {
    slug: 'manufacturing-logistics',
    name: 'Manufacturing & Supply Chain',
    badge: 'INDUSTRIAL MANUFACTURING & LOGISTICS',
    headline: 'Modernize Industrial Digital Systems & Expand Global B2B Reach',
    subheadline:
      'We build distributor portals, legacy ERP modernizations, and global supplier lead generation engines for modern manufacturing enterprises.',
    description:
      'Industrial manufacturers and supply chain operators often possess world-class physical operations but lag in digital presentation. We transform legacy catalogs into interactive digital portals and generate qualified wholesale inquiries globally.',
    challenges: [
      {
        title: 'Outdated & Static Web Catalogs',
        desc: 'Complex product catalogs buried in PDFs make it difficult for procurement officers to find specifications and request quotes.',
      },
      {
        title: 'Manual RFQ & Quote Processing',
        desc: 'Slow manual estimation processes lead to missed deal opportunities with high-volume buyers.',
      },
      {
        title: 'Disconnected ERP & Inventory Systems',
        desc: 'Sales reps and distributors cannot view live production capacity or accurate lead times.',
      },
      {
        title: 'Limited International Visibility',
        desc: 'Manufacturers miss high-margin export orders due to lack of multi-lingual SEO and global B2B digital footprint.',
      },
    ],
    playbook: [
      {
        title: 'Interactive B2B Product & Spec Portals',
        desc: 'Fast Next.js product catalogs with CAD file downloads, parametric filtering, and interactive 3D component viewers.',
        icon: 'Layers',
      },
      {
        title: 'Automated RFQ (Request for Quote) Engine',
        desc: 'Smart digital RFQ forms that capture technical specifications, bill-of-materials, and volume requirements for instant routing.',
        icon: 'Zap',
      },
      {
        title: 'International B2B Procurement SEO',
        desc: 'Technical SEO targeting procurement managers, OEM buyers, and supply chain directors across US, Europe, Middle East, and Asia.',
        icon: 'Globe',
      },
      {
        title: 'Distributor & Dealer Portal Engineering',
        desc: 'Authenticated portal where authorized dealers place wholesale orders, track dispatch status, and download marketing collateral.',
        icon: 'Users',
      },
    ],
    techStack: [
      { category: 'Frontend', technologies: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Algolia / Meilisearch'] },
      { category: 'ERP & Backend', technologies: ['Node.js', 'PostgreSQL', 'SAP / Oracle ERP Connectors'] },
      { category: 'Document & 3D', technologies: ['Three.js CAD Viewer', 'PDF Spec Generator', 'AWS S3'] },
      { category: 'Lead Automation', technologies: ['HubSpot Enterprise', 'Custom Webhooks', 'Email Alerts'] },
    ],
    deliverables: [
      'Comprehensive digital product catalog with parametric spec search',
      'Automated RFQ submission and engineering team routing engine',
      'Global multi-lingual B2B SEO and technical content strategy',
      'Authorized distributor portal for order and shipment tracking',
      'Procurement pipeline and quote conversion analytics dashboard',
    ],
    metrics: [
      { label: 'RFQ Inquiries', value: '+142%', context: 'Increase in qualified enterprise quotation requests' },
      { label: 'Spec Search Time', value: '< 2s', context: 'Instant parametric component search across 10,000+ SKUs' },
      { label: 'International Leads', value: '+3.2x', context: 'From overseas procurement and supply chain managers' },
      { label: 'Quote Turnaround Time', value: '-70%', context: 'Through automated spec intake and routing' },
    ],
    faqs: [
      {
        question: 'Can you connect our existing ERP (e.g. SAP, Oracle, NetSuite) to the customer portal?',
        answer:
          'Yes. We build secure middleware and API bridges that interface directly with your ERP, allowing real-time inventory checking, order status synchronization, and price tier calculations.',
      },
    ],
  },
};
