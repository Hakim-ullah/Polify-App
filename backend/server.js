// server.js — Express backend for Pollify
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import * as authController from "./controllers/authController.js";
import * as passwordController from "./controllers/passwordController.js";
import * as pollController from "./controllers/pollController.js";
import * as userController from "./controllers/userController.js";
import * as voteController from "./controllers/voteController.js";

dotenv.config();

const { default: cloudinary } = await import("./config/cloudinary.js");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "polling_jwt_secret_key_2026";
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/polling_db";

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `poll-${unique}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

app.use("/uploads", express.static(uploadsDir));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

// --- Auth middleware ---
const authGuard = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized - Token missing" });
  }
  try {
    req.userId = jwt.verify(authHeader.split(" ")[1], JWT_SECRET).userId;
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    try { req.userId = jwt.verify(authHeader.split(" ")[1], JWT_SECRET).userId; } catch { /* ignore */ }
  }
  next();
};

// --- Routes ---
// Auth
app.post("/api/auth/register", authController.register);
app.post("/api/auth/login", authController.login);
app.get("/api/auth/me", authGuard, authController.getMe);
app.put("/api/auth/profile", authGuard, upload.single("avatar"), authController.updateProfile);

// Password Reset
app.post("/api/auth/forgot-password", passwordController.forgotPassword);
app.post("/api/auth/verify-otp", passwordController.verifyResetOtp);
app.post("/api/auth/reset-password", passwordController.resetPassword);

// Polls
app.post("/api/polls", authGuard, pollController.createPoll);
app.post("/api/upload", authGuard, upload.array("images", 4), pollController.uploadImages);
app.get("/api/polls", optionalAuth, pollController.getPolls);
app.get("/api/polls/trending", pollController.getTrendingPolls);
app.get("/api/polls/:id", optionalAuth, pollController.getPoll);
app.delete("/api/polls/:id", authGuard, pollController.deletePoll);
app.patch("/api/polls/:id/close", authGuard, pollController.toggleClosePoll);
app.put("/api/polls/:id", authGuard, voteController.updatePoll);

// Votes & Interactions
app.post("/api/polls/:id/vote", authGuard, voteController.castVote);
app.post("/api/polls/:id/unvote", authGuard, voteController.unvote);
app.post("/api/polls/:id/bookmark", authGuard, voteController.toggleBookmark);
app.post("/api/polls/:id/comments", authGuard, voteController.addComment);
app.get("/api/polls/:id/comments", voteController.getComments);
app.delete("/api/polls/:id/comments/:commentId", authGuard, voteController.deleteComment);

// Users & Profile
app.get("/api/users/:username", optionalAuth, userController.getUserProfile);
app.post("/api/users/:id/follow", authGuard, userController.toggleFollowUser);

// Health
app.get("/api/health", (req, res) => res.json({ status: "OK", timestamp: new Date() }));

// Test Cloudinary connection
app.get("/api/test-cloudinary", async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/240px-PNG_transparency_demonstration_1.png",
      { folder: "pollify/test", resource_type: "image" }
    );
    res.json({ ok: true, url: result.secure_url });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// SPA fallback
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
});

// --- Start ---
const start = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
      socketTimeoutMS: 5000,
    });
    console.log("Connected to MongoDB successfully.");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    console.error("Exiting - backend cannot serve requests without database.");
    process.exit(1);
  }
  app.listen(PORT, () => console.log(`Backend server running on http://localhost:${PORT}`));
};

start();
