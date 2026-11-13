'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Sig } from '@/components/cosmos/glyphs/Glyphs';
import { Box, Node, Flow, Label, Ring, Grid, path, pts, type V } from '@/components/cosmos/glyphs/ServiceHeroes';
import { Rack, Tower } from '@/components/cosmos/industries/IndustryArt';
import { layers } from '@/lib/cosmos-experience';

/* About-page artwork: intelligence core hero, complexity→clarity, four process stages,
   six-layer working architecture and three principles. */
const Z = 0.22;
const Svg = ({ vb, label, cls = '', children }: { vb: string; label?: string; cls?: string; children: ReactNode }) =>
  <svg viewBox={vb} className={`gx ia-svg ab-svg ${cls}`} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>{children}</svg>;

function useInView<T extends Element>() {
  const ref = useRef<T>(null); const [seen, setSeen] = useState(false);
  useEffect(() => { const el = ref.current; if (!el) return; const o = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { setSeen(true); o.disconnect(); } }, { threshold: 0.3 }); o.observe(el); return () => o.disconnect(); }, []);
  return [ref, seen] as const;
}

/* Hero: an engineered core column on a round platform, four technology bays wired by conduits, a cloud canopy above. */
export function AboutCore() {
  const bays: { at: V; label: string; draw: ReactNode }[] = [
    { at: [0, -4.4, Z], label: 'DATA', draw: <g>{[0, 1, 2].map(i => <g key={i}>{[0, 0.4, 0.8].map(h => <Box key={h} x={-1.3 + i * 0.9} y={-5.2} z={Z + h} w={0.7} d={0.7} h={0.32} tone={i === 1 && h === 0.8 ? 'on' : 'glass'} />)}</g>)}</g> },
    { at: [4.4, 0, Z], label: 'ENTERPRISE', draw: <g><Tower x={3.6} y={-0.8} w={1} h={2.2} /><Tower x={4.8} y={0.2} w={0.8} h={1.4} /></g> },
    { at: [0, 4.4, Z], label: 'AUTOMATION', draw: <g><Box x={-1.6} y={3.8} z={Z} w={3.2} d={1.2} h={0.18} tone="plate" />{[-1.2, -0.2, 0.8].map(x => <Box key={x} x={x} y={4.1} z={Z + 0.18} w={0.5} d={0.5} h={0.35} tone={x === 0.8 ? 'on' : ''} />)}<Flow d={path([[-1.5, 4.4, Z + 0.2], [1.5, 4.4, Z + 0.2]])} dur={2.2} /></g> },
    { at: [-4.4, 0, Z], label: 'INFRASTRUCTURE', draw: <g>{[0, 0.85].map(o => <Rack key={o} x={-5 + o} y={-0.8} h={1.6} />)}<Rack x={-5} y={0.2} h={1.2} /><Rack x={-4.15} y={0.2} h={1.2} /></g> },
  ];
  return <Svg vb="40 0 560 580" label="The COSMOS intelligence core connecting data, enterprise, automation and infrastructure under a shared cloud layer" cls="ab-core">
    <Ring r={6.2} z={0} cls="ab-disc-edge" />
    <polygon className="ab-disc" points={pts(Array.from({ length: 48 }, (_, i) => [Math.cos(i / 48 * Math.PI * 2) * 6.2, Math.sin(i / 48 * Math.PI * 2) * 6.2, 0] as V))} />
    <Ring r={4.4} z={0.02} cls="g-ln is-dash" />
    {bays.map((b, i) => { const d = path([[b.at[0] * 0.75, b.at[1] * 0.75, Z], [b.at[0] * 0.25, b.at[1] * 0.25, Z]]); return <g key={`c${i}`}><path d={d} className="ia-road" /><Sig d={d} dur={2} delay={i * 0.5} r={3} /></g>; })}
    {[bays[0]!, bays[3]!].map(b => <g key={b.label}>{b.draw}</g>)}
    <g className="ab-column">
      <Box x={-1.1} y={-1.1} z={0} w={2.2} d={2.2} h={0.4} tone="plate" />
      {[0, 1, 2, 3].map(i => <Box key={i} x={-0.7 + i * 0.05} y={-0.7 + i * 0.05} z={0.4 + i * 0.75} w={1.4 - i * 0.1} d={1.4 - i * 0.1} h={0.6} tone={i === 3 ? 'glow' : i % 2 ? 'on' : 'glass'} />)}
      {[1, 2.2, 3.4].map(z => <Ring key={z} r={1.15} z={z} cls="g-ln is-on ab-band" />)}
      {[0, 1, 2, 3].map(i => <Node key={`n${i}`} at={[Math.cos(i * 1.57) * 1.15, Math.sin(i * 1.57) * 1.15, 2.2]} r={3} on delay={i * 0.5} />)}
    </g>
    {[bays[1]!, bays[2]!].map(b => <g key={b.label}>{b.draw}</g>)}
    <g className="ab-canopy">
      <Box x={-3.2} y={-3.2} z={5.6} w={6.4} d={6.4} h={0.14} tone="glass on" />
      {[[-2, -2], [2, -2], [-2, 2], [2, 2]].map(([x, y], i) => <Node key={i} at={[x!, y!, 5.74]} r={3.4} on={i % 2 === 0} />)}
      <Flow d={path([[0, 0, 3.8], [0, 0, 5.6]])} dur={1.6} />
      {[[-2, -2], [2, 2]].map(([x, y], i) => <Flow key={`d${i}`} d={path([[x!, y!, 5.6], [x! * 1.6, y! * 1.6, 1.4]])} dur={2.4} delay={i} dash />)}
    </g>
    {bays.map(b => <Label key={`l${b.label}`} at={[b.at[0] * 1.32, b.at[1] * 1.32, 0]}>{b.label}</Label>)}
    <Label at={[0, 0, 6.6]}>CLOUD</Label>
  </Svg>;
}

