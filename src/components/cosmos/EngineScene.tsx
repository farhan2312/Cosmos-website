'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, Line, RoundedBox } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState, Suspense } from 'react';
import * as T from 'three';

type Props = { selected: number; onSelect: (i: number) => void; signature?: boolean; active: boolean; reduced: boolean; colors: [string,string,string,string] };
const positions: [number, number, number][] = [[0, .3, -2.8], [-3, .3, -1.1], [-3, .3, 1.8], [0, .3, 3.2], [3, .3, 1.8], [3, .3, -1.1]];

function Signal({ end, color, running }: { end: [number, number, number]; color: string; running: boolean }) {
  const ref = useRef<T.Mesh>(null);
  const t = useRef(0);
  const curve = useMemo(() => new T.CatmullRomCurve3([new T.Vector3(0,.25,0), new T.Vector3(end[0]*.5,.25,0),new T.Vector3(end[0],.25,end[2])]),[end]);
  useFrame((_,d)=>{if (!ref.current || !running) return; t.current=(t.current+Math.min(d,.05)*.24)%1; ref.current.position.copy(curve.getPoint(t.current));});
  return <><Line points={curve.getPoints(30)} color={color} lineWidth={1.5}/><mesh ref={ref} position={end}><boxGeometry args={[.11,.08,.11]}/><meshBasicMaterial color={color}/></mesh></>;
}

function Module({ index, position, selected, onSelect, colors }: { index: number; position: [number,number,number]; selected: number; onSelect:(i:number)=>void; colors:[string,string,string,string] }) {
  const [hover,setHover]=useState(false);
  const ref=useRef<T.Group>(null);
  const active=selected===index || hover;
  const silver=colors[1], accent=colors[2], graphite=colors[0];
  useFrame((_,d)=>{if(ref.current) ref.current.position.y=T.MathUtils.damp(ref.current.position.y,position[1]+(active?.25:0),4,Math.min(d,.05));});
  const mat = <meshStandardMaterial color={active?accent:"#e9e6f2"} metalness={.1} roughness={.4}/>;
  return <group ref={ref} position={position} onClick={e=>{e.stopPropagation();onSelect(index);}} onPointerOver={e=>{e.stopPropagation();setHover(true);}} onPointerOut={()=>setHover(false)}>
    <RoundedBox args={[1.8,.18,1.6]} radius={.06} smoothness={2} receiveShadow castShadow><meshStandardMaterial color="#f2f0f7" metalness={.15} roughness={.45}/></RoundedBox>
    <mesh position={[0,.12,0]}><boxGeometry args={[1.68,.035,1.48]}/><meshStandardMaterial color={active?accent:"#ffffff"} metalness={.1} roughness={.35}/></mesh>
    {index===0 && <><mesh position={[0,.28,0]}><boxGeometry args={[1,.25,.9]}/>{mat}</mesh><mesh position={[0,.43,0]}><boxGeometry args={[.6,.04,.55]}/><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={active?.8:.15} metalness={.7}/></mesh></>}
    {index===1 && [0,1,2,3].map(i=><mesh key={i} position={[-.55+i*.36,.28+i*.06,0]}><boxGeometry args={[.23,.3+i*.12,.9]}/>{mat}</mesh>)}
    {index===2 && [0,1,2].map(i=><group key={i} position={[-.54+i*.54,.27,0]}><mesh><cylinderGeometry args={[.22,.22,.25,6]}/>{mat}</mesh><mesh position={[0,.15,0]}><cylinderGeometry args={[.09,.09,.04,6]}/><meshBasicMaterial color={accent}/></mesh></group>)}
    {index===3 && [-1,1].map(i=><group key={i} position={[i*.43,.35,0]}><mesh><boxGeometry args={[.58,.45,.95]}/>{mat}</mesh>{[0,1,2].map(j=><mesh key={j} position={[0,-.12+j*.13,.48]}><boxGeometry args={[.4,.025,.01]}/><meshBasicMaterial color={accent}/></mesh>)}</group>)}
    {index===4 && <>{[0,1,2].map(i=><mesh key={i} position={[0,.23+i*.16,0]}><boxGeometry args={[1.28,.11,.95]}/>{mat}</mesh>)}<mesh position={[0,.73,0]}><boxGeometry args={[.4,.08,.4]}/><meshBasicMaterial color={accent}/></mesh></>}
    {index===5 && [-1,1].flatMap(x=>[-1,1].map(z=><mesh key={`${x}${z}`} position={[x*.4,.35,z*.35]}><octahedronGeometry args={[.28,0]}/>{mat}</mesh>))}
  </group>;
}

