import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { assertClientTenant } from '@/lib/auth/rbac';
import { prisma } from '@/lib/db/prisma';
import { DeliverablesClientView } from './deliverables-client-view';

export default async function ClientDeliverablesPage() {
  const session = await getServerSession(authOptions);
  let companyId = '';

  try {
    companyId = assertClientTenant(session);
  } catch {}

  if (!companyId) {
    const firstCompany = await prisma.company.findFirst({ select: { id: true } });
    companyId = firstCompany?.id || '';
  }

  const deliverables = companyId
    ? await prisma.deliverable.findMany({
        where: { project: { companyId } },
        orderBy: { createdAt: 'desc' },
        include: {
          project: { select: { id: true, name: true, projectCode: true } },
          milestone: { select: { id: true, title: true, order: true } },
          submittedBy: { select: { id: true, name: true, email: true } },
          reviewedBy: { select: { id: true, name: true } },
        },
      })
    : [];

  // Format dates for client component
  const formattedDeliverables = deliverables.map((d) => ({
    ...d,
    createdAt: d.createdAt.toISOString(),
  }));

  return <DeliverablesClientView initialDeliverables={formattedDeliverables} />;
}
