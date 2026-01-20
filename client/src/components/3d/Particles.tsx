import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";

export function Particles(props: any) {
  const ref = useRef<THREE.Points>(null);
  // Generate random positions in a sphere
  const sphere = random.inSphere(new Float32Array(5000), { radius: 10 }) as Float32Array;

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#06b6d4" // Secondary Cyan
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}
