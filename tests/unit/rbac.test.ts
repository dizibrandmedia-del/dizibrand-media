import { describe, it, expect } from 'vitest';
import {
  assertAuthenticated,
  assertRole,
  assertSuperAdmin,
  assertTeamMember,
  assertClientTenant,
  AuthenticationError,
  AuthorizationError,
} from '@/lib/auth/rbac';
import { Role } from '@prisma/client';
import { Session } from 'next-auth';

describe('RBAC & Tenant Isolation Unit Tests', () => {
  const createMockSession = (role: Role, companyId?: string | null): Session => ({
    user: {
      id: 'usr_test_123',
      name: 'Test User',
      email: 'test@example.com',
      role,
      companyId: companyId || null,
    },
    expires: new Date(Date.now() + 3600000).toISOString(),
  });

  describe('assertAuthenticated', () => {
    it('throws AuthenticationError when session is null', () => {
      expect(() => assertAuthenticated(null)).toThrow(AuthenticationError);
    });

    it('throws AuthenticationError when session user is undefined', () => {
      expect(() => assertAuthenticated({} as Session)).toThrow(AuthenticationError);
    });

    it('passes when session and user exist', () => {
      const session = createMockSession(Role.EMPLOYEE);
      expect(() => assertAuthenticated(session)).not.toThrow();
    });
  });

  describe('assertRole', () => {
    it('allows users with authorized roles', () => {
      const session = createMockSession(Role.SALES);
      expect(() => assertRole(session, [Role.SALES, Role.SUPER_ADMIN])).not.toThrow();
    });

    it('rejects users with unauthorized roles', () => {
      const session = createMockSession(Role.CLIENT);
      expect(() => assertRole(session, [Role.SUPER_ADMIN, Role.PROJECT_MANAGER])).toThrow(
        AuthorizationError
      );
    });
  });

  describe('assertSuperAdmin', () => {
    it('allows SUPER_ADMIN and MANAGEMENT', () => {
      expect(() => assertSuperAdmin(createMockSession(Role.SUPER_ADMIN))).not.toThrow();
      expect(() => assertSuperAdmin(createMockSession(Role.MANAGEMENT))).not.toThrow();
    });

    it('rejects all non-admin roles', () => {
      const nonAdminRoles: Role[] = [
        Role.SALES,
        Role.PROJECT_MANAGER,
        Role.EMPLOYEE,
        Role.FREELANCER,
        Role.CLIENT,
      ];
      for (const role of nonAdminRoles) {
        expect(() => assertSuperAdmin(createMockSession(role))).toThrow(AuthorizationError);
      }
    });
  });

  describe('assertTeamMember', () => {
    it('allows all internal team roles and freelancers', () => {
      const teamRoles: Role[] = [
        Role.SUPER_ADMIN,
        Role.MANAGEMENT,
        Role.SALES,
        Role.PROJECT_MANAGER,
        Role.EMPLOYEE,
        Role.FREELANCER,
      ];
      for (const role of teamRoles) {
        expect(() => assertTeamMember(createMockSession(role))).not.toThrow();
      }
    });

    it('strictly rejects CLIENT users from internal team workspace', () => {
      const clientSession = createMockSession(Role.CLIENT, 'comp_123');
      expect(() => assertTeamMember(clientSession)).toThrow(AuthorizationError);
    });
  });

  describe('assertClientTenant', () => {
    it('allows client user accessing their own company data', () => {
      const clientSession = createMockSession(Role.CLIENT, 'comp_acme_01');
      const companyId = assertClientTenant(clientSession, 'comp_acme_01');
      expect(companyId).toBe('comp_acme_01');
    });

    it('blocks client user trying to access a different company data (cross-tenant leakage prevention)', () => {
      const clientSession = createMockSession(Role.CLIENT, 'comp_acme_01');
      expect(() => assertClientTenant(clientSession, 'comp_competitor_99')).toThrow(
        AuthorizationError
      );
    });

    it('rejects client user whose account is not linked to any company', () => {
      const unlinkedClient = createMockSession(Role.CLIENT, null);
      expect(() => assertClientTenant(unlinkedClient)).toThrow(AuthorizationError);
    });

    it('rejects internal employees and sales reps from accessing client portal directly', () => {
      const salesSession = createMockSession(Role.SALES);
      expect(() => assertClientTenant(salesSession)).toThrow(AuthorizationError);

      const devSession = createMockSession(Role.EMPLOYEE);
      expect(() => assertClientTenant(devSession)).toThrow(AuthorizationError);
    });

    it('allows SUPER_ADMIN and MANAGEMENT to inspect any client organization', () => {
      const adminSession = createMockSession(Role.SUPER_ADMIN);
      const companyId = assertClientTenant(adminSession, 'comp_target_456');
      expect(companyId).toBe('comp_target_456');
    });
  });
});
