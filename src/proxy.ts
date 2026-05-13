import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory rate limiting for Edge (Reset on deployment)
const RATE_LIMIT_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;
const ipCache = new Map<string, { count: number; lastReset: number }>();

export function proxy(request: NextRequest) {
  const isDev = process.env.NODE_ENV !== 'production';
  const hostHeader = (request.headers.get('host') ?? '').toLowerCase();
  const hostname = request.nextUrl.hostname;
  const isLocalHost =
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '::1' ||
    hostname.endsWith('.local') ||
    hostHeader.includes('localhost') ||
    hostHeader.includes('127.0.0.1') ||
    hostHeader.includes('[::1]');
  const enforceHttps = process.env.ENABLE_STRICT_HTTPS === 'true';
  const enableHsts = process.env.ENABLE_HSTS === 'true';

  // Rate Limiting for Leads API
  if (request.nextUrl.pathname.startsWith('/api/leads')) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'anonymous';
    const now = Date.now();
    const userData = ipCache.get(ip) || { count: 0, lastReset: now };

    if (now - userData.lastReset > RATE_LIMIT_MS) {
      userData.count = 0;
      userData.lastReset = now;
    }

    userData.count++;
    ipCache.set(ip, userData);

    if (userData.count > MAX_REQUESTS) {
      return new NextResponse('Too many requests', { status: 429 });
    }
  }

  // CSP tuned for Next.js hydration/runtime + analytics + Turnstile.
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ''} https://www.googletagmanager.com https://www.google-analytics.com https://challenges.cloudflare.com;
    connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://raw.githack.com https://raw.githubusercontent.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https://www.google-analytics.com https://www.googletagmanager.com https://raw.githack.com https://raw.githubusercontent.com;
    font-src 'self' https://fonts.gstatic.com;
    frame-src https://challenges.cloudflare.com;
    media-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    ${!isDev && !isLocalHost && enforceHttps ? 'upgrade-insecure-requests;' : ''}
  `.replace(/\s{2,}/g, ' ').trim();

  // 3. Set request headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('Content-Security-Policy', cspHeader);

  // 4. Create the response
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // 5. Add standard security headers to the response
  response.headers.set('Content-Security-Policy', cspHeader);
  if (!isDev && !isLocalHost && enableHsts) {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
}

// Specify which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};

