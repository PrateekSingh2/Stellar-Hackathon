import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { AmbientBackground } from "@/components/verdictum/AmbientBackground";
import { Sigil } from "@/components/verdictum/OrnateFrame";
import { ArrowRight, Scale, Eye, Clock, Star, Zap, Shield, Layers, Globe, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({ component: Landing });

/* ─── Animated counter ─── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      observer.disconnect();
      let start = 0;
      const step = target / 55;
      const tick = () => {
        start = Math.min(start + step, target);
        setVal(Math.floor(start));
        if (start < target) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/* ─── Ticker strip ─── */
const tickerItems = [
  "WEAVE INTEGRITY · NOMINAL",
  "24,812 SOULS INSCRIBED THIS CYCLE",
  "EPOCH · THIRD AGE · 1207.4",
  "TIMELINE FRACTURES · ZERO",
  "ORACLE CONFIDENCE · 97.3%",
  "48% ASCENDANT · 39% RESTORATION · 13% LONG SILENCE",
  "CODEX PULSE · STABLE",
  "NEW SOUL INSCRIBED · VAERISSA THORN",
];

function Ticker() {
  const repeated = [...tickerItems, ...tickerItems];
  return (
    <div className="ticker-wrap py-2 relative z-10">
      <div className="ticker-inner animate-ticker">
        {repeated.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 mx-8 font-serif text-[10px] tracking-[0.35em] text-gold/70 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-gold/60 inline-block shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Cosmic ring sigil ─── */
function CosmicRing() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.0, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto w-[420px] max-w-full aspect-square"
    >
      {/* Halo bloom */}
      <div className="absolute inset-0 rounded-full animate-halo"
        style={{ background: "radial-gradient(circle, oklch(0.82 0.15 82 / 0.18), oklch(0.70 0.14 240 / 0.06) 50%, transparent 70%)" }}
      />
      <svg viewBox="0 0 400 400" className="relative w-full h-full" fill="none">
        <defs>
          <linearGradient id="rng" x1="0" x2="1">
            <stop offset="0" stopColor="oklch(0.92 0.13 85)" />
            <stop offset="1" stopColor="oklch(0.52 0.13 70)" />
          </linearGradient>
          <linearGradient id="rngC" x1="0" x2="1">
            <stop offset="0" stopColor="oklch(0.80 0.14 240)" />
            <stop offset="1" stopColor="oklch(0.55 0.12 220)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        {/* Outer ring - gold slow */}
        <motion.g animate={{ rotate: 360 }} transition={{ duration: 100, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "200px 200px" }}>
          <circle cx="200" cy="200" r="188" stroke="url(#rng)" strokeWidth="0.6" opacity="0.5" />
          <circle cx="200" cy="200" r="188" stroke="url(#rng)" strokeWidth="0.5" opacity="0.3" strokeDasharray="3 12" />
          {/* Dot markers */}
          {[0,45,90,135,180,225,270,315].map(a => (
            <circle key={a} cx={200 + 188 * Math.cos(a * Math.PI / 180)} cy={200 + 188 * Math.sin(a * Math.PI / 180)}
              r="2.5" fill="oklch(0.88 0.12 85)" opacity="0.7" />
          ))}
        </motion.g>
        {/* Mid ring - celestial */}
        <motion.g animate={{ rotate: -360 }} transition={{ duration: 150, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "200px 200px" }}>
          <circle cx="200" cy="200" r="148" stroke="url(#rngC)" strokeWidth="0.5" opacity="0.45" strokeDasharray="2 8" />
          {[0, 60, 120, 180, 240, 300].map(a => (
            <circle key={a} cx={200 + 148 * Math.cos(a * Math.PI / 180)} cy={200 + 148 * Math.sin(a * Math.PI / 180)}
              r="2" fill="oklch(0.75 0.14 240)" opacity="0.6" />
          ))}
        </motion.g>
        {/* Inner ring */}
        <motion.g animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "200px 200px" }}>
          <circle cx="200" cy="200" r="106" stroke="url(#rng)" strokeWidth="0.7" opacity="0.6" />
          <circle cx="200" cy="200" r="106" stroke="url(#rng)" strokeWidth="1" opacity="0.2" strokeDasharray="1 20" />
        </motion.g>
        {/* Static solid ring */}
        <circle cx="200" cy="200" r="68" stroke="url(#rng)" strokeWidth="0.8" opacity="0.5" />
        {/* Center sigil */}
        <g transform="translate(200 200)" filter="url(#glow)">
          <path d="M0 -52 L3.5 -20 L48 -16 L3.5 -12 L0 52 L-3.5 -12 L-48 -16 L-3.5 -20 Z" fill="url(#rng)" opacity="0.9" />
          <path d="M-52 0 L-20 -3.5 L-16 -48 L-12 -3.5 L52 0 L-12 3.5 L-16 48 L-20 3.5 Z" fill="url(#rng)" opacity="0.35" />
          <circle r="8" fill="oklch(0.10 0.02 265)" stroke="url(#rng)" strokeWidth="1.5" />
          <circle r="3.5" fill="oklch(0.88 0.13 85)" opacity="0.9" />
        </g>
      </svg>
    </motion.div>
  );
}

