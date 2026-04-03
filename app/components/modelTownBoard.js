import Link from "next/link";
import { getRoadSignHref, roadSigns } from "../data/road-signs";
import { RoadSignGraphic } from "./roadSign";

const modelTownFeatures = [
  {
    title: "Controlled junctions",
    description:
      "Stop lines, give-way entries, merges, and turning pockets help learners rehearse priority decisions before road sessions.",
  },
  {
    title: "Lane guidance",
    description:
      "Clearly painted lanes, arrows, and edge markings train learners to position early and read traffic flow without hesitation.",
  },
  {
    title: "Crossing points",
    description:
      "Pedestrian crossings, school-zone approaches, and bus-stop areas show where scanning and speed control must tighten up.",
  },
  {
    title: "Parking drills",
    description:
      "Dedicated bays for angle parking and reverse parking turn board practice into repeatable manoeuvre routines.",
  },
];

const modelTownRoutes = [
  {
    id: "one-way-four-lane",
    title: "One-way 4-lane traffic",
    summary:
      "All four lanes move in the same direction, so the driver focuses on lane discipline, clean lane changes, and correct entry into turns and bays.",
    lanes: [
      {
        id: "one-way-lane-1",
        label: "Lane 1",
        detail: "Calm approach lane for early positioning, bay access, and controlled entry near the kerb.",
        flow: "up",
      },
      {
        id: "one-way-lane-2",
        label: "Lane 2",
        detail: "Main through lane used to keep steady movement once the vehicle is settled.",
        flow: "up",
      },
      {
        id: "one-way-lane-3",
        label: "Lane 3",
        detail: "Passing or transition lane for measured lane changes before the next board feature.",
        flow: "up",
      },
      {
        id: "one-way-lane-4",
        label: "Lane 4",
        detail: "Outer setup lane used when the board requires a wider turn or controlled merge back in.",
        flow: "up",
      },
    ],
    options: [
      "Use the entry sign, lane arrows, and no-entry control at the far end to keep the flow one-directional.",
      "Practise early mirror checks before moving across lanes because late drift is the main mistake on this layout.",
      "Prepare for service bays, pedestrian points, and parking access without cutting across two lanes at once.",
    ],
    tip: "The safest option is always to move one lane at a time and finish all observations before the lane change starts.",
  },
  {
    id: "two-way-three-lane",
    title: "Two-way 3-lane traffic",
    summary:
      "This layout carries traffic in both directions and teaches how to respect opposing flow while using the center space only for controlled turning movement.",
    lanes: [
      {
        id: "two-way-lane-1",
        label: "Forward lane",
        detail: "Your live lane for steady travel toward the next junction or crossing.",
        flow: "up",
      },
      {
        id: "two-way-lane-2",
        label: "Center lane",
        detail: "Shared holding or turning lane used briefly for set turns, never as a cruising lane.",
        flow: "turn",
      },
      {
        id: "two-way-lane-3",
        label: "Opposing lane",
        detail: "Traffic arriving from the other direction, which must always stay protected and visible.",
        flow: "down",
      },
    ],
    options: [
      "Treat the center lane as a turning pocket or buffer area, not an extra lane for overtaking.",
      "Approach junctions with reduced speed because traffic can appear from both sides of the board.",
      "Hold a stable lane position and avoid drifting toward the center unless the board exercise requires a turn.",
    ],
    tip: "On a two-way 3-lane board, the center lane only works when the driver enters it late, uses it briefly, and exits cleanly.",
  },
];

const modelTownParkingGuides = [
  {
    id: "angle-parking",
    title: "Angle parking",
    summary:
      "Use this when the bay is marked diagonally and the car needs a smooth forward entry.",
    steps: [
      "Signal early and slow down so the bay choice is clear before you turn in.",
      "Keep enough side gap, then steer in one clean arc without clipping the front corner line.",
      "Straighten the wheels once the car body is centered between both markings.",
      "Finish fully inside the bay, secure the vehicle, and check door clearance before stopping.",
    ],
    tip: "Angle parking rewards early positioning more than last-second steering correction.",
  },
  {
    id: "reverse-parking",
    title: "Reverse parking",
    summary:
      "Use slow control, mirror checks, and rear reference points to place the vehicle squarely into the bay.",
    steps: [
      "Stop beside the target bay with enough side space for the rear of the car to swing in.",
      "Select reverse, move slowly, and keep scanning mirrors plus blind spots before turning the wheel.",
      "When the rear wheels and body line up with the bay, unwind the steering to straighten the vehicle.",
      "Stop when the car is centered, fully inside the lines, and clear of the rear boundary.",
    ],
    tip: "Reverse parking improves fastest when every movement stays slow enough for corrections without panic.",
  },
];

