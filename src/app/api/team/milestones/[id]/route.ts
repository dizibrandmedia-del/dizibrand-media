import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { assertTeamMember } from '@/lib/auth/rbac';
import { prisma } from '@/lib/db/prisma';
import { MilestoneStatus } from '@prisma/client';
import { z } from 'zod';

const updateMilestoneSchema = z.object({
  status: z.nativeEnum(MilestoneStatus).optional(),
  dueDate: z.string().optional(),
  completedDate: z.string().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    assertTeamMember(session);

    const body = await request.json();
    const validated = updateMilestoneSchema.parse(body);

    const milestone = await prisma.milestone.update({
      where: { id: params.id },
      data: {
        ...validated,
        dueDate: validated.dueDate ? new Date(validated.dueDate) : undefined,
        completedDate: validated.completedDate ? new Date(validated.completedDate) : undefined,
      },
      include: {
        project: { select: { id: true, name: true, projectCode: true } },
      },
    });

    return NextResponse.json({ milestone });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status });
  }
}
