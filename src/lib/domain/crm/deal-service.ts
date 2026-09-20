import { prisma } from '@/lib/db/prisma';
import {
  LeadStatus,
  ProjectStatus,
  MilestoneStatus,
  InvoiceStatus,
  AuditAction,
  BudgetTier,
} from '@prisma/client';

export interface ConvertDealInput {
  leadId: string;
  actorId?: string | null;
  actorEmail?: string | null;
  projectName?: string;
  budget?: number;
  currency?: string;
  managerId?: string | null;
  initialDepositAmount?: number;
}

export function estimateBudgetAmount(budgetTier: BudgetTier | string): number {
  switch (budgetTier) {
    case 'ABOVE_25000':
      return 35000;
    case 'TIER_10000_25000':
      return 18000;
    case 'TIER_5000_10000':
      return 7500;
    case 'TIER_2500_5000':
      return 3500;
    case 'INR_ABOVE_20L':
      return 25000;
    case 'INR_8L_20L':
      return 15000;
    case 'INR_4L_8L':
      return 6000;
    case 'INR_2L_4L':
      return 3000;
    case 'INR_UNDER_2L':
    case 'UNDER_2500':
    case 'NOT_SURE':
    default:
      return 2500;
  }
}

/**
 * Automates deal closure and client onboarding:
 * 1. Ensures Company record exists
 * 2. Ensures Primary Contact record exists
 * 3. Creates Project with initial Kickoff Milestone
 * 4. Generates Initial Deposit Invoice (DRAFT)
 * 5. Updates Lead status to WON and links Company
 * 6. Records immutable AuditLog entry
 */
export async function convertLeadToWonDeal(input: ConvertDealInput) {
  return await prisma.$transaction(async (tx) => {
    // 1. Fetch Lead
    const lead = await tx.lead.findUnique({
      where: { id: input.leadId },
      include: {
        company: true,
        service: true,
      },
    });

    if (!lead) {
      throw new Error(`Lead with ID '${input.leadId}' not found.`);
    }

    if (lead.status === LeadStatus.WON && lead.companyId) {
      // Already converted, return existing records
      const existingProject = await tx.project.findFirst({
        where: { leadId: lead.id },
      });
      return {
        alreadyConverted: true,
        companyId: lead.companyId,
        projectId: existingProject?.id,
        leadId: lead.id,
      };
    }

    // 2. Resolve or Create Company
    let companyId = lead.companyId;
    if (!companyId) {
      // Check if company with exact name exists
      const existingCompany = await tx.company.findFirst({
        where: { name: { equals: lead.companyName, mode: 'insensitive' } },
      });

      if (existingCompany) {
        companyId = existingCompany.id;
      } else {
        const newCompany = await tx.company.create({
          data: {
            name: lead.companyName,
            website: lead.website || null,
            country: lead.country,
          },
        });
        companyId = newCompany.id;
      }
    }

    // 3. Resolve or Create Primary Contact
    const existingContact = await tx.contact.findFirst({
      where: { email: lead.email },
    });

    if (!existingContact) {
      await tx.contact.create({
        data: {
          companyId,
          firstName: lead.firstName,
          lastName: lead.lastName,
          email: lead.email,
          phone: lead.phone || null,
          isPrimary: true,
        },
      });
    }

    // 4. Create Project
    const now = new Date();
    const year = now.getFullYear();
    const randomCodeSuffix = Math.floor(1000 + Math.random() * 9000);
    const projectCode = `DZB-${year}-${randomCodeSuffix}`;

    const estimatedBudget = input.budget ?? estimateBudgetAmount(lead.budgetTier);
    const currency = input.currency ?? (lead.budgetTier.toString().startsWith('INR') ? 'INR' : 'USD');

    const serviceTitle = lead.service?.title || lead.serviceName || 'Strategic Engagement';
    const projectName = input.projectName || `${lead.companyName} - ${serviceTitle}`;

    // Target date 90 days out by default
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 90);

    const project = await tx.project.create({
      data: {
        projectCode,
        name: projectName,
        companyId,
        leadId: lead.id,
        managerId: input.managerId || null,
        status: ProjectStatus.PLANNING,
        health: 'Green',
        startDate: now,
        targetDate,
        budget: estimatedBudget,
        currency,
        milestones: {
          create: [
            {
              title: 'Phase 1: Architecture & Strategic Alignment',
              description: 'Executive kickoff, deep-dive discovery, architecture specifications, and baseline alignment.',
              order: 1,
              status: MilestoneStatus.IN_PROGRESS,
              isClientApprovalRequired: true,
            },
            {
              title: 'Phase 2: Core Engineering & Campaign Deployment',
              description: 'Primary deliverables, system development, automated pipelines, and execution sprints.',
              order: 2,
              status: MilestoneStatus.UPCOMING,
              isClientApprovalRequired: true,
            },
            {
              title: 'Phase 3: Optimization, Governance & Handoff',
              description: 'Performance benchmarking, QA verification, stakeholder review, and transition governance.',
              order: 3,
              status: MilestoneStatus.UPCOMING,
              isClientApprovalRequired: true,
            },
          ],
        },
      },
    });

    // 5. Generate Initial Deposit Invoice (e.g. 40% upfront deposit or specified amount)
    const invoiceNumber = `INV-${year}-${Math.floor(1000 + Math.random() * 9000)}`;
    const depositAmount = input.initialDepositAmount ?? Math.round(estimatedBudget * 0.4);
    const invoiceDueDate = new Date();
    invoiceDueDate.setDate(invoiceDueDate.getDate() + 14);

    const invoice = await tx.invoice.create({
      data: {
        invoiceNumber,
        companyId,
        projectId: project.id,
        amount: depositAmount,
        taxAmount: 0,
        totalAmount: depositAmount,
        currency,
        status: InvoiceStatus.DRAFT,
        dueDate: invoiceDueDate,
      },
    });

    // 6. Update Lead Record
    const previousStatus = lead.status;
    const updatedLead = await tx.lead.update({
      where: { id: lead.id },
      data: {
        status: LeadStatus.WON,
        companyId,
      },
    });

    // 7. Record Immutable AuditLog
    await tx.auditLog.create({
      data: {
        actorId: input.actorId || null,
        actorEmail: input.actorEmail || null,
        action: AuditAction.STATUS_CHANGE,
        entityType: 'Lead',
        entityId: lead.id,
        changes: {
          previousStatus,
          newStatus: LeadStatus.WON,
          createdCompanyId: companyId,
          createdProjectId: project.id,
          projectCode,
          createdInvoiceId: invoice.id,
          invoiceNumber,
          dealAmount: estimatedBudget,
        },
      },
    });

    return {
      alreadyConverted: false,
      companyId,
      projectId: project.id,
      projectCode,
      invoiceId: invoice.id,
      invoiceNumber,
      lead: updatedLead,
    };
  });
}
