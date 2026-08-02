import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { UserCheck, UserPlus, ArrowLeft } from "lucide-react";
import api from "../utils/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import PollCard from "../assets/helpers component/PollCard.jsx";
import { Avatar, PollSkeleton } from "../assets/helpers component/UIElements.jsx";

export default function UserProfilePage() {
  const { username } = useParams();
  const { user: me } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/users/${username}`);
      setProfile(data);
    } catch (err) {
      setError(err.response?.data?.message || "User profile not found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [username]);

  const handleFollow = async () => {
    if (!profile?.user?._id) return;
    const prevProfile = profile;
    setProfile((prev) =>
      prev
        ? {
            ...prev,
            isFollowing: !prev.isFollowing,
            stats: {
              ...prev.stats,
              followers: prev.isFollowing
                ? Math.max(0, prev.stats.followers - 1)
                : prev.stats.followers + 1,
            },
          }
        : prev
    );
    try {
      const { data } = await api.post(`/users/${profile.user._id}/follow`);
      setProfile((prev) =>
        prev
          ? {
              ...prev,
              isFollowing: data.isFollowing,
              isFollowedBy: data.isFollowedBy,
              stats: {
                ...prev.stats,
                followers: data.isFollowing
                  ? prev.stats.followers + 1
                  : Math.max(0, prev.stats.followers - 1),
              },
            }
          : prev
      );
    } catch (err) {
      console.error(err);
      setProfile(prevProfile);
    }
  };

  const handleVote = async (pollId, value) => {
    const prevProfile = profile;
    setProfile((prev) =>
      prev
        ? {
            ...prev,
            polls: prev.polls.map((p) => {
              if (p._id !== pollId) return p;
              const wasVoted = p.myVote !== null && p.myVote !== undefined;
              return {
                ...p,
                myVote: wasVoted ? null : value,
                totalVotes: wasVoted ? p.totalVotes : p.totalVotes + 1,
              };
            }),
          }
        : prev
    );
    try {
      const { data } = await api.post(`/polls/${pollId}/vote`, { value });
      setProfile((prev) =>
        prev
          ? {
              ...prev,
              polls: prev.polls.map((p) => (p._id === pollId ? data : p)),
            }
          : prev
      );
    } catch (err) {
      console.error(err);
      setProfile(prevProfile);
    }
  };

  const handleBookmark = async (pollId) => {
    const prevProfile = profile;
    setProfile((prev) =>
      prev
        ? {
            ...prev,
            polls: prev.polls.map((p) => {
              if (p._id !== pollId) return p;
              const wasBookmarked = p.isBookmarked;
              return {
                ...p,
                isBookmarked: !wasBookmarked,
                saves: wasBookmarked ? Math.max(0, (p.saves || 0) - 1) : (p.saves || 0) + 1,
              };
            }),
          }
        : prev
    );
    try {
      const { data } = await api.post(`/polls/${pollId}/bookmark`);
      setProfile((prev) =>
        prev
          ? {
              ...prev,
              polls: prev.polls.map((p) =>
                p._id === pollId
                  ? { ...p, isBookmarked: data.bookmarked, saves: data.bookmarked ? (p.saves || 0) + 1 : Math.max(0, (p.saves || 0) - 1) }
                  : p
              ),
            }
          : prev
      );
    } catch (err) {
      console.error(err);
      setProfile(prevProfile);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-40 bg-zinc-900 rounded-2xl animate-pulse" />
        <PollSkeleton />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="space-y-4">
        <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white">
          <ArrowLeft size={14} /> Back to dashboard
        </Link>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 text-center text-sm text-zinc-500">
          {error || "User not found"}
        </div>
      </div>
    );
  }

  const { user, isFollowing, isFollowedBy, isMe, stats, polls } = profile;

  return (
    <div className="space-y-5">
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <Avatar user={user} className="w-20 h-20 text-2xl ring-4 ring-zinc-800 shrink-0" />

          <div className="flex-1 text-center sm:text-left min-w-0">
            <h1 className="text-xl font-bold text-white leading-tight">{user.name}</h1>
            <div className="text-xs text-zinc-500 mt-0.5">@{user.username}</div>
            {user.bio && <p className="text-xs text-zinc-400 mt-3 leading-relaxed">{user.bio}</p>}

            <div className="flex flex-wrap gap-6 mt-4 pt-4 border-t border-zinc-800/80 justify-center sm:justify-start">
              <div>
                <div className="text-base font-bold text-white">{stats.created}</div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Polls</div>
              </div>
              <div>
                <div className="text-base font-bold text-white">{stats.voted}</div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Voted</div>
              </div>
              <div>
                <div className="text-base font-bold text-white">{stats.followers}</div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Followers</div>
              </div>
              <div>
                <div className="text-base font-bold text-white">{stats.following}</div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Following</div>
              </div>
            </div>
          </div>

          {!isMe && (
            <button
              onClick={handleFollow}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                isFollowing
                  ? "bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/30"
                  : "bg-emerald-500 text-white hover:bg-emerald-400 shadow-lg shadow-emerald-500/20"
              }`}
            >
              {isFollowing ? (
                <>
                  <UserCheck size={14} /> Following
                </>
              ) : (
                <>
                  <UserPlus size={14} /> Follow
                </>
              )}
            </button>
          )}
        </div>

        {isFollowedBy && !isMe && (
          <div className="absolute top-4 right-4 animate-follow-slide inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-semibold tracking-wide">
            Follows you back
          </div>
        )}
      </div>

      <div className="space-y-3">
        <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">
          Polls created by @{user.username} ({polls.length})
        </h2>
        {polls.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 text-center text-xs text-zinc-600">
            No polls published yet.
          </div>
        ) : (
          polls.map((poll) => (
            <PollCard
              key={poll._id}
              poll={poll}
              vote={handleVote}
              bookmark={handleBookmark}
              owner={me?._id === user._id}
              onCommentAdded={() => {
                setProfile((prev) =>
                  prev
                    ? {
                        ...prev,
                        polls: prev.polls.map((p) =>
                          p._id === poll._id ? { ...p, comments: (p.comments || 0) + 1 } : p
                        ),
                      }
                    : prev
                );
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}
