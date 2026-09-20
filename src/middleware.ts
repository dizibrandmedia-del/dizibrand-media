import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect portal and admin routes
  const isAdminRoute = pathname.startsWith('/admin');
  const isTeamRoute = pathname.startsWith('/team');
  const isClientPortalRoute = pathname.startsWith('/portal');

  if (!isAdminRoute && !isTeamRoute && !isClientPortalRoute) {
    return NextResponse.next();
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET || 'dizibrand_dev_fallback_secret_must_be_overridden_in_prod_32chars',
  });

  // If unauthenticated, redirect to /login with callbackUrl
  if (!token) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const role = token.role as string;

  // 1. Super Admin Portal (/admin/*)
  if (isAdminRoute) {
    if (role !== 'SUPER_ADMIN' && role !== 'MANAGEMENT') {
      // Redirect unauthorized users to their own portal
      if (role === 'CLIENT') {
        return NextResponse.redirect(new URL('/portal', req.url));
      }
      return NextResponse.redirect(new URL('/team', req.url));
    }
    return NextResponse.next();
  }

  // 2. Team Portal (/team/*)
  if (isTeamRoute) {
    const allowedTeamRoles = [
      'SUPER_ADMIN',
      'MANAGEMENT',
      'SALES',
      'PROJECT_MANAGER',
      'EMPLOYEE',
      'FREELANCER',
    ];

    if (!allowedTeamRoles.includes(role)) {
      if (role === 'CLIENT') {
        return NextResponse.redirect(new URL('/portal', req.url));
      }
      return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.next();
  }

  // 3. Client Portal (/portal/*)
  if (isClientPortalRoute) {
    // Clients have standard access; Super Admins and Management can also inspect client portal
    if (role !== 'CLIENT' && role !== 'SUPER_ADMIN' && role !== 'MANAGEMENT') {
      return NextResponse.redirect(new URL('/team', req.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/team/:path*', '/portal/:path*'],
};
