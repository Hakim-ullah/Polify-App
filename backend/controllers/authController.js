import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";
import sendOtpEmail from "../config/mailer.js";

const JWT_SECRET = process.env.JWT_SECRET || "polling_jwt_secret_key_2026";
const OTP_TTL_MS = 15 * 60 * 1000;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const generateOtp = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let otp = "";
  for (let i = 0; i < 6; i++) {
    otp += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return otp;
};

const clean = (user) => ({
  _id: user._id,
  name: user.name,
  username: user.username,
  email: user.email,
  bio: user.bio,
  avatar: user.avatar,
  isVerified: user.isVerified,
});

const validateEmail = (email) => {
  if (!EMAIL_REGEX.test(email)) {
    return "Please enter a valid email address";
  }
  return null;
};

// Upload buffer to Cloudinary and return the secure URL
const uploadAvatarBuffer = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "pollify/avatars", resource_type: "image", unique_filename: true },
      (err, result) => {
        if (err) return reject(err);
        resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });

export const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const emailError = validateEmail(email);
    if (emailError) {
      return res.status(400).json({ message: emailError });
    }

    const emailLower = email.toLowerCase().trim();
    const usernameTrim = username.trim();

    // A fully verified account owns the email — reject duplicates.
    const existingByEmail = await User.findOne({ email: emailLower });
    if (existingByEmail && existingByEmail.isVerified) {
      return res.status(400).json({ message: "This email already exists. Please login" });
    }

    // Username must not belong to a different account.
    const existingByUsername = await User.findOne({ username: usernameTrim });
    if (
      existingByUsername &&
      (!existingByEmail || String(existingByUsername._id) !== String(existingByEmail._id))
    ) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const otp = generateOtp();
    const hashedPassword = await bcrypt.hash(password, 10);

    // If an account exists with this email but never finished verification,
    // let the user re-register: overwrite details and send a fresh code.
    let user;
    if (existingByEmail && !existingByEmail.isVerified) {
      existingByEmail.name = name.trim();
      existingByEmail.username = usernameTrim;
      existingByEmail.password = hashedPassword;
      existingByEmail.isVerified = false;
      existingByEmail.registerOtp = otp;
      existingByEmail.registerOtpExpire = new Date(Date.now() + OTP_TTL_MS);
      await existingByEmail.save();
      user = existingByEmail;
    } else {
      user = await User.create({
        name: name.trim(),
        username: usernameTrim,
        email: emailLower,
        password: hashedPassword,
        isVerified: false,
        registerOtp: otp,
        registerOtpExpire: new Date(Date.now() + OTP_TTL_MS),
      });
    }

    const sent = await sendOtpEmail({
      to: user.email,
      otp,
      subject: "Pollify — Verify Your Email",
      intro: "Welcome to Pollify! Use this verification code to confirm your account:",
    });

    const isDev = process.env.NODE_ENV !== "production";
    res.status(201).json({
      message: sent
        ? "Verification code sent to your email"
        : isDev
          ? "Email could not be sent. Use the code below to continue:"
          : "Email could not be sent. Please try again.",
      emailSent: sent,
      ...(sent || !isDev ? {} : { devOtp: otp }),
    });
  } catch (err) {
    console.error("Register error:", err);
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern || {})[0] || "email or username";
      return res.status(400).json({ message: `${field} is already taken` });
    }
    res.status(500).json({ message: "Service temporarily unavailable" });
  }
};

export const verifyRegister = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase().trim() });
    if (!user) return res.status(404).json({ message: "Account not found. Please register again." });

    if (user.isVerified) {
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });
      return res.json({ token, user: clean(user) });
    }

    if (!/^[A-Za-z0-9]{6}$/.test(otp)) {
      return res.status(400).json({ message: "Verification code must be exactly 6 characters" });
    }
    if (!user.registerOtp) {
      return res.status(400).json({ message: "No verification code found. Please resend the code." });
    }
    if (user.registerOtp !== otp) {
      return res.status(400).json({ message: "Invalid verification code" });
    }
    if (user.registerOtpExpire < new Date()) {
      return res.status(400).json({ message: "Verification code has expired. Please resend the code." });
    }

    user.isVerified = true;
    user.registerOtp = null;
    user.registerOtpExpire = null;
    await user.save();

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: clean(user) });
  } catch (err) {
    console.error("Verify register error:", err);
    res.status(500).json({ message: "Service temporarily unavailable" });
  }
};

export const resendRegisterOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase().trim() });
    if (!user) return res.status(404).json({ message: "Account not found. Please register again." });
    if (user.isVerified) return res.json({ message: "Email already verified. You can log in." });

    const otp = generateOtp();
    user.registerOtp = otp;
    user.registerOtpExpire = new Date(Date.now() + OTP_TTL_MS);
    await user.save();

    const sent = await sendOtpEmail({
      to: user.email,
      otp,
      subject: "Pollify — Verify Your Email",
      intro: "Here is your new Pollify verification code:",
    });

    const isDev = process.env.NODE_ENV !== "production";
    res.json({
      message: sent
        ? "Verification code sent to your email"
        : isDev
          ? "Email could not be sent. Use the code below to continue:"
          : "Email could not be sent. Please try again.",
      emailSent: sent,
      ...(sent || !isDev ? {} : { devOtp: otp }),
    });
  } catch (err) {
    console.error("Resend register OTP error:", err);
    res.status(500).json({ message: "Service temporarily unavailable" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const emailError = validateEmail(email);
    if (emailError) {
      return res.status(400).json({ message: emailError });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email before logging in. Check your inbox for the verification code.",
        needsVerification: true,
      });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: clean(user) });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Service temporarily unavailable" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user: clean(user) });
  } catch (err) {
    console.error("GetMe error:", err);
    res.status(500).json({ message: "Service temporarily unavailable" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, username, bio } = req.body;
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (req.file) {
      // Upload avatar buffer to Cloudinary and store permanent URL
      user.avatar = await uploadAvatarBuffer(req.file.buffer);
    }
    if (username && username.trim() !== user.username) {
      const taken = await User.findOne({ username: username.trim() });
      if (taken) return res.status(400).json({ message: "Username already taken" });
      user.username = username.trim();
    }
    if (name) user.name = name.trim();
    if (bio !== undefined) user.bio = bio;

    await user.save();
    res.json({ user: clean(user) });
  } catch (err) {
    console.error("Update profile error:", err);
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern || {})[0] || "username";
      return res.status(400).json({ message: `${field} is already taken` });
    }
    res.status(500).json({ message: "Service temporarily unavailable" });
  }
};