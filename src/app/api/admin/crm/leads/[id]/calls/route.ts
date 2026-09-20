import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { assertSuperAdmin } from '@/lib/auth/rbac';
import { prisma } from '@/lib/db/prisma';
import { z } from 'zod';

const callSchema = z.object({
  callDate: z.string().optional(),
  durationSeconds: z.number().int().min(0).optional(),
  outcome: z.string().optional(),
  notes: z.string().min(1, 'Call notes cannot be empty'),
});

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    assertSuperAdmin(session);

    const body = await request.json();
    const validated = callSchema.parse(body);

    const lead = await prisma.lead.findUnique({
      where: { id: params.id },
    });

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    const call = await prisma.call.create({
      data: {
        leadId: lead.id,
        companyId: lead.companyId || null,
        conductedById: session.user.id,
        callDate: validated.callDate ? new Date(validated.callDate) : new Date(),
        durationSeconds: validated.durationSeconds || null,
        outcome: validated.outcome || null,
        notes: validated.notes,
      },
      include: {
        conductedBy: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json({ call }, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status });
  }
}
