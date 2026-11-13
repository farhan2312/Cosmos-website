'use client';
import { createContext, useContext, useEffect, useId, useRef, useState, type ReactNode } from 'react';

const Motion = createContext(false);
export function TechnicalVisual({ children, label, compact = false, viewBox }: { children: ReactNode; label: string; compact?: boolean; viewBox?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const [running, setRunning] = useState(false);
  const id = useId().replace(/:/g, '');
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const update = () => setRunning(visible && !media.matches);
    const observer = new IntersectionObserver(entries => { visible = entries[0]?.isIntersecting ?? false; update(); });
    observer.observe(el); media.addEventListener('change', update);
    return () => { observer.disconnect(); media.removeEventListener('change', update); };
  }, []);
  return <Motion value={running}><svg ref={ref} viewBox={viewBox ?? (compact ? '0 0 320 240' : '0 0 760 480')} className={`tech-art ${compact ? 'tech-art-small' : ''}`} role="img" aria-label={label} data-motion={running}>
    <defs><filter id={`${id}-shadow`} x="-50%" y="-50%" width="200%" height="240%"><feGaussianBlur stdDeviation="9" /></filter></defs>
    {children}
  </svg></Motion>;
}

function Signal({ d, reverse = false, delay = 0 }: { d: string; reverse?: boolean; delay?: number }) {
  const running = useContext(Motion);
  return <g><path d={d} className="tech-conduit" /><path d={d} className="tech-path" />{running && <circle r="4" className="tech-signal"><animateMotion path={d} dur={`${6 + delay}s`} begin={`-${delay}s`} repeatCount="indefinite" keyPoints={reverse ? '1;0' : '0;1'} keyTimes="0;1" calcMode="linear" /></circle>}</g>;
}
function Port({ x, y }: { x: number; y: number }) { return <g><circle cx={x} cy={y} r="7" className="tech-port-ring" /><circle cx={x} cy={y} r="3" className="tech-signal" /></g>; }
function Label({ x, y, children }: { x: number; y: number; children: ReactNode }) { return <text x={x} y={y} className="tech-label" textAnchor="middle">{children}</text>; }
function Slab({ x, y, w = 75, depth = 38, h = 16, active = false }: { x: number; y: number; w?: number; depth?: number; h?: number; active?: boolean }) {
  return <g className={`tech-solid ${active ? 'is-lit' : ''}`}><polygon className="tech-face-left" points={`${x-w},${y} ${x},${y+depth} ${x},${y+depth+h} ${x-w},${y+h}`} /><polygon className="tech-face-right" points={`${x},${y+depth} ${x+w},${y} ${x+w},${y+h} ${x},${y+depth+h}`} /><polygon className="tech-face-top" points={`${x},${y-depth} ${x+w},${y} ${x},${y+depth} ${x-w},${y}`} /></g>;
}
function DataBank({ x, y, small = false }: { x: number; y: number; small?: boolean }) {
  return <g transform={`translate(${x} ${y}) scale(${small ? .7 : 1})`}><ellipse cx="0" cy="65" rx="55" ry="19" className="tech-shadow" />{[28, 0, -28].map((dy, i) => <g key={dy} transform={`translate(0 ${dy})`}><path d="M-44 -15 V14 A44 17 0 0 0 44 14 V-15" className="tech-cylinder" /><ellipse cx="0" cy="-15" rx="44" ry="17" className="tech-face-top" /><path d="M-34 8 Q0 23 34 8" className="tech-detail" />{[0, 1, 2].map(j => <circle key={j} cx={20+j*7} cy="10" r="2" className={i === 1 ? 'tech-signal' : 'tech-led'} />)}</g>)}</g>;
}
function Intelligence({ x, y, small = false }: { x: number; y: number; small?: boolean }) {
  const nodes: [number, number][] = [[-48,-26],[-30,-48],[12,-50],[48,-28],[52,5],[24,28],[-20,28],[-52,6]];
  return <g transform={`translate(${x} ${y}) scale(${small ? .7 : 1})`}><Slab x={0} y={30} w={70} depth={36} h={12} /><Slab x={0} y={9} w={52} depth={27} h={13} active /><path d="M0 -48 L44 -24 V15 L0 40 L-44 15 V-24 Z" className="tech-core-shell" />{nodes.map(([nx,ny],i) => <g key={i}><path d={`M${nx} ${ny} L0 -5`} className="tech-neural" /><circle cx={nx} cy={ny} r="5" className="tech-port-ring" /></g>)}<Slab x={0} y={-10} w={24} depth={14} h={24} active /><path d="M-18 -38 L18 -38 M-31 -23 H31 M-35 -9 H35" className="tech-detail" /></g>;
}
function Workflow({ x, y, small = false }: { x: number; y: number; small?: boolean }) {
  return <g transform={`translate(${x} ${y}) scale(${small ? .6 : 1})`}><Signal d="M-90 5 L-40 5 L0 -35 L50 5 L100 5" /><Signal d="M-40 5 L0 45 L50 5" delay={2} />{[[-85,0],[-40,0],[0,-40],[0,40],[50,0],[95,0]].map(([px,py],i) => <g key={i}><Slab x={px ?? 0} y={(py ?? 0)-10} w={i===2 ? 21 : 15} depth={10} h={16} active={i===2||i===5} /><Port x={px ?? 0} y={(py ?? 0)-10} /></g>)}</g>;
}
function Applications({ x, y, small = false }: { x: number; y: number; small?: boolean }) {
  return <g transform={`translate(${x} ${y}) scale(${small ? .7 : 1})`}><Slab x={0} y={40} w={80} depth={35} h={8} />{[[-40,15],[0,-18],[42,15]].map(([px,py],i) => <g key={i}><Slab x={px ?? 0} y={py ?? 0} w={23} depth={13} h={35} active={i===1} /><path d={`M${(px ?? 0)-14} ${(py ?? 0)+13} l14 7 v17 M${(px ?? 0)-14} ${(py ?? 0)+22} l14 7`} className="tech-detail" /><Port x={px ?? 0} y={py ?? 0} /></g>)}<path d="M-40 54 L0 32 L42 54" className="tech-path" /></g>;
}
function Infrastructure({ x, y, small = false }: { x: number; y: number; small?: boolean }) {
  return <g transform={`translate(${x} ${y}) scale(${small ? .7 : 1})`}><Slab x={0} y={32} w={80} depth={34} h={10} />{[-38,0,38].map((px,i) => <g key={px}><Slab x={px} y={12-i*10} w={19} depth={11} h={42+i*10} active={i===1} />{[27,36,45].map(dy => <path key={dy} d={`M${px-13} ${dy-i*10} l10 5`} className="tech-detail" />)}<circle cx={px-7} cy={22-i*10} r="2.5" className="tech-signal" /></g>)}<path d="M-43 -28 Q-60 -46 -36 -54 Q-31 -80 -6 -65 Q20 -85 32 -57 Q59 -58 51 -34 Q42 -23 24 -28 Z" className="tech-cloud" /><path d="M0 -26 V0 M-26 -30 V-4 M28 -27 V-8" className="tech-neural" /></g>;
}
function Emerging({ x, y, small = false }: { x: number; y: number; small?: boolean }) {
  return <g transform={`translate(${x} ${y}) scale(${small ? .7 : 1})`}><Slab x={0} y={38} w={65} depth={27} h={8} />{[-1,1].map(side => <g key={side}><path d={`M${side*12} -48 L${side*48} -27 L${side*48} 17 L${side*12} 39 Z`} className={side===1 ? 'tech-prototype' : 'tech-core-shell'} /><path d={`M${side*12} -25 L${side*48} -5 M${side*12} 0 L${side*48} 20`} className="tech-detail" /></g>)}<Signal d="M-36 -10 Q0 -65 36 -10" /><Signal d="M36 20 Q0 67 -36 20" delay={2} /><Port x={0} y={-8} /></g>;
}
function People({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`}><Slab x={0} y={35} w={60} depth={27} h={9} />{[-25,8,36].map((px,i) => <g key={px}><circle cx={px} cy={-20+i*7} r="10" className="tech-person" /><path d={`M${px-15} ${i*7} Q${px} ${-15+i*7} ${px+15} ${i*7} V${20+i*7} H${px-15} Z`} className="tech-person" /></g>)}<path d="M-50 -25 Q-50 -55 -21 -55 H3 Q15 -55 15 -41 V-28 H-30 L-40 -19 V-28" className="tech-cloud" /></g>;
}
function Decisions({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`}><Slab x={0} y={35} w={60} depth={27} h={9} /><path d="M-45 -35 H42 V28 H-45 Z" className="tech-display" />{[18,30,44,36].map((h,i) => <path key={i} d={`M${-30+i*16} 17 V${17-h}`} className="tech-bar" />)}<path d="M-32 -7 L-12 -20 L7 -13 L29 -31" className="tech-neural" /><circle cx="42" cy="22" r="15" className="tech-signal" /><path d="M35 22 l5 5 l9 -10" className="tech-check" /></g>;
}
export const techLayerNames = ['Intelligence','Data','Automation','Enterprise','Infrastructure','Emerging'];
export const techLayerDescriptions = [
  'AI · Machine Learning · Generative AI · AI Agents · Decision Intelligence',
  'Data Engineering · Analytics · Business Intelligence · Data Platforms · Predictive Intelligence',
  'Process Automation · RPA · Intelligent Workflows · AI-Powered Automation · Orchestration',
  'ERP · CRM · Enterprise Applications · APIs · Integration',
  'Cloud · Digital Infrastructure · DevOps · Cybersecurity · Scalable Architecture',
  'IoT · Digital Twins · Blockchain · Extended Reality · Advanced Computing',
];
const forms = [Intelligence, DataBank, Workflow, Applications, Infrastructure, Emerging];

