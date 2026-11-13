'use client';
import type { ReactNode } from 'react';
import { Sig } from '@/components/cosmos/glyphs/Glyphs';
import { Box, Node, Flow, Label, Plate, Ring, Grid, p, pts, path, curve, type V } from '@/components/cosmos/glyphs/ServiceHeroes';

/* Industry art: recognisable dimensional pieces (factory, warehouse, turbine…) composed into
   small environments (constellation / ecosystem) and bespoke large hero scenes per industry. */
const Z = 0.22;
type P = { x: number; y: number; w?: number; d?: number; h?: number; on?: boolean };
const xy = (v: V) => p(v).map(n => n.toFixed(1));

export function Factory({ x, y, w = 2, d = 1.6, on }: P) {
  return <g>
    <Box x={x} y={y} z={Z} w={w} d={d} h={0.9} tone={on ? 'on' : ''} />
    {Array.from({ length: Math.floor(w / 0.7) }, (_, i) => <Box key={i} x={x + 0.12 + i * 0.7} y={y + 0.2} z={Z + 0.9} w={0.4} d={d - 0.4} h={0.38} tone="glass on" />)}
    <Box x={x + 0.1} y={y + 0.1} z={Z + 0.9} w={0.35} d={0.35} h={1.4} />
  </g>;
}
export function Robot({ x, y, on = true }: P) {
  const b: V = [x, y, Z + 0.35], e: V = [x - 0.2, y - 0.3, Z + 1.3], t: V = [x + 0.5, y - 0.5, Z + 1.0];
  return <g className="ia-robot"><Box x={x - 0.3} y={y - 0.3} z={Z} w={0.6} d={0.6} h={0.35} tone="on" /><path d={path([b, e, t])} className="ia-arm" /><Node at={e} r={3} /><Node at={t} r={3.4} on={on} /></g>;
}
export function Conveyor({ x, y, w = 3 }: P) {
  const d = path([[x, y + 0.2, Z + 0.3], [x + w, y + 0.2, Z + 0.3]]);
  return <g><Box x={x} y={y} z={Z} w={w} d={0.4} h={0.3} tone="plate" />{[0.4, 1.4, 2.4].filter(o => o < w).map(o => <Box key={o} x={x + o} y={y + 0.05} z={Z + 0.3} w={0.3} d={0.3} h={0.25} tone="on" />)}<path d={d} className="g-ln is-on" /><Sig d={d} dur={3.2} r={2.4} /></g>;
}
export function Warehouse({ x, y, w = 1.8, d = 1.4 }: P) {
  return <g><Box x={x} y={y} z={Z} w={w} d={d} h={1} /><path d={path([[x, y + d / 2, Z + 1.35], [x + w, y + d / 2, Z + 1.35]])} className="ia-ridge" />
    <polygon className="ia-roof" points={pts([[x, y, Z + 1], [x + w, y, Z + 1], [x + w, y + d / 2, Z + 1.35], [x, y + d / 2, Z + 1.35]])} />
    <polygon className="ia-roof-f" points={pts([[x, y + d / 2, Z + 1.35], [x + w, y + d / 2, Z + 1.35], [x + w, y + d, Z + 1], [x, y + d, Z + 1]])} />
    {[0.25, 0.85].filter(o => o < w - 0.3).map(o => <polygon key={o} className="ia-door" points={pts([[x + o, y + d, Z], [x + o + 0.45, y + d, Z], [x + o + 0.45, y + d, Z + 0.6], [x + o, y + d, Z + 0.6]])} />)}
  </g>;
}
export function Truck({ x, y }: P) {
  return <g><Box x={x} y={y} z={Z + 0.1} w={1.3} d={0.6} h={0.75} /><Box x={x + 1.3} y={y + 0.05} z={Z + 0.1} w={0.5} d={0.5} h={0.55} tone="on" />{[0.25, 1.05, 1.55].map(o => <Node key={o} at={[x + o, y + 0.6, Z + 0.1]} r={2.6} />)}</g>;
}
export function Crates({ x, y }: P) {
  return <g>{[[0, 0, 0], [0.5, 0, 0], [0, 0.5, 0], [0.5, 0.5, 0], [0.25, 0.25, 0.4]].map(([a, b, c], i) => <Box key={i} x={x + a!} y={y + b!} z={Z + c!} w={0.45} d={0.45} h={0.4} tone={i === 4 ? 'on' : ''} />)}</g>;
}
export function Tower({ x, y, w = 1.3, h = 2.6 }: P) {
  return <g><Box x={x} y={y} z={Z} w={w} d={w} h={h} tone="glass" />{Array.from({ length: Math.floor(h / 0.45) }, (_, i) => <path key={i} d={path([[x, y + w, Z + 0.3 + i * 0.45], [x + w, y + w, Z + 0.3 + i * 0.45], [x + w, y, Z + 0.3 + i * 0.45]])} className="ia-floor" />)}<Box x={x + 0.2} y={y + 0.2} z={Z + h} w={w - 0.4} d={w - 0.4} h={0.25} tone="glow" /></g>;
}
export function Bars({ x, y, n = 4, h = 1.6 }: P & { n?: number }) {
  const tops: V[] = [];
  const bars = Array.from({ length: n }, (_, i) => { const hh = h * (0.35 + 0.65 * ((i + 1) / n) * (i % 2 ? 0.85 : 1)); tops.push([x + i * 0.5 + 0.18, y + 0.18, Z + hh + 0.25]); return <Box key={i} x={x + i * 0.5} y={y} z={Z} w={0.36} d={0.36} h={hh} tone={i === n - 1 ? 'on' : ''} />; });
  return <g>{bars}<path d={path(tops)} className="g-ln is-on" />{tops.map((t, i) => <Node key={i} at={t} r={2.4} on={i === n - 1} />)}</g>;
}
export function Store({ x, y, w = 2, d = 1.3 }: P) {
  return <g><Box x={x} y={y} z={Z} w={w} d={d} h={1} /><Box x={x - 0.05} y={y + d} z={Z + 0.75} w={w + 0.1} d={0.35} h={0.12} tone="glow" />
    <polygon className="ia-window" points={pts([[x + 0.2, y + d, Z + 0.1], [x + w - 0.2, y + d, Z + 0.1], [x + w - 0.2, y + d, Z + 0.62], [x + 0.2, y + d, Z + 0.62]])} /></g>;
}
export function Home({ x, y }: P) {
  return <g><Box x={x} y={y} z={Z} w={0.7} d={0.7} h={0.5} /><polygon className="ia-roof-f" points={pts([[x, y + 0.7, Z + 0.5], [x + 0.7, y + 0.7, Z + 0.5], [x + 0.35, y + 0.35, Z + 0.9]])} /><polygon className="ia-roof" points={pts([[x + 0.7, y, Z + 0.5], [x + 0.7, y + 0.7, Z + 0.5], [x + 0.35, y + 0.35, Z + 0.9]])} /></g>;
}
export function Turbine({ x, y, h = 3 }: P) {
  const [hx, hy] = p([x, y, Z + h]);
  return <g><path d={path([[x, y, Z], [x, y, Z + h]])} className="ia-mast" />
    <g className="ia-spin" style={{ transformOrigin: `${hx}px ${hy}px` }}>{[0, 120, 240].map(a => <path key={a} d={`M${hx} ${hy} l${(Math.cos(a * Math.PI / 180) * 30).toFixed(1)} ${(Math.sin(a * Math.PI / 180) * 30).toFixed(1)}`} className="ia-blade" />)}</g>
    <circle cx={hx} cy={hy} r={3.5} className="g-nd is-on" /></g>;
}
export function Solar({ x, y, w = 1.4, d = 1 }: P) {
  return <g><path d={path([[x + w / 2, y + d / 2, Z], [x + w / 2, y + d / 2, Z + 0.55]])} className="ia-mast" /><polygon className="ia-panel" points={pts([[x, y, Z + 0.85], [x + w, y, Z + 0.85], [x + w, y + d, Z + 0.35], [x, y + d, Z + 0.35]])} />
    {[1, 2].map(i => <path key={i} d={path([[x + (w * i) / 3, y, Z + 0.85], [x + (w * i) / 3, y + d, Z + 0.35]])} className="ia-cell" />)}</g>;
}
export function Pylon({ x, y, h = 2.2 }: P) {
  return <g><path d={path([[x - 0.3, y, Z], [x, y, Z + h], [x + 0.3, y, Z]])} className="ia-mast" /><path d={path([[x - 0.45, y, Z + h * 0.78], [x + 0.45, y, Z + h * 0.78]])} className="ia-mast" /></g>;
}
export function Clinic({ x, y, w = 1.8, d = 1.4 }: P) {
  return <g><Box x={x} y={y} z={Z} w={w} d={d} h={0.8} /><Box x={x + 0.2} y={y + 0.2} z={Z + 0.8} w={w - 0.4} d={d - 0.4} h={0.8} tone="glass" /><Box x={x + 0.5} y={y + 0.5} z={Z + 1.6} w={w - 1} d={d - 1} h={0.15} tone="on" />
    {[0.2, 0.7, 1.2].filter(o => o < w - 0.3).map(o => <path key={o} d={path([[x + o, y + d, Z + 0.4], [x + o + 0.3, y + d, Z + 0.4]])} className="ia-floor" />)}</g>;
}
export function LabBench({ x, y }: P) {
  return <g><Box x={x} y={y} z={Z} w={1.4} d={0.6} h={0.45} tone="plate" />{[0.15, 0.5, 0.85, 1.2].map((o, i) => <Box key={o} x={x + o - 0.06} y={y + 0.2} z={Z + 0.45} w={0.14} d={0.14} h={0.4 + (i % 2) * 0.2} tone={i === 2 ? 'glow' : 'glass on'} />)}</g>;
}
export function Civic({ x, y, w = 2.4, d = 1.6 }: P) {
  return <g><Box x={x - 0.2} y={y - 0.2} z={Z} w={w + 0.4} d={d + 0.4} h={0.15} tone="plate" /><Box x={x} y={y} z={Z + 0.15} w={w} d={d * 0.55} h={1} />
    {Array.from({ length: 5 }, (_, i) => <Box key={i} x={x + 0.1 + i * ((w - 0.35) / 4)} y={y + d - 0.25} z={Z + 0.15} w={0.15} d={0.15} h={0.9} />)}
    <Box x={x} y={y} z={Z + 1.05} w={w} d={d} h={0.14} />
    <polygon className="ia-pediment" points={pts([[x, y + d, Z + 1.19], [x + w, y + d, Z + 1.19], [x + w / 2, y + d, Z + 1.7]])} />
    <polygon className="ia-roof" points={pts([[x + w / 2, y, Z + 1.7], [x + w / 2, y + d, Z + 1.7], [x + w, y + d, Z + 1.19], [x + w, y, Z + 1.19]])} /></g>;
}
export function CellTower({ x, y, h = 3 }: P) {
  const top: V = [x, y, Z + h];
  return <g><path d={path([[x - 0.35, y, Z], top, [x + 0.35, y, Z]])} className="ia-mast" /><path d={path([[x - 0.25, y, Z + h * 0.3], [x + 0.2, y, Z + h * 0.6], [x - 0.12, y, Z + h * 0.8]])} className="ia-mast thin" />
    {[0.5, 0.9, 1.3].map(r => <Ring key={r} cx={x} cy={y} r={r} z={Z + h} cls="g-ln is-on h-pulse" />)}<Node at={top} on r={4} /></g>;
}
export function Rack({ x, y, h = 1.6 }: P) {
  return <g><Box x={x} y={y} z={Z} w={0.7} d={0.7} h={h} />{Array.from({ length: Math.floor(h / 0.3) }, (_, i) => <Node key={i} at={[x + 0.2, y + 0.7, Z + 0.2 + i * 0.3]} r={1.6} on={i % 2 === 0} delay={i * 0.3} />)}</g>;
}
export function Field({ x, y, w = 3.2, d = 2.4, rows = 6 }: P & { rows?: number }) {
  return <g>{Array.from({ length: rows }, (_, i) => <Box key={i} x={x} y={y + i * (d / rows)} z={Z} w={w} d={(d / rows) * 0.6} h={0.1 + (i % 2) * 0.06} tone={i % 3 === 1 ? 'crop on' : 'crop'} />)}</g>;
}
export function Tractor({ x, y }: P) {
  return <g><Box x={x} y={y} z={Z + 0.12} w={0.9} d={0.6} h={0.35} tone="on" /><Box x={x + 0.5} y={y + 0.05} z={Z + 0.47} w={0.38} d={0.5} h={0.4} tone="glass" /><Node at={[x + 0.2, y + 0.6, Z + 0.15]} r={4} /><Node at={[x + 0.8, y + 0.6, Z + 0.1]} r={2.6} /></g>;
}
export function Sensor({ x, y, h = 1.6 }: P) {
  return <g><path d={path([[x, y, Z], [x, y, Z + h]])} className="ia-mast" />{[0.35, 0.7].map(r => <Ring key={r} cx={x} cy={y} r={r} z={Z + h} cls="g-ln is-on h-pulse" />)}<Node at={[x, y, Z + h]} on r={3.5} /></g>;
}
export function Core({ x = 0, y = 0, z = Z, s = 1 }: { x?: number; y?: number; z?: number; s?: number }) {
  return <g className="ia-core"><Box x={x - 1.2 * s} y={y - 1.2 * s} z={z} w={2.4 * s} d={2.4 * s} h={0.35 * s} tone="on" /><Box x={x - 0.8 * s} y={y - 0.8 * s} z={z + 0.35 * s} w={1.6 * s} d={1.6 * s} h={0.5 * s} />
    <Box x={x - 0.45 * s} y={y - 0.45 * s} z={z + 0.85 * s} w={0.9 * s} d={0.9 * s} h={0.8 * s} tone="glow" /><Ring cx={x} cy={y} r={1.5 * s} z={z + 2 * s} cls="g-ln is-on h-halo" /></g>;
}
const Beam = ({ a, b, delay = 0, on = true }: { a: V; b: V; delay?: number; on?: boolean }) => { const d = path([a, b]); return <><path d={d} className={`ia-beam ${on ? 'is-on' : ''}`} />{on && <Sig d={d} dur={2.4} delay={delay} r={2.6} />}</>; };

