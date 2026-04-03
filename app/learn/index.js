const unitBlueprints = [
  {
    id: "unit-1",
    number: 1,
    label: "Unit 1",
    title: "Road Foundations",
    summary: "Five open lessons to build the core driving routine.",
    unlocked: true,
  },
  {
    id: "unit-2",
    number: 2,
    label: "Unit 2",
    title: "Live Road Reading",
    summary: "Five open lessons focused on live road reading and decision timing.",
    unlocked: true,
  },
  {
    id: "unit-3",
    number: 3,
    label: "Unit 3",
    title: "Safe Maneuvers",
    summary: "Five open lessons on parking, roundabouts, and emergency control.",
    unlocked: true,
  },
  {
    id: "unit-4",
    number: 4,
    label: "Unit 4",
    title: "Exam Readiness",
    summary: "Five open lessons for mock tests, revision loops, and final prep.",
    unlocked: true,
  },
];

const lessonBlueprints = [
  [
    {
      title: "What Is Driving?",
      subtitle:
        "What driving means, motor vehicle controls, clutch use, shifting gears, and the key features of the model town board.",
      icon: "book",
      focus: "Driving basics",
      overviewTitle: "Lesson 1 content",
      overviewSummary:
        "This lesson builds the learner's first understanding of what driving is, how the steering wheel, gears, brakes, clutch, accelerator, and mirrors work, and how the model town board is used during early practice.",
      overviewTopics: [
        {
          title: "What is driving?",
          points: [
            "Driving is the safe control and movement of a motor vehicle on a road or training board.",
            "A good driver combines observation, judgement, steering control, speed control, and obedience to traffic rules.",
            "Driving is not only moving the car. It is making correct decisions while protecting people, property, and traffic flow.",
          ],
        },
        {
          title: "Motor vehicle controls",
          points: [
            "Steering wheel: used to guide the direction of the vehicle smoothly and accurately.",
            "Gears: used to match engine power to vehicle speed and road conditions.",
            "Brakes: slow or stop the vehicle in a controlled way.",
            "Clutch: temporarily disconnects the engine from the gearbox so the driver can move off smoothly and change gears cleanly.",
            "Accelerator: increases engine power and vehicle movement.",
            "Mirrors: help the driver monitor traffic behind and at the sides before changing speed or direction.",
          ],
        },
        {
          title: "Clutch and shifting gears",
          points: [
            "The clutch disconnects the engine from the gearbox so the driver can select a new gear cleanly.",
            "Press the clutch fully before changing gears, select the gear, then release the clutch smoothly while balancing the accelerator.",
            "Good clutch use prevents stalling, jerking, and rough gear engagement during take-off or gear changes.",
          ],
        },
        {
          title: "Features of the model town board",
          points: [
            "The model town board normally includes junctions, lane markings, crossings, parking bays, signs, and turning routes.",
            "It helps a learner practise observation, lane position, stopping points, and parking routines before moving to busier roads.",
            "The board is used to train confidence in a controlled layout where instructions can be repeated step by step.",
          ],
        },
      ],
      steps: [
        {
          kind: "theory",
          title: "What is driving?",
          duration: "8 min",
          detail:
            "Learn the meaning of driving and the responsibilities that come with moving a motor vehicle safely.",
        },
        {
          kind: "board",
          title: "Motor vehicle controls",
          duration: "10 min",
          detail:
            "Identify the steering wheel, gears, brakes, clutch, accelerator, and mirrors, then link each one to its job.",
        },
        {
          kind: "board",
          title: "Clutch use and shifting gears",
          duration: "9 min",
          detail:
            "Practise how the clutch is used, when to press it, how to release it smoothly, and how it supports gear changes.",
        },
        {
          kind: "board",
          title: "Model town board features",
          duration: "7 min",
          detail:
            "Walk through the features of the model town board and connect them to the first practical driving routines.",
        },
      ],
    },
    {
      title: "Switching On And Stopping The Vehicle",
      subtitle:
        "Switching on a motor vehicle, categories of road signs, gear changing, and the full stopping routine.",
      icon: "star",
      focus: "Vehicle startup",
      overviewTitle: "Lesson 2 content",
      overviewSummary:
        "This lesson moves from vehicle preparation into startup, gear control, road-sign categories, and the correct stopping routine.",
      overviewTopics: [
        {
          title: "Switching on a motor vehicle",
          points: [
            "Check seating position, mirrors, gear position, and handbrake before starting the engine.",
            "Insert the key or use the start system only when the vehicle is secure and ready to move.",
            "Confirm the dashboard indicators, engine sound, and control feel before beginning the drive.",
          ],
        },
        {
          title: "Categories of road signs",
          points: [
            "Regulatory signs give rules and restrictions that must be obeyed.",
            "Warning signs alert the driver to hazards or changes ahead.",
            "Informative signs provide guidance about direction, services, and road support points.",
          ],
        },
        {
          title: "How to change gears",
          points: [
            "Release the accelerator, press the clutch fully, and select the correct gear without forcing the lever.",
            "Release the clutch gradually and add accelerator smoothly so the vehicle does not jerk or stall.",
            "Choose gears according to speed, slope, and traffic situation rather than changing too late.",
          ],
        },
        {
          title: "Stopping a motor vehicle",
          points: [
            "Check mirrors first, then signal if needed and slow down progressively.",
            "Use the brake in good time and press the clutch near the final stop to avoid stalling.",
            "Secure the vehicle with neutral and handbrake when the stop is complete.",
          ],
        },
      ],
      steps: [
        {
          kind: "theory",
          title: "Switching on a motor vehicle",
          duration: "8 min",
          detail:
            "Follow the safe startup routine from seating checks to engine ignition and dashboard confirmation.",
        },
        {
          kind: "signs",
          title: "Categories of road signs",
          duration: "7 min",
          detail:
            "Learn the difference between regulatory, warning, and informative signs and what each category tells the driver.",
        },
        {
          kind: "board",
          title: "How to change gears",
          duration: "9 min",
          detail:
            "Use the clutch and gear lever together correctly so gear changes stay smooth and controlled.",
        },
        {
          kind: "board",
          title: "Stopping a motor vehicle",
          duration: "8 min",
          detail:
            "Practise the full stopping routine using mirrors, braking, clutch timing, neutral, and handbrake control.",
        },
      ],
    },
    {
      title: "Road Markings",
      subtitle: "Use lane paint and road edges to read the road early.",
      icon: "video",
      focus: "Lane reading",
      overviewTitle: "Lesson 3 content",
      overviewSummary:
        "This lesson teaches the learner how painted road markings guide lane choice, speed decisions, and safe stopping before hazards become urgent.",
      overviewTopics: [
        {
          title: "Center line markings",
          points: [
            "Broken center lines normally allow overtaking when the road ahead is clear and safe.",
            "Solid center lines warn the driver to hold position because visibility, bends, or oncoming traffic make crossing unsafe.",
            "Double center lines demand stronger lane discipline and should be treated as a no-cross boundary unless road instructions allow otherwise.",
          ],
        },
        {
          title: "Lane arrows and turn bays",
          points: [
            "Directional arrows prepare the driver early for turning, merging, or choosing the correct lane at a junction.",
            "Turn bays separate turning traffic from through traffic so decisions can be made without blocking the full lane.",
            "Late lane changes near arrows increase risk because other drivers expect the marked direction to be followed.",
          ],
        },
        {
          title: "Edge lines and stop boxes",
          points: [
            "Edge lines help define the safe road boundary, especially where curbs, shoulders, or low light make road edges harder to judge.",
            "Stop lines and boxes mark where the vehicle should wait before a crossing, signal, or restricted area.",
            "Good drivers use these markings as early planning tools instead of reacting only at the final second.",
          ],
        },
      ],
      steps: [
        {
          kind: "theory",
          title: "Center line markings",
          duration: "8 min",
          detail:
            "Learn what broken, solid, and double center lines mean and how they control overtaking and lane position.",
        },
        {
          kind: "board",
          title: "Lane arrows and turn bays",
          duration: "9 min",
          detail:
            "Use guided road layouts to read directional arrows, merge points, and turn-bay markings before reaching the junction.",
        },
        {
          kind: "signs",
          title: "Edge lines and stop boxes",
          duration: "7 min",
          detail:
            "Identify the markings that define road boundaries and exact stopping points around crossings and signals.",
        },
        {
          kind: "quiz",
          title: "Road markings quick check",
          duration: "5 min",
          detail:
            "Confirm that you can match common road markings to the right driving response without hesitation.",
        },
      ],
    },
    {
      title: "Junction Rules",
      subtitle: "Learn who moves first and where risk builds up fastest.",
      icon: "mic",
      focus: "Junction flow",
      overviewTitle: "Lesson 4 content",
      overviewSummary:
        "This lesson focuses on reading junctions early, deciding priority correctly, and entering or turning only when observation and timing are both clear.",
      overviewTopics: [
        {
          title: "Junction approach scan",
          points: [
            "A safe junction routine starts before the stop line by checking mirrors, speed, signs, pedestrians, and vehicles approaching from all sides.",
            "The driver should reduce speed early enough to think clearly rather than arriving too fast and making rushed decisions.",
            "Approach discipline creates more time to choose the correct lane, signal, and stopping point.",
          ],
        },
        {
          title: "Priority and right of way",
          points: [
            "Priority depends on road signs, road markings, traffic signals, and the traffic already established in the junction.",
            "Giving way means waiting without pressure when another road user clearly has the safer legal claim to move first.",
            "Uncertain drivers should pause and reassess rather than forcing entry into a narrowing gap.",
          ],
        },
        {
          title: "Turning at junctions",
          points: [
            "Left and right turns require mirror checks, correct lane position, a signal, and a final look before the steering input begins.",
            "Pedestrians, cyclists, and motorcycles often create the highest hidden risk during the final turn phase.",
            "A smooth turn keeps the vehicle controlled while still leaving space for others already using the road.",
          ],
        },
      ],
      steps: [
        {
          kind: "theory",
          title: "Junction approach scan",
          duration: "8 min",
          detail:
            "Build the early observation routine that prepares you for stopping, giving way, or entering safely.",
        },
        {
          kind: "board",
          title: "Priority and right of way",
          duration: "10 min",
          detail:
            "Read signs, markings, and traffic position correctly so you know who should move first at the junction.",
        },
        {
          kind: "board",
          title: "Turning at junctions",
          duration: "9 min",
          detail:
            "Practise lane position, steering timing, and final observations for safer left and right turns.",
        },
        {
          kind: "quiz",
          title: "Junction decision quiz",
          duration: "5 min",
          detail:
            "Test whether you can choose safe priority decisions under short scenario-based pressure.",
        },
      ],
    },
    {
      title: "Hazard Awareness",
      subtitle: "Spot pedestrians, blind corners, and sudden stops sooner.",
      icon: "dumbbell",
      focus: "Hazard scan",
      overviewTitle: "Lesson 5 content",
      overviewSummary:
        "This lesson trains the learner to notice hazards earlier, predict what may go wrong next, and adjust space and speed before the danger becomes immediate.",
      overviewTopics: [
        {
          title: "Spotting early hazards",
          points: [
            "Hazards often appear first as clues such as brake lights, movement near the roadside, blocked views, or changing traffic speed.",
            "Seeing these clues early gives the driver time to plan instead of reacting suddenly.",
            "A good hazard scan moves far ahead, nearby, to mirrors, and back ahead again in a steady loop.",
          ],
        },
        {
          title: "Blind corners and hidden movement",
          points: [
            "Parked vehicles, walls, bends, and vegetation can hide people, cyclists, or oncoming traffic until the last moment.",
            "When visibility is restricted, the safe response is to reduce speed and widen observation rather than hoping the path stays clear.",
            "Hidden movement should be expected in school areas, markets, and narrow residential roads.",
          ],
        },
        {
          title: "Space and speed response",
          points: [
            "Once a hazard is identified, the driver chooses a response using speed reduction, lane position, horn use when necessary, and extra following distance.",
            "The safest response is usually the earliest smooth one, not the harshest late correction.",
            "Leaving space around the vehicle protects time for a second decision if the first hazard changes unexpectedly.",
          ],
        },
      ],
      steps: [
        {
          kind: "theory",
          title: "Spotting early hazards",
          duration: "8 min",
          detail:
            "Learn the visual clues that show risk is building before a pedestrian, vehicle, or obstacle fully enters your path.",
        },
        {
          kind: "board",
          title: "Blind corners and hidden movement",
          duration: "9 min",
          detail:
            "Work through restricted-view scenarios so you adjust speed and observation before the hidden hazard appears.",
        },
        {
          kind: "board",
          title: "Space and speed response",
          duration: "9 min",
          detail:
            "Practise the smooth control changes that create more room and more time when danger starts to build.",
        },
        {
          kind: "quiz",
          title: "Hazard scan quiz",
          duration: "5 min",
          detail:
            "Check that you can recognize risk clues quickly and choose the safest early response.",
        },
      ],
    },
  ],
  [
    {
      title: "Speed Management",
      subtitle: "Match the road, not just the speed sign.",
      icon: "dumbbell",
      focus: "Speed control",
    },
    {
      title: "Lane Discipline",
      subtitle: "Stay stable through merges, turns, and lane changes.",
      icon: "book",
      focus: "Lane discipline",
    },
    {
      title: "Overtaking Basics",
      subtitle: "Plan safe passes with time, space, and visibility.",
      icon: "star",
      focus: "Safe overtaking",
    },
    {
      title: "Pedestrian Zones",
      subtitle: "Handle school areas, crossings, and shared streets.",
      icon: "video",
      focus: "Pedestrian safety",
    },
    {
      title: "Night Driving",
      subtitle: "See further, react slower, and control glare correctly.",
      icon: "mic",
      focus: "Night routine",
    },
  ],
  [
    {
      title: "Parking Routine",
      subtitle: "Break parking down into clean, repeatable steps.",
      icon: "book",
      focus: "Parking setup",
    },
    {
      title: "Hill Starts",
      subtitle: "Hold control on an incline without panic or rollback.",
      icon: "dumbbell",
      focus: "Hill start",
    },
    {
      title: "Roundabouts",
      subtitle: "Read gaps, exits, and lane choice before entry.",
      icon: "star",
      focus: "Roundabout reading",
    },
    {
      title: "Emergency Response",
      subtitle: "React fast and keep the vehicle stable under pressure.",
      icon: "mic",
      focus: "Emergency response",
    },
    {
      title: "Highway Etiquette",
      subtitle: "Blend speed, spacing, and smooth lane changes.",
      icon: "video",
      focus: "Highway flow",
    },
  ],
  [
    {
      title: "Mock Theory",
      subtitle: "Test your recall under exam-like timing.",
      icon: "star",
      focus: "Theory practice",
    },
    {
      title: "Case Drills",
      subtitle: "Solve scenario-based decisions with confidence.",
      icon: "video",
      focus: "Case analysis",
    },
    {
      title: "Sign Memory",
      subtitle: "Speed up recognition with short repetition cycles.",
      icon: "book",
      focus: "Sign memory",
    },
    {
      title: "Final Revision",
      subtitle: "Tighten the weak points before assessment day.",
      icon: "mic",
      focus: "Revision loop",
    },
    {
      title: "Assessment Warmup",
      subtitle: "Run a final confidence check before the exam.",
      icon: "dumbbell",
      focus: "Exam warmup",
    },
  ],
];

