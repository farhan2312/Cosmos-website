'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export const stack = [
 {title:'Intelligence',items:['AI','Machine Learning','Generative AI','AI Agents','Decision Intelligence']},
 {title:'Data',items:['Data Engineering','Analytics','Business Intelligence','Data Platforms','Predictive Intelligence']},
 {title:'Automation',items:['Process Automation','RPA','Intelligent Workflows','AI-Powered Automation','Orchestration']},
 {title:'Enterprise',items:['ERP','CRM','Enterprise Applications','APIs','Integration']},
 {title:'Infrastructure',items:['Cloud','Digital Infrastructure','DevOps','Cybersecurity','Scalable Architecture']},
 {title:'Emerging',items:['IoT','Digital Twins','Blockchain','Extended Reality','Advanced Computing']}
];
export function LayerSystem({ compact = false }: { compact?: boolean }) {
 const [selected,setSelected]=useState(0);
 return <div className={`layer-system ${compact?'compact':''}`}><div className="layer-schematic" aria-hidden="true">{stack.map((s,i)=><div key={s.title} className={`glass-layer layer-${i} ${selected===i?'selected':''}`}><span>{s.title}</span><i/><i/><i/></div>)}</div><div className="layer-controls">{stack.map((s,i)=><div className="layer-row" key={s.title}><Button variant="ghost" onClick={()=>setSelected(i)} aria-pressed={selected===i}><span className="tiny-number">0{i+1}</span>{s.title}<span className="node-dot"/></Button>{selected===i&&<div className="layer-items">{s.items.map(item=><span key={item}>{item}</span>)}</div>}</div>)}</div></div>
}
export function Network({ ai = false }: { ai?: boolean }) {
 const nodes=ai?['Data','Applications','Processes','People','Decisions']:['ERP','CRM','Cloud','Data Platforms','Applications','IoT','AI'];
 const [selected,setSelected]=useState(nodes[0]);
 return <div className="network-system"><svg viewBox="0 0 800 430" aria-hidden="true">{nodes.map((n,i)=>{const a=i/nodes.length*Math.PI*2-Math.PI/2;return <path key={n} d={`M 400 215 Q ${400+Math.cos(a)*110} ${215+Math.sin(a)*65} ${400+Math.cos(a)*280} ${215+Math.sin(a)*155}`} className={selected===n?'active':''}/>})}</svg><div className="network-core"><span className="core-emblem"/><strong>{ai?'AI':'Integration Fabric'}</strong></div>{nodes.map((n,i)=><Button variant="outline" key={n} className={`network-node network-node-${i} ${selected===n?'selected':''} ${ai?'ai-node':''}`} aria-pressed={selected===n} onClick={()=>setSelected(n)}>{n}<span className="node-dot"/></Button>)}</div>
}
