import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { assertTeamMember } from '@/lib/auth/rbac';
import { prisma } from '@/lib/db/prisma';
import { ProjectStatus } from '@prisma/client';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    assertTeamMember(session);

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as ProjectStatus | null;
    const search = searchParams.get('search') || '';

    const where: any = {};
    if (status && Object.values(ProjectStatus).includes(status)) {
      where.status = status;
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { projectCode: { contains: search, mode: 'insensitive' } },
        { company: { name: { contains: search, mode: 'insensitive' } } },
      ];
    }

    // Role-scoping for PMs: can see their managed projects or all if admin
    if (session.user.role === 'PROJECT_MANAGER' && searchParams.get('mineOnly') === 'true') {
      where.managerId = session.user.id;
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
      include: {
        company: { select: { id: true, name: true } },
        manager: { select: { id: true, name: true, email: true } },
        milestones: {
          orderBy: { order: 'asc' },
          select: { id: true, title: true, status: true, order: true, dueDate: true },
        },
        _count: {
          select: {
            tasks: true,
            deliverables: true,
            members: true,
          },
        },
      },
    });

    return NextResponse.json({ projects });
  } catch (error: any) {
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status });
  }
}
