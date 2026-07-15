import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity, Sparkles, Timer, Users, ShieldCheck, Waves,
  ArrowRight
} from "lucide-react";
import { OrnateFrame } from "@/components/verdictum/OrnateFrame";
import { recentVerdicts as initialVerdicts, activity as initialActivity, souls as initialSouls, type Soul } from "@/lib/mock-data";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip,
  BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, Cell,
} from "recharts";
import { useEffect, useRef, useState, useMemo } from "react";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Tribunal — VERDICTUM" }, { name: "description", content: "The Cosmic Tribunal home." }] }),
  component: Dashboard,
});

/* ─── Simulation Hook ─── */
function useLiveSimulation() {
  const [pulseData, setPulseData] = useState(() => Array.from({ length: 24 }).map((_, i) => ({
    h: `${i}:00`, verdicts: Math.floor(40 + Math.sin(i / 2.5) * 22 + Math.random() * 18),
    inscribed: Math.floor(20 + Math.cos(i / 3) * 12 + Math.random() * 10),
  })));
  
  const [heatData, setHeatData] = useState(() => Array.from({ length: 84 }).map(() => Math.floor(Math.random() * 100)));
  
  const [radarData, setRadarData] = useState(() => [
    { subject: "Love", A: 62 }, { subject: "Greed", A: 78 },
    { subject: "Fear", A: 71 }, { subject: "Compassion", A: 44 },
    { subject: "Regret", A: 84 }, { subject: "Hope", A: 51 },
  ]);

  const [liveActivity, setLiveActivity] = useState(initialActivity);
  const [liveVerdicts, setLiveVerdicts] = useState(initialVerdicts);
  const [liveQueue, setLiveQueue] = useState(initialSouls.filter(s => s.status !== "Judged"));
  const [liveJudged, setLiveJudged] = useState(() => initialSouls.filter(s => s.status === "Judged").length + 400);
  const [liveCasesToday, setLiveCasesToday] = useState(128);

  useEffect(() => {
    // Main simulation loop
    const interval = setInterval(() => {
      // 1. Update activity feed
      const newActs = [
        "Index rebalanced across Sector 7.",
        "Timeline anomaly resolved.",
        "Oracle completed memory sweep.",
        "New soul inscribed: unknown origin.",
        "Judge invoked Ascendant Protocol."
      ];
      setLiveActivity(prev => {
        const next = [...prev];
        next.unshift({ t: "just now", text: newActs[Math.floor(Math.random() * newActs.length)] });
        if (next.length > 5) next.pop();
        return next;
      });

      // 2. Update verdicts rarely
      if (Math.random() > 0.6) {
        setLiveVerdicts(prev => {
          const names = ["Elarin Scout", "Faelin Weaver", "Umbral Shade", "Human Merchant", "Golem Warden"];
          const realms = ["Ascendant Gardens", "Realm of Restoration", "The Long Silence"];
          const tones = ["gold", "celestial", "ember"] as const;
          const next = [...prev];
          next.unshift({ 
            name: names[Math.floor(Math.random() * names.length)], 
            realm: realms[Math.floor(Math.random() * realms.length)], 
            when: "just now", 
            tone: tones[Math.floor(Math.random() * tones.length)] 
          });
          if (next.length > 4) next.pop();
          return next;
        });
        setLiveJudged(prev => prev + 1);
        setLiveCasesToday(prev => prev + 1);
      }

      // 3. Rotate Soul Queue
      if (Math.random() > 0.4) {
        setLiveQueue(prev => {
          const next = [...prev];
          next.shift(); // remove first
          const names = ["Zaelen", "Kael", "Lyra", "Voss", "Thorne"];
          next.push({
            id: `sol-${Date.now()}`,
            name: `${names[Math.floor(Math.random() * names.length)]} of ${["Iren", "the Wastes", "Ember", "the Spire"][Math.floor(Math.random() * 4)]}`,
            species: "Human", deathTime: "just now", complexity: Math.floor(Math.random() * 100),
            status: "Pending", priority: Math.random() > 0.8 ? "High" : "Standard",
            epoch: "Third Age", lifespan: "Unknown"
          });
          return next;
        });
      }

      // 4. Jitter Pulse Data (shift left)
      setPulseData(prev => {
        const next = [...prev];
        const last = next[next.length - 1];
        next.shift();
        next.push({
          h: `${(parseInt(last.h) + 1) % 24}:00`,
          verdicts: Math.floor(40 + Math.random() * 30),
          inscribed: Math.floor(20 + Math.random() * 20)
        });
        return next;
      });

      // 5. Blip random heat nodes
      setHeatData(prev => {
        const next = [...prev];
        const idx = Math.floor(Math.random() * next.length);
        next[idx] = Math.min(100, next[idx] + 30);
        return next;
      });

    }, 3500); // Trigger every 3.5s

    return () => clearInterval(interval);
  }, []);

  return { pulseData, heatData, radarData, liveActivity, liveVerdicts, liveQueue, liveJudged, liveCasesToday };
}

