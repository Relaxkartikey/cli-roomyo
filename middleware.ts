import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the token from cookies
  const token = request.cookies.get('auth-token');
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isLoginPage = request.nextUrl.pathname === '/admin/login';
  const isDashboard = request.nextUrl.pathname === '/admin/dashboard';

  // If it's an admin route
  if (isAdminRoute) {
    // If user is not logged in
    if (!token) {
      // If trying to access login page, allow it
      if (isLoginPage) {
        return NextResponse.next();
      }
      // For any other admin route, show 404 if it's not dashboard
      if (!isDashboard) {
        return NextResponse.rewrite(new URL('/404', request.url));
      }
      // For dashboard, redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // If user is logged in
    if (token) {
      // If trying to access login page or just /admin, redirect to dashboard
      if (isLoginPage || request.nextUrl.pathname === '/admin') {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
}; 