import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { assertSuperAdmin } from '@/lib/auth/rbac';
import { prisma } from '@/lib/db/prisma';
import { z } from 'zod';

const noteSchema = z.object({
  content: z.string().min(1, 'Note content cannot be empty'),
});

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    assertSuperAdmin(session);

    const body = await request.json();
    const validated = noteSchema.parse(body);

    const lead = await prisma.lead.findUnique({
      where: { id: params.id },
    });

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    const note = await prisma.note.create({
      data: {
        content: validated.content,
        authorId: session.user.id,
        leadId: lead.id,
        companyId: lead.companyId || null,
      },
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json({ note }, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status });
  }
}
