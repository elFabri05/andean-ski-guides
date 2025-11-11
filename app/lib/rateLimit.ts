/**
 * In-memory rate limiter for API endpoints
 * Tracks both IP addresses and email addresses to prevent abuse
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

class RateLimiter {
  private ipLimits: Map<string, RateLimitEntry> = new Map();
  private emailLimits: Map<string, RateLimitEntry> = new Map();

  // Rate limit configurations
  private readonly IP_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
  private readonly IP_MAX_REQUESTS = 5;
  private readonly EMAIL_WINDOW_MS = 60 * 60 * 1000; // 1 hour
  private readonly EMAIL_MAX_REQUESTS = 3;
  private readonly CLEANUP_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

  constructor() {
    // Periodically clean up expired entries to prevent memory leaks
    setInterval(() => this.cleanup(), this.CLEANUP_INTERVAL_MS);
  }

  /**
   * Check if an IP address has exceeded the rate limit
   */
  checkIpLimit(ip: string): { allowed: boolean; retryAfter?: number } {
    const now = Date.now();
    const entry = this.ipLimits.get(ip);

    if (!entry || now > entry.resetAt) {
      // No entry or expired entry - allow and create new
      this.ipLimits.set(ip, {
        count: 1,
        resetAt: now + this.IP_WINDOW_MS,
      });
      return { allowed: true };
    }

    if (entry.count >= this.IP_MAX_REQUESTS) {
      // Rate limit exceeded
      const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
      return { allowed: false, retryAfter };
    }

    // Increment count
    entry.count++;
    return { allowed: true };
  }

  /**
   * Check if an email address has exceeded the rate limit
   */
  checkEmailLimit(email: string): { allowed: boolean; retryAfter?: number } {
    const normalizedEmail = email.toLowerCase().trim();
    const now = Date.now();
    const entry = this.emailLimits.get(normalizedEmail);

    if (!entry || now > entry.resetAt) {
      // No entry or expired entry - allow and create new
      this.emailLimits.set(normalizedEmail, {
        count: 1,
        resetAt: now + this.EMAIL_WINDOW_MS,
      });
      return { allowed: true };
    }

    if (entry.count >= this.EMAIL_MAX_REQUESTS) {
      // Rate limit exceeded
      const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
      return { allowed: false, retryAfter };
    }

    // Increment count
    entry.count++;
    return { allowed: true };
  }

  /**
   * Clean up expired entries to prevent memory leaks
   */
  private cleanup(): void {
    const now = Date.now();

    // Clean up IP limits
    for (const [ip, entry] of this.ipLimits.entries()) {
      if (now > entry.resetAt) {
        this.ipLimits.delete(ip);
      }
    }

    // Clean up email limits
    for (const [email, entry] of this.emailLimits.entries()) {
      if (now > entry.resetAt) {
        this.emailLimits.delete(email);
      }
    }
  }

  /**
   * Get current rate limit stats (for monitoring/debugging)
   */
  getStats(): { ipCount: number; emailCount: number } {
    return {
      ipCount: this.ipLimits.size,
      emailCount: this.emailLimits.size,
    };
  }
}

// Singleton instance
export const rateLimiter = new RateLimiter();
