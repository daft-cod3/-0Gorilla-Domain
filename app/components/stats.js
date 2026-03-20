export default function Stats() {
  const leaderboardMaxPoints = 1500;
  const leaderboard = [
    { name: "Amira K.", initials: "AM", points: 1420, variant: "" },
    { name: "Jules R.", initials: "JR", points: 1280, variant: "alt" },
    { name: "Lena S.", initials: "LS", points: 1210, variant: "mint" },
    { name: "Ari Rowe", initials: "AR", points: 1140, variant: "peach" },
  ];
  const currentLevel = 8;
  const currentLevelProgress = 62;
  const levels = Array.from({ length: currentLevel }, (_, index) => {
    const level = index + 1;
    const isCurrent = level === currentLevel;
    return {
      level,
      progress: isCurrent ? currentLevelProgress : 100,
      status: isCurrent ? "current" : "passed",
    };
  });
  const formatPoints = (value) => value.toLocaleString("en-US");

  return (
    <div className="stats-shell">
      <header className="stats-header">
        <div>
          <div className="stats-eyebrow">Student analytics</div>
          <h1 className="stats-title">Progress and performance</h1>
          <p className="stats-subtitle">
            Track leaderboards, learning trends, achievements, and streaks.
          </p>
        </div>
        <button className="stats-action" type="button">
          Export report
        </button>
      </header>

      <section className="stats-section">
        <div className="stats-section-head">
          <div className="stats-section-title">Leaderboard</div>
          <div className="stats-section-subtitle">Top learners this week</div>
        </div>
        <ol className="leaderboard-grid">
          {leaderboard.map((student, index) => {
            const progress = Math.min(
              100,
              Math.round((student.points / leaderboardMaxPoints) * 100),
            );
            const avatarClass = ["student-avatar", student.variant]
              .filter(Boolean)
              .join(" ");
            return (
              <li
                key={student.name}
                className="student-card"
                style={{ "--progress": `${progress}%` }}
                tabIndex={0}
                aria-label={`${student.name} ${formatPoints(
                  student.points,
                )} out of ${formatPoints(leaderboardMaxPoints)} points`}
              >
                <div className={avatarClass}>{student.initials}</div>
                <div className="student-body">
                  <div className="student-row">
                    <div className="student-name">{student.name}</div>
                    <div className="student-rank">#{index + 1}</div>
                  </div>
                  <div className="student-meta">
                    {formatPoints(student.points)} /{" "}
                    {formatPoints(leaderboardMaxPoints)} pts
                  </div>
                  <div
                    className="student-progress"
                    role="progressbar"
                    aria-valuenow={student.points}
                    aria-valuemin={0}
                    aria-valuemax={leaderboardMaxPoints}
                  >
                    <span />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="stats-section">
        <div className="stats-section-head">
          <div className="stats-section-title">
            Learning progress infographs
          </div>
          <div className="stats-section-subtitle">
            Current level and all levels passed
          </div>
        </div>
        <ol className="infograph-grid">
          {levels.map((level) => (
            <li
              key={level.level}
              className={`infograph-card ${level.status}`}
            >
              <div
                className="progress-ring"
                style={{ "--progress": `${level.progress}%` }}
              >
                <span>L{level.level}</span>
              </div>
              <div className="infograph-label">
                Level {level.level}
                <span className={`infograph-tag ${level.status}`}>
                  {level.status === "current" ? "Current" : "Passed"}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="stats-section">
        <div className="stats-section-head">
          <div className="stats-section-title">Achievements</div>
          <div className="stats-section-subtitle">
            Recent badges earned by your cohort
          </div>
        </div>
        <ol className="achievement-grid">
          <li className="achievement-card">
            <div className="achievement-badge">A+</div>
            <div className="achievement-title">Consistency</div>
            <div className="achievement-meta">5 study days in a row</div>
          </li>
          <li className="achievement-card">
            <div className="achievement-badge">XP</div>
            <div className="achievement-title">Fast learner</div>
            <div className="achievement-meta">1000 points in a week</div>
          </li>
          <li className="achievement-card">
            <div className="achievement-badge">Pro</div>
            <div className="achievement-title">Quiz master</div>
            <div className="achievement-meta">90% on 3 quizzes</div>
          </li>
        </ol>
      </section>

      <section className="stats-section">
        <div className="stats-section-head">
          <div className="stats-section-title">Streak</div>
          <div className="stats-section-subtitle">Based on your practice log</div>
        </div>
        <div className="stats-streak-card">
          <div className="stats-streak-top">
            <button
              className="stats-streak-icon close"
              type="button"
              aria-label="Close streak"
            >
              +
            </button>
            <div className="stats-streak-title">Streak</div>
            <button
              className="stats-streak-icon share"
              type="button"
              aria-label="Share streak"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M14 4H20V10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M20 4L12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M20 14V20H4V4H10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="stats-streak-tabs">
            <button className="stats-streak-tab active" type="button">
              Personal
            </button>
            <button className="stats-streak-tab" type="button">
              Friends
            </button>
          </div>

          <div className="stats-streak-hero">
            <div className="stats-streak-hero-copy">
              <span className="stats-streak-badge">Streak Society</span>
              <div className="stats-streak-count">1095</div>
              <div className="stats-streak-text">day streak!</div>
            </div>
            <div className="stats-streak-mascot" aria-hidden="true">
              <svg viewBox="0 0 120 120">
                <defs>
                  <linearGradient id="streakGlow" x1="0" x2="1">
                    <stop offset="0%" stopColor="#ffe08a" />
                    <stop offset="100%" stopColor="#ffc14d" />
                  </linearGradient>
                </defs>
                <circle cx="60" cy="60" r="40" fill="url(#streakGlow)" />
                <path
                  d="M34 50C40 40 50 34 60 34C70 34 80 40 86 50"
                  stroke="#8a4d00"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <path
                  d="M40 72C46 78 53 82 60 82C67 82 74 78 80 72"
                  stroke="#8a4d00"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <circle cx="46" cy="56" r="6" fill="#8a4d00" />
                <circle cx="74" cy="56" r="6" fill="#8a4d00" />
              </svg>
            </div>
          </div>

          <div className="stats-streak-callout">
            <span className="stats-streak-callout-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path
                  d="M12 3C9 6 7 9 7 12C7 16 9.5 19 12 19C14.5 19 17 16 17 12C17 9 15 6 12 3Z"
                  fill="#ffcf66"
                />
              </svg>
            </span>
            <div className="stats-streak-callout-text">
              Keep your <strong>Perfect Streak</strong> flame by doing a lesson
              every day!
            </div>
          </div>

          <div className="stats-streak-month">
            <div className="stats-streak-month-title">July 2025</div>
            <div className="stats-streak-month-actions">
              <button
                className="stats-streak-nav"
                type="button"
                aria-label="Previous month"
              >
                {"<"}
              </button>
              <button
                className="stats-streak-nav"
                type="button"
                aria-label="Next month"
              >
                {">"}
              </button>
            </div>
          </div>

          <div className="stats-streak-stats">
            <div className="stats-streak-stat active">
              <span className="stats-streak-stat-icon flame" />
              <div>
                <div className="stats-streak-stat-value">8</div>
                <div className="stats-streak-stat-label">Days practiced</div>
              </div>
              <span className="stats-streak-chip">Perfect</span>
            </div>
            <div className="stats-streak-stat">
              <span className="stats-streak-stat-icon snow" />
              <div>
                <div className="stats-streak-stat-value">0</div>
                <div className="stats-streak-stat-label">Freezes used</div>
              </div>
            </div>
          </div>

          <div className="stats-streak-calendar">
            <div className="stats-streak-weekdays">
              <span>Su</span>
              <span>Mo</span>
              <span>Tu</span>
              <span>We</span>
              <span>Th</span>
              <span>Fr</span>
              <span>Sa</span>
            </div>
            <div className="stats-streak-days">
              <span className="stats-streak-day active">1</span>
              <span className="stats-streak-day active">2</span>
              <span className="stats-streak-day active">3</span>
              <span className="stats-streak-day active">4</span>
              <span className="stats-streak-day active">5</span>
              <span className="stats-streak-day active">6</span>
              <span className="stats-streak-day active">7</span>
              <span className="stats-streak-day active">8</span>
              <span className="stats-streak-day">9</span>
              <span className="stats-streak-day">10</span>
              <span className="stats-streak-day">11</span>
              <span className="stats-streak-day">12</span>
              <span className="stats-streak-day">13</span>
              <span className="stats-streak-day">14</span>
              <span className="stats-streak-day">15</span>
              <span className="stats-streak-day">16</span>
              <span className="stats-streak-day">17</span>
              <span className="stats-streak-day">18</span>
              <span className="stats-streak-day">19</span>
              <span className="stats-streak-day">20</span>
              <span className="stats-streak-day">21</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
