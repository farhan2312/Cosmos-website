'use client';
// @ts-nocheck -- static coordinate tables; strict index checks add noise without safety value here.
// Bespoke SVG visualisations. Shared language: isometric slabs, fine signal paths,
// travelling particles (SMIL, no React re-renders). Each export tells one section's story.
import type { ReactNode } from 'react';

type P = [number, number];
const iso = (ox: number, oy: number, x: number, y: number, z: number): P => [ox + (x - y) * 0.866, oy + (x + y) * 0.5 - z];
const pts = (a: P[]) => a.map(p => p.map(n => n.toFixed(1)).join(',')).join(' ');

export function Box({ x, y, w, d, h, tone = '', ghost = false }: { x: number; y: number; w: number; d: number; h: number; tone?: string; ghost?: boolean }) {
  const q = (a: number, b: number, c: number) => iso(x, y, a, b, c);
  return (
    <g className={`bx-box ${tone} ${ghost ? 'ghost' : ''}`}>
      <polygon className="f-l" points={pts([q(0, d, 0), q(w, d, 0), q(w, d, h), q(0, d, h)])} />
      <polygon className="f-r" points={pts([q(w, 0, 0), q(w, d, 0), q(w, d, h), q(w, 0, h)])} />
      <polygon className="f-t" points={pts([q(0, 0, h), q(w, 0, h), q(w, d, h), q(0, d, h)])} />
    </g>
  );
}

export function Sig({ d, dur = 4, begin = 0, r = 2.6, cls = 'bx-sig', bounce = false }: { d: string; dur?: number; begin?: number; r?: number; cls?: string; bounce?: boolean }) {
  return (
    <circle r={r} className={cls}>
      <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={d} {...(bounce ? { keyPoints: '0;1;0', keyTimes: '0;0.5;1', calcMode: 'linear' } : {})} />
    </circle>
  );
}

const Svg = ({ vb, children, className = '' }: { vb: string; children: ReactNode; className?: string }) => (
  <svg viewBox={vb} className={`bx ${className}`} aria-hidden="true" preserveAspectRatio="xMidYMid meet">{children}</svg>
);

/* ---------------- Six capability graphics ---------------- */
function AiGraphic() {
  const layers = [[60, [70, 110, 150, 190]], [140, [55, 95, 130, 165, 205]], [260, [80, 130, 180]]] as const;
  const lines: string[] = [];
  for (let l = 0; l < layers.length - 1; l++) for (const a of layers[l][1]) for (const b of layers[l + 1][1]) lines.push(`M${layers[l][0]} ${a} L${layers[l + 1][0]} ${b}`);
  return (
    <Svg vb="0 0 400 260">
      {['Signals', 'Context', 'History', 'Data'].map((t, i) => <g key={t}><line className="bx-line faint" x1="8" x2="52" y1={70 + i * 40} y2={70 + i * 40} /><Sig d={`M8 ${70 + i * 40} H60`} dur={2.4} begin={i * 0.5} r={2} /></g>)}
      {lines.map((d, i) => <path key={i} d={d} className={`bx-line ${i % 5 === 0 ? 'hot' : 'faint'}`} />)}
      <path d="M260 80 C300 80 300 130 330 130 M260 180 C300 180 300 130 330 130 M260 130 H330" className="bx-line" />
      {layers.map(([x, ys], l) => ys.map((y, i) => <circle key={`${l}${i}`} cx={x} cy={y} r={l === 2 ? 7 : 5} className={`bx-node ${(i + l) % 3 === 0 ? 'lit' : ''}`} style={{ animationDelay: `${(i + l) * 0.4}s` }} />))}
      <polygon points="330,105 352,118 352,142 330,155 308,142 308,118" className="bx-core" />
      <circle cx="330" cy="130" r="5" className="bx-deep" />
      <path d="M352 130 H392" className="bx-line hot" /><polygon points="384,124 394,130 384,136" className="bx-deep" />
      <Sig d="M60 110 L140 95 L260 130 L330 130 H392" dur={3.2} />
      <Sig d="M60 190 L140 165 L260 180 C300 180 300 130 330 130" dur={3.8} begin={1.2} />
      <Sig d="M60 70 L140 55 L260 80 C300 80 300 130 330 130" dur={4.4} begin={2} r={2} />
    </Svg>
  );
}

