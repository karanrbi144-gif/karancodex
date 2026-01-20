import { Canvas } from "@react-three/fiber";
import { Environment, ScrollControls, Scroll, useScroll } from "@react-three/drei";
import { Suspense } from "react";
import { HeroOrb } from "./3d/HeroOrb";
import { Particles } from "./3d/Particles";
import { FloatingTech } from "./3d/FloatingTech";

// This component handles the camera movement based on scroll
function SceneContent() {
  const scroll = useScroll();
  
  // We can add logic here to move camera based on scroll.offset (0 to 1)
  // For now, we'll keep the camera static and let the content scroll over it
  // or add subtle parallax.
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <spotLight position={[-10, -10, -5]} intensity={2} color="#7c3aed" />
      
      {/* Background Atmosphere */}
      <Particles />
      
      {/* Hero Object - Center */}
      <group position={[0, 0, -2]}>
        <HeroOrb />
      </group>

      {/* Decorative tech elements positioned for other sections */}
      <group position={[0, -5, -3]}>
         <FloatingTech />
      </group>
      
      {/* Environment for reflections */}
      <Environment preset="city" />
    </>
  );
}

export function Scene() {
  return (
    <div id="canvas-container">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Suspense fallback={null}>
          <ScrollControls pages={5} damping={0.2}>
             <SceneContent />
             {/* Note: We are managing HTML scroll externally via standard CSS 
                 to have better control over layout, so we might not use <Scroll html> 
                 here if we want a standard long page. 
                 
                 However, to truly integrate, let's keep the canvas as a background
                 and just use the visual components.
              */}
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
