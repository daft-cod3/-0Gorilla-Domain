import Sidebar from "../components/sidebar";

const notifications = [
  {
    id: "notice-video",
    title: "New video uploaded",
    body: "Ms. Diaz uploaded Roundabout masterclass to today’s lesson path.",
    time: "2 hours ago",
    tone: "accent",
  },
  {
    id: "notice-quiz",
    title: "Quiz reminder",
    body: "Traffic flow checkpoint opens at 4:00 PM and closes tomorrow.",
    time: "Today",
    tone: "warm",
  },
  {
    id: "notice-live",
    title: "Live class starts soon",
    body: "Road sign revision clinic begins in 20 minutes.",
    time: "Today",
    tone: "cool",
  },
  {
    id: "notice-message",
    title: "New teacher message",
    body: "Mr. Chen sent a note about the updated sign image set.",
    time: "Just now",
    tone: "accent",
  },
];

export default function NotificationsPage() {
  return (
    <div className="app-shell">
      <Sidebar active="dashboard" />
      <main className="main-content">
        <section className="notifications-page">
          <div className="notifications-hero">
            <div>
              <div className="notifications-eyebrow">Notifications</div>
              <h1 className="notifications-title">Recent updates</h1>
              <p className="notifications-subtitle">
                Keep track of new uploads, live-class reminders, teacher
                messages, and deadlines.
              </p>
            </div>
          </div>

          <div className="notifications-list">
            {notifications.map((item) => (
              <article
                key={item.id}
                className={`notification-card ${item.tone}`}
              >
                <div className="notification-time">{item.time}</div>
                <div className="notification-title">{item.title}</div>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
