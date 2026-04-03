"use client";

import { useEffect, useState } from "react";
import {
  heroMetrics,
  profileDetails,
  profilePerformanceCards,
  studentProfile,
} from "../data/student-profile";
import { learningUnits } from "../learn";
import { hydrateLearningProgress } from "../learn/progress-store";

function getUnitProgressRows(units) {
  return units.map((unit) => {
    const completedSubLessons = unit.lessons.reduce(
      (sum, lesson) =>
        sum + lesson.lessons.filter((entry) => entry.completed).length,
      0,
    );
    const totalSubLessons = unit.lessons.reduce(
      (sum, lesson) => sum + lesson.lessons.length,
      0,
    );

    return {
      id: unit.id,
      label: unit.label,
      title: unit.title,
      progress: totalSubLessons
        ? Math.round((completedSubLessons / totalSubLessons) * 100)
        : 0,
      completedLessons: unit.lessons.filter((lesson) =>
        lesson.lessons.every((entry) => entry.completed),
      ).length,
      totalLessons: unit.lessons.length,
      unlocked: unit.unlocked,
    };
  });
}

const PROFILE_IMAGE_KEY = "godomain-profile-image";
const DEFAULT_PROFILE_IMAGE = "/student-profile-avatar.svg";

const profileHighlights = [
  {
    label: "Track",
    value: studentProfile.track,
    meta: "Current learning lane",
  },
  {
    label: "Mentor",
    value: studentProfile.mentor,
    meta: "Assigned instructor",
  },
  {
    label: "Road hours",
    value: studentProfile.roadHours,
    meta: "Practical time logged",
  },
  {
    label: "Next practical",
    value: studentProfile.nextSession,
    meta: "Upcoming session focus",
  },
];

export default function Stats() {
  const [unitProgress, setUnitProgress] = useState(() =>
    getUnitProgressRows(learningUnits),
  );
  const [profileImage, setProfileImage] = useState(DEFAULT_PROFILE_IMAGE);

  useEffect(() => {
    setUnitProgress(
      getUnitProgressRows(hydrateLearningProgress(learningUnits)),
    );

    const storedProfileImage = window.localStorage.getItem(PROFILE_IMAGE_KEY);

    if (storedProfileImage) {
      setProfileImage(storedProfileImage);
    }
  }, []);

  function handleProfileImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== "string") {
        return;
      }

      setProfileImage(reader.result);
      window.localStorage.setItem(PROFILE_IMAGE_KEY, reader.result);
    };

    reader.readAsDataURL(file);
    event.target.value = "";
  }

  return (
    <div className="stats-shell profile-shell">
      <header className="stats-hero-block profile-hero-block">
        <div className="profile-hero-copy">
          <div className="stats-eyebrow">User profile</div>
          <h1 className="stats-title">{studentProfile.name}</h1>
          <p className="stats-subtitle">
            Personal details and course progress stay compact here, while the
            shared top navbar keeps the live learner status visible across the
            app.
          </p>

          <div className="profile-hero-tags">
            {heroMetrics.map((metric) => (
              <span key={metric.label} className="profile-hero-tag">
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="profile-hero-summary">
          <div className="profile-hero-avatar-shell">
            <div className="profile-hero-avatar">
              <img
                src={profileImage}
                alt={`${studentProfile.name} profile`}
              />
            </div>
            <label className="profile-avatar-upload" htmlFor="profile-avatar">
              Upload photo
            </label>
            <input
              id="profile-avatar"
              className="profile-avatar-input"
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
            />
          </div>
          <div className="profile-hero-meta">
            <strong>{studentProfile.level}</strong>
            <span>{studentProfile.indexNumber}</span>
            <span>{studentProfile.drivingSchool}</span>
          </div>
        </div>
      </header>

      <div className="profile-page-grid">
        <div className="profile-main-stack">
          <section className="stats-panel profile-details-panel">
            <div className="stats-section-head">
              <div className="stats-section-title">Personal details</div>
              <div className="stats-section-subtitle">
                The core learner record stays editable and easy to scan.
              </div>
            </div>

            <div className="profile-detail-grid">
              {profileDetails.map((detail) => (
                <article key={detail.label} className="profile-detail-card">
                  <span>{detail.label}</span>
                  <strong>{detail.value}</strong>
                  <p>{detail.hint}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="stats-panel progress-panel">
            <div className="stats-section-head">
              <div className="stats-section-title">Learning progress</div>
              <div className="stats-section-subtitle">
                Unit completion stays tied to the actual lesson route.
              </div>
            </div>

            <div className="stats-progress-stack">
              {unitProgress.map((unit) => (
                <article key={unit.id} className="stats-progress-row-card">
                  <div className="stats-progress-row-head">
                    <div>
                      <strong>{unit.label}</strong>
                      <span>{unit.title}</span>
                    </div>
                    <div
                      className={`stats-progress-lock ${
                        unit.unlocked ? "open" : "locked"
                      }`}
                    >
                      {unit.unlocked ? "Open" : "Locked"}
                    </div>
                  </div>
                  <div className="stats-progress-row-meta">
                    <span>
                      {unit.completedLessons}/{unit.totalLessons} lessons
                      complete
                    </span>
                    <strong>{unit.progress}%</strong>
                  </div>
                  <div className="stats-progress-row-bar" aria-hidden="true">
                    <span style={{ width: `${unit.progress}%` }} />
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="profile-side-stack">
          <section className="stats-panel performance-panel">
            <div className="stats-section-head">
              <div className="stats-section-title">Profile snapshot</div>
              <div className="stats-section-subtitle">
                Momentum, mentor context, and next action in one compact block.
              </div>
            </div>

            <div className="profile-highlight-grid">
              {profileHighlights.map((item) => (
                <article key={item.label} className="profile-highlight-card">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                  <p>{item.meta}</p>
                </article>
              ))}
            </div>

            <div className="stats-performance-grid">
              {profilePerformanceCards.map((card) => (
                <article key={card.label} className="stats-performance-card">
                  <span>{card.label}</span>
                  <strong>{card.value}</strong>
                  <p>{card.meta}</p>
                </article>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
