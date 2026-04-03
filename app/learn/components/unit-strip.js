function getUnitStatus(unit) {
  if (unit.progress === 100) {
    return "Complete";
  }

  if (unit.unlocked) {
    return "Live";
  }

  return "Locked";
}

function getUnitMeta(unit) {
  if (unit.progress === 100) {
    return "All lessons cleared. Use this unit for revision loops.";
  }

  if (unit.unlocked) {
    return `${unit.completedLessons}/${unit.lessons.length} lessons mastered`;
  }

  return "Complete the current route to open this unit.";
}

export default function UnitStrip({
  activeUnitId,
  currentLessonId,
  onSelectUnit,
  units,
}) {
  return (
    <div className="lp-unit-strip" role="tablist" aria-label="Learning units">
      {units.map((unit) => {
        const isActive = unit.id === activeUnitId;
        const hasCurrentLesson = unit.lessons.some(
          (lesson) => lesson.id === currentLessonId,
        );

        return (
          <button
            key={unit.id}
            className={`lp-unit-pill ${isActive ? "active" : ""} ${unit.unlocked ? "open" : "locked"} ${unit.progress === 100 ? "complete" : ""}`}
            type="button"
            onClick={() => onSelectUnit(unit.id)}
            aria-pressed={isActive}
          >
            <span className="lp-unit-pill-top">
              <strong>{unit.label}</strong>
              <em>{getUnitStatus(unit)}</em>
            </span>
            <span className="lp-unit-pill-title">{unit.title}</span>
            <span className="lp-unit-pill-meta">{getUnitMeta(unit)}</span>
            <span className="lp-unit-pill-track" aria-hidden="true">
              <span style={{ width: `${unit.progress}%` }} />
            </span>
            {hasCurrentLesson
              ? <span className="lp-unit-pill-tag">Current lane</span>
              : null}
          </button>
        );
      })}
    </div>
  );
}
