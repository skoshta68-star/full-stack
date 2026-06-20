import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

let resendClient: Resend | null = null;

function getClient() {
  if (!resendClient && process.env.RESEND_API_KEY) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

export class EmailService {
  static async sendPasswordResetEmail(to: string, rawToken: string) {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const resetLink = `${frontendUrl}/reset-password?token=${rawToken}`;

    const client = getClient();
    if (!client) {
      throw new Error('Email service not configured. Set RESEND_API_KEY in .env');
    }

    console.log('[EmailService] Sending reset email to:', to);

    const { data, error } = await client.emails.send({
      from: process.env.EMAIL_FROM || 'Store Rating System <noreply@resend.dev>',
      to,
      subject: 'Password Reset Request - Store Rating System',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
          <h2 style="color: #333;">Password Reset</h2>
          <p>You requested a password reset. Click the link below to reset your password:</p>
          <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background: #6366f1; color: #fff; text-decoration: none; border-radius: 6px; margin: 16px 0;">
            Reset Password
          </a>
          <p style="color: #888; font-size: 13px;">This link expires in 1 hour. If you did not request this, ignore this email.</p>
        </div>
      `,
    });

    if (error) {
      console.log('[EmailService] Resend error:', error);
      throw new Error(error.message || 'Failed to send email');
    }

    console.log('[EmailService] Email sent. Id:', data?.id);
  }
}
