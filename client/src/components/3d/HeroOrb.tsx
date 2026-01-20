import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

export function HeroOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Rotate the orb
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      
      // Gentle floating movement
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.2;
    }
  });

  return (
    <Sphere args={[1, 64, 64]} ref={meshRef} scale={2}>
      <MeshDistortMaterial
        color="#7c3aed" // Primary purple
        attach="material"
        distort={0.4} // Strength, 0 disables the effect (default=1)
        speed={2} // Speed (default=1)
        roughness={0.2}
        metalness={0.9}
        emissive="#4c1d95"
        emissiveIntensity={0.2}
      />
    </Sphere>
  );
}
