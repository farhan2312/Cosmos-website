'use client';
import type { ReactNode } from 'react';
import { Sig } from './Glyphs';

/* Six dimensional hero scenes built on one isometric projection; each tells its service's story. */
const S = 25, OX = 320, OY = 262;
type V = [number, number, number];
const p = ([x, y, z]: V) => [OX + (x - y) * 0.866 * S, OY + (x + y) * 0.5 * S - z * S] as const;
const pts = (vs: V[]) => vs.map(v => p(v).map(n => n.toFixed(1)).join(',')).join(' ');
const path = (vs: V[]) => vs.map((v, i) => `${i ? 'L' : 'M'}${p(v).map(n => n.toFixed(1)).join(' ')}`).join(' ');
const curve = (a: V, b: V, lift = 1.5) => { const [x1, y1] = p(a), [x2, y2] = p(b); return `M${x1.toFixed(1)} ${y1.toFixed(1)} Q ${((x1 + x2) / 2).toFixed(1)} ${(Math.min(y1, y2) - lift * S).toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`; };

function Box({ x, y, z = 0, w, d, h, tone = '', k }: { x: number; y: number; z?: number; w: number; d: number; h: number; tone?: string; k?: string | number }) {
  const t = z + h;
  return <g key={k} className={`h-box ${tone}`}>
    <polygon className="f-l" points={pts([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, t], [x, y + d, t]])} />
    <polygon className="f-r" points={pts([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, t], [x + w, y, t]])} />
    <polygon className="f-t" points={pts([[x, y, t], [x + w, y, t], [x + w, y + d, t], [x, y + d, t]])} />
  </g>;
}
const Node = ({ at, on, r = 5, delay = 0 }: { at: V; on?: boolean; r?: number; delay?: number }) => { const [x, y] = p(at); return <circle cx={x} cy={y} r={r} className={`g-nd ${on ? 'is-on' : ''}`} style={{ animationDelay: `${delay}s` }} />; };
const Flow = ({ d, on = true, dur = 3, delay = 0, dash }: { d: string; on?: boolean; dur?: number; delay?: number; dash?: boolean }) => <><path d={d} className={`g-ln ${on ? 'is-on' : ''} ${dash ? 'is-dash' : ''}`} />{on && <Sig d={d} dur={dur} delay={delay} r={3.2} />}</>;
const Label = ({ at, children }: { at: V; children: ReactNode }) => { const [x, y] = p(at); return <text x={x} y={y} className="h-label" textAnchor="middle">{children}</text>; };
const Plate = ({ s = 6, z = 0, tone = 'plate' }: { s?: number; z?: number; tone?: string }) => <Box x={-s} y={-s} z={z} w={s * 2} d={s * 2} h={0.22} tone={tone} />;
const Ring = ({ r, z, cls = 'g-ln is-dash', cx = 0, cy = 0 }: { r: number; z: number; cls?: string; cx?: number; cy?: number }) => <path d={path(Array.from({ length: 49 }, (_, i) => [cx + Math.cos(i / 48 * Math.PI * 2) * r, cy + Math.sin(i / 48 * Math.PI * 2) * r, z] as V))} className={cls} />;
const Grid = ({ s = 6, z = 0.23, step = 1 }) => <g className="h-grid">{Array.from({ length: (s * 2) / step + 1 }, (_, i) => -s + i * step).map(v => <path key={v} d={`${path([[v, -s, z], [v, s, z]])} ${path([[-s, v, z], [s, v, z]])}`} />)}</g>;