export function LayerArchitecture({ selected }: { selected: number }) {
  return <TechnicalVisual label={`${techLayerNames[selected]} within the connected technology architecture`}>
    <path d="M80 424 L680 424" className="tech-baseline" />
    {forms.slice(0,5).map((Form,i) => { const y=80+i*70; return <g key={i} className={`tech-layer ${selected===i ? 'is-selected' : ''}`}><path d={`M110 ${y+20} L600 ${y+20}`} className="tech-conduit" /><Signal d={`M145 ${y+20} H592 V${y+90}`} delay={i} /><g transform={`translate(${210+i*64} ${y}) scale(.72)`}><Form x={0} y={0} /></g><Label x={95} y={y+10}>0{i+1}</Label><text x="605" y={y+12} className="tech-label tech-layer-label">{techLayerNames[i]}</text></g>; })}
    {selected===5 && <g><Emerging x={540} y={130} small /><Label x={550} y={60}>Emerging</Label></g>}
    <Port x={592} y={424} />
  </TechnicalVisual>;
}

export function IntelligenceArchitecture({ selected }: { selected: number }) {
  const modules=[{name:'Data',x:126,y:145,Form:DataBank},{name:'Applications',x:610,y:133,Form:Applications},{name:'Automation',x:608,y:339,Form:Workflow},{name:'People',x:139,y:350,Form:People},{name:'Decisions',x:385,y:395,Form:Decisions}];
  return <TechnicalVisual label={`AI processes enterprise context and supports ${modules[selected]?.name ?? 'Data'}`}>
    {modules.map(({x,y,name,Form},i) => <g key={name} className={`tech-endpoint ${selected===i?'is-selected':''}`}><Signal d={i===0 ? `M${x+50} ${y} C230 ${y} 260 218 330 218` : `M410 218 C${x} 218 ${x} ${y-60} ${x} ${y}`} reverse={i===3} delay={i} /><Form x={x} y={y} /><Label x={x} y={i===4 ? y+79 : y+95}>{name}</Label></g>)}
    <Intelligence x={378} y={203} /><Label x={378} y={120}>Enterprise intelligence</Label>
    <path d="M283 202 Q283 143 378 143 Q471 143 471 202" className="tech-context-arc" />
  </TechnicalVisual>;
}

