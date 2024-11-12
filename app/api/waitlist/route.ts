import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const { fullName, email, fieldOfStudy } = await request.json();

    // Only send confirmation email to user
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Welcome to Student AI Helper Waitlist',
      html: `
        <h2>Welcome to Student AI Helper!</h2>
        <p>Hi ${fullName},</p>
        <p>Thank you for joining our waitlist. We've noted your field of study as "${fieldOfStudy}".</p>
        <p>We'll keep you updated on our launch and early access opportunities, especially regarding features relevant to ${fieldOfStudy} students.</p>
        <p>Best regards,<br>Student AI Helper Team</p>
      `,
    });

    return NextResponse.json({ message: 'Successfully joined waitlist' }, { status: 200 });
  } catch (error) {
    console.error('Waitlist submission error:', error);
    return NextResponse.json(
      { message: 'Failed to process waitlist submission' },
      { status: 500 }
    );
  }
} 