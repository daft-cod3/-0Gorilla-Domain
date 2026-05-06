"use client";

import { useEffect, useMemo, useState } from "react";
import { LessonIcon } from "../icons";
import { LEARNING_PROGRESS_KEY } from "../progress-store";

function readCompletedStepIds(lessonId) {
  try {
    const payload = JSON.parse(
      window.localStorage.getItem(LEARNING_PROGRESS_KEY) ?? "{}",
    );
    const storedLesson = payload.lessons?.find(
      (lesson) => lesson.id === lessonId,
    );

    return new Set(storedLesson?.completedStepIds ?? []);
  } catch {
    return new Set();
  }
}

function writeCompletedStepIds(lessonId, completedStepIds) {
  try {
    const payload = JSON.parse(
      window.localStorage.getItem(LEARNING_PROGRESS_KEY) ?? "{}",
    );
    const lessons = Array.isArray(payload.lessons) ? payload.lessons : [];
    const nextLesson = {
      id: lessonId,
      completedStepIds: Array.from(completedStepIds),
    };
    const exists = lessons.some((lesson) => lesson.id === lessonId);
    const nextLessons = exists
      ? lessons.map((lesson) => (lesson.id === lessonId ? nextLesson : lesson))
      : [...lessons, nextLesson];

    window.localStorage.setItem(
      LEARNING_PROGRESS_KEY,
      JSON.stringify({ ...payload, lessons: nextLessons }),
    );
  } catch {}
}

export default function ActiveLessonWorkspace({ lesson }) {
  const initialCompletedIds = useMemo(
    () =>
      new Set(
        lesson.lessons
          .filter((entry) => entry.completed)
          .map((entry) => entry.id),
      ),
    [lesson.lessons],
  );
  const [selectedStepId, setSelectedStepId] = useState(lesson.lessons[0]?.id);
  const [completedIds, setCompletedIds] = useState(initialCompletedIds);

  useEffect(() => {
    const storedIds = readCompletedStepIds(lesson.id);
    setCompletedIds(storedIds.size ? storedIds : initialCompletedIds);
  }, [initialCompletedIds, lesson.id]);

  const selectedIndex = Math.max(
    0,
    lesson.lessons.findIndex((entry) => entry.id === selectedStepId),
  );
  const selectedStep = lesson.lessons[selectedIndex] ?? lesson.lessons[0];
  const completedCount = completedIds.size;
  const progress = lesson.lessons.length
    ? Math.round((completedCount / lesson.lessons.length) * 100)
    : 0;
  const isSelectedComplete = selectedStep
    ? completedIds.has(selectedStep.id)
    : false;

  function completeSelectedStep() {
    if (!selectedStep) return;

    setCompletedIds((current) => {
      const next = new Set(current);
      next.add(selectedStep.id);
      writeCompletedStepIds(lesson.id, next);

      const nextStep =
        lesson.lessons.find((entry) => !next.has(entry.id)) ?? selectedStep;
      setSelectedStepId(nextStep.id);

      return next;
    });
  }

  return (
    <section className="active-lesson-workspace">
      <div className="active-lesson-header">
        <div>
          <span className="active-lesson-kicker">Actual lesson workspace</span>
          <h2>{lesson.title}</h2>
        </div>
        <div className="active-lesson-score">
          <strong>{progress}%</strong>
          <span>
            {completedCount}/{lesson.lessons.length} subtopics
          </span>
        </div>
      </div>

      <div className="active-lesson-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>

      <div className="active-lesson-grid">
        <div
          className="active-subtopic-tabs"
          role="tablist"
          aria-label="Lesson subtopics"
        >
          {lesson.lessons.map((entry, index) => {
            const isActive = entry.id === selectedStep?.id;
            const isComplete = completedIds.has(entry.id);

            return (
              <button
                key={entry.id}
                type="button"
                role="tab"
                className={`active-subtopic-tab${isActive ? " active" : ""}${isComplete ? " complete" : ""}`}
                onClick={() => setSelectedStepId(entry.id)}
                aria-selected={isActive}
              >
                <span className="active-subtopic-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="active-subtopic-icon">
                  <LessonIcon kind={entry.kind} />
                </span>
                <span className="active-subtopic-copy">
                  <strong>{entry.title}</strong>
                  <span>{entry.duration}</span>
                </span>
              </button>
            );
          })}
        </div>

        {selectedStep
          ? <article className="active-subtopic-panel">
              <div className="active-subtopic-panel-icon">
                <LessonIcon kind={selectedStep.kind} />
              </div>
              <span className="active-lesson-kicker">
                Subtopic {selectedIndex + 1} of {lesson.lessons.length}
              </span>
              <h3>{selectedStep.title}</h3>
              <p>{selectedStep.detail}</p>
              <div className="active-subtopic-actions">
                <button
                  type="button"
                  className="active-subtopic-complete"
                  onClick={completeSelectedStep}
                  disabled={isSelectedComplete}
                >
                  {isSelectedComplete ? "Completed" : "Mark subtopic complete"}
                </button>
                <button
                  type="button"
                  className="active-subtopic-next"
                  onClick={() =>
                    setSelectedStepId(
                      lesson.lessons[
                        Math.min(lesson.lessons.length - 1, selectedIndex + 1)
                      ].id,
                    )
                  }
                >
                  Next subtopic
                </button>
              </div>
            </article>
          : null}
      </div>
    </section>
  );
}
