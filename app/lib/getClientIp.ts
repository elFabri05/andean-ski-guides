import { CLIENT_IP_HEADERS } from './deployEnv';

/**
 * Extract the client IP address from the request
 * Handles various proxy and forwarding scenarios
 *
 * The header precedence is host-specific and lives in deployEnv.ts.
 */
export function getClientIp(request: Request): string {
  for (const { name, isChain } of CLIENT_IP_HEADERS) {
    const value = request.headers.get(name);
    if (!value) {
      continue;
    }

    // A chain header holds a list of proxies; the first entry is the
    // originating client. Single-value headers are used as-is.
    return isChain ? value.split(',').map(ip => ip.trim())[0] : value;
  }

  // Fallback to 'unknown' if no IP can be determined
  return 'unknown';
}
