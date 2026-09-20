import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { assertSuperAdmin } from '@/lib/auth/rbac';
import { prisma } from '@/lib/db/prisma';
import { Role, AuditAction } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  role: z.nativeEnum(Role),
  password: z.string().min(8, 'Password must be at least 8 characters').optional(),
  phone: z.string().optional(),
  companyId: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    assertSuperAdmin(session);

    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role') as Role | null;
    const search = searchParams.get('search') || '';

    const where: any = {};
    if (role && Object.values(Role).includes(role)) {
      where.role = role;
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    const users = await prisma.user.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        isActive: true,
        createdAt: true,
        company: {
          select: { id: true, name: true },
        },
      },
    });

    return NextResponse.json({ users });
  } catch (error: any) {
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    assertSuperAdmin(session);

    const body = await request.json();
    const validated = createUserSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { email: validated.email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 });
    }

    const rawPassword = validated.password || 'DiziBrand2026!Temporary';
    const passwordHash = await bcrypt.hash(rawPassword, 10);

    const user = await prisma.user.create({
      data: {
        name: validated.name,
        email: validated.email,
        role: validated.role,
        passwordHash,
        phone: validated.phone || null,
        companyId: validated.companyId || null,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        actorId: session.user.id,
        actorEmail: session.user.email,
        action: AuditAction.CREATE,
        entityType: 'User',
        entityId: user.id,
        changes: {
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status });
  }
}
