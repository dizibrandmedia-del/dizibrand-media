import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { assertClientTenant } from '@/lib/auth/rbac';
import { prisma } from '@/lib/db/prisma';
import { SupportClientView } from './support-client-view';

export default async function ClientSupportPage() {
  const session = await getServerSession(authOptions);
  let companyId = '';

  try {
    companyId = assertClientTenant(session);
  } catch {}

  if (!companyId) {
    const firstCompany = await prisma.company.findFirst({ select: { id: true } });
    companyId = firstCompany?.id || '';
  }

  const [tickets, projects] = await Promise.all([
    companyId
      ? prisma.supportTicket.findMany({
          where: { companyId },
          orderBy: { createdAt: 'desc' },
          include: {
            project: { select: { id: true, name: true } },
            createdBy: { select: { id: true, name: true } },
            assignedTo: { select: { id: true, name: true } },
          },
        })
      : [],
    companyId
      ? prisma.project.findMany({
          where: { companyId },
          select: { id: true, name: true },
        })
      : [],
  ]);

  const formattedTickets = tickets.map((t) => ({
    ...t,
    createdAt: t.createdAt.toISOString(),
    resolvedAt: t.resolvedAt ? t.resolvedAt.toISOString() : null,
  }));

  return <SupportClientView initialTickets={formattedTickets} projects={projects} />;
}
