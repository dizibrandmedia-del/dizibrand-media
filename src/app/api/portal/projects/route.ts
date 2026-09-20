import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { assertClientTenant } from '@/lib/auth/rbac';
import { prisma } from '@/lib/db/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    let companyId = assertClientTenant(session);

    // If admin previewing and no companyId on session, fallback to first company
    if (!companyId) {
      const firstCompany = await prisma.company.findFirst({ select: { id: true } });
      companyId = firstCompany?.id || '';
    }

    if (!companyId) {
      return NextResponse.json({ projects: [] });
    }

    const projects = await prisma.project.findMany({
      where: { companyId },
      orderBy: { updatedAt: 'desc' },
      include: {
        company: { select: { id: true, name: true } },
        manager: { select: { id: true, name: true, email: true } },
        milestones: {
          orderBy: { order: 'asc' },
          select: {
            id: true,
            title: true,
            status: true,
            order: true,
            dueDate: true,
            isClientApprovalRequired: true,
            clientApprovedAt: true,
          },
        },
        _count: {
          select: {
            deliverables: true,
            tasks: true,
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
