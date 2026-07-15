import { useMemo, useEffect, useState } from "react";

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  angle: number;
  delay: number;
  active: boolean;
}

/**
 * Cosmic ambient background v2 — layered void, aurora bands, dense stars,
 * gold motes, shooting stars, nebula clouds, conic light ray.
 */
export function AmbientBackground({ intensity = 1 }: { intensity?: number }) {
  const stars = useMemo(() =>
    Array.from({ length: 130 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      s: Math.random() * 2 + 0.3,
      d: Math.random() * 6,
      dur: 2 + Math.random() * 5,
      bright: Math.random() > 0.85,
    })), []);

  const motes = useMemo(() =>
    Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      d: Math.random() * 8,
      dur: 8 + Math.random() * 12,
      rev: i % 3 === 0,
      size: Math.random() * 4 + 2,
    })), []);

  const nebulae = useMemo(() =>
    Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      x: [20, 80, 50, 10, 90][i],
      y: [30, 70, 15, 60, 40][i],
      rx: 30 + Math.random() * 20,
      ry: 20 + Math.random() * 15,
      hue: [260, 40, 280, 220, 50][i],
      chroma: [0.09, 0.11, 0.07, 0.10, 0.10][i],
      opacity: 0.18 + Math.random() * 0.14,
    })), []);

  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);

  useEffect(() => {
    let id = 0;
    const fire = () => {
      const star: ShootingStar = {
        id: id++,
        x: Math.random() * 70,
        y: Math.random() * 50,
        angle: 20 + Math.random() * 30,
        delay: 0,
        active: true,
      };
      setShootingStars(prev => [...prev.slice(-3), star]);
    };
    fire();
    const interval = setInterval(fire, 4500 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden" style={{ opacity: intensity }}>

      {/* Deep void base */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 120% 80% at 50% 0%, oklch(0.18 0.06 265 / 0.7), transparent 60%)",
      }} />

      {/* Nebulae */}
      {nebulae.map(n => (
        <div key={n.id} className="absolute rounded-full animate-drift-vert mix-blend-screen pointer-events-none"
          style={{
            left: `${n.x}%`, top: `${n.y}%`,
            width: `${n.rx * 2}vw`, height: `${n.ry * 2}vh`,
            transform: "translate(-50%,-50%)",
            background: `radial-gradient(ellipse at center, oklch(${0.55 + n.id * 0.03} ${n.chroma} ${n.hue} / ${n.opacity}), transparent 70%)`,
            animationDuration: `${22 + n.id * 4}s`,
            animationDelay: `${n.id * 2.2}s`,
          }}
        />
      ))}

      {/* Stars */}
      {stars.map(s => (
        <span key={s.id}
          className="absolute rounded-full animate-twinkle"
          style={{
            left: `${s.x}%`, top: `${s.y}%`,
            width: s.s, height: s.s,
            background: s.bright ? "oklch(0.95 0.06 82)" : "oklch(0.88 0.02 90)",
            animationDelay: `${s.d}s`,
            animationDuration: `${s.dur}s`,
            boxShadow: s.bright
              ? `0 0 ${s.s * 5}px oklch(0.7 0.14 240), 0 0 ${s.s * 12}px oklch(0.7 0.14 240 / 0.5)`
              : `0 0 ${s.s * 3}px oklch(0.88 0.02 90 / 0.5)`,
          }}
        />
      ))}

      {/* Digital data motes */}
      {motes.map(m => (
        <span key={m.id}
          className={m.rev ? "absolute rounded-none animate-float-rev" : "absolute rounded-none animate-float"}
          style={{
            left: `${m.x}%`, top: `${m.y}%`,
            width: m.size, height: m.size,
            animationDelay: `${m.d}s`,
            animationDuration: `${m.dur}s`,
            background: m.id % 4 === 0
              ? "oklch(0.70 0.14 240)"
              : "oklch(0.85 0.14 82)",
            boxShadow: m.id % 4 === 0
              ? "0 0 14px oklch(0.70 0.14 240 / 0.7)"
              : "0 0 14px oklch(0.85 0.14 82 / 0.8)",
            opacity: 0.7,
          }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map(s => (
        <div key={s.id}
          className="absolute animate-shooting-star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            height: "1px",
            transform: `rotate(${s.angle}deg)`,
            transformOrigin: "left center",
            background: "linear-gradient(90deg, transparent, oklch(0.95 0.1 82), oklch(0.9 0.08 82 / 0.6), transparent)",
            boxShadow: "0 0 6px oklch(0.82 0.15 82 / 0.6)",
          }}
        />
      ))}

      {/* Drifting aurora fog */}
      <div className="absolute inset-0 animate-drift opacity-25 mix-blend-screen"
        style={{ background: "radial-gradient(ellipse at 30% 40%, oklch(0.65 0.06 240 / 0.18), transparent 50%), radial-gradient(ellipse at 70% 60%, oklch(0.82 0.15 82 / 0.10), transparent 55%)" }}
      />
      <div className="absolute inset-0 animate-drift-vert opacity-20 mix-blend-screen"
        style={{
          background: "linear-gradient(180deg, transparent 0%, oklch(0.60 0.08 260 / 0.12) 40%, oklch(0.82 0.12 82 / 0.08) 60%, transparent 100%)",
          animationDuration: "30s",
        }}
      />

      {/* Conic light ray */}
      <div className="absolute -top-1/2 left-1/2 w-[200vw] h-[200vh] -translate-x-1/2 opacity-[0.065]"
        style={{ background: "conic-gradient(from 200deg, transparent 0deg, oklch(0.88 0.14 82) 18deg, transparent 38deg, transparent 360deg)" }}
      />

      {/* Secondary faint ray */}
      <div className="absolute -top-1/2 left-1/2 w-[200vw] h-[200vh] -translate-x-1/2 opacity-[0.03]"
        style={{ background: "conic-gradient(from 60deg, transparent 0deg, oklch(0.70 0.14 240) 22deg, transparent 42deg, transparent 360deg)" }}
      />

      {/* Vignette */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 45%, oklch(0.04 0.01 265 / 0.85) 100%)" }} />

      {/* Bottom horizon glow */}
      <div className="absolute bottom-0 inset-x-0 h-64" style={{ background: "linear-gradient(0deg, oklch(0.08 0.03 265) 0%, transparent 100%)" }} />
    </div>
  );
}
