import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { assertSuperAdmin } from '@/lib/auth/rbac';
import { prisma } from '@/lib/db/prisma';
import { AuditAction } from '@prisma/client';
import { z } from 'zod';

const createCaseStudySchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters'),
  clientName: z.string().min(2, 'Client name is required'),
  isVerified: z.boolean().default(false),
  verificationStatus: z.string().default('Pending verification'),
  serviceId: z.string().optional(),
  industryId: z.string().optional(),
  challenge: z.string().min(10, 'Challenge description is required'),
  solution: z.string().min(10, 'Solution description is required'),
  results: z.record(z.any()).optional(),
  featuredImage: z.string().optional(),
  isPublished: z.boolean().default(false),
});

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    assertSuperAdmin(session);

    const caseStudies = await prisma.caseStudy.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        service: { select: { id: true, title: true } },
        industry: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json({ caseStudies });
  } catch (error: any) {
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    assertSuperAdmin(session);

    const body = await request.json();
    const validated = createCaseStudySchema.parse(body);

    // Enforce zero-fake-proof policy
    const verificationStatus = validated.isVerified ? 'Verified Client' : 'Pending verification';

    const caseStudy = await prisma.caseStudy.create({
      data: {
        ...validated,
        verificationStatus,
      },
    });

    await prisma.auditLog.create({
      data: {
        actorId: session.user.id,
        actorEmail: session.user.email,
        action: AuditAction.CREATE,
        entityType: 'CaseStudy',
        entityId: caseStudy.id,
        changes: {
          title: caseStudy.title,
          isVerified: caseStudy.isVerified,
          isPublished: caseStudy.isPublished,
        },
      },
    });

    return NextResponse.json({ caseStudy }, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status });
  }
}
