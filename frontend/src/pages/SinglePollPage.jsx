import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import api from "../utils/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import PollCard from "../assets/helpers component/PollCard.jsx";
import { PollSkeleton } from "../assets/helpers component/UIElements.jsx";

export default function SinglePollPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPoll = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/polls/${id}`);
      setPoll(data);
    } catch (err) {
      setError(err.response?.data?.message || "Poll not found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPoll();
  }, [id]);

  const handleVote = async (pollId, value) => {
    const prevPoll = poll;
    setPoll((prev) =>
      prev
        ? {
            ...prev,
            myVote: prev.myVote !== null && prev.myVote !== undefined ? null : value,
            totalVotes: prev.myVote !== null && prev.myVote !== undefined ? prev.totalVotes : prev.totalVotes + 1,
          }
        : prev
    );
    try {
      const { data } = await api.post(`/polls/${pollId}/vote`, { value });
      setPoll(data);
    } catch (err) {
      console.error(err);
      setPoll(prevPoll);
    }
  };

  const handleUnvote = async (pollId) => {
    const prevPoll = poll;
    setPoll((prev) =>
      prev ? { ...prev, myVote: null, totalVotes: Math.max(0, prev.totalVotes - 1) } : prev
    );
    try {
      const { data } = await api.post(`/polls/${pollId}/unvote`);
      setPoll(data);
    } catch (err) {
      console.error(err);
      setPoll(prevPoll);
    }
  };

  const handleBookmark = async (pollId) => {
    const prevPoll = poll;
    setPoll((prev) => {
      if (!prev) return prev;
      const wasBookmarked = prev.isBookmarked;
      return {
        ...prev,
        isBookmarked: !wasBookmarked,
        saves: wasBookmarked ? Math.max(0, (prev.saves || 0) - 1) : (prev.saves || 0) + 1,
      };
    });
    try {
      const { data } = await api.post(`/polls/${pollId}/bookmark`);
      setPoll((prev) =>
        prev
          ? { ...prev, isBookmarked: data.bookmarked, saves: data.bookmarked ? (prev.saves || 0) + 1 : Math.max(0, (prev.saves || 0) - 1) }
          : prev
      );
    } catch (err) {
      console.error(err);
      setPoll(prevPoll);
    }
  };

  const handleClose = async (pollId) => {
    try {
      const { data } = await api.patch(`/polls/${pollId}/close`);
      setPoll((prev) => (prev ? { ...prev, closed: data.closed } : prev));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-4">
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-300 transition-colors"
      >
        <ArrowLeft size={14} /> Back to dashboard
      </Link>

      {loading ? (
        <PollSkeleton />
      ) : error ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center text-sm text-zinc-500">
          {error}
        </div>
      ) : (
        poll && (
          <PollCard
            poll={poll}
            vote={handleVote}
            unvote={handleUnvote}
            bookmark={handleBookmark}
            close={handleClose}
            owner={user?._id === (poll.creator?._id || poll.creator)}
            onCommentAdded={() => {
              setPoll((prev) =>
                prev ? { ...prev, comments: (prev.comments || 0) + 1 } : prev
              );
            }}
          />
        )
      )}
    </div>
  );
}
