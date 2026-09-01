"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_PALETTE = ["#00f3ff", "#8b5cf6", "#ffaa00"];

// Kept outside the component on purpose: it's the one place Math.random is
// actually reached for, and it needs to run exactly once per `count` rather
// than be treated as part of the component's (pure) render output.
function buildParticleGeometry(count: number) {
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const palette = PARTICLE_PALETTE.map((hex) => new THREE.Color(hex));

  for (let i = 0; i < count; i++) {
    // Scatter through a flattened, backward-pushed ellipsoid so the field
    // reads as atmosphere behind the content rather than a sphere in front of it.
    const radius = 3.5 + Math.random() * 4.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.55;
    positions[i * 3 + 2] = radius * Math.cos(phi) * 0.6 - 2.5;

    const color = palette[i % palette.length];
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  return geo;
}

function ParticleField({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const geometry = useMemo(() => buildParticleGeometry(count), [count]);

  // geometry is created outside JSX (not by R3F), so it's on us to dispose it.
  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function WireframeShape() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.035;
    ref.current.rotation.y += delta * 0.05;
  });

  return (
    <mesh ref={ref} position={[2.4, -0.8, -3.5]} scale={2.1}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.14} />
    </mesh>
  );
}

function Scene({ count }: { count: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const scrollVelocity = useRef(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handlePointerMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const handleScroll = () => {
      const y = window.scrollY;
      // Clamp so a fast fling doesn't fling the scene with it.
      scrollVelocity.current = Math.max(-40, Math.min(40, y - lastScrollY.current));
      lastScrollY.current = y;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;

    // Ease the whole field toward a gentle tilt following the pointer.
    group.rotation.y += (pointer.current.x * 0.15 - group.rotation.y) * 0.04;
    group.rotation.x += (-pointer.current.y * 0.1 - group.rotation.x) * 0.04;

    // Scroll speed adds a bit of extra spin that decays back to nothing.
    group.rotation.z += scrollVelocity.current * 0.00025;
    scrollVelocity.current *= 0.9;
  });

  return (
    <group ref={groupRef}>
      <ParticleField count={count} />
      <WireframeShape />
    </group>
  );
}

export default function Background3D() {
  const [frameloop, setFrameloop] = useState<"always" | "never">("always");
  const [count] = useState(() =>
    window.innerWidth < 640 ? 70 : window.innerWidth < 1024 ? 150 : 240
  );

  useEffect(() => {
    // Stop the render loop entirely while the tab is backgrounded — no
    // point spending GPU/battery on a background nobody's looking at.
    const handleVisibility = () => {
      setFrameloop(document.visibilityState === "visible" ? "always" : "never");
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1]" aria-hidden="true">
      <Canvas
        dpr={[1, window.innerWidth < 768 ? 1 : 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 6], fov: 50 }}
        frameloop={frameloop}
      >
        <Scene count={count} />
      </Canvas>
    </div>
  );
}
