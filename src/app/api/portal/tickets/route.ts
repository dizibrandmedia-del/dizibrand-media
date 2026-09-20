import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { assertClientTenant, assertAuthenticated } from '@/lib/auth/rbac';
import { prisma } from '@/lib/db/prisma';
import { TicketCategory, Priority, TicketStatus, AuditAction } from '@prisma/client';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    let companyId = assertClientTenant(session);

    if (!companyId) {
      const firstCompany = await prisma.company.findFirst({ select: { id: true } });
      companyId = firstCompany?.id || '';
    }

    if (!companyId) {
      return NextResponse.json({ tickets: [] });
    }

    const tickets = await prisma.supportTicket.findMany({
      where: { companyId },
      orderBy: { createdAt: 'desc' },
      include: {
        project: { select: { id: true, name: true, projectCode: true } },
        createdBy: { select: { id: true, name: true, email: true } },
        assignedTo: { select: { id: true, name: true, email: true } },
      },
    });

    return NextResponse.json({ tickets });
  } catch (error: any) {
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    assertAuthenticated(session);
    let companyId = assertClientTenant(session);

    if (!companyId) {
      const firstCompany = await prisma.company.findFirst({ select: { id: true } });
      companyId = firstCompany?.id || '';
    }

    if (!companyId) {
      return NextResponse.json({ error: 'Company not found' }, { status: 400 });
    }

    const body = await request.json();
    const { title, description, category, priority, projectId } = body;

    if (!title || !description || !category) {
      return NextResponse.json(
        { error: 'Title, description, and category are required' },
        { status: 400 }
      );
    }

    const ticketNumber = `TCK-${Date.now().toString().slice(-6)}`;

    const ticket = await prisma.supportTicket.create({
      data: {
        ticketNumber,
        companyId,
        projectId: projectId || null,
        createdById: session.user.id,
        title,
        description,
        category: category as TicketCategory,
        priority: (priority as Priority) || Priority.MEDIUM,
        status: TicketStatus.OPEN,
      },
      include: {
        project: { select: { id: true, name: true } },
        createdBy: { select: { id: true, name: true } },
      },
    });

    // Record audit log
    await prisma.auditLog.create({
      data: {
        actorId: session.user.id,
        actorEmail: session.user.email,
        action: AuditAction.CREATE,
        entityType: 'SupportTicket',
        entityId: ticket.id,
        changes: {
          ticketNumber: ticket.ticketNumber,
          category: ticket.category,
          priority: ticket.priority,
          projectId: ticket.projectId,
          title: ticket.title,
        },
      },
    });

    return NextResponse.json({ success: true, ticket }, { status: 201 });
  } catch (error: any) {
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status });
  }
}
