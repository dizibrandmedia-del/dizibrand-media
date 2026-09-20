import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { assertSuperAdmin } from '@/lib/auth/rbac';
import { convertLeadToWonDeal } from '@/lib/domain/crm/deal-service';
import { z } from 'zod';

const convertSchema = z.object({
  projectName: z.string().optional(),
  budget: z.number().positive().optional(),
  currency: z.string().optional(),
  managerId: z.string().optional(),
  initialDepositAmount: z.number().positive().optional(),
});

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    assertSuperAdmin(session);

    const body = await request.json().catch(() => ({}));
    const validated = convertSchema.parse(body);

    const result = await convertLeadToWonDeal({
      leadId: params.id,
      actorId: session.user.id,
      actorEmail: session.user.email,
      projectName: validated.projectName,
      budget: validated.budget,
      currency: validated.currency,
      managerId: validated.managerId,
      initialDepositAmount: validated.initialDepositAmount,
    });

    return NextResponse.json({
      success: true,
      message: 'Deal successfully closed and onboarded into active project lifecycle.',
      ...result,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status });
  }
}
