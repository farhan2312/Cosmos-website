'use client';
import { ClientOnly } from '@/lib/nav';
import { lazy, Suspense, useEffect, useRef, useState, Component, type ReactNode } from 'react';
import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { layers } from '@/lib/cosmos-experience';
import { LandingScene } from './LandingScene';
const Scene=lazy(()=>import('./EngineScene'));
class SceneBoundary extends Component<{children:ReactNode;fallback:ReactNode},{failed:boolean}>{
  override state={failed:false};static getDerivedStateFromError(){return{failed:true};}override render(){return this.state.failed?this.props.fallback:this.props.children;}
}
function Fallback({selected}:{selected:number}){return <div className="engine-fallback" aria-hidden="true"><div className="fallback-core">COSMOS</div>{layers.map((l,i)=><div key={l.title} className={`fallback-module fm-${i} ${selected===i?'selected':''}`}><i/><span>{l.title}</span></div>)}</div>;}
export function IntelligenceEngine({signature=false}:{signature?:boolean}){
  const[selected,setSelected]=useState(-1);const[active,setActive]=useState(false);const[loaded,setLoaded]=useState(false);const[reduced,setReduced]=useState(false);const[colors,setColors]=useState<[string,string,string,string]>();const host=useRef<HTMLDivElement>(null);
  useEffect(()=>{const el=host.current;if(!el)return;const css=getComputedStyle(el);const token=(t:string)=>css.getPropertyValue(t).trim();setColors([token('--engine-graphite'),token('--scene-silver'),token('--scene-violet'),token('--engine-track')]);const media=window.matchMedia('(prefers-reduced-motion: reduce)');setReduced(media.matches);const motion=()=>setReduced(media.matches);media.addEventListener('change',motion);const observer=new IntersectionObserver(es=>{const visible=es[0]?.isIntersecting??false;setActive(visible);if(visible)setLoaded(true);},{rootMargin:'100px'});observer.observe(el);return()=>{observer.disconnect();media.removeEventListener('change',motion);};},[]);
  const fallback=<Fallback selected={selected}/>;
  return <div ref={host} className={`intelligence-engine ${signature?'signature-engine':''}`}>
    <div className="engine-canvas" aria-label="Connected intelligence engine">{!signature?<LandingScene selected={selected} onSelect={setSelected}/>:<ClientOnly fallback={fallback}>{loaded&&colors?<SceneBoundary fallback={fallback}><Suspense fallback={fallback}><Scene selected={selected} onSelect={setSelected} signature={signature} active={active} reduced={reduced} colors={colors}/></Suspense></SceneBoundary>:fallback}</ClientOnly>}</div>
    <div className="engine-caption"><span className="eyebrow">{signature?'Connected architecture':'Connected intelligence engine'}</span><span className="engine-status"><i/> {selected<0?'System overview':layers[selected]?.title}</span></div>
    <div className="engine-controls" aria-label={signature?'Connected intelligence layers':'Hero technology layers'}>{layers.map((l,i)=><Button key={l.title} variant="ghost" aria-pressed={selected===i} onClick={()=>setSelected(i)}><span className="tiny-number">0{i+1}</span>{l.title}<span className="node-dot"/></Button>)}<Button variant="ghost" size="icon" aria-label="Reset system overview" title="System overview" onClick={()=>setSelected(-1)}><RotateCcw/></Button></div>
    <div className="engine-detail" aria-live="polite">{selected>=0?<><strong>{layers[selected]?.title}</strong><p>{layers[selected]?.body}</p><div>{layers[selected]?.items.map(t=><span key={t}>{t}</span>)}</div></>:<><strong>One connected ecosystem.</strong><div>{layers.map(l=><span key={l.title}>{l.title}</span>)}</div></>}</div>
  </div>;
}