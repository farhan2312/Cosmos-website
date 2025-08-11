'use client';

import { useState, useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { Color, BufferAttribute } from 'three';
import { useTheme } from '@/contexts/ThemeContext'; // Import the useTheme hook

const Stars = (props: any) => {
  const ref: any = useRef(null);
  // Get the current theme from our global context
  const { theme } = useTheme(); 
  const [sphere] = useState(() => random.inSphere(new Float32Array(5001), { radius: 1.2 }));

  // This effect now re-runs whenever the theme changes
  useEffect(() => {
    if (ref.current) {
      const colors = new Float32Array(sphere.length);
      const color = new Color();

      for (let i = 0; i < sphere.length; i += 3) {
        if (theme === 'dark') {
          // Dark Mode: White stars with a darker purple
          if (Math.random() > 0.80) {
            color.set('#7e22ce'); // Darker Purple
          } else {
            color.set('#ffffff'); // White
          }
        } else {
          // Light Mode: Black stars with a standard purple
          if (Math.random() > 0.05) {
            color.set('#7e22ce'); // Standard Purple
          } else {
            color.set('#171717'); // Black
          }
        }
        colors.set([color.r, color.g, color.b], i);
      }
      
      ref.current.geometry.setAttribute('color', new BufferAttribute(colors, 3));
    }
  // Add 'theme' to the dependency array so this effect re-runs on theme change
  }, [sphere, theme]); 

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
          size={0.007}
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