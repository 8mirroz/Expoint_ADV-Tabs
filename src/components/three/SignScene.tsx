"use client";

import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  ContactShadows, 
  Environment, 
  Text3D, 
  Center,
  Float,
  PresentationControls
} from '@react-three/drei';
import { useCalculatorStore } from '@/store/useCalculatorStore';
import { SIGN_MATERIALS } from '@/data/materials';

function SignText() {
  const store = useCalculatorStore();
  
  const material = useMemo(() => {
    return SIGN_MATERIALS.find(m => m.id === store.materialId) || SIGN_MATERIALS[0];
  }, [store.materialId]);

  // For 3D text we need a font file. In a real project we'd use a local .json font.
  // Since I can't guarantee font paths, I'll use a standard Drei Text for now 
  // or a basic Box/Mesh if Text3D fails. 
  // Actually, let's use a simpler Text component from Drei which is more robust for demo.
  
  return (
    <Center top>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Suspense fallback={<mesh><boxGeometry args={[2, 1, 0.2]} /><meshStandardMaterial color={store.faceColor} wireframe /></mesh>}>
          <Text3D
            font="/fonts/helvetiker_bold.typeface.json"
            size={0.75}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
            castShadow
            receiveShadow
          >
            {store.text || "EXPOINT"}
            <meshStandardMaterial 
              color={store.faceColor}
              metalness={material.physicalProperties.metalness}
              roughness={material.physicalProperties.roughness}
              emissive={store.lightingId !== 'none' ? store.faceColor : '#000000'}
              emissiveIntensity={store.lightingId !== 'none' ? 1.5 : 0}
            />
          </Text3D>
        </Suspense>
        
        {/* Halo effect */}
        {store.lightingId === 'halo' && (
          <mesh position={[0, 0, -0.05]}>
            <Text3D
              font="/fonts/helvetiker_bold.typeface.json"
              size={0.75}
              height={0.05}
              curveSegments={12}
              scale={[1.05, 1.05, 1]}
            >
              {store.text || "EXPOINT"}
              <meshStandardMaterial 
                color={store.faceColor}
                transparent
                opacity={0.3}
                emissive={store.faceColor}
                emissiveIntensity={2}
              />
            </Text3D>
          </mesh>
        )}
      </Float>
    </Center>
  );
}

export default function SignScene() {
  return (
    <div className="w-full h-full min-h-[300px]">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 35 }}>
        <color attach="background" args={['#020617']} />
        
        <PresentationControls
          global
          snap
          speed={1.5}
          damping={0.2}
          rotation={[0, 0.3, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
        >
          <Suspense fallback={null}>
            <SignText />
            <Environment preset="city" />
            <ContactShadows 
              position={[0, -0.8, 0]} 
              opacity={0.4} 
              scale={10} 
              blur={2} 
              far={0.8} 
            />
          </Suspense>
        </PresentationControls>

        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={2048} castShadow />
      </Canvas>
    </div>
  );
}
