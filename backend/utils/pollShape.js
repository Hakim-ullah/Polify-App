export const shapePoll = (poll, userId, bookmarkSet = new Set()) => {
  const votes = poll.votes || [];
  const total = votes.length;
  const mine = userId
    ? votes.find((v) => String(v.user) === String(userId))
    : null;

  const pct = (count) => (total ? Math.round((count / total) * 100) : 0);
  let results = [];

  if (poll.type === "rating") {
    results = [1, 2, 3, 4, 5].map((star) => {
      const count = votes.filter((v) => Number(v.value) === star).length;
      return { label: `${star} Star`, star, count, percent: pct(count) };
    });
  } else if (poll.type === "open") {
    results = votes.map((v) => ({ text: String(v.value), user: v.user }));
  } else {
    results = (poll.options || []).map((opt, i) => {
      const count = votes.filter((v) => Number(v.value) === i).length;
      return { text: opt.text, image: opt.image, index: i, count, percent: pct(count) };
    });
  }

  return {
    _id: poll._id,
    question: poll.question,
    type: poll.type,
    category: poll.category,
    closed: poll.closed,
    createdAt: poll.createdAt,
    creator: poll.creator,
    options: poll.options,
    views: poll.views || 0,
    totalVotes: total,
    results,
    myVote: mine ? mine.value : null,
    isBookmarked: bookmarkSet.has(String(poll._id)),
  };
};
