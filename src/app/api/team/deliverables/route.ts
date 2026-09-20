import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { assertTeamMember } from '@/lib/auth/rbac';
import { prisma } from '@/lib/db/prisma';
import { z } from 'zod';

const createDeliverableSchema = z.object({
  projectId: z.string().min(1, 'Project ID is required'),
  milestoneId: z.string().optional(),
  title: z.string().min(1, 'Deliverable title is required'),
  description: z.string().optional(),
  fileUrl: z.string().optional(),
  externalLink: z.string().url().optional().or(z.literal('')),
});

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    assertTeamMember(session);

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    const status = searchParams.get('status');
    const mySubmissionsOnly = searchParams.get('mySubmissionsOnly') === 'true';

    const where: any = {};
    if (projectId) where.projectId = projectId;
    if (status) where.status = status;

    if (mySubmissionsOnly || session.user.role === 'FREELANCER') {
      where.submittedById = session.user.id;
    }

    const deliverables = await prisma.deliverable.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        project: { select: { id: true, projectCode: true, name: true } },
        milestone: { select: { id: true, title: true } },
        submittedBy: { select: { id: true, name: true, email: true } },
        reviewedBy: { select: { id: true, name: true, email: true } },
      },
    });

    return NextResponse.json({ deliverables });
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
    const validated = createDeliverableSchema.parse(body);

    const deliverable = await prisma.deliverable.create({
      data: {
        projectId: validated.projectId,
        milestoneId: validated.milestoneId || null,
        title: validated.title,
        description: validated.description || null,
        fileUrl: validated.fileUrl || null,
        externalLink: validated.externalLink || null,
        status: 'Submitted',
        submittedById: session.user.id,
      },
      include: {
        project: { select: { id: true, projectCode: true, name: true } },
        milestone: { select: { id: true, title: true } },
        submittedBy: { select: { id: true, name: true, email: true } },
      },
    });

    return NextResponse.json({ deliverable }, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status });
  }
}
