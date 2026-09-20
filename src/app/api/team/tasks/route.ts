import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { assertTeamMember } from '@/lib/auth/rbac';
import { prisma } from '@/lib/db/prisma';
import { TaskStatus, Priority } from '@prisma/client';
import { z } from 'zod';

const createTaskSchema = z.object({
  projectId: z.string().min(1, 'Project ID is required'),
  milestoneId: z.string().min(1, 'Milestone ID is required'),
  title: z.string().min(1, 'Task title is required'),
  description: z.string().optional(),
  priority: z.nativeEnum(Priority).default(Priority.MEDIUM),
  assignedToId: z.string().nullable().optional(),
  dueDate: z.string().optional(),
  estimatedHours: z.number().positive().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    assertTeamMember(session);

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    const status = searchParams.get('status') as TaskStatus | null;
    const priority = searchParams.get('priority') as Priority | null;
    const assignedToId = searchParams.get('assignedToId');
    const myTasksOnly = searchParams.get('myTasksOnly') === 'true';

    const where: any = {};
    if (projectId) where.projectId = projectId;
    if (status && Object.values(TaskStatus).includes(status)) where.status = status;
    if (priority && Object.values(Priority).includes(priority)) where.priority = priority;

    if (myTasksOnly || session.user.role === 'FREELANCER') {
      where.assignedToId = session.user.id;
    } else if (assignedToId) {
      where.assignedToId = assignedToId;
    }

    const tasks = await prisma.task.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        assignedTo: { select: { id: true, name: true, email: true, role: true } },
        project: { select: { id: true, projectCode: true, name: true } },
        milestone: { select: { id: true, title: true } },
        _count: { select: { subtasks: true, files: true } },
      },
    });

    return NextResponse.json({ tasks });
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
    const validated = createTaskSchema.parse(body);

    const task = await prisma.task.create({
      data: {
        projectId: validated.projectId,
        milestoneId: validated.milestoneId,
        title: validated.title,
        description: validated.description || null,
        priority: validated.priority,
        status: TaskStatus.TODO,
        assignedToId: validated.assignedToId || null,
        dueDate: validated.dueDate ? new Date(validated.dueDate) : null,
        estimatedHours: validated.estimatedHours || null,
      },
      include: {
        assignedTo: { select: { id: true, name: true, email: true } },
        milestone: { select: { id: true, title: true } },
      },
    });

    return NextResponse.json({ task }, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status });
  }
}