const completionBlueprint = {
  "unit-1": [4, 3, 2, 1, 0],
};

const subLessonBlueprints = [
  {
    kind: "theory",
    suffix: "notes",
    duration: "8 min",
    detail: "Read the concept summary and lock the key rules in memory.",
  },
  {
    kind: "board",
    suffix: "board drill",
    duration: "10 min",
    detail: "Use a guided board example to map the correct driving response.",
  },
  {
    kind: "signs",
    suffix: "sign lab",
    duration: "6 min",
    detail: "Match visual cues to the right action before moving on.",
  },
  {
    kind: "quiz",
    suffix: "quick check",
    duration: "5 min",
    detail: "Finish a short quiz to confirm the lesson is sticking.",
  },
];

function createSubLessons(unit, lessonNumber, focus, lessonBlueprint) {
  const completedCount = completionBlueprint[unit.id]?.[lessonNumber - 1] ?? 0;
  const stepTemplates = lessonBlueprint.steps ?? subLessonBlueprints;

  return stepTemplates.map((template, index) => ({
    id: `${unit.id}-lesson-${lessonNumber}-step-${index + 1}`,
    title: template.title ?? `${focus} ${template.suffix}`,
    kind: template.kind,
    duration: template.duration,
    detail: template.detail,
    completed: unit.unlocked ? index < completedCount : false,
  }));
}

