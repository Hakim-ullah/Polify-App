import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

import * as authController from "./controllers/authController.js";
import * as passwordController from "./controllers/passwordController.js";
import * as pollController from "./controllers/pollController.js";
import * as userController from "./controllers/userController.js";
import * as voteController from "./controllers/voteController.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "polling_jwt_secret_key_2026";
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/polling_db";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const serveUploads = express.static(path.join(__dirname, "uploads"));
app.use("/uploads", serveUploads);

app.use(cors());
app.use(express.json());

// Auth Middleware
const authGuard = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized - Token missing" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.userId = decoded.userId;
    } catch (e) {
      // Ignore invalid token for optional auth
    }
  }
  next();
};

// Routes
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

// Users & Profile
app.get("/api/users/:username", optionalAuth, userController.getUserProfile);
app.post("/api/users/:id/follow", authGuard, userController.toggleFollowUser);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date() });
});

// Connect DB & Launch
const start = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB successfully.");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    console.error("Exiting - backend cannot serve requests without database.");
    process.exit(1);
  }
  app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
  });
};

start();
