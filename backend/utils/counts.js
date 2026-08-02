import Poll from "../models/Poll.js";
import User from "../models/User.js";

export const withCounts = async (shapedPolls = []) => {
  if (!shapedPolls.length) return [];

  const pollIds = shapedPolls.map((p) => p._id);
  const polls = await Poll.find({ _id: { $in: pollIds } }).select("comments");
  const saveCounts = await User.aggregate([
    { $match: { bookmarks: { $in: pollIds } } },
    { $unwind: "$bookmarks" },
    { $match: { bookmarks: { $in: pollIds } } },
    { $group: { _id: "$bookmarks", n: { $sum: 1 } } },
  ]);

  const commentMap = {};
  const saveMap = {};

  polls.forEach((p) => {
    commentMap[String(p._id)] = p.comments ? p.comments.length : 0;
  });
  saveCounts.forEach((s) => {
    saveMap[String(s._id)] = s.n;
  });

  return shapedPolls.map((p) => ({
    ...p,
    comments: commentMap[String(p._id)] || 0,
    saves: saveMap[String(p._id)] || 0,
  }));
};