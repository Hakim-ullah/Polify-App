import { Link } from "react-router-dom";
import { Users, TrendingUp, Zap } from "lucide-react";
import { authLayoutStyles as s } from "../assets/dummyStyles.jsx";

const STATS = [
  { Icon: Users, value: "50K+", label: "Community members" },
  { Icon: TrendingUp, value: "2M+", label: "Votes cast" },
  { Icon: Zap, value: "500K+", label: "Polls created" },
];

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className={s.container}>
      {/* Left panel branding */}
      <div className={s.leftPanel}>
        <div className={s.glowTop} />
        <div className={s.glowBottom} />
        <div style={s.gridPatternStyle} className="absolute inset-0 opacity-[0.03]" />

        <div className={s.logoContainer}>
          <div className={s.logoImg + " bg-gradient-to-tr from-emerald-500 to-teal-400 grid place-items-center"}>
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <span className={s.logoText}>Pollify</span>
        </div>

        <div className={s.mainCopyContainer}>
          <div className={s.mainCopyInner}>
            <span className={s.liveBadge}>
              <span className={s.dot} /> Live Opinion Network
            </span>
            <h1 className={s.heading}>
              Discover what <span className={s.emeraldText}>people think</span> in real-time.
            </h1>
            <p className={s.description}>
              Create polls, share with friends, and gather instant insights across tech, design, and culture.
            </p>
          </div>

          <div className={s.statsGrid}>
            {STATS.map(({ Icon, value, label }) => (
              <div key={label} className={s.statCard}>
                <Icon size={14} className="text-emerald-400" />
                <div className={s.statValue}>{value}</div>
                <div className={s.statLabel}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={s.footer}>© {new Date().getFullYear()} Pollify. All rights reserved.</div>
      </div>

      {/* Right panel form content */}
      <div className={s.rightPanel}>
        <div className={s.formContainer}>
          <div className={s.mobileLogoContainer}>
            <div className={s.mobileLogoImg + " bg-gradient-to-tr from-emerald-500 to-teal-400 grid place-items-center"}>
              <Zap className="w-4 h-4 text-white fill-white" />
            </div>
            <span className={s.mobileLogoText}>Pollify</span>
          </div>

          <div className={s.headingWrapper}>
            <h2 className={s.pageTitle}>{title}</h2>
            {subtitle && <p className={s.subtitle}>{subtitle}</p>}
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
