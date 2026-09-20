import { NextRequest, NextResponse } from 'next/server';
import { ConsultationSchema } from '@/lib/validations/lead';
import { prisma } from '@/lib/db/prisma';
import { AuditAction, LeadStatus, BudgetTier } from '@prisma/client';
import { saveLeadToStore } from '@/lib/domain/crm/lead-store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ConsultationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;
    let leadId = `lead_consult_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // Try creating in PostgreSQL if available
    try {
      const lead = await prisma.lead.create({
        data: {
          firstName: data.fullName.split(' ')[0] || data.fullName,
          lastName: data.fullName.split(' ').slice(1).join(' ') || '',
          email: data.email.toLowerCase().trim(),
          companyName: data.company,
          website: data.website || null,
          serviceName: data.consultationType,
          projectDescription: `Requested Consultation: ${data.consultationType}. Preferred: ${data.preferredDate} at ${data.preferredTime}. Notes: ${data.notes || 'None'}`,
          budgetTier: BudgetTier.NOT_SURE,
          country: 'Global',
          status: LeadStatus.MEETING,
          score: 80, // Consultation requests get high initial intent score
          source: 'book_consultation',
          privacyConsent: true,
        },
      });

      leadId = lead.id;

      // Create meeting record if host user is available
      const host = await prisma.user.findFirst({
        where: { role: { in: ['MANAGEMENT', 'SUPER_ADMIN', 'SALES'] }, isActive: true },
      });

      if (host) {
        await prisma.meeting.create({
          data: {
            title: `Strategy Consultation: ${data.company} & DiziBrand Media`,
            leadId: lead.id,
            hostId: host.id,
            scheduledAt: new Date(`${data.preferredDate}T12:00:00Z`),
            durationMinutes: 45,
            status: 'Scheduled',
            notes: data.notes || null,
          },
        });
      }

      // Audit Log
      await prisma.auditLog.create({
        data: {
          actorEmail: data.email,
          action: AuditAction.CREATE,
          entityType: 'Consultation',
          entityId: lead.id,
          ipAddress: req.ip || req.headers.get('x-forwarded-for') || null,
          userAgent: req.headers.get('user-agent') || null,
          changes: { consultationType: data.consultationType, preferredDate: data.preferredDate },
        },
      });
    } catch (dbError) {
      console.warn('Prisma consultation creation unavailable, syncing directly to CRM lead store:', dbError);
    }

    // Always persist to CRM Lead Store
    const storedLead = saveLeadToStore({
      id: leadId,
      firstName: data.fullName.split(' ')[0] || data.fullName,
      lastName: data.fullName.split(' ').slice(1).join(' ') || '',
      email: data.email.toLowerCase().trim(),
      companyName: data.company,
      website: data.website || null,
      serviceName: data.consultationType,
      projectDescription: `Requested Consultation: ${data.consultationType}. Preferred: ${data.preferredDate} at ${data.preferredTime}. Notes: ${data.notes || 'None'}`,
      budgetTier: 'TIER_10000_25000',
      country: 'Global',
      status: 'MEETING',
      score: 80,
      source: 'book_consultation',
    });

    return NextResponse.json({ success: true, leadId: storedLead.id }, { status: 201 });
  } catch (error: any) {
    console.error('API /api/consultations error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
