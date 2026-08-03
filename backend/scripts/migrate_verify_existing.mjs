// One-time migration: existing accounts (created before the email-OTP
// registration system) were never marked verified. Backfill them so they
// can log in directly. Only brand-new signups require OTP verification.
// Re-runnable / safe to run again (idempotent).
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import User from "../models/User.js";

dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), "..", ".env"), quiet: true });

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 8000 });

  const res = await User.updateMany(
    {},
    { $set: { isVerified: true }, $unset: { registerOtp: "", registerOtpExpire: "" } }
  );

  console.log(`Verified ${res.modifiedCount} existing account(s).`);
  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error("Migration failed:", err.message);
  process.exit(1);
});