/* ─── Pillar card ─── */
const pillars = [
  {
    icon: Eye,
    title: "Nothing is Hidden",
    body: "Every intent, every hesitation, every unspoken word is inscribed the moment it is born into the Weave.",
    stat: "100%",
    statLabel: "Capture fidelity",
    color: "gold",
  },
  {
    icon: Scale,
    title: "Nothing is Lied About",
    body: "Testimony is not required. Reality remembers with a precision no soul can revise or erase.",
    stat: "∞",
    statLabel: "Archive depth",
    color: "celestial",
  },
  {
    icon: Clock,
    title: "Nothing is Erased",
    body: "The Codex spans all epochs. A deed at the dawn of the First Age remains legible at any hour.",
    stat: "9 Ages",
    statLabel: "Timeline span",
    color: "ember",
  },
];

/* ─── Features marquee ─── */
const features = [
  { icon: Zap, label: "Oracle Analysis", desc: "AI-driven ripple mapping" },
  { icon: Shield, label: "Timeline Integrity", desc: "Zero fractures detected" },
  { icon: Layers, label: "Multi-Epoch Archive", desc: "9 ages of records" },
  { icon: Globe, label: "Cross-Realm Tracking", desc: "All known realms observed" },
  { icon: Star, label: "Cosmic Priority Queue", desc: "High-complexity sorting" },
  { icon: Scale, label: "Verdict Chambers", desc: "16 concurrent benches" },
];