function AI() {
  const z = 0.22, sources: V[] = [[-5, -3.6, z], [-5, -1.2, z], [-5, 1.2, z], [-5, 3.6, z]];
  const agents: V[] = [[-0.2, -4.2, z], [2.6, -2.2, z], [2.6, 2.4, z], [-0.2, 4.2, z]];
  const outs: V[] = [[5, -2.6, z], [5, 0, z], [5, 2.6, z]];
  return <>
    <Plate /><Grid />
    <Ring r={4.3} z={z} />
    {sources.map((s, i) => <Flow key={`s${i}`} d={path([[s[0] + 0.8, s[1], z], [-2.6, s[1] * 0.4, z], [-1.6, 0, z]])} dur={2.8 + i * 0.3} delay={i * 0.7} />)}
    {agents.map((a, i) => <Flow key={`a${i}`} d={path([[0, 0, z], a])} dur={2} delay={i * 0.5} on={i % 2 === 0} />)}
    {agents.map((a, i) => <Flow key={`o${i}`} d={path([a, [4.2, outs[Math.min(i, 2)]![1], z]])} dur={2.6} delay={i * 0.6} on={i !== 0} />)}
    {sources.map((s, i) => <Box key={`sb${i}`} x={s[0]} y={s[1] - 0.6} z={z} w={0.8} d={1.2} h={0.35 + (i % 2) * 0.25} />)}
    {agents.map((a, i) => <g key={`ab${i}`}><Box x={a[0] - 0.55} y={a[1] - 0.55} z={z} w={1.1} d={1.1} h={0.7} tone={i % 2 === 0 ? 'on' : ''} /><Node at={[a[0], a[1], z + 1.15]} on={i % 2 === 0} r={4} delay={i * 0.7} /></g>)}
    <Box x={-1.6} y={-1.6} z={z} w={3.2} d={3.2} h={0.7} />
    <Box x={-1.15} y={-1.15} z={z + 0.7} w={2.3} d={2.3} h={0.6} tone="on" />
    <Box x={-0.6} y={-0.6} z={z + 1.3} w={1.2} d={1.2} h={0.9} tone="glow" />
    <Ring r={1.6} z={z + 2.8} cls="g-ln is-on h-halo" />
    {outs.map((o, i) => <Box key={`ob${i}`} x={o[0] - 0.8} y={o[1] - 0.8} z={z} w={1.6} d={1.6} h={0.28} tone={i === 1 ? 'on' : ''} />)}
    <Flow d={curve([5, 2.6, 0.6], [-5, 3.6, 0.8], 7)} dur={6} dash />
    <Sig d={curve([5, 2.6, 0.6], [-5, 3.6, 0.8], 7)} dur={6} r={2.6} />
    <Label at={[-6.6, 0.6, 0]}>INPUT</Label><Label at={[0, 0, 4.4]}>REASONING</Label><Label at={[3.2, -4.6, 1]}>AGENTS</Label><Label at={[6.2, 0, 0]}>ACTION</Label>
  </>;
}

function Data() {
  const z = 0.22;
  const raw = Array.from({ length: 34 }, (_, i) => [-5 + ((i * 37) % 22) / 10, -4.5 + ((i * 53) % 90) / 10, 0.5 + ((i * 29) % 30) / 10] as V);
  return <>
    <Plate /><Grid step={1.5} />
    {raw.map((r, i) => <Node key={i} at={r} r={2.2 + (i % 3)} on={i % 7 === 0} delay={i * 0.2} />)}
    {[0, 1, 2].map(i => <Box key={i} x={-1.8 + i * 0.3} y={-2.8 + i * 0.3} z={z + i * 0.9} w={3.6 - i * 0.6} d={5.6 - i * 0.6} h={0.22} tone={i === 2 ? 'on' : 'glass'} />)}
    {[-2, 0, 2].map((y, i) => <Flow key={y} d={path([[-3, y, 2], [-1.5, y * 0.6, z + 1]])} dur={2.4} delay={i * 0.6} />)}
    {Array.from({ length: 12 }, (_, i) => { const gx = 2.2 + (i % 4) * 0.8, gy = -2.2 + Math.floor(i / 4) * 1.4; return <Box key={`c${i}`} x={gx} y={gy} z={z} w={0.55} d={0.9} h={0.4 + ((i * 7) % 5) * 0.35} tone={i === 6 || i === 11 ? 'on' : ''} />; })}
    <Flow d={path([[1.3, 0, z + 2.1], [2.2, 0, z + 1.2]])} dur={1.6} />
    <Flow d={path([[5.6, 0.6, 2.4], [6, 3.6, 2.4]])} dur={2} />
    <Box x={5.4} y={3.4} z={z} w={0.9} d={0.9} h={3} tone="glow" />
    <Node at={[5.85, 3.85, 3.7]} on r={7} />
    <path d={path([[2.2, 4.6, z + 0.1], [3.4, 4.6, 0.9], [4.4, 4.6, 0.7], [5.4, 4.6, 1.6]])} className="g-ln is-on" />
    <Label at={[-5, -5.6, 0]}>RAW INFORMATION</Label><Label at={[1.6, 3.6, 3.2]}>ORGANISE</Label><Label at={[3.4, -3.8, 2.4]}>ANALYSE</Label><Label at={[6.4, 4, 4.6]}>DECIDE</Label>
  </>;
}

