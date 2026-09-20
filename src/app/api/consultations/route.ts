import { NextRequest, NextResponse } from 'next/server';
import { ConsultationSchema } from '@/lib/validations/lead';
import { prisma } from '@/lib/db/prisma';
import { AuditAction, LeadStatus, BudgetTier } from '@prisma/client';

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

    // Create or update lead record
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

    return NextResponse.json({ success: true, leadId: lead.id }, { status: 201 });
  } catch (error: any) {
    console.error('API /api/consultations error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
