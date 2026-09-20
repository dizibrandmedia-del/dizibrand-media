import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { assertTeamMember } from '@/lib/auth/rbac';
import { prisma } from '@/lib/db/prisma';
import { z } from 'zod';

const updateProfileSchema = z.object({
  skills: z.array(z.string()).optional(),
  hourlyRate: z.number().positive().optional(),
  currency: z.string().optional(),
  portfolioUrl: z.string().url().optional().or(z.literal('')),
  githubUrl: z.string().url().optional().or(z.literal('')),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  availabilityHoursPerWeek: z.number().int().min(0).max(80).optional(),
});

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    assertTeamMember(session);

    let profile = await prisma.freelancerProfile.findUnique({
      where: { userId: session.user.id },
      include: {
        user: { select: { id: true, name: true, email: true, role: true } },
      },
    });

    if (!profile) {
      // Auto-create empty profile if it doesn't exist yet
      profile = await prisma.freelancerProfile.create({
        data: {
          userId: session.user.id,
          skills: [],
          currency: 'USD',
          availabilityHoursPerWeek: 40,
        },
        include: {
          user: { select: { id: true, name: true, email: true, role: true } },
        },
      });
    }

    return NextResponse.json({ profile });
  } catch (error: any) {
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    assertTeamMember(session);

    const body = await request.json();
    const validated = updateProfileSchema.parse(body);

    const profile = await prisma.freelancerProfile.upsert({
      where: { userId: session.user.id },
      create: {
        userId: session.user.id,
        skills: validated.skills || [],
        hourlyRate: validated.hourlyRate || null,
        currency: validated.currency || 'USD',
        portfolioUrl: validated.portfolioUrl || null,
        githubUrl: validated.githubUrl || null,
        linkedinUrl: validated.linkedinUrl || null,
        availabilityHoursPerWeek: validated.availabilityHoursPerWeek || 40,
      },
      update: {
        skills: validated.skills,
        hourlyRate: validated.hourlyRate,
        currency: validated.currency,
        portfolioUrl: validated.portfolioUrl || null,
        githubUrl: validated.githubUrl || null,
        linkedinUrl: validated.linkedinUrl || null,
        availabilityHoursPerWeek: validated.availabilityHoursPerWeek,
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
    });

    return NextResponse.json({ profile });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status });
  }
}