const modelTownSignPoints = [
  {
    signId: "stop",
    point: "Major junction stop line",
    note: "Used where the board wants a full stop, final scan, and deliberate re-entry into traffic.",
  },
  {
    signId: "give-way",
    point: "Minor-road merge or roundabout approach",
    note: "Teaches the learner to slow early, judge gaps, and wait for priority traffic to clear.",
  },
  {
    signId: "one-way",
    point: "Entrance to the 4-lane corridor",
    note: "Confirms that every lane ahead carries traffic in one direction only.",
  },
  {
    signId: "no-entry",
    point: "Wrong-way side of the one-way route",
    note: "Protects the model board from head-on entry at the exit mouth.",
  },
  {
    signId: "pedestrian-crossing",
    point: "Zebra crossing approach",
    note: "Warns the learner to cover the brake and watch both pavements before crossing the markings.",
  },
  {
    signId: "speed-limit-50",
    point: "Built-up training stretch",
    note: "Shows where the learner must match the board environment to a lower safe speed.",
  },
  {
    signId: "parking",
    point: "Marked parking bay zone",
    note: "Guides the learner to the correct place for angle parking and reverse parking drills.",
  },
  {
    signId: "no-parking",
    point: "Near junction mouths and crossings",
    note: "Keeps sight lines clear where a parked vehicle would block turning judgment.",
  },
]
  .map((entry) => ({
    ...entry,
    sign: roadSigns.find((sign) => sign.id === entry.signId),
  }))
  .filter((entry) => entry.sign);

function RouteArrow({ flow }) {
  if (flow === "turn") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M4 12h16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M8 8l-4 4 4 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 8l4 4-4 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={{ transform: flow === "down" ? "rotate(180deg)" : undefined }}
    >
      <path
        d="M12 20V5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M7 10l5-5 5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ModelTownBoard() {
  return (
    <section className="dash-section model-town-section">
      <div className="dash-section-head model-town-head">
        <div>
          <div className="dash-section-title">Model town board</div>
          <div className="dash-section-subtitle">
            A quick guide to the layouts, signs, and parking tasks learners
            meet on the training board.
          </div>
        </div>
        <div className="model-town-badge">Board drill guide</div>
      </div>

      <div className="model-town-intro">
        Study the board like a map before driving on it. The model town board
        combines junction control, road signs, lane options, and parking bays
        so the learner can practise observation and positioning in a safer
        space first.
      </div>

      <div className="model-town-feature-grid">
        {modelTownFeatures.map((feature) => (
          <article key={feature.title} className="model-town-feature-card">
            <span className="model-town-mini-kicker">Feature</span>
            <strong>{feature.title}</strong>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>

      <div className="model-town-layout-grid">
        {modelTownRoutes.map((route) => (
          <article key={route.id} className="model-town-layout-card">
            <div className="model-town-card-head">
              <div>
                <span className="model-town-mini-kicker">Road option</span>
                <h3>{route.title}</h3>
              </div>
            </div>

            <p>{route.summary}</p>

            <div
              className="model-town-lane-board"
              style={{
                gridTemplateColumns: `repeat(${route.lanes.length}, minmax(0, 1fr))`,
              }}
            >
              {route.lanes.map((lane) => (
                <div
                  key={lane.id}
                  className={`model-town-lane ${lane.flow}`}
                >
                  <span className="model-town-lane-arrow">
                    <RouteArrow flow={lane.flow} />
                  </span>
                  <strong>{lane.label}</strong>
                  <span>{lane.detail}</span>
                </div>
              ))}
            </div>

            <ul className="model-town-checklist">
              {route.options.map((option) => (
                <li key={option}>{option}</li>
              ))}
            </ul>

            <div className="model-town-tip">{route.tip}</div>
          </article>
        ))}
      </div>

      <div className="model-town-block">
        <div className="model-town-card-head">
          <div>
            <span className="model-town-mini-kicker">Sign placement</span>
            <h3>Road signs found at key points</h3>
          </div>
        </div>

        <div className="model-town-sign-grid">
          {modelTownSignPoints.map(({ note, point, sign }) => (
            <Link
              key={sign.id}
              className="model-town-sign-card"
              href={getRoadSignHref(sign.id)}
            >
              <div className={`model-town-sign-figure ${sign.family}`}>
                <RoadSignGraphic sign={sign} />
              </div>
              <div className="model-town-sign-copy">
                <span className="model-town-sign-point">{point}</span>
                <strong>{sign.label}</strong>
                <p>{note}</p>
              </div>
              <span className="model-town-sign-link">Open sign guide</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="model-town-block">
        <div className="model-town-card-head">
          <div>
            <span className="model-town-mini-kicker">Parking</span>
            <h3>Angle parking and reverse parking</h3>
          </div>
        </div>

        <div className="model-town-parking-grid">
          {modelTownParkingGuides.map((guide) => (
            <article key={guide.id} className="model-town-parking-card">
              <span className="model-town-mini-kicker">Parking option</span>
              <h3>{guide.title}</h3>
              <p>{guide.summary}</p>
              <ul className="model-town-checklist">
                {guide.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
              <div className="model-town-tip">{guide.tip}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
