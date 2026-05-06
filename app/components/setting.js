"use client";

import { useState } from "react";
import {
  moduleProgress,
  profileTools,
  studentProfile,
} from "../data/student-profile";
import { useThemePreference } from "./theme-state";

function ToggleButton({ active, onClick, label }) {
  return (
    <button
      type="button"
      className={`settings-toggle ${active ? "active" : ""}`}
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
    >
      <span className="settings-toggle-slider" />
    </button>
  );
}

function ThemeIllustration({ darkMode }) {
  return darkMode
    ? <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path
          d="M21.6 5.3A11.2 11.2 0 1 0 27.2 26 12.4 12.4 0 1 1 21.6 5.3Z"
          fill="currentColor"
        />
      </svg>
    : <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="5.2" fill="currentColor" />
        <path
          d="M16 3.8v3.6M16 24.6v3.6M28.2 16h-3.6M7.4 16H3.8M24.7 7.3l-2.6 2.6M9.9 22.1l-2.6 2.6M24.7 24.7l-2.6-2.6M9.9 9.9 7.3 7.3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>;
}

function SectionHeader({ kicker, title, subtitle }) {
  return (
    <div className="settings-section-header">
      {kicker && <span className="settings-section-kicker">{kicker}</span>}
      <div className="settings-section-title">{title}</div>
      {subtitle && <div className="settings-section-subtitle">{subtitle}</div>}
    </div>
  );
}

function GlassCard({ children, className = "", hover = true }) {
  return (
    <div className={`settings-glass-card${hover ? " settings-hoverable" : ""} ${className}`}>
      {children}
    </div>
  );
}

