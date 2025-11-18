/**
 * CSRF Protection via Origin Verification
 *
 * Validates that requests come from trusted origins to prevent
 * Cross-Site Request Forgery (CSRF) attacks.
 */

/**
 * Get the origin from the request headers
 * Checks both Origin and Referer headers
 */
function getRequestOrigin(request: Request): string | null {
  // Try Origin header first (most reliable)
  const origin = request.headers.get('origin');
  if (origin) {
    return origin;
  }

  // Fallback to Referer header
  const referer = request.headers.get('referer');
  if (referer) {
    try {
      const url = new URL(referer);
      return url.origin;
    } catch {
      return null;
    }
  }

  return null;
}

/**
 * Get allowed origins for the application
 * In production, this should come from environment variables
 */
function getAllowedOrigins(): string[] {
  const allowedOrigins: string[] = [];

  // Development
  allowedOrigins.push('http://localhost:3000');
  allowedOrigins.push('http://127.0.0.1:3000');

  // Production - Add your production domain(s)
  // Add both www and non-www versions
  allowedOrigins.push('https://www.andeanskiguides.com');
  allowedOrigins.push('https://andeanskiguides.com');

  if (process.env.NEXT_PUBLIC_SITE_URL) {
    allowedOrigins.push(process.env.NEXT_PUBLIC_SITE_URL);
  }

  // Vercel preview deployments
  if (process.env.VERCEL_URL) {
    allowedOrigins.push(`https://${process.env.VERCEL_URL}`);
  }

  // Add custom domains from environment variable
  if (process.env.ALLOWED_ORIGINS) {
    const customOrigins = process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim());
    allowedOrigins.push(...customOrigins);
  }

  // Log allowed origins in production for debugging
  if (process.env.NODE_ENV === 'production') {
    console.log('Allowed origins:', allowedOrigins);
  }

  return allowedOrigins;
}

/**
 * Verify that the request origin is allowed
 * Returns { allowed: true } if origin is valid
 * Returns { allowed: false, reason: string } if origin is invalid
 */
export function verifyOrigin(request: Request): {
  allowed: boolean;
  reason?: string;
  origin?: string;
} {
  const requestOrigin = getRequestOrigin(request);

  // No origin header present - could be a direct API call or old browser
  // For security, we reject requests without origin/referer
  if (!requestOrigin) {
    return {
      allowed: false,
      reason: 'Missing origin header. Requests must include Origin or Referer header.',
    };
  }

  const allowedOrigins = getAllowedOrigins();

  // Check if the origin is in the allowed list
  const isAllowed = allowedOrigins.some(allowed => {
    // Exact match
    if (requestOrigin === allowed) {
      return true;
    }

    // Allow subdomains of allowed origins in production
    if (process.env.NODE_ENV === 'production') {
      try {
        const requestUrl = new URL(requestOrigin);
        const allowedUrl = new URL(allowed);

        // Check if it's a subdomain
        return requestUrl.hostname.endsWith(`.${allowedUrl.hostname}`);
      } catch {
        return false;
      }
    }

    return false;
  });

  if (isAllowed) {
    return {
      allowed: true,
      origin: requestOrigin,
    };
  }

  // Log blocked origin for debugging
  console.error('CSRF: Blocked origin:', requestOrigin, 'Allowed origins:', allowedOrigins);

  return {
    allowed: false,
    reason: `Origin '${requestOrigin}' is not allowed. Only requests from trusted domains are accepted.`,
    origin: requestOrigin,
  };
}

/**
 * Middleware helper to check CSRF protection
 * Returns null if allowed, or a NextResponse with error if blocked
 */
export function checkCsrfProtection(request: Request): { error?: string; status?: number } | null {
  // Temporary: Disable CSRF in production for debugging
  // TODO: Remove this after fixing the issue
  if (process.env.DISABLE_CSRF_CHECK === 'true') {
    console.log('CSRF check disabled for debugging');
    return null;
  }

  const verification = verifyOrigin(request);

  if (!verification.allowed) {
    return {
      error: verification.reason || 'Invalid origin',
      status: 403,
    };
  }

  return null;
}
