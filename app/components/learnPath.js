"use client";

import Link from "next/link";
import {
  startTransition,
  useEffect,
  useOptimistic,
  useRef,
  useState,
} from "react";
import { getLearningDayHref, learningDays } from "../learn";
import {
  BottomNavIcon,
  JourneyIcon,
  LearnMascot,
  LessonIcon,
  RewardChest,
} from "../learn/icons";

const BASE_STREAK = 2518;
const BASE_GEMS = 25927;
const BASE_MASTERY = 882;
const CHEST_DAY_COUNT = 2;
const BOTTOM_NAV_ITEMS = [
  { id: "path", label: "Path", icon: "home" },
  { id: "rewards", label: "Rewards", icon: "chest" },
  { id: "practice", label: "Practice", icon: "dumbbell" },
  { id: "leaderboard", label: "Leaders", icon: "trophy" },
  { id: "profile", label: "Profile", icon: "profile" },
  { id: "alerts", label: "Alerts", icon: "bell" },
];
const JOURNEY_STOPS = [
  {
    id: "guide-start",
    type: "mascot",
    x: 18,
    width: 126,
    variant: "reader",
    title: "Warm-up guide",
    subtitle: "Three stars ready to collect.",
  },
  { id: "day-01", type: "day" },
  { id: "day-02", type: "day" },
  { id: "reward-chest", type: "chest", x: 50, width: 110 },
  { id: "day-03", type: "day" },
  { id: "day-04", type: "day" },
  {
    id: "guide-finish",
    type: "mascot",
    x: 80,
    width: 120,
    variant: "spark",
    title: "Streak coach",
    subtitle: "Keep moving to light the next circle.",
  },
  { id: "day-05", type: "day" },
  { id: "day-06", type: "day" },
];

function cloneDays(days) {
  return days.map((day) => ({
    ...day,
    lessons: day.lessons.map((lesson) => ({ ...lesson })),
  }));
}

function getCurrentStopId(days) {
  return (
    days.find((day) => day.lessons.some((lesson) => !lesson.completed))?.id ??
    days.at(-1)?.id ??
    "day-01"
  );
}

function createInitialState() {
  const days = cloneDays(learningDays);

  return {
    activeNavId: "path",
    activeStopId: getCurrentStopId(days),
    chestClaimed: false,
    days,
  };
}

function learningReducer(state, action) {
  if (action.type === "select-nav") {
    return { ...state, activeNavId: action.navId };
  }

  if (action.type === "select-stop") {
    return { ...state, activeStopId: action.stopId };
  }

  if (action.type === "claim-chest") {
    return state.chestClaimed ? state : { ...state, chestClaimed: true };
  }

  if (action.type !== "toggle-lesson") {
    return state;
  }

  return {
    ...state,
    days: state.days.map((day) => {
      if (day.id !== action.dayId) {
        return day;
      }

      return {
        ...day,
        lessons: day.lessons.map((lesson) => {
          if (lesson.id !== action.lessonId) {
            return lesson;
          }

          return {
            ...lesson,
            completed: !lesson.completed,
          };
        }),
      };
    }),
  };
}

function buildDerivedState(state) {
  const days = state.days.map((day) => {
    const completedLessons = day.lessons.filter(
      (lesson) => lesson.completed,
    ).length;
    const totalLessons = day.lessons.length;
    const progress = totalLessons ? completedLessons / totalLessons : 0;

    return {
      ...day,
      completedLessons,
      totalLessons,
      progress,
      isComplete: completedLessons === totalLessons,
    };
  });

  const completedDays = days.filter((day) => day.isComplete).length;
  const completedLessons = days.reduce(
    (sum, day) => sum + day.completedLessons,
    0,
  );
  const totalLessons = days.reduce((sum, day) => sum + day.totalLessons, 0);
  const unitProgress = totalLessons
    ? Math.round((completedLessons / totalLessons) * 100)
    : 0;
  const chestUnlocked = days
    .slice(0, CHEST_DAY_COUNT)
    .every((day) => day.isComplete);

  return {
    activeNavId: state.activeNavId,
    activeStopId: state.activeStopId,
    chestClaimed: state.chestClaimed,
    days,
    completedDays,
    completedLessons,
    totalLessons,
    unitProgress,
    chestUnlocked,
    metrics: {
      streak: BASE_STREAK + completedDays * 2,
      gems: BASE_GEMS + completedLessons * 15 + (state.chestClaimed ? 90 : 0),
      mastery:
        BASE_MASTERY +
        completedLessons * 6 +
        completedDays * 14 +
        (state.chestClaimed ? 22 : 0),
    },
  };
}

