import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { assertClientTenant } from '@/lib/auth/rbac';
import { prisma } from '@/lib/db/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    let companyId = assertClientTenant(session);

    if (!companyId) {
      const firstCompany = await prisma.company.findFirst({ select: { id: true } });
      companyId = firstCompany?.id || '';
    }

    if (!companyId) {
      return NextResponse.json({ invoices: [] });
    }

    const invoices = await prisma.invoice.findMany({
      where: { companyId },
      orderBy: { dueDate: 'desc' },
      include: {
        project: { select: { id: true, name: true, projectCode: true } },
        payments: {
          orderBy: { paymentDate: 'desc' },
        },
      },
    });

    return NextResponse.json({ invoices });
  } catch (error: any) {
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status });
  }
}
