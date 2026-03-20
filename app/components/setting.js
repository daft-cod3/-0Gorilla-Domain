"use client";

import { useEffect, useState } from "react";

const THEME_KEY = "godomain-theme";

export default function Setting() {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const nextTheme = stored || (prefersDark ? "dark" : "light");
    setTheme(nextTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme, mounted]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <section className="settings-card">
      <div className="settings-header">
        <div>
          <div className="settings-title">Settings</div>
          <div className="settings-subtitle">
            Control the look and feel of your learning space.
          </div>
        </div>
      </div>

      <div className="setting-row">
        <div>
          <div className="setting-label">Theme</div>
          <div className="setting-help">Switch between light and dark mode.</div>
        </div>
        <button
          className={`theme-toggle ${theme === "dark" ? "is-dark" : ""}`}
          type="button"
          onClick={toggleTheme}
          aria-pressed={theme === "dark"}
          aria-label="Toggle theme"
        >
          <span className="toggle-knob" />
          <span className="toggle-text">
            {theme === "dark" ? "Dark mode" : "Light mode"}
          </span>
        </button>
      </div>

      <div className="setting-row">
        <div>
          <div className="setting-label">Daily reminders</div>
          <div className="setting-help">
            Keep your streak alive with nudges.
          </div>
        </div>
        <button className="ghost-button" type="button">
          Manage
        </button>
      </div>

      <div className="setting-row">
        <div>
          <div className="setting-label">Sound effects</div>
          <div className="setting-help">Control lesson feedback sounds.</div>
        </div>
        <button className="ghost-button" type="button">
          Customize
        </button>
      </div>
    </section>
  );
}
