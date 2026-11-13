'use client';
import { useEffect, useRef, useState } from 'react';

export function Architecture({ variant = 0 }: { variant?: number }) {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const container = host.current;
    if (!container) return;
    let disposed = false;
    let cleanup = () => {};
    import('three').then((T) => {
      if (disposed) return;
      const styles = getComputedStyle(container);
      const color = (token: string) => new T.Color(styles.getPropertyValue(token).trim());
      const silver = color('--scene-silver');
      const violet = color('--scene-violet');
      const lineColor = color('--scene-line');
      const white = color('--scene-white');
      const scene = new T.Scene();
      const camera = new T.PerspectiveCamera(33, 1, 0.1, 100);
      camera.position.set(10, 9, 12);
      camera.lookAt(0, 0, 0);
      let renderer: InstanceType<typeof T.WebGLRenderer>;
      try { renderer = new T.WebGLRenderer({ antialias: true, alpha: true }); }
      catch { return; }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
      renderer.setClearColor(white, 0);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = T.PCFSoftShadowMap;
      renderer.toneMapping = T.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.65;
      container.appendChild(renderer.domElement);
      scene.add(new T.AmbientLight(white, 2.6));
      const light = new T.DirectionalLight(white, 5);
      light.position.set(-4, 12, 6); light.castShadow = true;
      light.shadow.mapSize.set(1024, 1024);
      light.shadow.camera.left = -9; light.shadow.camera.right = 9;
      light.shadow.camera.top = 9; light.shadow.camera.bottom = -9;
      light.shadow.bias = -0.001;
      scene.add(light);
      const fill = new T.DirectionalLight(violet, 1.5); fill.position.set(5, 3, -3); scene.add(fill);
      const group = new T.Group(); scene.add(group);
      group.rotation.y = -0.12 + variant * 0.13;
      const material = new T.MeshPhysicalMaterial({ color: silver, metalness: 0.38, roughness: 0.28 });
      const glass = new T.MeshPhysicalMaterial({ color: violet, transparent: true, opacity: 0.28, metalness: 0.15, roughness: 0.12, side: T.DoubleSide, depthWrite: false });
      const nodeMaterial = new T.MeshStandardMaterial({ color: violet, metalness: 0.45, roughness: 0.3 });
      const lines = new T.LineBasicMaterial({ color: lineColor, transparent: true, opacity: 0.38 });
      function block(w: number, h: number, d: number, x: number, y: number, z: number, mat: InstanceType<typeof T.Material> = material) {
        const geo = new T.BoxGeometry(w, h, d);
        const mesh = new T.Mesh(geo, mat);mesh.position.set(x, y, z);mesh.castShadow = true;mesh.receiveShadow = true;group.add(mesh);
        const edge = new T.LineSegments(new T.EdgesGeometry(geo), lines);edge.position.copy(mesh.position);group.add(edge);
        return mesh;
      }
      block(7.4, 0.17, 6.5, 0, -1.7, 0);
      const modules: Array<[number,number,number,number,number]> = variant % 3 === 1 ? [[-2,-1,1.4,2.6,1.6],[0,1.5,2,1.8,1.5],[2,-1,1.8,1.7,2],[-1.8,1.9,1,1.4,1.3]] : [[-2,1.5,1.7,1.6,2],[0.3,0.2,2.4,2.1,1.9],[2.2,-1.7,1.4,1.4,1.5],[-2,-1.7,1.2,1.9,1.5],[1.8,1.8,1,1.4,1.3]];
      modules.forEach(([x,z,h,w,d],i) => {
        block(w,h,d,x,-1.55+h/2,z);
        for(let j=0;j<4;j++)block(w+0.05,0.025,d+0.05,x,-1.3+j*h/4,z);
        block(w+0.28,0.065,d+0.28,x,-1.45+h,z,nodeMaterial);
        for(let j=0;j<3;j++)block(w*0.8,0.035,d*0.8,x,-0.9+h+j*0.45,z,glass as InstanceType<typeof T.MeshPhysicalMaterial>);
        const points=[new T.Vector3(x,-1.38,z),new T.Vector3(x,-1.38,0),new T.Vector3(0,-1.38,0)];
        group.add(new T.Line(new T.BufferGeometry().setFromPoints(points),new T.LineBasicMaterial({color:violet,transparent:true,opacity:.6})));
      });
      const floatPanels: InstanceType<typeof T.Mesh>[]=[];
      for(let j=0;j<3;j++)floatPanels.push(block(4.9-j*.45,.045,4.1-j*.25,.1,2.2+j*.52,.1,glass as InstanceType<typeof T.MeshPhysicalMaterial>));
      // Fine grid traces describe the shared enterprise foundation.
      for(let i=-6;i<=6;i++) {
        const x=i*.52;
        group.add(new T.Line(new T.BufferGeometry().setFromPoints([new T.Vector3(x,-1.59,-3.2),new T.Vector3(x,-1.59,3.2)]),lines));
        group.add(new T.Line(new T.BufferGeometry().setFromPoints([new T.Vector3(-3.6,-1.59,x),new T.Vector3(3.6,-1.59,x)]),lines));
      }
      let seed=1234;const random=()=>{seed=(seed*16807)%2147483647;return seed/2147483647};
      const positions=new Float32Array(2100*3);
      for(let i=0;i<2100;i++) { positions[i*3]=(random()-.5)*8;positions[i*3+1]=random()*5-1.3;positions[i*3+2]=(random()-.5)*7; }
      const particleGeo=new T.BufferGeometry();particleGeo.setAttribute('position',new T.BufferAttribute(positions,3));
      const particles=new T.Points(particleGeo,new T.PointsMaterial({color:violet,size:.018,transparent:true,opacity:.38}));group.add(particles);
      const floor=new T.Mesh(new T.PlaneGeometry(200,200),new T.ShadowMaterial({opacity:.12}));floor.rotation.x=-Math.PI/2;floor.position.y=-1.81;scene.add(floor);
      let targetX=0,targetY=0,frame=0,visible=true;
      const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const resize=()=>{const {width,height}=container.getBoundingClientRect();if(!width||!height)return;renderer.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix();};
      const observer=new ResizeObserver(resize);observer.observe(container);resize();
      const intersection=new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting??true});intersection.observe(container);
      const move=(e:PointerEvent)=>{const r=container.getBoundingClientRect();targetX=((e.clientX-r.left)/r.width-.5)*.16;targetY=((e.clientY-r.top)/r.height-.5)*.07;};
      container.addEventListener('pointermove',move);
      const start=performance.now();
      const animate=()=>{frame=requestAnimationFrame(animate);if(!visible)return;const t=(performance.now()-start)/1000;
        if(!reduced){group.rotation.y+=(targetX-.12+variant*.13-group.rotation.y)*.025;group.rotation.x+=(targetY-group.rotation.x)*.025;floatPanels.forEach((p,i)=>p.position.y=2.2+i*.52+Math.sin(t*.45+i)*.06);particles.rotation.y=t*.007;}
        renderer.render(scene,camera);
      };animate();setReady(true);
      cleanup=()=>{cancelAnimationFrame(frame);observer.disconnect();intersection.disconnect();container.removeEventListener('pointermove',move);scene.traverse(o=>{if(o instanceof T.Mesh||o instanceof T.Line||o instanceof T.Points){o.geometry.dispose();const mats=Array.isArray(o.material)?o.material:[o.material];mats.forEach(m=>m.dispose())}});renderer.dispose();renderer.domElement.remove();};
    });
    return()=>{disposed=true;cleanup();};
  },[variant]);
  return <div ref={host} className={`architecture ${ready?'is-ready':''}`} role="img" aria-label="Connected enterprise architecture: intelligence, data, applications and automation in a shared digital foundation"><div className="architecture-fallback"><div/><div/><div/><div/></div></div>;
}
