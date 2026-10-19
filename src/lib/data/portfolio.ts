export interface PortfolioProject {
  id: string;
  title: string;
  slug?: string;
  client?: string;
  industry?: string;
  categories: string[];
  tier: 'Featured' | 'Selected Work' | 'Team Experience';
  description: string;
  challenge?: string;
  solution?: string;
  image?: string;
  imageAlt?: string;
  tags: string[];
  results?: string;
  projectUrl?: string;
  featured?: boolean;
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'jmd-medico',
    title: 'JMD Medico',
    slug: 'jmd-medico',
    client: 'JMD Medico',
    industry: 'Healthcare / E-commerce',
    categories: ['eCommerce'],
    tier: 'Featured',
    description:
      'A healthcare e-commerce platform built for a smooth online shopping experience with product search, streamlined cart, and WhatsApp order notifications.',
    challenge:
      'The business needed a credible, fast, mobile-first storefront for healthcare products, with reliable order and payment handling and clear communication back to customers.',
    solution:
      'We built a product-first storefront with fast search and filtering, a streamlined cart and checkout, payment integration with failure handling, and WhatsApp order notifications to keep customers informed.',
    tags: ['React.js', 'FastAPI', 'PostgreSQL', 'Supabase', 'Redis'],
    results: 'A clean, modern eCommerce experience that made our digital journey much smoother.',
    projectUrl: 'https://jmdmedico.com/',
    featured: true,
  },
  {
    id: 'gropto-enterprise-erp',
    title: 'Gropto Enterprise ERP',
    slug: 'gropto-enterprise-erp',
    client: 'Gropto Supermarkets',
    industry: 'Retail & Supply Chain',
    categories: ['ERP & POS', 'FinTech', 'Desktop Apps'],
    tier: 'Selected Work',
    description:
      'Enterprise Retail ERP Blueprint & Platform designed for 100+ Supermarket stores, WMS, POS, Omnichannel OMS, and CEO Command Center.',
    challenge:
      'Coordinating inventory, billing, warehouse logistics, and real-time transaction reporting across 100+ physical grocery outlets with zero downtime.',
    solution:
      'Architected an omnichannel desktop and cloud ERP system leveraging Electron.js for offline-first store billing and Next.js / PostgreSQL for central synchronization.',
    tags: ['Next.js', 'Node.js', 'Electron.js', 'PostgreSQL', 'Redis', 'ERP', 'FinTech', 'WMS', 'POS'],
    projectUrl: 'https://gropto.com/',
    featured: true,
  },
  {
    id: 'netmos',
    title: 'NETMOS',
    slug: 'netmos',
    client: 'NETMOS Logistics',
    industry: 'Logistics & Supply Chain',
    categories: ['Enterprise'],
    tier: 'Selected Work',
    description: 'A logistics management platform that digitizes and centralizes operations.',
    challenge:
      'Manual fleet coordination, fragmented consignment tracking, and delayed billing causing operational friction in mid-market freight logistics.',
    solution:
      'Developed a unified web portal for consignment tracking, driver manifest management, and automated invoicing with PostgreSQL and Express.js.',
    tags: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'REST APIs'],
    projectUrl: 'https://netmos.in/',
  },
  {
    id: 'ecological-society-lms',
    title: 'Ecological Society',
    slug: 'ecological-society-lms',
    client: 'The Ecological Society',
    industry: 'Education & Non-Profit',
    categories: ['Enterprise'],
    tier: 'Selected Work',
    description: 'A learning management system built for educational programs and NGO learning activities.',
    challenge:
      'NGO needed a centralized portal to deliver ecological study programs, host structured course modules, and manage student assessments without complex overhead.',
    solution:
      'Engineered an accessible LMS portal with role-based course administration, media lecture streaming, and student certificate issuance.',
    tags: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL'],
    projectUrl: 'https://lms.theecologicalsociety.org/',
  },
  {
    id: 'revomo',
    title: 'Revomo',
    slug: 'revomo',
    client: 'Revomo Technologies',
    industry: 'B2B Enterprise',
    categories: ['SaaS'],
    tier: 'Selected Work',
    description: 'A multi-tenant B2B SaaS platform for managing enterprise digital operations.',
    challenge:
      'Enterprise teams lacked an integrated workspace to monitor SLA delivery, team bandwidth allocation, and multi-client operational reporting.',
    solution:
      'Constructed a high-throughput multi-tenant SaaS application with organization tenant isolation, FastAPI backend services, and Next.js reactive dashboards.',
    tags: ['React.js', 'Next.js', 'Node.js', 'FastAPI', 'PostgreSQL', 'REST APIs'],
    projectUrl: 'https://revomo.app/',
  },
  {
    id: 'genius',
    title: 'Genius',
    slug: 'genius',
    client: 'Genius SaaS',
    industry: 'SaaS / Business Operations',
    categories: ['SaaS'],
    tier: 'Selected Work',
    description: 'A billing and usage management platform for SaaS businesses.',
    challenge:
      'The business needed clear, centralized visibility into subscriptions, usage, and billing across accounts, instead of managing this information across disconnected tools.',
    solution:
      'Built a billing-first SaaS platform with organization and account management, usage tracking, and dashboard-driven workflows for plans and subscriptions.',
    tags: ['React.js', 'TypeScript', 'Node.js', 'REST APIs', 'PostgreSQL'],
    results: 'Genius helps the business manage billing operations in one centralized system, improving visibility into subscriptions, usage, plans, and account information.',
  },
  {
    id: 'nexxos',
    title: 'Nexxos',
    slug: 'nexxos',
    client: 'Nexxos AI',
    industry: 'Artificial Intelligence / SaaS',
    categories: ['AI'],
    tier: 'Selected Work',
    description: 'An AI agent platform combining conversational, voice, and video communication.',
    challenge:
      'Businesses needed to automate customer conversations and operational workflows across voice, video, and chat, without stitching together separate point solutions for each channel.',
    solution:
      'Built a unified AI agent platform with conversation, voice, and video capabilities, backed by knowledge management, telephony integration, and usage-based billing, all on a single API-driven architecture.',
    tags: ['React.js', 'Next.js', 'Node.js', 'FastAPI', 'AI APIs', 'PostgreSQL'],
    results: 'Nexxos lets businesses automate customer interactions and operational workflows with intelligent AI agents on one centralized platform.',
  },
  {
    id: 'orion-dxn',
    title: 'Orion DXN',
    slug: 'orion-dxn',
    client: 'Orion DXN',
    industry: 'Real Estate / Property Management',
    categories: ['Enterprise'],
    tier: 'Selected Work',
    description: 'A B2B property management system covering the full sales and management lifecycle.',
    challenge:
      'Property inventory, brokers, customers, bookings, payments, and post-sales activity were handled separately, making it hard to get a single view of a deal from first inquiry to possession.',
    solution:
      'Built a role-based platform — Super Admin, Broker, Sales, Accounts, Post Sales, Customer — where each role gets the workflows and information relevant to their responsibilities, backed by flexible payment plan and booking workflows.',
    tags: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'Sequelize'],
    results: 'Orion DXN brings property inventory, brokers, customers, bookings, transactions, payments, documents, and post-sales activity into one unified platform.',
    projectUrl: 'https://erp.dxnorion.com/',
  },
  {
    id: 'ops-ticket',
    title: 'OPS Ticket',
    slug: 'ops-ticket',
    client: 'OPS Ticket',
    industry: 'Business Operations / Enterprise',
    categories: ['Enterprise'],
    tier: 'Selected Work',
    description: 'An operations and ticket management platform for structured internal workflows.',
    challenge:
      'Operational requests and internal issues were tracked inconsistently across teams, making it hard to see what was pending, who owned it, and how close it was to resolution.',
    solution:
      'Built a ticket lifecycle system — created, assigned, in progress, resolved, closed — with priority and status tracking so operational teams always have visibility into pending and active work.',
    tags: ['React.js', 'TypeScript', 'Node.js', 'REST APIs'],
    results: 'OPS Ticket helps the organization centralize operational requests, improve team accountability, track resolution times, and maintain visibility into day-to-day operations.',
    projectUrl: 'https://opsticket.com/',
  },
  {
    id: 'murex-trading-platform',
    title: 'Murex Trading Platform',
    slug: 'murex-trading-platform',
    client: 'Tata Consultancy Services',
    industry: 'Banking / Capital Markets',
    categories: ['Enterprise', 'FinTech'],
    tier: 'Team Experience',
    description: 'Development, customization, and support for a Murex trading platform used for office operations.',
    challenge:
      'The trading platform required ongoing enhancements, integration work, and production support to keep operations running reliably while meeting regulatory requirements.',
    solution:
      'Delivered robust, scalable enhancements across MxML, Datamart, workflows, and integration interfaces, while coordinating with cross-functional teams and global financial stakeholders.',
    tags: ['Core Java', 'Spring', 'Spring Boot', 'MxML', 'Oracle'],
    results: 'Ongoing enhancements and support have kept the trading platform aligned with evolving client and regulatory requirements.',
    projectUrl: 'https://www.murex.com/',
  },
  {
    id: 'questdirect',
    title: 'QuestDirect',
    slug: 'questdirect',
    client: 'Quest Diagnostics',
    industry: 'Healthcare',
    categories: ['Healthcare', 'Websites'],
    tier: 'Team Experience',
    description: 'A lab test ordering platform offering convenient scheduling and confidential results.',
    challenge:
      'Users needed a straightforward way to browse, order, and schedule lab tests online while keeping results handling secure and confidential.',
    solution:
      'Built controllers for handling HTTP requests from the UI, wired DAO components with Spring, implemented RESTful web services, and utilized Hibernate with stored procedures for database access.',
    tags: ['Java', 'Spring', 'Hibernate', 'REST APIs', 'SQL Server'],
    results: 'QuestDirect gives users a simple, secure way to order lab tests, schedule appointments, and receive confidential results online.',
    projectUrl: 'https://www.questhealth.com/',
  },
  {
    id: 'myquest',
    title: 'MyQuest',
    slug: 'myquest',
    client: 'Quest Diagnostics',
    industry: 'Healthcare',
    categories: ['Healthcare', 'Mobile App'],
    tier: 'Team Experience',
    description: 'A free, secure app for retrieving test results, scheduling appointments, and tracking health history.',
    challenge:
      'Patients needed a secure, self-service way to access their lab results and manage appointments without relying on manual processes.',
    solution:
      'Contributed to consuming and implementing RESTful services, SMS notifications, and user-friendly mobile health record navigation.',
    tags: ['Java', 'Spring', 'Hibernate', 'REST APIs', 'SQL Server'],
    results: 'MyQuest gives patients secure, self-service access to test results, appointments, and health history from a single account.',
    projectUrl: 'https://myquest.questdiagnostics.com/',
  },
  {
    id: 'workforcegov',
    title: 'WorkforceGov',
    slug: 'workforcegov',
    client: 'Cognizant / Public Sector',
    industry: 'Public Sector & Employment',
    categories: ['Enterprise'],
    tier: 'Team Experience',
    description: 'A microservices-based web app managing government employment schemes with role-based Angular dashboards and ASP.NET Core APIs.',
    challenge:
      'Managing multi-tier government employment initiatives required strict role-based access for administrators, job-seekers, and employers, alongside high-performance database querying and robust security.',
    solution:
      'Designed and built RESTful APIs using ASP.NET Core and Entity Framework Core, implemented RBAC with JWT authentication, and developed role-based Angular dashboards.',
    tags: ['ASP.NET Core', 'Entity Framework Core', 'Angular', 'SQL Server', 'JWT', 'REST APIs', 'Microservices'],
    results: 'WorkforceGov streamlined government employment scheme administration and provided a secure, responsive platform for thousands of applicants and employers.',
  },
  {
    id: 'ai-library-system',
    title: 'AI-Integrated Library System',
    slug: 'ai-library-system',
    client: 'Academic & Community Portal',
    industry: 'Education / AI',
    categories: ['AI'],
    tier: 'Team Experience',
    description: 'A web-based library management platform with an AI chatbot powered by a RAG pipeline and AWS S3 book storage.',
    challenge:
      'Traditional library portals suffer from slow search, manual support bottlenecks for students finding materials, and static inventory lookups.',
    solution:
      'Built a full-stack platform with React and Node.js, integrating an AI chatbot with LangChain and FastAPI using RAG, coupled with MongoDB and AWS S3 for scalable document access.',
    tags: ['React.js', 'Node.js', 'Express.js', 'FastAPI', 'LangChain', 'MongoDB', 'AWS S3', 'JWT', 'Bcrypt'],
    results: 'Reduced manual student support queries, cut security vulnerabilities by 35%, and improved page load performance by 15%.',
  },
  {
    id: 'airline-management-system',
    title: 'Airline Management System',
    slug: 'airline-management-system',
    client: 'Engineering Project',
    industry: 'Aviation & Travel',
    categories: ['Enterprise'],
    tier: 'Team Experience',
    description: 'A microservices-based airline management backend with 4 decoupled services, RabbitMQ message broker, and JWT auth.',
    challenge:
      'Monolithic airline systems encounter major bottlenecks during high-traffic booking surges and struggle with reliable inter-service notifications.',
    solution:
      'Architected a decoupled microservices ecosystem using Node.js, Express, MySQL, and Sequelize, leveraging RabbitMQ for asynchronous inter-service communication.',
    tags: ['Node.js', 'Express.js', 'MySQL', 'Sequelize', 'RabbitMQ', 'Microservices', 'JWT', 'Bcrypt'],
    results: 'Decreased inter-service response latency by 45% through RabbitMQ optimization and established a fault-tolerant booking infrastructure.',
  },
  {
    id: 'frame-katha-studio',
    title: 'Frame Katha Studio',
    slug: 'frame-katha-studio',
    client: 'Frame Katha Studio',
    industry: 'Media Production / Photography & Videography',
    categories: ['Websites'],
    tier: 'Team Experience',
    description: 'A fast, responsive showcase web application built with React for a creative visual media and cinematography studio.',
    challenge:
      'The studio needed a fast-loading, visually rich web presence to exhibit high-definition video reels, photography galleries, and production services with smooth UI interactions and zero layout shifts on mobile devices.',
    solution:
      'Engineered a fast, lightweight React single-page application with responsive layouts, lazy-loaded media assets, modern component architecture, and smooth client-side performance.',
    tags: ['React.js', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Responsive Web Design', 'Vite', 'Performance Optimization', 'SEO-Friendly Development'],
    results: 'Frame Katha Studio gained an elegant, high-speed React web presence that showcases their cinematic productions and drives client booking inquiries.',
    projectUrl: 'https://framekathastudio.com/',
  },
  {
    id: 'iko-intl',
    title: 'International Kiteboarding Organization (IKO)',
    slug: 'iko-intl',
    client: 'International Kiteboarding Organization',
    industry: 'Sports & Training / Global Community',
    categories: ['Enterprise', 'Websites'],
    tier: 'Team Experience',
    description: 'A global training, certification, and member portal powered by a decoupled Drupal architecture.',
    challenge:
      'Supporting thousands of global kiteboarders, instructors, and training centers across multiple languages and timezones required a high-reliability CMS backend with custom certification workflows and API integrations.',
    solution:
      'Contributed to developing custom Drupal modules, Views, user role permissions, and API integrations connecting the Drupal backend to member applications and center management workflows.',
    tags: ['Drupal', 'PHP', 'MySQL', 'Drupal Modules & Views', 'REST APIs', 'API Integration', 'CMS Customization'],
    results: 'Delivered a scalable Drupal architecture supporting tens of thousands of active kiteboarding members and certified centers worldwide.',
    projectUrl: 'https://www.ikointl.com/',
  },
  {
    id: 'wild-as-the-wind',
    title: 'Wild As The Wind',
    slug: 'wild-as-the-wind',
    client: 'Wild As The Wind UK',
    industry: 'Health & Wellness / Natural Skincare',
    categories: ['eCommerce'],
    tier: 'Team Experience',
    description: 'An established UK natural skincare and essential oils e-commerce platform with rich educational content.',
    challenge:
      'The store required fast page rendering with extensive media catalogs, complex product variations, multi-tier navigation, and strict speed optimization under heavy organic search traffic.',
    solution:
      'Delivered CMS customization, responsive theme enhancements, caching configuration, database optimization, and streamlined cart and checkout workflows to maximize conversions.',
    tags: ['CMS Customization', 'WooCommerce', 'PHP', 'MySQL', 'Responsive Web Design', 'Performance Optimization', 'SEO-Friendly Development'],
    results: 'Enhanced page speed, improved organic search discoverability, and delivered a reliable shopping experience for thousands of UK customers.',
    projectUrl: 'https://wildasthewind.com/',
  },
  {
    id: 'sageflow-labs',
    title: 'Sageflow Labs',
    slug: 'sageflow-labs',
    client: 'Sageflow Labs',
    industry: 'Engineering Consulting & Technology Services',
    categories: ['Enterprise', 'Websites'],
    tier: 'Team Experience',
    description: 'A high-performance digital consulting web platform showcasing enterprise engineering platforms and solutions.',
    challenge:
      'Communicating multi-practice technical engineering depth with a fast, modern visual design, interactive platform previews, and high conversion for enterprise briefs.',
    solution:
      'Engineered responsive interactive components, platform preview dashboards, dark/light theme balancing, and fast-loading web architecture optimized for corporate stakeholders.',
    tags: ['JavaScript', 'HTML5 & CSS3', 'Responsive Web Design', 'Performance Optimization', 'SEO-Friendly Development', 'CMS Customization'],
    results: 'Delivered an authoritative, fast-loading digital web presence that effectively positions Sageflow Labs for enterprise consulting engagements.',
    projectUrl: 'https://www.sageflow.in/',
  },
  {
    id: 'skipta',
    title: 'Skipta',
    slug: 'skipta',
    client: 'Skipta / Norstella',
    industry: 'Healthcare & Medical / Professional Social Networks',
    categories: ['Enterprise', 'Healthcare'],
    tier: 'Team Experience',
    description: 'A private, secure medical social network and collaboration platform for verified healthcare professionals.',
    challenge:
      'Building a secure, HIPAA-compliant collaboration platform for verified medical doctors that handles thousands of daily discussions, real-time case consultations, and restricted access with enterprise-grade security.',
    solution:
      'Contributed to enterprise Drupal modules, customized user permission hierarchies, secured database workflows, and optimized caching to support high-concurrency engagement across specialized medical specialties.',
    tags: ['Drupal', 'PHP', 'MySQL', 'Drupal Modules & Views', 'Enterprise Security', 'REST APIs', 'Performance Optimization'],
    results: 'Delivered a reliable, secure Drupal community infrastructure that powers peer collaboration for hundreds of thousands of verified healthcare practitioners.',
    projectUrl: 'https://www.skipta.com/',
  },
  {
    id: 'indiecommerce',
    title: 'IndieCommerce',
    slug: 'indiecommerce',
    client: 'American Booksellers Association (ABA)',
    industry: 'Publishing & Retail / Independent Bookstores',
    categories: ['eCommerce'],
    tier: 'Team Experience',
    description: 'A national e-commerce platform built on Drupal empowering hundreds of independent bookstores across the United States.',
    challenge:
      'Serving hundreds of independent bookstores with high-volume book catalogues, real-time distributor inventories, POS synchronization, and peak shopping surges during holiday seasons.',
    solution:
      'Contributed to large-scale Drupal multisite architecture, custom inventory synchronization modules, high-throughput checkout processing, and performance scaling under heavy transactional volume.',
    tags: ['Drupal', 'PHP', 'MySQL', 'Drupal Commerce', 'Multisite Architecture', 'API Integration', 'Performance Optimization'],
    results: 'Empowered independent bookstores nationwide to process millions of dollars in annual online book sales on a scalable, resilient Drupal commerce infrastructure.',
    projectUrl: 'https://indiecommerce.com/',
  },
  {
    id: 'tikawoo',
    title: 'Tikawoo',
    slug: 'tikawoo',
    client: 'Chiripal Group',
    industry: 'Beauty & Wellness / On-Demand Services',
    categories: ['Mobile App'],
    tier: 'Team Experience',
    description: 'A React Native beauty salon booking app with browsing, scheduling, checkout, and chat (internally built as Beautify).',
    challenge:
      'Salon customers needed a single mobile app to discover salons, book services, pay, and stay in touch with the salon before and after their appointment, across both iOS and Android.',
    solution:
      'Built the app\'s authentication, salon browsing, booking, checkout, and chat flows in React Native, integrating REST APIs and handling state management, navigation, and performance across platforms.',
    tags: ['React Native', 'REST APIs'],
    results: 'Tikawoo is live on the Google Play Store, giving salon customers a complete booking experience from discovery to appointment.',
    projectUrl: 'https://play.google.com/store/apps/details?id=com.chiripalgroup.tikawoo',
  },
  {
    id: 'vigilens',
    title: 'Vigilens',
    slug: 'vigilens',
    client: 'Vigilens Vision',
    industry: 'Healthcare / Computer Vision',
    categories: ['Mobile App', 'AI'],
    tier: 'Team Experience',
    description: 'An iOS/React Native fatigue detection app that analyzes facial and eye movement in real time.',
    challenge:
      'Detecting fatigue reliably required real-time camera processing and precise facial/eye tracking, going beyond standard React Native camera APIs into native iOS vision capabilities.',
    solution:
      'Integrated Apple\'s native Vision Framework with React Native (via Vision Camera and native Swift modules) to process camera frames in real time, calculate Eye Aspect Ratio, and surface fatigue levels and recommendations to the user.',
    tags: ['React Native', 'TypeScript', 'Swift', 'Apple Vision Framework', 'Redux'],
    results: 'Vigilens gives users real-time, on-device fatigue detection using native iOS vision capabilities wrapped in a React Native app.',
  },
  {
    id: 'myelth',
    title: 'myElth',
    slug: 'myelth',
    client: 'myElth Health',
    industry: 'Healthcare',
    categories: ['Mobile App', 'Healthcare'],
    tier: 'Team Experience',
    description: 'A healthcare app for managing electronic health records, insurance benefits, and family healthcare in one place.',
    challenge:
      'Patients and families needed one place to store medical history from multiple providers, track insurance coverage and costs, and manage healthcare for dependents, while paying securely for services.',
    solution:
      'Built health record management, insurance tracking, secure record sharing, and family/dependent management features, and integrated Stripe and Apple Pay for secure payments.',
    tags: ['React Native', 'TypeScript', 'Stripe', 'Apple Pay', 'REST APIs'],
    results: 'myElth gives patients and families a secure, single place to manage health records, insurance, and payments.',
    projectUrl: 'https://play.google.com/store/apps/details?id=com.eit.srd',
  },
  {
    id: 'pepsico-minegocio',
    title: 'PepsiCo Mi Negocio+',
    slug: 'pepsico-minegocio',
    client: 'PepsiCo',
    industry: 'Consumer Goods / Retail Distribution',
    categories: ['Mobile App', 'Enterprise'],
    tier: 'Team Experience',
    description: 'A React Native business app built for PepsiCo, published on the Google Play Store.',
    challenge:
      'PepsiCo needed a dedicated business mobile app for commercial distribution partners and B2B store merchants across Latin America.',
    solution:
      'Contributed to building, optimizing, and shipping the React Native application on the Google Play Store.',
    tags: ['React Native'],
    results: 'Mi Negocio+ is live on the Google Play Store for PepsiCo distribution partners.',
    projectUrl: 'https://play.google.com/store/apps/details?id=com.pepsicoconsumer.minegocio',
  },
  {
    id: 'mypepsico-requestor',
    title: 'MyPepsiCo Requestor',
    slug: 'mypepsico-requestor',
    client: 'PepsiCo',
    industry: 'Consumer Goods / Enterprise IT',
    categories: ['Mobile App', 'Enterprise'],
    tier: 'Team Experience',
    description: 'A ServiceNow-based requestor mobile app built for PepsiCo, live on the Google Play Store.',
    challenge:
      'PepsiCo internal workforce required an on-the-go mobile service request application integrated into enterprise ServiceNow infrastructure.',
    solution:
      'Contributed to building and shipping the production React Native requestor client application on the Google Play Store.',
    tags: ['React Native'],
    results: 'MyPepsiCo Requestor is live on the Google Play Store for PepsiCo global employees.',
    projectUrl: 'https://play.google.com/store/apps/details?id=com.servicenow.public.mypepsico.requestor',
  },
  {
    id: 'spade-king',
    title: 'Spade-King',
    slug: 'spade-king',
    client: 'Spade-King',
    industry: 'Stock Market Education',
    categories: ['Mobile App', 'FinTech'],
    tier: 'Team Experience',
    description: 'A stock market learning and paper trading mobile app built with React Native.',
    challenge:
      'Beginners needed a safe way to learn stock trading and practice strategies without financial risk.',
    solution:
      'Contributed to building the app\'s React Native mobile experience for stock market learning and simulated (paper) trading.',
    tags: ['React Native'],
    results: 'Spade-King gives users a risk-free way to learn and practice stock trading.',
  },
  {
    id: 'voila-cabs',
    title: 'Voila Cabs',
    slug: 'voila-cabs',
    client: 'Voila Cabs',
    industry: 'Transportation / Ride Booking',
    categories: ['Mobile App'],
    tier: 'Team Experience',
    description: 'A cab booking platform with a companion mobile app.',
    challenge:
      'Riders needed a reliable mobile way to book cabs, view driver ETA, and manage trips across city locations.',
    solution:
      'Contributed to building the mobile app as part of the Voila Cabs fleet engagement.',
    tags: ['React Native'],
    results: 'Voila Cabs\' mobile app gives riders a way to book cabs directly from their phone.',
    projectUrl: 'https://voilacabs.com/',
  },
  {
    id: 'customer-value-intelligence-system',
    title: 'Customer Value Intelligence System (CVIS)',
    slug: 'customer-value-intelligence-system',
    client: 'NIELIT Kurukshetra',
    industry: 'Retail / Customer Analytics',
    categories: ['Data Analytics'],
    tier: 'Team Experience',
    description: 'A customer analytics and BI platform analyzing 392K+ retail transactions to identify high-value customer segments.',
    challenge:
      'The retailer needed to turn a large, messy transaction dataset into clear customer segments and revenue insights that could drive targeted marketing and retention decisions.',
    solution:
      'Cleaned and validated the transaction data, engineered RFM (Recency, Frequency, Monetary) features to segment customers, and analyzed Customer Lifetime Value and purchasing behavior to surface priority customer groups.',
    tags: ['Python', 'Pandas', 'NumPy', 'RFM Analysis', 'Business Intelligence'],
    results: 'CVIS turned 392K+ raw transactions into segmented, dashboard-ready customer insights for targeted marketing and retention.',
  },
  {
    id: 'mytaskmate-ai',
    title: 'MyTaskMate AI',
    slug: 'mytaskmate-ai',
    client: 'C-DAC Pune',
    industry: 'Productivity / AI Tools',
    categories: ['Data Analytics', 'AI'],
    tier: 'Team Experience',
    description: 'A database-backed productivity assistant with semantic search, built during an AI/ML internship at C-DAC Pune.',
    challenge:
      'Keyword-only search made it hard to retrieve relevant tasks and notes quickly; the assistant needed structured storage plus retrieval that understood meaning, not just exact matches.',
    solution:
      'Integrated PostgreSQL for structured storage, implemented semantic retrieval so information could be found by meaning, and optimized search with FAISS for significantly faster lookups.',
    tags: ['Python', 'PostgreSQL', 'FAISS', 'LangChain', 'LLMs'],
    results: 'MyTaskMate AI achieved roughly 3x faster information retrieval through FAISS-optimized semantic search.',
  },
  {
    id: 'ai-career-recommender',
    title: 'AI Career Recommender',
    slug: 'ai-career-recommender',
    client: 'Engineering Innovation',
    industry: 'Career / Education Technology',
    categories: ['Data Analytics', 'AI'],
    tier: 'Team Experience',
    description: 'An NLP-based system that recommends personalized career paths from a user\'s skills and interests, with 86% classification accuracy.',
    challenge:
      'Turning free-form user input about skills and interests into structured, machine-readable features that a classifier could use to make relevant career recommendations.',
    solution:
      'Applied NLP-based text preprocessing and feature extraction, then built and evaluated a Scikit-learn classification pipeline, wrapping the model in an interactive Streamlit app.',
    tags: ['Python', 'NLP', 'Scikit-learn', 'Streamlit'],
    results: 'The classification pipeline achieved 86% accuracy in recommending relevant, personalized career paths.',
  },
  {
    id: 'meddiagnose-ai',
    title: 'MedDiagnose AI',
    slug: 'meddiagnose-ai',
    client: 'Clinical Research Project',
    industry: 'Healthcare / Clinical Analytics',
    categories: ['Data Analytics', 'Healthcare'],
    tier: 'Team Experience',
    description: 'A healthcare analytics and machine learning project identifying patterns in clinical datasets with an XGBoost classification pipeline.',
    challenge:
      'Clinical datasets have many interacting variables; understanding which factors relate to outcomes and which drive model predictions required both statistical analysis and interpretable modeling.',
    solution:
      'Performed EDA and statistical analysis with Pandas, visualized feature distributions and correlations with Matplotlib, and built an XGBoost classification pipeline with feature importance analysis to interpret prediction drivers.',
    tags: ['Python', 'Pandas', 'Matplotlib', 'Scikit-learn', 'XGBoost'],
    results: 'MedDiagnose AI surfaced the clinical variables most predictive of outcomes through feature importance analysis on an XGBoost model.',
  },
];

export function getAllPortfolioProjects(): PortfolioProject[] {
  return PORTFOLIO_PROJECTS;
}

export function getPortfolioCategories(): string[] {
  const categorySet = new Set<string>();
  PORTFOLIO_PROJECTS.forEach((p) => {
    p.categories.forEach((cat) => categorySet.add(cat));
  });
  return ['All', ...Array.from(categorySet).sort()];
}

export function getProjectsByCategory(category: string): PortfolioProject[] {
  if (!category || category === 'All') {
    return PORTFOLIO_PROJECTS;
  }
  return PORTFOLIO_PROJECTS.filter((p) => p.categories.includes(category));
}

export function getFeaturedProjects(): PortfolioProject[] {
  return PORTFOLIO_PROJECTS.filter((p) => p.featured || p.tier === 'Featured');
}