/* ─── Dashboard Components ─── */
const barData = [
  { label: "Mon", v: 82 }, { label: "Tue", v: 117 }, { label: "Wed", v: 94 },
  { label: "Thu", v: 128 }, { label: "Fri", v: 103 }, { label: "Sat", v: 67 }, { label: "Sun", v: 45 },
];

function AnimatedCount({ target, suffix = "" }: { target: number | string; suffix?: string }) {
  const numTarget = typeof target === "number" ? target : null;
  const [val, setVal] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    if (numTarget === null) return;
    
    // If already animated once, update immediately for live streams
    if (done.current) {
      setVal(numTarget);
      return;
    }

    let start = 0;
    const step = Math.max(1, numTarget / 30);
    let frame: number;

    const tick = () => {
      start = Math.min(start + step, numTarget);
      setVal(Math.floor(start));
      if (start < numTarget) {
        frame = requestAnimationFrame(tick);
      } else {
        done.current = true;
      }
    };
    
    const t = setTimeout(() => {
      frame = requestAnimationFrame(tick);
    }, 50);

    return () => {
      clearTimeout(t);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [numTarget]);

  if (numTarget === null) return <>{target}{suffix}</>;
  return <>{val.toLocaleString()}{suffix}</>;
}

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

function VerdictBadge({ tone, realm }: { tone: "gold" | "celestial" | "ember"; realm: string }) {
  return (
    <span className={`verdict-badge verdict-${tone}`}>
      <span className={`w-1.5 h-1.5 rounded-full inline-block shrink-0 ${tone === "gold" ? "bg-gold" : tone === "celestial" ? "bg-celestial" : "bg-ember"}`} />
      {realm}
    </span>
  );
}

function LivePulse() {
  return (
    <span className="inline-flex items-center gap-1.5 text-[9px] tracking-[0.3em] text-celestial font-serif border border-celestial/30 px-2 py-0.5 rounded shadow-[0_0_10px_oklch(0.7_0.14_240/0.4)]">
      <span className="w-2 h-2 rounded-full bg-celestial animate-pulse-celestial" />
      SYSTEM LIVE
    </span>
  );
}

