import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "polling_jwt_secret_key_2026";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase().trim() }, { username: username.trim() }],
    });
    if (existingUser) {
      if (String(existingUser.email) === email.toLowerCase().trim()) {
        return res.status(400).json({ message: "This email already exists. Please login" });
      }
      if (existingUser.username === username.trim()) {
        return res.status(400).json({ message: "Username already taken" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name.trim(),
      username: username.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      isVerified: true,
    });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ token, user: clean(user) });
  } catch (err) {
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern || {})[0] || "email or username";
      return res.status(400).json({ message: `${field} is already taken` });
    }
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

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: clean(user) });
  } catch (err) {
    res.status(500).json({ message: "Service temporarily unavailable" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user: clean(user) });
  } catch (err) {
    res.status(500).json({ message: "Service temporarily unavailable" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, username, bio } = req.body;
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (req.file) {
      user.avatar = `/uploads/${req.file.filename}`;
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
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern || {})[0] || "username";
      return res.status(400).json({ message: `${field} is already taken` });
    }
    res.status(500).json({ message: "Service temporarily unavailable" });
  }
};