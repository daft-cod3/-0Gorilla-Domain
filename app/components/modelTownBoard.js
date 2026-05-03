import Link from "next/link";
import { getRoadSignHref, roadSigns } from "../data/road-signs";
import { RoadSignGraphic } from "./roadSign";

const modelTownFeatures = [
  {
    title: "Controlled junctions",
    points: [
      "Spot stop, give-way, and merge points early.",
      "Practise priority decisions before live-road sessions.",
      "Use turning pockets without cutting the junction.",
    ],
  },
  {
    title: "Lane guidance",
    points: [
      "Read lane arrows before you move over.",
      "Position early instead of drifting late.",
      "Use edge markings to hold a clean line.",
    ],
  },
  {
    title: "Crossing points",
    points: [
      "Tighten scans near zebra and school crossings.",
      "Reduce speed before bus-stop activity zones.",
      "Cover the brake where people may step out.",
    ],
  },
  {
    title: "Parking drills",
    points: [
      "Repeat angle and reverse parking in marked bays.",
      "Work on slow steering and bay alignment.",
      "Build a routine before the real test route.",
    ],
  },
];

const modelTownIntroPoints = [
  "Read the board like a route map before moving off.",
  "Pick up lane flow, sign positions, and junction controls early.",
  "Use the board to rehearse observation and parking in a lower-risk space.",
];