/* ─── Main Component ─── */
function Dashboard() {
  const { pulseData, heatData, radarData, liveActivity, liveVerdicts, liveQueue, liveJudged, liveCasesToday } = useLiveSimulation();

  const pending = liveQueue.filter(s => s.status === "Pending").length;
  const inReview = liveQueue.filter(s => s.status === "In Review").length;

  const stats = [
    { icon: ShieldCheck, label: "Universe Health", value: "99.4", suffix: "%", sub: "Weave nominal", tone: "gold" as const, progress: 99.4, trend: "+0.1" },
    { icon: Users, label: "Pending Souls", value: pending + 21, suffix: "", sub: `${inReview} in review`, tone: "celestial" as const, progress: 68, trend: "LIVE" },
    { icon: Timer, label: "Cases Today", value: liveCasesToday, suffix: "", sub: "continuous index", tone: "gold" as const, progress: 72, trend: "+12" },
    { icon: Sparkles, label: "Judged Souls", value: liveJudged, suffix: "", sub: "this cycle", tone: "gold" as const, progress: 55, trend: "+847k total" },
    { icon: Activity, label: "Restoration Rate", value: "62", suffix: "%", sub: "of all verdicts", tone: "celestial" as const, progress: 62, trend: "-1.4%" },
    { icon: Waves, label: "Timeline Integrity", value: "0.997", suffix: "", sub: "no fractures", tone: "gold" as const, progress: 99.7, trend: "stable" },
  ];

  const tooltipStyle = {
    contentStyle: { background: "oklch(0.12 0.02 265)", border: "1px solid oklch(0.82 0.15 82 / 0.3)", borderRadius: 0, fontFamily: "var(--font-sans)", fontSize: 12 },
    labelStyle: { color: "oklch(0.7 0.14 240)", fontFamily: "var(--font-serif)", letterSpacing: "0.1em" },
  };

  return (
    <div className="p-5 md:p-8 space-y-6 max-w-[1600px] mx-auto relative">
      {/* Background Holographic Scanline */}
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none z-0" />

      {/* ── Header ── */}
      <DashboardHeader />

      {/* ── Stat grid ── */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 relative z-10">
        {stats.map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="panel-holographic rounded-xl p-4 relative overflow-hidden group hover:shadow-celestial transition-all duration-400 ornate-corners border-celestial/20">
            <span className="corner-tr" /><span className="corner-bl" />
            <div className="absolute inset-0 bg-gradient-celestial opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />

            <div className="flex items-start justify-between relative z-10">
              <s.icon className={`w-4 h-4 ${s.tone === "celestial" ? "text-celestial" : "text-gold"}`} strokeWidth={1.4} />
              <span className={`text-[9px] tracking-wide font-serif ${s.tone === "celestial" ? "text-celestial animate-pulse" : "text-gold/60"}`}>
                {s.trend === "LIVE" ? <span>PROCESSING</span> : s.trend}
              </span>
            </div>

            <p className={`mt-3 font-serif text-2xl md:text-3xl leading-none relative z-10 ${s.tone === 'celestial' ? 'text-celestial' : 'text-gradient-gold'}`}>
              <AnimatedCount target={s.value} suffix={s.suffix} />
            </p>
            <p className="text-[9px] tracking-[0.22em] text-muted-foreground mt-1.5 uppercase relative z-10">{s.label}</p>
            <p className="text-[10px] text-muted-foreground/60 mt-0.5 relative z-10">{s.sub}</p>
            <ProgressBar value={s.progress} color={s.tone} />
          </motion.div>
        ))}
      </div>

      {/* ── Main charts row ── */}
      <div className="grid lg:grid-cols-3 gap-5 relative z-10">
        <OrnateFrame eyebrow="Codex Pulse · Live stream" title="Verdicts across the Weave"
          className="lg:col-span-2 panel-holographic"
          action={<LivePulse />}>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={pulseData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                <defs>
                  <linearGradient id="pulse" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.82 0.15 82)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="oklch(0.82 0.15 82)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="pulseB" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.70 0.14 240)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.70 0.14 240)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="h" stroke="oklch(0.70 0.14 240 / 0.5)" fontSize={9} tickLine={false} axisLine={false} interval={3} />
                <YAxis stroke="oklch(0.70 0.14 240 / 0.5)" fontSize={9} tickLine={false} axisLine={false} />
                <Tooltip {...tooltipStyle} cursor={{ stroke: 'oklch(0.70 0.14 240)', strokeWidth: 1, strokeDasharray: '3 3' }} />
                <Area type="monotone" isAnimationActive={true} animationDuration={500} dataKey="verdicts" stroke="oklch(0.82 0.15 82)" strokeWidth={2} fill="url(#pulse)" name="Verdicts" />
                <Area type="monotone" isAnimationActive={true} animationDuration={500} dataKey="inscribed" stroke="oklch(0.70 0.14 240)" strokeWidth={1.5} fill="url(#pulseB)" name="Inscribed" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </OrnateFrame>

        <OrnateFrame eyebrow="System Output" title="Recent Verdicts" className="panel-holographic overflow-hidden">
          <ul className="space-y-3">
            <AnimatePresence initial={false}>
              {liveVerdicts.map((v, i) => (
                <motion.li key={v.name + v.when + i}
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
                  className="flex items-start gap-3 group">
                  <span className={`mt-1 w-2.5 h-2.5 rounded-none shrink-0 ${v.tone === "gold" ? "bg-gold shadow-gold" : v.tone === "celestial" ? "bg-celestial shadow-celestial" : "bg-ember shadow-ember"}`} />
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-sm text-celestial truncate">{v.name}</p>
                    <div className="mt-1">
                      <VerdictBadge tone={v.tone} realm={v.realm} />
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </OrnateFrame>
      </div>

      {/* ── Second charts row ── */}
      <div className="grid lg:grid-cols-3 gap-5 relative z-10">
        <OrnateFrame eyebrow="Weave Activity" title="Live Transmissions" className="lg:col-span-2 panel-holographic">
          <ul className="space-y-3">
            <AnimatePresence initial={false}>
              {liveActivity.map((a, i) => (
                <motion.li key={a.text + a.t + i}
                  initial={{ opacity: 0, x: -20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: "auto" }}
                  exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
                  className="flex gap-4 border-b border-celestial/20 pb-3 last:border-0 group">
                  <div className="flex flex-col items-center gap-1 shrink-0">
                    <span className="w-2 h-2 rounded-none bg-celestial shadow-[0_0_8px_oklch(0.7_0.14_240)]" />
                    {i < liveActivity.length - 1 && <span className="w-px flex-1 bg-celestial/30" />}
                  </div>
                  <div className="flex-1 min-w-0 pb-1">
                    <span className="font-serif text-[10px] text-celestial tracking-widest uppercase block">{a.t}</span>
                    <p className="text-sm text-parchment/90 mt-1 leading-snug">{a.text}</p>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </OrnateFrame>

        <OrnateFrame eyebrow="System Queue" title="Next to Process" className="panel-holographic">
          <ul className="space-y-2">
            <AnimatePresence initial={false}>
              {liveQueue.slice(0, 5).map((s, i) => (
                <motion.div key={s.id}
                  initial={{ opacity: 0, x: 20, height: 0 }} 
                  animate={{ opacity: 1, x: 0, height: "auto" }} 
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  className="block group">
                  <div className="flex items-center justify-between p-3 rounded-none border border-celestial/20 bg-celestial/5 gap-2 relative overflow-hidden">
                    {/* Hover scanline */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-celestial/20 to-transparent -translate-y-full group-hover:animate-scanline pointer-events-none" />
                    
                    <div className="min-w-0 flex-1 relative z-10">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-[9px] tracking-wide font-serif px-1.5 py-0.5 rounded-sm ${s.priority === "Cosmic" ? "bg-ember/15 text-ember border border-ember/30" : s.priority === "High" ? "bg-gold/15 text-gold border border-gold/30" : "bg-celestial/15 text-celestial border border-celestial/40"}`}>
                          {s.priority}
                        </span>
                      </div>
                      <p className="font-serif text-sm text-parchment/90 truncate">{s.name}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </ul>
        </OrnateFrame>
      </div>

      {/* ── Bottom row ── */}
      <div className="grid lg:grid-cols-3 gap-5 relative z-10">
        <OrnateFrame eyebrow="Weekly Volume" title="Cases by day" className="panel-holographic">
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 4, right: 0, left: -28, bottom: 0 }}>
                <XAxis dataKey="label" stroke="oklch(0.7 0.14 240/0.5)" fontSize={9} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(0.7 0.14 240/0.5)" fontSize={9} tickLine={false} axisLine={false} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="v" radius={[0, 0, 0, 0]} name="Cases">
                  {barData.map((_, i) => (
                    <Cell key={i}
                      fill={i === 3 ? "oklch(0.7 0.14 240)" : "oklch(0.7 0.14 240 / 0.3)"}
                      style={i === 3 ? { filter: "drop-shadow(0 0 6px oklch(0.7 0.14 240 / 0.6))" } : {}}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </OrnateFrame>

        <OrnateFrame eyebrow="Soul Aggregate" title="Intent distribution" className="panel-holographic">
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="oklch(0.7 0.14 240 / 0.2)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "oklch(0.7 0.14 240 / 0.8)", fontSize: 9, fontFamily: "var(--font-serif)" }} />
                <Radar name="Intent" dataKey="A" stroke="oklch(0.7 0.14 240)" fill="oklch(0.7 0.14 240)" fillOpacity={0.18} strokeWidth={1.5} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </OrnateFrame>

        <OrnateFrame eyebrow="System Grid" title="Sector heat map" className="panel-holographic">
          <div className="flex gap-1.5 flex-wrap">
            {heatData.map((v, i) => {
              const intensity = v / 100;
              return (
                <motion.div key={i}
                  animate={{ background: v > 70 ? `oklch(0.7 0.14 240 / ${0.4 + intensity * 0.6})` : `oklch(0.12 0.02 265 / ${0.4 + intensity * 0.3})` }}
                  transition={{ duration: 1 }}
                  className="heat-dot rounded-none border border-celestial/20"
                  title={`${v} load`}
                  style={{
                    boxShadow: v > 70 ? `0 0 8px oklch(0.7 0.14 240 / ${intensity * 0.8})` : "none",
                  }}
                />
              );
            })}
          </div>
        </OrnateFrame>
      </div>
    </div>
  );
}

/* ─── Dashboard header ─── */
function DashboardHeader() {
  const [dots, setDots] = useState("");
  useEffect(() => {
    const t = setInterval(() => setDots(d => d.length >= 3 ? "" : d + "."), 800);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-end justify-between gap-4 flex-wrap relative z-10">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <p className="font-serif text-[10px] tracking-[0.55em] text-celestial/75">— SYSTEM TERMINAL —</p>
          <span className="inline-flex items-center gap-1.5 text-[9px] tracking-[0.25em] text-celestial font-serif border border-celestial/40 px-2 py-0.5 shadow-[0_0_15px_oklch(0.7_0.14_240/0.3)] bg-celestial/5 rounded-none">
            <span className="w-1.5 h-1.5 rounded-none bg-celestial animate-pulse-celestial" />
            LIVE CONTINUOUS SCAN {dots}
          </span>
        </div>
        <h1 className="font-serif text-3xl md:text-5xl text-celestial leading-tight">Core Engine Online</h1>
        <p className="mt-2 text-celestial/70 max-w-xl text-sm font-mono tracking-wide">
          &gt; SYSTEM IS CLEANING OR DOING ITS WORKS_<br/>
          &gt; INDEXING QUEUE... CONTINUOUS UPDATES APPLIED.
        </p>
      </div>
      <div className="text-right space-y-1">
        <p className="font-serif text-xs text-celestial/70 tracking-widest">EPOCH · LATE FOURTH AGE</p>
        <div className="flex items-center justify-end gap-3">
          {[
            { label: "Active", value: "32", color: "text-celestial" },
            { label: "Indexed", value: "128", color: "text-celestial/60" },
          ].map(s => (
            <div key={s.label} className="text-center p-2 border border-celestial/20 bg-celestial/5">
              <p className={`font-serif text-lg ${s.color}`}>{s.value}</p>
              <p className="text-[8px] tracking-[0.25em] text-celestial/50 uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
