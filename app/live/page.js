import Link from "next/link";
import Sidebar from "../components/sidebar";

const liveSessions = [
  {
    id: "session-now",
    status: "Live now",
    title: "Road sign revision clinic",
    teacher: "Ms. Diaz",
    time: "10:30 AM - 11:15 AM",
    cta: "Join class",
  },
  {
    id: "session-next",
    status: "Starting soon",
    title: "Traffic flow Q&A",
    teacher: "Ms. Omar",
    time: "12:00 PM - 12:45 PM",
    cta: "Enter waiting room",
  },
];

const liveMeetings = [
  {
    id: "meeting-parents",
    title: "Teacher feedback meeting",
    detail: "Discuss quiz performance and next revision targets.",
    time: "3:00 PM",
  },
  {
    id: "meeting-group",
    title: "Peer practice room",
    detail: "Small group oral drills with live teacher supervision.",
    time: "5:30 PM",
  },
];

export default function LivePage() {
  return (
    <div className="app-shell">
      <Sidebar active="dashboard" />
      <main className="main-content">
        <section className="live-page">
          <div className="live-hero">
            <div>
              <div className="live-eyebrow">Live lessons</div>
              <h1 className="live-title">Classes and meetings</h1>
              <p className="live-subtitle">
                Join scheduled live classes, enter teacher meetings, and keep
                up with the latest session room links.
              </p>
            </div>
            <Link className="live-hero-link" href="/messages">
              Message your teacher
            </Link>
          </div>

          <div className="live-grid">
            <section className="live-card">
              <div className="live-card-title">Today&apos;s live classes</div>
              <div className="live-session-list">
                {liveSessions.map((session) => (
                  <article key={session.id} className="live-session">
                    <div className="live-session-top">
                      <span className="live-status-pill">{session.status}</span>
                      <span className="live-session-time">{session.time}</span>
                    </div>
                    <div className="live-session-title">{session.title}</div>
                    <div className="live-session-meta">{session.teacher}</div>
                    <Link className="live-session-action" href="/dashboard">
                      {session.cta}
                    </Link>
                  </article>
                ))}
              </div>
            </section>

            <aside className="live-card">
              <div className="live-card-title">Meetings</div>
              <div className="live-meeting-list">
                {liveMeetings.map((meeting) => (
                  <article key={meeting.id} className="live-meeting">
                    <div className="live-meeting-time">{meeting.time}</div>
                    <div className="live-meeting-title">{meeting.title}</div>
                    <p>{meeting.detail}</p>
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}
