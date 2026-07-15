import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { Search, Filter, ArrowUpDown, ArrowRight } from "lucide-react";
import { OrnateFrame } from "@/components/verdictum/OrnateFrame";
import { souls as initialSouls, type Soul } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/soul-queue")({
  head: () => ({ meta: [{ title: "Soul Queue — VERDICTUM" }, { name: "description", content: "Every soul awaiting the bench, indexed and searchable." }] }),
  component: SoulQueue,
});

function SoulQueue() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("All");
  const [sortDesc, setSortDesc] = useState(true);
  const [dots, setDots] = useState("");

  useEffect(() => {
    const t = setInterval(() => setDots(d => d.length >= 3 ? "" : d + "."), 800);
    return () => clearInterval(t);
  }, []);

  const rows = useMemo(() => {
    return initialSouls
      .filter(s => (status === "All" ? true : s.status === status))
      .filter(s => s.name.toLowerCase().includes(q.toLowerCase()) || s.species.toLowerCase().includes(q.toLowerCase()))
      .sort((a, b) => sortDesc ? b.complexity - a.complexity : a.complexity - b.complexity);
  }, [q, status, sortDesc]);

  return (
    <div className="p-6 md:p-10 max-w-[1600px] mx-auto relative">
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none z-0" />

      <div className="flex items-end justify-between mb-6 flex-wrap gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <p className="font-serif text-[10px] tracking-[0.5em] text-celestial/80">— SOUL QUEUE —</p>
            <span className="inline-flex items-center gap-1.5 text-[9px] tracking-[0.25em] text-celestial font-serif border border-celestial/40 px-2 py-0.5 shadow-[0_0_15px_oklch(0.7_0.14_240/0.3)] bg-celestial/5 rounded-none">
              <span className="w-1.5 h-1.5 rounded-none bg-celestial animate-pulse-celestial" />
              INDEXING {dots}
            </span>
          </div>
          <h1 className="mt-2 font-serif text-4xl md:text-5xl text-celestial">Awaiting Judgement</h1>
          <p className="mt-2 text-celestial/70 font-mono tracking-wide text-sm">{rows.length} records found · Real-time indexing.</p>
        </div>
      </div>

      <OrnateFrame className="panel-holographic relative z-10 border-celestial/30">
        <div className="flex flex-wrap gap-3 mb-6 items-center">
          <div className="relative w-full sm:flex-1 sm:min-w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-celestial/50" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by name or species…"
              className="w-full pl-10 pr-3 py-2.5 rounded-none bg-background/50 border border-celestial/30 focus:border-celestial outline-none text-sm text-celestial placeholder:text-celestial/30 transition-colors shadow-[inset_0_0_10px_oklch(0.7_0.14_240/0.1)]" />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-celestial/50 hidden sm:block" />
            {["All", "Pending", "In Review", "Judged", "Deferred"].map(s => (
              <button key={s} onClick={() => setStatus(s)}
                className={`px-3 py-1.5 rounded-none text-xs font-serif tracking-wider transition border ${status === s ? "bg-celestial/15 text-celestial border-celestial shadow-[0_0_10px_oklch(0.7_0.14_240/0.3)]" : "border-celestial/20 text-celestial/60 hover:border-celestial/50 hover:text-celestial"}`}>
                {s}
              </button>
            ))}
          </div>
          <button onClick={() => setSortDesc(v => !v)} className="ml-auto flex items-center gap-2 text-xs text-celestial/60 hover:text-celestial transition">
            <ArrowUpDown className="w-3.5 h-3.5" /> Complexity {sortDesc ? "↓" : "↑"}
          </button>
        </div>

        <div className="overflow-x-auto scrollbar-none border border-celestial/20">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] tracking-[0.3em] text-celestial/70 uppercase border-b border-celestial/30 bg-celestial/5">
                <th className="py-3 pl-4 pr-4">Soul</th>
                <th className="py-3 pr-4">Species</th>
                <th className="py-3 pr-4">Death</th>
                <th className="py-3 pr-4">Complexity</th>
                <th className="py-3 pr-4">Priority</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence initial={false}>
                {rows.map((s) => <Row key={s.id} s={s} />)}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </OrnateFrame>
    </div>
  );
}

function Row({ s }: { s: Soul }) {
  return (
    <motion.tr
      initial={{ opacity: 0, x: -20, backgroundColor: "oklch(0.7 0.14 240 / 0.1)" }}
      animate={{ opacity: 1, x: 0, backgroundColor: "transparent" }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{ duration: 0.4 }}
      className="border-b border-celestial/10 hover:bg-celestial/5 group transition">
      <td className="py-4 pl-4 pr-4">
        <div className="flex items-center gap-3 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-celestial/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <div className="w-9 h-9 rounded-none border border-celestial/40 flex items-center justify-center font-serif text-celestial text-sm bg-gradient-to-br from-celestial/10 to-transparent shadow-[0_0_8px_oklch(0.7_0.14_240/0.2)]">
            {s.name.split(" ").map(w => w[0]).slice(0, 2).join("")}
          </div>
          <div className="relative z-10">
            <p className="font-serif text-parchment/95">{s.name}</p>
            <p className="text-[11px] text-celestial/60">{s.lifespan} · {s.epoch}</p>
          </div>
        </div>
      </td>
      <td className="pr-4 text-celestial/70">{s.species}</td>
      <td className="pr-4 text-celestial/70">{s.deathTime}</td>
      <td className="pr-4">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-24 bg-background border border-celestial/20 rounded-none overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${s.complexity}%` }} transition={{ duration: 1 }}
              className="h-full bg-celestial shadow-[0_0_8px_oklch(0.7_0.14_240)]" />
          </div>
          <span className="font-serif text-celestial text-xs">{s.complexity}</span>
        </div>
      </td>
      <td className="pr-4"><PriorityBadge p={s.priority} /></td>
      <td className="pr-4"><StatusBadge s={s.status} /></td>
      <td className="pr-4 text-right">
        <Link to="/case-review/$id" params={{ id: s.id }} className="inline-flex font-serif text-[10px] tracking-widest text-celestial/80 hover:text-celestial border border-celestial/30 px-3 py-1.5 rounded-none transition hover:bg-celestial/10 hover:shadow-[0_0_10px_oklch(0.7_0.14_240/0.4)]">
          REVIEW <ArrowRight className="w-3 h-3 ml-1" />
        </Link>
      </td>
    </motion.tr>
  );
}

function StatusBadge({ s }: { s: Soul["status"] }) {
  const map = { Pending: "text-gold border-gold/40 shadow-gold", "In Review": "text-celestial border-celestial/40 shadow-celestial", Judged: "text-parchment border-border", Deferred: "text-ember border-ember/40 shadow-ember" } as const;
  return <span className={`text-[9px] tracking-widest font-serif border px-2 py-1 rounded-none bg-background/50 ${map[s]}`}>{s.toUpperCase()}</span>;
}
function PriorityBadge({ p }: { p: Soul["priority"] }) {
  const map = { Low: "text-celestial/50", Standard: "text-parchment/80", High: "text-gold", Cosmic: "text-ember" } as const;
  return <span className={`text-xs font-serif tracking-wider ${map[p]}`}>{p === "Cosmic" ? "◈ COSMIC" : p}</span>;
}
