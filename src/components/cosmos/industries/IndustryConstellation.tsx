'use client';
import { useState, type KeyboardEvent } from 'react';
import { Link } from '@/lib/nav';
import { ArrowUpRight } from 'lucide-react';
import content from '@/lib/cosmos-content.json';
import { Sig } from '@/components/cosmos/glyphs/Glyphs';
import { Core, Env } from './IndustryArt';

/* Interactive constellation: nine industry environments around a COSMOS hub.
   HTML buttons are the accessible control; the drawing mirrors the selection. */
const W = 900, H = 640, CX = 450, CY = 320;
const toIso = (x: number, y: number, k: number) => `translate(${x} ${y}) scale(${k}) translate(-320 -262)`;

export function IndustryConstellation() {
  const list = content.industries;
  const [sel, setSel] = useState(0);
  const nodes = list.map((_, i) => { const a = (i / list.length) * Math.PI * 2 - Math.PI / 2; return [CX + Math.cos(a) * 345, CY + Math.sin(a) * 235] as const; });
  const cur = list[sel]!;
  const onKey = (e: KeyboardEvent) => {
    const k = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    if (!k) return; e.preventDefault();
    const n = (sel + k + list.length) % list.length; setSel(n);
    (e.currentTarget.querySelectorAll('button')[n] as HTMLButtonElement | undefined)?.focus();
  };
  return <div className="ic">
    <div className="ic-stage">
      <svg viewBox={`0 0 ${W} ${H}`} className="gx ia-svg ic-svg" aria-hidden="true">
        <ellipse cx={CX} cy={CY} rx={345} ry={235} className="g-ln is-dash" fill="none" />
        <ellipse cx={CX} cy={CY} rx={200} ry={136} className="ic-orbit" />
        {nodes.map(([x, y], i) => { const d = `M${CX} ${CY} Q ${(CX + x) / 2} ${(CY + y) / 2 - 30} ${x} ${y}`; const on = i === sel; return <g key={i} className={on ? 'ic-link is-on' : 'ic-link'}><path d={d} className={`g-ln ${on ? 'is-on' : ''}`} /><Sig d={d} dur={on ? 1.6 : 4} delay={i * 0.4} r={on ? 3.4 : 2} /></g>; })}
        <g transform={toIso(CX, CY + 20, 1.25)}><Core s={1} /></g>
        <text x={CX} y={CY + 78} className="ic-hub-t" textAnchor="middle">COSMOS</text>
        {nodes.map(([x, y], i) => <g key={list[i]!.slug} className={`ic-node ${i === sel ? 'is-on' : ''}`} onClick={() => setSel(i)}>
          <ellipse cx={x} cy={y + 18} rx={80} ry={42} className="ic-pad" />
          <g transform={toIso(x, y + 30, 1.05)}><Env slug={list[i]!.slug} /></g>
          <text x={x} y={y + 82} className="ic-label" textAnchor="middle">{list[i]!.name}</text>
        </g>)}
      </svg>
    </div>
    <div className="ic-side">
      <div className="ic-tabs" role="toolbar" aria-label="Select an industry" onKeyDown={onKey}>
        {list.map((ind, i) => <button key={ind.slug} type="button" aria-pressed={i === sel} tabIndex={i === sel ? 0 : -1} onClick={() => setSel(i)}><span className="tiny-number">0{i + 1}</span>{ind.name}</button>)}
      </div>
      <div className="ic-panel" aria-live="polite">
        <span className="eyebrow">{String(sel + 1).padStart(2, '0')} / 09</span>
        <h3>{cur.name}</h3>
        <p className="ic-short">{cur.short}</p>
        <p>{cur.intro}</p>
        <ul>{cur.opportunities.map(o => <li key={o.title}><span className="node-dot" />{o.title}</li>)}</ul>
        <Link className="text-link" to="/industries/$slug" params={{ slug: cur.slug }}>Explore {cur.name} <ArrowUpRight size={14} /></Link>
      </div>
    </div>
  </div>;
}
