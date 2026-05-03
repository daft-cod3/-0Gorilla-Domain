"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/",
    caption: "Uploads & progress",
    icon: "dashboard",
  },
  {
    id: "path",
    label: "Learning Path",
    href: "/content",
    caption: "Lesson circles",
    icon: "path",
  },
  {
    id: "stats",
    label: "Profile",
    href: "/stats",
    caption: "Details & coins",
    icon: "stats",
  },
  {
    id: "settings",
    label: "Settings",
    href: "/settings",
    caption: "Theme & tools",
    icon: "settings",
  },
];

function getSection(pathname, fallback) {
  if (!pathname || pathname === "/" || pathname.startsWith("/dashboard")) {
    return "dashboard";
  }
  if (pathname.startsWith("/content")) return "path";
  if (pathname.startsWith("/stats")) return "stats";
  if (pathname.startsWith("/settings")) return "settings";
  return fallback;
}

function Icon({ name }) {
  const title = name.charAt(0).toUpperCase() + name.slice(1);
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
  };

  if (name === "dashboard") {
    return (
      <svg {...props}>
        <title>{title}</title>
        <path
          d="M4 5H11V11H4V5ZM13 5H20V8H13V5ZM13 10H20V19H13V10ZM4 13H11V19H4V13Z"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "path") {
    return (
      <svg {...props}>
        <title>{title}</title>
        <path d="M5 18C9 18 9 6 13 6C17 6 17 18 21 18" strokeLinecap="round" />
        <circle cx="5" cy="18" r="2" fill="currentColor" stroke="none" />
        <circle cx="13" cy="6" r="2" fill="currentColor" stroke="none" />
        <circle cx="21" cy="18" r="2" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (name === "stats") {
    return (
      <svg {...props}>
        <title>{title}</title>
        <path d="M5 19V11M12 19V5M19 19V14" strokeLinecap="round" />
        <path d="M4 19H20" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "settings") {
    return (
      <svg {...props}>
        <title>{title}</title>
        <circle cx="12" cy="12" r="3.5" />
        <path
          d="M19 12c0-.5-.1-1-.2-1.5l1.7-1.3-1.7-3-2 .8c-.7-.6-1.5-1.1-2.4-1.3L14.1 3.5h-3.4l-.3 2.2C9.5 5.9 8.7 6.4 8 7l-2-.8-1.7 3L6 10.5C5.9 11 5.8 11.5 5.8 12s.1 1 .2 1.5L4.3 14.8l1.7 3 2-.8c.7.6 1.5 1.1 2.4 1.3l.3 2.2h3.4l.3-2.2c.9-.2 1.7-.7 2.4-1.3l2 .8 1.7-3-1.7-1.3c.1-.5.2-1 .2-1.5z"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <title>{title}</title>
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

export default function Sidebar({ active = "dashboard" }) {
  const pathname = usePathname();
  const activeSection = getSection(pathname, active);
  const [expanded, setExpanded] = useState(false);
  const collapseTimerRef = useRef(null);
  const pendingNavCollapseRef = useRef(false);

  useEffect(() => {
    if (!pendingNavCollapseRef.current || !pathname) return undefined;
    clearTimeout(collapseTimerRef.current);
    setExpanded(true);
    collapseTimerRef.current = setTimeout(() => {
      pendingNavCollapseRef.current = false;
      setExpanded(false);
    }, 2200);
    return () => clearTimeout(collapseTimerRef.current);
  }, [pathname]);

  useEffect(() => () => clearTimeout(collapseTimerRef.current), []);

  function handleNavClick() {
    pendingNavCollapseRef.current = true;
    setExpanded(true);
  }

  function handleShellBlur(event) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      pendingNavCollapseRef.current = false;
      setExpanded(false);
    }
  }

  return (
    <aside
      className="sb-shell"
      data-expanded={expanded}
      aria-label="Primary navigation"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => {
        if (!pendingNavCollapseRef.current) setExpanded(false);
      }}
      onFocus={() => setExpanded(true)}
      onBlur={handleShellBlur}
    >
      <div
        className={`sb-panel${expanded ? " expanded" : ""}`}
        id="app-sidebar"
      >
        <nav className="sb-nav">
          {NAV_ITEMS.map((item) => {
            const isActive = item.id === activeSection;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`sb-nav-link${isActive ? " active" : ""}`}
                aria-current={isActive ? "page" : undefined}
                onClick={handleNavClick}
                title={item.label}
              >
                <span className={`sb-icon sb-icon-${item.id}`}>
                  <Icon name={item.icon} />
                </span>
                <span className="sb-text sb-nav-text">
                  <span className="sb-nav-label">{item.label}</span>
                  <span className="sb-nav-caption">{item.caption}</span>
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="sb-text sb-footer">
          <div className="sb-streak">
            <div className="sb-streak-row">
              <span className="sb-streak-label">8-day streak</span>
              <span className="sb-streak-pill">78%</span>
            </div>
            <div className="sb-streak-bar">
              <span style={{ width: "78%" }} />
            </div>
            <p className="sb-streak-note">
              2 more activities to unlock bonus gems.
            </p>
          </div>
          <Link className="sb-cta" href="/content">
            Continue learning
          </Link>
        </div>
      </div>
    </aside>
  );
}
