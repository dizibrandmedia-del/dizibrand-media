import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { assertSuperAdmin } from '@/lib/auth/rbac';
import { prisma } from '@/lib/db/prisma';
import { calculateLeadScore } from '@/lib/domain/crm/lead-scoring';
import { LeadStatus, BudgetTier, AuditAction } from '@prisma/client';
import { z } from 'zod';
import { getLeadsFromStore, saveLeadToStore } from '@/lib/domain/crm/lead-store';

const createLeadSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
  companyName: z.string().min(1, 'Company name is required'),
  website: z.string().url().optional().or(z.literal('')),
  serviceName: z.string().optional(),
  projectDescription: z.string().min(5, 'Project description is required'),
  budgetTier: z.nativeEnum(BudgetTier),
  timeline: z.string().optional(),
  assignedToId: z.string().optional(),
  status: z.nativeEnum(LeadStatus).optional(),
});

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    assertSuperAdmin(session);

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') as LeadStatus | null;
    const country = searchParams.get('country') || '';
    const serviceName = searchParams.get('service') || '';
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '25', 10)));
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { companyName: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (status && Object.values(LeadStatus).includes(status)) {
      where.status = status;
    }

    if (country) {
      where.country = { contains: country, mode: 'insensitive' };
    }

    if (serviceName) {
      where.serviceName = { contains: serviceName, mode: 'insensitive' };
    }

    let leads: any[] = [];
    let totalCount = 0;

    try {
      const [dbLeads, count] = await Promise.all([
        prisma.lead.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
          include: {
            assignedTo: {
              select: { id: true, name: true, email: true, role: true },
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
        }),
        prisma.lead.count({ where }),
      ]);

      leads = dbLeads;
      totalCount = count;
    } catch (dbErr) {
      console.warn('Prisma leads query unavailable, reading from persistent CRM lead store:', dbErr);
    }

    // If database returned no leads or is offline, fetch from persistent CRM lead store
    if (leads.length === 0) {
      const storeResult = getLeadsFromStore({
        search,
        status: status || undefined,
        country: country || undefined,
        service: serviceName || undefined,
        page,
        limit,
      });
      leads = storeResult.leads;
      totalCount = storeResult.total;
    }

    return NextResponse.json({
      leads,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit) || 1,
      },
    });
  } catch (error: any) {
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    assertSuperAdmin(session);

    const body = await request.json();
    const validated = createLeadSchema.parse(body);

    const scoreBreakdown = calculateLeadScore({
      budgetTier: validated.budgetTier,
      service: validated.serviceName,
      email: validated.email,
      companyName: validated.companyName,
      website: validated.website,
      country: validated.country,
      projectDescription: validated.projectDescription,
    });

    let lead: any = null;
    let leadId = `lead_admin_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    try {
      lead = await prisma.lead.create({
        data: {
          firstName: validated.firstName,
          lastName: validated.lastName,
          email: validated.email,
          phone: validated.phone || null,
          country: validated.country,
          companyName: validated.companyName,
          website: validated.website || null,
          serviceName: validated.serviceName || null,
          projectDescription: validated.projectDescription,
          budgetTier: validated.budgetTier,
          timeline: validated.timeline || null,
          status: validated.status || LeadStatus.NEW,
          score: scoreBreakdown.total,
          scoreBreakdown: scoreBreakdown as any,
          source: 'admin_manual_entry',
          assignedToId: validated.assignedToId || null,
          scoreHistory: {
            create: {
              scoreBefore: 0,
              scoreAfter: scoreBreakdown.total,
              reason: 'Initial scoring upon admin lead creation',
            },
          },
        },
      });

      leadId = lead.id;

      await prisma.auditLog.create({
        data: {
          actorId: session.user.id,
          actorEmail: session.user.email,
          action: AuditAction.CREATE,
          entityType: 'Lead',
          entityId: lead.id,
          changes: {
            leadId: lead.id,
            companyName: lead.companyName,
            score: lead.score,
          },
        },
      });
    } catch (dbErr) {
      console.warn('Prisma lead creation unavailable, storing in CRM lead store:', dbErr);
    }

    const storedLead = saveLeadToStore({
      id: leadId,
      firstName: validated.firstName,
      lastName: validated.lastName,
      email: validated.email,
      phone: validated.phone || null,
      country: validated.country,
      companyName: validated.companyName,
      website: validated.website || null,
      serviceName: validated.serviceName || null,
      projectDescription: validated.projectDescription,
      budgetTier: validated.budgetTier,
      timeline: validated.timeline || null,
      status: validated.status || 'NEW',
      score: scoreBreakdown.total,
      scoreBreakdown: scoreBreakdown,
      source: 'admin_manual_entry',
    });

    return NextResponse.json({ lead: lead || storedLead }, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status });
  }
}
