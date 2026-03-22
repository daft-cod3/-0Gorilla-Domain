import Link from "next/link";
import { getLearningDayHref } from "../learn";
import ContentReview from "../learn/components/contReview";
import RoadSign from "./roadSign";

const teacherUploads = [
  {
    id: "image-upload",
    type: "Image set",
    title: "Road markings photo wall",
    meta: "Ms. Diaz / 16 images / Updated today",
    summary:
      "Quick visual references for lane edges, center lines, and turn bays.",
    action: "View images",
    href: getLearningDayHref("unit-1-lesson-3"),
    icon: "image",
    accent: "mint",
  },
  {
    id: "video-upload",
    type: "Video",
    title: "Junction decisions breakdown",
    meta: "Mr. Chen / 12 min / Uploaded 2 hours ago",
    summary:
      "A clean replay of priority calls, blind checks, and entry timing.",
    action: "Play lesson",
    href: getLearningDayHref("unit-1-lesson-4"),
    icon: "video",
    accent: "violet",
  },
  {
    id: "quiz-upload",
    type: "Quiz link",
    title: "Hazard scan checkpoint",
    meta: "Ms. Omar / 10 questions / Due in 2 days",
    summary:
      "Measure how early you are spotting movement, risk, and blind zones.",
    action: "Start quiz",
    href: getLearningDayHref("unit-1-lesson-5"),
    icon: "quiz",
    accent: "gold",
  },
  {
    id: "resource-upload",
    type: "Resource link",
    title: "Traffic sign revision pack",
    meta: "Ms. Bello / Notes + visuals / Updated today",
    summary:
      "Compact notes and visual prompts for warning, order, and direction signs.",
    action: "Open pack",
    href: getLearningDayHref("unit-1-lesson-2"),
    icon: "link",
    accent: "rose",
  },
];

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

const ongoingLessons = [
  {
    id: "road-markings",
    title: "Road markings",
    meta: "Lesson 03 / Visual lane reading",
    href: getLearningDayHref("unit-1-lesson-3"),
    art: "art-violet",
  },
  {
    id: "junction-rules",
    title: "Junction rules",
    meta: "Lesson 04 / Decision timing",
    href: getLearningDayHref("unit-1-lesson-4"),
    art: "art-rose",
  },
  {
    id: "hazard-awareness",
    title: "Hazard awareness",
    meta: "Lesson 05 / Risk scanning",
    href: getLearningDayHref("unit-1-lesson-5"),
    art: "art-amber",
  },
  {
    id: "live-coaching",
    title: "Live coaching",
    meta: "Direct instructor session / Starts now",
    href: "/live",
    art: "art-aqua",
  },
];

const mentors = [
  {
    id: "mentor-gina",
    initials: "GM",
    name: "Gina Moore",
    specialty: "Hazard reading / 4.9",
  },
  {
    id: "mentor-priya",
    initials: "PS",
    name: "Priya Singh",
    specialty: "Theory recall / 4.8",
  },
  {
    id: "mentor-jun",
    initials: "JW",
    name: "Jun Wei",
    specialty: "Road signs / 4.7",
  },
];

export default function Dashboard() {
  return (
    <div className="dashboard-shell">
      <div className="dashboard-panel">
        <header className="dash-topbar">
          <div className="dash-search dash-search-static">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="11"
                cy="11"
                r="7"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M20 20L17 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <div className="dash-search-copy">
              <span className="dash-search-label">Dashboard overview</span>
              <span className="dash-search-note">
                Lessons, review cards, and road signs are grouped into a calmer
                layout.
              </span>
            </div>
          </div>
          <div className="dash-top-actions">
            <span className="dash-status-pill">Low-motion workspace</span>
            <div className="dash-avatar">AR</div>
          </div>
        </header>

        <section className="dash-hero">
          <div className="dash-hero-content">
            <div className="dash-hero-tag">Review unlocks</div>
            <h1 className="dash-hero-title">
              Fully complete a lesson and it drops into content review.
            </h1>
            <p className="dash-hero-subtitle">
              Work through notes, boards, signs, and quizzes on the learning
              path. Every finished lesson unlocks a reusable review card here.
            </p>
            <Link className="dash-hero-button" href="/content">
              Open learning path
            </Link>
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
          </div>
        </section>

        <div className="dash-body">
          <div className="dash-main">
            <section className="dash-section">
              <div className="dash-section-head">
                <div>
                  <div className="dash-section-title">Teacher uploads</div>
                  <div className="dash-section-subtitle">
                    Latest videos, image packs, quiz links, and extra resources.
                  </div>
                </div>
                <Link className="dash-link" href="/content">
                  View all
                </Link>
              </div>
              <div className="teacher-grid">
                {teacherUploads.map((upload) => (
                  <Link
                    key={upload.id}
                    className={`teacher-card teacher-card-link ${upload.accent}`}
                    href={upload.href}
                  >
                    <div className="teacher-card-top">
                      <span className={`teacher-icon ${upload.icon}`} />
                      <span className="teacher-type">{upload.type}</span>
                      <span className="teacher-badge">Latest</span>
                    </div>
                    <div className="teacher-title">{upload.title}</div>
                    <div className="teacher-meta">{upload.meta}</div>
                    <p className="teacher-summary">{upload.summary}</p>
                    <div className="teacher-card-footer">
                      <span className="teacher-card-status">
                        Teacher shared
                      </span>
                      <span className="teacher-action">{upload.action}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

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
                  <div className="dash-section-title">Ongoing</div>
                  <div className="dash-section-subtitle">
                    Continue where you left off.
                  </div>
                </div>
                <Link className="dash-link" href="/content">
                  View all
                </Link>
              </div>
              <div className="dash-card-grid">
                {ongoingLessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    className="dash-course-card"
                    href={lesson.href}
                  >
                    <div className={`dash-card-art ${lesson.art}`} />
                    <div className="dash-card-title">{lesson.title}</div>
                    <div className="dash-card-meta">{lesson.meta}</div>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <aside className="dash-rail">
            <div className="dash-rail-card">
              <div className="dash-rail-head">
                <div>
                  <div className="dash-rail-title">Review unlock target</div>
                  <div className="dash-rail-subtitle">
                    Finish one full lesson to create a new review card.
                  </div>
                </div>
                <span className="dash-rail-chip">Tracking active</span>
              </div>
              <div className="dash-rail-progress">
                <div className="dash-progress-row">
                  <span>Current lesson</span>
                  <span>3/4</span>
                </div>
                <div className="dash-progress">
                  <span style={{ width: "75%" }} />
                </div>
                <div className="dash-badge-row">
                  <span className="dash-mini-avatar">NT</span>
                  <span className="dash-mini-avatar">VD</span>
                  <span className="dash-mini-avatar">IM</span>
                </div>
              </div>
            </div>

            <div className="dash-rail-card">
              <div className="dash-rail-title">Top mentors</div>
              <div className="dash-rail-list">
                {mentors.map((mentor) => (
                  <div key={mentor.id} className="dash-rail-item">
                    <span className="dash-rail-avatar">{mentor.initials}</span>
                    <div>
                      <div className="dash-rail-name">{mentor.name}</div>
                      <div className="dash-rail-meta">{mentor.specialty}</div>
                    </div>
                    <span className="dash-rail-pill">Available</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <RoadSign />
      </div>
    </div>
  );
}
