'use client';
import { ClientOnly, Link } from '@/lib/nav';
import { lazy, Suspense, useEffect, useRef, useState, Component, type ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConnectionMotif, EcosystemIllustration, FunctionIllustration, IntelligenceArchitecture, IntegrationArchitecture, LabIllustration, LayerArchitecture, techLayerDescriptions, techLayerNames } from './TechnologyVisuals';
const Scene=lazy(() => import('./TechnologyScene'));
class SceneBoundary extends Component<{children:ReactNode;fallback:ReactNode},{failed:boolean}> {
  override state={failed:false}; static getDerivedStateFromError(){return {failed:true};} override render(){return this.state.failed?this.props.fallback:this.props.children;}
}

export function TechnologyHero() {
  const ref=useRef<HTMLDivElement>(null);
  const [active,setActive]=useState(false),[loaded,setLoaded]=useState(false),[reduced,setReduced]=useState(false),[ready,setReady]=useState(false),[selected,setSelected]=useState(0);
  const [colors,setColors]=useState<[string,string,string,string,string]>();
  useEffect(() => {
    const el=ref.current;if(!el)return;
    const style=getComputedStyle(el);
    const canvas=document.createElement('canvas');canvas.width=canvas.height=1;
    const ctx=canvas.getContext('2d');
    if(ctx){
      const color=(token:string)=>{ctx.fillStyle=style.getPropertyValue(token).trim();ctx.fillRect(0,0,1,1);const pixel=ctx.getImageData(0,0,1,1).data;return `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;};
      setColors([color('--tech-violet'),color('--tech-magenta'),color('--scene-silver'),color('--scene-white'),color('--tech-deep')]);
    }
    const media=window.matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(media.matches);update();media.addEventListener('change',update);
    const observer=new IntersectionObserver(entries=>{const visible=entries[0]?.isIntersecting??false;setActive(visible);if(visible)setLoaded(true);},{rootMargin:'80px'});observer.observe(el);
    return()=>{observer.disconnect();media.removeEventListener('change',update);};
  },[]);
  const fallback=<div className="tech-hero-fallback"><IntegrationArchitecture selected={selected}/></div>;
  return <section className="tech-hero">
    <div className="container tech-hero-copy"><span className="eyebrow eyebrow-line">Technology</span><h1>Technology,<br/><span>connected.</span></h1><p>The right technology is more than a collection of tools. COSMOS brings AI, data, automation, enterprise systems and emerging technologies together to create connected digital foundations for modern businesses.</p><div className="hero-actions"><Button asChild><a href="#stack">Explore the technology <ArrowUpRight size={16}/></a></Button><Link className="text-link" to="/contact">Talk to us <ArrowUpRight size={14}/></Link></div><p className="support-line">AI · Data · Automation · Enterprise · Cloud · Emerging Technology</p></div>
    <div ref={ref} className="tech-hero-scene" data-scene-ready={ready || undefined}><ClientOnly fallback={fallback}>{loaded&&colors?<SceneBoundary fallback={fallback}><Suspense fallback={fallback}><Scene colors={colors} active={active} reduced={reduced} selected={selected} onSelect={setSelected} onReady={()=>setReady(true)}/></Suspense></SceneBoundary>:fallback}</ClientOnly></div>
    <div className="container tech-hero-bottom"><span className="eyebrow">Connected digital foundations</span><div className="tech-hero-domains" aria-label="Hero technology domains">{['AI','Data','Automation','Enterprise','Cloud','Emerging'].map((name,i)=><Button variant="ghost" key={name} onClick={()=>setSelected(i)} aria-pressed={selected===i}>{name}<span className="node-dot"/></Button>)}</div></div>
  </section>;
}
export function TechnologyStack(){
  const[selected,setSelected]=useState(0);
  return <div className="tech-stack-explorer"><LayerArchitecture selected={selected}/><div className="tech-stack-controls" aria-label="Technology stack layers">{techLayerNames.map((name,i)=><div key={name}><Button variant="ghost" aria-pressed={selected===i} onClick={()=>setSelected(i)}><span className="tiny-number">0{i+1}</span><strong>{name}</strong><span className="node-dot"/></Button>{selected===i&&<p className="tech-stack-description" aria-live="polite">{techLayerDescriptions[i]}</p>}</div>)}</div></div>;
}
export function EnterpriseIntelligence(){const[selected,setSelected]=useState(0);return <div className="tech-architecture-explorer"><IntelligenceArchitecture selected={selected}/><div className="tech-segment-controls" aria-label="AI enterprise relationships">{['Data','Applications','Automation','People','Decisions'].map((name,i)=><Button key={name} variant="ghost" aria-pressed={selected===i} onClick={()=>setSelected(i)}>AI + {name}<span className="node-dot"/></Button>)}</div></div>;}
export function EnterpriseIntegration(){const[selected,setSelected]=useState(0);return <div className="tech-architecture-explorer"><IntegrationArchitecture selected={selected}/><div className="tech-segment-controls" aria-label="Connected enterprise systems">{['ERP','CRM','Cloud','Data Platforms','Applications','IoT','AI'].map((name,i)=><Button key={name} variant="ghost" aria-pressed={selected===i} onClick={()=>setSelected(i)}>{name}<span className="node-dot"/></Button>)}</div></div>;}
const functions=[
  ['Operations','Automate processes.','Improve visibility.','Optimise performance.'],
  ['Finance','Connect financial data.','Automate workflows.','Support better decisions.'],
  ['Sales & Marketing','Understand customers.','Personalise engagement.','Improve forecasting.'],
  ['Human Resources','Simplify employee processes.','Connect workforce data.','Support better experiences.'],
  ['Supply Chain','Improve visibility.','Predict demand.','Optimise movement.'],
  ['Customer Experience','Understand interactions.','Automate service.','Create more responsive experiences.'],
  ['Risk & Compliance','Connect information.','Identify risks.','Automate controls.'],
  ['Strategy & Leadership','Bring intelligence together.','See the bigger picture.','Make informed decisions.'],
];
export function BusinessFunctions(){const[selected,setSelected]=useState(0);return <div className="tech-functions"><div className="tech-function-nav" aria-label="Business functions">{functions.map((row,i)=><Button variant="ghost" key={row[0]} aria-pressed={selected===i} onClick={()=>setSelected(i)}><span className="node-dot"/>{row[0]}<ArrowUpRight size={16}/></Button>)}</div><div className="tech-function-result" aria-live="polite"><h3>{functions[selected]?.[0]}</h3><div key={selected} className="tech-function-visual"><FunctionIllustration index={selected}/></div><div className="tech-function-outcomes">{functions[selected]?.slice(1).map((text,i)=><p key={text}><span className="tiny-number">0{i+1}</span>{text}</p>)}</div></div></div>;}
export function TechnologyEcosystem({groups}:{groups:[string,string[]][]}){const[selected,setSelected]=useState<number|null>(null);return <div className="tech-ecosystem-grid">{groups.map(([name,items],i)=><article key={name} className={`tech-ecosystem-item ${selected===i?'is-selected':''}`}><EcosystemIllustration index={i}/><Button variant="ghost" aria-pressed={selected===i} onClick={()=>setSelected(selected===i?null:i)}><h3>{name}</h3><ArrowUpRight size={18}/></Button><div>{items.map(item=><p key={item}>{item}</p>)}</div></article>)}</div>;}
export const labStages=[
  {title:'Explore',body:'Understand what emerging technology could mean for your business.'},
  {title:'Experiment',body:'Build prototypes and test real-world applications.'},
  {title:'Validate',body:"Measure what works — and what doesn't."},
  {title:'Apply',body:'Turn proven ideas into solutions that can scale.'},
];
export function TechnologyLab(){const[selected,setSelected]=useState(0);return <><LabIllustration selected={selected}/><div className="tech-lab-controls" aria-label="COSMOS Lab stages">{labStages.map((stage,i)=><div key={stage.title}><Button variant="ghost" aria-pressed={selected===i} onClick={()=>setSelected(i)}><span className="tiny-number">0{i+1}</span>{stage.title}<span className="node-dot"/></Button><p>{stage.body}</p></div>)}</div></>;}
export function TechnologyCta(){return <section className="tech-cta"><div className="container"><div><span className="eyebrow eyebrow-line">Start a conversation</span><h2>Technology is only useful when it moves the business forward.</h2><p>Let's explore what your technology could do next.</p><Button asChild><Link to="/contact">Talk to COSMOS <ArrowUpRight size={18}/></Link></Button></div><ConnectionMotif/></div></section>;}