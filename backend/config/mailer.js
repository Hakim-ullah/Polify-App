import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Ensure .env is loaded before reading env vars — ES module imports are
// hoisted so this file may execute before dotenv.config() in server.js.
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587", 10),
  secure: false,
  requireTLS: true,
  connectionTimeout: 8000,
  greetingTimeout: 8000,
  socketTimeout: 8000,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendOtpEmail = async ({ to, otp, subject, intro }) => {
  const from = process.env.EMAIL_FROM || "pollify@official";
  try {
    await transporter.sendMail({
      from,
      to,
      subject,
      html: `<div style="font-family:Inter,Arial,sans-serif;max-width:440px;margin:auto;padding:24px;border:1px solid #e2e8f0;border-radius:16px">
        <h2 style="color:#4f46e5;margin:0 0 8px">Pollify</h2>
        <p style="color:#475569">${intro}</p>
        <div style="font-size:34px;font-weight:800;letter-spacing:8px;color:#0f172a;margin:16px 0">${otp}</div>
        <p style="color:#94a3b8;font-size:13px">This code expires in 15 minutes. If you didn't request it, ignore this email.</p>
      </div>`,
    });
    return true;
  } catch (err) {
    console.warn(`Email send failed from ${from}:`, err.message);
    return false;
  }
};

export default sendOtpEmail;
