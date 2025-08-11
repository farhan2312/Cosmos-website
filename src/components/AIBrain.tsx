'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Define a type for the component's props to avoid using 'any'
interface OrbitingRingProps {
  count: number;
  radius: number;
  color: string;
  size: number;
  rotationSpeed: number;
  tilt: [number, number, number];
}

// This component creates a single orbiting ring of nodes
const OrbitingRing = ({ count, radius, color, size, rotationSpeed, tilt }: OrbitingRingProps) => {
  // Specify the correct type for the ref
  const ref = useRef<THREE.Points>(null);

  // Calculate the positions of the points on the ring once
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const angleStep = (2 * Math.PI) / count;
    for (let i = 0; i < count; i++) {
      const angle = i * angleStep;
      positions[i * 3] = radius * Math.cos(angle);
      positions[i * 3 + 1] = radius * Math.sin(angle);
      positions[i * 3 + 2] = 0;
    }
    return positions;
  }, [count, radius]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * rotationSpeed;
    }
  });

  return (
    <group rotation={tilt}>
      <Points ref={ref} positions={points} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color={color}
          size={size}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

// This component contains the 3D scene and the mouse-tracking logic
const Scene = () => {
  // Specify the correct type for the ref
  const groupRef = useRef<THREE.Group>(null);

  // This hook makes the entire model subtly follow the mouse
  useFrame(({ mouse }) => {
    if (groupRef.current) {
      const x = (mouse.x * Math.PI) / 10;
      const y = (mouse.y * Math.PI) / 10;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x, 0.1);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y, 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={7} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      
      {/* The central glowing sphere with your new settings */}
      <Sphere args={[0.8, 32, 32]}>
        <meshStandardMaterial 
          color="#a855f7" 
          emissive="#a855f7" // Makes the sphere glow
          emissiveIntensity={2} 
          toneMapped={false}
          roughness={2}
          metalness={1}
        />
      </Sphere>

      {/* Multiple orbiting rings with your new settings */}
      <OrbitingRing count={50} radius={2.0} color="#c084fc" size={0.04} rotationSpeed={0.7} tilt={[0, 0, 0]} />
      <OrbitingRing count={70} radius={2.8} color="#8b5cf6" size={0.03} rotationSpeed={-0.5} tilt={[Math.PI / 4, 0, 0]} />
      <OrbitingRing count={100} radius={3.6} color="#6d28d9" size={0.025} rotationSpeed={0.2} tilt={[Math.PI / 2, Math.PI / 4, 0]} />
    </group>
  );
};

// This is the main component that renders the Canvas
export default function AIBrain() {
  return (
    // Using h-[30rem] which is equivalent to h-120
    <div className="w-full h-[30rem] rounded-lg cursor-grab active:cursor-grabbing">
      {/* Camera position is moved back to accommodate the larger model */}
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
        <Scene />
      </Canvas>
    </div>
  );
}