function DataGraphic() {
  return (
    <Svg vb="0 0 400 260">
      {[0, 1, 2].map(i => <Box key={i} x={190} y={118 - i * 34} w={110} d={110} h={4} tone={i === 2 ? 'tint' : ''} />)}
      {[0, 1, 2, 3, 4].map(i => { const [x, y] = iso(190, 50, 18 + i * 18, 55, 0); return <rect key={i} x={x - 3} y={y - 10 - i * 5} width="6" height={14 + i * 5} className={i === 4 ? 'bx-hot' : 'bx-fill'} />; })}
      {[0, 1, 2].map(i => { const d = `M10 ${60 + i * 70} C90 ${60 + i * 70} 120 ${150 - i * 34} 170 ${150 - i * 34}`; return <g key={i}><path d={d} className="bx-line faint" /><Sig d={d} dur={2.6 + i * 0.5} begin={i * 0.7} r={2.2} /><Sig d={d} dur={2.6 + i * 0.5} begin={i * 0.7 + 1.3} r={1.6} cls="bx-sig soft" /></g>; })}
      <path d="M290 110 C330 110 330 130 352 130" className="bx-line hot" />
      <circle cx="366" cy="130" r="14" className="bx-ring" /><circle cx="366" cy="130" r="5" className="bx-deep" />
      <Sig d="M290 110 C330 110 330 130 352 130" dur={1.8} />
      {['Raw', 'Structured', 'Insight'].map((t, i) => <text key={t} x="148" y={208 - i * 34} className="bx-t">{t}</text>)}
      <text x="340" y="164" className="bx-t">Decision</text>
    </Svg>
  );
}

function AutomationGraphic() {
  const branch = ['M150 130 C190 130 190 60 230 60 H300 C330 60 330 130 350 130', 'M150 130 H350', 'M150 130 C190 130 190 200 230 200 H300 C330 200 330 130 350 130'];
  return (
    <Svg vb="0 0 400 260">
      <path d="M20 130 H118" className="bx-line" />
      <rect x="18" y="118" width="38" height="24" rx="5" className="bx-face" /><text x="23" y="134" className="bx-t">Input</text>
      {branch.map((d, i) => <path key={i} d={d} className={`bx-line ${i === 0 ? 'hot route' : 'faint dashed'}`} />)}
      <polygon points="134,112 152,130 134,148 116,130" className="bx-core" />
      {[[230, 60], [265, 60], [300, 60], [250, 130], [230, 200], [300, 200]].map(([x, y], i) => <rect key={i} x={x - 7} y={y - 7} width="14" height="14" rx="3" className={`bx-check ${y === 60 ? 'on' : ''}`} style={{ animationDelay: `${i * 0.5}s` }} />)}
      <circle cx="366" cy="130" r="15" className="bx-ring" /><path d="M359 130 l5 5 l9 -10" className="bx-tick" />
      <Sig d={`M20 130 H134 ${branch[0].slice(8)}`} dur={3.4} />
      <text x="112" y="172" className="bx-t">Decide</text><text x="250" y="42" className="bx-t">Act</text><text x="346" y="166" className="bx-t">Outcome</text>
    </Svg>
  );
}

function EnterpriseGraphic() {
  const lanes = ['ERP', 'CRM', 'Operations'];
  return (
    <Svg vb="0 0 400 260">
      {lanes.map((l, i) => <g key={l}><rect x="14" y={34 + i * 72} width="372" height="50" rx="8" className="bx-lane" /><text x="24" y={54 + i * 72} className="bx-t strong">{l}</text>
        {[0, 1, 2, 3].map(j => <rect key={j} x={110 + j * 70} y={46 + i * 72} width="44" height="26" rx="4" className={`bx-face ${(j + i) % 3 === 1 ? 'lit-face' : ''}`} />)}
        <path d={`M154 ${59 + i * 72} H180 M224 ${59 + i * 72} H250 M294 ${59 + i * 72} H320`} className="bx-line" /></g>)}
      {[132, 272, 342].map((x, k) => { const d = `M${x} ${72} V${118} M${x} ${144} V${190}`; return <g key={x}><path d={d} className="bx-line hot" /><Sig d={`M${x} 72 V190`} dur={2.4 + k * 0.6} begin={k * 0.6} bounce /></g>; })}
      <Sig d="M110 131 H364" dur={4} begin={0.4} r={2} />
    </Svg>
  );
}

