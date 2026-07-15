import { Suspense } from "react";
import { motion } from "framer-motion";
import { Scale, Gavel, Globe, ChevronDown } from "lucide-react";
import CosmicBackground from "./components/CosmicBackground";

// ─── Framer Motion variants ──────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", delay },
  }),
};

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-2"
      >
        <Scale className="text-violet-400" size={22} strokeWidth={1.5} />
        <span
          className="text-lg font-bold tracking-widest uppercase"
          style={{ fontFamily: "var(--font-display)", color: "var(--color-star)" }}
        >
          Verdictverse
        </span>
      </motion.div>

      {/* Links */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="hidden md:flex items-center gap-8"
      >
        {["Cases", "Ripple Map", "Analytics", "About"].map((label) => (
          <button
            key={label}
            className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200 cursor-pointer"
          >
            {label}
          </button>
        ))}
        <button
          id="cta-connect"
          className="glass px-4 py-2 text-sm font-semibold text-violet-300 hover:text-white hover:border-violet-500/50 transition-all duration-300 rounded-lg"
          style={{ borderRadius: "0.5rem" }}
        >
          Connect Wallet
        </button>
      </motion.div>
    </nav>
  );
}

// ─── Stats bar ───────────────────────────────────────────────────────────────
const stats = [
  { label: "Active Cases",   value: "14,823", icon: Gavel  },
  { label: "Jurisdictions",  value: "193",    icon: Globe  },
  { label: "Verdicts Today", value: "3,412",  icon: Scale  },
];

function StatsBar() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={0.9}
      className="flex flex-wrap justify-center gap-6 mt-14"
    >
      {stats.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="glass flex items-center gap-3 px-6 py-3"
        >
          <Icon size={16} className="text-violet-400" strokeWidth={1.5} />
          <div>
            <p className="text-xs text-white/40 uppercase tracking-widest">{label}</p>
            <p className="text-lg font-bold text-white">{value}</p>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

// ─── 3D Canvas placeholder ───────────────────────────────────────────────────
function RippleMapPlaceholder() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={1.1}
      id="ripple-map"
      className="glass relative w-full max-w-4xl mx-auto mt-16"
      style={{ height: "420px" }}
    >
      {/* Glow ring */}
      <div
        className="absolute inset-0 rounded-[1rem] pointer-events-none"
        style={{
          boxShadow:
            "0 0 60px rgba(124,58,237,0.25), 0 0 120px rgba(6,182,212,0.1) inset",
        }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center p-8">
        {/* Animated orbit ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 rounded-full border border-violet-500/40"
          style={{
            borderTopColor: "rgba(124,58,237,0.9)",
            borderRightColor: "rgba(6,182,212,0.6)",
          }}
        />
        <p className="text-sm font-medium text-white/50 mt-2">
          Ripple Effect Map — 3D Node Graph
        </p>
        <p className="text-xs text-white/30 max-w-xs">
          @react-three/fiber canvas will mount here.<br />
          Each node is a jurisdiction; edges are verdict correlations.
        </p>
        <span
          className="mt-2 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest"
          style={{
            background: "rgba(124,58,237,0.15)",
            border: "1px solid rgba(124,58,237,0.4)",
            color: "#a78bfa",
          }}
        >
          Coming Soon
        </span>
      </div>
    </motion.div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center pt-20">
      {/* Badge */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.1}
        className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest"
        style={{
          background: "rgba(124,58,237,0.12)",
          border: "1px solid rgba(124,58,237,0.35)",
          color: "#a78bfa",
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
        Hackathon Build — Live Demo
      </motion.div>

      {/* Headline */}
      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.2}
        className="gradient-headline text-5xl sm:text-7xl lg:text-8xl font-extrabold leading-none tracking-tight"
        style={{ fontFamily: "var(--font-display)" }}
      >
        The Verdictverse
      </motion.h1>

      {/* Sub-headline */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.4}
        className="mt-6 max-w-xl text-base sm:text-lg text-white/55 leading-relaxed"
      >
        Every verdict sends a ripple through the cosmos of justice.
        Explore case outcomes, jurisdiction correlations, and legal precedents
        in an immersive 3D universe.
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.6}
        className="mt-10 flex flex-wrap justify-center gap-4"
      >
        <button
          id="cta-explore"
          className="px-7 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
            boxShadow: "0 0 30px rgba(124,58,237,0.45)",
          }}
          onMouseEnter={(e) =>
            ((e.target as HTMLButtonElement).style.boxShadow =
              "0 0 50px rgba(124,58,237,0.7)")
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLButtonElement).style.boxShadow =
              "0 0 30px rgba(124,58,237,0.45)")
          }
        >
          Explore the Universe
        </button>
        <button
          id="cta-view-map"
          className="glass px-7 py-3 rounded-xl text-sm font-semibold text-white/80 hover:text-white transition-all duration-300"
        >
          View Ripple Map
        </button>
      </motion.div>

      {/* Stats */}
      <StatsBar />

      {/* 3D placeholder */}
      <RippleMapPlaceholder />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="mt-16 flex flex-col items-center gap-2 text-white/25"
      >
        <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Layer 0: fixed 3D starfield background */}
      <Suspense fallback={null}>
        <CosmicBackground />
      </Suspense>

      {/* Layer 1: radial gradient overlays for depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(124,58,237,0.18) 0%, transparent 70%)," +
            "radial-gradient(ellipse 60% 40% at 80% 80%, rgba(6,182,212,0.08) 0%, transparent 60%)",
        }}
      />

      {/* Layer 2: UI */}
      <Navbar />
      <Hero />
    </div>
  );
}
