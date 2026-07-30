import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase().trim() });
    if (!user) return res.status(404).json({ message: "User not found with this email" });

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOtp = otp;
    user.resetOtpExpire = new Date(Date.now() + 15 * 60 * 1000); // 15 min expiry
    await user.save();

    console.log(`[RESET OTP] Email: ${user.email}, Code: ${otp}`);
    res.json({ message: "Reset code sent to email", demoOtp: otp });
  } catch (err) {
    res.status(500).json({ message: "Service temporarily unavailable" });
  }
};

export const verifyResetOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase().trim() });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!/^\d{6}$/.test(otp)) {
      return res.status(400).json({ message: "OTP must be exactly 6 digits" });
    }
    if (!user.resetOtp) {
      return res.status(400).json({ message: "No OTP found. Please request a new one." });
    }
    if (user.resetOtp !== String(otp)) {
      return res.status(400).json({ message: "Invalid OTP code" });
    }
    if (user.resetOtpExpire < new Date()) {
      return res.status(400).json({ message: "OTP has expired. Please request a new one." });
    }

    res.json({ ok: true, message: "OTP verified successfully" });
  } catch (err) {
    res.status(500).json({ message: "Service temporarily unavailable" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase().trim() });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!/^\d{6}$/.test(otp)) {
      return res.status(400).json({ message: "OTP must be exactly 6 digits" });
    }
    if (!user.resetOtp) {
      return res.status(400).json({ message: "No OTP found. Please request a new one." });
    }
    if (user.resetOtp !== String(otp)) {
      return res.status(400).json({ message: "Invalid OTP code" });
    }
    if (user.resetOtpExpire < new Date()) {
      return res.status(400).json({ message: "OTP has expired. Please request a new one." });
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