export function IntegrationArchitecture({ selected }: { selected: number }) {
  const modules=[{name:'ERP',x:130,y:110,Form:Applications},{name:'CRM',x:380,y:65,Form:People},{name:'Cloud',x:635,y:120,Form:Infrastructure},{name:'Data Platforms',x:635,y:340,Form:DataBank},{name:'Applications',x:395,y:385,Form:Applications},{name:'IoT',x:120,y:350,Form:Emerging},{name:'AI',x:80,y:226,Form:Intelligence}];
  return <TechnicalVisual label={`Integration fabric coordinates existing ${modules[selected]?.name ?? 'ERP'} systems through APIs`}>
    {modules.map(({x,y,name,Form},i) => <g key={name} className={`tech-endpoint ${selected===i?'is-selected':''}`}><Signal d={`M${x} ${y+20} C${x} 248 380 ${y+20} 380 248`} reverse={i%2===0} delay={i} /><g transform={`translate(${x} ${y}) scale(.64)`}><Form x={0} y={0} /></g><Label x={x} y={y+75}>{name}</Label></g>)}
    <Slab x={380} y={246} w={135} depth={52} h={25} /><Slab x={380} y={225} w={100} depth={37} h={15} active />
    {[-60,-20,20,60].map((dx,i) => <g key={dx}><Slab x={380+dx} y={220} w={15} depth={8} h={16} active={selected%4===i} /><Port x={380+dx} y={211} /></g>)}
    <Label x={380} y={163}>APIs · Orchestration · Integration</Label>
  </TechnicalVisual>;
}

