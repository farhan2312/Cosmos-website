'use client';
import type { ReactNode } from 'react';
import { Sig } from '@/components/cosmos/glyphs/Glyphs';
import { Box, Node, Ring, path, pts, curve, type V } from '@/components/cosmos/glyphs/ServiceHeroes';
import { Bars, Crates, Rack, Sensor, Tower } from '@/components/cosmos/industries/IndustryArt';
import { layers } from '@/lib/cosmos-experience';

/* Landing hero: infrastructure foundation, enterprise towers, automation loop, data streams and
   emerging modules, all wired to a floating intelligence core. Each layer is selectable. */
const Z = 0.22;
type Mod = { at: V; draw: () => ReactNode };

export function LandingScene({ selected, onSelect }: { selected: number; onSelect: (i: number) => void }) {
  const loop = path([[-1, 2.6, Z + 0.32], [2.2, 2.6, Z + 0.32], [2.2, 4.6, Z + 0.32], [-1, 4.6, Z + 0.32], [-1, 2.6, Z + 0.32]]);
  const core: V = [0, 0, 5.2];
  const mods: Mod[] = [
    { at: core, draw: () => <g>
      <Box x={-1.3} y={-1.3} z={4.2} w={2.6} d={2.6} h={0.3} tone="on" /><Box x={-0.85} y={-0.85} z={4.5} w={1.7} d={1.7} h={0.55} />
      <Box x={-0.5} y={-0.5} z={5.05} w={1} d={1} h={1} tone="glow" />
      <Ring r={1.7} z={6.6} cls="g-ln is-on h-halo" /><Ring r={2.4} z={4.2} cls="g-ln is-dash" /></g> },
    { at: [3.6, -2.6, 2], draw: () => <g>
      {[0, 1, 2].map(i => <g key={i}>{[0, 0.55, 1.1, 1.65].map((h, k) => <Box key={k} x={2.8 + i * 0.75} y={-3.4 + i * 0.3} z={Z + h} w={0.55} d={0.55} h={0.4} tone={k === 3 - i ? 'on' : 'glass'} />)}</g>)}
      <Bars x={2.6} y={-1.2} n={4} h={1.4} /></g> },
    { at: [0.6, 3.6, 0.6], draw: () => <g>
      <Box x={-1.4} y={2.2} z={Z} w={4} d={2.8} h={0.1} tone="plate" />
      <path d={loop} className="ia-road" /><Sig d={loop} dur={5} r={3.2} /><Sig d={loop} dur={5} delay={1.7} r={3.2} /><Sig d={loop} dur={5} delay={3.4} r={3.2} />
      {[[-1, 2.6], [2.2, 2.6], [2.2, 4.6], [-1, 4.6]].map(([x, y], i) => <Box key={i} x={x! - 0.35} y={y! - 0.35} z={Z + 0.1} w={0.7} d={0.7} h={0.45} tone={i === 1 ? 'on' : ''} />)}
      <Crates x={0.3} y={3.3} /></g> },
    { at: [-3.4, -2.6, 2.6], draw: () => <g><Tower x={-5} y={-4} w={1.3} h={2.8} /><Tower x={-3.4} y={-4.4} w={1} h={2} /><Tower x={-4.8} y={-2.2} w={1} h={1.6} /></g> },
    { at: [-3.6, 2.6, 1.2], draw: () => <g>{[0, 0.85, 1.7].map(o => <Rack key={o} x={-5 + o} y={1.6} h={1.6} />)}{[0, 0.85, 1.7].map(o => <Rack key={`b${o}`} x={-5 + o} y={2.7} h={1.2} />)}</g> },
    { at: [4.4, 2, 1.6], draw: () => <g>{[[3.6, 0.8], [4.8, 1.6], [3.8, 2.6]].map(([x, y], i) => <g key={i}><Box x={x!} y={y!} z={Z} w={0.8} d={0.8} h={0.5} tone={i === 1 ? 'on' : 'wire'} /></g>)}<Sensor x={5.2} y={3.2} h={1.8} /></g> },
  ];
  return <svg viewBox="40 -10 560 560" className="gx ia-svg landing-scene" role="img" aria-label="COSMOS connected technology ecosystem: intelligence, data, automation, enterprise, infrastructure and emerging technology">
    <Box x={-6.2} y={-6.2} z={-0.4} w={12.4} d={12.4} h={0.4} tone="plate" />
    <polygon className="ia-floor-glow" points={pts([[-6, -6, 0.01], [6, -6, 0.01], [6, 6, 0.01], [-6, 6, 0.01]])} />
    {[-3, 0, 3].map(v => <path key={v} d={`${path([[v, -6, 0.02], [v, 6, 0.02]])} ${path([[-6, v, 0.02], [6, v, 0.02]])}`} className="ia-lane" />)}
    {mods.slice(1).map((m, i) => { const d = curve(m.at, [0, 0, 4.2], 0.6); const on = selected < 0 || selected === i + 1 || selected === 0; return <g key={`l${i}`}><path d={d} className={`ia-beam ${on ? 'is-on' : ''}`} />{on && <Sig d={d} dur={2.2} delay={i * 0.4} r={3} />}</g>; })}
    {[4, 3, 5, 1, 2, 0].map(i => <g key={i} className={`ls-mod ${selected === i ? 'is-sel' : ''} ${selected >= 0 && selected !== i ? 'is-dim' : ''}`} onClick={() => onSelect(i)}>{mods[i]!.draw()}</g>)}
    {selected >= 0 && <Node at={mods[selected]!.at} r={7} on />}
    {selected >= 0 && <text className="ls-tag" x="320" y="535" textAnchor="middle">{layers[selected]?.title}</text>}
  </svg>;
}
