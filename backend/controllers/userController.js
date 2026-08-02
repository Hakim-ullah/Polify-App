import User from "../models/User.js";
import Poll from "../models/Poll.js";
import { shapePoll } from "../utils/pollShape.js";
import { withCounts } from "../utils/counts.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const [polls, voted, followers, me] = await Promise.all([
      Poll.find({ creator: user._id })
        .populate("creator", "name username avatar")
        .sort("-createdAt"),
      Poll.countDocuments({ "votes.user": user._id }),
      User.countDocuments({ following: user._id }),
      User.findById(req.userId).select("bookmarks following"),
    ]);

    const set = new Set((me?.bookmarks || []).map(String));
    const isFollowing = (me?.following || []).some(
      (id) => String(id) === String(user._id)
    );

    const isFollowedBy = req.userId
      ? (user.followers || []).some((id) => String(id) === String(req.userId))
      : false;

    const shaped = await withCounts(
      polls.map((p) => shapePoll(p, req.userId, set))
    );

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        avatar: user.avatar,
        bio: user.bio,
      },
      isFollowing,
      isFollowedBy,
      isMe: String(user._id) === String(req.userId),
      stats: {
        created: polls.length,
        voted,
        followers,
        following: user.following?.length || 0,
      },
      polls: shaped,
    });
  } catch (err) {
    res.status(500).json({ message: "Service temporarily unavailable" });
  }
};

export const toggleFollowUser = async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    if (!targetUser) return res.status(404).json({ message: "User not found" });
    if (String(targetUser._id) === String(req.userId)) {
      return res.status(400).json({ message: "Cannot follow yourself" });
    }

    const me = await User.findById(req.userId);
    const has = (me.following || []).some((id) => String(id) === String(targetUser._id));

    if (has) {
      me.following = me.following.filter((id) => String(id) !== String(targetUser._id));
      targetUser.followers = targetUser.followers.filter((id) => String(id) !== String(me._id));
    } else {
      me.following.push(targetUser._id);
      targetUser.followers.push(me._id);
    }

    await Promise.all([me.save(), targetUser.save()]);

    const isFollowedBy = (targetUser.followers || []).some(
      (id) => String(id) === String(req.userId)
    );

    res.json({ isFollowing: !has, isFollowedBy });
  } catch (err) {
    res.status(500).json({ message: "Service temporarily unavailable" });
  }
};