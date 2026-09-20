import { PrismaClient, Role, LeadStatus, BudgetTier, ProjectStatus, MilestoneStatus, TaskStatus, Priority, InvoiceStatus, ProposalStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting DiziBrand Media database seed...');
  console.log('⚠️  All seeded data is explicitly tagged [DEMO / TEST DATA] adhering to zero-fake-proof policy.');

  // 1. Clean existing test data safely
  await prisma.auditLog.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.message.deleteMany();
  await prisma.fileAttachment.deleteMany();
  await prisma.supportTicket.deleteMany();
  await prisma.deliverable.deleteMany();
  await prisma.subtask.deleteMany();
  await prisma.task.deleteMany();
  await prisma.milestone.deleteMany();
  await prisma.projectMember.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.contract.deleteMany();
  await prisma.proposal.deleteMany();
  await prisma.project.deleteMany();
  await prisma.call.deleteMany();
  await prisma.meeting.deleteMany();
  await prisma.note.deleteMany();
  await prisma.leadScoreHistory.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.freelancerProfile.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();
  await prisma.company.deleteMany();
  await prisma.caseStudy.deleteMany();
  await prisma.service.deleteMany();
  await prisma.industry.deleteMany();

  // 2. Hash default test password
  const defaultPasswordHash = await bcrypt.hash('DiziBrand2026!Secure', 10);

  // 3. Seed Industries
  const indSaas = await prisma.industry.create({
    data: {
      slug: 'saas-b2b',
      name: 'SaaS & B2B Technology',
      headline: 'Accelerating ARR Growth & Engineering Scale for B2B Cloud Platforms',
      overview: 'Strategic marketing engines, AI agent workflows, and scalable cloud engineering for software companies.',
      challenges: ['High customer acquisition costs', 'Slow developer velocity', 'Complex multi-touch attribution'],
      solutions: ['Account-based marketing pipelines', 'Autonomous support agents', 'Microservices modernization'],
      order: 1,
    },
  });

  const indEcommerce = await prisma.industry.create({
    data: {
      slug: 'ecommerce-d2c',
      name: 'E-commerce & Direct-to-Consumer',
      headline: 'Omnichannel Performance Marketing & Headless Commerce Infrastructure',
      overview: 'Maximizing ROAS, repeat customer LTV, and building ultra-fast headless storefronts.',
      challenges: ['Platform commission fee erosion', 'Ad fatigue on Meta/Google', 'Inventory forecasting latency'],
      solutions: ['First-party data CDP deployment', 'Predictive demand modeling', 'Headless Shopify/Next.js migration'],
      order: 2,
    },
  });

  // 4. Seed Services
  const srvDigitalCMO = await prisma.service.create({
    data: {
      slug: 'digital-cmo',
      title: 'Digital CMO (Fractional CMO)',
      tagline: 'Executive Marketing Leadership on Demand',
      category: 'Leadership',
      description: 'Senior strategic marketing leadership embedded in your executive team to direct brand positioning, acquisition economics, and team governance.',
      benefits: ['Eliminates $350k+ full-time executive salary overhead', 'Multi-channel acquisition architecture', 'Board-level growth reporting'],
      deliverables: ['Quarterly Growth Roadmap', 'Customer Journey Blueprint', 'Attribution & Unit Economics Model'],
      isFeatured: true,
      order: 1,
    },
  });

  const srvDigitalCTO = await prisma.service.create({
    data: {
      slug: 'digital-cto',
      title: 'Digital CTO (Fractional CTO)',
      tagline: 'Enterprise Technology & AI Strategy',
      category: 'Leadership',
      description: 'Elite technical leadership steering cloud infrastructure, AI adoption, engineering architecture, and enterprise security compliance.',
      benefits: ['Strategic architecture oversight without full-time executive cost', 'AI & LLM integration roadmap', 'Engineering velocity optimization'],
      deliverables: ['System Architecture Specification', 'Cloud Infrastructure Audit', 'AI Integration Playbook'],
      isFeatured: true,
      order: 2,
    },
  });

  const srvAIAgents = await prisma.service.create({
    data: {
      slug: 'ai-agents',
      title: 'Autonomous AI Agents & Automation',
      tagline: 'Deploy Intelligent Workflow Agents Across Your Enterprise',
      category: 'AI',
      description: 'Custom autonomous LLM agents that execute repetitive workflows, handle customer inquiries, analyze documents, and trigger backend actions.',
      benefits: ['24/7 autonomous workflow execution', 'Drastic reduction in operational handling times', 'Seamless API integration with internal CRMs'],
      deliverables: ['Custom Trained Agent System', 'Vector Search Pipeline', 'Monitoring & Guardrail Dashboard'],
      isFeatured: true,
      order: 3,
    },
  });

  const srvWebDev = await prisma.service.create({
    data: {
      slug: 'website-development',
      title: 'Enterprise Website & Web App Development',
      tagline: 'High-Performance Next.js & React Web Experiences',
      category: 'Technology',
      description: 'State-of-the-art web applications engineered with Next.js, TypeScript, and modern headless CMS architecture for flawless Core Web Vitals.',
      benefits: ['Sub-2-second load times worldwide', 'Engineered for conversion rate maximization', 'Intuitive headless CMS editing'],
      deliverables: ['Production Next.js Codebase', 'Figma Component Design System', 'Automated CI/CD Pipeline'],
      isFeatured: true,
      order: 4,
    },
  });

  // 5. Seed Demo Client Company
  const demoCompany = await prisma.company.create({
    data: {
      name: 'Acme Cloud Dynamics [DEMO / TEST DATA]',
      website: 'https://acme-demo.example.com',
      industryId: indSaas.id,
      country: 'United States',
      city: 'San Francisco',
      annualRevenue: '$15M ARR',
      employeeCount: '120',
    },
  });

  // 6. Seed System Users Across All 7 Roles
  const userAdmin = await prisma.user.create({
    data: {
      name: 'Elena Rostova (Super Admin) [DEMO]',
      email: 'admin@dizibrandmedia.com',
      passwordHash: defaultPasswordHash,
      role: Role.SUPER_ADMIN,
    },
  });

  const userManagement = await prisma.user.create({
    data: {
      name: 'David Vance (Executive Director) [DEMO]',
      email: 'director@dizibrandmedia.com',
      passwordHash: defaultPasswordHash,
      role: Role.MANAGEMENT,
    },
  });

  const userSales = await prisma.user.create({
    data: {
      name: 'Sarah Connor (Growth Lead) [DEMO]',
      email: 'sales@dizibrandmedia.com',
      passwordHash: defaultPasswordHash,
      role: Role.SALES,
    },
  });

  const userPM = await prisma.user.create({
    data: {
      name: 'Marcus Thorne (Agile PM) [DEMO]',
      email: 'pm@dizibrandmedia.com',
      passwordHash: defaultPasswordHash,
      role: Role.PROJECT_MANAGER,
    },
  });

  const userDev = await prisma.user.create({
    data: {
      name: 'Alex Rivera (Senior Full-Stack & AI) [DEMO]',
      email: 'engineer@dizibrandmedia.com',
      passwordHash: defaultPasswordHash,
      role: Role.EMPLOYEE,
    },
  });

  const userFreelancer = await prisma.user.create({
    data: {
      name: 'Sofia Chen (Motion & UI Contractor) [DEMO]',
      email: 'freelancer@dizibrandmedia.com',
      passwordHash: defaultPasswordHash,
      role: Role.FREELANCER,
    },
  });

  await prisma.freelancerProfile.create({
    data: {
      userId: userFreelancer.id,
      skills: ['Figma', 'Framer Motion', '3D Spline', 'Three.js'],
      hourlyRate: 85.00,
      portfolioUrl: 'https://portfolio.example.com',
      isVetted: true,
      availabilityHoursPerWeek: 20,
    },
  });

  const userClient = await prisma.user.create({
    data: {
      name: 'Jonathan Miller (VP Product, Acme Corp) [DEMO]',
      email: 'client@acmecorp.com',
      passwordHash: defaultPasswordHash,
      role: Role.CLIENT,
      companyId: demoCompany.id,
    },
  });

  // 7. Seed Demo Leads Across Pipeline Stages
  await prisma.lead.create({
    data: {
      firstName: 'Kavita',
      lastName: 'Iyer',
      email: 'kavita@fintech-demo.in',
      phone: '+91 98765 43210',
      country: 'India',
      companyName: 'FinNova India [DEMO / TEST DATA]',
      website: 'https://finnova-demo.in',
      serviceId: srvDigitalCTO.id,
      serviceName: 'Digital CTO (Fractional CTO)',
      projectDescription: 'We are expanding to the UAE market and need complete architectural oversight to scale our payment gateway APIs and comply with local data regulations.',
      budgetTier: BudgetTier.INR_8L_20L,
      timeline: '1-3 Months',
      status: LeadStatus.NEW,
      score: 84,
      scoreBreakdown: { budget: 28, service: 25, company: 15, geo: 8, completeness: 8 },
      source: 'website_lead_form',
      assignedToId: userSales.id,
    },
  });

  const wonLead = await prisma.lead.create({
    data: {
      firstName: 'Jonathan',
      lastName: 'Miller',
      email: 'client@acmecorp.com',
      phone: '+1 (415) 555-0199',
      country: 'United States',
      companyName: 'Acme Cloud Dynamics [DEMO / TEST DATA]',
      website: 'https://acme-demo.example.com',
      serviceId: srvAIAgents.id,
      serviceName: 'Autonomous AI Agents & Automation',
      projectDescription: 'Deploy autonomous triage agents across Zendesk and Jira to resolve tier-1 technical support requests.',
      budgetTier: BudgetTier.ABOVE_25000,
      timeline: 'Immediate',
      status: LeadStatus.WON,
      score: 95,
      scoreBreakdown: { budget: 35, service: 22, company: 20, geo: 10, completeness: 8 },
      source: 'book_consultation',
      assignedToId: userSales.id,
      companyId: demoCompany.id,
    },
  });

  // 8. Seed Demo Project for Won Lead
  const demoProject = await prisma.project.create({
    data: {
      projectCode: 'PRJ-ACME-01',
      name: 'Autonomous AI Triage Agent Deployment [DEMO / TEST DATA]',
      companyId: demoCompany.id,
      leadId: wonLead.id,
      managerId: userPM.id,
      status: ProjectStatus.ACTIVE,
      health: 'Green',
      startDate: new Date('2026-09-01'),
      targetDate: new Date('2026-11-30'),
      budget: 35000.00,
      currency: 'USD',
    },
  });

  // Project Members
  await prisma.projectMember.createMany({
    data: [
      { projectId: demoProject.id, userId: userPM.id, roleInProject: 'Project Manager' },
      { projectId: demoProject.id, userId: userDev.id, roleInProject: 'Lead AI Engineer' },
      { projectId: demoProject.id, userId: userFreelancer.id, roleInProject: 'UI/UX Specialist' },
    ],
  });

  // Milestones
  const m1 = await prisma.milestone.create({
    data: {
      projectId: demoProject.id,
      title: 'Phase 1: Architecture & Vector Database Ingestion [DEMO]',
      description: 'Define agent system boundaries, sanitize support knowledgebase, and build vector embeddings.',
      order: 1,
      status: MilestoneStatus.COMPLETED,
      isClientApprovalRequired: true,
      clientApprovedAt: new Date('2026-09-15'),
      clientApprovedById: userClient.id,
    },
  });

  const m2 = await prisma.milestone.create({
    data: {
      projectId: demoProject.id,
      title: 'Phase 2: Agent Orchestration & Guardrails [DEMO]',
      description: 'Develop agent tool-use capabilities, prompt sanitization, and Zendesk API webhooks.',
      order: 2,
      status: MilestoneStatus.IN_PROGRESS,
      isClientApprovalRequired: true,
    },
  });

  // Tasks
  await prisma.task.create({
    data: {
      projectId: demoProject.id,
      milestoneId: m2.id,
      title: 'Build Zendesk Webhook Event Listener [DEMO]',
      description: 'Create authenticated route handler in Next.js to ingest inbound tickets with HMAC signature verification.',
      status: TaskStatus.IN_PROGRESS,
      priority: Priority.HIGH,
      assignedToId: userDev.id,
      estimatedHours: 16.0,
      actualHours: 10.5,
    },
  });

  await prisma.task.create({
    data: {
      projectId: demoProject.id,
      milestoneId: m2.id,
      title: 'Design Agent Conversation Review Interface [DEMO]',
      description: 'Create review cards in Client Portal for Acme stakeholders to rate agent response accuracy.',
      status: TaskStatus.TODO,
      priority: Priority.MEDIUM,
      assignedToId: userFreelancer.id,
      estimatedHours: 12.0,
    },
  });

  // Deliverables
  await prisma.deliverable.create({
    data: {
      projectId: demoProject.id,
      milestoneId: m1.id,
      title: 'Agent Architecture & Ingestion Report [DEMO]',
      description: 'Complete technical specification of the vector pipeline and guardrail metrics.',
      fileUrl: 'https://assets.example.com/demo/agent-spec-v1.pdf',
      status: 'Approved',
      submittedById: userDev.id,
      reviewedById: userClient.id,
      feedback: 'Approved by Jonathan Miller. Architecture is clean and conforms to Acme data governance standards.',
    },
  });

  // Invoices
  await prisma.invoice.create({
    data: {
      invoiceNumber: 'INV-2026-001 [DEMO]',
      companyId: demoCompany.id,
      projectId: demoProject.id,
      amount: 17500.00,
      totalAmount: 17500.00,
      currency: 'USD',
      status: InvoiceStatus.PAID,
      dueDate: new Date('2026-09-10'),
      paidAt: new Date('2026-09-08'),
      pdfUrl: 'https://assets.example.com/demo/inv-001.pdf',
    },
  });

  await prisma.invoice.create({
    data: {
      invoiceNumber: 'INV-2026-002 [DEMO]',
      companyId: demoCompany.id,
      projectId: demoProject.id,
      amount: 17500.00,
      totalAmount: 17500.00,
      currency: 'USD',
      status: InvoiceStatus.SENT,
      dueDate: new Date('2026-10-15'),
      pdfUrl: 'https://assets.example.com/demo/inv-002.pdf',
    },
  });

  // 9. Seed Unverified Case Studies (Adhering to zero-fake-proof)
  await prisma.caseStudy.create({
    data: {
      slug: 'enterprise-ai-support-automation',
      title: 'Autonomous Support Agent Deployment for B2B Cloud Platform',
      clientName: 'Confidential B2B SaaS Scale-Up [Pending Verification]',
      isVerified: false,
      verificationStatus: 'Pending verification',
      industryId: indSaas.id,
      serviceId: srvAIAgents.id,
      challenge: 'High customer support ticket volumes during international expansion led to delayed first-response times and increased engineering triage load.',
      solution: 'Architected and deployed an autonomous agent system integrated with existing knowledge bases and ticketing APIs with strict hallucination guardrails.',
      isPublished: false, // Remains unpublished until verified
    },
  });

  console.log('✅ Seed completed successfully!');
  console.log('Credentials Summary (Password: DiziBrand2026!Secure):');
  console.log('  - Super Admin: admin@dizibrandmedia.com');
  console.log('  - Management:  director@dizibrandmedia.com');
  console.log('  - Sales:       sales@dizibrandmedia.com');
  console.log('  - PM:          pm@dizibrandmedia.com');
  console.log('  - Specialist:  engineer@dizibrandmedia.com');
  console.log('  - Freelancer:  freelancer@dizibrandmedia.com');
  console.log('  - Client:      client@acmecorp.com');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
