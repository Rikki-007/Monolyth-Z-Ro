"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { particlePresets, type ParticleParams } from "@/lib/particlePresets";

// Outside the component so the initial random scatter isn't treated as
// part of a (pure) render — see the same fix in Background3D.tsx.
function randomScatter(count: number) {
  return Array.from(
    { length: count },
    () =>
      new THREE.Vector3(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60
      )
  );
}

function Swarm({
  presetId,
  params,
  count,
}: {
  presetId: string;
  params: ParticleParams;
  count: number;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);
  const target = useMemo(() => new THREE.Vector3(), []);

  // Persists across preset switches so the swarm eases from one formation
  // into the next instead of snapping.
  const positions = useMemo(() => randomScatter(count), [count]);

  const activePreset = useMemo(
    () => particlePresets.find((p) => p.id === presetId) ?? particlePresets[0],
    [presetId]
  );

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const sample = activePreset.compute(i, count, time, params);
      target.set(sample.x, sample.y, sample.z);
      positions[i].lerp(target, 0.12);
      dummy.position.copy(positions[i]);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      color.setHSL(sample.h, sample.s, sample.l);
      mesh.setColorAt(i, color);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <tetrahedronGeometry args={[0.35]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
}

export default function ParticleLab({
  presetId,
  params,
}: {
  presetId: string;
  params: ParticleParams;
}) {
  const [count] = useState(() =>
    window.innerWidth < 640 ? 2500 : window.innerWidth < 1024 ? 5000 : 9000
  );
  const [active, setActive] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      threshold: 0.1,
    });
    io.observe(el);

    const handleVisibility = () => {
      if (document.visibilityState !== "visible") setActive(false);
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div ref={containerRef} className="h-full w-full">
      <Canvas
        dpr={[1, window.innerWidth < 768 ? 1 : 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 8, 80], fov: 55 }}
        frameloop={active ? "always" : "never"}
      >
        <Swarm presetId={presetId} params={params} count={count} />
        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.08}
          enableZoom={false}
          enablePan={false}
          autoRotate={!prefersReducedMotion}
          autoRotateSpeed={0.4}
        />
        <EffectComposer>
          <Bloom luminanceThreshold={0.15} luminanceSmoothing={0.9} intensity={1.3} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
