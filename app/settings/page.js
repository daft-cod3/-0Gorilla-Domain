import Setting from "../components/setting";
import Sidebar from "../components/sidebar";

export default function SettingsPage() {
  return (
    <div className="app-shell">
      <Sidebar active="settings" />
      <main className="main-content settings-main">
        <Setting />
      </main>
    </div>
  );
}
