'use client';
import { useEffect, useRef, useState } from 'react';
import { Link } from '@/lib/nav';
import { ArrowUpRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { capabilities, ecosystem, futureTopics, qualities, stages, layers } from '@/lib/cosmos-experience';
import { ApproachGraphic, capabilityGraphics, ConvergenceGraphic, DomainsGraphic, EcosystemGraphic, FutureGraphic, IntegrationGraphic, ProblemGraphic, WhyGraphic } from './Bespoke';

export function ConnectionTransform(){
  const[connected,setConnected]=useState(true);
  return <div className={`connection-demo bx-panel ${connected?'is-connected':''}`}><div className="demo-top"><span className="eyebrow">Business systems</span><div className="segmented">{['Disconnected','Connected'].map((s,i)=><Button key={s} variant="ghost" onClick={()=>setConnected(i===1)} aria-pressed={connected===(i===1)}>{s}</Button>)}</div></div><IntegrationGraphic connected={connected}/><div className="demo-bottom"><span>{connected?'Just better ways to work.':'Not another platform.'}</span></div></div>;
}

export function CapabilityShowcase(){
  return <div className="capability-grid-six">{capabilities.map(([name,tagline,,slug],i)=>{const G=capabilityGraphics[i]!;return <Link key={slug} to="/services/$slug" params={{slug}} className="capability-card-six"><div className="cap-visual"><G/></div><div className="cap-copy"><span className="tiny-number">0{i+1}</span><h3>{name}</h3><p>{tagline}</p><span className="text-link">Explore <ArrowUpRight size={13}/></span></div></Link>;})}</div>;
}

export function ApproachJourney(){const[selected,setSelected]=useState(0);const host=useRef<HTMLDivElement>(null);const manual=useRef(false);useEffect(()=>{const el=host.current;if(!el)return;const observer=new IntersectionObserver(entries=>{if(entries[0]?.isIntersecting&&!manual.current)setSelected(1);},{threshold:.6});observer.observe(el);return()=>observer.disconnect();},[]);return <div className="approach-journey" ref={host}><div className="approach-tabs">{stages.map((s,i)=><Button variant="ghost" key={s.title} onClick={()=>{manual.current=true;setSelected(i);}} aria-pressed={selected===i}><span>0{i+1}</span>{s.title}<i/></Button>)}</div><div className="bx-split"><div className="bx-panel tint"><ApproachGraphic phase={selected}/></div><div className="process-explanation" aria-live="polite"><span className="eyebrow">0{selected+1} / COSMOS Approach</span><h3>{stages[selected]?.title}</h3><p>{stages[selected]?.body}</p></div></div></div>;}

export function ConnectedDomains(){const[active,setActive]=useState(0);const l=layers[active];return <div className="connected-domains"><div className="bx-panel"><DomainsGraphic active={active} labels={layers.map(x=>x.title)}/></div><div className="domain-controls">{layers.map((x,i)=><Button key={x.title} variant="ghost" aria-pressed={active===i} onClick={()=>setActive(i)}><span className="tiny-number">0{i+1}</span>{x.title}</Button>)}</div><p className="domain-items" aria-live="polite">{l?.items.join(' · ')}</p></div>;}

export function Differentiators(){const[selected,setSelected]=useState(0);return <div className="differentiator-layout"><div className="differentiator-list">{qualities.map(([t,b],i)=><Button variant="ghost" key={t} onClick={()=>setSelected(i)} aria-pressed={selected===i}><span className="tiny-number">0{i+1}</span><div><strong>{t}</strong><p>{b}</p></div><ArrowUpRight/></Button>)}</div><div className="bx-panel tint why-visual"><WhyGraphic q={selected}/><span className="bx-caption">{qualities[selected]?.[0]}</span></div></div>;}

export function EcosystemExplorer(){const[selected,setSelected]=useState(0);const current=ecosystem[selected];return <div className="ecosystem-explorer"><div className="bx-panel"><EcosystemGraphic active={selected} labels={ecosystem.map(e=>e[0].replace('Artificial Intelligence','AI'))} onSelect={setSelected}/><div className="domain-controls">{ecosystem.map(([t],i)=><Button key={t} variant="ghost" onClick={()=>setSelected(i)} aria-pressed={selected===i}><span className="tiny-number">0{i+1}</span>{t}</Button>)}</div></div><div className="ecosystem-insight" key={selected} aria-live="polite"><span className="eyebrow">Technology Ecosystem</span><h3>{current?.[0]}</h3><div className="technology-list">{current?.[1].map((t,i)=><div key={t}><span className="tiny-number">0{i+1}</span>{t}<ArrowUpRight/></div>)}</div></div></div>;}

export function ProblemSequence(){const[selected,setSelected]=useState(0);return <div className="problem-sequence"><div className="bx-panel dark"><ProblemGraphic stage={selected}/></div><div className="sequence-controls" aria-label="Problem to solution">{['Problem','Relationships','Technology','Working solution'].map((t,i)=><Button variant="ghost" key={t} aria-pressed={selected===i} onClick={()=>setSelected(i)}><span className="tiny-number">0{i+1}</span>{t}<span className="node-dot"/></Button>)}<Button variant="ghost" size="icon" title="Reset sequence" aria-label="Reset problem sequence" onClick={()=>setSelected(0)}><RotateCcw/></Button></div></div>;}

export function FutureExplorer(){const[selected,setSelected]=useState(0);const t=futureTopics[selected];return <div className="future-explorer"><div className="bx-panel tint"><FutureGraphic title={t?.title??''} index={selected}/></div><div className="future-tabs">{futureTopics.map((x,i)=><Button key={x.title} variant="ghost" onClick={()=>setSelected(i)} aria-pressed={selected===i}>{x.title}<ArrowUpRight/></Button>)}</div><div className="future-description" aria-live="polite"><p>{t?.body}</p></div></div>;}

export function Convergence(){return <div className="bx-panel convergence-panel"><ConvergenceGraphic/></div>;}
