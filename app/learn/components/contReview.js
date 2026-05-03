"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { studentProfile } from "../../data/student-profile";
import { getLearningDayHref, learningUnits } from "..";
import { JourneyIcon } from "../icons";
import {
  getCompletedLessons,
  hydrateLearningProgress,
} from "../progress-store";

const reviewResources = [
  {
    id: "notes",
    label: "Notes",
    action: "Open notes",
    tone: "blue",
    href: (lesson) => getLearningDayHref(lesson.id),
    summary: (lesson) => `Condensed notes and checkpoints for ${lesson.title}.`,
  },
  {
    id: "video",
    label: "Video",
    action: "Watch recap",
    tone: "green",
    href: () => "/live",
    summary: (lesson) => `Replay the short walkthrough for ${lesson.label}.`,
  },
  {
    id: "images",
    label: "Images",
    action: "View pack",
    tone: "mix",
    href: (lesson) => getLearningDayHref(lesson.id),
    summary: () => "Open the visual pack for signs, markings, and boards.",
  },
  {
    id: "resources",
    label: "Resources",
    action: "More resources",
    tone: "gold",
    href: () => "/content",
    summary: () =>
      "Jump back into the path and browse related revision material.",
  },
];

function getFeaturedUnit(unitSummaries) {
  return (
    unitSummaries.find((unit) => unit.progress > 0 && unit.progress < 100) ??
    unitSummaries.find((unit) => unit.progress === 100) ??
    unitSummaries[0] ??
    null
  );
}

function getLessonActivityStreak(lessons) {
  let streak = 0;

  for (const lesson of lessons) {
    if (lesson.progress > 0) {
      streak += 1;
      continue;
    }

    break;
  }

  return streak;
}

function getUnitState(unit) {
  if (!unit) {
    return "Waiting";
  }

  if (unit.progress === 100) {
    return "Cleared";
  }

  if (unit.progress > 0) {
    return "Live now";
  }

  return "Queued";
}

function getShortLessonLabel(label, index) {
  const numberMatch = label?.match(/\d+/);
  return numberMatch ? `L${numberMatch[0]}` : `L${index + 1}`;
}

function getGraphNodes(lessons, width, height, padding) {
  if (!lessons.length) {
    return [];
  }

  const usableWidth = width - padding * 2;
  const usableHeight = height - padding * 2;

  return lessons.map((lesson, index) => {
    const x =
      lessons.length === 1
        ? width / 2
        : padding + (usableWidth / (lessons.length - 1)) * index;
    const y = height - padding - (lesson.progress / 100) * usableHeight;

    return {
      id: lesson.id,
      label: getShortLessonLabel(lesson.label, index),
      progress: lesson.progress,
      x,
      y,
      isComplete: lesson.progress === 100,
      isActive: lesson.progress > 0 && lesson.progress < 100,
    };
  });
}

function buildLinePath(nodes) {
  if (!nodes.length) {
    return "";
  }

  return nodes
    .map(
      (node, index) =>
        `${index === 0 ? "M" : "L"} ${node.x.toFixed(1)} ${node.y.toFixed(1)}`,
    )
    .join(" ");
}

function buildAreaPath(nodes, height, padding) {
  if (!nodes.length) {
    return "";
  }

  const baseY = height - padding;
  const firstNode = nodes[0];
  const lastNode = nodes[nodes.length - 1];

  return `${buildLinePath(nodes)} L ${lastNode.x.toFixed(1)} ${baseY.toFixed(
    1,
  )} L ${firstNode.x.toFixed(1)} ${baseY.toFixed(1)} Z`;
}

