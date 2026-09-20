import { NextRequest, NextResponse } from 'next/server';
import { FreelancerApplicationSchema } from '@/lib/validations/lead';
import { prisma } from '@/lib/db/prisma';
import { AuditAction } from '@prisma/client';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = FreelancerApplicationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Check if application already exists for this email
    const existing = await prisma.freelancerApplication.findUnique({
      where: { email: data.email.toLowerCase().trim() },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'An application with this email has already been submitted.' },
        { status: 409 }
      );
    }

    const application = await prisma.freelancerApplication.create({
      data: {
        fullName: data.fullName,
        email: data.email.toLowerCase().trim(),
        phone: data.phone || null,
        portfolioUrl: data.portfolioUrl,
        primarySpecialty: data.primarySpecialty,
        experienceYears: data.experienceYears,
        desiredHourlyRate: data.desiredHourlyRate,
        resumeUrl: data.resumeUrl || null,
        status: 'Pending',
      },
    });

    // Audit Log
    await prisma.auditLog.create({
      data: {
        actorEmail: data.email,
        action: AuditAction.CREATE,
        entityType: 'FreelancerApplication',
        entityId: application.id,
        ipAddress: req.ip || req.headers.get('x-forwarded-for') || null,
        userAgent: req.headers.get('user-agent') || null,
        changes: { specialty: data.primarySpecialty, rate: data.desiredHourlyRate },
      },
    });

    return NextResponse.json({ success: true, applicationId: application.id }, { status: 201 });
  } catch (error: any) {
    console.error('API /api/freelancers error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
