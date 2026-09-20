import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { assertTeamMember } from '@/lib/auth/rbac';
import { prisma } from '@/lib/db/prisma';
import { ProjectStatus, AuditAction } from '@prisma/client';
import { z } from 'zod';

const updateProjectSchema = z.object({
  status: z.nativeEnum(ProjectStatus).optional(),
  health: z.string().optional(),
  targetDate: z.string().optional(),
  managerId: z.string().nullable().optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    assertTeamMember(session);

    const project = await prisma.project.findUnique({
      where: { id: params.id },
      include: {
        company: {
          select: { id: true, name: true, website: true, country: true },
        },
        manager: {
          select: { id: true, name: true, email: true, role: true },
        },
        milestones: {
          orderBy: { order: 'asc' },
          include: {
            tasks: {
              orderBy: { createdAt: 'asc' },
              include: {
                assignedTo: { select: { id: true, name: true, email: true } },
              },
            },
            deliverables: {
              orderBy: { createdAt: 'desc' },
              include: {
                submittedBy: { select: { id: true, name: true, email: true } },
                reviewedBy: { select: { id: true, name: true, email: true } },
              },
            },
          },
        },
        tasks: {
          orderBy: { createdAt: 'desc' },
          include: {
            assignedTo: { select: { id: true, name: true, email: true } },
            milestone: { select: { id: true, title: true } },
          },
        },
        deliverables: {
          orderBy: { createdAt: 'desc' },
          include: {
            submittedBy: { select: { id: true, name: true, email: true } },
            reviewedBy: { select: { id: true, name: true, email: true } },
            milestone: { select: { id: true, title: true } },
          },
        },
        members: {
          include: {
            user: { select: { id: true, name: true, email: true, role: true } },
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ project });
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
    assertTeamMember(session);

    const body = await request.json();
    const validated = updateProjectSchema.parse(body);

    const existingProject = await prisma.project.findUnique({
      where: { id: params.id },
    });

    if (!existingProject) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const updated = await prisma.project.update({
      where: { id: params.id },
      data: {
        ...validated,
        targetDate: validated.targetDate ? new Date(validated.targetDate) : undefined,
      },
      include: {
        manager: { select: { id: true, name: true, email: true } },
      },
    });

    await prisma.auditLog.create({
      data: {
        actorId: session.user.id,
        actorEmail: session.user.email,
        action: AuditAction.UPDATE,
        entityType: 'Project',
        entityId: params.id,
        changes: {
          previous: { status: existingProject.status, health: existingProject.health },
          updated: validated,
        },
      },
    });

    return NextResponse.json({ project: updated });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status });
  }
}
