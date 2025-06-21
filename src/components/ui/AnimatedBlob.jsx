import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

const Blob = () => {
  const mesh = useRef();
  useFrame(() => {
    mesh.current.rotation.x += 0.005;
    mesh.current.rotation.y += 0.007;
    mesh.current.rotation.z += 0.005;
  });

  return (
    <Sphere args={[1, 100, 200]} scale={2}>
      <MeshDistortMaterial
        ref={mesh}
        color="#00FFFF"
        attach="material"
        distort={0.5} // How much the sphere is distorted
        speed={2} // Speed of the distortion
        roughness={0.1}
      />
    </Sphere>
  );
};

const AnimatedBlob = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }} className="absolute inset-0">
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Blob />
    </Canvas>
  );
};

export default AnimatedBlob; 