import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { assertSuperAdmin } from '@/lib/auth/rbac';
import { prisma } from '@/lib/db/prisma';
import { LeadStatus, AuditAction } from '@prisma/client';
import { z } from 'zod';
import { getLeadByIdFromStore, updateLeadInStore } from '@/lib/domain/crm/lead-store';

const updateLeadSchema = z.object({
  status: z.nativeEnum(LeadStatus).optional(),
  assignedToId: z.string().nullable().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().nullable().optional(),
  companyName: z.string().optional(),
  website: z.string().nullable().optional(),
  projectDescription: z.string().optional(),
  score: z.number().int().min(0).max(100).optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    assertSuperAdmin(session);

    let lead: any = null;

    try {
      lead = await prisma.lead.findUnique({
        where: { id: params.id },
        include: {
          assignedTo: {
            select: { id: true, name: true, email: true, role: true },
          },
          company: {
            include: {
              projects: {
                select: { id: true, projectCode: true, name: true, status: true, budget: true },
              },
              invoices: {
                select: { id: true, invoiceNumber: true, totalAmount: true, status: true, dueDate: true },
              },
            },
          },
          scoreHistory: {
            orderBy: { createdAt: 'desc' },
          },
          calls: {
            orderBy: { callDate: 'desc' },
            include: {
              conductedBy: { select: { id: true, name: true, email: true } },
            },
          },
          meetings: {
            orderBy: { scheduledAt: 'desc' },
            include: {
              host: { select: { id: true, name: true, email: true } },
            },
          },
          notes: {
            orderBy: { createdAt: 'desc' },
            include: {
              author: { select: { id: true, name: true, email: true } },
            },
          },
        },
      });
    } catch (dbErr) {
      console.warn('Prisma lead lookup unavailable, falling back to lead store:', dbErr);
    }

    if (!lead) {
      lead = getLeadByIdFromStore(params.id);
    }

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json({ lead });
  } catch (error: any) {
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    assertSuperAdmin(session);

    const body = await request.json();
    const validated = updateLeadSchema.parse(body);

    const existingLead = await prisma.lead.findUnique({
      where: { id: params.id },
    });

    if (!existingLead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    const updatedLead = await prisma.lead.update({
      where: { id: params.id },
      data: validated,
      include: {
        assignedTo: {
          select: { id: true, name: true, email: true, role: true },
        },
      },
    });

    // If score changed, record in history
    if (validated.score !== undefined && validated.score !== existingLead.score) {
      await prisma.leadScoreHistory.create({
        data: {
          leadId: existingLead.id,
          scoreBefore: existingLead.score,
          scoreAfter: validated.score,
          reason: 'Manual score adjustment by admin',
        },
      });
    }

    // Audit log
    await prisma.auditLog.create({
      data: {
        actorId: session.user.id,
        actorEmail: session.user.email,
        action: AuditAction.UPDATE,
        entityType: 'Lead',
        entityId: existingLead.id,
        changes: {
          previous: {
            status: existingLead.status,
            assignedToId: existingLead.assignedToId,
            score: existingLead.score,
          },
          updated: validated,
        },
      },
    });

    return NextResponse.json({ lead: updatedLead });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    assertSuperAdmin(session);

    const existing = await prisma.lead.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    await prisma.lead.delete({ where: { id: params.id } });

    await prisma.auditLog.create({
      data: {
        actorId: session.user.id,
        actorEmail: session.user.email,
        action: AuditAction.DELETE,
        entityType: 'Lead',
        entityId: params.id,
        changes: {
          deletedLead: {
            companyName: existing.companyName,
            email: existing.email,
            status: existing.status,
          },
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status });
  }
}
