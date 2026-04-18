import nodemailer from "nodemailer";

export async function sendOTPEmail(email: string, otp: string) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App Password from Google
      },
    });

    const info = await transporter.sendMail({
      from: `"Safe-Entry Security" <${process.env.EMAIL_USER}>`,
      to: email, // Sends to the provided user's email
      subject: "🛡️ Your 2FA Verification Code",
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2>Verify Your Identity</h2>
          <p>Your secure verification code is:</p>
          <h1 style="color: #2563eb; letter-spacing: 5px;">${otp}</h1>
          <p>This code will expire in <b>5 minutes</b>.</p>
          <p style="color: #666; font-size: 12px;">If you didn't request this, please ignore this email.</p>
        </div>
      `,
    });
    console.log("OTP Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw error;
  }
}