function UnitProgressGraph({ unit }) {
  const width = 260;
  const height = 110;
  const padding = 14;
  const nodes = getGraphNodes(unit.lessons, width, height, padding);
  const linePath = buildLinePath(nodes);
  const areaPath = buildAreaPath(nodes, height, padding);
  const gradientBase = `review-unit-graph-${unit.id}`;

  return (
    <div className="review-unit-graph-shell">
      <svg
        className="review-unit-graph"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`${unit.label} lesson progress graph`}
      >
        <defs>
          <linearGradient id={`${gradientBase}-line`} x1="0%" x2="100%">
            <stop offset="0%" stopColor="#2f8bff" />
            <stop offset="100%" stopColor="#6fe51f" />
          </linearGradient>
          <linearGradient
            id={`${gradientBase}-fill`}
            x1="0%"
            x2="0%"
            y1="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#2f8bff" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#44c06b" stopOpacity="0.04" />
          </linearGradient>
        </defs>

        {[0, 25, 50, 75, 100].map((tick) => {
          const y = height - padding - (tick / 100) * (height - padding * 2);

          return (
            <line
              key={tick}
              x1={padding}
              x2={width - padding}
              y1={y}
              y2={y}
              className="review-unit-graph-grid"
            />
          );
        })}

        {areaPath
          ? <path
              d={areaPath}
              fill={`url(#${gradientBase}-fill)`}
              className="review-unit-graph-area"
            />
          : null}

        {linePath
          ? <path
              d={linePath}
              fill="none"
              stroke={`url(#${gradientBase}-line)`}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="review-unit-graph-line"
            />
          : null}

        {nodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r="7"
              className={`review-unit-graph-dot${
                node.isComplete ? " complete" : node.isActive ? " active" : ""
              }`}
            />
            <circle
              cx={node.x}
              cy={node.y}
              r="3.5"
              className="review-unit-graph-core"
            />
          </g>
        ))}
      </svg>

      <div className="review-unit-graph-axis" aria-hidden="true">
        {unit.lessons.map((lesson, index) => (
          <span key={lesson.id}>
            {getShortLessonLabel(lesson.label, index)}
          </span>
        ))}
      </div>
    </div>
  );
}