function Automation() {
  const z = 0.22;
  const steps: [number, number, string][] = [[-4.6, 0, ''], [-2.4, 0, 'diamond'], [0, -2.6, ''], [0, 0, 'on'], [0, 2.6, ''], [2.6, 0, 'diamond'], [4.6, -1.6, ''], [4.6, 1.6, 'glow']];
  return <>
    <Plate /><Grid />
    {['M', 'N'].map((_, k) => <path key={k} d={path([[-6, -4 + k * 7, z], [-5, -2 + k * 3, z], [-5.6, -3.4 + k * 6, z], [-4.6, -1, z]])} className="g-ln is-dash g-muted" />)}
    <Flow d={path([[-4.6, 0, z], [-2.4, 0, z], [-1.2, 0, z], [0, 0, z], [2.6, 0, z], [3.4, 1.6, z], [4.6, 1.6, z]])} dur={5} />
    <Flow d={path([[-2.4, 0, z], [-1.2, -2.6, z], [0, -2.6, z]])} on={false} dash />
    <Flow d={path([[-2.4, 0, z], [-1.2, 2.6, z], [0, 2.6, z]])} on={false} dash />
    <Flow d={path([[2.6, 0, z], [3.4, -1.6, z], [4.6, -1.6, z]])} on={false} dash />
    {steps.map(([x, y, t], i) => t === 'diamond'
      ? <g key={i}><polygon points={pts([[x, y - 0.8, z + 0.6], [x + 0.8, y, z + 0.6], [x, y + 0.8, z + 0.6], [x - 0.8, y, z + 0.6]])} className="h-diamond" /><path d={path([[x, y + 0.8, z], [x, y + 0.8, z + 0.6]])} className="g-ln" /><Node at={[x, y, z + 0.6]} on r={3.5} delay={i * 0.4} /></g>
      : <Box key={i} x={x - 0.65} y={y - 0.65} z={z} w={1.3} d={1.3} h={t === 'glow' ? 1.3 : 0.6} tone={t} />)}
    <Node at={[4.6, 1.6, 2.2]} on r={8} />
    <Box x={-1} y={4.4} z={z} w={2} d={1} h={0.5} tone="glass" />
    <Flow d={path([[0, 3.3, z], [0, 4.4, z]])} dur={2} dash />
    <Label at={[-5.4, -4.8, 0]}>COMPLEX PROCESS</Label><Label at={[-2.4, 0, 2]}>DECIDE</Label><Label at={[0, 6, 0]}>HUMAN REVIEW</Label><Label at={[4.6, 1.6, 3.4]}>DONE</Label>
  </>;
}

function Enterprise() {
  const z = 0.22;
  const depts = Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * Math.PI * 2; return [Math.cos(a) * 4.4, Math.sin(a) * 4.4, [1.4, 0.8, 2, 1, 1.6, 0.7, 1.2, 1.8][i]!] as const; });
  const ring = Array.from({ length: 49 }, (_, i) => [Math.cos(i / 48 * Math.PI * 2) * 2.8, Math.sin(i / 48 * Math.PI * 2) * 2.8, z] as V);
  return <>
    <Plate /><Grid step={1.5} />
    <path d={path(ring)} className="g-bus" />
    <Sig d={path(ring)} dur={8} r={3.4} /><Sig d={path(ring)} dur={8} delay={4} r={3.4} />
    {depts.map(([x, y], i) => <Flow key={`l${i}`} d={path([[x * 0.64, y * 0.64, z], [x * 0.86, y * 0.86, z]])} on={i % 2 === 0} dur={1.6} delay={i * 0.3} />)}
    {[...depts].sort((a, b) => a[0] + a[1] - (b[0] + b[1])).map(([x, y, h], i) => <g key={i}><Box x={x - 0.7} y={y - 0.7} z={z} w={1.4} d={1.4} h={h} tone={h > 1.7 ? 'on' : ''} />{Array.from({ length: Math.floor(h / 0.4) }, (_, j) => <path key={j} d={path([[x - 0.7, y + 0.7, z + 0.3 + j * 0.4], [x + 0.7, y + 0.7, z + 0.3 + j * 0.4]])} className="h-floor" />)}</g>)}
    <Box x={-0.9} y={-0.9} z={z} w={1.8} d={1.8} h={0.5} tone="on" />
    <Box x={-0.5} y={-0.5} z={z + 0.5} w={1} d={1} h={0.6} tone="glow" />
    {[0, 2, 4, 6].map(i => <Flow key={`c${i}`} d={path([[0, 0, z + 0.3], [Math.cos(i / 8 * Math.PI * 2) * 2.8, Math.sin(i / 8 * Math.PI * 2) * 2.8, z]])} dur={2.2} delay={i * 0.4} on={false} dash />)}
    <Label at={[0, 0, 2.6]}>SHARED OPERATIONS</Label><Label at={[5.6, -2, 0]}>DEPARTMENTS</Label><Label at={[-3.8, 5.4, 0]}>APPLICATIONS</Label>
  </>;
}

