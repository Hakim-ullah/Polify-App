import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "F:/Polify/backend/.env", quiet: true });

await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 8000 });
const users = await mongoose.connection.db.collection("users").find({}).toArray();
console.log("total users:", users.length);
for (const x of users) {
  console.log(JSON.stringify({
    email: x.email,
    isVerified: x.isVerified,
    hasPwd: !!x.password,
    registerOtp: !!x.registerOtp,
    registerOtpExpire: x.registerOtpExpire,
  }));
}
await mongoose.disconnect();
process.exit(0);
