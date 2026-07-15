import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity, Sparkles, Timer, Users, ShieldCheck, Waves,
  ArrowRight, TrendingUp, AlertTriangle, Eye, Zap, Clock, MoreHorizontal,
} from "lucide-react";
import { OrnateFrame } from "@/components/verdictum/OrnateFrame";
import { recentVerdicts, activity, souls } from "@/lib/mock-data";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip,
  BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, Cell,
} from "recharts";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Tribunal — VERDICTUM" }, { name: "description", content: "The Cosmic Tribunal home: universe health, pending souls, and recent verdicts." }] }),
  component: Dashboard,
});

/* ─── Data ─── */
const pulseData = Array.from({ length: 24 }).map((_, i) => ({
  h: `${i}:00`,
  verdicts: Math.floor(40 + Math.sin(i / 2.5) * 22 + Math.random() * 18),
  inscribed: Math.floor(20 + Math.cos(i / 3) * 12 + Math.random() * 10),
}));

const barData = [
  { label: "Mon", v: 82 }, { label: "Tue", v: 117 }, { label: "Wed", v: 94 },
  { label: "Thu", v: 128 }, { label: "Fri", v: 103 }, { label: "Sat", v: 67 },
  { label: "Sun", v: 45 },
];

const radarData = [
  { subject: "Love", A: 62 }, { subject: "Greed", A: 78 },
  { subject: "Fear", A: 71 }, { subject: "Compassion", A: 44 },
  { subject: "Regret", A: 84 }, { subject: "Hope", A: 51 },
];

/* Heat map: 7 days × 12 hours */
const heatData = Array.from({ length: 84 }).map(() => Math.floor(Math.random() * 100));

/* Animated counter */
function AnimatedCount({ target, suffix = "" }: { target: number | string; suffix?: string }) {
  const numTarget = typeof target === "number" ? target : null;
  const [val, setVal] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    if (!numTarget || done.current) return;
    done.current = true;
    let start = 0;
    const step = numTarget / 50;
    const tick = () => {
      start = Math.min(start + step, numTarget);
      setVal(Math.floor(start));
      if (start < numTarget) requestAnimationFrame(tick);
    };
    const t = setTimeout(() => requestAnimationFrame(tick), 200);
    return () => clearTimeout(t);
  }, [numTarget]);
  if (numTarget === null) return <>{target}{suffix}</>;
  return <>{val.toLocaleString()}{suffix}</>;
}

/* Progress bar */
function ProgressBar({ value, color = "gold" }: { value: number; color?: "gold" | "celestial" | "ember" }) {
  const fill =
    color === "celestial" ? "background: linear-gradient(90deg, oklch(0.80 0.14 240), oklch(0.55 0.12 220)); box-shadow: 0 0 10px oklch(0.70 0.14 240 / 0.5)"
    : color === "ember" ? "background: linear-gradient(90deg, oklch(0.75 0.18 35), oklch(0.52 0.17 20)); box-shadow: 0 0 10px oklch(0.62 0.19 30 / 0.5)"
    : "background: linear-gradient(90deg, oklch(0.90 0.13 85), oklch(0.65 0.14 70)); box-shadow: 0 0 10px oklch(0.82 0.15 82 / 0.5)";
  return (
    <div className="progress-cosmic mt-2">
      <motion.div className="progress-cosmic-fill" initial={{ width: 0 }}
        animate={{ width: `${value}%` }} transition={{ duration: 1.3, ease: [0.25, 1, 0.5, 1], delay: 0.3 }}
        style={{ ...(Object.fromEntries(fill.split(";").map(p => { const [k, v] = p.trim().split(": "); return [k?.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), v?.trim()]; }).filter(([k]) => k))) } as React.CSSProperties}
      />
    </div>
  );
}

/* Verdict tone badge */
function VerdictBadge({ tone, realm }: { tone: "gold" | "celestial" | "ember"; realm: string }) {
  return (
    <span className={`verdict-badge verdict-${tone}`}>
      <span className={`w-1.5 h-1.5 rounded-full inline-block shrink-0 ${tone === "gold" ? "bg-gold" : tone === "celestial" ? "bg-celestial" : "bg-ember"}`} />
      {realm}
    </span>
  );
}

/* Live indicator */
function LivePulse() {
  return (
    <span className="inline-flex items-center gap-1.5 text-[9px] tracking-[0.3em] text-gold/80 font-serif">
      <span className="w-2 h-2 rounded-full bg-gold animate-pulse-gold" />
      LIVE
    </span>
  );
}

