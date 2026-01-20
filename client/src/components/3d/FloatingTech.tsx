import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Icosahedron, MeshWobbleMaterial, Torus } from "@react-three/drei";
import * as THREE from "three";

export function FloatingTech() {
  const groupRef = useRef<THREE.Group>(null);
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.1;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.5;
      torusRef.current.rotation.y = t * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[2, -1, 0]}>
      {/* Central Geometric Core */}
      <Icosahedron args={[1, 0]} scale={0.8} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#06b6d4" 
          wireframe 
          transparent 
          opacity={0.3} 
        />
      </Icosahedron>

      {/* Outer Ring */}
      <Torus ref={torusRef} args={[1.5, 0.02, 16, 100]}>
        <meshBasicMaterial color="#d946ef" /> {/* Pink accent */}
      </Torus>
      
      {/* Floating small cubes */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh 
          key={i}
          position={[
            Math.sin(i * 1.5) * 2,
            Math.cos(i * 1.5) * 2,
            Math.sin(i * 2) * 1
          ]}
        >
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial color="white" emissive="white" emissiveIntensity={1} />
        </mesh>
      ))}
    </group>
  );
}
