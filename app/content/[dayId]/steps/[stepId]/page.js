import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getLearningDayHref,
  getLearningStep,
  learningDays,
} from "../../../../learn";
import { LessonIcon } from "../../../../learn/icons";

function normalizeText(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function getStepKindLabel(kind) {
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

function getMatchingTopic(lesson, step) {
  const stepTitle = normalizeText(step.title);

  return (
    lesson.overviewTopics?.find((topic) => {
      const topicTitle = normalizeText(topic.title);

      return (
        stepTitle.includes(topicTitle) ||
        topicTitle.includes(stepTitle) ||
        topic.points.some((point) => stepTitle.includes(normalizeText(point)))
      );
    }) ?? null
  );
}

function getStepParagraphs(lesson, step, topic) {
  const baseParagraphs = topic?.points ?? [
    step.detail,
    `${step.title} sits inside ${lesson.label} and is meant to build confidence through short, focused repetition.`,
    "Use the explanation, media walkthroughs, and the lesson page together so the skill is learned as a complete routine instead of a single isolated action.",
  ];

  return baseParagraphs.slice(0, 3);
}

function getVideoChapters(step, topic) {
  return [
    `Introduction to ${step.title.toLowerCase()}`,
    topic?.title
      ? `${topic.title} explained with examples`
      : `${getStepKindLabel(step.kind)} walkthrough and observation cues`,
    "Common mistakes, correction tips, and final recap",
  ];
}

function getGifNotes(step) {
  return [
    `Short loop showing the key movement pattern for ${step.title.toLowerCase()}.`,
    "Best used before practice so the sequence feels familiar before the learner starts moving.",
  ];
}

export function generateStaticParams() {
  return learningDays.flatMap((lesson) =>
    lesson.lessons.map((step) => ({
      dayId: lesson.id,
      stepId: step.id,
    })),
  );
}

export default async function LearningStepPage({ params }) {
  const { dayId, stepId } = await params;
  const stepEntry = getLearningStep(dayId, stepId);

  if (!stepEntry) {
    notFound();
  }

  const { lesson, step } = stepEntry;
  const lessonIndex = lesson.lessons.findIndex((entry) => entry.id === step.id);
  const nextStep =
    lessonIndex < lesson.lessons.length - 1
      ? lesson.lessons[lessonIndex + 1]
      : null;
  const topic = getMatchingTopic(lesson, step);
  const paragraphs = getStepParagraphs(lesson, step, topic);
  const videoChapters = getVideoChapters(step, topic);
  const gifNotes = getGifNotes(step);

  return (
    <main className="main-content">
      <section className="lesson-page step-page">
        <div className="lesson-hero step-page-hero">
          <div className="lesson-hero-copy">
            <Link className="lesson-back" href={getLearningDayHref(lesson.id)}>
              Back to {lesson.label}
            </Link>
            <span className="lesson-hero-pill">
              {lesson.unitLabel} / {lesson.label} /{" "}
              {getStepKindLabel(step.kind)}
            </span>
            <h1 className="lesson-page-title">{step.title}</h1>
            <p className="lesson-page-subtitle">{step.detail}</p>
            <div className="lesson-hero-actions">
              <Link className="lesson-secondary-link" href="/content">
                Learning path
              </Link>
              <Link
                className="lesson-primary-link"
                href={getLearningDayHref(lesson.id)}
              >
                Open full lesson
              </Link>
            </div>
          </div>

          <div className="lesson-hero-icon step-page-icon">
            <LessonIcon kind={step.kind} />
          </div>
        </div>

        <div className="lesson-page-grid">
          <div className="lesson-page-main">
            <section className="lesson-page-card">
              <div className="lesson-page-head">
                <div>
                  <div className="lesson-page-section-title">
                    Step breakdown
                  </div>
                  <div className="lesson-page-section-subtitle">
                    More information for the selected lesson topic.
                  </div>
                </div>
              </div>

              <div className="step-paragraph-stack">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section className="lesson-page-card">
              <div className="lesson-page-head">
                <div>
                  <div className="lesson-page-section-title">Media support</div>
                  <div className="lesson-page-section-subtitle">
                    GIF-style motion cues and a video-style teaching breakdown.
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
                    {gifNotes.map((note) => (
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
                    {videoChapters.map((chapter) => (
                      <li key={chapter}>{chapter}</li>
                    ))}
                  </ol>
                </article>
              </div>
            </section>

            <section className="lesson-page-card">
              <div className="lesson-page-head">
                <div>
                  <div className="lesson-page-section-title">Key points</div>
                  <div className="lesson-page-section-subtitle">
                    Quick notes to carry back into practice.
                  </div>
                </div>
              </div>

              <ul className="step-point-list">
                {(topic?.points ?? paragraphs).map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="lesson-page-aside">
            <section className="lesson-page-card">
              <div className="lesson-page-section-title">Step meta</div>
              <div className="lesson-support-grid">
                <div className="lesson-support-card">
                  <strong>{step.title}</strong>
                  <span>{getStepKindLabel(step.kind)} topic</span>
                </div>
                <div className="lesson-support-card">
                  <strong>{step.duration}</strong>
                  <span>Suggested study time</span>
                </div>
              </div>
            </section>

            <section className="lesson-page-card">
              <div className="lesson-page-section-title">Where this fits</div>
              <div className="lesson-support-grid">
                <div className="lesson-support-card">
                  <strong>{lesson.label}</strong>
                  <span>{lesson.title}</span>
                </div>
                <div className="lesson-support-card">
                  <strong>
                    {nextStep?.title ?? "Return to the lesson checklist"}
                  </strong>
                  <span>
                    {nextStep
                      ? "Next topic inside the same lesson."
                      : "All lesson topics are now covered on this page set."}
                  </span>
                </div>
              </div>
            </section>

            <section className="lesson-page-card">
              <div className="lesson-page-section-title">Next actions</div>
              <div className="lesson-next-actions">
                <Link
                  className="lesson-primary-link"
                  href={getLearningDayHref(lesson.id)}
                >
                  Back to lesson progress
                </Link>
                {nextStep
                  ? <Link
                      className="lesson-secondary-link"
                      href={`/content/${lesson.id}/steps/${nextStep.id}`}
                    >
                      Open next topic
                    </Link>
                  : <Link className="lesson-secondary-link" href="/content">
                      Return to learning path
                    </Link>}
              </div>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}