/* Complexity → clarity: scattered tools and manual hand-offs resolve into one connected platform when seen. */
const MESSY = [['Spreadsheets', 30, 40, -8], ['Email', 150, 22, 6], ['Legacy app', 40, 118, 5], ['Manual steps', 160, 100, -6], ['Reports', 70, 196, -4], ['Siloed data', 175, 182, 8]] as const;
export function ComplexityClarity() {
  const [ref, seen] = useInView<HTMLDivElement>();
  return <div ref={ref} className={`ab-cc ${seen ? 'is-seen' : ''}`}>
    <Svg vb="0 0 680 280" label="Disconnected tools and manual steps on the left converge into one connected platform on the right">
      <text x="20" y="22" className="ia-cap">COMPLEX</text><text x="470" y="22" className="ia-cap is-on">SIMPLE</text>
      <path d="M115 64 C 140 90, 120 110, 150 125 M220 50 L210 110 M90 148 C 120 180, 100 190, 130 205 M230 130 L240 190" className="g-ln is-dash g-muted ab-mess" />
      <rect x="455" y="40" width="220" height="200" rx="16" className="ab-unify" />
      <g className="ab-links">{[0, 1, 2].map(r => <path key={r} d={`M520 ${77 + r * 50} H620`} className="g-ln is-on" />)}<path d="M570 77 V227" className="g-ln is-on" /><Sig d="M520 77 H620 V177 H520 V227 H620" dur={4} r={3} /></g>
      {MESSY.map(([t, x, y, r]) => <g key={`g${t}`} transform={`rotate(${r} ${x + 50} ${y + 17})`} className="ab-ghostchip"><rect x={x} y={y} width="100" height="34" rx="7" className="ia-sys" /><text x={x + 50} y={y + 22} className="ia-sys-t" textAnchor="middle">{t}</text></g>)}
      {MESSY.map(([t, x, y, r], i) => <g key={t} className="ab-chip" style={{ ['--tx' as string]: `${463 + (i % 2) * 106 - x}px`, ['--ty' as string]: `${60 + Math.floor(i / 2) * 50 - y}px`, ['--r' as string]: `${r}deg`, transitionDelay: `${i * 0.08}s` }}>
        <rect x={x} y={y} width="100" height="34" rx="7" className="ia-sys" /><text x={x + 50} y={y + 22} className="ia-sys-t" textAnchor="middle">{t}</text>
      </g>)}
      <g className="ab-arrow"><path d="M300 140 h60 m-10 -9 l10 9 l-10 9" className="g-ln is-on" /></g>
      <text x="565" y="262" className="ia-cap is-on" textAnchor="middle">ONE CONNECTED WAY OF WORKING</text>
    </Svg>
  </div>;
}