function CloudGraphic() {
  const nodes: [number, number][] = [[10, 10], [50, 10], [90, 10], [10, 50], [50, 50], [90, 50], [10, 90], [50, 90], [90, 90]];
  return (
    <Svg vb="0 0 400 260">
      <Box x={200} y={140} w={130} d={130} h={10} />
      <Box x={200} y={110} w={130} d={130} h={6} tone="tint" />
      {nodes.map(([a, b], i) => <Box key={i} x={iso(200, 92, a, b, 0)[0]} y={iso(200, 92, a, b, 0)[1]} w={26} d={26} h={i % 4 === 0 ? 34 : 18 + (i % 3) * 6} tone={i === 4 ? 'hot' : ''} />)}
      {[0, 1, 2].map(i => { const a = iso(200, 92, 23, 23 + i * 40, 0), b = iso(200, 92, 103, 23 + i * 40, 0); const d = `M${a[0]} ${a[1]} L${b[0]} ${b[1]}`; return <Sig key={i} d={d} dur={2.8 + i * 0.4} begin={i * 0.8} r={2} />; })}
      <text x="20" y="232" className="bx-t">Distributed · resilient · scalable</text>
    </Svg>
  );
}

function EmergingGraphic() {
  return (
    <Svg vb="0 0 400 260">
      {Array.from({ length: 12 }, (_, i) => { const c = i % 4, r = Math.floor(i / 4); const [x, y] = iso(200, 40, c * 36, r * 36, 0); return <g key={i} className={`bx-morph m${i % 4}`} style={{ animationDelay: `${i * 0.45}s` }}><Box x={x} y={y} w={26} d={26} h={c === r ? 30 : 14} ghost={(i * 7) % 3 === 0} tone={i === 5 ? 'hot' : ''} /></g>; })}
      <path d="M48 200 C120 210 170 180 200 150 M352 200 C290 210 250 190 228 172" className="bx-line faint dashed" />
      <Sig d="M48 200 C120 210 170 180 200 150" dur={3} />
      <text x="24" y="226" className="bx-t">Concept</text><text x="320" y="226" className="bx-t">Working</text>
    </Svg>
  );
}

export const capabilityGraphics = [AiGraphic, DataGraphic, AutomationGraphic, EnterpriseGraphic, CloudGraphic, EmergingGraphic];

/* ---------------- Our View: integration ---------------- */
export function IntegrationGraphic({ connected }: { connected: boolean }) {
  const left = ['Applications', 'Data', 'People'], right = ['Processes', 'AI', 'Decisions'];
  return (
    <Svg vb="0 0 600 300" className={connected ? 'is-on' : 'is-off'}>
      {left.map((t, i) => { const y = 60 + i * 90, d = `M120 ${y} C200 ${y} 210 150 262 150`; return <g key={t} className="bx-io" style={{ transform: connected ? 'none' : `translate(${-14 + i * 6}px, ${i * 8 - 8}px)` }}><path d={d} className={`bx-line ${connected ? 'hot' : 'faint dashed'}`} />{connected && <Sig d={d} dur={2.6} begin={i * 0.7} />}<rect x="16" y={y - 18} width="104" height="36" rx="8" className={`bx-face ${connected ? 'lit-face' : ''}`} /><circle cx="34" cy={y} r="4" className={connected ? 'bx-hot' : 'bx-fill'} /><text x="46" y={y + 4} className="bx-t strong">{t}</text></g>; })}
      {right.map((t, i) => { const y = 60 + i * 90, d = `M338 150 C390 150 400 ${y} 480 ${y}`; return <g key={t} className="bx-io" style={{ transform: connected ? 'none' : `translate(${14 - i * 6}px, ${8 - i * 8}px)` }}><path d={d} className={`bx-line ${connected ? 'hot' : 'faint dashed'}`} />{connected && <Sig d={d} dur={2.6} begin={1.3 + i * 0.7} />}<rect x="480" y={y - 18} width="104" height="36" rx="8" className={`bx-face ${connected ? 'lit-face' : ''}`} /><circle cx="498" cy={y} r="4" className={connected ? 'bx-hot' : 'bx-fill'} /><text x="510" y={y + 4} className="bx-t strong">{t}</text></g>; })}
      <Box x={300} y={150} w={52} d={52} h={8} />
      <Box x={300} y={136} w={52} d={52} h={8} tone="tint" />
      <Box x={300} y={122} w={52} d={52} h={8} tone={connected ? 'hot' : ''} />
      <text x="300" y="218" textAnchor="middle" className="bx-t strong">{connected ? 'Integration layer' : 'Isolated systems'}</text>
    </Svg>
  );
}

