import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Users, Eye, Bookmark, BarChart2 } from "lucide-react";
import api from "../utils/api.js";
import PollResults from "../assets/helpers component/PollResults.jsx";
import { analyticsStyles as s } from "../assets/dummyStyles.jsx";

export default function AnalyticsPage() {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/polls/${id}?noview=true`)
      .then(({ data }) => setPoll(data))
      .catch((err) => setError(err.response?.data?.message || "Poll not found"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="h-64 bg-zinc-900 rounded-2xl animate-pulse" />;
  }

  if (error || !poll) {
    return (
      <div className={s.container}>
        <Link to="/my-polls" className={s.backButton}>
          <ArrowLeft size={14} /> Back to my polls
        </Link>
        <div className={s.errorContainer}>{error || "Analytics unavailable"}</div>
      </div>
    );
  }

  const STATS = [
    { label: "Total Votes", value: poll.totalVotes || 0, Icon: Users, color: "text-emerald-400 bg-emerald-500/10" },
    { label: "Total Views", value: poll.views || 0, Icon: Eye, color: "text-sky-400 bg-sky-500/10" },
    { label: "Bookmarks", value: poll.saves || 0, Icon: Bookmark, color: "text-amber-400 bg-amber-500/10" },
    { label: "Comments", value: poll.comments || 0, Icon: BarChart2, color: "text-violet-400 bg-violet-500/10" },
  ];

  return (
    <div className={s.container}>
      <Link to="/my-polls" className={s.backButton}>
        <ArrowLeft size={14} /> Back to my polls
      </Link>

      <div>
        <h1 className={s.heading}>Poll Analytics</h1>
        <p className={s.subtitle}>"{poll.question}"</p>
      </div>

      <div className={s.statsGrid}>
        {STATS.map(({ label, value, Icon, color }) => (
          <div key={label} className={s.statCard}>
            <div className={`${s.statIcon} ${color}`}>
              <Icon size={16} />
            </div>
            <div className={s.statValue}>{value}</div>
            <div className={s.statLabel}>{label}</div>
          </div>
        ))}
      </div>

      <div className={s.resultsContainer}>
        <h3 className={s.resultsHeading}>Live Vote Breakdown</h3>
        <PollResults poll={poll} />
      </div>
    </div>
  );
}