/* Small environment centred on (x, y) — used in the ecosystem hero and the constellation. */
export function Env({ slug, x = 0, y = 0 }: { slug: string; x?: number; y?: number }) {
  const o = (a: number, b: number) => ({ x: x + a, y: y + b });
  switch (slug) {
    case 'manufacturing': return <g><Factory {...o(-1.5, -1.4)} /><Conveyor {...o(-1.5, 0.6)} w={2.8} /><Robot {...o(1.1, -0.2)} /></g>;
    case 'supply-chain-logistics': return <g><Warehouse {...o(-1.6, -1.6)} /><Crates {...o(0.6, -1.4)} /><Flow d={curve([x - 0.6, y, Z], [x + 1.2, y + 1, Z], 0.8)} dur={2.6} /><Truck {...o(-1.2, 0.6)} /></g>;
    case 'financial-services': return <g><Tower {...o(-1.6, -1.5)} /><Bars {...o(0, 0.3)} n={4} /></g>;
    case 'retail-consumer': return <g><Store {...o(-1.6, -1.5)} /><Crates {...o(0.7, -0.6)} /><Flow d={curve([x - 0.4, y + 0.3, Z], [x + 1.2, y + 1.4, Z], 0.6)} dur={2.4} /><Home {...o(1, 1)} /></g>;
    case 'energy-utilities': return <g><Solar {...o(0, 0.2)} /><Turbine {...o(-1, -0.9)} h={2.6} /><Pylon {...o(1.3, -1.2)} /></g>;
    case 'healthcare-life-sciences': return <g><Clinic {...o(-1.6, -1.5)} /><LabBench {...o(0.1, 0.6)} /><Flow d={curve([x + 0.2, y - 0.3, Z + 0.8], [x + 0.8, y + 0.8, Z + 0.7], 0.8)} dur={2.4} /></g>;
    case 'government-public-sector': return <g><Civic {...o(-1.3, -1.2)} /><Node at={[x + 1.6, y + 1.2, Z]} r={3} on /><Flow d={path([[x - 0.2, y + 0.9, Z], [x + 1.6, y + 1.2, Z]])} dur={2.2} /></g>;
    case 'telecommunications': return <g><CellTower {...o(-0.8, -0.6)} h={2.8} /><Rack {...o(0.7, 0.3)} /><Rack {...o(0.7, -0.6)} h={1.2} /><Flow d={path([[x - 0.8, y - 0.6, Z], [x + 0.7, y + 0.6, Z]])} dur={1.8} /></g>;
    case 'agriculture': return <g><Field {...o(-1.7, -1.3)} w={3.2} d={2.6} /><Sensor {...o(-1.2, -1.1)} /><Tractor {...o(0.4, 0.5)} /></g>;
    default: return null;
  }
}

