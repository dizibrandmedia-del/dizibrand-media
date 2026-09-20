import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { assertSuperAdmin } from '@/lib/auth/rbac';
import { prisma } from '@/lib/db/prisma';
import { LeadStatus, AuditAction } from '@prisma/client';
import { estimateBudgetAmount } from '@/lib/domain/crm/deal-service';
import { z } from 'zod';

const moveStageSchema = z.object({
  leadId: z.string().min(1, 'Lead ID is required'),
  newStatus: z.nativeEnum(LeadStatus),
});

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    assertSuperAdmin(session);

    // Fetch all leads with their relations
    const leads = await prisma.lead.findMany({
      orderBy: { updatedAt: 'desc' },
      include: {
        assignedTo: {
          select: { id: true, name: true, email: true },
        },
        company: {
          select: { id: true, name: true },
        },
        _count: {
          select: {
            notes: true,
            calls: true,
            meetings: true,
          },
        },
      },
    });

    // Group leads by stage
    const stages: Record<LeadStatus, any[]> = {
      [LeadStatus.NEW]: [],
      [LeadStatus.CONTACTED]: [],
      [LeadStatus.QUALIFIED]: [],
      [LeadStatus.MEETING]: [],
      [LeadStatus.PROPOSAL]: [],
      [LeadStatus.NEGOTIATION]: [],
      [LeadStatus.WON]: [],
      [LeadStatus.LOST]: [],
    };

    let totalPipelineValue = 0;
    let activeDealsCount = 0;

    leads.forEach((lead) => {
      const estimatedValue = estimateBudgetAmount(lead.budgetTier);
      const enrichedLead = {
        ...lead,
        estimatedValue,
      };

      if (stages[lead.status]) {
        stages[lead.status].push(enrichedLead);
      }

      if (lead.status !== LeadStatus.LOST && lead.status !== LeadStatus.WON) {
        totalPipelineValue += estimatedValue;
        activeDealsCount += 1;
      }
    });

    const stageSummaries = Object.entries(stages).map(([stage, stageLeads]) => {
      const stageValue = stageLeads.reduce((acc, curr) => acc + curr.estimatedValue, 0);
      return {
        stage,
        count: stageLeads.length,
        totalValue: stageValue,
      };
    });

    return NextResponse.json({
      stages,
      summaries: stageSummaries,
      totalPipelineValue,
      activeDealsCount,
      totalLeadsCount: leads.length,
    });
  } catch (error: any) {
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    assertSuperAdmin(session);

    const body = await request.json();
    const validated = moveStageSchema.parse(body);

    const lead = await prisma.lead.findUnique({
      where: { id: validated.leadId },
    });

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    const previousStatus = lead.status;
    const updatedLead = await prisma.lead.update({
      where: { id: validated.leadId },
      data: {
        status: validated.newStatus,
      },
      include: {
        assignedTo: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    await prisma.auditLog.create({
      data: {
        actorId: session.user.id,
        actorEmail: session.user.email,
        action: AuditAction.STATUS_CHANGE,
        entityType: 'Lead',
        entityId: lead.id,
        changes: {
          field: 'status',
          from: previousStatus,
          to: validated.newStatus,
        },
      },
    });

    return NextResponse.json({
      lead: updatedLead,
      previousStatus,
      newStatus: validated.newStatus,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status });
  }
}
