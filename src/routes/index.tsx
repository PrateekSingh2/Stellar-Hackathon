import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AmbientBackground } from "@/components/verdictum/AmbientBackground";
import { Sigil } from "@/components/verdictum/OrnateFrame";
import { ArrowRight, Scale, Eye, Clock } from "lucide-react";

export const Route = createFileRoute("/")({ component: Landing });

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <AmbientBackground />

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between px-6 md:px-12 pt-6">
        <div className="flex items-center gap-3">
          <Sigil />
          <span className="font-serif text-gold tracking-[0.35em] text-sm">VERDICTUM</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.25em] text-muted-foreground">
          <a href="#pillars" className="hover:text-gold transition">DOCTRINE</a>
          <a href="#tribunal" className="hover:text-gold transition">TRIBUNAL</a>
          <a href="#codex" className="hover:text-gold transition">CODEX</a>
        </nav>
        <Link to="/auth" className="font-serif text-sm text-gold border border-gold/40 px-4 py-2 rounded hover:bg-gold/10 transition tracking-wider">Enter</Link>
      </header>

      {/* Hero */}
      <section className="relative z-10 px-6 md:px-12 pt-20 md:pt-28 pb-24 max-w-6xl mx-auto text-center">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="font-serif text-[10px] md:text-xs tracking-[0.6em] text-gold/80">
          — THE COSMIC TRIBUNAL INTERFACE —
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: "easeOut" }}
          className="mt-6 font-serif text-6xl md:text-[9rem] leading-[0.95] text-gradient-gold"
          style={{ letterSpacing: "0.06em" }}
        >
          VERDICTUM
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }}
          className="mt-8 font-display italic text-lg md:text-2xl text-parchment/80 max-w-2xl mx-auto">
          Every conscious act, permanently recorded by reality itself.
          <br />No lawyers. No lies. No erasure. Only the verdict.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
          className="mt-12 flex items-center justify-center gap-4">
          <Link to="/auth"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-md bg-gradient-gold text-primary-foreground font-serif tracking-[0.3em] text-sm shadow-gold hover:shadow-[0_0_60px_oklch(0.82_0.15_82/0.6)] transition">
            ENTER TRIBUNAL
            <ArrowRight className="w-4 h-4 transition group-hover:translate-x-1" />
          </Link>
          <a href="#pillars" className="font-serif text-xs tracking-[0.35em] text-muted-foreground hover:text-gold transition">READ DOCTRINE ↓</a>
        </motion.div>

        {/* Central sigil */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2, duration: 1.4 }}
          className="mt-24 relative mx-auto w-[520px] max-w-full aspect-square"
        >
          <div className="absolute inset-0 rounded-full animate-pulse-gold" style={{ background: "radial-gradient(circle, oklch(0.82 0.15 82 / 0.15), transparent 60%)" }} />
          <svg viewBox="0 0 400 400" className="relative w-full h-full">
            <defs>
              <linearGradient id="ring" x1="0" x2="1"><stop offset="0" stopColor="oklch(0.9 0.13 85)" /><stop offset="1" stopColor="oklch(0.55 0.13 70)" /></linearGradient>
            </defs>
            <motion.g animate={{ rotate: 360 }} transition={{ duration: 90, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "200px 200px" }}>
              <circle cx="200" cy="200" r="180" stroke="url(#ring)" strokeWidth="0.5" fill="none" opacity="0.5" />
              <circle cx="200" cy="200" r="180" stroke="url(#ring)" strokeWidth="0.5" fill="none" opacity="0.5" strokeDasharray="2 8" />
            </motion.g>
            <motion.g animate={{ rotate: -360 }} transition={{ duration: 140, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "200px 200px" }}>
              <circle cx="200" cy="200" r="140" stroke="url(#ring)" strokeWidth="0.4" fill="none" strokeDasharray="1 6" />
            </motion.g>
            <circle cx="200" cy="200" r="100" stroke="url(#ring)" strokeWidth="0.6" fill="none" opacity="0.7" />
            <g transform="translate(200 200)">
              <path d="M0 -90 L4 -30 L60 -25 L4 -20 L0 90 L-4 -20 L-60 -25 L-4 -30 Z" fill="url(#ring)" opacity="0.8" />
              <path d="M-90 0 L-30 -4 L-25 -60 L-20 -4 L90 0 L-20 4 L-25 60 L-30 4 Z" fill="url(#ring)" opacity="0.4" />
              <circle r="6" fill="oklch(0.14 0.02 265)" stroke="url(#ring)" />
            </g>
          </svg>
        </motion.div>
      </section>

      {/* Pillars */}
      <section id="pillars" className="relative z-10 px-6 md:px-12 py-20 max-w-6xl mx-auto">
        <p className="text-center font-serif text-[10px] tracking-[0.5em] text-gold/80">— DOCTRINE —</p>
        <h2 className="mt-3 text-center font-serif text-4xl md:text-5xl text-gradient-gold">Three Pillars of the Weave</h2>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {[
            { icon: Eye, title: "Nothing is hidden", body: "Every intent, every hesitation, every unspoken word is inscribed the moment it is born." },
            { icon: Scale, title: "Nothing is lied about", body: "Testimony is not required. Reality remembers with a fidelity no soul can revise." },
            { icon: Clock, title: "Nothing is erased", body: "The Codex spans all epochs. A deed at the dawn of the First Age remains legible today." },
          ].map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              className="panel-glass rounded-lg p-6 relative ornate-corners">
              <span className="corner-tr" /><span className="corner-bl" />
              <p.icon className="w-6 h-6 text-gold" strokeWidth={1.4} />
              <h3 className="mt-4 font-serif text-xl text-gradient-gold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tribunal quote */}
      <section id="tribunal" className="relative z-10 px-6 py-24 max-w-4xl mx-auto text-center">
        <div className="divider-gold w-24 mx-auto mb-8" />
        <p className="font-display italic text-2xl md:text-3xl text-parchment/85 leading-relaxed">
          &ldquo;The Judges do not condemn. They read what is already written,
          and speak the name of the realm the soul has already chosen.&rdquo;
        </p>
        <p className="mt-6 font-serif text-[10px] tracking-[0.5em] text-gold/70">— FIRST CODEX, VERSE I —</p>
      </section>

      {/* CTA */}
      <section id="codex" className="relative z-10 px-6 pb-32 max-w-3xl mx-auto text-center">
        <div className="panel-engraved rounded-lg p-10 relative ornate-corners">
          <span className="corner-tr" /><span className="corner-bl" />
          <Sigil className="w-14 h-14 mx-auto" />
          <h3 className="mt-6 font-serif text-3xl text-gradient-gold">Take your seat at the Bench</h3>
          <p className="mt-3 text-muted-foreground">Cosmic Judges only. Your sigil will be verified against the Codex.</p>
          <Link to="/auth" className="mt-8 inline-flex items-center gap-3 px-8 py-3 rounded-md bg-gradient-gold text-primary-foreground font-serif tracking-[0.3em] text-sm shadow-gold hover:shadow-[0_0_60px_oklch(0.82_0.15_82/0.6)] transition">
            ENTER TRIBUNAL <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <p className="mt-10 text-[10px] tracking-[0.4em] text-muted-foreground">VERDICTUM · CODEX BUILD MMXXVI · ALL EPOCHS OBSERVED</p>
      </section>
    </div>
  );
}
