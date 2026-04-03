"use client";

import Link from "next/link";
import { Fragment, useEffect, useMemo, useState } from "react";
import { studentProfile } from "../../data/student-profile";
import { getLearningDayHref, learningOverview, learningUnits } from "..";
import { LearnMascot, RewardChest } from "../icons";
import {
  deriveLearningProgress,
  hydrateLearningProgress,
  persistLearningProgress,
} from "../progress-store";
import LessonCard from "./lesson-card";
import LessonDetail from "./lesson-detail";
import UnitStrip from "./unit-strip";

const boardFilters = [
  { id: "all", label: "All lessons" },
  { id: "focus", label: "Continue" },
  { id: "complete", label: "Completed" },
];

function getFirstLesson(unit) {
  return unit?.lessons[0] ?? null;
}

function getUnitLeadLesson(unit) {
  if (!unit) {
    return null;
  }

  return (
    unit.lessons.find((lesson) => !lesson.isLocked && lesson.progress < 100) ??
    unit.lessons.find((lesson) => !lesson.isLocked) ??
    getFirstLesson(unit)
  );
}

function getCurrentLesson(units) {
  for (const unit of units) {
    for (const lesson of unit.lessons) {
      if (!lesson.isLocked && lesson.progress < 100) {
        return lesson;
      }
    }
  }

  return null;
}

function getVisibleLessons(lessons, filterId, currentLessonId) {
  if (filterId === "focus") {
    const currentMatch = lessons.find(
      (lesson) => lesson.id === currentLessonId,
    );

    return lessons.filter((lesson) => {
      if (lesson.isLocked) {
        return false;
      }

      if (lesson.id === currentMatch?.id) {
        return true;
      }

      return lesson.progress > 0 && lesson.progress < 100;
    });
  }

  if (filterId === "complete") {
    return lessons.filter((lesson) => lesson.progress === 100);
  }

  return lessons;
}

function getCompletionRun(units) {
  let completionRun = 0;

  for (const lesson of units.flatMap((unit) => unit.lessons)) {
    if (lesson.progress === 100) {
      completionRun += 1;
      continue;
    }

    break;
  }

  return completionRun;
}

function getNextOpenLesson(units, lessonId) {
  const lessons = units.flatMap((unit) => unit.lessons);
  const currentIndex = lessons.findIndex((lesson) => lesson.id === lessonId);

  for (let index = currentIndex + 1; index < lessons.length; index += 1) {
    if (!lessons[index].isLocked) {
      return lessons[index];
    }
  }

  return null;
}

function getBoardFilterNote(filterId, visibleLessons) {
  if (!visibleLessons.length) {
    return "No lessons match this view yet.";
  }

  if (filterId === "focus") {
    return "Only active lessons that can move the learner forward stay on screen.";
  }

  if (filterId === "complete") {
    return "Completed lessons stay visible for quick revision and confidence checks.";
  }

  return "The full unit stays visible so the learner can jump between open lessons without losing the route.";
}

const initialUnits = deriveLearningProgress(learningUnits);
const initialSelectedLesson =
  getCurrentLesson(initialUnits) ?? initialUnits[0]?.lessons[0] ?? null;

