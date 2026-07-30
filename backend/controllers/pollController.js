import Poll from "../models/Poll.js";
import User from "../models/User.js";
import { shapePoll } from "../utils/pollShape.js";
import { withCounts } from "../utils/counts.js";

const POP = ["creator", "name username avatar"];

const getBookmarkSet = async (userId) => {
  if (!userId) return new Set();
  const u = await User.findById(userId).select("bookmarks");
  return new Set((u?.bookmarks || []).map(String));
};

export const createPoll = async (req, res) => {
  try {
    const { question, type, category } = req.body;
    if (!question || !type) {
      return res.status(400).json({ message: "Question and poll type are required" });
    }

    let options = [];
    if (type === "yesno") {
      options = [{ text: "Yes" }, { text: "No" }];
    } else if (type === "single") {
      const parsed = typeof req.body.options === "string" ? JSON.parse(req.body.options || "[]") : req.body.options || [];
      options = parsed
        .filter((t) => typeof t === "string" && t.trim())
        .map((t) => ({ text: t.trim() }));
      if (options.length < 2) {
        return res.status(400).json({ message: "Add at least 2 options" });
      }
    } else if (type === "image") {
      // Dummy images if none uploaded
      options = [
        { image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=500", text: "Option A" },
        { image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500", text: "Option B" },
      ];
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