/* ---------------- Approach: four states ---------------- */
export function ApproachGraphic({ phase }: { phase: number }) {
  const scatter: P[] = [[60, 60], [130, 40], [90, 140], [40, 220], [150, 250], [200, 110], [70, 290], [180, 190], [240, 270], [250, 50]];
  return (
    <Svg vb="0 -6 600 416" className="bx-stage" key={phase}>
      {phase === 0 && <g>
        {scatter.map(([x, y], i) => { const d = `M${x} ${y} C${x + 140} ${y} 330 ${110 + (i % 3) * 60} 380 ${110 + (i % 3) * 60}`; return <g key={i}><path d={d} className="bx-line faint" /><Sig d={d} dur={3 + (i % 4) * 0.6} begin={i * 0.3} r={1.8} /><circle cx={x} cy={y} r={4 + (i % 3)} className="bx-node" /></g>; })}
        {[0, 1, 2].map(i => <g key={i}><rect x="380" y={92 + i * 60} width="170" height="36" rx="6" className="bx-face lit-face" /><text x="396" y={115 + i * 60} className="bx-t strong">{['Business', 'Processes', 'Problem'][i]}</text></g>)}
        <path d="M370 84 H360 V256 H370" className="bx-line hot" />
      </g>}
      {phase === 1 && <g>
        <Box x={300} y={210} w={170} d={170} h={6} ghost />
        <Box x={300} y={160} w={130} d={130} h={6} ghost />
        <Box x={300} y={115} w={90} d={90} h={6} ghost />
        <Box x={300} y={75} w={50} d={50} h={18} tone="hot" />
        <path d="M150 210 V75 M140 210 H160 M140 75 H160" className="bx-line hot" />
        <path d="M300 93 V350" className="bx-line faint dashed" />
        <text x="138" y="148" textAnchor="end" className="bx-t">Layers</text>
      </g>}
      {phase === 2 && <g>
        {[0, 1, 2].map(i => <Box key={i} x={300} y={250 - i * 48} w={150 - i * 30} d={150 - i * 30} h={20} tone={i === 2 ? 'hot' : i === 1 ? 'tint' : ''} />)}
        {[[180, 160], [420, 160], [300, 280]].map(([x, y], i) => { const d = `M${x} ${y} L300 ${178}`; return <g key={i}><path d={d} className="bx-line hot" /><Sig d={d} dur={1.8} begin={i * 0.4} /><Box x={x} y={y - 10} w={26} d={26} h={16} /></g>; })}
        <text x="300" y="30" textAnchor="middle" className="bx-t strong">Online</text>
      </g>}
      {phase === 3 && <g>
        {[0, 1, 2].map(i => <Box key={i} x={260} y={250 - i * 48} w={150 - i * 30} d={150 - i * 30} h={20} tone={i === 2 ? 'hot' : 'tint'} />)}
        {[[470, 150], [500, 220], [440, 280]].map(([x, y], i) => <g key={i} className="bx-join" style={{ animationDelay: `${i * 0.5}s` }}><path d={`M${x} ${y} C400 ${y} 360 180 300 180`} className="bx-line hot" /><Sig d={`M300 180 C360 180 400 ${y} ${x} ${y}`} dur={2.2} begin={i * 0.5} /><Box x={x} y={y - 10} w={30} d={30} h={18} tone={i === 0 ? 'hot' : ''} /></g>)}
        <path d="M40 300 C160 300 200 120 320 60" className="bx-line hot" /><text x="40" y="332" className="bx-t">Improving over time</text>
      </g>}
    </Svg>
  );
}

