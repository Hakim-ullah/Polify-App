import Poll from "../models/Poll.js";
import User from "../models/User.js";
import { shapePoll } from "../utils/pollShape.js";
import { withCounts } from "../utils/counts.js";

export const castVote = async (req, res) => {
  try {
    const { value } = req.body;
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ message: "Poll not found" });
    if (poll.closed) return res.status(400).json({ message: "Poll is closed" });

    // Remove existing vote if any
    poll.votes = poll.votes.filter((v) => String(v.user) !== String(req.userId));

    // Push new vote
    poll.votes.push({ user: req.userId, value });
    await poll.save();

    await poll.populate("creator", "name username avatar");
    const u = await User.findById(req.userId).select("bookmarks");
    const set = new Set((u?.bookmarks || []).map(String));

    const [shaped] = await withCounts([shapePoll(poll, req.userId, set)]);
    res.json(shaped);
  } catch (err) {
    res.status(500).json({ message: "Service temporarily unavailable" });
  }
};

export const unvote = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ message: "Poll not found" });
    if (poll.closed) return res.status(400).json({ message: "Poll is closed" });

    poll.votes = poll.votes.filter((v) => String(v.user) !== String(req.userId));
    await poll.save();

    await poll.populate("creator", "name username avatar");
    const u = await User.findById(req.userId).select("bookmarks");
    const set = new Set((u?.bookmarks || []).map(String));

    const [shaped] = await withCounts([shapePoll(poll, req.userId, set)]);
    res.json(shaped);
  } catch (err) {
    res.status(500).json({ message: "Service temporarily unavailable" });
  }
};

export const updatePoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ message: "Poll not found" });
    if (String(poll.creator) !== String(req.userId)) {
      return res.status(403).json({ message: "Not your poll" });
    }
    const { question, category } = req.body;
    if (question !== undefined && question.trim()) poll.question = question.trim();
    if (category !== undefined) poll.category = category;
    await poll.save();
    res.json({ message: "Poll updated" });
  } catch (err) {
    res.status(500).json({ message: "Service temporarily unavailable" });
  }
};

export const toggleBookmark = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const id = req.params.id;
    const has = user.bookmarks.some((b) => String(b) === String(id));
    user.bookmarks = has
      ? user.bookmarks.filter((b) => String(b) !== String(id))
      : [...user.bookmarks, id];
    await user.save();
    res.json({ bookmarked: !has });
  } catch (err) {
    res.status(500).json({ message: "Service temporarily unavailable" });
  }
};

export const addComment = async (req, res) => {
  try {
    const { text, parent } = req.body;
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ message: "Poll not found" });

    poll.comments.push({
      user: req.userId,
      text: text.trim(),
      parent: parent || null,
    });
    await poll.save();
    res.status(201).json({ message: "Comment added" });
  } catch (err) {
    res.status(500).json({ message: "Service temporarily unavailable" });
  }
};

export const getComments = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id).populate("comments.user", "name username avatar");
    if (!poll) return res.status(404).json({ message: "Poll not found" });
    res.json(poll.comments || []);
  } catch (err) {
    res.status(500).json({ message: "Service temporarily unavailable" });
  }
};