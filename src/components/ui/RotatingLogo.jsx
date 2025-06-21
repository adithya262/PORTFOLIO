import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { TorusKnot } from '@react-three/drei';

const RotatingLogo = () => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <TorusKnot args={[1, 0.4, 128, 16]} ref={meshRef}>
      <meshStandardMaterial attach="material" color="#00FFFF" emissive="#00FFFF" emissiveIntensity={0.5} />
    </TorusKnot>
  );
};

const LogoCanvas = () => (
  <Canvas camera={{ position: [0, 0, 4] }}>
    <ambientLight intensity={0.5} />
    <pointLight position={[10, 10, 10]} />
    <RotatingLogo />
  </Canvas>
);

export default LogoCanvas; 