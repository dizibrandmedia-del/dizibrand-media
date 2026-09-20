import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { assertClientTenant } from '@/lib/auth/rbac';
import { prisma } from '@/lib/db/prisma';
import { notFound } from 'next/navigation';
import { ProjectClientView } from './project-client-view';

export default async function ClientProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  let companyId = '';

  try {
    companyId = assertClientTenant(session);
  } catch {}

  if (!companyId) {
    const firstCompany = await prisma.company.findFirst({ select: { id: true } });
    companyId = firstCompany?.id || '';
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
    notFound();
  }

  // Tenant security boundary
  if (companyId && project.companyId !== companyId) {
    notFound();
  }

  return <ProjectClientView project={project} />;
}
