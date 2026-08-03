import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

// Ensure .env is loaded before reading env vars — ES module imports are
// hoisted so this file may execute before dotenv.config() in server.js.
dotenv.config();




cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;