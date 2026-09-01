// Shared control surface every preset below maps onto, so switching presets
// never means re-learning a new panel of knobs.
export type ParticleParams = {
  speed: number; // 0.1 – 2.5   overall motion rate
  concentration: number; // 0 – 1       how tightly particles cluster toward the core
  turbulence: number; // 0 – 2       chaos/noise injected into the motion
  spread: number; // 0.4 – 2      overall scale of the formation
};

export type ParticleSample = {
  x: number;
  y: number;
  z: number;
  h: number; // hue 0–1
  s: number; // saturation 0–1
  l: number; // lightness 0–1
};

export type ParticlePreset = {
  id: string;
  name: string;
  description: string;
  compute: (i: number, count: number, time: number, params: ParticleParams) => ParticleSample;
};

// Cheap deterministic pseudo-noise — smooth and per-particle-consistent
// (unlike Math.random(), which would flicker frame to frame), used to give
// "turbulence" an organic feel without a real noise library.
function noise(seed: number, t: number) {
  return Math.sin(seed * 12.9898 + t * 1.7) * Math.cos(seed * 78.233 - t * 1.3);
}

export const particlePresets: ParticlePreset[] = [
  {
    id: "accretion-disc",
    name: "Accretion Disc",
    description:
      "An orbiting disc and twin relativistic jets, warped inward by a gravity well at the center.",
    compute: (i, count, time, { speed, concentration, turbulence, spread }) => {
      const idRate = i / count;
      const pType = i % 4;
      const pull = 1 + concentration * 9;
      const discSize = 15 + spread * 35;
      const tSpin = time * (0.5 + speed * 2);

      let x = 0,
        y = 0,
        z = 0,
        h = 0,
        s = 1,
        l = 0.5;

      if (pType === 0) {
        const rIdx = idRate / 0.25;
        const rad = 1.5 + rIdx * 2;
        const angle = rIdx * 100 - tSpin * (10 / (rad + 0.1));
        x = Math.cos(angle) * rad;
        y = noise(i, time) * 0.1;
        z = Math.sin(angle) * rad;
        h = 0.02 + rIdx * 0.05;
        l = 0.1 / (rad + 0.1);
      } else if (pType === 1) {
        const rIdx = (idRate - 0.25) / 0.5;
        const ringRad = 4 + rIdx * discSize;
        const angle = rIdx * 40 - tSpin * (15 / (ringRad + 0.1));
        x = Math.cos(angle) * ringRad;
        y = Math.sin(angle * 2) * (2 / (ringRad + 0.1)) * Math.sin(time);
        z = Math.sin(angle) * ringRad;
        h = 0.04 + (1 - rIdx) * 0.12;
        l = 0.7 * (1 - rIdx);
      } else {
        const rIdx = (idRate - 0.75) / 0.25;
        const jetZ = 3 + rIdx * 40;
        const jetRad = 0.2 + rIdx * 4;
        const angle = rIdx * 20 + time * 8;
        const side = pType === 2 ? 1 : -1;
        x = Math.cos(angle) * jetRad;
        y = jetZ * side;
        z = Math.sin(angle) * jetRad;
        h = 0.55 + rIdx * 0.1;
        s = 0.9;
        l = 0.8 * (1 - rIdx);
      }

      const jitter = turbulence * 0.8;
      x += noise(i * 1.3, time) * jitter;
      y += noise(i * 2.1, time) * jitter;
      z += noise(i * 3.7, time) * jitter;

      const dist = Math.sqrt(x * x + y * y + z * z) + 0.001;
      const warp = 1 - Math.min(1, pull / dist);
      return { x: x * warp, y: y * warp, z: z * warp, h: ((h % 1) + 1) % 1, s, l: Math.max(0, Math.min(1, l)) };
    },
  },
  {
    id: "tesseract",
    name: "Tesseract",
    description:
      "A 16-vertex, 32-edge hypercube rotating through two 4D planes and projected down into 3D.",
    compute: (i, count, time, { speed, concentration, turbulence, spread }) => {
      const group = 32;
      const perGroup = Math.max(count / group, 1);
      const edgeSlot = Math.floor(i / perGroup) % group;
      const localT = (i % perGroup) / perGroup;

      const vA = Math.floor(edgeSlot / 4);
      const dim = edgeSlot % 4;
      const vB = vA ^ (1 << dim);

      const corner = (v: number) => [
        (v & 1) * 2 - 1,
        ((v >> 1) & 1) * 2 - 1,
        ((v >> 2) & 1) * 2 - 1,
        ((v >> 3) & 1) * 2 - 1,
      ];
      const [x0, y0, z0, w0] = corner(vA);
      const [x1, y1, z1, w1] = corner(vB);

      let x4 = x0 + (x1 - x0) * localT;
      let y4 = y0 + (y1 - y0) * localT;
      let z4 = z0 + (z1 - z0) * localT;
      let w4 = w0 + (w1 - w0) * localT;

      const jitter = turbulence * 0.12;
      x4 += noise(i * 1.1, time) * jitter;
      y4 += noise(i * 2.2, time) * jitter;
      z4 += noise(i * 3.3, time) * jitter;
      w4 += noise(i * 4.4, time) * jitter;

      const angleXW = time * (speed * 0.8);
      const cosXW = Math.cos(angleXW);
      const sinXW = Math.sin(angleXW);
      const x4r = x4 * cosXW - w4 * sinXW;
      const w4r = x4 * sinXW + w4 * cosXW;

      const angleYZ = time * speed * 0.56;
      const cosYZ = Math.cos(angleYZ);
      const sinYZ = Math.sin(angleYZ);
      const y4r = y4 * cosYZ - z4 * sinYZ;
      const z4r = y4 * sinYZ + z4 * cosYZ;

      // Higher concentration = the 4D→3D perspective compresses harder,
      // pulling the whole hypercube into a denser, more dramatic core.
      const depth = 10 - concentration * 7;
      const size = 20 + spread * 90;
      const wFactor = depth / (depth - w4r + 0.0001);

      const hue = (((w4r * 0.2 + time * 0.05) % 1) + 1) % 1;
      const light = Math.min(Math.max(0.35 + wFactor * 0.25, 0.2), 0.8);

      return {
        x: x4r * wFactor * size,
        y: y4r * wFactor * size,
        z: z4r * wFactor * size,
        h: hue,
        s: 0.85,
        l: light,
      };
    },
  },
  {
    id: "galaxy-spiral",
    name: "Galaxy Spiral",
    description:
      "A four-armed spiral galaxy with differential rotation — the core spins faster than the rim.",
    compute: (i, count, time, { speed, concentration, turbulence, spread }) => {
      const arms = 4;
      const armIdx = i % arms;
      const idRate = i / count;

      // Bias sampling toward the core as concentration rises.
      const bias = 1 / (1 + concentration * 2.5);
      const rNorm = Math.pow(idRate, bias);
      const maxR = 12 + spread * 28;
      const r = 0.8 + rNorm * maxR;

      const armOffset = (armIdx / arms) * Math.PI * 2;
      const windUp = Math.log(r + 1) * 2.4;
      const angularSpeed = (speed * 1.6) / (r * 0.12 + 0.5);
      const angle = armOffset + windUp + time * angularSpeed;

      const jitter = turbulence * 0.6;
      const rJit = r + noise(i * 1.7, time) * jitter;
      const thickness = (1.2 - rNorm * 0.6) * (0.4 + turbulence * 0.5);

      const x = Math.cos(angle) * rJit;
      const z = Math.sin(angle) * rJit;
      const y = noise(i * 5.2, time * 0.3) * thickness;

      const h = 0.58 - rNorm * 0.5; // hot violet/cyan core fading to warm amber rim
      const s = 0.75;
      const l = 0.75 - rNorm * 0.35;

      return { x, y, z, h: ((h % 1) + 1) % 1, s, l: Math.max(0.15, Math.min(0.9, l)) };
    },
  },
  {
    id: "dna-helix",
    name: "DNA Helix",
    description:
      "Two intertwined strands with connecting rungs, slowly rotating and drifting along their axis.",
    compute: (i, count, time, { speed, concentration, turbulence, spread }) => {
      const rungCount = Math.max(Math.floor(count / 24), 8);
      const rungSize = 24;
      const rungIdx = Math.floor(i / rungSize) % rungCount;
      const slot = i % rungSize;

      const length = 40 + spread * 40;
      const radius = 4 + spread * 4;
      // Higher concentration = more turns packed into the same length.
      const turnsPerUnit = 0.05 + concentration * 0.12;

      const along = (rungIdx / rungCount) * length - length / 2 + ((time * speed * 4) % (length / rungCount));
      const twist = along * turnsPerUnit * Math.PI * 2;

      const y = along;
      let x = 0,
        z = 0,
        h = 0.5,
        s = 0.7,
        l = 0.6;

      if (slot < 10) {
        // strand A
        const a = twist;
        x = Math.cos(a) * radius;
        z = Math.sin(a) * radius;
        h = 0.5;
      } else if (slot < 20) {
        // strand B, opposite phase
        const a = twist + Math.PI;
        x = Math.cos(a) * radius;
        z = Math.sin(a) * radius;
        h = 0.86;
      } else {
        // base-pair rungs bridging the two strands
        const bridgeT = (slot - 20) / 4;
        const a1 = twist;
        const a2 = twist + Math.PI;
        x = Math.cos(a1) * radius + (Math.cos(a2) * radius - Math.cos(a1) * radius) * bridgeT;
        z = Math.sin(a1) * radius + (Math.sin(a2) * radius - Math.sin(a1) * radius) * bridgeT;
        h = 0.12;
        s = 0.9;
        l = 0.65;
      }

      const jitter = turbulence * 0.9;
      x += noise(i * 2.3, time) * jitter;
      z += noise(i * 3.1, time) * jitter;

      return { x, y: y * 0.5, z, h, s, l };
    },
  },
  {
    id: "vortex-storm",
    name: "Vortex Storm",
    description:
      "Particles spiral through a narrowing funnel — a literal storm for the turbulence control.",
    compute: (i, count, time, { speed, concentration, turbulence, spread }) => {
      const idRate = i / count;
      const height = 50 + spread * 30;
      // Higher concentration = a tighter, denser funnel throat.
      const funnelTightness = 0.3 + concentration * 1.4;

      const along = ((idRate * height + time * speed * 12) % height) - height / 2;
      const heightNorm = (along + height / 2) / height;
      const radius = (0.6 + heightNorm * 5) / funnelTightness + noise(i, time * 0.5) * turbulence * 2;

      const angle = i * 0.618 + time * speed * (3 - heightNorm * 2) + noise(i * 4.1, time) * turbulence;

      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = along;

      const h = 0.55 + heightNorm * 0.15;
      const l = 0.35 + (1 - heightNorm) * 0.4;

      return { x, y: y * 0.6, z, h, s: 0.8, l: Math.max(0.15, Math.min(0.85, l)) };
    },
  },
];
