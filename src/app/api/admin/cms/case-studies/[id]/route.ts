import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { assertSuperAdmin } from '@/lib/auth/rbac';
import { prisma } from '@/lib/db/prisma';
import { AuditAction } from '@prisma/client';
import { z } from 'zod';

const updateCaseStudySchema = z.object({
  title: z.string().optional(),
  clientName: z.string().optional(),
  isVerified: z.boolean().optional(),
  verificationStatus: z.string().optional(),
  isPublished: z.boolean().optional(),
  challenge: z.string().optional(),
  solution: z.string().optional(),
  results: z.record(z.any()).optional(),
  featuredImage: z.string().nullable().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    assertSuperAdmin(session);

    const body = await request.json();
    const validated = updateCaseStudySchema.parse(body);

    const existing = await prisma.caseStudy.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Case study not found' }, { status: 404 });
    }

    // Enforce verification status logic
    let verificationStatus = validated.verificationStatus ?? existing.verificationStatus;
    if (validated.isVerified !== undefined) {
      verificationStatus = validated.isVerified ? 'Verified Client' : 'Pending verification';
    }

    const updated = await prisma.caseStudy.update({
      where: { id: params.id },
      data: {
        ...validated,
        verificationStatus,
      },
    });

    await prisma.auditLog.create({
      data: {
        actorId: session.user.id,
        actorEmail: session.user.email,
        action: AuditAction.UPDATE,
        entityType: 'CaseStudy',
        entityId: updated.id,
        changes: {
          previous: {
            isVerified: existing.isVerified,
            isPublished: existing.isPublished,
          },
          updated: {
            isVerified: updated.isVerified,
            isPublished: updated.isPublished,
          },
        },
      },
    });

    return NextResponse.json({ caseStudy: updated });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    assertSuperAdmin(session);

    const existing = await prisma.caseStudy.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: 'Case study not found' }, { status: 404 });
    }

    await prisma.caseStudy.delete({ where: { id: params.id } });

    await prisma.auditLog.create({
      data: {
        actorId: session.user.id,
        actorEmail: session.user.email,
        action: AuditAction.DELETE,
        entityType: 'CaseStudy',
        entityId: params.id,
        changes: { deletedTitle: existing.title },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status });
  }
}
