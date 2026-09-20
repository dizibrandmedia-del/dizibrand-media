import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { assertClientTenant, assertAuthenticated } from '@/lib/auth/rbac';
import { prisma } from '@/lib/db/prisma';
import { AuditAction } from '@prisma/client';

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

    const body = await request.json();
    const { status, feedback } = body;

    if (!['Approved', 'Changes Requested'].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be 'Approved' or 'Changes Requested'" },
        { status: 400 }
      );
    }

    const deliverable = await prisma.deliverable.findUnique({
      where: { id: params.id },
      include: {
        project: { select: { id: true, name: true, companyId: true } },
      },
    });

    if (!deliverable) {
      return NextResponse.json({ error: 'Deliverable not found' }, { status: 404 });
    }

    // Tenant check
    if (authorizedCompanyId && deliverable.project.companyId !== authorizedCompanyId) {
      return NextResponse.json(
        { error: 'Forbidden: Deliverable does not belong to your organization' },
        { status: 403 }
      );
    }

    const updatedDeliverable = await prisma.deliverable.update({
      where: { id: params.id },
      data: {
        status,
        feedback: feedback ? `${deliverable.feedback ? deliverable.feedback + '\n\n' : ''}[Client Feedback - ${new Date().toLocaleDateString()}]: ${feedback}` : deliverable.feedback,
        reviewedById: session.user.id,
      },
      include: {
        reviewedBy: { select: { id: true, name: true } },
      },
    });

    // Record audit log
    await prisma.auditLog.create({
      data: {
        actorId: session.user.id,
        actorEmail: session.user.email,
        action: AuditAction.DELIVERABLE_APPROVED,
        entityType: 'Deliverable',
        entityId: deliverable.id,
        changes: {
          projectId: deliverable.projectId,
          deliverableTitle: deliverable.title,
          previousStatus: deliverable.status,
          newStatus: status,
          feedbackNotes: feedback || null,
        },
      },
    });

    return NextResponse.json({
      success: true,
      deliverable: updatedDeliverable,
      message: `Deliverable marked as ${status}.`,
    });
  } catch (error: any) {
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status });
  }
}
