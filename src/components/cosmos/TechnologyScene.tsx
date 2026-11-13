'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, Line, RoundedBox } from '@react-three/drei';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import * as T from 'three';

type Props = { colors: [string,string,string,string,string]; active: boolean; reduced: boolean; selected: number; onSelect: (index: number) => void; onReady: () => void };
const locations: [number,number,number][] = [[-3.5,0,-2.3],[0,0,-3.5],[3.6,0,-2],[3.5,0,2.5],[0,0,3.8],[-3.5,0,2.2]];
function Ecosystem(props: Props) {
  const system = useRef<T.Group>(null);
  const signals = useRef<(T.Mesh|null)[]>([]);
  const elapsed = useRef(0);
  const ready = useRef(false);
  const violet=props.colors[0], bright=props.colors[1], silver=props.colors[2], white=props.colors[3], deep=props.colors[4];
  const curves=useMemo(() => locations.map(p => new T.CatmullRomCurve3([new T.Vector3(0,.14,0),new T.Vector3(p[0]*.55,.14,p[2]*.25),new T.Vector3(p[0],.14,p[2])])),[]);
  const texture=useMemo(() => {
    const c=document.createElement('canvas');c.width=c.height=256;
    const ctx=c.getContext('2d');if(!ctx)return undefined;
    ctx.fillStyle=white ?? '';ctx.fillRect(0,0,256,256);ctx.strokeStyle=silver ?? '';ctx.lineWidth=1;
    for(let i=0;i<18;i++){const x=12+(i*41)%232,y=10+(i*29)%234;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+12,y);ctx.lineTo(x+12,y+18);ctx.stroke();}
    const map=new T.CanvasTexture(c);map.colorSpace=T.SRGBColorSpace;return map;
  },[white,silver]);
  useEffect(() => () => texture?.dispose(),[texture]);
  useFrame(({pointer},delta) => {
    if(!ready.current){ready.current=true;props.onReady();}
    if(!props.active||props.reduced)return;
    const dt=Math.min(delta,.05);elapsed.current+=dt;
    if(system.current)system.current.rotation.y=T.MathUtils.damp(system.current.rotation.y,-.15+pointer.x*.07,3,dt);
    signals.current.forEach((mesh,i) => {const curve=curves[i];if(mesh&&curve)mesh.position.copy(curve.getPoint((elapsed.current*.13+i*.16)%1));});
  });
  const Material=({on=false}:{on?:boolean}) => <meshStandardMaterial color={on?violet:white} metalness={.45} roughness={.3}/>;
  return <group ref={system} rotation={[0,-.15,0]}>
    <RoundedBox args={[9.4,.14,9.1]} radius={.1} smoothness={2} position={[0,-.25,0]} receiveShadow><meshStandardMaterial color={white} map={texture ?? null} roughness={.65}/></RoundedBox>
    {curves.map((curve,i) => <group key={i}><Line points={curve.getPoints(35)} color={silver} lineWidth={5}/><Line points={curve.getPoints(35)} color={props.selected===i?bright:violet} lineWidth={1.4}/><mesh ref={el => {signals.current[i]=el;}} position={locations[i] ?? [0,.14,0]}><sphereGeometry args={[.075,8,8]}/><meshBasicMaterial color={bright}/></mesh></group>)}
    <group position={[0,.1,0]}>
      {[0,1,2].map(i => <mesh key={i} position={[0,i*.24,0]} castShadow><cylinderGeometry args={[1.15-i*.15,1.15-i*.15,.14,6]}/><Material on={i===2}/></mesh>)}
      <mesh position={[0,1.15,0]} castShadow><octahedronGeometry args={[.72,0]}/><meshStandardMaterial color={deep} metalness={.75} roughness={.18}/></mesh>
      {[0,1,2].map(i => <mesh key={i} position={[0,.85+i*.25,0]} rotation={[Math.PI/2,0,Math.PI/6]}><torusGeometry args={[.9-i*.1,.018,6,6]}/><meshBasicMaterial color={bright}/></mesh>)}
      {[-1,1].flatMap(x => [-1,1].map(z => <mesh key={`${x}${z}`} position={[x*.75,.75,z*.75]}><cylinderGeometry args={[.03,.03,1,8]}/><meshStandardMaterial color={silver}/></mesh>))}
    </group>
    {locations.map((position,i) => <group key={i} position={position} onClick={event => {event.stopPropagation();props.onSelect(i);}}>
      <RoundedBox args={[1.8,.15,1.65]} radius={.06} smoothness={2} castShadow><Material on={props.selected===i}/></RoundedBox>
      {i===0 && <>{[0,1,2].map(j => <mesh key={j} position={[0,.35+j*.22,0]}><cylinderGeometry args={[.63,.63,.18,24]}/><Material on={j===1}/></mesh>)}{[-.3,0,.3].map(x => <mesh key={x} position={[x,.64,.57]}><sphereGeometry args={[.035,8,8]}/><meshBasicMaterial color={bright}/></mesh>)}</>}
      {i===1 && <>{[0,1,2].map(j => <mesh key={j} position={[-.42+j*.42,.3+j*.16,0]} castShadow><boxGeometry args={[.3,.35+j*.3,.7]}/><Material on={j===2}/></mesh>)}<Line points={[[-.65,.2,.5],[-.3,.6,.5],[.1,.5,.5],[.65,1.1,.5]]} color={bright} lineWidth={2}/></>}
      {i===2 && <>{[-.48,0,.48].map((x,j) => <group key={x} position={[x,.3,j===1?-.25:.2]}><mesh><cylinderGeometry args={[.23,.23,.3,6]}/><Material on={j===1}/></mesh><mesh position={[0,.2,0]}><sphereGeometry args={[.06,8,8]}/><meshBasicMaterial color={bright}/></mesh></group>)}<Line points={[[-.48,.3,.2],[0,.3,-.25],[.48,.3,.2]]} color={bright} lineWidth={2}/></>}
      {i===3 && <>{[-.45,.45].map(x => <group key={x} position={[x,.46,0]}><mesh castShadow><boxGeometry args={[.57,.7,.83]}/><Material on={x>0}/></mesh>{[0,1,2].map(j => <mesh key={j} position={[0,-.2+j*.18,.42]}><boxGeometry args={[.36,.035,.025]}/><meshBasicMaterial color={bright}/></mesh>)}</group>)}</>}
      {i===4 && <>{[-.5,0,.5].map(x => <group key={x} position={[x,.5,0]}><mesh castShadow><boxGeometry args={[.37,.83,.6]}/><Material on={x===0}/></mesh>{[0,1,2].map(j => <mesh key={j} position={[0,-.25+j*.22,.31]}><boxGeometry args={[.25,.035,.025]}/><meshBasicMaterial color={bright}/></mesh>)}</group>)}<Line points={[[-.72,.1,.65],[-.72,1.3,.65],[.72,1.3,.65],[.72,.1,.65]]} color={violet} lineWidth={1}/></>}
      {i===5 && <>{[-.4,.4].map(x => <mesh key={x} position={[x,.62,0]} castShadow><icosahedronGeometry args={[.44,0]}/><Material on={x>0}/></mesh>)}<Line points={[[-.4,.6,0],[.4,.6,0]]} color={bright} lineWidth={3}/><mesh position={[0,.2,0]}><torusGeometry args={[.67,.024,6,32]}/><meshBasicMaterial color={violet}/></mesh></>}
    </group>)}
  </group>;
}
export default function TechnologyScene(props:Props) {
  return <Canvas frameloop={props.active&&!props.reduced?'always':'demand'} dpr={[1,1.25]} shadows camera={{position:[10,12,12],fov:36}} gl={{antialias:true,alpha:true}} onCreated={({camera,gl}) => {camera.lookAt(0,0,0);gl.toneMapping=T.ACESFilmicToneMapping;gl.toneMappingExposure=1.05;gl.shadowMap.type=T.PCFShadowMap;}}>
    <ambientLight intensity={.8}/><directionalLight position={[1,8,5]} intensity={3} castShadow shadow-mapSize={[1024,1024]}/><directionalLight position={[-5,4,-5]} intensity={2} color={props.colors[0]}/>
    <Suspense fallback={null}><Environment resolution={64}><Lightformer position={[0,5,0]} rotation-x={-Math.PI/2} intensity={3} scale={[10,10,1]}/><Lightformer position={[-5,2,0]} rotation-y={Math.PI/2} intensity={2} color={props.colors[1]} scale={[8,5,1]}/></Environment></Suspense>
    <Ecosystem {...props}/>
  </Canvas>;
}