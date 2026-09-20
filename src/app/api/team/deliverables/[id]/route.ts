import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { assertTeamMember } from '@/lib/auth/rbac';
import { prisma } from '@/lib/db/prisma';
import { z } from 'zod';

const reviewDeliverableSchema = z.object({
  status: z.string().min(1, 'Status is required'),
  feedback: z.string().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    assertTeamMember(session);

    const body = await request.json();
    const validated = reviewDeliverableSchema.parse(body);

    const existing = await prisma.deliverable.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Deliverable not found' }, { status: 404 });
    }

    const updated = await prisma.deliverable.update({
      where: { id: params.id },
      data: {
        status: validated.status,
        feedback: validated.feedback || existing.feedback,
        reviewedById: session.user.id,
      },
      include: {
        reviewedBy: { select: { id: true, name: true, email: true } },
        submittedBy: { select: { id: true, name: true, email: true } },
        project: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json({ deliverable: updated });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status });
  }
}
