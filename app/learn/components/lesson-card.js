import Link from "next/link";
import { getLearningDayHref } from "..";
import { JourneyIcon } from "../icons";

const LANE_OFFSETS = [0, 54, 42, 48, -18, -52, -30, 14];

function getCompletedSteps(lesson) {
  return (
    lesson.completedSteps ??
    lesson.lessons.filter((entry) => entry.completed).length
  );
}

function getLessonState(lesson, isRecommended) {
  if (lesson.isLocked) {
    return "Locked";
  }

  if (lesson.progress === 100) {
    return "Complete";
  }

  if (isRecommended) {
    return "Up next";
  }

  if (getCompletedSteps(lesson) > 0) {
    return "In progress";
  }

  return "Ready";
}

function getLaneOffset(pathIndex) {
  return LANE_OFFSETS[pathIndex % LANE_OFFSETS.length];
}

function getNodeSize(lesson, isRecommended) {
  if (isRecommended) {
    return 118;
  }

  if (lesson.progress === 100) {
    return 92;
  }

  if (lesson.isLocked) {
    return 80;
  }

  return 96;
}

function getPerformanceRating(lesson) {
  if (lesson.progress === 0) return 0;
  if (lesson.progress < 40) return 1;
  if (lesson.progress < 70) return 2;
  return 3;
}

function PerformanceStars({ lesson }) {
  const rating = getPerformanceRating(lesson);
  return (
    <div
      className="lp-performance-stars"
      role="img"
      aria-label={`Performance: ${rating} out of 3 stars`}
    >
      {[1, 2, 3].map((star) => (
        <svg
          key={star}
          viewBox="0 0 32 32"
          className={`lp-star ${star <= rating ? "filled" : "empty"}`}
          aria-hidden="true"
        >
          <path d="M16 4l3.1 6.9 7.6 1-5.5 5.4 1.3 7.6L16 21.2l-6.5 3.7 1.3-7.6L5.3 11.9l7.6-1z" />
        </svg>
      ))}
    </div>
  );
}

function LessonGlyph({ lesson, isRecommended }) {
  if (lesson.isLocked) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M8 10V8.5C8 6 9.8 4 12 4C14.2 4 16 6 16 8.5V10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <rect x="6" y="10" width="12" height="10" rx="3" fill="currentColor" />
      </svg>
    );
  }

  if (lesson.progress === 100) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M7.5 12.5L10.8 15.8L16.8 8.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (isRecommended) {
    return <JourneyIcon name="star" />;
  }

  return <JourneyIcon name={lesson.icon} />;
}

export default function LessonCard({
  currentLessonId,
  isActive,
  lesson,
  onSelect,
  pathIndex = 0,
}) {
  const isRecommended = lesson.id === currentLessonId;
  const lessonState = getLessonState(lesson, isRecommended);
  const nodeSize = getNodeSize(lesson, isRecommended);
  const offset = getLaneOffset(pathIndex);
  const label = `${lesson.label}: ${lesson.title} (${lessonState})`;
  const lessonControl = (
    <>
      <span className="lp-lesson-icon">
        <LessonGlyph lesson={lesson} isRecommended={isRecommended} />
      </span>
      <span className="sr-only">{lesson.summary ?? lesson.unitLabel}</span>
    </>
  );

  return (
    <article
      className={`lp-stack-card${isActive ? " active" : ""}${lesson.isLocked ? " locked" : " open"}${lesson.progress === 100 ? " complete" : ""}${isRecommended ? " recommended" : ""}`}
      style={{
        "--card-index": pathIndex,
        "--node-offset": `${offset}px`,
        "--node-size": `${nodeSize}px`,
      }}
      onMouseEnter={() => onSelect(lesson.id)}
    >
      <div className="lp-stack-node">
        {lesson.isLocked
          ? <button
              className="lp-stack-hit"
              type="button"
              onClick={() => onSelect(lesson.id)}
              onFocus={() => onSelect(lesson.id)}
              aria-label={label}
              aria-pressed={isActive}
              title={label}
            >
              {isRecommended
                ? <span className="lp-stack-start">START</span>
                : null}
              {lessonControl}
              {isRecommended
                ? <span className="lp-stack-orbit" aria-hidden="true" />
                : null}
            </button>
          : <Link
              className="lp-stack-hit"
              href={getLearningDayHref(lesson.id)}
              onClick={() => onSelect(lesson.id)}
              onFocus={() => onSelect(lesson.id)}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
              title={label}
            >
              {isRecommended
                ? <span className="lp-stack-start">START</span>
                : null}
              {lessonControl}
              {isRecommended
                ? <span className="lp-stack-orbit" aria-hidden="true" />
                : null}
            </Link>}
      </div>
      {lesson.progress > 0 && !lesson.isLocked && (
        <PerformanceStars lesson={lesson} />
      )}
    </article>
  );
}
