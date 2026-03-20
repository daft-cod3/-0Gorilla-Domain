import Link from "next/link";

const teacherUploads = [
  {
    id: "video-upload",
    type: "Video",
    title: "Roundabout masterclass",
    meta: "Ms. Diaz • 12 min • Uploaded 2 hours ago",
    summary: "A new walkthrough on hazard checks, entry timing, and exit cues.",
    action: "Play lesson",
    href: "/content/day-03",
    icon: "video",
    accent: "violet",
  },
  {
    id: "image-upload",
    type: "Image set",
    title: "Priority sign flash cards",
    meta: "Mr. Chen • 14 images • Uploaded today",
    summary: "Fresh revision cards for warnings, orders, and lane control signs.",
    action: "View gallery",
    href: "/content/day-02",
    icon: "image",
    accent: "rose",
  },
  {
    id: "quiz-upload",
    type: "Quiz link",
    title: "Traffic flow checkpoint",
    meta: "Ms. Omar • 10 questions • Due in 2 days",
    summary: "A graded quiz on yielding, merging, and safe stopping distance.",
    action: "Start quiz",
    href: "/content/day-04",
    icon: "quiz",
    accent: "gold",
  },
  {
    id: "resource-upload",
    type: "Resource link",
    title: "Night driving checklist",
    meta: "Ms. Bello • Resource pack • Updated today",
    summary: "A printable guide covering headlights, glare control, and spacing.",
    action: "Open resource",
    href: "/content/day-05",
    icon: "link",
    accent: "mint",
  },
];

const popularLessons = [
  {
    id: "travel-basics",
    title: "Travel basics",
    meta: "12 lessons • 4.8 rating",
    tag: "Hot",
    href: "/content/day-01",
    art: "art-lilac",
  },
  {
    id: "sign-recall",
    title: "Sign recall",
    meta: "9 lessons • Fast memory drills",
    tag: "Trending",
    href: "/content/day-02",
    art: "art-peach",
  },
  {
    id: "junction-calls",
    title: "Junction calls",
    meta: "6 lessons • Teacher favorite",
    tag: "Popular",
    href: "/content/day-03",
    art: "art-mint",
  },
  {
    id: "hazard-lab",
    title: "Hazard listening",
    meta: "7 lessons • Final recap",
    tag: "Top pick",
    href: "/content/day-06",
    art: "art-sky",
  },
];

const ongoingLessons = [
  {
    id: "grammar-drills",
    title: "Grammar drills",
    meta: "Lesson 5 • 36 min left",
    href: "/content/day-04",
    art: "art-violet",
  },
  {
    id: "listening-lab",
    title: "Listening lab",
    meta: "Lesson 3 • 22 min left",
    href: "/content/day-06",
    art: "art-rose",
  },
  {
    id: "vocabulary-pack",
    title: "Vocabulary pack",
    meta: "Lesson 8 • 41 min left",
    href: "/content/day-02",
    art: "art-amber",
  },
  {
    id: "roleplay-practice",
    title: "Roleplay practice",
    meta: "Lesson 2 • 18 min left",
    href: "/messages",
    art: "art-aqua",
  },
];

const mentors = [
  {
    id: "mentor-gina",
    initials: "GM",
    name: "Gina Moore",
    specialty: "Conversation • 4.9",
  },
  {
    id: "mentor-priya",
    initials: "PS",
    name: "Priya Singh",
    specialty: "Grammar • 4.8",
  },
  {
    id: "mentor-jun",
    initials: "JW",
    name: "Jun Wei",
    specialty: "Pronunciation • 4.7",
  },
];

export default function Dashboard() {
  return (
    <div className="dashboard-shell">
      <div className="dashboard-panel">
        <header className="dash-topbar">
          <div className="dash-search">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path
                d="M20 20L17 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <input type="text" placeholder="Search classes, uploads, topics" />
          </div>
          <div className="dash-top-actions">
            <Link className="dash-live" href="/live">
              Live
            </Link>
            <Link className="dash-icon" href="/messages" aria-label="Messages">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 6H19V15H8L5 18V6Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link
              className="dash-icon"
              href="/notifications"
              aria-label="Notifications"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 9C6 6 8 4 12 4C16 4 18 6 18 9V13L20 15H4L6 13V9Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 17C9.6 18.2 10.7 19 12 19C13.3 19 14.4 18.2 15 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </Link>
            <div className="dash-avatar">AR</div>
          </div>
        </header>

        <section className="dash-hero">
          <div className="dash-hero-content">
            <div className="dash-hero-tag">Library</div>
            <h1 className="dash-hero-title">
              Hi Ari, your teacher has new material waiting.
            </h1>
            <p className="dash-hero-subtitle">
              The next sequence in Section 2 is live. Move between uploaded
              cards, jump into a live lesson, or message your teacher directly.
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
                    Latest videos, images, quiz links, and extra resources.
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
                      <span className="teacher-card-status">Teacher shared</span>
                      <span className="teacher-action">{upload.action}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="dash-section">
              <div className="dash-section-head">
                <div>
                  <div className="dash-section-title">Popular</div>
                  <div className="dash-section-subtitle">
                    Most-visited lessons and revision packs this week.
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
                  <div className="dash-rail-title">Unlocks achievement</div>
                  <div className="dash-rail-subtitle">
                    Complete 3 sessions to unlock.
                  </div>
                </div>
                <button className="dash-toggle" type="button" aria-label="Toggle">
                  <span />
                </button>
              </div>
              <div className="dash-rail-progress">
                <div className="dash-progress-row">
                  <span>Daily streak</span>
                  <span>2/3</span>
                </div>
                <div className="dash-progress">
                  <span style={{ width: "66%" }} />
                </div>
                <div className="dash-badge-row">
                  <span className="dash-mini-avatar">LP</span>
                  <span className="dash-mini-avatar">JS</span>
                  <span className="dash-mini-avatar">AK</span>
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
                    <Link className="dash-rail-action" href="/messages">
                      Message
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
