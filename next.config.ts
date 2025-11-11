import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/:path*',
        headers: [
          // Content Security Policy (CSP)
          // Defines approved sources of content that browsers should allow loading
          {
            key: 'Content-Security-Policy',
            value: [
              // Default: only allow resources from same origin
              "default-src 'self'",
              // Scripts: allow inline scripts (needed for Next.js), same origin, and Google Maps
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com",
              // Styles: allow inline styles (needed for MUI/Emotion), same origin, and Google Fonts
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Images: allow same origin, data URIs, and Google Maps
              "img-src 'self' data: https://maps.googleapis.com https://maps.gstatic.com",
              // Fonts: allow same origin and Google Fonts
              "font-src 'self' https://fonts.gstatic.com data:",
              // Connect: allow same origin and Google Maps API
              "connect-src 'self' https://maps.googleapis.com",
              // Frames: allow Google Maps
              "frame-src 'self' https://maps.googleapis.com",
              // Object/Embed: disallow plugins
              "object-src 'none'",
              // Base URI: restrict to same origin
              "base-uri 'self'",
              // Form actions: only allow same origin
              "form-action 'self'",
              // Frame ancestors: prevent embedding (clickjacking protection)
              "frame-ancestors 'none'",
              // Upgrade insecure requests to HTTPS
              "upgrade-insecure-requests",
            ].join('; '),
          },
          // X-Frame-Options: Prevent clickjacking attacks
          // Prevents the page from being embedded in iframes
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // X-Content-Type-Options: Prevent MIME type sniffing
          // Forces browser to respect the declared Content-Type
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Strict-Transport-Security (HSTS): Force HTTPS
          // Tells browsers to only access the site via HTTPS for the next 2 years
          // includeSubDomains: applies to all subdomains
          // preload: allows inclusion in browser HSTS preload lists
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // Referrer-Policy: Control referrer information
          // Only sends origin (not full URL) when navigating to less secure destinations
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Permissions-Policy: Control browser features and APIs
          // Restricts access to sensitive features to prevent abuse
          {
            key: 'Permissions-Policy',
            value: [
              'camera=()',           // Deny camera access
              'microphone=()',       // Deny microphone access
              'geolocation=(self)',  // Allow geolocation only from same origin
              'interest-cohort=()',  // Disable FLoC (privacy protection)
              'payment=()',          // Deny payment API
              'usb=()',              // Deny USB access
            ].join(', '),
          },
          // X-DNS-Prefetch-Control: Control DNS prefetching
          // Improves privacy by preventing DNS prefetching
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          // X-XSS-Protection: Enable XSS filtering (legacy browsers)
          // Modern browsers use CSP, but this helps older browsers
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
