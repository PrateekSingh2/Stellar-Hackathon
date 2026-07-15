import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Activity, Sparkles, Timer, Users, ShieldCheck, Waves, ArrowRight } from "lucide-react";
import { OrnateFrame } from "@/components/verdictum/OrnateFrame";
import { recentVerdicts, activity, souls } from "@/lib/mock-data";
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from "recharts";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Tribunal — VERDICTUM" }, { name: "description", content: "The Cosmic Tribunal home: universe health, pending souls, and recent verdicts." }] }),
  component: Dashboard,
});

const pulseData = Array.from({ length: 24 }).map((_, i) => ({ h: i, v: 40 + Math.sin(i / 2) * 20 + Math.random() * 15 }));

function Dashboard() {
  const pending = souls.filter(s => s.status === "Pending").length;
  const inReview = souls.filter(s => s.status === "In Review").length;
  const judged = souls.filter(s => s.status === "Judged").length;

  const stats = [
    { icon: ShieldCheck, label: "Universe Health", value: "99.4%", sub: "Weave nominal", tone: "gold" },
    { icon: Users, label: "Pending Souls", value: pending, sub: `${inReview} in review`, tone: "celestial" },
    { icon: Timer, label: "Cases Today", value: 128, sub: "+12 since dusk", tone: "gold" },
    { icon: Sparkles, label: "Judged Souls", value: judged.toLocaleString(), sub: "this cycle", tone: "gold" },
    { icon: Activity, label: "Restoration Rate", value: "62%", sub: "of all verdicts", tone: "celestial" },
    { icon: Waves, label: "Timeline Integrity", value: "0.997", sub: "no fractures", tone: "gold" },
  ] as const;

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-[1600px] mx-auto">
      <Header />

      {/* Stat grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="panel-glass rounded-lg p-4 relative overflow-hidden group">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition" style={{ background: "radial-gradient(circle at 50% 0%, oklch(0.82 0.15 82 / 0.12), transparent 60%)" }} />
            <s.icon className={`w-4 h-4 ${s.tone === "celestial" ? "text-celestial" : "text-gold"}`} strokeWidth={1.4} />
            <p className="mt-3 font-serif text-2xl text-gradient-gold">{s.value}</p>
            <p className="text-[10px] tracking-[0.25em] text-muted-foreground mt-1 uppercase">{s.label}</p>
            <p className="text-xs text-muted-foreground/70 mt-1">{s.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <OrnateFrame eyebrow="Codex Pulse — 24 hrs" title="Verdicts across the Weave" className="lg:col-span-2">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={pulseData}>
                <defs>
                  <linearGradient id="pulse" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.82 0.15 82)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="oklch(0.82 0.15 82)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="h" stroke="oklch(0.5 0.02 90)" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "oklch(0.12 0.02 265)", border: "1px solid oklch(0.82 0.15 82 / 0.3)", borderRadius: 6, fontFamily: "var(--font-sans)" }} labelStyle={{ color: "oklch(0.82 0.15 82)" }} />
                <Area type="monotone" dataKey="v" stroke="oklch(0.82 0.15 82)" strokeWidth={1.5} fill="url(#pulse)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-3 text-center">
            {[{l:"Ascendant",v:"48%"},{l:"Restoration",v:"39%"},{l:"Long Silence",v:"13%"}].map(x=>(
              <div key={x.l} className="border-r border-border/40 last:border-0">
                <p className="font-serif text-xl text-gradient-gold">{x.v}</p>
                <p className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">{x.l}</p>
              </div>
            ))}
          </div>
        </OrnateFrame>

        <OrnateFrame eyebrow="Recent Verdicts" title="Names spoken">
          <ul className="space-y-3">
            {recentVerdicts.map((v, i) => (
              <motion.li key={v.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.08 }}
                className="flex items-start gap-3">
                <span className={`mt-1.5 w-2 h-2 rounded-full ${v.tone === "gold" ? "bg-gold" : v.tone === "celestial" ? "bg-celestial" : "bg-ember"} shadow-gold`} />
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-parchment/90 truncate">{v.name}</p>
                  <p className="text-xs text-muted-foreground">{v.realm} · {v.when}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </OrnateFrame>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <OrnateFrame eyebrow="Activity" title="The Weave whispers" className="lg:col-span-2">
          <ul className="space-y-4">
            {activity.map((a, i) => (
              <motion.li key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}
                className="flex gap-4 border-b border-border/40 pb-3 last:border-0">
                <span className="font-serif text-xs text-gold/80 w-20 shrink-0 tracking-widest uppercase">{a.t}</span>
                <p className="text-sm text-parchment/85">{a.text}</p>
              </motion.li>
            ))}
          </ul>
        </OrnateFrame>

        <OrnateFrame eyebrow="Awaiting your bench" title="Next in queue">
          <ul className="space-y-3">
            {souls.filter(s => s.status !== "Judged").slice(0, 4).map(s => (
              <Link key={s.id} to="/case-review/$id" params={{ id: s.id }} className="block group">
                <div className="flex items-center justify-between p-3 rounded border border-border/40 hover:border-gold/40 hover:bg-gold/5 transition">
                  <div className="min-w-0">
                    <p className="font-serif text-sm text-parchment/90 truncate">{s.name}</p>
                    <p className="text-[11px] text-muted-foreground">{s.species} · {s.deathTime}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-gold transition group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </ul>
        </OrnateFrame>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="flex items-end justify-between gap-4 flex-wrap">
      <div>
        <p className="font-serif text-[10px] tracking-[0.5em] text-gold/80">— TRIBUNAL —</p>
        <h1 className="mt-2 font-serif text-4xl md:text-5xl text-gradient-gold">The Bench at Dusk</h1>
        <p className="mt-2 text-muted-foreground max-w-xl">The Weave is calm. New souls are being inscribed as you take your seat.</p>
      </div>
      <div className="text-right text-xs text-muted-foreground font-serif tracking-widest">
        <p>EPOCH · THIRD AGE · 1207.4</p>
        <p className="text-gold/80">CODEX PULSE — NOMINAL</p>
      </div>
    </div>
  );
}
