// Real end-to-end test: uploads an actual image buffer to /api/upload
// exactly the same way the frontend does it
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
// Node 18+ has fetch and FormData built-in

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

// 1. Login to get a JWT token
console.log("1️⃣  Logging in...");
let token;
try {
  const loginRes = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "hakimkhande@gmail.com", password: "test123" }),
  });
  const loginData = await loginRes.json();
  token = loginData.token;
  if (!token) {
    console.log("   ⚠️  Login failed:", loginData.message);
    console.log("   Skipping auth — testing upload with no token (will get 401)");
  } else {
    console.log("   ✅ Logged in, token:", token.slice(0, 20) + "...");
  }
} catch (e) {
  console.log("   ⚠️  Login request failed:", e.message);
}

// 2. Create a minimal 1x1 red PNG in memory (no file needed)
// Minimal valid 1×1 red PNG (67 bytes)
const PNG_HEX =
  "89504e470d0a1a0a" +           // PNG signature
  "0000000d49484452" +           // IHDR chunk length=13
  "00000001" +                   // width=1
  "00000001" +                   // height=1
  "08020000000190a793" +         // bit depth=8, colortype=2 (RGB), crc
  "00000000c49494441" +          // IDAT
  "5478016360f8cf" +
  "c000000002" +
  "0001" +
  "6f017760" +
  "00000000" +
  "49454e44ae426082"; // IEND
const PNG_1x1_RED = Buffer.from(
  "89504e470d0a1a0a0000000d494844520000000100000001080200000090" +
  "77533de000000000c4944415478016360f8cfc000000002000016f017760" +
  "0000000049454e44ae426082",
  "hex"
);

console.log("\n2️⃣  Uploading test image to /api/upload...");
const blob = new Blob([PNG_1x1_RED], { type: "image/png" });
const form = new FormData();
form.append("images", blob, "test.png");

const headers = {};
if (token) headers["Authorization"] = `Bearer ${token}`;

try {
  const uploadRes = await fetch("http://localhost:5000/api/upload", {
    method: "POST",
    headers,
    body: form,
  });
  const uploadData = await uploadRes.json();
  console.log("   Status:", uploadRes.status);
  if (uploadRes.ok) {
    console.log("   ✅ Upload SUCCESS! Cloudinary URLs:", uploadData.urls);
  } else {
    console.log("   ❌ Upload FAILED:", uploadData);
  }
} catch (e) {
  console.log("   ❌ Upload request error:", e.message);
}
