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

export default function Setting() {
  const { theme, mounted, toggleTheme } = useThemePreference();
  const [lessonReminders, setLessonReminders] = useState(true);
  const [mentorSharing, setMentorSharing] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  const darkMode = mounted && theme === "dark";

  const settingPreferences = [
    {
      label: "Theme mode",
      value: darkMode ? "Dark mode active" : "Light mode active",
      hint: "The full interface updates instantly when you switch theme.",
      interactive: true,
      active: darkMode,
      onToggle: toggleTheme,
    },
    {
      label: "Profile page",
      value: "Professional learner view",
      hint: "Profile and progress data now sit in a polished adaptive layout.",
    },
    {
      label: "Alerts",
      value: lessonReminders ? "Lesson reminders on" : "Lesson reminders off",
      hint: "Uploads, deadlines, and live sessions remain visible when enabled.",
      interactive: true,
      active: lessonReminders,
      onToggle: () => setLessonReminders((prev) => !prev),
    },
    {
      label: "Mentor sharing",
      value: mentorSharing ? "Enabled" : "Disabled",
      hint: "Your assigned mentor can review learner progress when enabled.",
      interactive: true,
      active: mentorSharing,
      onToggle: () => setMentorSharing((prev) => !prev),
    },
  ];

  const preferenceControls = [
    {
      title: "Lesson reminders",
      description:
        "Receive updates for upcoming sessions, reviews, and instructor uploads.",
      active: lessonReminders,
      onToggle: () => setLessonReminders((prev) => !prev),
    },
    {
      title: "Mentor sharing",
      description:
        "Allow your instructor to monitor your learner dashboard and feedback trail.",
      active: mentorSharing,
      onToggle: () => setMentorSharing((prev) => !prev),
    },
    {
      title: "Auto-save progress",
      description:
        "Keep lesson state, profile actions, and revision activity saved as you work.",
      active: autoSave,
      onToggle: () => setAutoSave((prev) => !prev),
    },
  ];

  const workspaceChips = [
    studentProfile.track,
    studentProfile.nextSession,
    `${studentProfile.attendance} attendance`,
  ];

  return (
    <section className="settings-page">
      <div className="settings-section brutal-card settings-enhanced">
        <div className="settings-section-title">Workspace</div>
        <div className="settings-section-subtitle">
          Theme, alerts, and study controls.
        </div>

        <div className="settings-theme-toggle-wrapper settings-glass">
          <div className="settings-theme-toggle">
            <div className="settings-theme-toggle-icon">
              <ThemeIllustration darkMode={darkMode} />
            </div>
            <div className="settings-theme-toggle-content">
              <h3>{darkMode ? "Dark mode" : "Light mode"}</h3>
              <p>Switch between bright and low-glare mode.</p>
            </div>
          </div>
          <ToggleButton
            active={darkMode}
            onClick={toggleTheme}
            label="Toggle application theme"
          />
        </div>

        <div className="settings-preferences settings-glass">
          {preferenceControls.map((item) => (
            <div
              key={item.title}
              className="settings-preference-item settings-interactive"
            >
              <div className="settings-preference-content">
                <div className="settings-preference-title">{item.title}</div>
                <div className="settings-preference-description">
                  {item.description}
                </div>
              </div>
              <ToggleButton
                active={item.active}
                onClick={item.onToggle}
                label={`Toggle ${item.title}`}
              />
            </div>
          ))}
        </div>

        <div className="settings-chips settings-glass">
          {workspaceChips.map((chip) => (
            <span key={chip} className="settings-chip settings-interactive">
              {chip}
            </span>
          ))}
        </div>
      </div>

      <div className="settings-profile-layout">
        <section className="settings-profile-panel brutal-card settings-glass settings-enhanced">
          <div className="settings-profile-section-head">
            <div>
              <div className="settings-profile-section-kicker">Preferences</div>
              <h3 className="settings-profile-section-title">
                Workspace setup
              </h3>
            </div>
          </div>

          <div className="settings-profile-detail-grid">
            {settingPreferences.map((detail, index) => (
              <article
                key={detail.label}
                className="settings-profile-detail-card settings-interactive"
                style={{ "--tile-delay": `${index * 70}ms` }}
              >
                <div className="settings-profile-detail-header">
                  <div className="settings-profile-detail-label">
                    {detail.label}
                  </div>
                  {detail.interactive
                    ? <ToggleButton
                        active={detail.active}
                        onClick={detail.onToggle}
                        label={`Toggle ${detail.label}`}
                      />
                    : null}
                </div>
                <div className="settings-profile-detail-value">
                  {detail.value}
                </div>
                <div className="settings-profile-detail-hint">
                  {detail.hint}
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="settings-profile-side">
          <section className="settings-profile-panel settings-progress-panel brutal-card settings-glass settings-enhanced">
            <div className="settings-profile-section-kicker">Modules</div>
            <h3 className="settings-profile-section-title">Study visibility</h3>
            <div className="settings-progress-stack">
              {moduleProgress.map((module) => (
                <div
                  key={module.label}
                  className="settings-progress-item settings-interactive"
                >
                  <div className="settings-progress-item-row">
                    <span>{module.label}</span>
                    <span>{module.value}%</span>
                  </div>
                  <div
                    className="settings-progress-mini-track"
                    aria-hidden="true"
                  >
                    <span style={{ width: `${module.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="settings-profile-panel settings-tools-panel brutal-card settings-glass settings-enhanced">
            <div className="settings-profile-section-kicker">Tools</div>
            <h3 className="settings-profile-section-title">Quick controls</h3>
            <div className="settings-tools-list">
              {profileTools.map((tool, index) => (
                <article
                  key={tool.title}
                  className="settings-tool-card settings-interactive"
                  style={{ "--tile-delay": `${index * 90}ms` }}
                >
                  <div>
                    <div className="settings-tool-title">{tool.title}</div>
                    <div className="settings-tool-description">
                      {tool.description}
                    </div>
                  </div>
                  <button
                    className="ghost-button settings-interactive"
                    type="button"
                  >
                    Manage
                  </button>
                </article>
              ))}
            </div>
            <div className="settings-next-session settings-glass">
              <div className="settings-next-session-label">Next practical</div>
              <div className="settings-next-session-value">
                {studentProfile.nextSession}
              </div>
            </div>
          </section>
        </aside>
      </div>
    </section>
  );
}