function Landing() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -80]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AmbientBackground />

      {/* ── Sticky Navbar ── */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${navScrolled ? "py-3 panel-glass border-b border-gold/10" : "py-5 bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <motion.div className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <Sigil className="w-8 h-8" />
            <div className="leading-none">
              <span className="font-serif text-gold tracking-[0.4em] text-sm block">VERDICTUM</span>
              <span className="text-[8px] tracking-[0.3em] text-muted-foreground block mt-0.5">COSMIC TRIBUNAL</span>
            </div>
          </motion.div>

          <motion.nav className="hidden md:flex items-center gap-8 text-[10px] tracking-[0.28em] text-muted-foreground"
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            {["DOCTRINE", "TRIBUNAL", "CODEX", "ARCHIVE"].map((l, i) => (
              <a key={l} href={`#${l.toLowerCase()}`}
                className="hover:text-gold transition-colors duration-200 relative group">
                {l}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-gold group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </motion.nav>

          <motion.div className="flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <Link to="/auth"
              className="hidden sm:block font-serif text-[10px] tracking-[0.3em] text-muted-foreground hover:text-gold transition px-3 py-2">
              SIGN IN
            </Link>
            <Link to="/auth"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-gradient-gold text-primary-foreground font-serif tracking-[0.25em] text-[11px] shadow-gold overflow-hidden">
              <span className="relative z-10">ENTER</span>
              <ArrowRight className="w-3.5 h-3.5 relative z-10 transition-transform group-hover:translate-x-0.5" />
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(135deg, oklch(0.95 0.13 85), oklch(0.72 0.14 70))" }} />
            </Link>
          </motion.div>
        </div>
      </header>

      {/* ── Hero ── */}
      <motion.section style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 px-6 md:px-12 pt-36 md:pt-44 pb-20 max-w-7xl mx-auto">

        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full panel-glass border border-gold/25 mb-8">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse-gold" />
            <span className="font-serif text-[9px] tracking-[0.5em] text-gold/80 uppercase">Cosmic Tribunal Interface · Active</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[clamp(4rem,13vw,11rem)] leading-[0.9] tracking-[0.05em]"
          >
            <span className="text-gradient-gold">VERDIC</span><span className="text-parchment/90">TUM</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 1 }}
            className="mt-7 font-display italic text-lg md:text-2xl text-parchment/75 max-w-2xl mx-auto leading-relaxed">
            Every conscious act, permanently recorded by reality itself.<br />
            <span className="text-parchment/55">No lawyers. No lies. No erasure. Only the verdict.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link to="/auth"
              className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-lg bg-gradient-gold text-primary-foreground font-serif tracking-[0.3em] text-sm shadow-gold-lg overflow-hidden hover:shadow-[0_0_80px_oklch(0.82_0.15_82/0.7)] transition-all duration-300">
              <span className="relative z-10">ENTER TRIBUNAL</span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: "linear-gradient(135deg, oklch(0.96 0.13 88), oklch(0.74 0.14 72))" }} />
            </Link>
            <a href="#doctrine"
              className="inline-flex items-center gap-2 font-serif text-[11px] tracking-[0.35em] text-muted-foreground hover:text-gold transition-colors border border-border/60 hover:border-gold/30 px-6 py-4 rounded-lg hover:bg-gold/5">
              READ DOCTRINE
              <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
            </a>
          </motion.div>
        </div>

        {/* Cosmic Ring */}
        <div className="mt-16 md:mt-20">
          <CosmicRing />
        </div>
      </motion.section>

      {/* ── Live Ticker ── */}
      <div className="relative z-10">
        <Ticker />
      </div>

      {/* ── Universe Stats ── */}
      <section className="relative z-10 py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { label: "Souls Inscribed", value: 1204881, suffix: "", icon: Star },
            { label: "Verdicts Delivered", value: 847293, suffix: "", icon: Scale },
            { label: "Epochs Observed", value: 9, suffix: "", icon: Clock },
            { label: "Timeline Integrity", value: 99.7, suffix: "%", icon: Shield },
          ].map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="panel-glass rounded-xl p-5 text-center group hover:panel-glass-hover transition-all duration-400 ornate-corners relative">
              <span className="corner-tr" /><span className="corner-bl" />
              <s.icon className="w-5 h-5 text-gold mx-auto mb-3 group-hover:glow-gold transition-all" strokeWidth={1.3} />
              <p className="font-serif text-3xl md:text-4xl text-gradient-gold stat-number">
                <Counter target={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-[9px] tracking-[0.35em] text-muted-foreground uppercase">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Three Pillars ── */}
      <section id="doctrine" className="relative z-10 px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <motion.div className="text-center mb-14"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="font-serif text-[10px] tracking-[0.6em] text-gold/75 uppercase">— Doctrine —</p>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl text-gradient-gold">Three Pillars of the Weave</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            The Codex was not written by judges. It was woven into the fabric of reality at the moment of the First Thought.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="panel-glass rounded-xl p-7 relative ornate-corners group hover:panel-glass-hover transition-all duration-500 overflow-hidden">
              <span className="corner-tr" /><span className="corner-bl" />
              {/* BG glow */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: p.color === "gold"
                    ? "radial-gradient(ellipse at 30% 20%, oklch(0.82 0.15 82 / 0.12), transparent 60%)"
                    : p.color === "celestial"
                    ? "radial-gradient(ellipse at 30% 20%, oklch(0.70 0.14 240 / 0.12), transparent 60%)"
                    : "radial-gradient(ellipse at 30% 20%, oklch(0.62 0.19 30 / 0.12), transparent 60%)"
                }}
              />
              {/* Icon with ring */}
              <div className="relative w-12 h-12 mb-5">
                <div className={`absolute inset-0 rounded-full ${p.color === "gold" ? "animate-pulse-gold" : p.color === "celestial" ? "animate-pulse-celestial" : ""}`}
                  style={{
                    background: p.color === "gold" ? "oklch(0.82 0.15 82 / 0.1)"
                      : p.color === "celestial" ? "oklch(0.70 0.14 240 / 0.1)"
                      : "oklch(0.62 0.19 30 / 0.1)",
                    border: `1px solid ${p.color === "gold" ? "oklch(0.82 0.15 82 / 0.3)" : p.color === "celestial" ? "oklch(0.70 0.14 240 / 0.3)" : "oklch(0.62 0.19 30 / 0.3)"}`,
                  }} />
                <p.icon className={`w-5 h-5 absolute inset-0 m-auto ${p.color === "gold" ? "text-gold" : p.color === "celestial" ? "text-celestial" : "text-ember"}`} strokeWidth={1.4} />
              </div>
              <h3 className="font-serif text-xl text-gradient-gold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground/80 leading-relaxed">{p.body}</p>
              <div className="mt-5 pt-4 border-t border-border/40 flex items-center justify-between">
                <p className={`font-serif text-2xl ${p.color === "gold" ? "text-gradient-gold" : p.color === "celestial" ? "text-gradient-celestial" : "text-ember"}`}>{p.stat}</p>
                <p className="text-[9px] tracking-[0.3em] text-muted-foreground uppercase">{p.statLabel}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Features Row (horizontal scroll) ── */}
      <section className="relative z-10 py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10 text-center">
          <p className="font-serif text-[10px] tracking-[0.6em] text-gold/70 uppercase">— Capabilities —</p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl text-gradient-gold">The Tribunal's Arsenal</h2>
        </div>
        <div className="flex gap-5 px-6 md:px-12 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory">
          {features.map((f, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08 }}
              className="panel-glass rounded-xl p-5 min-w-[200px] snap-start group hover:panel-glass-hover transition-all duration-400 ornate-corners relative shrink-0">
              <span className="corner-tr" /><span className="corner-bl" />
              <f.icon className="w-5 h-5 text-gold mb-3 group-hover:glow-gold transition-all" strokeWidth={1.3} />
              <p className="font-serif text-sm text-parchment/90">{f.label}</p>
              <p className="mt-1 text-xs text-muted-foreground/70">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Tribunal Quote ── */}
      <section id="tribunal" className="relative z-10 px-6 py-28 max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          <div className="divider-gold w-32 mx-auto mb-10" />
          <Sigil className="w-12 h-12 mx-auto mb-8 opacity-60" />
          <p className="font-display italic text-2xl md:text-4xl text-parchment/85 leading-relaxed">
            &ldquo;The Judges do not condemn. They read what is already written,
            and speak the name of the realm the soul has already chosen.&rdquo;
          </p>
          <p className="mt-8 font-serif text-[10px] tracking-[0.55em] text-gold/60">— FIRST CODEX, VERSE I —</p>
          <div className="divider-gold w-32 mx-auto mt-10" />
        </motion.div>
      </section>

      {/* ── CTA ── */}
      <section id="codex" className="relative z-10 px-6 pb-36 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="panel-engraved rounded-2xl p-10 md:p-14 relative ornate-corners overflow-hidden animate-border-flow">
          <span className="corner-tr" /><span className="corner-bl" />
          {/* BG shimmer */}
          <div className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 0%, oklch(0.82 0.15 82 / 0.25), transparent 55%)" }}
          />
          <Sigil className="w-16 h-16 mx-auto relative z-10" />
          <h3 className="mt-6 font-serif text-3xl md:text-4xl text-gradient-gold relative z-10">Take your seat at the Bench</h3>
          <p className="mt-3 text-muted-foreground/80 relative z-10 max-w-md mx-auto">
            Cosmic Judges only. Your sigil will be verified against the Codex before entry is granted.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 relative z-10">
            <Link to="/auth"
              className="group inline-flex items-center gap-3 px-10 py-4 rounded-lg bg-gradient-gold text-primary-foreground font-serif tracking-[0.3em] text-sm shadow-gold-lg hover:shadow-[0_0_80px_oklch(0.82_0.15_82/0.65)] transition-all duration-300 overflow-hidden relative">
              ENTER TRIBUNAL <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <p className="mt-8 text-[9px] tracking-[0.45em] text-muted-foreground/50 relative z-10">
            VERDICTUM · CODEX BUILD MMXXVI · ALL EPOCHS OBSERVED
          </p>
        </motion.div>
      </section>
    </div>
  );
}
