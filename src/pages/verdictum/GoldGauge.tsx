import { motion } from "framer-motion";

/** Circular gauge with golden arc and center label. Value 0..100. */
export function GoldGauge({ value, label, sublabel, size = 140, tone = "gold" }: {
  value: number; label: string; sublabel?: string; size?: number; tone?: "gold" | "celestial" | "ember";
}) {
  const stroke = 8;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  const dash = (pct / 100) * c;
  const color = tone === "celestial" ? "oklch(0.72 0.14 240)" : tone === "ember" ? "oklch(0.62 0.19 30)" : "oklch(0.82 0.15 82)";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <defs>
            <linearGradient id={`g-${label}`} x1="0" x2="1">
              <stop offset="0" stopColor={color} stopOpacity="1" />
              <stop offset="1" stopColor={color} stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <circle cx={size/2} cy={size/2} r={r} stroke="oklch(0.25 0.03 265)" strokeWidth={stroke} fill="none" />
          <motion.circle
            cx={size/2} cy={size/2} r={r}
            stroke={`url(#g-${label})`} strokeWidth={stroke} fill="none" strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={{ strokeDashoffset: c - dash }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            style={{ filter: `drop-shadow(0 0 8px ${color})` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="font-serif text-3xl text-gradient-gold"
          >{Math.round(pct)}</motion.span>
          <span className="text-[10px] tracking-widest text-muted-foreground uppercase">{sublabel ?? "score"}</span>
        </div>
      </div>
      <p className="font-serif text-sm text-gold tracking-wider">{label}</p>
    </div>
  );
}
