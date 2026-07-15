import { useMemo } from "react";

/**
 * Cosmic ambient background: layered gradient, drifting fog,
 * twinkling stars, floating gold particles, slow light ray.
 */
export function AmbientBackground({ intensity = 1 }: { intensity?: number }) {
  const stars = useMemo(() => Array.from({ length: 80 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    s: Math.random() * 1.6 + 0.4,
    d: Math.random() * 4,
    dur: 2 + Math.random() * 4,
  })), []);
  const motes = useMemo(() => Array.from({ length: 18 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    d: Math.random() * 6,
    dur: 8 + Math.random() * 10,
  })), []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden" style={{ opacity: intensity }}>
      {/* Void gradient handled by body. Add nebulae. */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(circle at 20% 30%, oklch(0.32 0.09 260 / 0.35), transparent 55%), radial-gradient(circle at 80% 70%, oklch(0.35 0.11 40 / 0.18), transparent 55%)",
      }} />
      {/* Stars */}
      {stars.map(s => (
        <span key={s.id} className="absolute rounded-full bg-parchment animate-twinkle"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animationDelay: `${s.d}s`, animationDuration: `${s.dur}s`, boxShadow: `0 0 ${s.s * 4}px oklch(0.9 0.05 82)` }} />
      ))}
      {/* Gold motes */}
      {motes.map(m => (
        <span key={m.id} className="absolute w-1.5 h-1.5 rounded-full animate-float"
          style={{ left: `${m.x}%`, top: `${m.y}%`, animationDelay: `${m.d}s`, animationDuration: `${m.dur}s`, background: "oklch(0.85 0.14 82)", boxShadow: "0 0 12px oklch(0.85 0.14 82 / 0.8)" }} />
      ))}
      {/* Drifting fog */}
      <div className="absolute inset-0 animate-drift opacity-30 mix-blend-screen"
        style={{ background: "radial-gradient(ellipse at 30% 40%, oklch(0.7 0.05 240 / 0.15), transparent 50%), radial-gradient(ellipse at 70% 60%, oklch(0.82 0.15 82 / 0.08), transparent 55%)" }} />
      {/* Light ray */}
      <div className="absolute -top-1/2 left-1/2 w-[200vw] h-[200vh] -translate-x-1/2 opacity-[0.06]"
        style={{ background: "conic-gradient(from 200deg, transparent 0deg, oklch(0.85 0.14 82) 20deg, transparent 40deg, transparent 360deg)" }} />
      {/* Vignette */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 55%, oklch(0.05 0.01 265 / 0.75) 100%)" }} />
    </div>
  );
}
