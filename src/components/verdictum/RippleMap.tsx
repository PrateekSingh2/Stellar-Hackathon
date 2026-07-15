import { motion } from "framer-motion";
import { useState } from "react";
import { rippleNodes, rippleEdges } from "@/lib/mock-data";

export function RippleMap() {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <div className="relative w-full aspect-[16/10] panel-glass rounded-lg overflow-hidden">
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 50%, oklch(0.82 0.15 82 / 0.08), transparent 70%)" }} />
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        {rippleEdges.map((e, i) => {
          const a = rippleNodes.find(n => n.id === e.from)!;
          const b = rippleNodes.find(n => n.id === e.to)!;
          return (
            <motion.line key={i}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke="oklch(0.82 0.15 82)" strokeWidth={0.15} strokeDasharray="0.6 0.4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.8 }}
              style={{ filter: "drop-shadow(0 0 1px oklch(0.82 0.15 82 / 0.8))" }}
            />
          );
        })}
      </svg>
      {rippleNodes.map((n, i) => (
        <motion.button key={n.id}
          initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 + i * 0.08 }}
          onMouseEnter={() => setHover(n.id)} onMouseLeave={() => setHover(null)}
          className="absolute -translate-x-1/2 -translate-y-1/2 group"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <span className={`block rounded-full ${n.kind === "origin" ? "w-6 h-6 bg-gradient-gold shadow-gold animate-pulse-gold" : "w-3 h-3 bg-parchment/80"} border border-gold/60`}
            style={{ boxShadow: `0 0 ${n.kind === "origin" ? 24 : 10}px oklch(0.82 0.15 82 / ${n.kind === "origin" ? 0.8 : 0.5})` }} />
          <span className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-serif tracking-wider px-2 py-1 rounded transition pointer-events-none ${n.y >= 80 ? "bottom-full mb-2" : "top-full mt-2"} ${hover === n.id ? "bg-background/90 text-gold border border-gold/40" : "text-parchment/70"}`}>
            {n.label}
          </span>
        </motion.button>
      ))}
      <div className="absolute bottom-3 left-3 z-10 text-[10px] tracking-[0.4em] text-muted-foreground uppercase font-serif">Ripple depth · 4 generations · 3,821 lives touched</div>
    </div>
  );
}