export function EcosystemIllustration({ index }: { index: number }) {
  return <TechnicalVisual compact label={['Connected cloud environments','Enterprise application platforms','Data processing and analytics','AI models and intelligent agents','API and middleware pathways','Secure computing and deployment'][index] ?? 'Technology ecosystem'}>
    {index===0 ? <><Infrastructure x={120} y={133} /><Infrastructure x={240} y={83} small /><Signal d="M135 185 Q220 225 244 110" /></> : index===1 ? <><Applications x={120} y={120} /><Applications x={240} y={80} small /><Signal d="M130 170 L240 128" /></> : index===2 ? <><DataBank x={76} y={100} /><Signal d="M118 110 C165 110 156 130 185 130" /><Decisions x={235} y={117} /></> : index===3 ? <><Intelligence x={156} y={112} />{[40,275].map((x,i) => <g key={x}><Port x={x} y={96+i*50} /><Signal d={`M${x} ${96+i*50} L${i===0?100:208} 112`} delay={i} /></g>)}</> : index===4 ? <><Applications x={70} y={115} small /><DataBank x={252} y={100} small /><Signal d="M94 145 L148 145 L164 92 L228 92" /><Slab x={158} y={124} w={23} depth={13} h={24} active /><Port x={158} y={118} /></> : <><Infrastructure x={146} y={100} /><path d="M245 118 L272 130 V160 Q267 179 245 188 Q223 179 218 160 V130 Z" className="tech-shield" /><path d="M230 151 l10 10 l19 -23" className="tech-check" /><Signal d="M176 163 L219 151" /></>}
  </TechnicalVisual>;
}

export function IntelligenceRelationship({ index }: { index: number }) {
  return <TechnicalVisual compact label={['Data provides enterprise context','AI brings intelligence into applications','Intelligence triggers automated workflows','People receive intelligent assistance','AI informs actionable decisions'][index] ?? 'AI enterprise relationship'}>
    {index===0 ? <><DataBank x={70} y={110} small /><Signal d="M101 126 L204 126" /><Intelligence x={246} y={119} small /></> : index===1 ? <><Slab x={77} y={118} w={23} depth={14} h={24} active /><Signal d="M103 130 L186 130" /><Applications x={238} y={107} small /></> : index===2 ? <><Slab x={58} y={112} w={23} depth={14} h={24} active /><Signal d="M82 124 L121 124" /><Workflow x={207} y={129} small /></> : index===3 ? <><Slab x={70} y={123} w={23} depth={14} h={24} active /><Signal d="M94 135 L185 135" /><People x={235} y={123} /></> : <><Slab x={65} y={119} w={23} depth={14} h={24} active /><Signal d="M90 133 L178 133" /><Decisions x={234} y={115} /></>}
  </TechnicalVisual>;
}