/* ---------------- Connected intelligence: six distinct domains on a shared bus ---------------- */
const glyph = (i: number, x: number, on: boolean): ReactNode => {
  const c = on ? 'bx-hot' : 'bx-fill';
  switch (i) {
    case 0: return <g>{[0, 1, 2].map(k => <circle key={k} cx={x - 14 + k * 14} cy={64 + (k % 2) * 16} r="5" className={c} />)}<path d={`M${x - 14} 64 L${x} 80 L${x + 14} 64`} className="bx-line" /></g>;
    case 1: return <g>{[0, 1, 2, 3].map(k => <rect key={k} x={x - 16 + k * 9} y={86 - k * 8} width="6" height={8 + k * 8} className={c} />)}</g>;
    case 2: return <path d={`M${x - 18} 72 l10 -10 l0 20 z M${x - 4} 72 l10 -10 l0 20 z M${x + 10} 72 l10 -10 l0 20 z`} className={c} />;
    case 3: return <g>{[0, 1, 2].map(k => <rect key={k} x={x - 18} y={58 + k * 11} width="36" height="8" rx="2" className={c} />)}</g>;
    case 4: return <g><path d={`M${x - 20} 86 H${x + 20} M${x - 14} 76 H${x + 14} M${x - 8} 66 H${x + 8}`} className="bx-line" />{[-14, 0, 14].map(k => <circle key={k} cx={x + k} cy={86} r="3" className={c} />)}</g>;
    default: return <g>{[0, 1, 2, 3].map(k => <rect key={k} x={x - 14 + (k % 2) * 16} y={58 + Math.floor(k / 2) * 16} width="12" height="12" className={k === 1 ? c : 'bx-ghostfill'} />)}</g>;
  }
};
export function DomainsGraphic({ active, labels }: { active: number; labels: string[] }) {
  const xs = labels.map((_, i) => 50 + i * 100);
  return (
    <Svg vb="0 0 600 260">
      <rect x="20" y="190" width="560" height="14" rx="7" className="bx-lane" /><text x="300" y="232" textAnchor="middle" className="bx-t">Shared architecture</text>
      {xs.map((x, i) => { const on = i === active; const d = `M${x} 104 V190`; return <g key={i} className={on ? 'bx-active' : ''}><rect x={x - 34} y="44" width="68" height="60" rx="10" className={`bx-face ${on ? 'lit-face' : ''}`} />{glyph(i, x, on)}<path d={d} className={`bx-line ${on ? 'hot' : ''}`} /><text x={x} y="130" textAnchor="middle" className={`bx-t ${on ? 'strong' : ''}`}>{labels[i]}</text></g>; })}
      {xs.map((x, i) => i === active ? null : <g key={`a${i}`}><path d={`M${xs[active]} 196 C${(xs[active] + x) / 2} 170 ${(xs[active] + x) / 2} 170 ${x} 196`} className="bx-line hot" /><Sig d={`M${xs[active]} 196 C${(xs[active] + x) / 2} 170 ${(xs[active] + x) / 2} 170 ${x} 196`} dur={1.8 + i * 0.2} begin={i * 0.2} r={2.2} /></g>)}
      <Sig d={`M${xs[active]} 104 V196`} dur={1.4} />
    </Svg>
  );
}