function Cloud() {
  const levels = [0, 2.2, 4.4];
  return <>
    {levels.map((z, li) => <g key={li}>
      <Box x={-5} y={-5} z={z} w={10} d={10} h={0.18} tone={li === 2 ? 'glass on' : li === 1 ? 'glass' : 'plate'} />
      {li === 0 && Array.from({ length: 5 }, (_, i) => <path key={i} d={`${path([[-5 + i * 2.5, -5, z + 0.19], [-5 + i * 2.5, 5, z + 0.19]])} ${path([[-5, -5 + i * 2.5, z + 0.19], [5, -5 + i * 2.5, z + 0.19]])}`} className="g-ln is-on h-net" />)}
      {li === 1 && [-3, -1, 1, 3].flatMap(x => [-2.5, 1].map(y => <Box key={`${x}${y}`} x={x - 0.7} y={y} z={z + 0.18} w={1.4} d={1.6} h={0.9} tone={x === 1 && y === 1 ? 'on' : ''} />))}
      {li === 2 && [[-3, -3], [0, -2], [2.6, 1], [-2, 2]].map(([x, y], i) => <g key={i}><Box x={x! - 0.6} y={y! - 0.6} z={z + 0.18} w={1.2} d={1.2} h={0.5} tone={i === 2 ? 'glow' : ''} /><Node at={[x!, y!, z + 1]} on={i === 2} r={4} delay={i * 0.5} /></g>)}
    </g>)}
    {[[-4, 4], [4, -4], [4, 4], [0, 0]].map(([x, y], i) => <Flow key={i} d={path([[x!, y!, 0.2], [x!, y!, 4.4]])} dur={2.4 + i * 0.4} delay={i * 0.5} />)}
    {[[-4, 4], [4, 4]].map(([x, y], i) => <Node key={i} at={[x!, y!, 0.2]} on r={4} delay={i} />)}
    <Label at={[6.2, 5.6, 0]}>NETWORK</Label><Label at={[6.2, 5.6, 2.2]}>COMPUTE &amp; STORAGE</Label><Label at={[6.2, 5.6, 4.4]}>APPLICATIONS</Label>
  </>;
}

function Emerging() {
  const z = 0.22;
  const bays: [number, number, 'wire' | 'part' | 'solid' | 'glow'][] = [[-3.6, -3.6, 'wire'], [0, -3.6, 'wire'], [3.6, -3.6, 'part'], [-3.6, 0, 'part'], [0, 0, 'solid'], [3.6, 0, 'solid'], [-3.6, 3.6, 'solid'], [0, 3.6, 'glow'], [3.6, 3.6, 'glow']];
  return <>
    <Plate /><Grid step={1.2} />
    {bays.map(([x, y], i) => <path key={`b${i}`} d={path([[x - 1.4, y - 1.4, z + 0.01], [x + 1.4, y - 1.4, z + 0.01], [x + 1.4, y + 1.4, z + 0.01], [x - 1.4, y + 1.4, z + 0.01], [x - 1.4, y - 1.4, z + 0.01]])} className="g-ln is-dash" />)}
    <Flow d={path([[-3.6, -3.6, z], [0, -3.6, z], [3.6, -3.6, z], [3.6, 0, z], [0, 0, z], [-3.6, 0, z], [-3.6, 3.6, z], [0, 3.6, z], [3.6, 3.6, z]])} dur={9} />
    {bays.map(([x, y, s], i) => s === 'wire'
      ? <g key={i} className="h-wire"><Box x={x - 0.8} y={y - 0.8} z={z} w={1.6} d={1.6} h={1} /></g>
      : s === 'part' ? <g key={i}><Box x={x - 0.8} y={y - 0.8} z={z} w={1.6} d={1.6} h={0.4} /><g className="h-wire"><Box x={x - 0.8} y={y - 0.8} z={z + 0.4} w={1.6} d={1.6} h={0.7} /></g></g>
      : <Box key={i} x={x - 0.8} y={y - 0.8} z={z} w={1.6} d={1.6} h={s === 'glow' ? 1.4 : 1} tone={s === 'glow' ? 'on' : ''} />)}
    {[[-3.6, 3.6], [3.6, 3.6]].map(([x, y], i) => <g key={i}>{[0.8, 1.4, 2].map((r, k) => <Ring key={k} cx={x!} cy={y!} r={r} z={z + 1.5} cls={`g-ln is-on h-pulse`} />)}</g>)}
    <Node at={[0, 3.6, 2.4]} on r={6} />
    <Label at={[0, -5.6, 1.6]}>EXPLORE</Label><Label at={[-5.4, 0, 1.6]}>TEST</Label><Label at={[0, 6, 2.2]}>INTEGRATE</Label>
  </>;
}

const scenes: Record<string, () => ReactNode> = {
  'ai-intelligent-systems': AI, 'data-decision-intelligence': Data, 'intelligent-automation': Automation,
  'enterprise-automation': Enterprise, 'cloud-digital-infrastructure': Cloud, 'emerging-technology': Emerging,
};

export function ServiceHero({ slug, label }: { slug: string; label: string }) {
  const Scene = scenes[slug] ?? AI;
  return <svg viewBox="0 0 640 600" className="gx service-hero-svg" role="img" aria-label={label}><Scene /></svg>;
}

export { Box, Node, Flow, Label, Plate, Ring, Grid, p, pts, path, curve };
export type { V };
