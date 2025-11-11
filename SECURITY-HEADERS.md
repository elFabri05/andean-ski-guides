# Security Headers Documentation

This document explains the security headers implemented in this application and their purpose.

## Overview

Security headers are HTTP response headers that enhance the security of your web application by instructing browsers on how to behave when handling your site's content. They provide defense-in-depth protection against various attacks.

## Implemented Security Headers

### 1. Content-Security-Policy (CSP)

**Purpose:** Prevents Cross-Site Scripting (XSS), clickjacking, and other code injection attacks by specifying which sources of content are allowed.

**Configuration:**
```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
img-src 'self' data: https://maps.googleapis.com https://maps.gstatic.com;
font-src 'self' https://fonts.gstatic.com data:;
connect-src 'self' https://maps.googleapis.com;
frame-src 'self' https://maps.googleapis.com;
object-src 'none';
base-uri 'self';
form-action 'self';
frame-ancestors 'none';
upgrade-insecure-requests;
```

**What it protects against:**
- XSS attacks
- Unauthorized script execution
- Data injection attacks
- Clickjacking

**Note:** The use of `unsafe-inline` and `unsafe-eval` in script-src is required for:
- Next.js runtime functionality
- Material-UI/Emotion CSS-in-JS
- Google Maps API

For production, consider implementing CSP nonces for stricter inline script control.

---

### 2. X-Frame-Options

**Purpose:** Prevents clickjacking attacks by controlling whether the browser should allow the page to be rendered in a frame/iframe.

**Value:** `DENY`

**What it protects against:**
- Clickjacking attacks
- UI redressing attacks
- Unauthorized embedding of your site in malicious iframes

---

### 3. X-Content-Type-Options

**Purpose:** Prevents MIME type sniffing, forcing the browser to respect the declared Content-Type.

**Value:** `nosniff`

**What it protects against:**
- MIME confusion attacks
- Drive-by downloads
- Execution of malicious content disguised as innocent files

---

### 4. Strict-Transport-Security (HSTS)

**Purpose:** Forces browsers to always use HTTPS when connecting to your site.

**Value:** `max-age=63072000; includeSubDomains; preload`

**Configuration breakdown:**
- `max-age=63072000`: Enforces HTTPS for 2 years (730 days)
- `includeSubDomains`: Applies policy to all subdomains
- `preload`: Allows inclusion in browser HSTS preload lists

**What it protects against:**
- Man-in-the-middle attacks
- Protocol downgrade attacks
- Cookie hijacking
- Session hijacking

**Important:** Only enable HSTS if:
1. Your site is fully accessible via HTTPS
2. All subdomains support HTTPS (if using includeSubDomains)
3. You're ready for the long-term commitment (2 years)

---

### 5. Referrer-Policy

**Purpose:** Controls how much referrer information is sent with requests.

**Value:** `strict-origin-when-cross-origin`

**Behavior:**
- Same-origin requests: Full URL is sent
- Cross-origin HTTPS to HTTPS: Only origin is sent
- HTTPS to HTTP: No referrer sent

**What it protects against:**
- Information leakage through referrer headers
- Privacy violations
- Exposure of sensitive URL parameters

---

### 6. Permissions-Policy

**Purpose:** Controls which browser features and APIs can be used by the page.

**Configuration:**
```
camera=()
microphone=()
geolocation=(self)
interest-cohort=()
payment=()
usb=()
```

**What it protects against:**
- Unauthorized access to device hardware
- Privacy violations
- FLoC tracking (interest-cohort)
- Malicious use of powerful browser APIs

**Settings explained:**
- `camera=()`: Completely blocks camera access
- `microphone=()`: Completely blocks microphone access
- `geolocation=(self)`: Allows geolocation only from same origin
- `interest-cohort=()`: Disables FLoC tracking (privacy protection)
- `payment=()`: Blocks Payment Request API
- `usb=()`: Blocks WebUSB API

