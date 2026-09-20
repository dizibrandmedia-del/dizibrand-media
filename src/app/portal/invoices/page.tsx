import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { assertClientTenant } from '@/lib/auth/rbac';
import { prisma } from '@/lib/db/prisma';
import { InvoicesClientView } from './invoices-client-view';

export default async function ClientInvoicesPage() {
  const session = await getServerSession(authOptions);
  let companyId = '';

  try {
    companyId = assertClientTenant(session);
  } catch {}

  if (!companyId) {
    const firstCompany = await prisma.company.findFirst({ select: { id: true } });
    companyId = firstCompany?.id || '';
  }

  const invoices = companyId
    ? await prisma.invoice.findMany({
        where: { companyId },
        orderBy: { dueDate: 'desc' },
        include: {
          project: { select: { id: true, name: true, projectCode: true } },
          payments: {
            orderBy: { paymentDate: 'desc' },
          },
        },
      })
    : [];

  // Format dates and decimals for client component
  const formattedInvoices = invoices.map((inv) => ({
    ...inv,
    amount: Number(inv.amount),
    taxAmount: Number(inv.taxAmount),
    totalAmount: Number(inv.totalAmount),
    dueDate: inv.dueDate.toISOString(),
    paidAt: inv.paidAt ? inv.paidAt.toISOString() : null,
    payments: inv.payments.map((p) => ({
      ...p,
      amount: Number(p.amount),
      paymentDate: p.paymentDate.toISOString(),
    })),
  }));

  return <InvoicesClientView initialInvoices={formattedInvoices} />;
}
