"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    caption: "Uploads, classes, and progress",
    icon: "dashboard",
  },
  {
    id: "path",
    label: "Learning Path",
    href: "/content",
    caption: "Open your lesson circles",
    icon: "path",
  },
  {
    id: "stats",
    label: "Stats",
    href: "/stats",
    caption: "Track streaks and rankings",
    icon: "stats",
  },
  {
    id: "settings",
    label: "Settings",
    href: "/settings",
    caption: "Manage theme and study tools",
    icon: "settings",
  },
];

const utilityItems = [
  { id: "live", label: "Live", href: "/live", icon: "live" },
  { id: "messages", label: "Messages", href: "/messages", icon: "messages" },
  {
    id: "notifications",
    label: "Alerts",
    href: "/notifications",
    icon: "notifications",
  },
];

function getPrimarySection(pathname, fallback) {
  if (!pathname || pathname === "/" || pathname.startsWith("/dashboard")) {
    return "dashboard";
  }

  if (pathname.startsWith("/content")) {
    return "path";
  }

  if (pathname.startsWith("/stats")) {
    return "stats";
  }

  if (pathname.startsWith("/settings")) {
    return "settings";
  }

  return fallback;
}

function isUtilityActive(pathname, href) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarIcon({ name }) {
  if (name === "dashboard") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M4 5H11V11H4V5ZM13 5H20V8H13V5ZM13 10H20V19H13V10ZM4 13H11V19H4V13Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "path") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M5 18C9 18 9 6 13 6C17 6 17 18 21 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="5" cy="18" r="2" fill="currentColor" />
        <circle cx="13" cy="6" r="2" fill="currentColor" />
        <circle cx="21" cy="18" r="2" fill="currentColor" />
      </svg>
    );
  }

  if (name === "stats") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M5 19V11M12 19V5M19 19V14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M4 19H20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (name === "settings") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 8.5C10.1 8.5 8.5 10.1 8.5 12C8.5 13.9 10.1 15.5 12 15.5C13.9 15.5 15.5 13.9 15.5 12C15.5 10.1 13.9 8.5 12 8.5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M19 12C19 11.5 18.9 11 18.8 10.5L20.5 9.2L18.8 6.2L16.8 7C16.1 6.4 15.3 5.9 14.4 5.7L14.1 3.5H10.7L10.4 5.7C9.5 5.9 8.7 6.4 8 7L6 6.2L4.3 9.2L6 10.5C5.9 11 5.8 11.5 5.8 12C5.8 12.5 5.9 13 6 13.5L4.3 14.8L6 17.8L8 17C8.7 17.6 9.5 18.1 10.4 18.3L10.7 20.5H14.1L14.4 18.3C15.3 18.1 16.1 17.6 16.8 17L18.8 17.8L20.5 14.8L18.8 13.5C18.9 13 19 12.5 19 12Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "live") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect
          x="4"
          y="6"
          width="11"
          height="12"
          rx="2.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M15 10L20 7V17L15 14V10Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "messages") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M5 6H19V15H8L5 18V6Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7 10C7 7.2 9 5 12 5C15 5 17 7.2 17 10V13L19 15H5L7 13V10Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M10 18C10.5 18.8 11.2 19.2 12 19.2C12.8 19.2 13.5 18.8 14 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Sidebar({ active = "dashboard" }) {
  const pathname = usePathname();
  const activeSection = getPrimarySection(pathname, active);

  return (
    <aside className="sidebar card">
      <div className="sidebar-brand">
        <div className="brand-mark">G</div>
        <div>
          <div className="brand-title">GoDomain</div>
          <div className="brand-subtitle">Student learning workspace</div>
        </div>
      </div>

      <div className="profile-card">
        <div className="profile-avatar">AR</div>
        <div className="profile-copy">
          <div className="profile-row">
            <div className="profile-name">Ari Rowe</div>
            <span className="profile-status">Online</span>
          </div>
          <div className="profile-meta">Section 2 • Unit 2</div>
          <div className="profile-progress">
            <span style={{ width: "78%" }} />
          </div>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Primary navigation">
        {navItems.map((item) => {
          const isActive = item.id === activeSection;

          return (
            <Link
              key={item.id}
              className={`nav-link ${isActive ? "active" : ""}`}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
            >
              <span className={`nav-icon ${item.id}`}>
                <SidebarIcon name={item.icon} />
              </span>
              <span className="nav-copy">
                <span className="nav-label">{item.label}</span>
                <span className="nav-caption">{item.caption}</span>
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-section">
        <div className="sidebar-section-label">Quick access</div>
        <div className="sidebar-utility-grid">
          {utilityItems.map((item) => {
            const isActive = isUtilityActive(pathname, item.href);

            return (
              <Link
                key={item.id}
                className={`sidebar-utility-link ${isActive ? "active" : ""}`}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
              >
                <span className={`sidebar-utility-icon ${item.id}`}>
                  <SidebarIcon name={item.icon} />
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="streak-card">
          <div className="streak-row">
            <div className="streak-value">8-day streak</div>
            <span className="streak-pill">78% today</span>
          </div>
          <div className="streak-track" aria-hidden="true">
            <span style={{ width: "78%" }} />
          </div>
          <div className="streak-meta">
            Two more activities to unlock mentor feedback and bonus gems.
          </div>
        </div>
        <Link className="cta-button" href="/content">
          Continue learning
        </Link>
      </div>
    </aside>
  );
}
