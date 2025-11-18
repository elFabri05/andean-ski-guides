import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import escapeHtml from 'escape-html';
import { rateLimiter } from '@/app/lib/rateLimit';
import { getClientIp } from '@/app/lib/getClientIp';
import { checkCsrfProtection } from '@/app/lib/csrfProtection';
import { validateContactForm, normalizeInput } from '@/app/lib/inputValidation';
import { validateEmailHeaders } from '@/app/lib/emailHeaderProtection';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // Log request headers for debugging
    const origin = request.headers.get('origin');
    const referer = request.headers.get('referer');
    console.log('Contact API - Origin:', origin, 'Referer:', referer);
    console.log('Contact API - All headers:', Object.fromEntries(request.headers.entries()));

    // CSRF Protection: Verify request origin
    const csrfCheck = checkCsrfProtection(request);
    if (csrfCheck) {
      console.error('CSRF check failed:', csrfCheck);
      return NextResponse.json(
        { error: csrfCheck.error },
        { status: csrfCheck.status }
      );
    }

    // Get client IP for rate limiting
    const clientIp = getClientIp(request);

    // Check IP-based rate limit
    const ipLimit = rateLimiter.checkIpLimit(clientIp);
    if (!ipLimit.allowed) {
      return NextResponse.json(
        {
          error: 'Too many requests from this IP address. Please try again later.',
          retryAfter: ipLimit.retryAfter
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(ipLimit.retryAfter),
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.floor(Date.now() / 1000) + (ipLimit.retryAfter || 0))
          }
        }
      );
    }

    const { name, email, phone, message } = await request.json();

    // Validate required fields (basic check)
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Normalize inputs
    const normalizedData = {
      name: normalizeInput(name),
      email: normalizeInput(email),
      phone: phone ? normalizeInput(phone) : undefined,
      message: normalizeInput(message),
    };

    // Comprehensive input validation
    const validation = validateContactForm(normalizedData);
    if (!validation.valid) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validation.errors,
          messages: validation.allErrors,
        },
        { status: 400 }
      );
    }

    // Check email-based rate limit (use normalized email)
    const emailLimit = rateLimiter.checkEmailLimit(normalizedData.email);
    if (!emailLimit.allowed) {
      return NextResponse.json(
        {
          error: 'Too many submissions from this email address. Please try again later.',
          retryAfter: emailLimit.retryAfter
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(emailLimit.retryAfter),
            'X-RateLimit-Limit': '3',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.floor(Date.now() / 1000) + (emailLimit.retryAfter || 0))
          }
        }
      );
    }

    // Sanitize user inputs to prevent XSS attacks (use normalized data)
    const sanitizedName = escapeHtml(normalizedData.name);
    const sanitizedEmail = escapeHtml(normalizedData.email);
    const sanitizedPhone = normalizedData.phone ? escapeHtml(normalizedData.phone) : 'Not provided';
    const sanitizedMessage = escapeHtml(normalizedData.message);

    // Email Header Injection Protection
    // Validate email and subject line before sending
    const subjectLine = `New Contact Form Submission from ${sanitizedName}`;
    const headerValidation = validateEmailHeaders({
      email: normalizedData.email,
      subject: subjectLine,
    });

    if (!headerValidation.safe) {
      return NextResponse.json(
        {
          error: 'Email header validation failed',
          details: headerValidation.errors,
        },
        { status: 400 }
      );
    }

    // Use sanitized values from header validation
    const safeReplyTo = headerValidation.sanitizedEmail!;
    const safeSubject = headerValidation.sanitizedSubject!;

    // Log warnings if any (subject was sanitized)
    if (headerValidation.warnings.length > 0) {
      console.warn('Email headers sanitized:', headerValidation.warnings);
    }

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Andean Ski Guides <onboarding@resend.dev>', // Update this with your verified domain
      to: ['andeanskiguides@gmail.com'], // Your business email
      replyTo: safeReplyTo, // Validated and sanitized email
      subject: safeSubject, // Validated and sanitized subject
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        <p><strong>Phone:</strong> ${sanitizedPhone}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedMessage}</p>
      `,
    });

    return NextResponse.json(
      { message: 'Email sent successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