/* Industries hero: one platform, nine environments on a 3x3 grid, an intelligence layer above sharing capabilities down to each. */
export function IndustryEcosystem({ slugs, label }: { slugs: string[]; label: string }) {
  const pos = [[-4.2, -4.2], [0, -4.2], [4.2, -4.2], [-4.2, 0], [0, 0], [4.2, 0], [-4.2, 4.2], [0, 4.2], [4.2, 4.2]] as const;
  const cz = 5.4;
  return <svg viewBox="40 -20 560 600" className="gx ia-svg ia-ecosystem" role="img" aria-label={label}>
    <Box x={-6.4} y={-6.4} z={-0.3} w={12.8} d={12.8} h={0.3} tone="plate" />
    {[-2.1, 2.1].map(v => <path key={v} d={`${path([[v, -6.2, 0], [v, 6.2, 0]])} ${path([[-6.2, v, 0], [6.2, v, 0]])}`} className="ia-lane" />)}
    {pos.map(([a, b], i) => <Box key={`t${i}`} x={a - 1.95} y={b - 1.95} z={0} w={3.9} d={3.9} h={0.1} tone="tile" />)}
    {pos.map(([a, b], i) => <Env key={slugs[i]} slug={slugs[i]!} x={a} y={b} />)}
    {pos.map(([a, b], i) => <Beam key={`b${i}`} a={[0, 0, cz]} b={[a, b, 2.4]} delay={i * 0.35} on={i !== 4} />)}
    <Box x={-2.6} y={-2.6} z={cz - 0.3} w={5.2} d={5.2} h={0.12} tone="glass on" />
    <Core z={cz} s={1.1} />
  </svg>;
}

