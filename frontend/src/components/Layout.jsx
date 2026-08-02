import { useState } from "react";
import { Link, NavLink, useNavigate, Outlet } from "react-router-dom";
import {
  LayoutGrid,
  PlusSquare,
  PenLine,
  CheckCircle2,
  Bookmark,
  Search,
  LogOut,
  Settings,
  Zap,
} from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { Avatar } from "../assets/helpers component/UIElements.jsx";
import Sidebar from "./Sidebar.jsx";
import { layoutStyles as s } from "../assets/dummyStyles.jsx";

const NAV = [
  { to: "/dashboard", label: "Dashboard", Icon: LayoutGrid },
  { to: "/create-poll", label: "Create", Icon: PlusSquare },
  { to: "/my-polls", label: "My Polls", Icon: PenLine },
  { to: "/voted-polls", label: "Voted", Icon: CheckCircle2 },
  { to: "/bookmarked-polls", label: "Saved", Icon: Bookmark },
];

export default function Layout({ onSearch }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(search);
  };

  return (
    <div className={s.container}>
      {/* Header */}
      <header className={s.header}>
        <div className={s.headerInner}>
          <Link to="/dashboard" className={s.logoLink}>
            <div className={s.logoImg + " bg-gradient-to-tr from-emerald-500 to-teal-400 grid place-items-center"}>
              <Zap className="w-4 h-4 text-white fill-white" />
            </div>
            <span className={s.logoSpan}>Pollify</span>
          </Link>

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className={s.searchDesktop}>
            <Search size={14} className={s.searchIcon} />
            <input
              type="text"
              placeholder="Search polls by question..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                if (onSearch) onSearch(e.target.value);
              }}
              className={s.searchInput}
            />
          </form>

          {/* Right Cluster */}
          <div className={s.rightCluster}>
            <Link to="/create-poll" className={s.createButton}>
              <PlusSquare size={15} /> Create Poll
            </Link>
            {user && (
              <Link to={`/user/${user.username}`} className={s.avatarWrapper}>
                <Avatar user={user} className={s.avatarClass} />
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className={s.bodyContainer}>
        {/* Left Sidebar Navigation */}
        <aside className={s.leftSidebar}>
          <div className={s.menuLabel}>Menu</div>
          <nav className={s.navContainer}>
            {NAV.map(({ to, label, Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `${s.sideLinkBase} ${isActive ? s.sideLinkActive : s.sideLinkInactive}`
                }
              >
                <Icon size={16} />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>

          <div className={s.sidebarBottom}>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `${s.sideLinkBase} ${isActive ? s.sideLinkActive : s.sideLinkInactive}`
              }
            >
              <Settings size={16} />
              <span>Settings</span>
            </NavLink>
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className={s.logoutButton}
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Center Content */}
        <main className={s.mainContent}>
          <Outlet />
        </main>

        {/* Right Rail Sidebar */}
        <aside className={s.rightRail}>
          <Sidebar user={user} />
        </aside>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className={s.bottomNav}>
        {NAV.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `${s.bottomLinkBase} ${isActive ? s.bottomLinkActive : s.bottomLinkInactive}`
            }
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
