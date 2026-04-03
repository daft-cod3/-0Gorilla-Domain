export const studentProfile = {
  name: "Ari Rowe",
  indexNumber: "GD/24/0184",
  phoneNumber: "+254 712 684 390",
  county: "Kiambu",
  drivingSchool: "GoDomain Driving Academy",
  drivingClass: "Class B learner",
  age: "21 years",
  track: "Class B learner permit",
  nextSession: "Reverse parking drill",
  progress: 78,
  lessonsComplete: "32 / 41 lessons",
  roadHours: "38 hours",
  attendance: "96%",
  coins: 460,
  coinCapacity: 600,
  hp: 82,
  hpCapacity: 100,
  energy: 68,
  energyCapacity: 100,
  level: "Level 07",
  mentor: "Priya Singh",
};

export const heroMetrics = [
  { label: "Learning progress", value: `${studentProfile.progress}%` },
  { label: "Lessons complete", value: studentProfile.lessonsComplete },
  { label: "Attendance", value: studentProfile.attendance },
];

export const profileDetails = [
  {
    label: "Index number",
    value: studentProfile.indexNumber,
    hint: "Exam batch 04",
  },
  {
    label: "Full name",
    value: studentProfile.name,
    hint: "Learner profile is active",
  },
  {
    label: "Phone number",
    value: studentProfile.phoneNumber,
    hint: "Primary contact line",
  },
  {
    label: "County",
    value: studentProfile.county,
    hint: "Regional test center assignment",
  },
  {
    label: "Driving school",
    value: studentProfile.drivingSchool,
    hint: "Main campus intake",
  },
  {
    label: "Age",
    value: studentProfile.age,
    hint: "Verified learner age",
  },
];

export const moduleProgress = [
  { label: "Traffic signs", value: 92 },
  { label: "Parking control", value: 74 },
  { label: "Road positioning", value: 68 },
];

export const profileTools = [
  {
    title: "Theme mode",
    description: "Switch between light and dark study layouts.",
  },
  {
    title: "Learning alerts",
    description: "Keep practical sessions and reminder notices visible.",
  },
  {
    title: "Mentor access",
    description: "Share your learner summary with your driving instructor.",
  },
];

export const profileBalances = [
  {
    id: "hp",
    label: "HP",
    value: studentProfile.hp,
    capacity: studentProfile.hpCapacity,
    note: "Driving confidence and consistency",
    tone: "hp",
  },
  {
    id: "energy",
    label: "Energy",
    value: studentProfile.energy,
    capacity: studentProfile.energyCapacity,
    note: "Daily study stamina remaining",
    tone: "energy",
  },
  {
    id: "coins",
    label: "Coins",
    value: studentProfile.coins,
    capacity: studentProfile.coinCapacity,
    note: "Rewards earned from progress and quizzes",
    tone: "coins",
  },
];

export const profilePerformanceCards = [
  {
    label: "Theory accuracy",
    value: "92%",
    meta: "Quiz precision this week",
  },
  {
    label: "Live hours",
    value: "14.5h",
    meta: "Session time logged",
  },
  {
    label: "Focus rate",
    value: "81%",
    meta: "Study blocks completed",
  },
  {
    label: "Badges",
    value: "12",
    meta: "Milestones unlocked",
  },
];