/* Bespoke large hero scenes, one per industry. */
const scenes: Record<string, () => ReactNode> = {
  manufacturing: () => <>
    <Plate /><Grid />
    <Factory x={-5} y={-5} w={4.2} d={3} />
    <Conveyor x={-4.6} y={0.4} w={6.2} />
    <Robot x={-2.6} y={-0.6} /><Robot x={0.4} y={-0.6} />
    <Box x={2.2} y={-1} z={Z} w={1.6} d={1.6} h={1.2} tone="on" /><Node at={[3, -0.2, Z + 1.6]} r={5} on />
    {[[-3.6, -2], [-1.2, -2], [1.8, -2]].map(([a, b], i) => <Flow key={i} d={curve([a!, b!, 1.4], [3.8, 3.2, 3.2], 1.2)} dur={3} delay={i * 0.7} />)}
    <g className="ia-twin"><Box x={2} y={2.4} z={1.6} w={3.4} d={2.2} h={0.08} tone="glass on" />{[0.3, 1.1, 1.9].map((o, i) => <Box key={o} x={2.4 + o} y={2.9} z={1.68} w={0.5} d={1.2} h={0.4 + i * 0.25} tone="wire" />)}</g>
    <Label at={[-3, -5.6, 2.6]}>PRODUCTION</Label><Label at={[-1, 2.6, 0]}>SENSOR DATA</Label><Label at={[6.4, 3.6, 3]}>DIGITAL TWIN</Label>
  </>,
  'supply-chain-logistics': () => {
    const route = path([[-4, -3.4, Z], [-4, 1, Z], [0, 1, Z], [0, 4, Z], [4, 4, Z]]);
    return <>
      <Plate /><Grid step={2} />
      <Warehouse x={-5.4} y={-5.4} w={3.2} d={2.4} />
      <Crates x={-1.6} y={-5} /><Crates x={-0.4} y={-5} />
      <path d={route} className="ia-road" /><Sig d={route} dur={6} r={3.4} /><Sig d={route} dur={6} delay={3} r={3.4} />
      <Truck x={-4.4} y={0.6} /><Truck x={-0.6} y={3.6} />
      <Box x={2.2} y={-2.8} z={Z} w={2.4} d={2.4} h={0.6} tone="on" /><Box x={2.8} y={-2.2} z={Z + 0.6} w={1.2} d={1.2} h={0.6} tone="glow" />
      {[[-3.8, -3], [-1, -4.4], [0, 1], [4, 4]].map(([a, b], i) => <Flow key={i} d={curve([a!, b!, 0.4], [3.4, -1.6, 1.3], 1.4)} dur={2.6} delay={i * 0.5} dash />)}
      <Home x={4.2} y={3.4} />
      <Label at={[-4, -6.2, 1.6]}>WAREHOUSE</Label><Label at={[3.4, -3.6, 2.4]}>CONTROL TOWER</Label><Label at={[5.2, 4.4, 0]}>DELIVERY</Label>
    </>;
  },
  'financial-services': () => <>
    <Plate /><Grid />
    <Tower x={-5} y={-5} w={2} h={4} /><Tower x={-2.4} y={-5} w={1.4} h={2.8} />
    {[-4, -2.4, -0.8, 0.8].map((y, i) => <Box key={y} x={-5} y={y + 2.4} z={Z} w={2.6} d={1.2} h={0.14} tone={i === 2 ? 'on' : 'glass'} />)}
    {[-4, -2.4, -0.8, 0.8].map((y, i) => <Flow key={`f${y}`} d={path([[-2.4, y + 3, Z + 0.14], [0.6, 0, Z + 0.4]])} dur={2.4} delay={i * 0.5} />)}
    <Box x={0.2} y={-1.2} z={Z} w={2.4} d={2.4} h={0.7} /><Box x={0.7} y={-0.7} z={Z + 0.7} w={1.4} d={1.4} h={0.7} tone="glow" />
    <Bars x={2.4} y={2.4} n={6} h={2.6} />
    <g>{[0.9, 1.5].map(r => <Ring key={r} cx={4} cy={-3} r={r} z={Z + 0.1} cls="g-ln is-dash" />)}<Ring cx={4} cy={-3} r={0.5} z={Z + 0.1} cls="g-ln is-on h-pulse" /><Node at={[4.6, -3.4, Z]} r={4} on /></g>
    <Flow d={path([[1.4, 0, Z + 1.4], [4, -3, Z + 0.1]])} dur={2} /><Flow d={path([[1.4, 0, Z + 1.4], [3.6, 2.6, Z + 1.6]])} dur={2.2} />
    <Label at={[-6.4, 1.4, 0]}>TRANSACTIONS</Label><Label at={[1.4, 0, 3]}>MODELS</Label><Label at={[4.6, -5, 0]}>RISK</Label><Label at={[6.4, 3.4, 4.2]}>DECISION</Label>
  </>,
  'retail-consumer': () => {
    const journey = path([[-4.6, 4, Z], [-2.6, 1, Z], [0, 0, Z], [2.4, -2.4, Z], [4.4, -4.2, Z]]);
    return <>
      <Plate /><Grid step={1.5} />
      <path d={journey} className="ia-road" /><Sig d={journey} dur={5} r={3.4} /><Sig d={journey} dur={5} delay={2.5} r={3.4} />
      <Home x={-5.2} y={3.6} />
      <Box x={-3.4} y={0.2} z={Z} w={1.2} d={0.2} h={1.6} tone="glass on" /><Box x={-3.2} y={0.1} z={Z} w={0.8} d={0.1} h={0.15} />
      <Store x={-1.2} y={-1.8} w={2.6} d={1.6} />
      <Warehouse x={2} y={-5.2} w={2.6} d={1.8} />
      <Crates x={4.6} y={-2.2} />
      <Box x={2} y={2} z={Z} w={3.4} d={3.4} h={0.12} tone="glass" />
      {[[0, 0], [1, 1], [2, 0], [0, 2], [2, 2], [1, 3]].map(([a, b], i) => <Node key={i} at={[2.4 + a!, 2.3 + b!, Z + 0.4]} r={3} on={i === 4} delay={i * 0.4} />)}
      {[[-4.8, 4], [-2.8, 1], [0, -0.2]].map(([a, b], i) => <Flow key={i} d={curve([a!, b!, 0.6], [3.6, 3.6, 0.6], 1.2)} dur={2.8} delay={i * 0.6} dash />)}
      <Label at={[-5.4, 5.2, 0]}>CUSTOMER</Label><Label at={[0, -2.6, 2.4]}>COMMERCE</Label><Label at={[3.4, -6, 2]}>FULFILMENT</Label><Label at={[3.8, 5.8, 0]}>INSIGHT</Label>
    </>;
  },
  'energy-utilities': () => {
    const line = path([[-4.6, -3.2, Z + 2.2], [-1.2, -1.2, Z + 2.2], [2.2, 0.8, Z + 2.2], [4.6, 3.6, Z + 1]]);
    return <>
      <Plate /><Grid />
      <Turbine x={-5} y={-5} h={3.6} /><Turbine x={-3.2} y={-5.2} h={3} /><Turbine x={-5.2} y={-2.8} h={2.6} />
      {[[-4.6, 1.2], [-3, 1.2], [-4.6, 2.6], [-3, 2.6]].map(([a, b], i) => <Solar key={i} x={a!} y={b!} w={1.3} d={1} />)}
      <Pylon x={-1.2} y={-1.2} /><Pylon x={2.2} y={0.8} />
      <path d={line} className="g-ln is-on" /><Sig d={line} dur={3} r={3} /><Sig d={line} dur={3} delay={1.5} r={3} />
      <Box x={0.4} y={-5} z={Z} w={2.4} d={2} h={0.9} /><Box x={0.8} y={-4.6} z={Z + 0.9} w={1.6} d={1.2} h={0.25} tone="on" />
      {[[3.6, 2.4], [4.6, 3.6], [3.4, 4.6], [5, 1.8]].map(([a, b], i) => <g key={i}><Home x={a!} y={b!} /><Node at={[a! + 0.35, b! + 0.35, Z + 1.2]} r={2.6} on={i % 2 === 0} delay={i * 0.5} /></g>)}
      {[[3.6, 2.4], [5, 1.8]].map(([a, b], i) => <Flow key={i} d={curve([a!, b!, 1.2], [1.6, -4, 1.3], 1.6)} dur={2.6} delay={i} dash />)}
      <Label at={[-6.4, -4.6, 3.6]}>GENERATION</Label><Label at={[0.6, -0.6, 3.4]}>TRANSMISSION</Label><Label at={[1.6, -5.6, 1.8]}>MONITORING</Label><Label at={[5.6, 5.2, 0]}>SMART METERS</Label>
    </>;
  },
  'healthcare-life-sciences': () => <>
    <Plate /><Grid />
    <Clinic x={-5.2} y={-5.2} w={3} d={2.4} />
    <LabBench x={1.2} y={-4.8} /><LabBench x={1.2} y={-3.6} />
    <Box x={-1} y={-1} z={Z} w={2} d={2} h={0.5} tone="on" /><Box x={-0.6} y={-0.6} z={Z + 0.5} w={1.2} d={1.2} h={0.8} tone="glow" />
    {[[-3.6, -3.6], [2, -4.2], [3.6, 2], [-3.6, 3]].map(([a, b], i) => <Flow key={i} d={curve([a!, b!, 0.6], [0, 0, 1.3], 1)} dur={2.6} delay={i * 0.6} />)}
    <g>{[0, 1, 2].map(i => <Box key={i} x={2.6} y={1.2 + i * 0.9} z={Z} w={2.2} d={0.7} h={0.12 + i * 0.02} tone={i === 1 ? 'on' : 'glass'} />)}</g>
    <g>{[0, 1, 2, 3].map(i => <Node key={i} at={[-4.8 + i * 1.1, 3 + (i % 2) * 0.6, Z + 0.2]} r={4} on={i === 3} delay={i * 0.5} />)}<path d={path([[-4.8, 3, Z + 0.2], [-3.7, 3.6, Z + 0.2], [-2.6, 3, Z + 0.2], [-1.5, 3.6, Z + 0.2]])} className="g-ln is-on" /></g>
    <Label at={[-3.8, -6, 2.2]}>CLINICAL</Label><Label at={[2, -5.8, 1.4]}>LABORATORY</Label><Label at={[6.2, 2.6, 0.6]}>RESEARCH DATA</Label><Label at={[-2.6, 5.4, 0]}>PATIENT SERVICES</Label>
  </>,
  'government-public-sector': () => <>
    <Plate /><Grid step={2} />
    <Civic x={-1.6} y={-5.2} w={3.4} d={2.2} />
    {[[-5, -1], [-5, 2.4], [3.2, -1], [3.2, 2.4]].map(([a, b], i) => <Box key={i} x={a!} y={b!} z={Z} w={1.8} d={1.6} h={0.8 + (i % 2) * 0.4} tone={i === 2 ? 'on' : ''} />)}
    <Box x={-1.6} y={-0.6} z={Z} w={3.2} d={3.2} h={0.18} tone="glass on" />
    <g>{[0.8, 1.6].map(r => <Ring key={r} r={r} cx={0} cy={1} z={Z + 0.25} cls="g-ln is-dash" />)}</g>
    <Node at={[0, 1, Z + 0.6]} r={6} on />
    {[[-4.1, -0.2], [-4.1, 3.2], [4.1, -0.2], [4.1, 3.2], [0, -3]].map(([a, b], i) => <Flow key={i} d={path([[a!, b!, Z + 0.4], [0, 1, Z + 0.4]])} dur={2.2} delay={i * 0.45} />)}
    {[0, 1, 2].map(i => <Box key={`c${i}`} x={-0.9 + i * 0.7} y={4.6} z={Z} w={0.45} d={0.45} h={0.8} tone="glass" />)}
    <Flow d={path([[0, 1, Z + 0.4], [0, 4.6, Z + 0.4]])} dur={2} />
    <Label at={[0, -6.2, 2.8]}>DEPARTMENTS</Label><Label at={[0, 1, 3.2]}>SECURE PLATFORM</Label><Label at={[0, 6.2, 0]}>DIGITAL SERVICES</Label>
  </>,
  telecommunications: () => {
    const fibre = path([[-4.4, -3.6, Z + 0.05], [-1, -1, Z + 0.05], [0, 2.8, Z + 0.05], [3.6, 3.6, Z + 0.05]]);
    return <>
      <Plate /><Grid />
      <CellTower x={-4.4} y={-3.6} h={4} /><CellTower x={2.8} y={-4} h={3.2} />
      <path d={fibre} className="ia-road" /><Sig d={fibre} dur={3} r={3} /><Sig d={fibre} dur={3} delay={1.5} r={3} />
      <Flow d={path([[2.8, -4, Z], [-1, -1, Z]])} dur={2} />
      {[0, 0.9, 1.8].map((o, i) => <Rack key={o} x={-1.6 + o} y={-1.6} h={1.6 + (i % 2) * 0.4} />)}
      <Box x={-1.8} y={-1.8} z={-0.05} w={3} d={1.2} h={0.27} tone="plate" />
      {[[3.4, 3], [4.6, 2], [4.4, 4.4], [2.4, 4.6]].map(([a, b], i) => <g key={i}><Box x={a!} y={b!} z={Z} w={0.4} d={0.2} h={0.6} tone="glass on" /><Flow d={path([[3.6, 3.6, Z], [a!, b!, Z]])} dur={1.6} delay={i * 0.4} /></g>)}
      <g>{[1.6, 2.4].map(r => <Ring key={r} r={r} cx={-0.4} cy={-1} z={2.8} cls="g-ln is-dash" />)}<Node at={[-0.4, -1, 2.8]} on r={6} /></g>
      <Label at={[-4.4, -5, 4.6]}>TOWERS</Label><Label at={[-0.4, -1, 4.4]}>NETWORK INTELLIGENCE</Label><Label at={[5, 4.8, 0]}>DEVICES</Label><Label at={[-2.8, 1.6, 0]}>FIBRE</Label>
    </>;
  },
  agriculture: () => <>
    <Plate /><Grid step={3} />
    <Field x={-5.6} y={-5.6} w={5} d={5} rows={9} />
    <Field x={0.6} y={0.6} w={5} d={5} rows={8} />
    <Tractor x={-3} y={-2.4} /><Tractor x={2.6} y={3.2} />
    <Sensor x={-1.2} y={-5} h={2} /><Sensor x={-5} y={-1.2} h={1.6} /><Sensor x={4.8} y={1.2} h={1.8} />
    <Box x={1} y={-5} z={Z} w={1.6} d={1.6} h={1.6} tone="glass" /><Box x={1.3} y={-4.7} z={Z + 1.6} w={1} d={1} h={0.4} tone="on" />
    <g className="ia-weather">{[0, 0.8, 1.6].map(o => <Node key={o} at={[3.6 + o, -3.6, 4]} r={11 - o * 2} />)}</g>
    {[[-1.2, -5, 2.2], [-5, -1.2, 1.8], [4.8, 1.2, 2], [4.4, -3.6, 4]].map(([a, b, c], i) => <Flow key={i} d={curve([a!, b!, c!], [1.8, -4.2, 2.2], 0.8)} dur={2.6} delay={i * 0.5} dash />)}
    <Label at={[-6.6, -2, 0]}>FIELDS</Label><Label at={[0.4, -5.4, 2.2]}>FARM DATA</Label><Label at={[6, -2.4, 4.6]}>WEATHER</Label><Label at={[3.8, 6.2, 0]}>MACHINERY</Label>
  </>,
};

