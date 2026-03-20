import Link from "next/link";

const navItems = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard" },
  { id: "path", label: "Learning Path", href: "/content" },
  { id: "stats", label: "Stats", href: "/stats" },
  { id: "practice", label: "Practice", href: "/dashboard" },
  { id: "achievements", label: "Achievements", href: "/dashboard" },
  { id: "settings", label: "Settings", href: "/settings" },
];

export default function Sidebar({ active = "dashboard" }) {
  return (
    <aside className="sidebar card">
      <div className="sidebar-brand">
        <div className="brand-mark">G</div>
        <div>
          <div className="brand-title">GoDomain</div>
          <div className="brand-subtitle">Learning Hub</div>
        </div>
      </div>

      <div className="profile-card">
        <div className="profile-avatar">AR</div>
        <div>
          <div className="profile-name">Ari Rowe</div>
          <div className="profile-meta">Section 2 · Unit 2</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const isActive = item.id === active;
          return (
            <Link
              key={item.id}
              className={`nav-link ${isActive ? "active" : ""}`}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
            >
              <span className={`nav-icon ${item.id}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="streak-card">
          <div className="streak-value">8-day streak</div>
          <div className="streak-meta">Keep it going to unlock bonuses.</div>
        </div>
        <button className="cta-button">Start daily session</button>
      </div>
    </aside>
  );
}