export default function Setting() {
  const { theme, mounted, toggleTheme } = useThemePreference();
  const [lessonReminders, setLessonReminders] = useState(true);
  const [mentorSharing, setMentorSharing] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [activeTab, setActiveTab] = useState("workspace");

  const darkMode = mounted && theme === "dark";

  const tabs = [
    { id: "workspace", label: "Workspace" },
    { id: "preferences", label: "Preferences" },
    { id: "modules", label: "Modules" },
    { id: "tools", label: "Tools" },
  ];

  const preferenceControls = [
    {
      title: "Lesson reminders",
      description: "Receive updates for upcoming sessions, reviews, and instructor uploads.",
      active: lessonReminders,
      onToggle: () => setLessonReminders((prev) => !prev),
      icon: "🔔",
    },
    {
      title: "Mentor sharing",
      description: "Allow your instructor to monitor your learner dashboard and feedback trail.",
      active: mentorSharing,
      onToggle: () => setMentorSharing((prev) => !prev),
      icon: "👥",
    },
    {
      title: "Auto-save progress",
      description: "Keep lesson state, profile actions, and revision activity saved as you work.",
      active: autoSave,
      onToggle: () => setAutoSave((prev) => !prev),
      icon: "💾",
    },
  ];

  const workspaceChips = [
    studentProfile.track,
    studentProfile.nextSession,
    `${studentProfile.attendance} attendance`,
  ];

  const settingPreferences = [
    {
      label: "Theme mode",
      value: darkMode ? "Dark mode active" : "Light mode active",
      hint: "The full interface updates instantly when you switch theme.",
      interactive: true,
      active: darkMode,
      onToggle: toggleTheme,
      icon: darkMode ? "🌙" : "☀️",
    },
    {
      label: "Profile page",
      value: "Professional learner view",
      hint: "Profile and progress data now sit in a polished adaptive layout.",
      icon: "👤",
    },
    {
      label: "Alerts",
      value: lessonReminders ? "Lesson reminders on" : "Lesson reminders off",
      hint: "Uploads, deadlines, and live sessions remain visible when enabled.",
      interactive: true,
      active: lessonReminders,
      onToggle: () => setLessonReminders((prev) => !prev),
      icon: "🔔",
    },
    {
      label: "Mentor sharing",
      value: mentorSharing ? "Enabled" : "Disabled",
      hint: "Your assigned mentor can review learner progress when enabled.",
      interactive: true,
      active: mentorSharing,
      onToggle: () => setMentorSharing((prev) => !prev),
      icon: "👥",
    },
  ];

  return (
    <section className="settings-page-v2">
      {/* Page header */}
      <div className="settings-page-hero">
        <div className="settings-page-hero-copy">
          <span className="settings-page-eyebrow">Configuration</span>
          <h1 className="settings-page-title">Settings</h1>
          <p className="settings-page-subtitle">
            Manage your workspace, preferences, and learning tools.
          </p>
        </div>
        <div className="settings-page-hero-chips">
          {workspaceChips.map((chip) => (
            <span key={chip} className="settings-hero-chip">{chip}</span>
          ))}
        </div>
      </div>

      {/* Tab bar */}
      <div className="settings-tab-bar" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            className={`settings-tab-btn${activeTab === tab.id ? " active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
            aria-selected={activeTab === tab.id}
          >
            {tab.label}
            {activeTab === tab.id && <span className="settings-tab-indicator" />}
          </button>
        ))}
      </div>

      {/* Workspace tab */}
      {activeTab === "workspace" && (
        <div className="settings-tab-content settings-enhanced">
          {/* Theme toggle */}
          <GlassCard className="settings-theme-block">
            <div className="settings-theme-row">
              <div className="settings-theme-icon-wrap">
                <ThemeIllustration darkMode={darkMode} />
              </div>
              <div className="settings-theme-copy">
                <h3>{darkMode ? "Dark mode" : "Light mode"}</h3>
                <p>Switch between bright and low-glare interface.</p>
              </div>
              <ToggleButton
                active={darkMode}
                onClick={toggleTheme}
                label="Toggle application theme"
              />
            </div>
          </GlassCard>

          {/* Preference controls */}
          <div className="settings-prefs-grid">
            {preferenceControls.map((item, i) => (
              <GlassCard key={item.title} className="settings-pref-card" style={{ "--delay": `${i * 60}ms` }}>
                <div className="settings-pref-icon">{item.icon}</div>
                <div className="settings-pref-body">
                  <div className="settings-pref-title">{item.title}</div>
                  <div className="settings-pref-desc">{item.description}</div>
                </div>
                <ToggleButton
                  active={item.active}
                  onClick={item.onToggle}
                  label={`Toggle ${item.title}`}
                />
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* Preferences tab */}
      {activeTab === "preferences" && (
        <div className="settings-tab-content settings-enhanced">
          <div className="settings-detail-grid">
            {settingPreferences.map((detail, index) => (
              <GlassCard
                key={detail.label}
                className="settings-detail-card"
                style={{ "--delay": `${index * 70}ms` }}
              >
                <div className="settings-detail-top">
                  <span className="settings-detail-icon">{detail.icon}</span>
                  <div className="settings-detail-label">{detail.label}</div>
                  {detail.interactive && (
                    <ToggleButton
                      active={detail.active}
                      onClick={detail.onToggle}
                      label={`Toggle ${detail.label}`}
                    />
                  )}
                </div>
                <div className="settings-detail-value">{detail.value}</div>
                <div className="settings-detail-hint">{detail.hint}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* Modules tab */}
      {activeTab === "modules" && (
        <div className="settings-tab-content settings-enhanced">
          <GlassCard className="settings-modules-card" hover={false}>
            <SectionHeader kicker="Modules" title="Study visibility" />
            <div className="settings-modules-list">
              {moduleProgress.map((module, i) => (
                <div
                  key={module.label}
                  className="settings-module-row"
                  style={{ "--delay": `${i * 50}ms` }}
                >
                  <div className="settings-module-row-head">
                    <span className="settings-module-label">{module.label}</span>
                    <span className="settings-module-pct">{module.value}%</span>
                  </div>
                  <div className="settings-module-track">
                    <span
                      className="settings-module-fill"
                      style={{ width: `${module.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {/* Tools tab */}
      {activeTab === "tools" && (
        <div className="settings-tab-content settings-enhanced">
          <div className="settings-tools-grid">
            {profileTools.map((tool, index) => (
              <GlassCard
                key={tool.title}
                className="settings-tool-item"
                style={{ "--delay": `${index * 80}ms` }}
              >
                <div className="settings-tool-body">
                  <div className="settings-tool-title">{tool.title}</div>
                  <div className="settings-tool-desc">{tool.description}</div>
                </div>
                <button className="settings-tool-btn" type="button">
                  Manage
                </button>
              </GlassCard>
            ))}
          </div>

          <GlassCard className="settings-next-session-card" hover={false}>
            <div className="settings-next-session-label">Next practical</div>
            <div className="settings-next-session-value">
              {studentProfile.nextSession}
            </div>
          </GlassCard>
        </div>
      )}
    </section>
  );
}
