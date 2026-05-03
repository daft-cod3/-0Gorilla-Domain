import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getLearningDay,
  getLearningDayHref,
  getLearningStepHref,
  getLearningUnit,
  learningDayIds,
  learningDays,
} from "../../learn";
import { JourneyIcon, LessonIcon } from "../../learn/icons";

function getLessonParagraphs(lesson) {
  const topicParagraphs =
    lesson.overviewTopics?.slice(0, 2).map((topic) => {
      const summary = topic.points.slice(0, 2).join(" ");

      return `${topic.title}: ${summary}`;
    }) ?? [];

  return [
    lesson.overviewSummary ??
      `${lesson.title} gives the learner a focused route through the key rules, the practical read of the road, and the actions that matter most under pressure.`,
    ...topicParagraphs,
  ].slice(0, 3);
}

function getLessonVideoChapters(lesson) {
  const topicTitles = lesson.overviewTopics?.map((topic) => topic.title) ?? [];

  return [
    `Introduction to ${lesson.title.toLowerCase()}`,
    topicTitles[0] ?? `${lesson.title} core routine`,
    topicTitles[1] ?? "Worked examples and mistake correction",
  ];
}

function getLessonGifNotes(lesson) {
  return [
    `Animated walkthrough showing the main movement and observation pattern for ${lesson.title.toLowerCase()}.`,
    "Use the loop before practice so the sequence feels familiar before the lesson begins.",
  ];
}

export function generateStaticParams() {
  return learningDayIds.map((dayId) => ({ dayId }));
}

