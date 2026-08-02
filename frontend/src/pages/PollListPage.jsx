import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Inbox, PlusSquare } from "lucide-react";
import api from "../utils/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import PollCard from "../assets/helpers component/PollCard.jsx";
import { PollSkeleton } from "../assets/helpers component/UIElements.jsx";
import { pollListPageStyles as s } from "../assets/dummyStyles.jsx";

export default function PollListPage({ feed, title, emptyMessage }) {
  const { user } = useAuth();
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPolls = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/polls", { params: { feed } });
      setPolls(data);
    } catch (err) {
      console.error("Failed to load polls:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, [feed]);

  const handleVote = async (pollId, value) => {
    const prevPolls = polls;
    setPolls((prev) =>
      prev.map((p) => {
        if (p._id !== pollId) return p;
        const wasVoted = p.myVote !== null && p.myVote !== undefined;
        const newVotes = wasVoted ? p.totalVotes : p.totalVotes + 1;
        return {
          ...p,
          myVote: wasVoted ? null : value,
          totalVotes: newVotes,
        };
      })
    );
    try {
      const { data } = await api.post(`/polls/${pollId}/vote`, { value });
      setPolls((prev) => prev.map((p) => (p._id === pollId ? data : p)));
    } catch (err) {
      console.error(err);
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
      console.error(err);
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
      console.error(err);
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
      console.error(err);
    }
  };

  const handleDelete = async (pollId) => {
    try {
      await api.delete(`/polls/${pollId}`);
      setPolls((prev) => prev.filter((p) => p._id !== pollId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className={s.heading}>{title}</h1>

      {loading ? (
        <div className="space-y-4">
          <PollSkeleton />
          <PollSkeleton />
        </div>
      ) : polls.length === 0 ? (
        <div className={s.emptyContainer}>
          <div className={s.emptyIconWrapper}>
            <Inbox size={24} />
          </div>
          <h3 className={s.emptyTitle}>No polls found</h3>
          <p className={s.emptyText}>{emptyMessage || "Nothing to show right now."}</p>
          <Link
            to="/create-poll"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2 text-xs font-semibold hover:bg-emerald-500/20 transition-colors"
          >
            <PlusSquare size={14} /> Create a Poll
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
