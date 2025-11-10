import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import escapeHtml from 'escape-html';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Sanitize user inputs to prevent XSS attacks
    const sanitizedName = escapeHtml(name);
    const sanitizedEmail = escapeHtml(email);
    const sanitizedPhone = phone ? escapeHtml(phone) : 'Not provided';
    const sanitizedMessage = escapeHtml(message);

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Andean Ski Guides <onboarding@resend.dev>', // Update this with your verified domain
      to: ['andeanskiguides@gmail.com'], // Your business email
      replyTo: email, // Customer's email for easy replies
      subject: `New Contact Form Submission from ${sanitizedName}`,
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
