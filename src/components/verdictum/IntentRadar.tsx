import { motion } from "framer-motion";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis } from "recharts";
import { intents } from "@/lib/mock-data";

export function IntentRadar() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={intents}>
            <PolarGrid stroke="oklch(0.82 0.15 82 / 0.2)" />
            <PolarAngleAxis dataKey="trait" tick={{ fill: "oklch(0.85 0.05 82)", fontSize: 11, fontFamily: "var(--font-serif)", letterSpacing: 2 }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar dataKey="value" stroke="oklch(0.82 0.15 82)" strokeWidth={1.5} fill="oklch(0.82 0.15 82)" fillOpacity={0.35} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-3">
        {intents.map((it, i) => (
          <div key={it.trait}>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-serif tracking-widest text-parchment/80 uppercase">{it.trait}</span>
              <span className="font-serif text-gold">{it.value}</span>
            </div>
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${it.value}%` }} transition={{ delay: i * 0.08, duration: 1 }}
                className="h-full bg-gradient-gold" />
            </div>
          </div>
        ))}
        <p className="text-xs text-muted-foreground italic mt-4">Intent readings are drawn directly from the Weave — no interpretation is applied.</p>
      </div>
    </div>
  );
}
