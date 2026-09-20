import { NextRequest, NextResponse } from 'next/server';
import { LeadFormSchema } from '@/lib/validations/lead';
import { calculateLeadScore } from '@/lib/domain/crm/lead-scoring';
import { prisma } from '@/lib/db/prisma';
import { AuditAction, LeadStatus } from '@prisma/client';
import { saveLeadToStore } from '@/lib/domain/crm/lead-store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Validate payload with Zod
    const validationResult = LeadFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // 2. Anti-Spam Honeypot Verification
    if (data.honeypot && data.honeypot.length > 0) {
      // Silently accept spam bot submissions without storing
      return NextResponse.json({ success: true, message: 'Inquiry received' });
    }

    // 3. Calculate Lead Score
    const scoreResult = calculateLeadScore({
      budgetTier: data.budgetTier,
      service: data.service,
      email: data.email,
      companyName: data.companyName,
      website: data.website,
      country: data.country,
      projectDescription: data.projectDescription,
    });

    // 4. Try storing in PostgreSQL if connected
    let leadId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    try {
      const salesRep = await prisma.user.findFirst({
        where: { role: 'SALES', isActive: true },
      });

      const lead = await prisma.lead.create({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email.toLowerCase().trim(),
          phone: data.phone || null,
          country: data.country,
          companyName: data.companyName,
          website: data.website || null,
          serviceName: data.service,
          projectDescription: data.projectDescription,
          budgetTier: data.budgetTier as any,
          timeline: data.timeline || null,
          status: LeadStatus.NEW,
          score: scoreResult.total,
          scoreBreakdown: scoreResult as any,
          assignedToId: salesRep?.id || null,
          privacyConsent: true,
        },
      });

      leadId = lead.id;

      await prisma.leadScoreHistory.create({
        data: {
          leadId: lead.id,
          scoreBefore: 0,
          scoreAfter: scoreResult.total,
          reason: 'Initial automated intake scoring',
        },
      });

      await prisma.auditLog.create({
        data: {
          actorEmail: data.email,
          action: AuditAction.CREATE,
          entityType: 'Lead',
          entityId: lead.id,
          ipAddress: req.ip || req.headers.get('x-forwarded-for') || null,
          userAgent: req.headers.get('user-agent') || null,
          changes: {
            score: scoreResult.total,
            budgetTier: data.budgetTier,
            service: data.service,
          },
        },
      });
    } catch (dbError) {
      console.warn('Prisma lead creation unavailable, syncing directly to CRM lead store:', dbError);
    }

    // 5. Always persist to Lead Store for instant CRM sync
    const storedLead = saveLeadToStore({
      id: leadId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email.toLowerCase().trim(),
      phone: data.phone || null,
      country: data.country,
      companyName: data.companyName,
      website: data.website || null,
      serviceName: data.service,
      projectDescription: data.projectDescription,
      budgetTier: data.budgetTier,
      timeline: data.timeline || null,
      status: 'NEW',
      score: scoreResult.total,
      scoreBreakdown: scoreResult,
      source: 'contact_form',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry successfully submitted to DiziBrand Media CRM.',
        leadId: storedLead.id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('API /api/leads error:', error);
    return NextResponse.json(
      { error: 'An internal error occurred while processing your inquiry.' },
      { status: 500 }
    );
  }
}
