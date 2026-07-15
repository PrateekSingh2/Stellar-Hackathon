import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import type { Group } from "three";

/**
 * AnimatedStars
 * -------------
 * Must live INSIDE <Canvas> so it has access to the R3F render loop.
 * We wrap <Stars> in a <group> ref so we can mutate rotation every frame
 * without triggering any React re-renders — pure imperative Three.js.
 *
 * delta (seconds since last frame) keeps rotation speed frame-rate independent:
 * identical at 30 fps, 60 fps, or 144 fps.
 */
function AnimatedStars() {
  const groupRef = useRef<Group>(null!);

  useFrame((_state, delta) => {
    groupRef.current.rotation.x += delta * 0.010; // gentle tilt drift
    groupRef.current.rotation.y += delta * 0.007; // slow yaw
    groupRef.current.rotation.z += delta * 0.003; // barely-perceptible roll
  });

  return (
    <group ref={groupRef}>
      <Stars
        radius={120}    // radius of the sphere stars are scattered in
        depth={50}      // depth of field — matches requirement
        count={5000}    // total star count — matches requirement
        factor={4}      // point-size scale — matches requirement
        saturation={0}  // pure white/grey stars → most ethereal
        fade            // stars fade toward the edge of the sphere
        speed={0.5}     // built-in ambient twinkle drift (kept subtle)
      />
    </group>
  );
}

/**
 * CosmicBackground
 * ----------------
 * Renders a full-screen, fixed Three.js canvas behind all other content.
 *
 * Layering:
 *   z-index -10  →  this canvas   (bottom-most)
 *   z-index  0   →  gradient overlays
 *   z-index 10+  →  Tailwind UI components
 *
 * Responsiveness:
 *   The wrapping div uses `inset: 0` (fixed) + `width/height: 100%`.
 *   R3F's <Canvas> internally attaches a ResizeObserver to its container,
 *   so it reacts to any viewport change automatically — no manual listener needed.
 *
 * Pointer events:
 *   `pointerEvents: none` lets all clicks/taps fall through to the UI above.
 */
export default function CosmicBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -10,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <Canvas
        gl={{ antialias: true, alpha: false }}
        camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 1] }}
        dpr={[1, 2]} // respect device pixel ratio; cap at 2× for perf
        style={{
          width: "100%",
          height: "100%",
          background: "#00000f", // near-black with a hint of deep blue
        }}
      >
        {/*
          Ambient light isn't needed by Stars (self-illuminated points),
          but having one makes it trivial to add other mesh objects later
          without them rendering pitch-black.
        */}
        <ambientLight intensity={0.1} />
        <AnimatedStars />
      </Canvas>
    </div>
  );
}
