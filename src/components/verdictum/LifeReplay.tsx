import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { lifeMoments, type LifeMoment } from "@/lib/mock-data";

export function LifeReplay() {
  const [active, setActive] = useState<LifeMoment>(lifeMoments[3]);
  return (
    <div>
      {/* Timeline rail */}
      <div className="relative py-6">
        <div className="absolute left-0 right-0 top-1/2 h-px" style={{ marginTop: 58, background: "linear-gradient(90deg, transparent, oklch(0.82 0.15 82 / 0.6), transparent)" }} />
        <div className="relative flex items-center justify-between gap-2">
          {lifeMoments.map(m => {
            const isActive = m.id === active.id;
            return (
              <button key={m.id} onClick={() => setActive(m)} className="group flex flex-col items-center gap-2 min-w-0 flex-1">
                <motion.div
                  animate={{ scale: isActive ? 1.2 : 1 }}
                  className={`w-4 h-4 rounded-full border ${isActive ? "bg-gradient-gold border-gold shadow-gold animate-pulse-gold" : "bg-background border-gold/40 group-hover:border-gold"}`}
                />
                <span className={`text-[10px] tracking-widest uppercase font-serif ${isActive ? "text-gold" : "text-muted-foreground group-hover:text-gold/80"}`}>Age {m.year}</span>
                <span className="text-[11px] text-center text-parchment/70 max-w-[120px] truncate">{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={active.id}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}
          className="mt-6 panel-glass rounded-lg p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 20% 0%, oklch(0.82 0.15 82 / 0.2), transparent 60%)" }} />
          <div className="relative flex items-start gap-6">
            <div className="w-24 h-24 shrink-0 rounded border border-gold/40 bg-gradient-to-br from-secondary to-background flex items-center justify-center font-serif text-gold text-3xl shadow-engraved">
              {active.year}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-serif text-[10px] tracking-[0.4em] text-gold/80 uppercase">Memory · {active.kind}</p>
              <h4 className="mt-1 font-serif text-2xl text-gradient-gold">{active.label}</h4>
              <p className="mt-3 font-display italic text-parchment/85 leading-relaxed">&ldquo;{active.memory}&rdquo;</p>
              <div className="mt-4 flex flex-wrap gap-2 text-[10px] tracking-widest uppercase font-serif text-muted-foreground">
                <span className="px-2 py-1 rounded border border-border">witnessed</span>
                <span className="px-2 py-1 rounded border border-border">immutable</span>
                <span className="px-2 py-1 rounded border border-gold/40 text-gold/80">indexed</span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
