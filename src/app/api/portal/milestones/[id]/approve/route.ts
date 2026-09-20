import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { assertClientTenant, assertAuthenticated } from '@/lib/auth/rbac';
import { prisma } from '@/lib/db/prisma';
import { MilestoneStatus, AuditAction } from '@prisma/client';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    assertAuthenticated(session);
    let authorizedCompanyId = assertClientTenant(session);

    if (!authorizedCompanyId) {
      const firstCompany = await prisma.company.findFirst({ select: { id: true } });
      authorizedCompanyId = firstCompany?.id || '';
    }

    const milestone = await prisma.milestone.findUnique({
      where: { id: params.id },
      include: {
        project: {
          select: { id: true, name: true, companyId: true },
        },
      },
    });

    if (!milestone) {
      return NextResponse.json({ error: 'Milestone not found' }, { status: 404 });
    }

    // Strict tenant boundary check
    if (authorizedCompanyId && milestone.project.companyId !== authorizedCompanyId) {
      return NextResponse.json(
        { error: 'Forbidden: Milestone does not belong to your organization' },
        { status: 403 }
      );
    }

    const updatedMilestone = await prisma.milestone.update({
      where: { id: params.id },
      data: {
        status: MilestoneStatus.APPROVED,
        clientApprovedAt: new Date(),
        clientApprovedById: session.user.id,
      },
      include: {
        clientApprovedBy: { select: { id: true, name: true, email: true } },
      },
    });

    // Record audit log
    await prisma.auditLog.create({
      data: {
        actorId: session.user.id,
        actorEmail: session.user.email,
        action: AuditAction.UPDATE,
        entityType: 'Milestone',
        entityId: milestone.id,
        changes: {
          projectId: milestone.projectId,
          milestoneTitle: milestone.title,
          previousStatus: milestone.status,
          newStatus: MilestoneStatus.APPROVED,
          approvedBy: session.user.name,
        },
      },
    });

    return NextResponse.json({
      success: true,
      milestone: updatedMilestone,
      message: 'Milestone approved successfully.',
    });
  } catch (error: any) {
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status });
  }
}
