import bcrypt from "bcryptjs";
import User from "../models/User.js";
import sendOtpEmail from "../config/mailer.js";

const generateOtp = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let otp = "";
  for (let i = 0; i < 6; i++) {
    otp += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return otp;
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

    const sent = await sendOtpEmail({
      to: user.email,
      otp,
      subject: "Pollify — Password Reset Verification Code",
      intro: "Use this code to reset your password:",
    });
    if (!sent) {
      console.warn("Password reset email failed - check SMTP credentials and Gmail settings");
      return res.status(500).json({
        message: "We could not send the reset code to your email. Please try again in a few minutes.",
      });
    }

    res.json({ message: "Reset code sent to your email" });
  } catch (err) {
    console.error("Forgot password error:", err);
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
    console.error("Verify reset OTP error:", err);
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
    console.error("Reset password error:", err);
    res.status(500).json({ message: "Service temporarily unavailable" });
  }
};