export default async function LearningDayPage({ params }) {
  const { dayId } = await params;
  const lesson = getLearningDay(dayId);

  if (!lesson) {
    notFound();
  }

  const dayIndex = learningDays.findIndex((entry) => entry.id === lesson.id);
  const previousDay = dayIndex > 0 ? learningDays[dayIndex - 1] : null;
  const nextDay =
    dayIndex < learningDays.length - 1 ? learningDays[dayIndex + 1] : null;
  const unit = getLearningUnit(lesson.unitId);
  const completedLessons = lesson.lessons.filter(
    (entry) => entry.completed,
  ).length;
  const totalLessons = lesson.lessons.length;
  const progress = totalLessons
    ? Math.round((completedLessons / totalLessons) * 100)
    : 0;
  const nextIncompleteStep = lesson.lessons.find((entry) => !entry.completed);
  const lessonParagraphs = getLessonParagraphs(lesson);
  const lessonVideoChapters = getLessonVideoChapters(lesson);
  const lessonGifNotes = getLessonGifNotes(lesson);
  const lessonPoints =
    lesson.overviewTopics?.flatMap((topic) => topic.points)?.slice(0, 6) ??
    lesson.lessons.map((entry) => entry.detail).slice(0, 4);
  const rewardCards = [
    {
      label: "Coins",
      value: `+${40 + lesson.lessonNumber * 8}`,
      note: "Granted after the full lesson is completed.",
    },
    {
      label: "Energy use",
      value: `-${8 + lesson.lessonNumber}`,
      note: "Plan shorter sessions if your energy bar is already low.",
    },
    {
      label: "HP protection",
      value: `${Math.max(62, 88 - (100 - progress) / 2)}%`,
      note: "Cleaner lesson results help protect your driving HP.",
    },
    {
      label: "Bonus",
      value: progress === 100 ? "Unlocked" : "Pending",
      note: "Finish all four steps to unlock the final completion bonus.",
    },
  ];
  const resultCards = [
    {
      label: "Current result",
      value:
        progress === 100
          ? "Mastered"
          : progress >= 50
            ? "In progress"
            : "Starting",
      note: "Your lesson result updates as theory, board, signs, and quiz steps are completed.",
    },
    {
      label: "Step score",
      value: `${completedLessons}/${totalLessons}`,
      note: "All four steps count equally toward the lesson outcome.",
    },
    {
      label: "Dashboard reward",
      value: progress === 100 ? "Review card ready" : "Needs all steps",
      note: "A full clear unlocks the lesson inside dashboard content review.",
    },
    {
      label: "Recommended focus",
      value: nextIncompleteStep?.title ?? "Revise and move forward",
      note: "This is the next best step if you want to finish the topic efficiently.",
    },
  ];

  return (
    <main className="main-content">
      <section className="lesson-page">
        <div className="lesson-hero">
          <div className="lesson-hero-copy">
            <Link className="lesson-back" href="/content">
              Back to learning path
            </Link>
            <span className="lesson-hero-pill">
              {lesson.unitLabel} / {lesson.label} / {progress}% complete
            </span>
            <h1 className="lesson-page-title">{lesson.title}</h1>
            <p className="lesson-page-subtitle">{lesson.subtitle}</p>
            <div className="lesson-hero-actions">
              {previousDay
                ? <Link
                    className="lesson-secondary-link"
                    href={getLearningDayHref(previousDay.id)}
                  >
                    Previous lesson
                  </Link>
                : null}
              {nextDay
                ? <Link
                    className="lesson-primary-link"
                    href={getLearningDayHref(nextDay.id)}
                  >
                    Next lesson
                  </Link>
                : null}
            </div>
          </div>

          <div className="lesson-hero-icon">
            <JourneyIcon name={lesson.icon} />
          </div>
        </div>

        <div className="lesson-page-grid">
          <div className="lesson-page-main">
            <section className="lesson-page-card">
              <div className="lesson-page-head">
                <div>
                  <div className="lesson-page-section-title">
                    Lesson progress
                  </div>
                  <div className="lesson-page-section-subtitle">
                    Open any icon to view the full topic page with more notes,
                    media, and lesson support.
                  </div>
                </div>
                <span className="lesson-page-chip">
                  {completedLessons}/{totalLessons} done
                </span>
              </div>

              <div className="lesson-step-icon-grid">
                {lesson.lessons.map((entry, index) => (
                  <Link
                    key={entry.id}
                    className={`lesson-step-node ${entry.completed ? "done" : ""} ${entry.id === nextIncompleteStep?.id ? "next" : ""}`}
                    href={getLearningStepHref(lesson.id, entry.id)}
                    aria-label={`Open ${entry.title}`}
                  >
                    <div className="lesson-step-node-index">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="lesson-step-node-icon">
                      <LessonIcon kind={entry.kind} />
                    </div>
                    {entry.completed
                      ? <span className="lesson-step-node-status">Done</span>
                      : entry.id === nextIncompleteStep?.id
                        ? <span className="lesson-step-node-status">Next</span>
                        : null}
                  </Link>
                ))}
              </div>
            </section>

            <section className="lesson-page-card">
              <div className="lesson-page-head">
                <div>
                  <div className="lesson-page-section-title">
                    {lesson.overviewTitle ?? "Lesson overview"}
                  </div>
                  <div className="lesson-page-section-subtitle">
                    The full topic page now carries more explanation before you
                    open the smaller lesson icons.
                  </div>
                </div>
              </div>

              <div className="step-paragraph-stack">
                {lessonParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section className="lesson-page-card">
              <div className="lesson-page-head">
                <div>
                  <div className="lesson-page-section-title">
                    Visual learning
                  </div>
                  <div className="lesson-page-section-subtitle">
                    GIF-style motion cues and a video-style lesson breakdown for
                    this topic.
                  </div>
                </div>
              </div>

              <div className="step-media-grid">
                <article className="step-media-card">
                  <div className="step-media-stage gif" aria-hidden="true">
                    <span className="step-media-road" />
                    <span className="step-media-car" />
                    <span className="step-media-sign" />
                  </div>
                  <strong>GIF drill</strong>
                  <div className="step-media-copy">
                    {lessonGifNotes.map((note) => (
                      <p key={note}>{note}</p>
                    ))}
                  </div>
                </article>

                <article className="step-media-card">
                  <div className="step-media-stage video" aria-hidden="true">
                    <span className="step-video-wave first" />
                    <span className="step-video-wave second" />
                    <span className="step-video-play" />
                  </div>
                  <strong>Video guide</strong>
                  <ol className="step-video-list">
                    {lessonVideoChapters.map((chapter) => (
                      <li key={chapter}>{chapter}</li>
                    ))}
                  </ol>
                </article>
              </div>
            </section>

            <section className="lesson-page-card">
              <div className="lesson-page-head">
                <div>
                  <div className="lesson-page-section-title">
                    Key lesson points
                  </div>
                  <div className="lesson-page-section-subtitle">
                    Carry these points into the practical lesson and the step
                    pages.
                  </div>
                </div>
              </div>

              <ul className="step-point-list">
                {lessonPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </section>

            <section className="lesson-page-card">
              <div className="lesson-page-head">
                <div>
                  <div className="lesson-page-section-title">Result system</div>
                  <div className="lesson-page-section-subtitle">
                    The lesson page now tracks what the user earns and what
                    still needs to be cleared.
                  </div>
                </div>
              </div>

              <div className="lesson-result-grid">
                {resultCards.map((card) => (
                  <article key={card.label} className="lesson-result-card">
                    <span>{card.label}</span>
                    <strong>{card.value}</strong>
                    <p>{card.note}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="lesson-page-card">
              <div className="lesson-page-head">
                <div>
                  <div className="lesson-page-section-title">Reward system</div>
                  <div className="lesson-page-section-subtitle">
                    Each topic now shows the outcome, reward value, and what is
                    still pending before payout.
                  </div>
                </div>
              </div>

              <div className="lesson-result-grid">
                {rewardCards.map((card) => (
                  <article key={card.label} className="lesson-result-card">
                    <span>{card.label}</span>
                    <strong>{card.value}</strong>
                    <p>{card.note}</p>
                  </article>
                ))}
              </div>

              <div className="lesson-page-callout">
                Finish all four steps in {lesson.label} to lock in the full
                reward and add the lesson to dashboard review.
              </div>
            </section>

            <section className="lesson-page-card">
              <div className="lesson-page-head">
                <div>
                  <div className="lesson-page-section-title">
                    Teacher support
                  </div>
                  <div className="lesson-page-section-subtitle">
                    Use the tools below when you need more guidance.
                  </div>
                </div>
              </div>

              <div className="lesson-support-grid">
                <Link className="lesson-support-card" href="/live">
                  <strong>Live class room</strong>
                  <span>Join today's session or waiting room.</span>
                </Link>
                <Link className="lesson-support-card" href="/messages">
                  <strong>Message teacher</strong>
                  <span>Ask for feedback or clarification instantly.</span>
                </Link>
                <Link className="lesson-support-card" href="/notifications">
                  <strong>Notifications</strong>
                  <span>Check upload alerts, reminders, and due dates.</span>
                </Link>
              </div>
            </section>
          </div>

          <aside className="lesson-page-aside">
            <section className="lesson-page-card">
              <div className="lesson-page-section-title">Progress snapshot</div>
              <div className="lesson-progress-panel">
                <div
                  className="lesson-progress-ring"
                  style={{ "--lesson-progress": `${progress}%` }}
                >
                  <span>{progress}%</span>
                </div>
                <div className="lesson-progress-meta">
                  <strong>{completedLessons} steps complete</strong>
                  <span>{totalLessons - completedLessons} steps remaining</span>
                </div>
              </div>
            </section>

            <section className="lesson-page-card">
              <div className="lesson-page-section-title">Lesson meta</div>
              <div className="lesson-support-grid">
                <div className="lesson-support-card">
                  <strong>{unit?.title ?? lesson.unitLabel}</strong>
                  <span>Current unit container for this lesson.</span>
                </div>
                <div className="lesson-support-card">
                  <strong>{lesson.isLocked ? "Locked" : "Live"}</strong>
                  <span>
                    {lesson.isLocked
                      ? "Unlock this lesson by finishing the earlier unit."
                      : "This lesson is available from the path now."}
                  </span>
                </div>
              </div>
            </section>

            <section className="lesson-page-card">
              <div className="lesson-page-section-title">Next actions</div>
              <div className="lesson-next-actions">
                <Link className="lesson-primary-link" href="/live">
                  Open live lesson
                </Link>
                <Link className="lesson-secondary-link" href="/messages">
                  Send teacher a message
                </Link>
              </div>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}
