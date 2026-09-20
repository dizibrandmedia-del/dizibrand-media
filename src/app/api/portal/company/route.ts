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
      return NextResponse.json({ company: null });
    }

    const company = await prisma.company.findUnique({
      where: { id: companyId },
      include: {
        industry: { select: { id: true, name: true } },
        contacts: {
          orderBy: { isPrimary: 'desc' },
        },
        users: {
          select: { id: true, name: true, email: true, role: true, image: true, phone: true },
        },
        _count: {
          select: {
            projects: true,
            invoices: true,
            supportTickets: true,
            contracts: true,
          },
        },
      },
    });

    return NextResponse.json({ company });
  } catch (error: any) {
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status });
  }
}
