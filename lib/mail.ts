// lib/mail.ts
import nodemailer from "nodemailer";

export const sendSecurityAlertEmail = async (email: string, deviceName: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Safe-Entry Security" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Security Alert: New Device Login",
    html: `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
        <h2>New Login Detected</h2>
        <p>Hello, a new login was detected on your account from the following device:</p>
        <p><strong>Device:</strong> ${deviceName}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        <p>If this was you, you can ignore this email. If not, please reset your password immediately.</p>
      </div>
    `,
  });
};

export const sendResetPasswordEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}&email=${email}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Safe-Entry Security" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Password Reset Request",
    html: `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
        <h2>Reset Your Password</h2>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <p><a href="${resetLink}" style="padding: 10px 15px; background: #2563eb; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
        <p>If you didn't request this, please ignore this email. The link will expire in 1 hour.</p>
      </div>
    `,
  });
};