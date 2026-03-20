import Link from "next/link";
import { notFound } from "next/navigation";
import Sidebar from "../../components/sidebar";
import {
  getLearningDay,
  getLearningDayHref,
  learningDayIds,
  learningDays,
} from "../../learn";
import { JourneyIcon, LessonIcon } from "../../learn/icons";

function getLessonLabel(kind) {
  if (kind === "theory") {
    return "Theory";
  }

  if (kind === "board") {
    return "Board";
  }

  if (kind === "signs") {
    return "Signs";
  }

  return "Quiz";
}

export function generateStaticParams() {
  return learningDayIds.map((dayId) => ({ dayId }));
}

export default async function LearningDayPage({ params }) {
  const { dayId } = await params;
  const day = getLearningDay(dayId);

  if (!day) {
    notFound();
  }

  const dayIndex = learningDays.findIndex((entry) => entry.id === day.id);
  const previousDay = dayIndex > 0 ? learningDays[dayIndex - 1] : null;
  const nextDay =
    dayIndex < learningDays.length - 1 ? learningDays[dayIndex + 1] : null;
  const completedLessons = day.lessons.filter((lesson) => lesson.completed).length;
  const totalLessons = day.lessons.length;
  const progress = totalLessons
    ? Math.round((completedLessons / totalLessons) * 100)
    : 0;

  return (
    <div className="app-shell">
      <Sidebar active="path" />
      <main className="main-content">
        <section className="lesson-page">
          <div className="lesson-hero">
            <div className="lesson-hero-copy">
              <Link className="lesson-back" href="/content">
                Back to learning path
              </Link>
              <span className="lesson-hero-pill">
                {day.label} • {progress}% complete
              </span>
              <h1 className="lesson-page-title">{day.title}</h1>
              <p className="lesson-page-subtitle">{day.subtitle}</p>
              <div className="lesson-hero-actions">
                {previousDay ? (
                  <Link
                    className="lesson-secondary-link"
                    href={getLearningDayHref(previousDay.id)}
                  >
                    Previous day
                  </Link>
                ) : null}
                {nextDay ? (
                  <Link
                    className="lesson-primary-link"
                    href={getLearningDayHref(nextDay.id)}
                  >
                    Next day
                  </Link>
                ) : null}
              </div>
            </div>

            <div className="lesson-hero-icon">
              <JourneyIcon name={day.icon} />
            </div>
          </div>

          <div className="lesson-page-grid">
            <div className="lesson-page-main">
              <section className="lesson-page-card">
                <div className="lesson-page-head">
                  <div>
                    <div className="lesson-page-section-title">
                      Lesson checklist
                    </div>
                    <div className="lesson-page-section-subtitle">
                      Open each item and complete the work for {day.label}.
                    </div>
                  </div>
                  <span className="lesson-page-chip">
                    {completedLessons}/{totalLessons} done
                  </span>
                </div>

                <div className="lesson-step-list">
                  {day.lessons.map((lesson, index) => (
                    <article
                      key={lesson.id}
                      className={`lesson-step ${lesson.completed ? "done" : ""}`}
                    >
                      <div className="lesson-step-number">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div className="lesson-step-icon">
                        <LessonIcon kind={lesson.kind} />
                      </div>
                      <div className="lesson-step-copy">
                        <strong>{lesson.title}</strong>
                        <span>
                          {getLessonLabel(lesson.kind)} • {lesson.duration}
                        </span>
                        <p>{lesson.detail}</p>
                      </div>
                      <span className="lesson-step-state">
                        {lesson.completed ? "Completed" : "Pending"}
                      </span>
                    </article>
                  ))}
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
                    <span>Join today&apos;s session or waiting room.</span>
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
                    <strong>{completedLessons} lessons complete</strong>
                    <span>{totalLessons - completedLessons} lessons remaining</span>
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
    </div>
  );
}