function FeaturedUnitCard({ unit }) {
  const state = getUnitState(unit);
  const completedLessons = unit.lessons.filter(
    (lesson) => lesson.progress === 100,
  ).length;
  const strongestLesson =
    [...unit.lessons].sort(
      (left, right) => right.progress - left.progress,
    )[0] ?? null;
  const coveredTopics = unit.coveredTopics.length
    ? unit.coveredTopics.slice(0, 3)
    : ["No topics covered yet"];

  return (
    <article className="review-unit-spotlight">
      <div className="review-unit-spotlight-copy">
        <div className="review-unit-spotlight-head">
          <div>
            <div className="review-card-kicker">Featured student unit</div>
            <div className="review-unit-spotlight-title">
              {unit.label}: {unit.title}
            </div>
          </div>

          <div className="review-unit-badge-row">
            <span className="review-unit-chip">{state}</span>
            <span className="review-unit-chip accent">{unit.progress}%</span>
          </div>
        </div>

        <p className="review-unit-spotlight-summary">
          {unit.summary} {studentProfile.name.split(" ")[0]} has covered{" "}
          {unit.coveredLessons.length} of {unit.lessons.length} lessons in this
          lane, with the strongest lesson and next move kept visible in one
          compact panel.
        </p>

        <div className="review-unit-stat-grid">
          <article className="review-unit-stat">
            <span>Unit progress</span>
            <strong>{unit.progress}%</strong>
          </article>
          <article className="review-unit-stat">
            <span>Lessons cleared</span>
            <strong>
              {completedLessons}/{unit.lessons.length}
            </strong>
          </article>
          <article className="review-unit-stat">
            <span>Completed steps</span>
            <strong>
              {unit.completedSubLessons}/{unit.totalSubLessons}
            </strong>
          </article>
          <article className="review-unit-stat">
            <span>Strongest lesson</span>
            <strong>{strongestLesson?.progress ?? 0}%</strong>
          </article>
        </div>

        <div className="review-topic-list">
          {coveredTopics.map((topic) => (
            <span
              key={topic}
              className={`review-topic-pill${
                topic === "No topics covered yet" ? " muted" : ""
              }`}
            >
              {topic}
            </span>
          ))}
        </div>

        <div className="review-unit-footer">
          <span>Next focus</span>
          {unit.nextLesson
            ? <Link
                className="review-unit-action"
                href={getLearningDayHref(unit.nextLesson.id)}
              >
                Open {unit.nextLesson.label}
              </Link>
            : <strong>Revision loop ready</strong>}
        </div>
      </div>

      <div className="review-unit-visual">
        <div className="review-unit-visual-head">
          <span className="review-card-kicker">Lesson graph</span>
          <strong>{unit.lessons.length} lesson checkpoints</strong>
        </div>

        <UnitProgressGraph unit={unit} />

        <div className="review-unit-bar-grid">
          {unit.lessons.map((lesson, index) => (
            <div key={lesson.id} className="review-unit-bar-card">
              <strong>{getShortLessonLabel(lesson.label, index)}</strong>
              <span>{lesson.progress}%</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

function loadReviewData() {
  const hydratedUnits = hydrateLearningProgress(learningUnits);
  const completedLessons = getCompletedLessons(hydratedUnits).sort(
    (left, right) => right.index - left.index,
  );
  const activeLessons = hydratedUnits
    .flatMap((unit) => unit.lessons)
    .filter((lesson) => lesson.progress > 0 && lesson.progress < 100)
    .sort(
      (left, right) =>
        right.progress - left.progress || left.index - right.index,
    );
  const unitSummaries = hydratedUnits.map((unit) => {
    const coveredLessons = unit.lessons.filter((lesson) => lesson.progress > 0);
    const score = unit.lessons.length
      ? Math.round(
          unit.lessons.reduce((sum, lesson) => sum + lesson.progress, 0) /
            unit.lessons.length,
        )
      : 0;

    return {
      ...unit,
      score,
      coveredLessons,
      coveredTopics: coveredLessons.map((lesson) => lesson.title),
      nextLesson: unit.lessons.find((lesson) => lesson.progress < 100) ?? null,
    };
  });
  const averageScore = unitSummaries.length
    ? Math.round(
        unitSummaries.reduce((sum, unit) => sum + unit.score, 0) /
          unitSummaries.length,
      )
    : 0;
  const totalTopicsCovered = unitSummaries.reduce(
    (sum, unit) => sum + unit.coveredLessons.length,
    0,
  );
  const featuredUnit = getFeaturedUnit(unitSummaries);
  const featuredUnitStreak = featuredUnit
    ? getLessonActivityStreak(featuredUnit.lessons)
    : 0;

  return {
    averageScore,
    completedLessons,
    activeLessons,
    featuredUnit,
    featuredUnitStreak,
    totalTopicsCovered,
    unitSummaries,
  };
}

export default function ContentReview() {
  const [reviewData, setReviewData] = useState({
    averageScore: 0,
    completedLessons: [],
    activeLessons: [],
    featuredUnit: null,
    featuredUnitStreak: 0,
    totalTopicsCovered: 0,
    unitSummaries: [],
  });

  useEffect(() => {
    setReviewData(loadReviewData());
  }, []);

  const { averageScore, completedLessons, featuredUnit, totalTopicsCovered } =
    reviewData;

  return (
    <section className="dash-section review-section">
      <div className="dash-section-head">
        <div>
          <div className="dash-section-title">Student review</div>
          <div className="dash-section-subtitle">
            Unit momentum, completed lessons, and revision entry points.
          </div>
        </div>
        <Link className="dash-link" href="/content">
          Open path
        </Link>
      </div>

      <div className="review-overview-bar compact">
        <article className="review-overview-stat">
          <span>Completed</span>
          <strong>{completedLessons.length}</strong>
        </article>
        <article className="review-overview-stat">
          <span>Score</span>
          <strong>{averageScore}%</strong>
        </article>
        <article className="review-overview-stat">
          <span>Topics</span>
          <strong>{totalTopicsCovered}</strong>
        </article>
        <article className="review-overview-stat">
          <span>Unit</span>
          <strong>{featuredUnit?.label ?? "—"}</strong>
        </article>
      </div>

      {featuredUnit
        ? <FeaturedUnitCard unit={featuredUnit} />
        : <div className="review-progress-empty">
            <strong>No unit activity yet.</strong>
            <p>Start a lesson and the unit snapshot will appear here.</p>
          </div>}

      <div className="review-stack">
        <div className="review-progress-head">
          <div>
            <div className="review-progress-title">Content review</div>
            <div className="review-progress-subtitle">
              Completed lessons with quick revision actions.
            </div>
          </div>
          <span className="review-progress-chip">
            {completedLessons.length} ready
          </span>
        </div>

        {completedLessons.length
          ? <div className="review-grid">
              {completedLessons.map((lesson) => (
                <article key={lesson.id} className="review-card">
                  <div className="review-card-head">
                    <div>
                      <div className="review-card-kicker">
                        {lesson.unitLabel} / {lesson.label}
                      </div>
                      <div className="review-card-title">{lesson.title}</div>
                    </div>
                    <span className="review-card-state">Complete</span>
                  </div>
                  <div className="review-card-metrics">
                    <span>
                      <JourneyIcon name={lesson.icon} />
                      {lesson.lessons.length} pts
                    </span>
                    <span>
                      {lesson.overviewTopics?.length ?? lesson.lessons.length}{" "}
                      topics
                    </span>
                    <span>100%</span>
                  </div>
                  <div className="review-resource-grid">
                    {reviewResources.map((resource) => (
                      <Link
                        key={`${lesson.id}-${resource.id}`}
                        className={`review-resource-card ${resource.tone}`}
                        href={resource.href(lesson)}
                      >
                        <span className="review-resource-label">
                          {resource.label}
                        </span>
                        <strong>{resource.action}</strong>
                      </Link>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          : <div className="review-empty-card">
              <strong>No review cards yet.</strong>
              <p>
                Finish all sub-lessons in any lesson to unlock a review card.
              </p>
            </div>}
      </div>
    </section>
  );
}
