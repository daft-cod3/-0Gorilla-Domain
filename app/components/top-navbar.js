import Link from "next/link";
import { studentProfile } from "../data/student-profile";

function getPercent(value, capacity) {
  if (!capacity) {
    return 0;
  }

  return Math.round((value / capacity) * 100);
}

function NavbarMeter({ label, tone, value, capacity }) {
  return (
    <Link
      className={`top-navbar-meter ${tone}`}
      href="/stats"
      aria-label={`${label}: ${value} out of ${capacity}`}
      title={`${label}: ${value}/${capacity}`}
    >
      <span className="top-navbar-meter-label">{label}</span>
      <div className="top-navbar-meter-track" aria-hidden="true">
        <span style={{ width: `${getPercent(value, capacity)}%` }} />
      </div>
      <strong>{value}</strong>
    </Link>
  );
}

export default function TopNavbar() {
  return (
    <header className="top-navbar">
      <Link
        className="top-navbar-identity"
        href="/stats"
        aria-label="Open learner profile"
      >
        <span className="top-navbar-overline">Learner</span>
        <strong>{studentProfile.name}</strong>
        <span>{studentProfile.drivingClass}</span>
      </Link>

      <div className="top-navbar-stats" aria-label="Learner status">
        <NavbarMeter
          label="HP"
          tone="hp"
          value={studentProfile.hp}
          capacity={studentProfile.hpCapacity}
        />
        <NavbarMeter
          label="Energy"
          tone="energy"
          value={studentProfile.energy}
          capacity={studentProfile.energyCapacity}
        />
        <Link
          className="top-navbar-coins"
          href="/stats"
          aria-label={`Coins: ${studentProfile.coins}`}
          title={`Coins: ${studentProfile.coins}`}
        >
          <span>Coins</span>
          <strong>{studentProfile.coins}</strong>
        </Link>
      </div>
    </header>
  );
}
