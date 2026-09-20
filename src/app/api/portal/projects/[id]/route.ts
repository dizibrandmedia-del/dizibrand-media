import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { assertClientTenant } from '@/lib/auth/rbac';
import { prisma } from '@/lib/db/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    let authorizedCompanyId = assertClientTenant(session);

    if (!authorizedCompanyId) {
      const firstCompany = await prisma.company.findFirst({ select: { id: true } });
      authorizedCompanyId = firstCompany?.id || '';
    }

    const project = await prisma.project.findUnique({
      where: { id: params.id },
      include: {
        company: {
          select: { id: true, name: true, country: true, city: true },
        },
        manager: {
          select: { id: true, name: true, email: true, phone: true },
        },
        milestones: {
          orderBy: { order: 'asc' },
          include: {
            clientApprovedBy: { select: { id: true, name: true, email: true } },
            tasks: {
              select: {
                id: true,
                title: true,
                status: true,
                priority: true,
                dueDate: true,
              },
            },
            deliverables: {
              select: {
                id: true,
                title: true,
                status: true,
                fileUrl: true,
                externalLink: true,
                feedback: true,
              },
            },
          },
        },
        deliverables: {
          orderBy: { createdAt: 'desc' },
          include: {
            submittedBy: { select: { id: true, name: true } },
            reviewedBy: { select: { id: true, name: true } },
          },
        },
        members: {
          include: {
            user: { select: { id: true, name: true, email: true, role: true } },
          },
        },
        invoices: {
          orderBy: { dueDate: 'desc' },
          select: {
            id: true,
            invoiceNumber: true,
            amount: true,
            totalAmount: true,
            currency: true,
            status: true,
            dueDate: true,
            paidAt: true,
            pdfUrl: true,
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Strict tenant boundary check: Project must belong to client's authorized company
    if (authorizedCompanyId && project.companyId !== authorizedCompanyId) {
      return NextResponse.json({ error: 'Forbidden: Access restricted to project stakeholders' }, { status: 403 });
    }

    return NextResponse.json({ project });
  } catch (error: any) {
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status });
  }
}
