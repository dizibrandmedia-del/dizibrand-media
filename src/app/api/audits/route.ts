import { NextRequest, NextResponse } from 'next/server';
import { FreeAuditSchema } from '@/lib/validations/lead';
import { prisma } from '@/lib/db/prisma';
import { AuditAction, LeadStatus, BudgetTier } from '@prisma/client';
import { saveLeadToStore } from '@/lib/domain/crm/lead-store';

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
    let leadId = `lead_audit_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // Try creating in PostgreSQL if available
    try {
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

      leadId = lead.id;

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
    } catch (dbError) {
      console.warn('Prisma audit lead creation unavailable, syncing directly to CRM lead store:', dbError);
    }

    // Always persist to CRM Lead Store
    const storedLead = saveLeadToStore({
      id: leadId,
      firstName: data.contactName.split(' ')[0] || data.contactName,
      lastName: data.contactName.split(' ').slice(1).join(' ') || '',
      email: data.email.toLowerCase().trim(),
      companyName: data.companyName,
      website: data.websiteUrl,
      serviceName: `Free Audit: ${data.auditType}`,
      projectDescription: `Requested Audit: ${data.auditType}. Website: ${data.websiteUrl}. Monthly Ad Spend: ${data.monthlyAdSpend || 'N/A'}. Primary Challenge: ${data.primaryPainPoint}`,
      budgetTier: 'TIER_5000_10000',
      country: 'Global',
      status: 'NEW',
      score: 65,
      source: 'free_audit',
    });

    return NextResponse.json({ success: true, leadId: storedLead.id }, { status: 201 });
  } catch (error: any) {
    console.error('API /api/audits error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
