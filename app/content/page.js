import LearnPath from "../components/learnPath";
import Sidebar from "../components/sidebar";

export default function ContentPage() {
  return (
    <div className="app-shell">
      <Sidebar active="path" />
      <main className="main-content learn-main-content">
        <LearnPath />
      </main>
    </div>
  );
}
