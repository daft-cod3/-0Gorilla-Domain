import MessagesPanel from "../components/messages-panel";
import Sidebar from "../components/sidebar";

export default function MessagesPage() {
  return (
    <div className="app-shell">
      <Sidebar active="dashboard" />
      <main className="main-content">
        <MessagesPanel />
      </main>
    </div>
  );
}
