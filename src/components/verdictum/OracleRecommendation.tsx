import { motion } from "framer-motion";
import { GoldGauge } from "./GoldGauge";
import { oracle } from "@/lib/mock-data";

export function OracleRecommendation() {
  return (
    <div className="grid lg:grid-cols-[auto_1fr] gap-8 items-start">
      <div className="grid grid-cols-3 gap-6">
        <GoldGauge value={oracle.justice} label="Justice" tone="gold" />
        <GoldGauge value={oracle.restoration} label="Restoration" tone="celestial" />
        <GoldGauge value={oracle.confidence} label="Confidence" sublabel="oracle" tone="gold" />
      </div>
      <div className="space-y-4">
        <div className="panel-glass rounded p-5">
          <p className="font-serif text-[10px] tracking-[0.4em] text-gold/80 uppercase">Intent Summary</p>
          <p className="mt-2 font-display italic text-parchment/90 text-lg leading-relaxed">&ldquo;{oracle.summary}&rdquo;</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Stat label="Affected Lives" value={oracle.affected.toLocaleString()} tone="ember" />
          <Stat label="Suggested Realm" value={oracle.suggestedRealm} tone="gold" />
        </div>
        <p className="text-xs text-muted-foreground italic">The Oracle does not decide. The Judge speaks the final name.</p>
      </div>
    </div>
  );
}
function Stat({ label, value, tone }: { label: string; value: string; tone: "gold" | "ember" }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
      className="panel-engraved rounded p-4">
      <p className="text-[10px] tracking-[0.35em] text-muted-foreground uppercase font-serif">{label}</p>
      <p className={`mt-2 font-serif text-xl ${tone === "ember" ? "text-ember" : "text-gradient-gold"}`}>{value}</p>
    </motion.div>
  );
}
