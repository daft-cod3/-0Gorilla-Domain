export function LessonIcon({ kind }) {
  if (kind === "theory") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M5 6.5C5 5.1 6.1 4 7.5 4H18V18.5C18 19.3 17.3 20 16.5 20H7.8C6.3 20 5 18.7 5 17.2V6.5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M8 8H15M8 12H15M8 16H13"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (kind === "board") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M4 6H20V16H4V6Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M9 16L7 20M15 16L17 20M8 10H10M14 10H16M12 6V16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (kind === "signs") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 4L18 10L12 16L6 10L12 4Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M12 16V21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7 6H17M8 4H16L18 8V18L12 21L6 18V8L8 4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M10 12L11.5 13.5L14.5 10.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function JourneyIcon({ name }) {
  if (name === "star") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 3L14.9 8.8L21 9.7L16.5 14L17.6 20L12 17L6.4 20L7.5 14L3 9.7L9.1 8.8L12 3Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (name === "book") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M5 6.5C5 5.1 6.1 4 7.5 4H18V18.5C18 19.3 17.3 20 16.5 20H8C6.3 20 5 18.7 5 17V6.5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M12 6V20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (name === "mic") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 4C10.3 4 9 5.3 9 7V11C9 12.7 10.3 14 12 14C13.7 14 15 12.7 15 11V7C15 5.3 13.7 4 12 4Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M6 11C6 14.3 8.7 17 12 17C15.3 17 18 14.3 18 11M12 17V21M9 21H15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (name === "dumbbell") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M4 9V15M7 7V17M17 7V17M20 9V15M7 12H17"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "video") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect
          x="4"
          y="6"
          width="11"
          height="12"
          rx="2.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M15 10L20 7V17L15 14V10Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7 10V8C7 5.8 8.8 4 11 4H13C15.2 4 17 5.8 17 8V10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect
        x="4"
        y="10"
        width="5"
        height="8"
        rx="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x="15"
        y="10"
        width="5"
        height="8"
        rx="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

export function BottomNavIcon({ name }) {
  if (name === "home") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M4 11.5L12 5L20 11.5V19C20 20.1 19.1 21 18 21H6C4.9 21 4 20.1 4 19V11.5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M9 21V14H15V21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "chest") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M5 9H19V19H5V9Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M4 9L6.5 5H17.5L20 9M12 9V19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (name === "dumbbell") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M4 9V15M7 7V17M17 7V17M20 9V15M7 12H17"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "trophy") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M8 5H16V8C16 10.2 14.2 12 12 12C9.8 12 8 10.2 8 8V5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M8 6H5V7C5 9.2 6.8 11 9 11M16 6H19V7C19 9.2 17.2 11 15 11M12 12V17M9 20H15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "profile") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle
          cx="12"
          cy="8"
          r="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M5 20C5 16.7 8.1 14 12 14C15.9 14 19 16.7 19 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7 10C7 7.2 9 5 12 5C15 5 17 7.2 17 10V13L19 15H5L7 13V10Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M10 18C10.5 18.8 11.2 19.2 12 19.2C12.8 19.2 13.5 18.8 14 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LearnMascot({ variant }) {
  const isSpark = variant === "spark";

  return (
    <div className={`learn-mascot ${isSpark ? "spark" : "reader"}`}>
      <div className="learn-mascot-shadow" />
      <div className="learn-mascot-body">
        <span className="learn-mascot-eye left" />
        <span className="learn-mascot-eye right" />
        <span className="learn-mascot-beak" />
        {isSpark
          ? <span className="learn-mascot-spark" />
          : <span className="learn-mascot-book" />}
      </div>
    </div>
  );
}

export function RewardChest({ unlocked, claimed }) {
  return (
    <div
      className={`learn-chest ${unlocked ? "unlocked" : ""} ${claimed ? "claimed" : ""}`}
    >
      <div className="learn-chest-lid" />
      <div className="learn-chest-body">
        <span className="learn-chest-lock" />
      </div>
    </div>
  );
}
