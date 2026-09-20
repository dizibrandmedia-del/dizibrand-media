import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { assertTeamMember } from '@/lib/auth/rbac';
import { prisma } from '@/lib/db/prisma';
import { TaskStatus, Priority } from '@prisma/client';
import { z } from 'zod';

const updateTaskSchema = z.object({
  status: z.nativeEnum(TaskStatus).optional(),
  priority: z.nativeEnum(Priority).optional(),
  assignedToId: z.string().nullable().optional(),
  actualHours: z.number().positive().optional(),
  estimatedHours: z.number().positive().optional(),
  description: z.string().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    assertTeamMember(session);

    const body = await request.json();
    const validated = updateTaskSchema.parse(body);

    const existingTask = await prisma.task.findUnique({
      where: { id: params.id },
    });

    if (!existingTask) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    // Role-scoping for Freelancers: can only update their own tasks
    if (session.user.role === 'FREELANCER' && existingTask.assignedToId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized: You can only update tasks assigned to you' }, { status: 403 });
    }

    const updatedTask = await prisma.task.update({
      where: { id: params.id },
      data: validated,
      include: {
        assignedTo: { select: { id: true, name: true, email: true } },
        milestone: { select: { id: true, title: true } },
      },
    });

    return NextResponse.json({ task: updatedTask });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status });
  }
}
