"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const THEME_KEY = "godomain-theme";
const studentProfile = {
  name: "Ari Rowe",
  indexNumber: "GD/24/0184",
  phoneNumber: "+254 712 684 390",
  county: "Kiambu",
  drivingSchool: "GoDomain Driving Academy",
  age: "21 years",
  track: "Class B learner permit",
  nextSession: "Reverse parking drill",
  progress: 78,
  lessonsComplete: "32 / 41 lessons",
  roadHours: "38 hours",
  attendance: "96%",
};

const heroMetrics = [
  { label: "Learning progress", value: `${studentProfile.progress}%` },
  { label: "Lessons complete", value: studentProfile.lessonsComplete },
  { label: "Attendance", value: studentProfile.attendance },
];

const profileDetails = [
  {
    label: "Index number",
    value: studentProfile.indexNumber,
    hint: "Exam batch 04",
  },
  {
    label: "Full name",
    value: studentProfile.name,
    hint: "Learner profile is active",
  },
  {
    label: "Phone number",
    value: studentProfile.phoneNumber,
    hint: "Primary contact line",
  },
  {
    label: "County",
    value: studentProfile.county,
    hint: "Regional test center assignment",
  },
  {
    label: "Driving school",
    value: studentProfile.drivingSchool,
    hint: "Main campus intake",
  },
  {
    label: "Age",
    value: studentProfile.age,
    hint: "Verified learner age",
  },
];

const moduleProgress = [
  { label: "Traffic signs", value: 92 },
  { label: "Parking control", value: 74 },
  { label: "Road positioning", value: 68 },
];

const profileTools = [
  {
    title: "Profile header",
    description: "Refresh your banner, photo, and display details.",
  },
  {
    title: "Learning alerts",
    description: "Keep practical sessions and reminder notices visible.",
  },
  {
    title: "Mentor access",
    description: "Share your learner summary with your driving instructor.",
  },
];

export default function Setting() {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia?.(
      "(prefers-color-scheme: dark)",
    ).matches;
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
    <section className="settings-profile">
      <header className="settings-profile-hero card">
        <div className="settings-profile-hero-top">
          <div>
            <div className="settings-profile-eyebrow">Student profile</div>
            <h1 className="settings-profile-title">Learning identity center</h1>
            <p className="settings-profile-subtitle">
              View personal details, learner status, and training momentum in
              one polished workspace.
            </p>
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

        <div className="settings-profile-hero-body">
          <div className="settings-profile-avatar-shell">
            <div className="settings-profile-avatar-ring" aria-hidden="true" />
            <div className="settings-profile-avatar">
              <Image
                src="/student-profile-avatar.svg"
                alt={`${studentProfile.name} profile illustration`}
                width={180}
                height={180}
                priority
              />
            </div>
          </div>

          <div className="settings-profile-identity">
            <div className="settings-profile-status-row">
              <span className="settings-profile-status">Profile active</span>
              <span className="settings-profile-track">
                {studentProfile.track}
              </span>
            </div>
            <h2 className="settings-profile-name">{studentProfile.name}</h2>
            <p className="settings-profile-note">
              {studentProfile.drivingSchool} learner focused on disciplined road
              habits, smooth parking control, and weekly consistency.
            </p>
            <div className="settings-profile-chip-row">
              <span>{studentProfile.indexNumber}</span>
              <span>{studentProfile.county}</span>
              <span>{studentProfile.age}</span>
            </div>
          </div>

          <div className="settings-profile-metrics">
            {heroMetrics.map((item) => (
              <article key={item.label} className="settings-profile-metric">
                <div className="settings-profile-metric-label">
                  {item.label}
                </div>
                <div className="settings-profile-metric-value">
                  {item.value}
                </div>
              </article>
            ))}
          </div>
        </div>
      </header>

      <div className="settings-profile-layout">
        <section className="settings-profile-panel card">
          <div className="settings-profile-section-head">
            <div>
              <div className="settings-profile-section-kicker">
                Personal details
              </div>
              <h3 className="settings-profile-section-title">
                Learner record snapshot
              </h3>
            </div>
            <button className="ghost-button" type="button">
              Update profile
            </button>
          </div>

          <div className="settings-profile-detail-grid">
            {profileDetails.map((detail, index) => (
              <article
                key={detail.label}
                className="settings-profile-detail-card"
                style={{ "--tile-delay": `${index * 80}ms` }}
              >
                <div className="settings-profile-detail-label">
                  {detail.label}
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
          <section className="settings-profile-panel settings-progress-panel card">
            <div className="settings-profile-section-kicker">
              Learning progress
            </div>
            <h3 className="settings-profile-section-title">
              Weekly performance line
            </h3>
            <p className="settings-profile-panel-note">
              The learner is closing in on the practical assessment target with
              stable lesson attendance and improved parking control.
            </p>

            <div className="settings-progress-hero">
              <div>
                <div className="settings-progress-value">
                  {studentProfile.progress}%
                </div>
                <div className="settings-progress-caption">
                  Total course completion
                </div>
              </div>
              <div className="settings-progress-meta">
                <span>{studentProfile.lessonsComplete}</span>
                <span>{studentProfile.roadHours}</span>
              </div>
            </div>

            <div
              className="settings-progress-track"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={studentProfile.progress}
              aria-label="Learning progress"
            >
              <span style={{ width: `${studentProfile.progress}%` }} />
            </div>

            <div className="settings-progress-stack">
              {moduleProgress.map((module) => (
                <div key={module.label} className="settings-progress-item">
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

          <section className="settings-profile-panel settings-tools-panel card">
            <div className="settings-profile-section-kicker">Profile tools</div>
            <h3 className="settings-profile-section-title">
              Quick account controls
            </h3>

            <div className="settings-tools-list">
              {profileTools.map((tool, index) => (
                <article
                  key={tool.title}
                  className="settings-tool-card"
                  style={{ "--tile-delay": `${index * 90}ms` }}
                >
                  <div>
                    <div className="settings-tool-title">{tool.title}</div>
                    <div className="settings-tool-description">
                      {tool.description}
                    </div>
                  </div>
                  <button className="ghost-button" type="button">
                    Manage
                  </button>
                </article>
              ))}
            </div>

            <div className="settings-next-session">
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
