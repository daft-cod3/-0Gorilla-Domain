import Link from "next/link";
import { getLearningDayHref } from "../learn";
import ContentReview from "../learn/components/contReview";
import ModelTownBoard from "./modelTownBoard";
import RoadSign from "./roadSign";
import TeacherUploadsSection from "./teacher-uploads-section";

const popularLessons = [
  {
    id: "controls",
    title: "Vehicle controls",
    meta: "4 sub-lessons / Foundation setup",
    tag: "Hot",
    href: getLearningDayHref("unit-1-lesson-1"),
    art: "art-lilac",
  },
  {
    id: "signs",
    title: "Traffic signs",
    meta: "4 sub-lessons / Fast recall drill",
    tag: "Trending",
    href: getLearningDayHref("unit-1-lesson-2"),
    art: "art-peach",
  },
  {
    id: "junctions",
    title: "Junction rules",
    meta: "4 sub-lessons / Risk-heavy topic",
    tag: "Popular",
    href: getLearningDayHref("unit-1-lesson-4"),
    art: "art-mint",
  },
  {
    id: "hazard",
    title: "Hazard awareness",
    meta: "4 sub-lessons / Scan discipline",
    tag: "Top pick",
    href: getLearningDayHref("unit-1-lesson-5"),
    art: "art-sky",
  },
];

export default function Dashboard() {
  return (
    <div className="dashboard-shell">
      <div className="dashboard-panel">
        <section className="dash-hero">
          <div className="dash-hero-content">
            <div className="dash-hero-tag">Progress hub</div>
            <h1 className="dash-hero-title">
              Track the live unit, lesson momentum, and review unlocks in one
              place.
            </h1>
            <p className="dash-hero-subtitle">
              Work through notes, boards, signs, and quizzes on the learning
              path. The dashboard now keeps the active unit snapshot, current
              lesson progress, and finished review cards together.
            </p>
            <div className="dash-hero-actions">
              <Link className="dash-hero-button primary" href="/content">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                Open learning path
              </Link>
              <Link className="dash-hero-button secondary" href="/stats">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                View progress
              </Link>
            </div>
          </div>
          <div className="dash-hero-art">
            <div className="book-stack">
              <span className="book book-one" />
              <span className="book book-two" />
              <span className="book book-three" />
              <span className="book book-four" />
              <span className="book book-five" />
            </div>
            <div className="book-stand">
              <span />
              <span />
            </div>
            <div className="floating-elements">
              <div className="floating-badge">🚗</div>
              <div className="floating-badge">📚</div>
              <div className="floating-badge">🎯</div>
            </div>
          </div>
        </section>

        <div className="dash-body">
          <div className="dash-main">
            <TeacherUploadsSection />

            <ContentReview />

            <section className="dash-section">
              <div className="dash-section-head">
                <div>
                  <div className="dash-section-title">Popular</div>
                  <div className="dash-section-subtitle">
                    Most-revisited lessons and revision packs this week.
                  </div>
                </div>
                <Link className="dash-link" href="/content">
                  View all
                </Link>
              </div>
              <div className="dash-card-grid">
                {popularLessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    className="dash-course-card"
                    href={lesson.href}
                  >
                    <div className={`dash-card-art ${lesson.art}`} />
                    <div className="dash-card-row">
                      <div className="dash-card-title">{lesson.title}</div>
                      <span className="dash-card-tag">{lesson.tag}</span>
                    </div>
                    <div className="dash-card-meta">{lesson.meta}</div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="dash-section">
              <div className="dash-section-head">
                <div>
                  <div className="dash-section-title">Recent Activity</div>
                  <div className="dash-section-subtitle">
                    Latest updates and milestones from your learning journey.
                  </div>
                </div>
                <Link className="dash-link" href="/stats">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                  View all
                </Link>
              </div>
              <div className="dash-activity-list">
                <div className="dash-activity-item">
                  <div className="dash-activity-icon-wrapper">
                    <span className="dash-activity-icon">📚</span>
                  </div>
                  <div className="dash-activity-content">
                    <div className="dash-activity-copy">
                      <strong>Completed Unit 1</strong>
                      <p>Finished all lessons in Unit 1 with 95% score</p>
                    </div>
                    <span className="dash-activity-time">2 hours ago</span>
                  </div>
                  <div className="dash-activity-badge">Achievement</div>
                </div>
                <div className="dash-activity-item">
                  <div className="dash-activity-icon-wrapper">
                    <span className="dash-activity-icon">👨‍🏫</span>
                  </div>
                  <div className="dash-activity-content">
                    <div className="dash-activity-copy">
                      <strong>Mentor Session</strong>
                      <p>Reviewed progress with instructor John</p>
                    </div>
                    <span className="dash-activity-time">1 day ago</span>
                  </div>
                  <div className="dash-activity-badge">Session</div>
                </div>
                <div className="dash-activity-item">
                  <div className="dash-activity-icon-wrapper">
                    <span className="dash-activity-icon">🏆</span>
                  </div>
                  <div className="dash-activity-content">
                    <div className="dash-activity-copy">
                      <strong>Achievement Unlocked</strong>
                      <p>Earned 'Streak Master' badge</p>
                    </div>
                    <span className="dash-activity-time">3 days ago</span>
                  </div>
                  <div className="dash-activity-badge">Badge</div>
                </div>
                <div className="dash-activity-item">
                  <div className="dash-activity-icon-wrapper">
                    <span className="dash-activity-icon">🎯</span>
                  </div>
                  <div className="dash-activity-content">
                    <div className="dash-activity-copy">
                      <strong>Quiz Completed</strong>
                      <p>Scored 88% on Traffic Signs quiz</p>
                    </div>
                    <span className="dash-activity-time">5 days ago</span>
                  </div>
                  <div className="dash-activity-badge">Quiz</div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <RoadSign />
        <ModelTownBoard />
      </div>
    </div>
  );
}
