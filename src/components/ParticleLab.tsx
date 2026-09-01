"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useReducedMotion } from "framer-motion";
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
  // Trimmed down from the initial 2500/5000/9000: this scene's per-particle
  // CPU loop plus Bloom's extra render passes run at the same time the
  // always-on Background3D canvas is compositing behind it, so scrolling
  // through this section was the single heaviest moment on the page.
  const [count] = useState(() =>
    window.innerWidth < 640 ? 1800 : window.innerWidth < 1024 ? 3500 : 6000
  );
  const [active, setActive] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Two independent gates — scrolled into view, and the tab not
    // backgrounded — combined into one `active` flag. Tracking both as
    // refs (rather than deriving from two separate state variables) means
    // either listener can flip the combined flag without going stale
    // relative to the other signal.
    let isIntersecting = true;
    let isTabVisible = document.visibilityState === "visible";
    const updateActive = () => setActive(isIntersecting && isTabVisible);

    const io = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        updateActive();
      },
      { threshold: 0.1 }
    );
    io.observe(el);

    const handleVisibility = () => {
      isTabVisible = document.visibilityState === "visible";
      updateActive();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

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
          // A single finger must still scroll the page over this canvas —
          // only two-finger drag orbits on touch. (Mouse drag is untouched;
          // this only affects the `touches` gesture map.)
          touches={{ ONE: undefined, TWO: THREE.TOUCH.ROTATE }}
        />
        <EffectComposer>
          <Bloom luminanceThreshold={0.15} luminanceSmoothing={0.9} intensity={1.3} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
