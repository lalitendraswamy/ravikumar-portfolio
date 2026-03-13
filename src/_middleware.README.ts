/**
 * MIDDLEWARE PLACEHOLDER
 * ─────────────────────
 * Next.js Middleware (middleware.ts) runs before every request on the server.
 * Place your actual middleware.ts file alongside this README when you are ready.
 *
 * Common use-cases:
 *   - Authentication / authorization checks
 *   - Locale detection & i18n routing (e.g., redirect / → /en)
 *   - Rate-limiting
 *   - A/B testing or feature flags
 *   - Request / response logging
 *
 * When you add the middleware, create:
 *   src/middleware.ts
 *
 * with content like:
 *
 *   import { NextResponse } from 'next/server';
 *   import type { NextRequest } from 'next/server';
 *
 *   export function middleware(request: NextRequest) {
 *     // Example: auth guard
 *     const token = request.cookies.get('auth-token');
 *     if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
 *       return NextResponse.redirect(new URL('/login', request.url));
 *     }
 *     return NextResponse.next();
 *   }
 *
 *   export const config = {
 *     matcher: ['/dashboard/:path*', '/admin/:path*'],
 *   };
 */