function createLesson(unit, lessonBlueprint, lessonNumber, globalIndex) {
  const lessons = createSubLessons(
    unit,
    lessonNumber,
    lessonBlueprint.focus,
    lessonBlueprint,
  );

  return {
    id: `${unit.id}-lesson-${lessonNumber}`,
    index: globalIndex,
    label: `Lesson ${String(lessonNumber).padStart(2, "0")}`,
    title: lessonBlueprint.title,
    subtitle: lessonBlueprint.subtitle,
    icon: lessonBlueprint.icon,
    unitId: unit.id,
    unitNumber: unit.number,
    unitLabel: unit.label,
    lessonNumber,
    isLocked: !unit.unlocked,
    overviewTitle: lessonBlueprint.overviewTitle,
    overviewSummary: lessonBlueprint.overviewSummary,
    overviewTopics: lessonBlueprint.overviewTopics,
    lessons,
  };
}

let globalLessonIndex = 1;

export const learningUnits = unitBlueprints.map((unit, unitIndex) => {
  const lessons = lessonBlueprints[unitIndex].map(
    (lessonBlueprint, lessonIndex) =>
      createLesson(unit, lessonBlueprint, lessonIndex + 1, globalLessonIndex++),
  );
  const completedSubLessons = lessons.reduce(
    (sum, lesson) =>
      sum + lesson.lessons.filter((entry) => entry.completed).length,
    0,
  );
  const totalSubLessons = lessons.reduce(
    (sum, lesson) => sum + lesson.lessons.length,
    0,
  );
  const completedLessons = lessons.filter((lesson) =>
    lesson.lessons.every((entry) => entry.completed),
  ).length;

  return {
    ...unit,
    lessons,
    completedSubLessons,
    totalSubLessons,
    completedLessons,
    progress: totalSubLessons
      ? Math.round((completedSubLessons / totalSubLessons) * 100)
      : 0,
  };
});

export const learningDays = learningUnits.flatMap((unit) => unit.lessons);

export const learningDayIds = learningDays.map((lesson) => lesson.id);

export const learningOverview = {
  totalUnits: learningUnits.length,
  totalLessons: learningDays.length,
  totalSubLessons: learningDays.reduce(
    (sum, lesson) => sum + lesson.lessons.length,
    0,
  ),
  unlockedLessons: learningDays.filter((lesson) => !lesson.isLocked).length,
};

export function getLearningDay(dayId) {
  return learningDays.find((lesson) => lesson.id === dayId);
}

export function getLearningUnit(unitId) {
  return learningUnits.find((unit) => unit.id === unitId);
}

export function getLearningDayHref(dayId) {
  return `/content/${dayId}`;
}

export function getLearningStep(dayId, stepId) {
  const lesson = getLearningDay(dayId);

  if (!lesson) {
    return null;
  }

  const step = lesson.lessons.find((entry) => entry.id === stepId);

  if (!step) {
    return null;
  }

  return { lesson, step };
}

export function getLearningStepHref(dayId, stepId) {
  return `/content/${dayId}/steps/${stepId}`;
}
