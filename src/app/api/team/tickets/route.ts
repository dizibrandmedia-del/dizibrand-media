import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { assertTeamMember } from '@/lib/auth/rbac';
import { prisma } from '@/lib/db/prisma';
import { TicketCategory, Priority, TicketStatus } from '@prisma/client';
import { z } from 'zod';

const createTicketSchema = z.object({
  companyId: z.string().min(1, 'Company ID is required'),
  projectId: z.string().optional(),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.nativeEnum(TicketCategory),
  priority: z.nativeEnum(Priority).default(Priority.MEDIUM),
});

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    assertTeamMember(session);

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as TicketStatus | null;
    const category = searchParams.get('category') as TicketCategory | null;
    const priority = searchParams.get('priority') as Priority | null;

    const where: any = {};
    if (status && Object.values(TicketStatus).includes(status)) where.status = status;
    if (category && Object.values(TicketCategory).includes(category)) where.category = category;
    if (priority && Object.values(Priority).includes(priority)) where.priority = priority;

    const tickets = await prisma.supportTicket.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        company: { select: { id: true, name: true } },
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
    assertTeamMember(session);

    const body = await request.json();
    const validated = createTicketSchema.parse(body);

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const ticketNumber = `TCK-${new Date().getFullYear()}-${randomNum}`;

    const ticket = await prisma.supportTicket.create({
      data: {
        ticketNumber,
        companyId: validated.companyId,
        projectId: validated.projectId || null,
        title: validated.title,
        description: validated.description,
        category: validated.category,
        priority: validated.priority,
        status: TicketStatus.OPEN,
        createdById: session.user.id,
      },
      include: {
        company: { select: { id: true, name: true } },
        createdBy: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json({ ticket }, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status });
  }
}
