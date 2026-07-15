import { motion } from "framer-motion";
import { alternateTimeline } from "@/lib/mock-data";

export function AlternateReality() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 text-center mb-4">
        <p className="font-serif text-xs tracking-[0.4em] text-ember uppercase">Actual Timeline</p>
        <p className="font-serif text-xs tracking-[0.4em] text-celestial uppercase">Reality Reimagined</p>
      </div>
      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ background: "linear-gradient(180deg, transparent, oklch(0.82 0.15 82 / 0.6), transparent)" }} />
        <div className="space-y-3">
          {alternateTimeline.map((row, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-4">
              <div className="panel-glass rounded p-4 border border-ember/25">
                <p className="text-[10px] tracking-widest text-ember font-serif">AS RECORDED</p>
                <p className="mt-1 text-sm text-parchment/85">{row.actual}</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span className="font-serif text-xs text-gold">age {row.year}</span>
                <span className="w-2 h-2 rounded-full bg-gold shadow-gold mt-1" />
              </div>
              <div className="panel-glass rounded p-4 border border-celestial/25">
                <p className="text-[10px] tracking-widest text-celestial font-serif">HAD HE CHOSEN</p>
                <p className="mt-1 text-sm text-parchment/85">{row.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-xs text-muted-foreground italic text-center">The Oracle offers alternates for context only. The Weave does not judge unlived lives.</p>
    </div>
  );
}