/* ---------------- Why COSMOS: four principles ---------------- */
export function WhyGraphic({ q }: { q: number }) {
  return (
    <Svg vb="0 0 500 360" className="bx-stage" key={q}>
      {q === 0 && <g>
        <polygon points={pts([iso(250, 70, 0, 0, 0), iso(250, 70, 200, 0, 0), iso(250, 70, 200, 200, 0), iso(250, 70, 0, 200, 0)])} className="bx-boundary" />
        {[0, 1, 2].map(r => [0, 1, 2].map(c => { const [x, y] = iso(250, 70, 20 + c * 62, 20 + r * 62, 0); return <Box key={`${r}${c}`} x={x} y={y} w={40} d={40} h={r === 1 && c === 1 ? 46 : 22 + r * 6} tone={r === 1 && c === 1 ? 'hot' : r === 0 ? 'tint' : ''} />; }))}
        {[0, 1].map(k => { const a = iso(250, 70, 40, 40 + k * 62, 30), b = iso(250, 70, 164, 40 + k * 62, 30); return <Sig key={k} d={`M${a[0]} ${a[1]} L${b[0]} ${b[1]}`} dur={2.4} begin={k} />; })}
        <text x="30" y="340" className="bx-t">Defined boundaries · connected services</text>
      </g>}
      {q === 1 && <g>
        {[0, 1, 2, 3, 4].map(i => <path key={i} d={`M40 180 C${100 + i * 20} ${40 + i * 70} ${200 - i * 10} ${320 - i * 60} ${260} ${100 + i * 40} S${400} ${60 + i * 60} 460 180`} className="bx-line faint dashed" />)}
        {[[150, 90], [210, 280], [330, 110], [300, 260]].map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r="8" className="bx-ghostfill" /><path d={`M${x - 4} ${y - 4} l8 8 M${x + 4} ${y - 4} l-8 8`} className="bx-line" /></g>)}
        <path d="M40 180 H460" className="bx-line hot thick" /><Sig d="M40 180 H460" dur={2.2} r={4} />
        <circle cx="40" cy="180" r="8" className="bx-node lit" /><circle cx="460" cy="180" r="18" className="bx-ring" /><path d="M452 180 l6 6 l10 -12" className="bx-tick" />
        <text x="420" y="220" className="bx-t">Outcome</text>
      </g>}
      {q === 2 && <g>
        {Array.from({ length: 7 }, (_, i) => { const a = (i / 7) * Math.PI * 2, x = 250 + Math.cos(a) * 130, y = 180 + Math.sin(a) * 120; return <g key={i}>
          {Array.from({ length: 7 }, (_, j) => j > i ? (() => { const b = (j / 7) * Math.PI * 2; const d = `M${x} ${y} L${250 + Math.cos(b) * 130} ${180 + Math.sin(b) * 120}`; return <g key={j}><path d={d} className="bx-line draw hot" style={{ animationDelay: `${(i + j) * 0.08}s` }} />{(i + j) % 3 === 0 && <Sig d={d} dur={2 + j * 0.2} begin={i * 0.3} r={2} />}</g>; })() : null)}
          <Box x={x} y={y - 12} w={22} d={22} h={14} tone={i % 3 === 0 ? 'hot' : ''} /></g>; })}
      </g>}
      {q === 3 && <g>
        {[[0, 0], [1, 0], [0, 1], [1, 1]].map(([c, r], i) => { const [x, y] = iso(250, 120, c * 50, r * 50, 0); return <Box key={i} x={x} y={y} w={44} d={44} h={40} tone="tint" />; })}
        {[[2, 0], [2, 1], [0, 2], [1, 2], [-1, 0]].map(([c, r], i) => { const [x, y] = iso(250, 120, c * 50, r * 50, 0); return <g key={i}><g className="bx-slot"><Box x={x} y={y} w={44} d={44} h={40} ghost /></g><g className="bx-dock" style={{ animationDelay: `${i * 0.9}s` }}><Box x={x} y={y} w={44} d={44} h={40} tone={i === 0 ? 'hot' : ''} /></g></g>; })}
        <text x="30" y="340" className="bx-t">Core intact · new capabilities join</text>
      </g>}
    </Svg>
  );
}