/* ─── Main Component ─── */
function Dashboard() {
  const pending = souls.filter(s => s.status === "Pending").length;
  const inReview = souls.filter(s => s.status === "In Review").length;
  const judged = souls.filter(s => s.status === "Judged").length;

  const stats = [
    { icon: ShieldCheck, label: "Universe Health", value: "99.4", suffix: "%", sub: "Weave nominal", tone: "gold" as const, progress: 99.4, trend: "+0.1" },
    { icon: Users, label: "Pending Souls", value: pending, suffix: "", sub: `${inReview} in review`, tone: "celestial" as const, progress: 68, trend: "+3" },
    { icon: Timer, label: "Cases Today", value: 128, suffix: "", sub: "+12 since dusk", tone: "gold" as const, progress: 72, trend: "+12" },
    { icon: Sparkles, label: "Judged Souls", value: judged, suffix: "", sub: "this cycle", tone: "gold" as const, progress: 55, trend: "+847k total" },
    { icon: Activity, label: "Restoration Rate", value: "62", suffix: "%", sub: "of all verdicts", tone: "celestial" as const, progress: 62, trend: "-1.4%" },
    { icon: Waves, label: "Timeline Integrity", value: "0.997", suffix: "", sub: "no fractures", tone: "gold" as const, progress: 99.7, trend: "stable" },
  ];

  const tooltipStyle = {
    contentStyle: { background: "oklch(0.12 0.02 265)", border: "1px solid oklch(0.82 0.15 82 / 0.3)", borderRadius: 8, fontFamily: "var(--font-sans)", fontSize: 12 },
    labelStyle: { color: "oklch(0.82 0.15 82)", fontFamily: "var(--font-serif)", letterSpacing: "0.1em" },
  };

  return (
    <div className="p-5 md:p-8 space-y-6 max-w-[1600px] mx-auto">
      {/* ── Header ── */}
      <DashboardHeader />

      {/* ── Stat grid ── */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {stats.map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="panel-glass rounded-xl p-4 relative overflow-hidden group hover:panel-glass-hover transition-all duration-400 ornate-corners">
            <span className="corner-tr" /><span className="corner-bl" />

            {/* BG glow */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: s.tone === "celestial"
                ? "radial-gradient(circle at 50% 0%, oklch(0.70 0.14 240 / 0.12), transparent 60%)"
                : "radial-gradient(circle at 50% 0%, oklch(0.82 0.15 82 / 0.12), transparent 60%)" }}
            />

            <div className="flex items-start justify-between">
              <s.icon className={`w-4 h-4 ${s.tone === "celestial" ? "text-celestial" : "text-gold"}`} strokeWidth={1.4} />
              <span className={`text-[9px] tracking-wide font-serif ${s.tone === "celestial" ? "text-celestial/60" : "text-gold/60"}`}>{s.trend}</span>
            </div>

            <p className="mt-3 font-serif text-2xl md:text-3xl text-gradient-gold stat-number leading-none">
              <AnimatedCount target={s.value} suffix={s.suffix} />
            </p>
            <p className="text-[9px] tracking-[0.22em] text-muted-foreground mt-1.5 uppercase">{s.label}</p>
            <p className="text-[10px] text-muted-foreground/60 mt-0.5">{s.sub}</p>
            <ProgressBar value={s.progress} color={s.tone} />
          </motion.div>
        ))}
      </div>

      {/* ── Main charts row ── */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Area chart */}
        <OrnateFrame eyebrow="Codex Pulse · 24 hrs" title="Verdicts across the Weave"
          className="lg:col-span-2"
          action={<LivePulse />}>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={pulseData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                <defs>
                  <linearGradient id="pulse" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.82 0.15 82)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.82 0.15 82)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="pulseB" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.70 0.14 240)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="oklch(0.70 0.14 240)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="h" stroke="oklch(0.4 0.02 90)" fontSize={9} tickLine={false} axisLine={false} interval={3} />
                <YAxis stroke="oklch(0.4 0.02 90)" fontSize={9} tickLine={false} axisLine={false} />
                <Tooltip {...tooltipStyle} />
                <Area type="monotone" dataKey="verdicts" stroke="oklch(0.82 0.15 82)" strokeWidth={2} fill="url(#pulse)" name="Verdicts" />
                <Area type="monotone" dataKey="inscribed" stroke="oklch(0.70 0.14 240)" strokeWidth={1.5} fill="url(#pulseB)" name="Inscribed" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-3 text-center gap-2">
            {[{ l: "Ascendant", v: "48%", c: "text-gradient-gold" }, { l: "Restoration", v: "39%", c: "text-gradient-gold" }, { l: "Long Silence", v: "13%", c: "text-ember" }].map(x => (
              <div key={x.l} className="border-r border-border/30 last:border-0 px-2">
                <p className={`font-serif text-xl ${x.c}`}>{x.v}</p>
                <p className="text-[9px] tracking-[0.28em] text-muted-foreground uppercase mt-0.5">{x.l}</p>
              </div>
            ))}
          </div>
        </OrnateFrame>

        {/* Recent verdicts */}
        <OrnateFrame eyebrow="Recent Verdicts" title="Names spoken" action={
          <Link to="/soul-queue" className="text-[9px] tracking-[0.3em] text-gold/60 hover:text-gold font-serif transition">VIEW ALL →</Link>
        }>
          <ul className="space-y-3">
            {recentVerdicts.map((v, i) => (
              <motion.li key={v.name}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.09 }}
                className="flex items-start gap-3 group">
                <span className={`mt-1 w-2.5 h-2.5 rounded-full shrink-0 ${v.tone === "gold" ? "bg-gold shadow-gold" : v.tone === "celestial" ? "bg-celestial shadow-celestial" : "bg-ember shadow-ember"}`} />
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-sm text-parchment/90 truncate group-hover:text-gold transition">{v.name}</p>
                  <div className="mt-1">
                    <VerdictBadge tone={v.tone} realm={v.realm} />
                  </div>
                  <p className="text-[10px] text-muted-foreground/60 mt-1">{v.when}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </OrnateFrame>
      </div>

      {/* ── Second charts row ── */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Activity feed */}
        <OrnateFrame eyebrow="Weave Activity" title="Live transmissions" className="lg:col-span-2" action={<LivePulse />}>
          <ul className="space-y-3">
            {activity.map((a, i) => (
              <motion.li key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 border-b border-border/25 pb-3 last:border-0 group">
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <span className="w-2 h-2 rounded-full bg-gold/50 group-hover:bg-gold transition-colors" />
                  {i < activity.length - 1 && <span className="w-px flex-1 bg-border/30" />}
                </div>
                <div className="flex-1 min-w-0 pb-1">
                  <span className="font-serif text-[10px] text-gold/80 tracking-widest uppercase block">{a.t}</span>
                  <p className="text-sm text-parchment/80 mt-1 leading-snug">{a.text}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </OrnateFrame>

        {/* Next in queue */}
        <OrnateFrame eyebrow="Awaiting your bench" title="Next in queue">
          <ul className="space-y-2">
            {souls.filter(s => s.status !== "Judged").slice(0, 5).map((s, i) => (
              <motion.div key={s.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.07 }}>
                <Link to="/case-review/$id" params={{ id: s.id }} className="block group">
                  <div className="flex items-center justify-between p-3 rounded-lg border border-border/30 hover:border-gold/40 hover:bg-gold/5 transition-all duration-250 gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-[9px] tracking-wide font-serif px-1.5 py-0.5 rounded ${s.priority === "Cosmic" ? "bg-ember/15 text-ember border border-ember/30" : s.priority === "High" ? "bg-gold/15 text-gold border border-gold/30" : "bg-border/30 text-muted-foreground border border-border/40"}`}>
                          {s.priority}
                        </span>
                        <span className={`text-[9px] tracking-wide ${s.status === "In Review" ? "text-celestial" : "text-muted-foreground"}`}>
                          {s.status}
                        </span>
                      </div>
                      <p className="font-serif text-sm text-parchment/90 truncate">{s.name}</p>
                      <p className="text-[10px] text-muted-foreground/65">{s.species} · {s.deathTime}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-gold transition-all group-hover:translate-x-0.5 shrink-0" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </ul>
        </OrnateFrame>
      </div>

      {/* ── Bottom row ── */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Weekly bar chart */}
        <OrnateFrame eyebrow="Weekly Volume" title="Cases by day">
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 4, right: 0, left: -28, bottom: 0 }}>
                <XAxis dataKey="label" stroke="oklch(0.4 0.02 90)" fontSize={9} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(0.4 0.02 90)" fontSize={9} tickLine={false} axisLine={false} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="v" radius={[4, 4, 0, 0]} name="Cases">
                  {barData.map((_, i) => (
                    <Cell key={i}
                      fill={i === 3 ? "oklch(0.82 0.15 82)" : "oklch(0.82 0.15 82 / 0.4)"}
                      style={i === 3 ? { filter: "drop-shadow(0 0 6px oklch(0.82 0.15 82 / 0.6))" } : {}}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </OrnateFrame>

        {/* Intent radar */}
        <OrnateFrame eyebrow="Soul Aggregate" title="Intent distribution">
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="oklch(0.82 0.15 82 / 0.15)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "oklch(0.65 0.03 90)", fontSize: 9, fontFamily: "var(--font-serif)" }} />
                <Radar name="Intent" dataKey="A" stroke="oklch(0.82 0.15 82)" fill="oklch(0.82 0.15 82)" fillOpacity={0.18} strokeWidth={1.5} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </OrnateFrame>

        {/* Activity heat map */}
        <OrnateFrame eyebrow="Judgment Activity" title="7-day heat map">
          <div className="flex gap-1.5 flex-wrap">
            {heatData.map((v, i) => {
              const intensity = v / 100;
              return (
                <motion.div key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.008, duration: 0.3 }}
                  className="heat-dot"
                  title={`${v} cases`}
                  style={{
                    background: v > 70
                      ? `oklch(0.82 0.15 82 / ${0.4 + intensity * 0.6})`
                      : v > 40
                      ? `oklch(0.70 0.14 240 / ${0.3 + intensity * 0.5})`
                      : `oklch(0.3 0.03 265 / ${0.4 + intensity * 0.3})`,
                    boxShadow: v > 70 ? `0 0 6px oklch(0.82 0.15 82 / ${intensity * 0.5})` : "none",
                  }}
                />
              );
            })}
          </div>
          <div className="mt-4 flex items-center justify-between text-[9px] text-muted-foreground/60">
            <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-[9px] text-muted-foreground/50 tracking-wide">Less</span>
            {[10, 30, 55, 75, 95].map(v => (
              <div key={v} className="w-3 h-3 rounded-sm" style={{
                background: v > 70 ? `oklch(0.82 0.15 82 / ${0.4 + v / 100 * 0.6})`
                  : v > 40 ? `oklch(0.70 0.14 240 / ${0.3 + v / 100 * 0.5})`
                  : `oklch(0.3 0.03 265 / 0.5)`,
              }} />
            ))}
            <span className="text-[9px] text-muted-foreground/50 tracking-wide">More</span>
          </div>
        </OrnateFrame>
      </div>
    </div>
  );
}

/* ─── Dashboard header ─── */
function DashboardHeader() {
  const now = new Date();
  const hours = now.getHours();
  const timeOfDay = hours < 6 ? "Before Dawn" : hours < 12 ? "at Dawn" : hours < 17 ? "at High Sun" : hours < 21 ? "at Dusk" : "at Midnight";

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-end justify-between gap-4 flex-wrap">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <p className="font-serif text-[10px] tracking-[0.55em] text-gold/75">— TRIBUNAL —</p>
          <span className="inline-flex items-center gap-1.5 text-[9px] tracking-[0.25em] text-gold/70 font-serif border border-gold/25 px-2 py-0.5 rounded-full panel-glass">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-gold" />
            CODEX PULSE — NOMINAL
          </span>
        </div>
        <h1 className="font-serif text-3xl md:text-5xl text-gradient-gold leading-tight">The Bench {timeOfDay}</h1>
        <p className="mt-2 text-muted-foreground/70 max-w-xl text-sm">
          The Weave is calm. New souls are being inscribed as you take your seat.
        </p>
      </div>
      <div className="text-right space-y-1">
        <p className="font-serif text-xs text-muted-foreground/70 tracking-widest">EPOCH · THIRD AGE · 1207.4</p>
        <div className="flex items-center justify-end gap-3">
          {[
            { label: "Pending", value: "6", color: "text-gold" },
            { label: "In Review", value: "2", color: "text-celestial" },
            { label: "Deferred", value: "1", color: "text-muted-foreground" },
          ].map(s => (
            <div key={s.label} className="text-center">
              <p className={`font-serif text-lg ${s.color}`}>{s.value}</p>
              <p className="text-[8px] tracking-[0.25em] text-muted-foreground/60 uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
