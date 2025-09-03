import nodemailer from 'nodemailer';

interface EmailOptions {
  email: string;
  subject: string;
  message: string;
  html?: string;
}

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env['SMTP_HOST'],
    port: parseInt(process.env['SMTP_PORT'] || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env['SMTP_USER'],
      pass: process.env['SMTP_PASS'],
    },
  });

  // Define email options
  const mailOptions = {
    from: `${process.env['SMTP_FROM_NAME'] || 'Health Day'} <${process.env['SMTP_USER']}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  // Send email
  await transporter.sendMail(mailOptions);
};

// Email templates
export const emailTemplates = {
  welcome: (name: string, verificationUrl: string) => ({
    subject: 'Welcome to Health Day - Verify Your Email',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Welcome to Health Day!</h2>
        <p>Hello ${name},</p>
        <p>Thank you for registering with Health Day. To complete your registration, please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email</a>
        </div>
        <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
        <p>This link will expire in 24 hours.</p>
        <p>Best regards,<br>The Health Day Team</p>
      </div>
    `,
  }),

  passwordReset: (name: string, resetUrl: string) => ({
    subject: 'Password Reset Request - Health Day',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">Password Reset Request</h2>
        <p>Hello ${name},</p>
        <p>You requested a password reset for your Health Day account. Click the button below to reset your password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
        </div>
        <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #666;">${resetUrl}</p>
        <p>This link will expire in 10 minutes.</p>
        <p>If you didn't request this password reset, please ignore this email.</p>
        <p>Best regards,<br>The Health Day Team</p>
      </div>
    `,
  }),

  eventRegistration: (name: string, eventTitle: string, eventDate: string) => ({
    subject: 'Event Registration Confirmation - Health Day',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #059669;">Registration Confirmed!</h2>
        <p>Hello ${name},</p>
        <p>Your registration for the following event has been confirmed:</p>
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0; color: #1f2937;">${eventTitle}</h3>
          <p style="margin: 0; color: #6b7280;">Date: ${eventDate}</p>
        </div>
        <p>We look forward to seeing you at the event!</p>
        <p>Best regards,<br>The Health Day Team</p>
      </div>
    `,
  }),

  eventReminder: (name: string, eventTitle: string, eventDate: string, eventTime: string, location: string) => ({
    subject: 'Event Reminder - Health Day',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #d97706;">Event Reminder</h2>
        <p>Hello ${name},</p>
        <p>This is a friendly reminder about your upcoming event:</p>
        <div style="background-color: #fef3c7; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0; color: #92400e;">${eventTitle}</h3>
          <p style="margin: 5px 0; color: #92400e;"><strong>Date:</strong> ${eventDate}</p>
          <p style="margin: 5px 0; color: #92400e;"><strong>Time:</strong> ${eventTime}</p>
          <p style="margin: 5px 0; color: #92400e;"><strong>Location:</strong> ${location}</p>
        </div>
        <p>We look forward to seeing you there!</p>
        <p>Best regards,<br>The Health Day Team</p>
      </div>
    `,
  }),
}; 