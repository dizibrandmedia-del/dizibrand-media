import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { assertTeamMember } from '@/lib/auth/rbac';
import { prisma } from '@/lib/db/prisma';
import { TicketStatus, Priority } from '@prisma/client';
import { z } from 'zod';

const updateTicketSchema = z.object({
  status: z.nativeEnum(TicketStatus).optional(),
  priority: z.nativeEnum(Priority).optional(),
  assignedToId: z.string().nullable().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    assertTeamMember(session);

    const body = await request.json();
    const validated = updateTicketSchema.parse(body);

    const ticket = await prisma.supportTicket.update({
      where: { id: params.id },
      data: {
        ...validated,
        resolvedAt: validated.status === TicketStatus.RESOLVED ? new Date() : undefined,
      },
      include: {
        assignedTo: { select: { id: true, name: true, email: true } },
      },
    });

    return NextResponse.json({ ticket });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status });
  }
}