export function FunctionIllustration({ index }: { index: number }) {
  const positions: [number,number][] = [[105,230],[295,190],[490,230],[660,190]];
  const names=[['Processes','Automation','Operations'],['Financial data','Analysis','Reporting'],['Customer data','Campaigns','Decisions'],['Recruitment','Onboarding','Employee support'],['Suppliers','Inventory','Logistics','Delivery'],['Channels','Intelligent assistance','Customer experience'],['Controls','Monitoring','Evidence','Reporting'],['Enterprise data','Intelligence','Decisions']];
  const row=names[index] ?? names[0] ?? [];
  return <TechnicalVisual label={`${row.join(' to ')} technology architecture`}>
    {index===0 ? <><Workflow x={160} y={228} /><Signal d="M260 230 L350 230" /><Applications x={430} y={215} /><Signal d="M493 230 L620 230" /><Decisions x={665} y={217} /></> : index===1 ? <><DataBank x={110} y={206} />{[0,1,2].map(i => <Signal key={i} d={`M152 ${200+i*18} L275 ${200+i*18} L335 218`} delay={i} />)}<Intelligence x={380} y={204} /><Signal d="M435 220 L587 220" /><Decisions x={645} y={201} /></> : index===2 ? <><People x={112} y={210} /><Signal d="M170 232 Q260 150 345 220" /><Applications x={380} y={202} /><Signal d="M435 226 Q540 310 601 224" /><Decisions x={654} y={204} /></> : index===3 ? <><People x={108} y={209} /><Signal d="M160 220 L321 220" /><Applications x={380} y={207} /><Signal d="M436 225 L592 225" /><People x={650} y={214} /><path d="M110 110 Q380 -10 650 110" className="tech-context-arc" /></> : index===4 ? <>{positions.map(([x,y],i) => <g key={i}>{i<3 && <Signal d={`M${x} ${y+50} L${positions[i+1]?.[0] ?? 660} ${(positions[i+1]?.[1] ?? 190)+50}`} delay={i} />}{i===1 ? <DataBank x={x} y={y} /> : <Applications x={x} y={y} />}<Label x={x} y={y+113}>{row[i]}</Label></g>)}</> : index===5 ? <><People x={115} y={220} /><Signal d="M170 240 L320 240" /><Intelligence x={380} y={219} /><Signal d="M440 240 L590 240" /><People x={650} y={220} /><path d="M650 155 Q380 15 115 155" className="tech-context-arc" /></> : index===6 ? <><Infrastructure x={108} y={209} /><Signal d="M173 235 L300 235" /><path d="M380 134 L438 159 V230 Q426 275 380 294 Q334 275 322 230 V159 Z" className="tech-shield" /><path d="M355 215 l18 18 l34 -39" className="tech-check" /><Signal d="M441 235 L594 235" /><Decisions x={650} y={212} /><path d="M380 108 V82 M368 94 H392" className="tech-neural" /></> : <><DataBank x={110} y={207} /><Signal d="M156 223 L325 223" /><Intelligence x={380} y={210} /><Signal d="M435 226 L594 226" /><Decisions x={650} y={210} /></>}
    {index!==4 && row.map((name,i) => <Label key={name} x={[110,380,650][i] ?? 380} y={355}>{name}</Label>)}
  </TechnicalVisual>;
}

export function LabIllustration({ selected }: { selected: number }) {
  return <TechnicalVisual viewBox="0 75 760 320" label={`${['Explore','Experiment','Validate','Apply'][selected]}: emerging ideas progress into a practical technology system`}>
    <Signal d="M102 300 C222 300 207 250 298 250 S434 300 478 300 S565 250 665 250" delay={3} />
    <g className={`tech-lab-stage ${selected===0?'is-selected':''}`}><path d="M40 244 L103 207 L167 244 L103 281 Z" className="tech-prototype" />{[[-32,-8],[0,-48],[37,-22],[19,22]].map(([dx,dy],i) => <g key={i}><path d={`M103 245 L${103+(dx ?? 0)} ${223+(dy ?? 0)}`} className="tech-neural" /><Port x={103+(dx ?? 0)} y={223+(dy ?? 0)} /></g>)}<Label x={103} y={350}>01 — Explore</Label></g>
    <g className={`tech-lab-stage ${selected===1?'is-selected':''}`}><Emerging x={291} y={211} /><path d="M235 155 V120 H255 M345 155 V120 H325 M235 268 V290 H255 M345 268 V290 H325" className="tech-neural" /><Label x={291} y={350}>02 — Experiment</Label></g>
    <g className={`tech-lab-stage ${selected===2?'is-selected':''}`}><Decisions x={478} y={221} /><path d="M428 135 H524 M440 123 V147 M473 123 V147 M512 123 V147" className="tech-neural" /><Label x={478} y={350}>03 — Validate</Label></g>
    <g className={`tech-lab-stage ${selected===3?'is-selected':''}`}><Applications x={666} y={212} /><Slab x={666} y={180} w={27} depth={13} h={18} active /><Label x={666} y={350}>04 — Apply</Label></g>
  </TechnicalVisual>;
}

export function ConnectionMotif() {
  return <TechnicalVisual compact label="Connected technology converges into one foundation"><Signal d="M25 60 L115 120 L160 120" /><Signal d="M25 185 L115 120" delay={2} /><Signal d="M160 120 L275 75" delay={1} /><Signal d="M160 120 L275 170" delay={3} /><Slab x={160} y={108} w={32} depth={17} h={24} active />{[[25,60],[25,185],[275,75],[275,170]].map(([x,y],i) => <Port key={i} x={x ?? 0} y={y ?? 0} />)}</TechnicalVisual>;
}