export function IndustryScene({ slug, label }: { slug: string; label: string }) {
  const S = scenes[slug] ?? scenes['manufacturing']!;
  return <svg viewBox="0 0 640 600" className="gx ia-svg ia-hero-svg" role="img" aria-label={label}><S /></svg>;
}

/* Challenge: the same industry systems shown disconnected, then connected through one foundation. */
export function ChallengeVisual({ systems, label }: { systems: string[]; label: string }) {
  const L = [[70, 70], [210, 52], [60, 200], [215, 210]] as const;
  const R = [[400, 70], [580, 70], [400, 210], [580, 210]] as const;
  return <svg viewBox="0 0 640 280" className="gx ia-svg ia-challenge" role="img" aria-label={label}>
    <rect x="8" y="8" width="296" height="264" rx="14" className="ia-panel-bg" />
    <rect x="336" y="8" width="296" height="264" rx="14" className="ia-panel-bg is-on" />
    <text x="24" y="34" className="ia-cap">TODAY</text><text x="352" y="34" className="ia-cap is-on">CONNECTED</text>
    <path d="M90 82 L120 100 M190 70 L170 96 M80 180 L110 150 M200 190 L170 160" className="g-ln is-dash g-muted" />
    {L.map(([x, y], i) => <g key={i} transform={`translate(${x - 50} ${y - 16}) rotate(${[-4, 3, 2, -3][i]} 50 16)`}><rect width="100" height="32" rx="6" className="ia-sys" /><text x="50" y="20" className="ia-sys-t" textAnchor="middle">{systems[i]}</text></g>)}
    <g>{[[128, 120], [150, 140], [140, 112]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={3} className="ia-gap" />)}</g>
    {R.map(([x, y], i) => { const d = `M${x} ${y} L490 140`; return <g key={i}><path d={d} className="g-ln is-on" /><Sig d={d} dur={2.2} delay={i * 0.5} r={3} /></g>; })}
    <circle cx="490" cy="140" r="34" className="ia-hub" /><circle cx="490" cy="140" r="46" className="g-ln is-dash" fill="none" /><text x="490" y="144" className="ia-hub-t" textAnchor="middle">COSMOS</text>
    {R.map(([x, y], i) => <g key={`r${i}`} transform={`translate(${x - 50} ${y - 16})`}><rect width="100" height="32" rx="6" className="ia-sys is-on" /><text x="50" y="20" className="ia-sys-t" textAnchor="middle">{systems[i]}</text></g>)}
    <path d="M312 140 h16 m-6 -6 l6 6 l-6 6" className="g-ln is-on" />
  </svg>;
}

/* Closing accent: nine industry strands converge into one foundation. */
export function ConvergeAccent() {
  return <svg viewBox="0 0 360 200" className="gx ia-svg ia-converge" aria-hidden="true">
    {Array.from({ length: 9 }, (_, i) => { const y = 14 + i * 21; const d = `M8 ${y} C 140 ${y}, 170 100, 260 100`; return <g key={i}><path d={d} className="g-ln" /><Sig d={d} dur={3 + (i % 3) * 0.6} delay={i * 0.4} r={2.4} /><circle cx="8" cy={y} r="4" className="g-nd" /></g>; })}
    <rect x="262" y="70" width="86" height="60" rx="10" className="ia-hub" /><text x="305" y="104" className="ia-hub-t" textAnchor="middle">ONE</text>
  </svg>;
}

export { xy };
