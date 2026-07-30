import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import User from "../models/User.js";

const generateOtp = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let otp = "";
  for (let i = 0; i < 6; i++) {
    otp += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return otp;
};

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendResetEmail = async (to, otp) => {
  const from = process.env.EMAIL_FROM || "polify@official";
  try {
    await transporter.sendMail({
      from,
      to,
      subject: "Pollify — Password Reset Verification Code",
      html: `<div style="font-family:Inter,Arial,sans-serif;max-width:440px;margin:auto;padding:24px;border:1px solid #e2e8f0;border-radius:16px">
        <h2 style="color:#4f46e5;margin:0 0 8px">Pollify</h2>
        <p style="color:#475569">Use this code to reset your password:</p>
        <div style="font-size:34px;font-weight:800;letter-spacing:8px;color:#0f172a;margin:16px 0">${otp}</div>
        <p style="color:#94a3b8;font-size:13px">This code expires in 15 minutes. If you didn't request it, ignore this email.</p>
      </div>`,
    });
    return true;
  } catch (emailErr) {
    console.warn(`Email send failed from ${from}:`, emailErr.message);
    return false;
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase().trim() });
    if (!user) return res.status(404).json({ message: "User not found with this email" });

    const otp = generateOtp();
    user.resetOtp = otp;
    user.resetOtpExpire = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    let sent = await sendResetEmail(user.email, otp);
    if (!sent) {
      sent = await sendResetEmail(user.email, otp);
    }

    res.json({ message: sent ? "Reset code sent to your email" : "Reset code sent (check your email)" });
  } catch (err) {
    res.status(500).json({ message: "Service temporarily unavailable" });
  }
};

export const verifyResetOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase().trim() });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!/^[A-Za-z0-9]{6}$/.test(otp)) {
      return res.status(400).json({ message: "Verification code must be exactly 6 characters" });
    }
    if (!user.resetOtp) {
      return res.status(400).json({ message: "No verification code found. Please request a new one." });
    }
    if (user.resetOtp !== otp) {
      return res.status(400).json({ message: "Invalid verification code" });
    }
    if (user.resetOtpExpire < new Date()) {
      return res.status(400).json({ message: "Verification code has expired. Please request a new one." });
    }

    res.json({ ok: true, message: "Verification code verified successfully" });
  } catch (err) {
    res.status(500).json({ message: "Service temporarily unavailable" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase().trim() });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!/^[A-Za-z0-9]{6}$/.test(otp)) {
      return res.status(400).json({ message: "Verification code must be exactly 6 characters" });
    }
    if (!user.resetOtp) {
      return res.status(400).json({ message: "No verification code found. Please request a new one." });
    }
    if (user.resetOtp !== otp) {
      return res.status(400).json({ message: "Invalid verification code" });
    }
    if (user.resetOtpExpire < new Date()) {
      return res.status(400).json({ message: "Verification code has expired. Please request a new one." });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOtp = null;
    user.resetOtpExpire = null;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Service temporarily unavailable" });
  }
};