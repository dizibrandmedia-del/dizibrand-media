import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { assertSuperAdmin } from '@/lib/auth/rbac';
import { prisma } from '@/lib/db/prisma';
import { Role, AuditAction } from '@prisma/client';
import { z } from 'zod';

const updateUserSchema = z.object({
  role: z.nativeEnum(Role).optional(),
  isActive: z.boolean().optional(),
  name: z.string().optional(),
  phone: z.string().nullable().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    assertSuperAdmin(session);

    const body = await request.json();
    const validated = updateUserSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { id: params.id },
    });

    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Prevent demoting the last SUPER_ADMIN
    if (
      existingUser.role === Role.SUPER_ADMIN &&
      validated.role &&
      validated.role !== Role.SUPER_ADMIN
    ) {
      const superAdminCount = await prisma.user.count({
        where: { role: Role.SUPER_ADMIN, isActive: true },
      });
      if (superAdminCount <= 1) {
        return NextResponse.json(
          { error: 'Cannot demote the only active Super Admin' },
          { status: 400 }
        );
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: validated,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        updatedAt: true,
      },
    });

    const isRoleChange = validated.role && validated.role !== existingUser.role;

    await prisma.auditLog.create({
      data: {
        actorId: session.user.id,
        actorEmail: session.user.email,
        action: isRoleChange ? AuditAction.ROLE_CHANGE : AuditAction.UPDATE,
        entityType: 'User',
        entityId: existingUser.id,
        changes: {
          previous: {
            role: existingUser.role,
            isActive: existingUser.isActive,
          },
          updated: validated,
        },
      },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status });
  }
}
