const regulatoryGroups = [
  {
    id: "priority",
    title: "Priority",
    description:
      "Signs that control right of way at junctions and conflict points.",
    signs: [
      {
        id: "stop",
        label: "Stop",
        caption: "Come to a complete stop before proceeding.",
        shape: "octagon",
        family: "priority",
        text: "STOP",
      },
      {
        id: "give-way",
        label: "Give way",
        caption: "Yield to traffic already on the major road.",
        shape: "yield",
        family: "priority",
        text: "YIELD",
      },
      {
        id: "priority-road",
        label: "Priority road",
        caption: "Traffic on this road has priority at upcoming junctions.",
        shape: "diamond",
        family: "priority",
        text: "P",
      },
      {
        id: "end-priority",
        label: "End priority",
        caption: "The priority section ends ahead.",
        shape: "diamond",
        family: "priority",
        mark: "slash",
      },
    ],
  },
  {
    id: "prohibitory",
    title: "Prohibitory",
    description: "Mandatory restrictions on movement, speed, and access.",
    signs: [
      {
        id: "no-entry",
        label: "No entry",
        caption: "Entry is not allowed from this direction.",
        shape: "circle",
        family: "prohibitory",
        mark: "bar",
      },
      {
        id: "no-parking",
        label: "No parking",
        caption: "Stopping to park is prohibited in this zone.",
        shape: "circle",
        family: "prohibitory",
        text: "P",
        mark: "slash",
      },
      {
        id: "speed-limit",
        label: "50 km/h",
        caption: "The maximum allowed speed is fifty kilometres per hour.",
        shape: "circle",
        family: "prohibitory",
        text: "50",
      },
      {
        id: "no-u-turn",
        label: "No U-turn",
        caption: "Turning back in the opposite direction is prohibited.",
        shape: "circle",
        family: "prohibitory",
        text: "U",
        mark: "slash",
      },
    ],
  },
];

const groupedCategories = [
  {
    id: "warning",
    title: "Warning",
    description:
      "Advance notice of hazards, changes in alignment, and risk points.",
    signs: [
      {
        id: "sharp-bend",
        label: "Sharp bend",
        caption: "A strong change in road direction is ahead.",
        shape: "triangle",
        family: "warning",
        text: "BEND",
      },
      {
        id: "school-ahead",
        label: "School ahead",
        caption: "Expect children and crossing activity near the road.",
        shape: "triangle",
        family: "warning",
        text: "SCH",
      },
      {
        id: "slippery-road",
        label: "Slippery road",
        caption: "Surface grip may reduce, especially when wet.",
        shape: "triangle",
        family: "warning",
        text: "SKID",
      },
      {
        id: "pedestrians",
        label: "Pedestrian crossing",
        caption: "Slow down and prepare to give way to pedestrians.",
        shape: "triangle",
        family: "warning",
        text: "PED",
      },
    ],
  },
  {
    id: "informative",
    title: "Informative",
    description:
      "Signs that point out services, facilities, and travel support.",
    signs: [
      {
        id: "parking",
        label: "Parking",
        caption: "An authorized parking area is available nearby.",
        shape: "square",
        family: "informative",
        text: "P",
      },
      {
        id: "hospital",
        label: "Hospital",
        caption: "Medical services are available along this route.",
        shape: "square",
        family: "informative",
        text: "H",
      },
      {
        id: "bus-stop",
        label: "Bus stop",
        caption: "Public bus pick-up and drop-off point ahead.",
        shape: "square",
        family: "informative",
        text: "BUS",
      },
      {
        id: "fuel-station",
        label: "Fuel station",
        caption: "Fuel and service support are available nearby.",
        shape: "square",
        family: "informative",
        text: "FUEL",
      },
    ],
  },
];