export default function LearningPathShell() {
  const [units, setUnits] = useState(() => initialUnits);
  const [hasHydratedProgress, setHasHydratedProgress] = useState(false);
  const [boardFilter, setBoardFilter] = useState("all");
  const [activeUnitId, setActiveUnitId] = useState(
    initialSelectedLesson?.unitId ?? initialUnits[0]?.id ?? "unit-1",
  );
  const [activeLessonId, setActiveLessonId] = useState(
    initialSelectedLesson?.id ??
      initialUnits[0]?.lessons[0]?.id ??
      "unit-1-lesson-1",
  );

  const activeUnit = units.find((unit) => unit.id === activeUnitId) ?? units[0];
  const currentLesson = getCurrentLesson(units);
  const visibleLessons = useMemo(
    () =>
      getVisibleLessons(
        activeUnit?.lessons ?? [],
        boardFilter,
        currentLesson?.id,
      ),
    [activeUnit, boardFilter, currentLesson],
  );
  const selectedLesson =
    activeUnit?.lessons.find((lesson) => lesson.id === activeLessonId) ??
    getUnitLeadLesson(activeUnit);
  const activeLesson =
    visibleLessons.find((lesson) => lesson.id === activeLessonId) ??
    selectedLesson ??
    visibleLessons[0] ??
    getFirstLesson(activeUnit);
  const totalCompletedSubLessons = units.reduce(
    (sum, unit) => sum + unit.completedSubLessons,
    0,
  );
  const totalCompletedLessons = units.reduce(
    (sum, unit) => sum + unit.completedLessons,
    0,
  );
  const overallProgress = learningOverview.totalSubLessons
    ? Math.round(
        (totalCompletedSubLessons / learningOverview.totalSubLessons) * 100,
      )
    : 0;
  const completionRun = getCompletionRun(units);
  const nextOpenLesson = activeLesson
    ? getNextOpenLesson(units, activeLesson.id)
    : null;
  const nextStep =
    currentLesson?.lessons.find((entry) => !entry.completed) ?? null;
  const activeUnitLessonsLeft =
    activeUnit?.lessons.filter((lesson) => lesson.progress < 100).length ?? 0;
  const currentLessonStepsLeft = currentLesson
    ? currentLesson.totalSteps - currentLesson.completedSteps
    : 0;
  const boardFilterNote = getBoardFilterNote(boardFilter, visibleLessons);
  const rewardInsertionIndex =
    visibleLessons.length > 2
      ? Math.max(1, Math.floor(visibleLessons.length / 2) - 1)
      : -1;

  useEffect(() => {
    const hydratedUnits = hydrateLearningProgress(learningUnits);
    const nextLesson =
      getCurrentLesson(hydratedUnits) ?? hydratedUnits[0]?.lessons[0] ?? null;

    setUnits(hydratedUnits);
    setActiveUnitId(nextLesson?.unitId ?? hydratedUnits[0]?.id ?? "unit-1");
    setActiveLessonId(
      nextLesson?.id ?? hydratedUnits[0]?.lessons[0]?.id ?? "unit-1-lesson-1",
    );
    setHasHydratedProgress(true);
  }, []);

  useEffect(() => {
    if (!hasHydratedProgress) {
      return;
    }

    persistLearningProgress(units);
  }, [hasHydratedProgress, units]);

  useEffect(() => {
    const lessonPool = visibleLessons.length
      ? visibleLessons
      : (activeUnit?.lessons ?? []);

    if (
      lessonPool.length &&
      !lessonPool.some((lesson) => lesson.id === activeLessonId)
    ) {
      setActiveLessonId(lessonPool[0].id);
    }
  }, [activeLessonId, activeUnit, visibleLessons]);

  function handleSelectUnit(unitId) {
    const nextUnit = units.find((unit) => unit.id === unitId);

    if (!nextUnit) {
      return;
    }

    const leadLesson = getUnitLeadLesson(nextUnit);

    setActiveUnitId(unitId);
    setActiveLessonId(leadLesson?.id ?? activeLessonId);
  }

  function handleSelectLesson(lessonId) {
    for (const unit of units) {
      if (unit.lessons.some((lesson) => lesson.id === lessonId)) {
        setActiveUnitId(unit.id);
        setActiveLessonId(lessonId);
        return;
      }
    }
  }

  function handleToggleSubLesson(lessonId, subLessonId) {
    setUnits((currentUnits) =>
      deriveLearningProgress(
        currentUnits.map((unit) => ({
          ...unit,
          lessons: unit.lessons.map((lesson) => {
            if (lesson.id !== lessonId || lesson.isLocked) {
              return lesson;
            }

            return {
              ...lesson,
              lessons: lesson.lessons.map((entry) => {
                if (entry.id !== subLessonId) {
                  return entry;
                }

                return {
                  ...entry,
                  completed: !entry.completed,
                };
              }),
            };
          }),
        })),
      ),
    );
  }

  function handleAdvanceStep() {
    if (!activeLesson || activeLesson.isLocked) {
      return;
    }

    const pendingStep = activeLesson.lessons.find((entry) => !entry.completed);

    if (!pendingStep) {
      return;
    }

    handleToggleSubLesson(activeLesson.id, pendingStep.id);
  }

  function handleFocusOnCurrent() {
    if (!currentLesson) {
      return;
    }

    setBoardFilter("focus");
    setActiveUnitId(currentLesson.unitId);
    setActiveLessonId(currentLesson.id);
  }

  return (
    <section className="lp-shell">
      <header className="lp-hero">
        <div className="lp-hero-copy">
          <span className="lp-kicker">Learning path / progressive route</span>
          <h1 className="lp-hero-title">
            {currentLesson
              ? `${studentProfile.name.split(" ")[0]}, keep the next lesson moving.`
              : "Every lesson on the route is complete."}
          </h1>
          <p className="lp-hero-text">
            Every unit and lesson is open, while the board still keeps the next
            best action visible and turns every completed lesson into review
            material. The layout is designed to keep progress obvious without
            forcing the learner through hidden locks first.
          </p>

          <div className="lp-hero-actions">
            {currentLesson
              ? <Link
                  className="lp-hero-action"
                  href={getLearningDayHref(currentLesson.id)}
                >
                  Continue {currentLesson.label}
                </Link>
              : <Link className="lp-hero-action" href="/dashboard">
                  Review completed lessons
                </Link>}
            <button
              className={`lp-secondary-action ${boardFilter === "focus" ? "active" : ""}`}
              type="button"
              onClick={handleFocusOnCurrent}
            >
              Focus mode
            </button>
          </div>

          <div className="lp-hero-journey">
            <div className="lp-hero-chip">
              <strong>{totalCompletedLessons}</strong>
              <span>review cards unlocked</span>
            </div>
            <div className="lp-hero-chip">
              <strong>
                {learningOverview.totalLessons - totalCompletedLessons}
              </strong>
              <span>lessons still ahead</span>
            </div>
            <div className="lp-hero-chip">
              <strong>{units.filter((unit) => unit.isComplete).length}</strong>
              <span>units fully cleared</span>
            </div>
          </div>
        </div>

        <div className="lp-hero-panel">
          <div className="lp-hero-spotlight">
            <div className="lp-hero-spotlight-top">
              <span className="lp-hero-spotlight-kicker">Up next</span>
              <span className="lp-hero-spotlight-state">
                {currentLesson
                  ? `${currentLessonStepsLeft} step${currentLessonStepsLeft === 1 ? "" : "s"} left`
                  : "Path cleared"}
              </span>
            </div>

            <strong className="lp-hero-spotlight-title">
              {currentLesson?.title ?? "You have cleared the full route"}
            </strong>
            <p className="lp-hero-spotlight-text">
              {nextStep
                ? `${nextStep.title} is the fastest move right now. Finish it to keep the route flowing and push overall mastery higher.`
                : "Use completed lessons for review loops, weak-point repair, and final exam confidence."}
            </p>

            <div className="lp-hero-spotlight-progress" aria-hidden="true">
              <span style={{ width: `${currentLesson?.progress ?? 100}%` }} />
            </div>

            <div className="lp-hero-spotlight-footer">
              <span>{currentLesson?.unitLabel ?? "Full route"}</span>
              <span>
                {currentLesson
                  ? `${currentLesson.completedSteps}/4 steps complete`
                  : `${totalCompletedLessons}/${learningOverview.totalLessons} lessons mastered`}
              </span>
            </div>
          </div>

          <div className="lp-hero-metrics-grid">
            <article className="lp-hero-metric">
              <span>Overall route</span>
              <strong>{overallProgress}%</strong>
            </article>
            <article className="lp-hero-metric">
              <span>Clean run</span>
              <strong>{completionRun} lessons</strong>
            </article>
            <article className="lp-hero-metric">
              <span>Open now</span>
              <strong>
                {units.reduce(
                  (sum, unit) =>
                    sum +
                    unit.lessons.filter((lesson) => !lesson.isLocked).length,
                  0,
                )}{" "}
                lessons
              </strong>
            </article>
            <article className="lp-hero-metric">
              <span>Units open</span>
              <strong>
                {units.length}/{learningOverview.totalUnits}
              </strong>
            </article>
          </div>
        </div>
      </header>

      <UnitStrip
        activeUnitId={activeUnit?.id ?? ""}
        currentLessonId={currentLesson?.id ?? ""}
        onSelectUnit={handleSelectUnit}
        units={units}
      />

      <div className="lp-main-grid">
        <section className="lp-board">
          <div className="lp-board-head">
            <div>
              <div className="lp-board-kicker">
                {activeUnit?.label} / {activeUnit?.title}
              </div>
              <h2 className="lp-board-title">{activeUnit?.summary}</h2>
              <p className="lp-board-note">
                Every lesson in this unit is open. Follow the recommended next
                action or jump directly to a weak spot for revision.
              </p>
            </div>

            <div className="lp-board-progress">
              <strong>{activeUnit?.progress ?? 0}%</strong>
              <span>
                {activeUnit?.completedLessons ?? 0}/
                {activeUnit?.lessons.length ?? 0} lessons mastered
              </span>
            </div>
          </div>

          <div className="lp-board-toolbar">
            <div
              className="lp-filter-row"
              role="tablist"
              aria-label="Lesson views"
            >
              {boardFilters.map((filter) => (
                <button
                  key={filter.id}
                  className={`lp-filter-chip ${boardFilter === filter.id ? "active" : ""}`}
                  type="button"
                  onClick={() => setBoardFilter(filter.id)}
                  aria-pressed={boardFilter === filter.id}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <div className="lp-board-caption">{boardFilterNote}</div>
          </div>

          {visibleLessons.length
            ? <>
                <div className="lp-route-banner">
                  <div className="lp-route-banner-copy">
                    <span className="lp-route-banner-kicker">
                      Section {String(activeUnit?.number ?? 0).padStart(2, "0")}{" "}
                      / {activeUnit?.label}
                    </span>
                    <strong className="lp-route-banner-title">
                      {activeUnit?.title}
                    </strong>
                    <span className="lp-route-banner-subtitle">
                      Follow the lesson circles in order or skip straight to a
                      topic you want to repair. Finished circles stay open for
                      fast review.
                    </span>
                  </div>

                  <div className="lp-route-banner-meta">
                    <span>{activeUnit?.lessons.length ?? 0} lesson circles</span>
                    <span>
                      {activeUnitLessonsLeft}{" "}
                      {activeUnitLessonsLeft === 1 ? "lesson" : "lessons"} left
                    </span>
                  </div>
                </div>

                <div className="lp-route-scene">
                  <div className="lp-route-guide top" aria-hidden="true">
                    <LearnMascot variant="reader" />
                    <div className="mascot-stars">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>

                  <div className="lp-route-guide bottom" aria-hidden="true">
                    <LearnMascot variant="spark" />
                    <div className="mascot-stars">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>

                  <div className="lp-lesson-grid">
                    {visibleLessons.map((lesson, index) => (
                      <Fragment key={lesson.id}>
                        <LessonCard
                          currentLessonId={currentLesson?.id}
                          isActive={lesson.id === activeLesson?.id}
                          lesson={lesson}
                          onSelect={handleSelectLesson}
                          pathIndex={index}
                        />

                        {index === rewardInsertionIndex
                          ? <div className="lp-route-prize">
                              <RewardChest
                                claimed={(activeUnit?.progress ?? 0) === 100}
                                unlocked={(activeUnit?.progress ?? 0) > 0}
                              />
                              <div className="lp-route-prize-copy">
                                <strong>
                                  {(activeUnit?.progress ?? 0) === 100
                                    ? `${activeUnit?.label} chest claimed`
                                    : "Unit chest ahead"}
                                </strong>
                                <span>
                                  {(activeUnit?.progress ?? 0) === 100
                                    ? "The route is clear. Use the completed circles for revision loops."
                                    : "Keep clearing the live circles to claim the unit reward and lift overall mastery."}
                                </span>
                              </div>
                            </div>
                          : null}
                      </Fragment>
                    ))}
                  </div>
                </div>
              </>
            : <div className="lp-board-empty">
                <strong>No lessons in this view yet.</strong>
                <span>
                  Switch filters or continue the active lesson to bring more of
                  the route into this view.
                </span>
              </div>}
        </section>

        {activeLesson
          ? <LessonDetail
              isRecommended={activeLesson.id === currentLesson?.id}
              lesson={activeLesson}
              nextLesson={nextOpenLesson}
              onAdvanceStep={handleAdvanceStep}
            />
          : null}
      </div>
    </section>
  );
}
