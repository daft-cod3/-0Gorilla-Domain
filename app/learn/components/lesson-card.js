import Link from "next/link";
import { getLearningDayHref } from "..";
import { JourneyIcon } from "../icons";

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

export default function LessonCard({
  currentLessonId,
  isActive,
  lesson,
  onSelect,
  pathIndex = 0,
}) {
  const isRecommended = lesson.id === currentLessonId;
  const lessonState = getLessonState(lesson, isRecommended);
  const laneClass = pathIndex % 2 === 0 ? "lane-left" : "lane-right";
  const lessonCircle = (
    <>
      <span className="lp-lesson-icon">
        <JourneyIcon name={lesson.icon} />
      </span>
      <span className="lp-lesson-node-progress">{lesson.progress}%</span>
    </>
  );

  return (
    <article
      className={`lp-lesson-card ${laneClass} ${isActive ? "active" : ""} ${lesson.isLocked ? "locked" : "open"} ${lesson.progress === 100 ? "complete" : ""} ${isRecommended ? "recommended" : ""}`}
      onMouseEnter={() => onSelect(lesson.id)}
    >
      <div className="lp-lesson-node-column">
        {lesson.isLocked
          ? <button
              className="lp-lesson-hit"
              type="button"
              onClick={() => onSelect(lesson.id)}
              onFocus={() => onSelect(lesson.id)}
              aria-pressed={isActive}
            >
              {lessonCircle}
            </button>
          : <Link
              className="lp-lesson-hit"
              href={getLearningDayHref(lesson.id)}
              onClick={() => onSelect(lesson.id)}
              onFocus={() => onSelect(lesson.id)}
              aria-current={isActive ? "page" : undefined}
            >
              {lessonCircle}
            </Link>}

        <span className="lp-lesson-index">{lesson.label}</span>
        <span className="lp-lesson-title">{lesson.title}</span>
        <span className="lp-lesson-state">{lessonState}</span>

        <span className="lp-lesson-segments" aria-hidden="true">
          {lesson.lessons.map((entry) => (
            <i key={entry.id} className={entry.completed ? "done" : ""} />
          ))}
        </span>
      </div>
    </article>
  );
}