/* Four process stages, each with its own activity. */
function Understand() {
  return <Svg vb="0 0 300 200">
    {[[40, 50], [130, 30], [220, 60], [70, 140], [190, 140]].map(([x, y], i) => <rect key={i} x={x! - 28} y={y! - 14} width="56" height="28" rx="6" className={`ia-sys ${i === 2 ? 'ab-issue' : 'is-on'}`} />)}
    <path d="M68 50 L102 34 M158 32 L192 56 M60 64 L66 126 M98 140 L162 140 M214 74 L196 126" className="g-ln is-on" />
    <circle cx="220" cy="60" r="34" className="ab-lens" /><path d="M244 84 l22 22" className="ab-lens-h" />
    <text x="220" y="65" className="ab-bang" textAnchor="middle">!</text>
    <circle cx="150" cy="100" r="70" className="ab-scan" />
  </Svg>;
}
function Design() {
  return <Svg vb="0 0 300 200">
    <rect x="20" y="20" width="260" height="160" rx="10" className="ab-blueprint" />
    {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M${20 + i * 32.5} 20 V180`} className="ab-bp-grid" />)}
    {Array.from({ length: 5 }, (_, i) => <path key={`h${i}`} d={`M20 ${20 + i * 40} H280`} className="ab-bp-grid" />)}
    <rect x="115" y="30" width="70" height="30" rx="5" className="ia-sys is-on" /><text x="150" y="50" className="ab-t" textAnchor="middle">Goal</text>
    {[[50, 100], [150, 100], [250, 100]].map(([x, y], i) => <g key={i} className="ab-place" style={{ animationDelay: `${i * 0.4}s` }}><rect x={x! - 30} y={y! - 15} width="60" height="30" rx="5" className="ia-sys is-on" /><path d={`M150 60 L${x} ${y! - 15}`} className="g-ln is-on" /></g>)}
    <rect x="40" y="145" width="220" height="22" rx="5" className="ab-found" />
  </Svg>;
}
function Build() {
  const d = 'M40 150 H110 V90 H190 V150 H260';
  return <Svg vb="0 0 300 200">
    {[[40, 150], [110, 90], [190, 90], [260, 150]].map(([x, y], i) => <g key={i}><rect x={x! - 22} y={y! - 22} width="44" height="44" rx="8" className={`ab-block ${i === 3 ? 'is-on' : ''}`} /><path d={`M${x! - 8} ${y} h16 M${x} ${y! - 8} v16`} className="ab-gear" /></g>)}
    <path d={d} className="ia-road" /><Sig d={d} dur={3} r={4} /><Sig d={d} dur={3} delay={1.5} r={4} />
    <path d="M250 150 l7 7 l13 -15" className="ab-tick" />
    <text x="150" y="190" className="ia-cap is-on" textAnchor="middle">WORKING SOLUTION</text>
  </Svg>;
}
function Evolve() {
  return <Svg vb="0 0 300 200">
    <circle cx="110" cy="100" r="54" className="ab-cycle" /><Sig d="M110 46 A54 54 0 1 1 109.9 46" dur={5} r={4} />
    <rect x="86" y="80" width="48" height="40" rx="8" className="ab-block is-on" />
    <polyline points="185,140 205,120 225,128 245,96 265,104 285,70" className="g-ln is-on ab-trend" />
    {[[200, 40], [250, 40]].map(([x, y], i) => <g key={i} className="ab-new" style={{ animationDelay: `${i * 0.8}s` }}><rect x={x! - 20} y={y! - 14} width="40" height="28" rx="6" className="ia-sys is-on" /><path d={`M${x} ${y! + 14} L150 90`} className="g-ln is-dash" /></g>)}
    <text x="110" y="178" className="ia-cap" textAnchor="middle">MONITOR · REFINE · EXTEND</text>
  </Svg>;
}
export const StageArt = [Understand, Design, Build, Evolve];

/* Working architecture: six stacked layers, with relationship flows between them. Selection highlights one layer. */
const ORDER = [5, 0, 1, 2, 3, 4]; // top → bottom: Emerging, Intelligence, Data, Automation, Enterprise, Infrastructure
const LINKS: [number, number, string][] = [[1, 0, 'feeds'], [0, 2, 'decides'], [2, 3, 'executes'], [4, 3, 'supports'], [5, 0, 'extends']];
export function StackArchitecture({ selected, onSelect }: { selected: number; onSelect: (i: number) => void }) {
  const zOf = (i: number) => (5 - ORDER.indexOf(i)) * 1.7 + 0.2;
  return <Svg vb="60 -160 600 620" label="Six technology layers stacked as one architecture, with data feeding intelligence, intelligence guiding automation, enterprise systems coordinating and infrastructure supporting" cls="ab-stack">
    <Grid s={5} z={0} step={1} />
    {ORDER.slice().reverse().map(i => { const z = zOf(i), on = i === selected; const s = i === 5 ? 2.8 : 3.4;
      return <g key={i} className={`ab-layer ${on ? 'is-on' : ''}`} onClick={() => onSelect(i)}>
        <Box x={-s} y={-s} z={z} w={s * 2} d={s * 2} h={0.32} tone={on ? 'glow' : i === 5 ? 'wire' : 'glass'} />
        {i === 0 && <Box x={-0.6} y={-0.6} z={z + 0.32} w={1.2} d={1.2} h={0.4} tone="on" />}
        {i === 1 && <g>{[-2, -1, 0, 1, 2].map(x => <Box key={x} x={x * 0.8 - 0.25} y={1.4} z={z + 0.32} w={0.6} d={0.6} h={0.2 + Math.abs(x) * 0.08} />)}</g>}
        {i === 2 && <Flow d={path([[-2.6, 2.2, z + 0.36], [2.6, 2.2, z + 0.36]])} dur={2.4} />}
        {i === 3 && <g>{[-2.6, -1.4].map(x => <Box key={x} x={x} y={2.4} z={z + 0.32} w={0.8} d={0.8} h={0.3} />)}</g>}
        {i === 4 && <g>{[-2.4, -1.4, -0.4].map(x => <Node key={x} at={[x, 2.8, z + 0.32]} r={2.4} on />)}</g>}
        <Label at={[s + 1.2, -s - 1.2, z]}>{layers[i]!.title.toUpperCase()}</Label>
      </g>; })}
    {LINKS.map(([a, b], k) => { const za = zOf(a) + 0.32, zb = zOf(b) + 0.32; const x = -2.6 + k * 0.35; const d = path([[x, -2.6, za], [x, -2.6, zb]]); const on = selected === a || selected === b;
      return <g key={k}><path d={d} className={`ab-link ${on ? 'is-on' : ''}`} /><Sig d={d} dur={1.8} delay={k * 0.4} r={on ? 3.4 : 2.2} /></g>; })}
  </Svg>;
}

/* Three principles. */
export function BusinessFirst() {
  return <Svg vb="0 0 300 180">
    <circle cx="150" cy="40" r="22" className="ab-goal" /><circle cx="150" cy="40" r="10" className="ab-goal-in" />
    {[60, 150, 240].map((x, i) => <g key={x}><path d={`M150 62 L${x} 108`} className="g-ln is-on" /><Sig d={`M${x} 108 L150 62`} dur={2.4} delay={i * 0.5} r={3} /><rect x={x - 36} y={108} width="72" height="30" rx="6" className="ia-sys is-on" /><text x={x} y={128} className="ab-t" textAnchor="middle">{['Process', 'System', 'Team'][i]}</text></g>)}
    <text x="150" y="168" className="ia-cap" textAnchor="middle">OBJECTIVE FIRST</text>
  </Svg>;
}
export function ConnectedDesign() {
  const pos = [[50, 40], [250, 40], [50, 140], [250, 140], [150, 20], [150, 160]];
  return <Svg vb="0 0 300 180">
    <rect x="110" y="66" width="80" height="48" rx="10" className="ab-block is-on" />
    {pos.map(([x, y], i) => { const d = `M${x} ${y} L150 90`; return <g key={i}><path d={d} className="g-ln is-on" /><Sig d={d} dur={2} delay={i * 0.3} r={2.6} /><rect x={x! - 22} y={y! - 12} width="44" height="24" rx="5" className="ia-sys is-on" /></g>; })}
  </Svg>;
}
export function NextReady() {
  return <Svg vb="0 0 300 180">
    <rect x="20" y="130" width="260" height="26" rx="6" className="ab-found" />
    {[40, 100, 160].map((x, i) => <rect key={x} x={x} y={80} width="50" height="44" rx="6" className={`ab-block ${i === 1 ? 'is-on' : ''}`} />)}
    <g className="ab-new"><rect x="220" y="80" width="50" height="44" rx="6" className="ab-ghost" /><path d="M245 94 v16 M237 102 h16" className="ab-plus" /></g>
    <g className="ab-new" style={{ animationDelay: '1s' }}><rect x="100" y="24" width="50" height="44" rx="6" className="ab-ghost" /><path d="M125 38 v16 M117 46 h16" className="ab-plus" /></g>
    <text x="150" y="174" className="ia-cap" textAnchor="middle">SAME FOUNDATION · NEW MODULES</text>
  </Svg>;
}
