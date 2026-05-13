"use client";

import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, Environment, Float, Text3D } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

type SceneLabelProps = {
  text: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  size: number;
  height: number;
  color: string;
  emissive?: string;
  emissiveIntensity?: number;
};

function SceneLabel({
  text,
  position,
  rotation = [0, 0, 0],
  size,
  height,
  color,
  emissive = '#000000',
  emissiveIntensity = 0,
}: SceneLabelProps) {
  return (
    <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.55}>
      <mesh position={position} rotation={rotation} castShadow receiveShadow>
        <Text3D
          font="/fonts/helvetiker_bold.typeface.json"
          size={size}
          height={height}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.03}
          bevelSize={0.018}
          bevelOffset={0}
          bevelSegments={4}
        >
          {text}
          <meshStandardMaterial
            color={color}
            metalness={0.78}
            roughness={0.22}
            emissive={emissive}
            emissiveIntensity={emissiveIntensity}
          />
        </Text3D>
      </mesh>
    </Float>
  );
}

function OrbitingDigits() {
  const orbitRef = useRef<THREE.Group>(null);
  const digitRefs = useRef<Array<THREE.Group | null>>([]);

  useFrame((state) => {
    if (!orbitRef.current) return;

    const t = state.clock.getElapsedTime();
    orbitRef.current.rotation.y = t * 0.18;
    orbitRef.current.rotation.x = Math.sin(t * 0.24) * 0.08;
    orbitRef.current.position.x = Math.sin(t * 0.22) * 0.12;

    digitRefs.current.forEach((node, index) => {
      if (!node) return;
      node.position.y += Math.sin(t * (0.9 + index * 0.17) + index) * 0.0018;
      node.rotation.z = Math.sin(t * (0.55 + index * 0.11)) * 0.14;
      node.rotation.x = Math.cos(t * (0.46 + index * 0.09)) * 0.08;
    });
  });

  return (
    <group ref={orbitRef}>
      {[
        {
          text: '24',
          position: [-2.7, 1.85, -1.4] as [number, number, number],
          rotation: [0.12, -0.4, -0.2] as [number, number, number],
          size: 0.38,
          height: 0.1,
          color: '#F8FAFC',
          emissive: '#FF4D00',
          emissiveIntensity: 0.45,
        },
        {
          text: '902',
          position: [2.35, 1.25, -0.8] as [number, number, number],
          rotation: [-0.1, 0.3, 0.18] as [number, number, number],
          size: 0.3,
          height: 0.08,
          color: '#CBD5E1',
          emissive: '#FF6A2B',
          emissiveIntensity: 0.3,
        },
        {
          text: '2Y',
          position: [2.45, -1.4, -1.3] as [number, number, number],
          rotation: [0.04, -0.34, -0.18] as [number, number, number],
          size: 0.34,
          height: 0.09,
          color: '#F8FAFC',
          emissive: '#FF4D00',
          emissiveIntensity: 0.38,
        },
        {
          text: '7',
          position: [-2.1, -1.55, -0.6] as [number, number, number],
          rotation: [-0.12, 0.32, 0.12] as [number, number, number],
          size: 0.46,
          height: 0.1,
          color: '#94A3B8',
        },
        {
          text: '45K',
          position: [0.85, -2.05, -2.2] as [number, number, number],
          rotation: [0.15, 0.12, -0.1] as [number, number, number],
          size: 0.24,
          height: 0.06,
          color: '#E2E8F0',
        },
      ].map((item, index) => (
        <group key={item.text} ref={(node) => { digitRefs.current[index] = node; }}>
          <SceneLabel {...item} />
        </group>
      ))}
    </group>
  );
}

function TechRings({ isDark }: { isDark: boolean }) {
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ringsRef.current) return;
    const t = state.clock.getElapsedTime();

    ringsRef.current.rotation.z = t * 0.08;
    ringsRef.current.rotation.y = Math.sin(t * 0.16) * 0.22;
  });

  return (
    <group ref={ringsRef} position={[0.9, 0.1, -1.8]}>
      <mesh rotation={[Math.PI / 2.2, 0.3, 0.15]}>
        <torusGeometry args={[2.75, 0.028, 20, 140]} />
        <meshStandardMaterial
          color={isDark ? '#ff6a2b' : '#d44a0d'}
          emissive={isDark ? '#ff6a2b' : '#ff8c42'}
          emissiveIntensity={isDark ? 1.15 : 0.45}
          metalness={0.85}
          roughness={0.18}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2.15, -0.5, -0.1]} scale={0.82}>
        <torusGeometry args={[2.75, 0.018, 18, 120]} />
        <meshStandardMaterial
          color={isDark ? '#7dd3fc' : '#94a3b8'}
          emissive={isDark ? '#38bdf8' : '#ffffff'}
          emissiveIntensity={isDark ? 0.55 : 0.15}
          metalness={0.8}
          roughness={0.24}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
}

function LightColumns({ isDark }: { isDark: boolean }) {
  const columnsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!columnsRef.current) return;
    const t = state.clock.getElapsedTime();
    columnsRef.current.position.y = Math.sin(t * 0.22) * 0.08;
  });

  return (
    <group ref={columnsRef} position={[0.6, -0.35, -2.6]}>
      {[-2.5, -1.1, 0.4, 1.8, 3.1].map((x, index) => (
        <mesh key={x} position={[x, -0.15 + index * 0.02, -0.2 * index]} rotation={[0, 0, index % 2 ? 0.06 : -0.04]}>
          <boxGeometry args={[0.08, 3.8 - index * 0.22, 0.08]} />
          <meshStandardMaterial
            color={isDark ? '#e2e8f0' : '#475569'}
            emissive={index % 2 ? '#ff5c1a' : '#38bdf8'}
            emissiveIntensity={isDark ? 0.32 : 0.08}
            metalness={0.92}
            roughness={0.18}
            transparent
            opacity={isDark ? 0.42 : 0.22}
          />
        </mesh>
      ))}
    </group>
  );
}

