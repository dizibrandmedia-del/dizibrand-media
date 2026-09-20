import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { assertClientTenant, assertAuthenticated } from '@/lib/auth/rbac';
import { prisma } from '@/lib/db/prisma';
import { InvoiceStatus, PaymentMethod, AuditAction } from '@prisma/client';

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

    const body = await request.json().catch(() => ({}));
    const method = (body.method as PaymentMethod) || PaymentMethod.STRIPE;

    const invoice = await prisma.invoice.findUnique({
      where: { id: params.id },
      include: {
        company: { select: { id: true, name: true } },
      },
    });

    if (!invoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    // Tenant check
    if (authorizedCompanyId && invoice.companyId !== authorizedCompanyId) {
      return NextResponse.json(
        { error: 'Forbidden: Invoice does not belong to your organization' },
        { status: 403 }
      );
    }

    if (invoice.status === InvoiceStatus.PAID) {
      return NextResponse.json(
        { error: 'Invoice has already been settled and paid.' },
        { status: 400 }
      );
    }

    const txnRef = `SIM-${Date.now().toString().slice(-8)}`;

    // Create payment and update invoice transactionally
    const [payment, updatedInvoice] = await prisma.$transaction([
      prisma.payment.create({
        data: {
          invoiceId: invoice.id,
          amount: invoice.totalAmount,
          currency: invoice.currency,
          method,
          transactionReference: txnRef,
          status: 'Success',
        },
      }),
      prisma.invoice.update({
        where: { id: invoice.id },
        data: {
          status: InvoiceStatus.PAID,
          paidAt: new Date(),
        },
        include: {
          payments: true,
          project: { select: { id: true, name: true } },
        },
      }),
    ]);

    // Record audit log
    await prisma.auditLog.create({
      data: {
        actorId: session.user.id,
        actorEmail: session.user.email,
        action: AuditAction.PAYMENT_RECORDED,
        entityType: 'Invoice',
        entityId: invoice.id,
        changes: {
          invoiceNumber: invoice.invoiceNumber,
          amount: Number(invoice.totalAmount),
          currency: invoice.currency,
          method,
          transactionReference: txnRef,
        },
      },
    });

    return NextResponse.json({
      success: true,
      invoice: updatedInvoice,
      payment,
      message: `Invoice ${invoice.invoiceNumber} paid successfully.`,
    });
  } catch (error: any) {
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status });
  }
}
