"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getLearningDayHref, learningUnits } from "..";
import {
  deriveLearningProgress,
  hydrateLearningProgress,
  persistLearningProgress,
} from "../progress-store";

/* ─── Day labels ─── */
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

/* ─── Zigzag offsets matching the Duolingo S-curve path ─── */
/* ─── Per-lesson icon types (5 lessons per unit, each unique) ─── */
const ICON_SEQUENCE = ["star", "star", "headphones", "mic", "star"];

function getCompletedSteps(lesson) {
  return lesson.lessons.filter((entry) => entry.completed).length;
}

/* ════════════════════════════════════════
   SVG ICONS
════════════════════════════════════════ */
function IconStar({ color }) {
  return (
    <svg viewBox="0 0 32 32" fill={color} aria-hidden="true">
      <path d="M16 4l3.1 6.9 7.6 1-5.5 5.4 1.3 7.6L16 21.2l-6.5 3.7 1.3-7.6L5.3 11.9l7.6-1z" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M7 17l5.5 5.5L25 10"
        stroke="#fff"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconHeadphones({ color }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M6 17C6 10.4 10.5 5 16 5s10 5.4 10 12"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <rect x="4" y="17" width="6" height="9" rx="3" fill={color} />
      <rect x="22" y="17" width="6" height="9" rx="3" fill={color} />
    </svg>
  );
}
function IconMic({ color }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="11" y="4" width="10" height="14" rx="5" fill={color} />
      <path
        d="M7 16c0 5 4 9 9 9s9-4 9-9"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <line
        x1="16"
        y1="25"
        x2="16"
        y2="29"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <line
        x1="11"
        y1="29"
        x2="21"
        y2="29"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconTrophy({ color }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke={color}
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M10 5H22V12C22 15.9 19.3 19 16 19C12.7 19 10 15.9 10 12V5Z" />
      <path
        d="M10 6H5V9C5 12.8 7.7 16 11 17M22 6H27V9C27 12.8 24.3 16 21 17"
        strokeLinecap="round"
      />
      <path d="M16 19V25M11 28H21" strokeLinecap="round" />
    </svg>
  );
}
function IconLock({ color }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M10 14V11C10 7.7 12.7 5 16 5s6 2.7 6 6v3"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <rect x="7" y="14" width="18" height="13" rx="3.5" fill={color} />
    </svg>
  );
}

function NodeIcon({ type, color }) {
  if (type === "check") return <IconCheck />;
  if (type === "star") return <IconStar color={color} />;
  if (type === "headphones") return <IconHeadphones color={color} />;
  if (type === "mic") return <IconMic color={color} />;
  if (type === "trophy") return <IconTrophy color={color} />;
  if (type === "lock") return <IconLock color={color} />;
  return <IconStar color={color} />;
}

/* ════════════════════════════════════════
   OWL MASCOT  (matches both images)
════════════════════════════════════════ */
function OwlMascot({ active }) {
  return (
    <div
      className={`lp-owl${active ? " lp-owl--active" : ""}`}
      aria-hidden="true"
    >
      <div className="lp-owl-body">
        <div className="lp-owl-wing lp-owl-wing--l" />
        <div className="lp-owl-wing lp-owl-wing--r" />
        <div className="lp-owl-face">
          <div className="lp-owl-eye lp-owl-eye--l">
            <div className="lp-owl-pupil" />
          </div>
          <div className="lp-owl-eye lp-owl-eye--r">
            <div className="lp-owl-pupil" />
          </div>
          <div className="lp-owl-beak" />
        </div>
        <div className="lp-owl-belly" />
        <div className="lp-owl-feet">
          <div className="lp-owl-foot" />
          <div className="lp-owl-foot" />
        </div>
      </div>
      <div className="lp-owl-base" />
    </div>
  );
}

