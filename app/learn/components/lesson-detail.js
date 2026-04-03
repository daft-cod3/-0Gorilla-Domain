"use client";

import Link from "next/link";
import { getLearningDayHref, getLearningStepHref } from "..";
import { LessonIcon } from "../icons";

export default function LessonDetail({
  isRecommended,
  lesson,
  nextLesson,
  onAdvanceStep,
}) {
  const completedSteps =
    lesson.completedSteps ??
    lesson.lessons.filter((entry) => entry.completed).length;
  const totalSteps = lesson.totalSteps ?? lesson.lessons.length;
  const progress = totalSteps
    ? (lesson.progress ?? Math.round((completedSteps / totalSteps) * 100))
    : 0;
  const nextStep = lesson.lessons.find((entry) => !entry.completed) ?? null;
  const stepsLeft = totalSteps - completedSteps;
  const focusTitle = lesson.isLocked
    ? "Unlock goal"
    : nextStep
      ? "Best next action"
      : "Lesson complete";
  const focusText = lesson.isLocked
    ? lesson.lessonNumber === 1
      ? "Finish the earlier unit to open this first lesson in the new route."
      : "Finish the previous lesson first. This path opens one lesson at a time."
    : nextStep
      ? `${nextStep.title} is the next productive move. One completed step keeps the learner inside the same momentum loop instead of starting over later.`
      : nextLesson
        ? `${lesson.label} is complete. ${nextLesson.label} is open, so the route is ready to keep moving.`
        : "This lesson is complete and ready for revision whenever the learner wants a confidence pass.";

  return (
    <aside className="lp-detail-card">
      <div className="lp-detail-top">
        <div>
          <div className="lp-detail-eyebrow">
            {lesson.unitLabel} / {lesson.label}
          </div>
          <h2 className="lp-detail-title">{lesson.title}</h2>
        </div>

        <div className="lp-detail-status-group">
          {isRecommended && !lesson.isLocked
            ? <span className="lp-detail-badge highlight">Recommended</span>
            : null}
          <div
            className={`lp-detail-lock ${lesson.isLocked ? "locked" : "open"}`}
          >
            {lesson.isLocked
              ? "Locked"
              : progress === 100
                ? "Complete"
                : "Live"}
          </div>
        </div>
      </div>

      <p className="lp-detail-summary">{lesson.subtitle}</p>

      <div className="lp-detail-focus">
        <span className="lp-detail-focus-kicker">{focusTitle}</span>
        <strong>
          {nextStep?.title ?? nextLesson?.title ?? "Keep reviewing"}
        </strong>
        <p>{focusText}</p>
      </div>

      <div className="lp-detail-insights">
        <article className="lp-detail-insight">
          <span>Lesson progress</span>
          <strong>{progress}%</strong>
        </article>
        <article className="lp-detail-insight">
          <span>Steps remaining</span>
          <strong>{stepsLeft}</strong>
        </article>
        <article className="lp-detail-insight">
          <span>After this</span>
          <strong>{nextLesson?.label ?? "Revision loop"}</strong>
        </article>
      </div>

      <div className="lp-detail-progress">
        <div className="lp-detail-progress-row">
          <span>Checklist progress</span>
          <strong>
            {completedSteps}/{totalSteps}
          </strong>
        </div>
        <div className="lp-detail-progress-bar" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="lp-step-icon-head">
        <span className="lp-detail-focus-kicker">Lesson topics</span>
        <span className="lp-step-icon-note">
          Open an icon for the full page, media, and notes.
        </span>
      </div>

      <div className="lp-step-icon-grid">
        {lesson.lessons.map((entry, index) => {
          const stepStatus = entry.completed
            ? "Done"
            : entry.id === nextStep?.id
              ? "Next"
              : null;

          return (
            <Link
              key={entry.id}
              className={`lp-step-node ${entry.completed ? "done" : ""} ${entry.id === nextStep?.id ? "next" : ""}`}
              href={getLearningStepHref(lesson.id, entry.id)}
              aria-label={`Open ${entry.title}`}
            >
              <span className="lp-step-node-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="lp-step-node-icon">
                <LessonIcon kind={entry.kind} />
              </span>
              {stepStatus
                ? <span className="lp-step-node-status">{stepStatus}</span>
                : null}
            </Link>
          );
        })}
      </div>

      <div className="lp-detail-actions">
        {lesson.isLocked
          ? <button
              className="lp-primary-action disabled"
              type="button"
              disabled
            >
              Finish the earlier lesson first
            </button>
          : nextStep
            ? <button
                className="lp-primary-action"
                type="button"
                onClick={onAdvanceStep}
              >
                Complete next step
              </button>
            : <Link className="lp-primary-action" href="/dashboard">
                View review cards
              </Link>}

        {!lesson.isLocked
          ? <Link
              className="lp-secondary-action"
              href={getLearningDayHref(lesson.id)}
            >
              {progress === 100 ? "Review topic page" : "Open topic page"}
            </Link>
          : null}

        <div className="lp-detail-note">
          {progress === 100
            ? "This lesson now feeds the dashboard review area, so revision stays one click away."
            : "Finish all four steps to unlock the review card and mark this topic fully complete."}
        </div>
      </div>
    </aside>
  );
}