function RoadSignGraphic({ sign }) {
  const palette = {
    priority: {
      fill: "#ffffff",
      stroke: "#d73a31",
      text: "#13202f",
      accent: "#f3c84d",
    },
    prohibitory: {
      fill: "#ffffff",
      stroke: "#d73a31",
      text: "#13202f",
      accent: "#d73a31",
    },
    warning: {
      fill: "#fff8cf",
      stroke: "#d88d1b",
      text: "#4f3400",
      accent: "#d88d1b",
    },
    informative: {
      fill: "#1a74d8",
      stroke: "#1a74d8",
      text: "#ffffff",
      accent: "#ffffff",
    },
  }[sign.family];

  const fontSize = sign.text?.length > 4 ? 11 : sign.text?.length > 2 ? 15 : 22;
  const textY = sign.shape === "yield" ? 56 : 54;

  return (
    <svg
      className="road-sign-graphic"
      viewBox="0 0 96 96"
      role="img"
      aria-label={sign.label}
    >
      {sign.shape === "octagon"
        ? <polygon
            points="32,10 64,10 86,32 86,64 64,86 32,86 10,64 10,32"
            fill={palette.stroke}
          />
        : null}

      {sign.shape === "yield"
        ? <polygon
            points="48,10 86,76 10,76"
            fill={palette.fill}
            stroke={palette.stroke}
            strokeWidth="8"
            strokeLinejoin="round"
          />
        : null}

      {sign.shape === "diamond"
        ? <>
            <rect
              x="24"
              y="24"
              width="48"
              height="48"
              rx="4"
              fill={palette.fill}
              stroke={palette.stroke}
              strokeWidth="8"
              transform="rotate(45 48 48)"
            />
            <rect
              x="34"
              y="34"
              width="28"
              height="28"
              rx="2"
              fill={palette.accent}
              transform="rotate(45 48 48)"
            />
          </>
        : null}

      {sign.shape === "circle"
        ? <>
            <circle cx="48" cy="48" r="34" fill={palette.stroke} />
            <circle cx="48" cy="48" r="25" fill={palette.fill} />
          </>
        : null}

      {sign.shape === "triangle"
        ? <polygon
            points="48,10 86,78 10,78"
            fill={palette.fill}
            stroke={palette.stroke}
            strokeWidth="8"
            strokeLinejoin="round"
          />
        : null}

      {sign.shape === "square"
        ? <rect
            x="18"
            y="18"
            width="60"
            height="60"
            rx="14"
            fill={palette.fill}
            stroke={palette.stroke}
            strokeWidth="6"
          />
        : null}

      {sign.mark === "bar"
        ? <rect
            x="22"
            y="43"
            width="52"
            height="10"
            rx="5"
            fill={palette.accent}
          />
        : null}

      {sign.text
        ? <text
            x="48"
            y={textY}
            textAnchor="middle"
            fontSize={fontSize}
            fontWeight="800"
            fill={palette.text}
            style={{ letterSpacing: sign.text.length > 3 ? "0.6px" : "0" }}
          >
            {sign.text}
          </text>
        : null}

      {sign.mark === "slash"
        ? <line
            x1="24"
            y1="72"
            x2="72"
            y2="24"
            stroke={sign.family === "informative" ? "#ffffff" : palette.stroke}
            strokeWidth="8"
            strokeLinecap="round"
          />
        : null}
    </svg>
  );
}

function SignRow({ title, description, signs }) {
  return (
    <div className="road-sign-group">
      <div className="road-sign-group-head">
        <div className="road-sign-group-title">{title}</div>
        <p>{description}</p>
      </div>

      <ul className="road-sign-row" aria-label={title}>
        {signs.map((sign) => (
          <li key={sign.id} className="road-sign-card">
            <div className={`road-sign-figure ${sign.family}`}>
              <RoadSignGraphic sign={sign} />
            </div>
            <div className="road-sign-copy">
              <h3>{sign.label}</h3>
              <p>{sign.caption}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function RoadSign() {
  return (
    <section className="dash-section road-signs-section">
      <div className="dash-section-head road-signs-head">
        <div>
          <div className="dash-section-title">Road signs</div>
          <div className="dash-section-subtitle">
            Scrollable reference rows for the main theory categories.
          </div>
        </div>
        <div className="road-signs-note">Scroll sideways to compare signs.</div>
      </div>

      <div className="road-sign-category">
        <div className="road-sign-category-head">
          <div className="road-sign-category-title">Regulatory</div>
          <p>
            Mandatory instructions and right-of-way rules used on active roads.
          </p>
        </div>

        {regulatoryGroups.map((group) => (
          <SignRow
            key={group.id}
            title={group.title}
            description={group.description}
            signs={group.signs}
          />
        ))}
      </div>

      {groupedCategories.map((category) => (
        <div key={category.id} className="road-sign-category">
          <div className="road-sign-category-head">
            <div className="road-sign-category-title">{category.title}</div>
            <p>{category.description}</p>
          </div>

          <SignRow
            title={`${category.title} signs`}
            description={`Core ${category.title.toLowerCase()} signs for quick dashboard revision.`}
            signs={category.signs}
          />
        </div>
      ))}
    </section>
  );
}