function HeroCameraRig() {
  useFrame((state) => {
    const targetX = state.pointer.x * 0.55;
    const targetY = state.pointer.y * 0.32;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.035);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.035);
    state.camera.lookAt(0.55, 0, 0);
  });

  return null;
}

function HeroSceneGeometry() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const rootRef = useRef<THREE.Group>(null);
  const rimMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#FF4D00',
        metalness: 0.45,
        roughness: 0.24,
        emissive: '#FF4D00',
        emissiveIntensity: isDark ? 1.15 : 0.8,
      }),
    [isDark]
  );

  useFrame((state) => {
    if (!rootRef.current) return;

    const t = state.clock.getElapsedTime();
    rootRef.current.rotation.y = Math.sin(t * 0.28) * 0.18;
    rootRef.current.rotation.x = Math.cos(t * 0.2) * 0.04;
    rootRef.current.position.y = Math.sin(t * 0.32) * 0.08;
  });

  return (
    <group ref={rootRef} position={[0.6, -0.1, 0]}>
      <TechRings isDark={isDark} />
      <LightColumns isDark={isDark} />

      <Center>
        <Float speed={1.35} rotationIntensity={0.22} floatIntensity={0.3}>
          <mesh position={[0, 0, -0.12]} castShadow receiveShadow>
            <Text3D
              font="/fonts/helvetiker_bold.typeface.json"
              size={1.1}
              height={0.44}
              curveSegments={12}
              bevelEnabled
              bevelThickness={0.045}
              bevelSize={0.025}
              bevelOffset={0}
              bevelSegments={5}
            >
              EX
              <primitive object={rimMaterial} attach="material" />
            </Text3D>
          </mesh>

          <mesh position={[-0.04, 0.02, -0.28]} castShadow receiveShadow>
            <Text3D
              font="/fonts/helvetiker_bold.typeface.json"
              size={1.12}
              height={0.09}
              curveSegments={10}
              bevelEnabled
              bevelThickness={0.018}
              bevelSize={0.012}
              bevelOffset={0}
              bevelSegments={3}
            >
              EX
              <meshStandardMaterial
                color={isDark ? '#f8fafc' : '#0f172a'}
                metalness={0.68}
                roughness={0.22}
                transparent
                opacity={0.2}
                emissive={isDark ? '#ffffff' : '#000000'}
                emissiveIntensity={isDark ? 0.08 : 0}
              />
            </Text3D>
          </mesh>

          <mesh position={[0.38, -0.15, 0.32]} rotation={[0, -0.2, 0]} castShadow receiveShadow>
            <Text3D
              font="/fonts/helvetiker_bold.typeface.json"
              size={1.1}
              height={0.36}
              curveSegments={12}
              bevelEnabled
              bevelThickness={0.04}
              bevelSize={0.024}
              bevelOffset={0}
              bevelSegments={5}
            >
              ADV
              <meshStandardMaterial
                color={isDark ? "#E2E8F0" : "#1A1A1A"}
                metalness={0.95}
                roughness={0.16}
                emissive={isDark ? "#FF5C1A" : "#000000"}
                emissiveIntensity={isDark ? 0.35 : 0}
              />
            </Text3D>
          </mesh>

          <mesh position={[0.52, -0.11, 0.12]} rotation={[0, -0.2, 0]} castShadow receiveShadow>
            <Text3D
              font="/fonts/helvetiker_bold.typeface.json"
              size={1.12}
              height={0.075}
              curveSegments={10}
              bevelEnabled
              bevelThickness={0.014}
              bevelSize={0.012}
              bevelOffset={0}
              bevelSegments={3}
            >
              ADV
              <meshStandardMaterial
                color={isDark ? '#ffffff' : '#0f172a'}
                metalness={0.74}
                roughness={0.18}
                transparent
                opacity={0.18}
                emissive={isDark ? '#ff8b55' : '#000000'}
                emissiveIntensity={isDark ? 0.12 : 0}
              />
            </Text3D>
          </mesh>
        </Float>
      </Center>

      <OrbitingDigits />
    </group>
  );
}

export default function HeroSignScene() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 7.2], fov: 32 }}
        gl={{ antialias: true, alpha: true }}
        className="pointer-events-auto"
      >
        <color attach="background" args={[isDark ? '#020617' : '#F8F8F8']} />

        <HeroCameraRig />
        <ambientLight intensity={isDark ? 0.65 : 1.2} />
        <directionalLight position={[-5, 8, 4]} intensity={isDark ? 1.15 : 2.0} color={isDark ? "#f8fafc" : "#ffffff"} />
        <spotLight position={[4, 6, 8]} angle={0.36} penumbra={1} intensity={isDark ? 115 : 250} color={isDark ? "#ff6a2b" : "#ffcca3"} />
        <spotLight position={[-6, -2, 6]} angle={0.28} penumbra={1} intensity={isDark ? 55 : 120} color={isDark ? "#60a5fa" : "#ffffff"} />

        <Suspense fallback={null}>
          <HeroSceneGeometry />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
