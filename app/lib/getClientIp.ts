/**
 * Extract the client IP address from the request
 * Handles various proxy and forwarding scenarios
 */
export function getClientIp(request: Request): string {
  // Try to get IP from various headers (in order of preference)
  const headers = request.headers;

  // X-Forwarded-For header (may contain multiple IPs, first one is the client)
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    const ips = forwardedFor.split(',').map(ip => ip.trim());
    return ips[0];
  }

  // X-Real-IP header (common with nginx)
  const realIp = headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  // CF-Connecting-IP (Cloudflare)
  const cfIp = headers.get('cf-connecting-ip');
  if (cfIp) {
    return cfIp;
  }

  // Vercel-specific header
  const vercelIp = headers.get('x-vercel-forwarded-for');
  if (vercelIp) {
    return vercelIp;
  }

  // Fallback to 'unknown' if no IP can be determined
  return 'unknown';
}
