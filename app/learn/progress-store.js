export const LEARNING_PROGRESS_KEY = "godomain-learning-progress";

function cloneUnits(units) {
  return units.map((unit) => ({
    ...unit,
    lessons: unit.lessons.map((lesson) => ({
      ...lesson,
      lessons: lesson.lessons.map((entry) => ({ ...entry })),
    })),
  }));
}

function getCompletedSteps(lesson) {
  return lesson.lessons.filter((entry) => entry.completed).length;
}

function buildProgressPayload(units) {
  return {
    lessons: units.flatMap((unit) =>
      unit.lessons.map((lesson) => ({
        id: lesson.id,
        completedStepIds: lesson.lessons
          .filter((entry) => entry.completed)
          .map((entry) => entry.id),
      })),
    ),
  };
}

export function deriveLearningProgress(units) {
  const clonedUnits = cloneUnits(units);
  let previousLessonComplete = true;

  return clonedUnits.map((unit) => {
    const lessons = unit.lessons.map((lesson) => {
      const completedSteps = getCompletedSteps(lesson);
      const totalSteps = lesson.lessons.length;
      const progress = totalSteps
        ? Math.round((completedSteps / totalSteps) * 100)
        : 0;
      const isComplete = totalSteps > 0 && completedSteps === totalSteps;
      const isLocked = !previousLessonComplete;
      previousLessonComplete = previousLessonComplete && isComplete;

      return {
        ...lesson,
        completedSteps,
        totalSteps,
        progress,
        isLocked,
      };
    });

    const completedSubLessons = lessons.reduce(
      (sum, lesson) => sum + lesson.completedSteps,
      0,
    );
    const totalSubLessons = lessons.reduce(
      (sum, lesson) => sum + lesson.totalSteps,
      0,
    );
    const completedLessons = lessons.filter(
      (lesson) => lesson.progress === 100,
    ).length;
    const progress = totalSubLessons
      ? Math.round((completedSubLessons / totalSubLessons) * 100)
      : 0;
    const isComplete =
      lessons.length > 0 && completedLessons === lessons.length;

    return {
      ...unit,
      unlocked: lessons.some((lesson) => !lesson.isLocked || lesson.progress > 0),
      isComplete,
      lessons,
      completedLessons,
      completedSubLessons,
      totalSubLessons,
      progress,
    };
  });
}

export function hydrateLearningProgress(units) {
  const clonedUnits = cloneUnits(units);

  if (typeof window === "undefined") {
    return deriveLearningProgress(clonedUnits);
  }

  try {
    const stored = window.localStorage.getItem(LEARNING_PROGRESS_KEY);

    if (!stored) {
      return deriveLearningProgress(clonedUnits);
    }

    const payload = JSON.parse(stored);
    const progressMap = new Map(
      Array.isArray(payload?.lessons)
        ? payload.lessons.map((lesson) => [
            lesson.id,
            new Set(lesson.completedStepIds ?? []),
          ])
        : [],
    );

    return deriveLearningProgress(
      clonedUnits.map((unit) => ({
        ...unit,
        lessons: unit.lessons.map((lesson) => {
          const completedStepIds = progressMap.get(lesson.id);

          if (!completedStepIds) {
            return lesson;
          }

          return {
            ...lesson,
            lessons: lesson.lessons.map((entry) => ({
              ...entry,
              completed: completedStepIds.has(entry.id),
            })),
          };
        }),
      })),
    );
  } catch {
    return deriveLearningProgress(clonedUnits);
  }
}

export function persistLearningProgress(units) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    LEARNING_PROGRESS_KEY,
    JSON.stringify(buildProgressPayload(units)),
  );
}

export function getCompletedLessons(units) {
  return units
    .flatMap((unit) => unit.lessons)
    .filter(
      (lesson) =>
        lesson.lessons.length > 0 &&
        lesson.lessons.every((entry) => entry.completed),
    );
}