---

### 7. X-DNS-Prefetch-Control

**Purpose:** Controls DNS prefetching, which can improve performance but has privacy implications.

**Value:** `on`

**What it controls:**
- DNS resolution for external domains before user clicks links
- Balances performance vs. privacy

---

### 8. X-XSS-Protection

**Purpose:** Enables XSS filtering in legacy browsers (modern browsers rely on CSP).

**Value:** `1; mode=block`

**What it protects against:**
- XSS attacks in older browsers
- Provides fallback protection when CSP is not supported

**Note:** This is primarily for backward compatibility. Modern browsers use Content-Security-Policy instead.

---

## Testing Security Headers

You can test the security headers using various tools:

### 1. Browser Developer Tools
Open DevTools → Network tab → Click any request → View Response Headers

### 2. Command Line (curl)
```bash
curl -I http://localhost:3000/
```

### 3. Online Tools
- [Security Headers](https://securityheaders.com/)
- [Mozilla Observatory](https://observatory.mozilla.org/)
- [SSL Labs](https://www.ssllabs.com/ssltest/)

### 4. Automated Test Script
Run the included test script:
```bash
npm run dev
node test-security-headers.js
```

---

## Security Scoring

With these headers properly configured, your site should achieve:
- **A+ rating** on securityheaders.com
- **A+ rating** on Mozilla Observatory
- Excellent security posture against common web vulnerabilities

---

## Maintenance & Updates

### When to Update CSP

Update the CSP configuration when you:
1. Add new external resources (CDNs, APIs, fonts, etc.)
2. Integrate new third-party services
3. Add inline scripts or styles
4. Change hosting providers

### Monitoring

Consider implementing:
1. **CSP Reporting:** Add `report-uri` or `report-to` directives to receive violation reports
2. **Header Testing:** Regularly test headers in production
3. **Security Scanning:** Use automated tools to scan for misconfigurations

---

## Common Issues & Solutions

### Issue: Google Maps not loading
**Solution:** Ensure CSP includes:
- `script-src` includes `https://maps.googleapis.com`
- `frame-src` includes `https://maps.googleapis.com`
- `img-src` includes `https://maps.googleapis.com https://maps.gstatic.com`
- `connect-src` includes `https://maps.googleapis.com`

### Issue: Fonts not loading
**Solution:** Check that CSP includes:
- `font-src` includes `https://fonts.gstatic.com`
- `style-src` includes `https://fonts.googleapis.com`

### Issue: Inline styles blocked
**Solution:** For MUI/Emotion, ensure:
- `style-src` includes `'unsafe-inline'`

### Issue: HSTS causing issues in development
**Solution:** HSTS only activates when served over HTTPS. In development (HTTP), it's ignored.

---

## Next Steps

### Enhanced Security (Optional)

1. **CSP Nonces:** Implement nonce-based CSP for stricter inline script control
2. **CSP Reporting:** Set up endpoint to receive CSP violation reports
3. **Subresource Integrity (SRI):** Add integrity attributes to external resources
4. **Certificate Transparency:** Monitor CT logs for your domain
5. **DNSSEC:** Implement DNS Security Extensions

### Production Considerations

1. **HTTPS Requirement:** Ensure full HTTPS coverage before enabling HSTS
2. **Testing:** Test all headers in staging before deploying to production
3. **Gradual Rollout:** Consider using CSP in report-only mode initially
4. **Monitoring:** Set up monitoring for security header violations

---

## References

- [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Content Security Policy Reference](https://content-security-policy.com/)
- [Scott Helme's Security Headers](https://securityheaders.com/)

---

## Implementation Details

**File:** `next.config.ts`

Headers are configured in the Next.js configuration file using the `headers()` function, which applies them to all routes matching the specified source pattern.

**Applies to:** All routes (`/:path*`)

**Configured:** November 2025
**Last Updated:** November 2025