const modelTownRoutes = [
  {
    id: "one-way-four-lane",
    title: "One-way 4-lane traffic",
    summaryPoints: [
      "All four lanes move in the same direction.",
      "The focus is steady lane discipline and clean changes.",
      "Set up early for turns, bays, and pedestrian points.",
    ],
    lanes: [
      {
        id: "one-way-lane-1",
        label: "Lane 1",
        points: [
          "Use it for early positioning near the kerb.",
          "Good for bay access and calm entry control.",
        ],
        flow: "up",
      },
      {
        id: "one-way-lane-2",
        label: "Lane 2",
        points: [
          "Main through lane once the vehicle is settled.",
          "Hold steady speed and avoid unnecessary drift.",
        ],
        flow: "up",
      },
      {
        id: "one-way-lane-3",
        label: "Lane 3",
        points: [
          "Use for measured lane changes only.",
          "Prepare here before the next board feature.",
        ],
        flow: "up",
      },
      {
        id: "one-way-lane-4",
        label: "Lane 4",
        points: [
          "Outer setup lane for wider turn preparation.",
          "Merge back in smoothly, one lane at a time.",
        ],
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
    summaryPoints: [
      "Traffic moves in both directions on this layout.",
      "Respect the opposing lane at all times.",
      "Use the center lane briefly for controlled turning only.",
    ],
    lanes: [
      {
        id: "two-way-lane-1",
        label: "Forward lane",
        points: [
          "This is your live lane for steady travel.",
          "Stay stable before the next junction or crossing.",
        ],
        flow: "up",
      },
      {
        id: "two-way-lane-2",
        label: "Center lane",
        points: [
          "Shared space for holding or turning briefly.",
          "Never use it as a normal cruising lane.",
        ],
        flow: "turn",
      },
      {
        id: "two-way-lane-3",
        label: "Opposing lane",
        points: [
          "Carries traffic from the opposite direction.",
          "Keep it protected, visible, and undisturbed.",
        ],
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
    summaryPoints: [
      "Use this for diagonal bays.",
      "Aim for a smooth forward entry.",
      "Early setup matters more than late correction.",
    ],
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
    summaryPoints: [
      "Use slow control all the way through.",
      "Keep checking mirrors and blind spots.",
      "Line the vehicle up squarely before stopping.",
    ],
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
    points: [
      "Come to a full stop at the line.",
      "Scan fully before deliberate re-entry.",
    ],
  },
  {
    signId: "give-way",
    point: "Minor-road merge or roundabout approach",
    points: [
      "Slow early and judge the gap size.",
      "Wait for priority traffic to clear.",
    ],
  },
  {
    signId: "one-way",
    point: "Entrance to the 4-lane corridor",
    points: [
      "Confirms one-direction flow ahead.",
      "Do not expect opposing traffic in the corridor.",
    ],
  },
  {
    signId: "no-entry",
    point: "Wrong-way side of the one-way route",
    points: [
      "Blocks wrong-way entry into the route.",
      "Protects the exit mouth from head-on conflict.",
    ],
  },
  {
    signId: "pedestrian-crossing",
    point: "Zebra crossing approach",
    points: [
      "Cover the brake on the approach.",
      "Check both pavements before crossing the markings.",
    ],
  },
  {
    signId: "speed-limit-50",
    point: "Built-up training stretch",
    points: [
      "Match the built-up area to a safer lower speed.",
      "Do not carry extra speed into the next feature.",
    ],
  },
  {
    signId: "parking",
    point: "Marked parking bay zone",
    points: [
      "Marks the correct drill area for parking tasks.",
      "Use it for angle and reverse bay practice.",
    ],
  },
  {
    signId: "no-parking",
    point: "Near junction mouths and crossings",
    points: [
      "Keeps sight lines clear near conflict points.",
      "Prevents parked vehicles from blocking turning judgment.",
    ],
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

function PointList({ items, ordered = false, compact = false, tone = "blue" }) {
  const ListTag = ordered ? "ol" : "ul";

  return (
    <ListTag
      className={`model-town-point-list tone-${tone}${compact ? " compact" : ""}`}
    >
      {items.map((item, index) => (
        <li key={item} className="model-town-point-item">
          <span className="model-town-point-marker" aria-hidden="true">
            {ordered
              ? String(index + 1).padStart(2, "0")
              : <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M3.5 8.5L6.5 11.5L12.5 4.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>}
          </span>
          <span className="model-town-point-copy">{item}</span>
        </li>
      ))}
    </ListTag>
  );
}

export default function ModelTownBoard() {
  return (
    <section className="dash-section model-town-section">
      <div className="dash-section-head model-town-head">
        <div>
          <div className="dash-section-title">Model Town Training Board</div>
          <div className="dash-section-subtitle">
            A tighter training board for route reading, sign placement, and
            parking practice without bulky visual clutter.
          </div>
        </div>
        <div className="model-town-badge">Compact training board</div>
      </div>

      <div className="model-town-intro">
        <PointList items={modelTownIntroPoints} tone="green" compact />
      </div>

      <div className="model-town-feature-grid model-town-scroll-row">
        {modelTownFeatures.map((feature, index) => (
          <article key={feature.title} className="model-town-feature-card">
            <div className="model-town-feature-top">
              <span className="model-town-mini-kicker">Feature</span>
              <span className="model-town-feature-index">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <strong>{feature.title}</strong>
            <PointList items={feature.points} compact tone="blue" />
          </article>
        ))}
      </div>

      <div className="model-town-layout-grid model-town-scroll-row">
        {modelTownRoutes.map((route) => (
          <article key={route.id} className="model-town-layout-card">
            <div className="model-town-card-head">
              <div>
                <span className="model-town-mini-kicker">Road option</span>
                <h3>{route.title}</h3>
              </div>
              <span className="model-town-route-badge">
                {route.lanes.length} lanes
              </span>
            </div>

            <div className="model-town-list-cluster">
              <span className="model-town-mini-kicker">Quick read</span>
              <PointList items={route.summaryPoints} compact tone="green" />
            </div>

            <div
              className="model-town-lane-board"
              style={{
                "--model-town-lanes": route.lanes.length,
              }}
            >
              {route.lanes.map((lane) => (
                <div key={lane.id} className={`model-town-lane ${lane.flow}`}>
                  <span className="model-town-lane-arrow">
                    <RouteArrow flow={lane.flow} />
                  </span>
                  <strong>{lane.label}</strong>
                  <em className="model-town-lane-flow">
                    {lane.flow === "turn"
                      ? "Shared turn flow"
                      : lane.flow === "down"
                        ? "Opposing movement"
                        : "Forward movement"}
                  </em>
                  <PointList
                    items={lane.points}
                    compact
                    tone={
                      lane.flow === "turn"
                        ? "amber"
                        : lane.flow === "down"
                          ? "rose"
                          : "green"
                    }
                  />
                </div>
              ))}
            </div>

            <div className="model-town-list-cluster">
              <span className="model-town-mini-kicker">Practice list</span>
              <PointList items={route.options} compact tone="blue" />
            </div>

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

        <div className="model-town-sign-grid model-town-scroll-row">
          {modelTownSignPoints.map(({ point, points, sign }) => (
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
                <PointList items={points} compact tone="blue" />
              </div>
              <span className="model-town-sign-link">
                <span>Open sign guide</span>
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M3.5 8h8M8.5 3.5L13 8l-4.5 4.5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
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

        <div className="model-town-parking-grid model-town-scroll-row">
          {modelTownParkingGuides.map((guide) => (
            <article key={guide.id} className="model-town-parking-card">
              <div className="model-town-card-head">
                <div>
                  <span className="model-town-mini-kicker">Parking option</span>
                  <h3>{guide.title}</h3>
                </div>
                <span className="model-town-route-badge">
                  {guide.steps.length} steps
                </span>
              </div>
              <div className="model-town-list-cluster">
                <span className="model-town-mini-kicker">Quick read</span>
                <PointList items={guide.summaryPoints} compact tone="amber" />
              </div>
              <div className="model-town-list-cluster">
                <span className="model-town-mini-kicker">Parking list</span>
                <PointList items={guide.steps} ordered compact tone="green" />
              </div>
              <div className="model-town-tip">{guide.tip}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
