import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { assertSuperAdmin } from '@/lib/auth/rbac';
import { prisma } from '@/lib/db/prisma';
import { calculateLeadScore } from '@/lib/domain/crm/lead-scoring';
import { LeadStatus, BudgetTier, AuditAction } from '@prisma/client';
import { z } from 'zod';

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

    const [leads, totalCount] = await Promise.all([
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

    return NextResponse.json({
      leads,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
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

    const lead = await prisma.lead.create({
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

    return NextResponse.json({ lead }, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status });
  }
}
