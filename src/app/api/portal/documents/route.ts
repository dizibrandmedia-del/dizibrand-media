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
      return NextResponse.json({ contracts: [], proposals: [], files: [] });
    }

    const [contracts, proposals, files] = await Promise.all([
      prisma.contract.findMany({
        where: { companyId },
        orderBy: { effectiveDate: 'desc' },
        include: {
          proposal: { select: { id: true, title: true, proposalNumber: true } },
        },
      }),
      prisma.proposal.findMany({
        where: { companyId },
        orderBy: { createdAt: 'desc' },
        include: {
          createdBy: { select: { id: true, name: true, email: true } },
        },
      }),
      prisma.fileAttachment.findMany({
        where: { companyId },
        orderBy: { createdAt: 'desc' },
        include: {
          uploadedBy: { select: { id: true, name: true } },
          project: { select: { id: true, name: true } },
        },
      }),
    ]);

    return NextResponse.json({ contracts, proposals, files });
  } catch (error: any) {
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status });
  }
}
