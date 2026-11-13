'use client';
type Variant = "network" | "grid" | "orbit" | "circuit" | "path";

const networkNodes: [number, number][] = [[60, 480], [520, 330], [1140, 240], [640, 190], [1180, 280], [760, 420], [300, 60], [700, 160], [180, 300], [980, 90]];
const circuitPaths = [
  "M0 120 H280 Q320 120 320 160 V300 Q320 340 360 340 H620",
  "M1200 80 H940 Q900 80 900 120 V260 Q900 300 860 300 H640",
  "M0 520 H200 Q240 520 240 480 V380 Q240 340 280 340 H480",
  "M1200 560 H1000 Q960 560 960 520 V440 Q960 400 920 400 H700",
];

export function TechField({ variant = "network" }: { variant?: Variant }) {
  return (
    <div className={`tech-field tech-field-${variant}`} aria-hidden="true">
      {variant === "network" && (
        <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
          <g className="tf-lines">
            <path d="M60 480 C260 380 340 460 520 330 S820 180 1140 240" />
            <path d="M0 200 C220 260 420 120 640 190 S980 330 1180 280" />
            <path d="M120 600 C300 500 560 540 760 420 S1020 300 1200 380" />
            <path d="M300 0 C360 160 520 220 700 160 S1000 60 1200 120" />
            <path d="M180 300 C400 280 600 380 760 420" />
          </g>
          <g className="tf-signals">
            <path d="M60 480 C260 380 340 460 520 330 S820 180 1140 240" />
            <path d="M0 200 C220 260 420 120 640 190 S980 330 1180 280" />
            <path d="M120 600 C300 500 560 540 760 420 S1020 300 1200 380" />
          </g>
          <g className="tf-nodes">
            {networkNodes.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4" className={`tf-node tf-n${i % 4}`} />)}
          </g>
        </svg>
      )}
      {variant === "grid" && (
        <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
          <g className="tf-gridlines">
            {[100, 220, 340, 460].map((y) => <line key={y} x1="0" y1={y} x2="1200" y2={y} />)}
            {[150, 350, 550, 750, 950].map((x) => <line key={x} x1={x} y1="0" x2={x} y2="600" />)}
          </g>
          <g className="tf-signals">
            <path d="M150 460 H550 V220 H950 V100" />
            <path d="M350 600 V340 H750 V100" />
          </g>
          <g className="tf-nodes">
            {[[150, 460], [550, 220], [950, 100], [350, 340], [750, 100], [950, 340]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4" className={`tf-node tf-n${i % 4}`} />)}
          </g>
        </svg>
      )}
      {variant === "orbit" && (
        <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
          <g className="tf-rings">
            <circle cx="600" cy="300" r="120" />
            <circle cx="600" cy="300" r="210" />
            <circle cx="600" cy="300" r="300" />
          </g>
          <g className="tf-orbiter tf-o1"><circle cx="600" cy="90" r="5" className="tf-node" /></g>
          <g className="tf-orbiter tf-o2"><circle cx="600" cy="510" r="4" className="tf-node tf-n2" /></g>
          <g className="tf-orbiter tf-o3"><circle cx="900" cy="300" r="4" className="tf-node tf-n1" /></g>
          <circle cx="600" cy="300" r="6" className="tf-node tf-n2" />
        </svg>
      )}
      {variant === "circuit" && (
        <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
          <g className="tf-lines">{circuitPaths.map((d) => <path key={d} d={d} />)}</g>
          <g className="tf-signals">{circuitPaths.slice(0, 3).map((d) => <path key={d} d={d} />)}</g>
          <g className="tf-nodes">
            {[[280, 120], [320, 300], [620, 340], [940, 80], [900, 260], [200, 520], [480, 340], [1000, 560]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4" className={`tf-node tf-n${i % 4}`} />)}
          </g>
        </svg>
      )}
      {variant === "path" && (
        <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
          <g className="tf-lines"><path d="M0 300 C200 300 260 180 420 180 S660 300 780 300 S1040 420 1200 420" /></g>
          <g className="tf-signals"><path d="M0 300 C200 300 260 180 420 180 S660 300 780 300 S1040 420 1200 420" /></g>
          <g className="tf-nodes">
            {[[120, 280], [420, 180], [780, 300], [1080, 400]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="5" className={`tf-node tf-n${i}`} />)}
          </g>
        </svg>
      )}
    </div>
  );
}