function System(props: Props) {
  const ref=useRef<T.Group>(null);
  const [texture,setTexture]=useState<T.CanvasTexture>();
  useEffect(()=>{
    const c=document.createElement('canvas'); c.width=c.height=512;
    const ctx=c.getContext('2d'); if(!ctx)return;
    ctx.fillStyle='#f7f6fb';ctx.fillRect(0,0,512,512);ctx.strokeStyle=props.colors[2];ctx.globalAlpha=.18;ctx.lineWidth=1;
    for(let i=16;i<512;i+=32){ctx.beginPath();ctx.moveTo(i,0);ctx.lineTo(i,512);ctx.moveTo(0,i);ctx.lineTo(512,i);ctx.stroke();}
    ctx.globalAlpha=.55;for(let i=0;i<64;i++){ctx.fillStyle=props.colors[2];ctx.fillRect((i*73)%500,(i*47)%500,2,2);}
    const map=new T.CanvasTexture(c);map.colorSpace=T.SRGBColorSpace;setTexture(map);return()=>map.dispose();
  },[props.colors]);
  useFrame(({pointer},d)=>{if(!ref.current||props.reduced)return; const dt=Math.min(d,.05);ref.current.rotation.y=T.MathUtils.damp(ref.current.rotation.y,-.2+pointer.x*.1,3,dt);ref.current.rotation.x=T.MathUtils.damp(ref.current.rotation.x,pointer.y*.04,3,dt);});
  const modulePositions = useMemo(()=>props.signature?positions.map((_,i)=>[0,(5-i)*.7+.3,0] as [number,number,number]):positions,[props.signature]);
  return <group ref={ref} rotation={[0,-.2,0]}>
    <mesh position={[0,-.05,0]} receiveShadow><boxGeometry args={[8,.15,8]}/><meshStandardMaterial map={texture??null} color="#ffffff" metalness={.05} roughness={.7}/></mesh>
    <mesh position={[0,.18,0]} castShadow><cylinderGeometry args={[1.05,1.15,.3,6]}/><meshStandardMaterial color="#ece9f4" metalness={.15} roughness={.2}/></mesh>
    <mesh position={[0,.37,0]}><cylinderGeometry args={[.77,.77,.09,6]}/><meshStandardMaterial color="#ffffff" metalness={.5} roughness={.3}/></mesh>
    <mesh position={[0,.44,0]}><cylinderGeometry args={[.44,.44,.07,6]}/><meshStandardMaterial color={props.colors[2]} emissive={props.colors[2]} emissiveIntensity={.6} metalness={.5} roughness={.2}/></mesh>
    {props.signature ? modulePositions.map((p,i)=><group key={i} position={p} onClick={e=>{e.stopPropagation();props.onSelect(i);}}>
      <RoundedBox args={[5.3,.12,4.2]} radius={.03} smoothness={2} castShadow><meshStandardMaterial color={props.selected===i?props.colors[2]:props.colors[1]} metalness={.65} roughness={.28} transparent opacity={props.selected===i?.95:.7}/></RoundedBox>
      <Line points={[[-2.3,.09,-1.7],[1.8,.09,-1.7],[1.8,.09,1.5],[-1.8,.09,1.5],[-1.8,.09,-.5],[.9,.09,-.5],[.9,.09,.9]]} color={props.colors[0]} lineWidth={1}/>
      {[0,1,2,3].map(j=><mesh key={j} position={[-1.7+j*1.1,.14,j%2===0?-.9:.8]}><boxGeometry args={[.35,.14,.35]}/><meshStandardMaterial color={props.selected===i?props.colors[0]:props.colors[2]} metalness={.6} roughness={.3}/></mesh>)}
    </group>) : modulePositions.map((p,i)=><group key={i}><Signal end={p} color={props.selected<0||props.selected===i?props.colors[2]:props.colors[3]} running={props.active&&!props.reduced}/><Module index={i} position={p} {...props}/></group>)}
    {props.signature && <Line points={[[2.7,.3,1.8],[2.7,4.2,1.8]]} color={props.colors[2]} lineWidth={2}/>}

  </group>;
}

export default function EngineScene(props:Props) {
  return <Canvas frameloop={props.active&&!props.reduced?'always':'demand'} dpr={[1,1.4]} shadows camera={{position:[10,11,12],fov:38}} gl={{antialias:true,alpha:true}} onCreated={({gl,camera})=>{gl.toneMapping=T.ACESFilmicToneMapping;gl.toneMappingExposure=1.05;camera.lookAt(0,props.signature?1:0,0);}}>
    <ambientLight intensity={.65}/><directionalLight position={[2,9,5]} intensity={3} castShadow shadow-mapSize={[1024,1024]}/><directionalLight position={[-6,3,-4]} color={props.colors[2]} intensity={2}/>
    <Suspense fallback={null}><Environment resolution={64}><Lightformer position={[0,6,0]} rotation-x={-Math.PI/2} scale={[10,10,1]} intensity={3}/><Lightformer position={[-5,2,0]} rotation-y={Math.PI/2} scale={[8,4,1]} intensity={2} color={props.colors[2]}/></Environment><System {...props}/></Suspense>
  </Canvas>;
}