/* ════════════════════════════════════════
   STAR RATING
════════════════════════════════════════ */
function Stars({ earned = 0 }) {
  return (
    <div className="lp-stars" role="img" aria-label={`${earned} of 3 stars`}>
      {[0, 1, 2].map((i) => (
        <svg
          key={i}
          viewBox="0 0 22 22"
          width="22"
          height="22"
          aria-hidden="true"
        >
          <path
            d="M11 2.5l2.6 5.5 6 .9-4.3 4.2 1 6L11 16.2l-5.3 2.9 1-6L2.4 8.9l6-.9z"
            fill={i < earned ? "#fbbf24" : "none"}
            stroke={i < earned ? "#f59e0b" : "#9ca3af"}
            strokeWidth="1.5"
          />
        </svg>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════
   TREASURE CHEST
════════════════════════════════════════ */
function Chest({ unlocked, claimed }) {
  const cls = [
    "lp-chest",
    unlocked && "lp-chest--open",
    claimed && "lp-chest--claimed",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={cls} aria-hidden="true">
      <div className="lp-chest-lid">
        <div className="lp-chest-lid-band" />
      </div>
      <div className="lp-chest-body">
        <div className="lp-chest-body-band" />
        <div className="lp-chest-lock" />
      </div>
      <div className="lp-chest-shadow" />
    </div>
  );
}

/* ════════════════════════════════════════
   CONTINUE / START TOOLTIP
════════════════════════════════════════ */
function Tooltip({ href, label }) {
  return (
    <div className="lp-tooltip">
      <Link className="lp-tooltip-cta" href={href}>
        {label}
      </Link>
      <div className="lp-tooltip-arrow" />
    </div>
  );
}

/* ════════════════════════════════════════
   SINGLE LESSON NODE
════════════════════════════════════════ */
function LessonNode({ lesson, lessonIndex, isCurrent, onSelect }) {
  const done = lesson.progress === 100;
  const locked = !done && lesson.isLocked;
  const future = !done && !isCurrent;
  const inert = locked || future;
  const offset = lessonIndex % 2 === 0 ? -72 : 72;
  const day = DAYS[lessonIndex] ?? `Day ${lessonIndex + 1}`;
  const completedSteps = getCompletedSteps(lesson);
  const totalSteps = lesson.lessons.length || 4;
  const filledSegments = done
    ? 4
    : Math.min(4, Math.round((completedSteps / totalSteps) * 4));
  const segmentColor = "#58cc02";
  const emptySegmentColor = "#d1d5db";

  let iconType = ICON_SEQUENCE[lessonIndex % ICON_SEQUENCE.length];
  let iconColor = "#c4c9d4";
  if (done) {
    iconType = "check";
    iconColor = "#fff";
  }
  if (inert) {
    iconType = locked ? "lock" : iconType;
    iconColor = "#94a3b8";
  }
  if (isCurrent && !done) {
    iconColor = "#fff";
  }

  const cls = [
    "lp-node",
    done ? "lp-node--done" : "",
    isCurrent && !done ? "lp-node--current" : "",
    locked ? "lp-node--locked" : "",
    future ? "lp-node--future" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="lp-node-wrap" style={{ "--lp-x": `${offset}px` }}>
      {isCurrent && !done && (
        <Tooltip href={getLearningDayHref(lesson.id)} label="START" />
      )}
      {done && isCurrent && (
        <Tooltip href={getLearningDayHref(lesson.id)} label="REVIEW" />
      )}

      <button
        type="button"
        className={cls}
        onClick={() => !inert && onSelect(lesson.id)}
        aria-label={`${day}: ${lesson.title}${inert ? " unavailable" : ""}`}
        disabled={inert}
        style={{
          "--seg-1": filledSegments >= 1 ? segmentColor : emptySegmentColor,
          "--seg-2": filledSegments >= 2 ? segmentColor : emptySegmentColor,
          "--seg-3": filledSegments >= 3 ? segmentColor : emptySegmentColor,
          "--seg-4": filledSegments >= 4 ? segmentColor : emptySegmentColor,
        }}
      >
        {isCurrent && !done && (
          <span className="lp-node-ring" aria-hidden="true" />
        )}
        <span className="lp-node-icon">
          <NodeIcon type={iconType} color={iconColor} />
        </span>
      </button>

      <span className="lp-node-day">{day}</span>
    </div>
  );
}

/* ════════════════════════════════════════
   UNIT BANNER  (green strip)
════════════════════════════════════════ */
function UnitBanner({ unit }) {
  return (
    <div className="lp-banner">
      <div className="lp-banner-copy">
        <span className="lp-banner-eyebrow">
          Section {unit.number}, {unit.label}
        </span>
        <span className="lp-banner-title">{unit.title}</span>
      </div>
      <button type="button" className="lp-banner-guide" aria-label="Unit guide">
        <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
          <title>Unit guide</title>
          <rect
            x="4"
            y="4"
            width="16"
            height="16"
            rx="3"
            stroke="currentColor"
            strokeWidth="2.2"
          />
          <path
            d="M8 8h8M8 12h6M8 16h4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}

/* ════════════════════════════════════════
   FULL UNIT PATH SECTION
════════════════════════════════════════ */
function UnitSection({ unit, currentLessonId, onSelectLesson }) {
  const chestUnlocked = unit.progress > 0;
  const chestClaimed = unit.progress === 100;
  const lessonsLeft = unit.lessons.filter((l) => l.progress < 100).length;

  /* mascot appears beside lesson index 2, chest beside lesson index 3 */
  const MASCOT_AT = 2;
  const CHEST_AT = 3;

  return (
    <div className="lp-unit">
      <UnitBanner unit={unit} />

      <div className="lp-path">
        {unit.lessons.map((lesson, i) => {
          const isCurrent = lesson.id === currentLessonId;

          return (
            <div key={lesson.id} className="lp-path-step">
              {/* dashed connector from previous node */}
              {i > 0 && <div className="lp-connector" />}

              {/* node row — node + optional side element */}
              <div className="lp-step-row">
                <LessonNode
                  lesson={lesson}
                  lessonIndex={i}
                  isCurrent={isCurrent}
                  onSelect={onSelectLesson}
                />

                {i === MASCOT_AT && (
                  <div className="lp-side lp-side--right">
                    <OwlMascot active={chestUnlocked} />
                    <Stars earned={chestUnlocked ? 1 : 0} />
                  </div>
                )}

                {i === CHEST_AT && (
                  <div className="lp-side lp-side--left">
                    <Chest unlocked={chestUnlocked} claimed={chestClaimed} />
                    {!chestClaimed && (
                      <span className="lp-chest-hint">
                        {lessonsLeft} to unlock
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* connector + trophy */}
        <div className="lp-connector" />
        <div className="lp-path-step">
          <div className="lp-step-row">
            <div className="lp-node-wrap" style={{ "--lp-x": "0px" }}>
              <div className="lp-node lp-node--locked lp-node--trophy">
                <span className="lp-node-icon">
                  <NodeIcon type="trophy" color="#b0b8c4" />
                </span>
              </div>
              <span className="lp-node-day">Unit end</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   HELPERS
════════════════════════════════════════ */
function getCurrentLesson(units) {
  for (const unit of units) {
    for (const lesson of unit.lessons) {
      if (!lesson.isLocked && lesson.progress < 100) return lesson;
    }
  }
  return null;
}

const _init = deriveLearningProgress(learningUnits);
const _initCur = getCurrentLesson(_init);

/* ════════════════════════════════════════
   ROOT SHELL
════════════════════════════════════════ */
export default function LearningPathShell() {
  const [units, setUnits] = useState(() => _init);
  const [hydrated, setHydrated] = useState(false);
  const [_activeId, setActiveId] = useState(
    _initCur?.id ?? _init[0]?.lessons[0]?.id ?? "",
  );
  const [activeUnitIndex, setActiveUnitIndex] = useState(0);

  const currentLesson = getCurrentLesson(units);

  useEffect(() => {
    const h = hydrateLearningProgress(learningUnits);
    const cur = getCurrentLesson(h);
    setUnits(h);
    setActiveId(cur?.id ?? h[0]?.lessons[0]?.id ?? "");
    const unitIndex = h.findIndex((unit) =>
      unit.lessons.some((lesson) => lesson.id === cur?.id),
    );
    setActiveUnitIndex(Math.max(0, unitIndex));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) persistLearningProgress(units);
  }, [hydrated, units]);

  const totalLessons = units.reduce((s, u) => s + u.lessons.length, 0);
  const completedLessons = units.reduce((s, u) => s + u.completedLessons, 0);
  const totalSteps = units.reduce((s, u) => s + u.totalSubLessons, 0);
  const completedSteps = units.reduce((s, u) => s + u.completedSubLessons, 0);
  const pct = totalSteps ? Math.round((completedSteps / totalSteps) * 100) : 0;
  const activeUnit = units[activeUnitIndex] ?? units[0];
  const canGoPrev = activeUnitIndex > 0;
  const canGoNext = activeUnitIndex < units.length - 1;

  return (
    <div className="lp-shell">
      {/* ── top progress bar ── */}
      <div className="lp-topbar">
        <div className="lp-topbar-track">
          <div className="lp-topbar-fill" style={{ width: `${pct}%` }} />
        </div>
        <span className="lp-topbar-label">
          {pct}% · {completedLessons}/{totalLessons} lessons
        </span>
      </div>

      {/* ── all unit paths ── */}
      <div className="lp-units">
        {activeUnit
          ? <UnitSection
              key={activeUnit.id}
              unit={activeUnit}
              currentLessonId={currentLesson?.id ?? ""}
              onSelectLesson={setActiveId}
            />
          : null}
      </div>
      <div className="lp-unit-controls">
        <button
          type="button"
          className="lp-unit-nav-btn"
          disabled={!canGoPrev}
          onClick={() => setActiveUnitIndex((index) => Math.max(0, index - 1))}
        >
          Previous
        </button>
        <span className="lp-unit-nav-status">
          Unit {activeUnitIndex + 1} of {units.length}
        </span>
        <button
          type="button"
          className="lp-unit-nav-btn"
          disabled={!canGoNext}
          onClick={() =>
            setActiveUnitIndex((index) => Math.min(units.length - 1, index + 1))
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}
