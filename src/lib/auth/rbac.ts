import { Session } from 'next-auth';
import { Role } from '@prisma/client';

export class AuthorizationError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 403) {
    super(message);
    this.name = 'AuthorizationError';
    this.statusCode = statusCode;
  }
}

export class AuthenticationError extends Error {
  statusCode: number;
  constructor(message = 'Authentication required', statusCode = 401) {
    super(message);
    this.name = 'AuthenticationError';
    this.statusCode = statusCode;
  }
}

export function assertAuthenticated(session: Session | null): asserts session is Session {
  if (!session?.user) {
    throw new AuthenticationError('You must be logged in to perform this action.');
  }
}

export function assertRole(session: Session | null, allowedRoles: Role[]): asserts session is Session {
  assertAuthenticated(session);
  if (!allowedRoles.includes(session.user.role)) {
    throw new AuthorizationError(
      `Access denied. Role '${session.user.role}' is not authorized for this operation.`
    );
  }
}

export function assertSuperAdmin(session: Session | null): asserts session is Session {
  assertRole(session, [Role.SUPER_ADMIN, Role.MANAGEMENT]);
}

export function assertTeamMember(session: Session | null): asserts session is Session {
  assertRole(session, [
    Role.SUPER_ADMIN,
    Role.MANAGEMENT,
    Role.SALES,
    Role.PROJECT_MANAGER,
    Role.EMPLOYEE,
    Role.FREELANCER,
  ]);
}

export function assertClientTenant(session: Session | null, targetCompanyId?: string): string {
  assertAuthenticated(session);
  if (
    session.user.role !== Role.CLIENT &&
    session.user.role !== Role.SUPER_ADMIN &&
    session.user.role !== Role.MANAGEMENT
  ) {
    throw new AuthorizationError('This action is strictly restricted to client stakeholders.');
  }

  // Super Admin / Management can inspect any company or their own
  if (session.user.role === Role.SUPER_ADMIN || session.user.role === Role.MANAGEMENT) {
    return targetCompanyId || session.user.companyId || '';
  }

  const userCompanyId = session.user.companyId;
  if (!userCompanyId) {
    throw new AuthorizationError('Client account is not linked to an organization.');
  }

  if (targetCompanyId && userCompanyId !== targetCompanyId) {
    throw new AuthorizationError('Forbidden: You cannot access data outside your organization.');
  }

  return userCompanyId;
}