/* ---------------- Ecosystem: five domain systems around COSMOS ---------------- */
export function EcosystemGraphic({ active, labels, onSelect }: { active: number; labels: string[]; onSelect: (i: number) => void }) {
  const pos = labels.map((_, i) => { const a = -Math.PI / 2 + (i / labels.length) * Math.PI * 2; return [300 + Math.cos(a) * 200, 200 + Math.sin(a) * 140] as P; });
  return (
    <Svg vb="0 0 600 400">
      {pos.map(([x, y], i) => pos.map(([x2, y2], j) => j > i ? <path key={`${i}${j}`} d={`M${x} ${y} Q300 200 ${x2} ${y2}`} className={`bx-line ${i === active || j === active ? 'hot' : 'faint'}`} /> : null))}
      {pos.map(([x, y], i) => <path key={`c${i}`} d={`M${x} ${y} L300 200`} className={`bx-line ${i === active ? 'hot thick' : 'faint dashed'}`} />)}
      {pos.map(([x, y], i) => i === active ? null : <Sig key={`s${i}`} d={`M${pos[active][0]} ${pos[active][1]} Q300 200 ${x} ${y}`} dur={2.4} begin={i * 0.3} r={2.2} />)}
      <polygon points="300,164 331,182 331,218 300,236 269,218 269,182" className="bx-core" /><text x="300" y="204" textAnchor="middle" className="bx-t strong">COSMOS</text>
      {pos.map(([x, y], i) => <g key={`n${i}`} className={`bx-select ${i === active ? 'bx-active' : ''}`} onClick={() => onSelect(i)}>
        <rect x={x - 70} y={y - 24} width="150" height="48" rx="12" className={`bx-face ${i === active ? 'lit-face' : ''}`} />
        <g transform={`translate(0 ${y - 74})`}>{glyph([0, 2, 1, 3, 5][i] ?? 0, x - 42, i === active)}</g>
        <text x={x - 18} y={y + 4} className={`bx-t ${i === active ? 'strong' : ''}`}>{labels[i]}</text></g>)}
    </Svg>
  );
}

/* ---------------- Problem → solution (dark) ---------------- */
export function ProblemGraphic({ stage }: { stage: number }) {
  const dots: P[] = [[120, 80], [220, 240], [330, 110], [430, 270], [560, 90], [650, 220], [760, 120], [180, 160], [500, 180], [720, 280]];
  const mods = ['AI', 'Automation', 'Data', 'Enterprise'];
  return (
    <Svg vb="0 0 900 340" className="bx-dark bx-stage" key={stage}>
      {stage < 2 && dots.map(([x, y], i) => <g key={i} className={stage === 0 ? 'bx-drift' : ''} style={{ animationDelay: `${i * 0.4}s` }}><circle cx={x} cy={y} r={stage === 0 ? 5 : 7} className={stage === 1 && i % 3 === 0 ? 'bx-hot' : 'bx-fill'} /><circle cx={x} cy={y} r="16" className="bx-halo" /></g>)}
      {stage === 1 && dots.map(([x, y], i) => { const n = dots[(i + 3) % dots.length]; const d = `M${x} ${y} Q450 170 ${n[0]} ${n[1]}`; return <g key={`l${i}`}><path d={d} className="bx-line draw" style={{ animationDelay: `${i * 0.1}s` }} />{i % 3 === 0 && <Sig d={d} dur={3} begin={i * 0.2} r={2} />}</g>; })}
      {stage === 2 && mods.map((m, i) => <g key={m} className="bx-join" style={{ animationDelay: `${i * 0.25}s` }}><Box x={450} y={250 - i * 44} w={180 - i * 20} d={120} h={18} tone={i === 3 ? 'hot' : 'tint'} /><path d={`M${560 - i * 10} ${232 - i * 44} H760`} className="bx-line" /><text x="770" y={236 - i * 44} className="bx-t strong">{m}</text></g>)}
      {stage === 3 && <g>
        {mods.map((m, i) => <Box key={m} x={450} y={250 - i * 44} w={180 - i * 20} d={120} h={18} tone={i === 3 ? 'hot' : 'tint'} />)}
        {['M90 170 C220 170 260 120 360 120', 'M90 230 C220 230 260 200 360 200', 'M540 120 C640 120 680 170 810 170'].map((d, i) => <g key={i}><path d={d} className="bx-line hot" /><Sig d={d} dur={2.2} begin={i * 0.5} r={3} /></g>)}
        <circle cx="824" cy="170" r="16" className="bx-ring" /><path d="M816 170 l6 6 l10 -12" className="bx-tick" />
        <text x="90" y="150" className="bx-t">Need</text><text x="790" y="210" className="bx-t">Working</text>
      </g>}
    </Svg>
  );
}