function getActiveEntry(state) {
  const activeDay = state.days.find((day) => day.id === state.activeStopId);

  if (activeDay) {
    return { type: "day", day: activeDay };
  }

  if (state.activeStopId === "reward-chest") {
    return { type: "chest" };
  }

  return (
    JOURNEY_STOPS.find((stop) => stop.id === state.activeStopId) ??
    JOURNEY_STOPS[0]
  );
}

function getLessonBadge(kind) {
  if (kind === "theory") {
    return "Read";
  }

  if (kind === "board") {
    return "Board";
  }

  if (kind === "signs") {
    return "Signs";
  }

  return "Quiz";
}

export default function LearnPath() {
  const scrollRegionRef = useRef(null);
  const syncTimersRef = useRef([]);
  const [learningState, setLearningState] = useState(createInitialState);
  const [optimisticState, addOptimistic] = useOptimistic(
    learningState,
    learningReducer,
  );
  const [pendingChanges, setPendingChanges] = useState(0);
  const [syncLabel, setSyncLabel] = useState("Optimistic progress is active.");
  const derivedState = buildDerivedState(optimisticState);
  const activeEntry = getActiveEntry(derivedState);
  const currentDayId = getCurrentStopId(derivedState.days);
  const currentDayHref = getLearningDayHref(currentDayId);

  useEffect(() => {
    return () => {
      for (const timer of syncTimersRef.current) {
        window.clearTimeout(timer);
      }
    };
  }, []);

  useEffect(() => {
    const activeNode = scrollRegionRef.current?.querySelector(
      `[data-stop-id="${derivedState.activeStopId}"]`,
    );

    activeNode?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  }, [derivedState.activeStopId]);

  function previewAction(action) {
    startTransition(() => {
      addOptimistic(action);
    });
    setLearningState((current) => learningReducer(current, action));
  }

  function syncAction(action, nextLabel) {
    if (nextLabel) {
      setSyncLabel(nextLabel);
    }

    startTransition(() => {
      addOptimistic(action);
    });

    setPendingChanges((value) => value + 1);

    const timer = window.setTimeout(() => {
      setLearningState((current) => learningReducer(current, action));
      setPendingChanges((value) => Math.max(0, value - 1));
    }, 260);

    syncTimersRef.current.push(timer);
  }

  function handleSelectStop(stopId) {
    previewAction({ type: "select-stop", stopId });
  }

  function handleSelectNav(navId) {
    previewAction({ type: "select-nav", navId });
  }

  function handleLessonToggle(dayId, lesson) {
    syncAction(
      { type: "toggle-lesson", dayId, lessonId: lesson.id },
      lesson.completed
        ? `${lesson.title} reverted.`
        : `${lesson.title} marked complete.`,
    );
  }

  function handleClaimChest() {
    syncAction({ type: "claim-chest" }, "Reward chest claimed.");
  }

  function handleScrollTop() {
    scrollRegionRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="learn-shell">
      <div className="learn-phone">
        <div className="learn-status-bar">
          <div className="learn-clock">10:37</div>
          <div className="learn-status-icons" aria-hidden="true">
            <span className="status-bars">
              <i />
              <i />
              <i />
            </span>
            <span className="status-wave" />
            <span className="status-battery">
              <b />
            </span>
          </div>
        </div>

        <header className="learn-top">
          <button className="metric-chip locale" type="button">
            <span className="metric-flag-badge" aria-hidden="true">
              KE
            </span>
            <span>Kenya</span>
          </button>
          <button className="metric-chip" type="button">
            <span className="metric-flame" aria-hidden="true" />
            <span>{derivedState.metrics.streak}</span>
          </button>
          <button className="metric-chip bright" type="button">
            <span className="metric-gem" aria-hidden="true" />
            <span>{derivedState.metrics.gems}</span>
          </button>
          <button className="metric-chip accent" type="button">
            <span className="metric-award" aria-hidden="true" />
            <span>{derivedState.metrics.mastery}</span>
          </button>
        </header>

        <section className="unit-card">
          <div className="unit-copy">
            <div className="unit-topline">
              <div className="unit-eyebrow">SECTION 2, UNIT 2</div>
              <div
                className={`unit-sync ${pendingChanges ? "busy" : ""}`}
                aria-live="polite"
              >
                {pendingChanges ? "Syncing..." : "Live"}
              </div>
            </div>
            <h1 className="unit-title">Master the road learning path</h1>
            <div className="unit-subtitle">
              Complete theory notes, model town board drills, road signs, and
              quizzes to close every lesson circle.
            </div>
            <div className="unit-progress-bar" aria-hidden="true">
              <span style={{ width: `${derivedState.unitProgress}%` }} />
            </div>
          </div>
          <Link
            className="unit-action"
            aria-label="View unit guide"
            href={currentDayHref}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M8 6H19M8 12H19M8 18H19M4 6H4.01M4 12H4.01M4 18H4.01"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
          </Link>
        </section>

        <div className="learn-main-grid">
          <div className="learn-scroll-frame">
            <div className="path-area" ref={scrollRegionRef}>
              <div className="path-header">
                <div>
                  <div className="path-title">Learning path</div>
                  <div className="path-subtitle">
                    {derivedState.completedLessons} of {derivedState.totalLessons}{" "}
                    sub-units completed
                  </div>
                </div>
                <div className="path-progress">{derivedState.unitProgress}%</div>
              </div>

              <div className="learn-journey">
                {JOURNEY_STOPS.map((stop, index) => {
                  if (stop.type === "day") {
                    const day = derivedState.days.find(
                      (entry) => entry.id === stop.id,
                    );

                    if (!day) {
                      return null;
                    }

                    const isActive = derivedState.activeStopId === day.id;
                    const dayHref = getLearningDayHref(day.id);
                    const positionStyle = {
                      marginInlineStart: `calc(${day.x}% - 48px)`,
                      animationDelay: `${index * 70}ms`,
                      "--progress": day.progress,
                    };

                    return (
                      <div
                        key={day.id}
                        className="learn-stop day"
                        style={positionStyle}
                        data-stop-id={day.id}
                      >
                        <Link
                          className={`journey-node ${
                            day.isComplete ? "complete" : "available"
                          } ${isActive ? "active" : ""}`}
                          href={dayHref}
                          onMouseEnter={() => handleSelectStop(day.id)}
                          onFocus={() => handleSelectStop(day.id)}
                          aria-label={`Open ${day.title}`}
                        >
                          <span className="journey-node-core">
                            <JourneyIcon name={day.icon} />
                          </span>
                        </Link>
                        <Link
                          className="journey-label"
                          href={dayHref}
                          onMouseEnter={() => handleSelectStop(day.id)}
                          onFocus={() => handleSelectStop(day.id)}
                        >
                          <span>{day.label}</span>
                          <strong>
                            {day.completedLessons}/{day.totalLessons}
                          </strong>
                        </Link>
                      </div>
                    );
                  }

                  if (stop.type === "chest") {
                    return (
                      <div
                        key={stop.id}
                        className="learn-stop chest"
                        style={{
                          marginInlineStart: `calc(${stop.x}% - ${stop.width / 2}px)`,
                          animationDelay: `${index * 70}ms`,
                        }}
                        data-stop-id={stop.id}
                      >
                        <button
                          className={`learn-stop-button ${
                            derivedState.activeStopId === stop.id ? "active" : ""
                          }`}
                          type="button"
                          onClick={() => handleSelectStop(stop.id)}
                          aria-pressed={derivedState.activeStopId === stop.id}
                        >
                          <RewardChest
                            unlocked={derivedState.chestUnlocked}
                            claimed={derivedState.chestClaimed}
                          />
                        </button>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={stop.id}
                      className={`learn-stop mascot ${stop.variant}`}
                      style={{
                        marginInlineStart: `calc(${stop.x}% - ${stop.width / 2}px)`,
                        animationDelay: `${index * 70}ms`,
                      }}
                      data-stop-id={stop.id}
                    >
                      <button
                        className={`learn-stop-button ${
                          derivedState.activeStopId === stop.id ? "active" : ""
                        }`}
                        type="button"
                        onClick={() => handleSelectStop(stop.id)}
                        aria-pressed={derivedState.activeStopId === stop.id}
                      >
                        <LearnMascot variant={stop.variant} />
                      </button>
                      <div className="mascot-stars" aria-hidden="true">
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                className="learn-scroll-top"
                type="button"
                onClick={handleScrollTop}
                aria-label="Scroll to top"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M12 18V6M7 11L12 6L17 11"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <section className="learn-detail-sheet">
            <div className="detail-top">
              <div>
                <div className="detail-eyebrow">
                  {
                    BOTTOM_NAV_ITEMS.find(
                      (item) => item.id === derivedState.activeNavId,
                    )?.label
                  }
                </div>
                <div className="detail-title">
                  {activeEntry.type === "day"
                    ? activeEntry.day.title
                    : activeEntry.type === "chest"
                      ? "Reward chest"
                      : activeEntry.title}
                </div>
              </div>
              <div className={`detail-sync ${pendingChanges ? "busy" : ""}`}>
                {syncLabel}
              </div>
            </div>

            {activeEntry.type === "day"
              ? <>
                  <div className="detail-summary">
                    <p>{activeEntry.day.subtitle}</p>
                    <div className="detail-summary-actions">
                      <div className="detail-progress-pill">
                        {activeEntry.day.completedLessons} /{" "}
                        {activeEntry.day.totalLessons} complete
                      </div>
                      <Link
                        className="detail-inline-link"
                        href={getLearningDayHref(activeEntry.day.id)}
                      >
                        Open day page
                      </Link>
                    </div>
                  </div>
                  <div className="detail-lesson-list">
                    {activeEntry.day.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        className={`detail-lesson ${lesson.completed ? "done" : ""}`}
                        type="button"
                        onClick={() =>
                          handleLessonToggle(activeEntry.day.id, lesson)
                        }
                        aria-pressed={lesson.completed}
                      >
                        <span className="detail-lesson-icon">
                          <LessonIcon kind={lesson.kind} />
                        </span>
                        <span className="detail-lesson-copy">
                          <strong>{lesson.title}</strong>
                          <small>
                            {lesson.duration} - {lesson.detail}
                          </small>
                        </span>
                        <span className="detail-lesson-state">
                          <em>{getLessonBadge(lesson.kind)}</em>
                          <b>{lesson.completed ? "Done" : "Start"}</b>
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              : null}

            {activeEntry.type === "chest"
              ? <div className="detail-bonus-card">
                  <p>
                    Claim the bonus chest after completing the first{" "}
                    {CHEST_DAY_COUNT} day circles. The reward adds gems and
                    mastery instantly.
                  </p>
                  <div className="detail-bonus-meta">
                    <span>
                      {derivedState.chestUnlocked ? "Ready to unlock" : "Locked"}
                    </span>
                    <span>
                      {derivedState.chestClaimed ? "Claimed" : "+90 gems"}
                    </span>
                  </div>
                  <button
                    className="detail-primary-action"
                    type="button"
                    disabled={
                      !derivedState.chestUnlocked || derivedState.chestClaimed
                    }
                    onClick={handleClaimChest}
                  >
                    {derivedState.chestClaimed
                      ? "Reward claimed"
                      : derivedState.chestUnlocked
                        ? "Claim reward"
                        : "Finish earlier days"}
                  </button>
                </div>
              : null}

            {activeEntry.type === "mascot"
              ? <div className="detail-bonus-card mascot-copy">
                  <p>{activeEntry.subtitle}</p>
                  <div className="detail-bonus-meta">
                    <span>{derivedState.completedDays} day circles closed</span>
                    <span>{derivedState.metrics.streak} streak points</span>
                  </div>
                  <button
                    className="detail-primary-action secondary"
                    type="button"
                    onClick={() =>
                      handleSelectStop(getCurrentStopId(derivedState.days))
                    }
                  >
                    Jump to current day
                  </button>
                </div>
              : null}
          </section>
        </div>

        <nav className="learn-bottom-nav" aria-label="Learning path tabs">
          {BOTTOM_NAV_ITEMS.map((item) => {
            const isActive = item.id === derivedState.activeNavId;

            return (
              <button
                key={item.id}
                className={`learn-nav-item ${isActive ? "active" : ""}`}
                type="button"
                onClick={() => handleSelectNav(item.id)}
                aria-pressed={isActive}
              >
                <span className="learn-nav-icon">
                  <BottomNavIcon name={item.icon} />
                </span>
                <span className="learn-nav-label">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
