import { NextRequest, NextResponse } from 'next/server';
import { FreeAuditSchema } from '@/lib/validations/lead';
import { prisma } from '@/lib/db/prisma';
import { AuditAction, LeadStatus, BudgetTier } from '@prisma/client';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = FreeAuditSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Create lead record in PostgreSQL
    const lead = await prisma.lead.create({
      data: {
        firstName: data.contactName.split(' ')[0] || data.contactName,
        lastName: data.contactName.split(' ').slice(1).join(' ') || '',
        email: data.email.toLowerCase().trim(),
        companyName: data.companyName,
        website: data.websiteUrl,
        serviceName: `Free Audit: ${data.auditType}`,
        projectDescription: `Requested Audit: ${data.auditType}. Website: ${data.websiteUrl}. Monthly Ad Spend: ${data.monthlyAdSpend || 'N/A'}. Primary Challenge: ${data.primaryPainPoint}`,
        budgetTier: BudgetTier.NOT_SURE,
        country: 'Global',
        status: LeadStatus.NEW,
        score: 65,
        source: 'free_audit',
        privacyConsent: true,
      },
    });

    // Audit Log
    await prisma.auditLog.create({
      data: {
        actorEmail: data.email,
        action: AuditAction.CREATE,
        entityType: 'AuditRequest',
        entityId: lead.id,
        ipAddress: req.ip || req.headers.get('x-forwarded-for') || null,
        userAgent: req.headers.get('user-agent') || null,
        changes: { auditType: data.auditType, websiteUrl: data.websiteUrl },
      },
    });

    return NextResponse.json({ success: true, leadId: lead.id }, { status: 201 });
  } catch (error: any) {
    console.error('API /api/audits error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
