import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const t = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  connectionTimeout: 10000,
});

const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
const resetLink = `${frontendUrl}/reset-password?token=test123`;

t.sendMail({
  from: process.env.EMAIL_FROM || 'Store Rating System <snehakoshta1@gmail.com>',
  to: 'snehakoshta1@gmail.com',
  subject: 'Password Reset Request - Store Rating System',
  html: `
    <div style="font-family: Arial; max-width: 480px; margin: 0 auto;">
      <h2>Password Reset</h2>
      <p>Click the link to reset:</p>
      <a href="${resetLink}" style="display:inline-block;padding:12px 24px;background:#6366f1;color:#fff;border-radius:6px">Reset Password</a>
      <p style="color:#888;font-size:13px;">Expires in 1 hour.</p>
    </div>`,
})
  .then(info => process.stdout.write('OK: ' + info.messageId + '\n'))
  .catch(e => process.stdout.write('FAIL: ' + e.message + '\n'))
  .finally(() => process.exit(0));
