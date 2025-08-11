'use client';

import { useState, useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { Color, BufferAttribute } from 'three';
import * as THREE from 'three'; // Import THREE

const Stars = (props: any) => {
  // Specify the type for the ref
  const ref = useRef<THREE.Points>(null);
  const [sphere] = useState(() => random.inSphere(new Float32Array(5001), { radius: 1.2 }));

  useEffect(() => {
    if (ref.current) {
      const colors = new Float32Array(sphere.length);
      const color = new Color();

      for (let i = 0; i < sphere.length; i += 3) {
        if (Math.random() > 0.80) {
          color.set('#a855f7');
        } else {
          color.set('#ffffff');
        }
        colors.set([color.r, color.g, color.b], i);
      }
      
      ref.current.geometry.setAttribute('color', new BufferAttribute(colors, 3));
    }
  }, [sphere]);

  useFrame((state, delta) => {
    if (ref.current && ref.current.rotation) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          vertexColors 
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const ParticleBackground = () => {
    return (
      <div className="w-full h-full absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
            <Suspense fallback={null}>
                <Stars />
            </Suspense>
        </Canvas>
      </div>
    );
};

export default ParticleBackground;
