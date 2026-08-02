// pollController.js — CRUD for polls + image upload
import { createReadStream, unlinkSync } from "fs";
import Poll from "../models/Poll.js";
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";
import { shapePoll } from "../utils/pollShape.js";
import { withCounts } from "../utils/counts.js";

const POP = ["creator", "name username avatar"];

const getBookmarkSet = async (userId) => {
  if (!userId) return new Set();
  const u = await User.findById(userId).select("bookmarks");
  return new Set((u?.bookmarks || []).map(String));
};

const uploadToCloudinary = (filePath) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "pollify/images",
        use_filename: true,
        unique_filename: true,
        resource_type: "image",
      },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
    const fileStream = createReadStream(filePath);
    fileStream.pipe(stream);
    fileStream.on("error", (err) => {
      stream.destroy(err);
      reject(err);
    });
  });

// Upload poll images to Cloudinary, return permanent URLs
export const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }
    const uploadPromises = req.files.map(async (f) => {
      const filePath = f.path.replace(/\\/g, "/");
      const result = await uploadToCloudinary(filePath);
      try { unlinkSync(filePath); } catch { /* ignore cleanup errors */ }
      return result.secure_url;
    });
    const urls = await Promise.all(uploadPromises);
    res.json({ urls });
  } catch (err) {
    console.error("Cloudinary upload error:", err.message);
    console.error("Cloudinary config:", {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? "set" : "MISSING",
      api_key: process.env.CLOUDINARY_API_KEY ? "set" : "MISSING",
      api_secret: process.env.CLOUDINARY_API_SECRET ? "set" : "MISSING",
    });
    console.error("Cloudinary full error:", err);
    res.status(500).json({ message: "Image upload failed", error: err.message });
  }
};

// Create a new poll (yesno / single / image / open / rating)
export const createPoll = async (req, res) => {
  try {
    const { question, type, category, imageUrls } = req.body;
    if (!question || !type) {
      return res.status(400).json({ message: "Question and poll type are required" });
    }

    let options = [];
    if (type === "yesno") {
      options = [{ text: "Yes" }, { text: "No" }];
    } else if (type === "single") {
      const parsed =
        typeof req.body.options === "string"
          ? JSON.parse(req.body.options || "[]")
          : req.body.options || [];
      options = parsed
        .filter((t) => typeof t === "string" && t.trim())
        .map((t) => ({ text: t.trim() }));
      if (options.length < 2) {
        return res.status(400).json({ message: "Add at least 2 options" });
      }
    } else if (type === "image") {
      if (!imageUrls || imageUrls.length < 2) {
        return res.status(400).json({ message: "Please upload at least 2 images" });
      }
      options = imageUrls.map((url, i) => ({
        image: url,
        text: `Option ${String.fromCharCode(65 + i)}`,
      }));
    }

    const poll = await Poll.create({
      creator: req.userId,
      question: question.trim(),
      type,
      category: category || "General",
      options,
    });

    await poll.populate(...POP);
    const set = await getBookmarkSet(req.userId);
    const [shaped] = await withCounts([shapePoll(poll, req.userId, set)]);
    res.status(201).json(shaped);
  } catch (err) {
    res.status(500).json({ message: "Service temporarily unavailable" });
  }
};

export const getPolls = async (req, res) => {
  try {
    const filter = {};
    if (req.query.type && req.query.type !== "all") filter.type = req.query.type;
    if (req.query.category && req.query.category !== "All") filter.category = req.query.category;
    if (req.query.search) {
      filter.question = { $regex: req.query.search, $options: "i" };
    }

    if (req.query.feed === "my-polls") {
      filter.creator = req.userId;
    } else if (req.query.feed === "voted") {
      filter["votes.user"] = req.userId;
    } else if (req.query.feed === "bookmarked") {
      const u = await User.findById(req.userId).select("bookmarks");
      filter._id = { $in: u?.bookmarks || [] };
    }

    const polls = await Poll.find(filter).populate(...POP).sort("-createdAt");
    const set = await getBookmarkSet(req.userId);
    const shaped = await withCounts(polls.map((p) => shapePoll(p, req.userId, set)));
    res.json(shaped);
  } catch (err) {
    res.status(500).json({ message: "Service temporarily unavailable" });
  }
};

export const getPoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id).populate(...POP);
    if (!poll) return res.status(404).json({ message: "Poll not found" });

    const creatorId = poll.creator?._id || poll.creator;
    const isCreator = String(creatorId) === String(req.userId);
    const skipView = req.query.noview === "true";

    if (!isCreator && !skipView) {
      poll.views = (poll.views || 0) + 1;
      await poll.save();
    }

    const set = await getBookmarkSet(req.userId);
    const [shaped] = await withCounts([shapePoll(poll, req.userId, set)]);
    res.json(shaped);
  } catch (err) {
    res.status(500).json({ message: "Service temporarily unavailable" });
  }
};

export const getTrendingPolls = async (req, res) => {
  try {
    const polls = await Poll.aggregate([
      { $group: { _id: "$type", count: { $sum: 1 } } },
    ]);
    const items = polls.map((p) => ({ type: p._id, count: p.count }));
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Service temporarily unavailable" });
  }
};

export const deletePoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ message: "Poll not found" });
    if (String(poll.creator) !== String(req.userId)) {
      return res.status(403).json({ message: "Not authorized to delete this poll" });
    }
    await poll.deleteOne();
    res.json({ message: "Poll deleted" });
  } catch (err) {
    res.status(500).json({ message: "Service temporarily unavailable" });
  }
};

export const toggleClosePoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ message: "Poll not found" });
    if (String(poll.creator) !== String(req.userId)) {
      return res.status(403).json({ message: "Not authorized" });
    }
    poll.closed = !poll.closed;
    await poll.save();
    res.json({ closed: poll.closed });
  } catch (err) {
    res.status(500).json({ message: "Service temporarily unavailable" });
  }
};