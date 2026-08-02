import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PlusSquare, Sparkles, Inbox } from "lucide-react";
import api from "../utils/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import FilterBar from "../assets/helpers component/FilterBar.jsx";
import PollCard from "../assets/helpers component/PollCard.jsx";
import { PollSkeleton, Avatar } from "../assets/helpers component/UIElements.jsx";
import { dashboardStyles as s } from "../assets/dummyStyles.jsx";

export default function DashboardPage({ searchQuery }) {
  const { user } = useAuth();
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const fetchPolls = async () => {
    setLoading(true);
    try {
      const params = {};
      if (typeFilter !== "all") params.type = typeFilter;
      if (categoryFilter !== "All") params.category = categoryFilter;
      if (searchQuery) params.search = searchQuery;

      const { data } = await api.get("/polls", { params });
      setPolls(data);
    } catch (err) {
      console.error("Failed to load polls:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, [typeFilter, categoryFilter, searchQuery]);

  const handleVote = async (pollId, value) => {
    const prevPolls = polls;
    setPolls((prev) =>
      prev.map((p) => {
        if (p._id !== pollId) return p;
        const wasVoted = p.myVote !== null && p.myVote !== undefined;
        return {
          ...p,
          myVote: wasVoted ? null : value,
          totalVotes: wasVoted ? p.totalVotes : p.totalVotes + 1,
        };
      })
    );
    try {
      const { data } = await api.post(`/polls/${pollId}/vote`, { value });
      setPolls((prev) => prev.map((p) => (p._id === pollId ? data : p)));
    } catch (err) {
      console.error("Vote failed:", err);
      setPolls(prevPolls);
    }
  };

  const handleUnvote = async (pollId) => {
    const prevPolls = polls;
    setPolls((prev) =>
      prev.map((p) => {
        if (p._id !== pollId) return p;
        return { ...p, myVote: null, totalVotes: Math.max(0, p.totalVotes - 1) };
      })
    );
    try {
      const { data } = await api.post(`/polls/${pollId}/unvote`);
      setPolls((prev) => prev.map((p) => (p._id === pollId ? data : p)));
    } catch (err) {
      console.error("Unvote failed:", err);
      setPolls(prevPolls);
    }
  };

  const handleBookmark = async (pollId) => {
    const prevPolls = polls;
    setPolls((prev) =>
      prev.map((p) => {
        if (p._id !== pollId) return p;
        const wasBookmarked = p.isBookmarked;
        return {
          ...p,
          isBookmarked: !wasBookmarked,
          saves: wasBookmarked ? Math.max(0, (p.saves || 0) - 1) : (p.saves || 0) + 1,
        };
      })
    );
    try {
      const { data } = await api.post(`/polls/${pollId}/bookmark`);
      setPolls((prev) =>
        prev.map((p) =>
          p._id === pollId
            ? { ...p, isBookmarked: data.bookmarked, saves: data.bookmarked ? (p.saves || 0) + 1 : Math.max(0, (p.saves || 0) - 1) }
            : p
        )
      );
    } catch (err) {
      console.error("Bookmark failed:", err);
      setPolls(prevPolls);
    }
  };

  const handleClose = async (pollId) => {
    try {
      const { data } = await api.patch(`/polls/${pollId}/close`);
      setPolls((prev) =>
        prev.map((p) => (p._id === pollId ? { ...p, closed: data.closed } : p))
      );
    } catch (err) {
      console.error("Close failed:", err);
    }
  };

  const handleDelete = async (pollId) => {
    try {
      await api.delete(`/polls/${pollId}`);
      setPolls((prev) => prev.filter((p) => p._id !== pollId));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className={s.container}>
      {/* Greeting & Composer Card */}
      <div className={s.greetingRow}>
        <div>
          <h1 className={s.greetingHeading}>
            Welcome back, {user?.name?.split(" ")[0] || "Friend"} 👋
          </h1>
          <p className={s.greetingSub}>See what your community is polling today</p>
        </div>
      </div>

      <div className={s.composer}>
        <Avatar user={user} className={s.composerAvatar} />
        <Link to="/create-poll" className={s.composerInput}>
          Ask a question or create a poll...
        </Link>
        <Link to="/create-poll" className={s.composerButton} title="Create Poll">
          <PlusSquare size={18} />
        </Link>
      </div>

      {/* Filter Bar */}
      <FilterBar
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />

      {/* Feed List */}
      {loading ? (
        <div className="space-y-4">
          <PollSkeleton />
          <PollSkeleton />
        </div>
      ) : polls.length === 0 ? (
        <div className={s.emptyContainer}>
          <div className={s.emptyIcon}>
            <Inbox size={24} />
          </div>
          <h3 className={s.emptyTitle}>No polls found</h3>
          <p className={s.emptyDesc}>Be the first to ask a question in this category!</p>
          <Link to="/create-poll" className={s.emptyButton}>
            <Sparkles size={14} /> Create a Poll
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {polls.map((poll) => (
            <PollCard
              key={poll._id}
              poll={poll}
              vote={handleVote}
              unvote={handleUnvote}
              bookmark={handleBookmark}
              close={handleClose}
              remove={handleDelete}
              owner={user?._id === (poll.creator?._id || poll.creator)}
              onCommentAdded={() => {
                setPolls((prev) =>
                  prev.map((p) =>
                    p._id === poll._id ? { ...p, comments: (p.comments || 0) + 1 } : p
                  )
                );
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
