import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TrendingUp } from "lucide-react";
import api from "../utils/api.js";
import { TYPE_META } from "../assets/helpers component/FilterBar.jsx";
import { Avatar } from "../assets/helpers component/UIElements.jsx";
import { sidebarStyles as s } from "../assets/dummyStyles.jsx";

const COLORS = [
  "bg-emerald-500",
  "bg-sky-500",
  "bg-violet-500",
  "bg-amber-500",
  "bg-rose-500",
];

export default function Sidebar({ user, stats }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api
      .get("/polls/trending")
      .then(({ data }) => setItems(data))
      .catch(() => {});
  }, []);

  const max = Math.max(1, ...items.map((i) => i.count));

  return (
    <div className="space-y-4">
      {/* Profile Card */}
      {user && (
        <div className={s.profileCard}>
          <div className={s.glowBlob} />
          <div className={s.profileInner}>
            <div className={s.avatarWrapper}>
              <div className={s.avatarGlow} />
              <Avatar user={user} className={s.avatarClass} />
            </div>

            <Link to={`/user/${user.username}`} className={s.userNameLink}>
              {user.name}
            </Link>
            <div className={s.usernameText}>@{user.username}</div>

            <div className={s.statsContainer}>
              <div className={s.statBox}>
                <div className={s.statNumber}>{stats?.created || 0}</div>
                <div className={s.statLabel}>Polls</div>
              </div>
              <div className={s.statBox}>
                <div className={s.statNumber}>{stats?.voted || 0}</div>
                <div className={s.statLabel}>Voted</div>
              </div>
              <div className={s.statBox}>
                <div className={s.statNumber}>{stats?.followers || 0}</div>
                <div className={s.statLabel}>Followers</div>
              </div>
            </div>

            <Link to={`/user/${user.username}`} className={s.viewProfileLink + " w-full"}>
              View Profile
            </Link>
          </div>
        </div>
      )}

      {/* Trending Types */}
      <div className={s.trendingCard}>
        <h3 className={s.trendingHeading}>
          <TrendingUp size={12} className={s.trendingIcon} /> Poll Breakdown
        </h3>
        <ul className={s.trendingList}>
          {items.map((it, idx) => {
            const m = TYPE_META[it.type] || { label: it.type, Icon: TrendingUp };
            const { Icon } = m;
            const pct = Math.round((it.count / max) * 100);
            return (
              <li key={it.type} className={s.trendingItem}>
                <div className={s.trendingItemRow}>
                  <span className={s.trendingItemLabel}>
                    <Icon size={12} className={s.trendingItemIcon} /> {m.label}
                  </span>
                  <span className={s.trendingItemCount}>{it.count}</span>
                </div>
                <div className={s.trendingBarTrack}>
                  <div
                    className={`${s.trendingBarFillBase} ${COLORS[idx % COLORS.length]}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}