/* ---------------- Emerging technology: one state per topic ---------------- */
export function FutureGraphic({ title, index }: { title: string; index: number }) {
  const t = title.toLowerCase();
  const kind = t.includes('iot') || t.includes('internet') ? 0 : t.includes('twin') ? 1 : t.includes('block') ? 2 : t.includes('comput') ? 3 : t.includes('prototyp') ? 4 : index % 5;
  return (
    <Svg vb="0 0 500 320" className="bx-stage" key={`${kind}-${index}`}>
      {kind === 0 && <g>{Array.from({ length: 9 }, (_, i) => { const x = 60 + (i % 3) * 70, y = 70 + Math.floor(i / 3) * 80; const d = `M${x} ${y} C${x + 120} ${y} 330 160 400 160`; return <g key={i}><path d={d} className="bx-line faint" /><Sig d={d} dur={2.4 + (i % 4) * 0.4} begin={i * 0.3} r={1.8} /><circle cx={x} cy={y} r="5" className="bx-node" /><circle cx={x} cy={y} r="12" className="bx-ripple" style={{ animationDelay: `${i * 0.35}s` }} /></g>; })}<Box x={420} y={150} w={40} d={40} h={30} tone="hot" /></g>}
      {kind === 1 && <g><Box x={140} y={150} w={80} d={80} h={60} tone="tint" /><Box x={360} y={150} w={80} d={80} h={60} ghost />{[0, 1, 2].map(i => <g key={i}><path d={`M200 ${120 + i * 30} H300`} className="bx-line hot dashed" /><Sig d={`M200 ${120 + i * 30} H300`} dur={1.8} begin={i * 0.5} bounce /></g>)}<text x="100" y="300" className="bx-t">Physical</text><text x="330" y="300" className="bx-t">Digital twin</text></g>}
      {kind === 2 && <g>{[0, 1, 2, 3, 4].map(i => <g key={i}><Box x={70 + i * 90} y={170 - (i % 2) * 20} w={36} d={36} h={30} tone={i === 4 ? 'hot' : 'tint'} />{i < 4 && <path d={`M${96 + i * 90} ${150 - (i % 2) * 20} L${150 + i * 90} ${150 - ((i + 1) % 2) * 20}`} className="bx-line hot thick" />}</g>)}<Sig d="M96 150 L150 130 L186 150 L240 130 L276 150 L330 130 L366 150 L420 130" dur={4} /></g>}
      {kind === 3 && <g>{Array.from({ length: 48 }, (_, i) => { const c = i % 8, r = Math.floor(i / 8); return <rect key={i} x={70 + c * 46} y={30 + r * 44} width="36" height="34" rx="4" className="bx-cell" style={{ animationDelay: `${(c + r) * 0.15}s` }} />; })}</g>}
      {kind === 4 && <g><Box x={150} y={190} w={90} d={90} h={70} ghost /><g className="bx-dock"><Box x={350} y={190} w={90} d={90} h={70} tone="tint" /></g><path d="M220 140 H290" className="bx-line hot" /><polygon points="286,134 298,140 286,146" className="bx-deep" /><text x="110" y="300" className="bx-t">Prototype</text><text x="320" y="300" className="bx-t">Validated</text></g>}
    </Svg>
  );
}

/* ---------------- About: convergence ---------------- */
export function ConvergenceGraphic() {
  const names = ['AI', 'Data', 'Automation', 'Enterprise', 'Infrastructure'];
  return (
    <Svg vb="0 0 600 320">
      {names.map((n, i) => { const a = Math.PI + (i / (names.length - 1)) * Math.PI, x = 300 + Math.cos(a) * 240, y = 290 + Math.sin(a) * 230; const d = `M${x} ${y} Q${(x + 300) / 2} ${y + 40} 300 250`; return <g key={n}><path d={d} className="bx-line hot" /><Sig d={d} dur={3.6} begin={i * 0.6} bounce /><rect x={x - 48} y={y - 16} width="96" height="32" rx="16" className="bx-face" /><text x={x} y={y + 4} textAnchor="middle" className="bx-t strong">{n}</text></g>; })}
      <circle cx="300" cy="250" r="40" className="bx-ring" /><circle cx="300" cy="250" r="26" className="bx-core" />
      <text x="300" y="254" textAnchor="middle" className="bx-t strong">COSMOS</text>
    </Svg>
  );
}
