import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { OrnateFrame } from "@/components/verdictum/OrnateFrame";
import { souls, type Soul } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/soul-queue")({
  head: () => ({ meta: [{ title: "Soul Queue — VERDICTUM" }, { name: "description", content: "Every soul awaiting the bench, indexed and searchable." }] }),
  component: SoulQueue,
});

function SoulQueue() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("All");
  const [sortDesc, setSortDesc] = useState(true);

  const rows = useMemo(() => {
    return souls
      .filter(s => (status === "All" ? true : s.status === status))
      .filter(s => s.name.toLowerCase().includes(q.toLowerCase()) || s.species.toLowerCase().includes(q.toLowerCase()))
      .sort((a, b) => sortDesc ? b.complexity - a.complexity : a.complexity - b.complexity);
  }, [q, status, sortDesc]);

  return (
    <div className="p-6 md:p-10 max-w-[1600px] mx-auto">
      <div className="flex items-end justify-between mb-6 flex-wrap gap-4">
        <div>
          <p className="font-serif text-[10px] tracking-[0.5em] text-gold/80">— SOUL QUEUE —</p>
          <h1 className="mt-2 font-serif text-4xl md:text-5xl text-gradient-gold">Awaiting Judgement</h1>
          <p className="mt-2 text-muted-foreground">{rows.length} souls of {souls.length} · sorted by complexity.</p>
        </div>
      </div>

      <OrnateFrame>
        <div className="flex flex-wrap gap-3 mb-6 items-center">
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by name or species…"
              className="w-full pl-10 pr-3 py-2.5 rounded bg-background/50 border border-border focus:border-gold/50 outline-none text-sm" />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            {["All", "Pending", "In Review", "Judged", "Deferred"].map(s => (
              <button key={s} onClick={() => setStatus(s)}
                className={`px-3 py-1.5 rounded text-xs font-serif tracking-wider transition border ${status === s ? "bg-gold/15 text-gold border-gold/50" : "border-border text-muted-foreground hover:border-gold/30 hover:text-gold"}`}>
                {s}
              </button>
            ))}
          </div>
          <button onClick={() => setSortDesc(v => !v)} className="ml-auto flex items-center gap-2 text-xs text-muted-foreground hover:text-gold transition">
            <ArrowUpDown className="w-3.5 h-3.5" /> Complexity {sortDesc ? "↓" : "↑"}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] tracking-[0.3em] text-gold/70 uppercase border-b border-border">
                <th className="py-3 pr-4">Soul</th>
                <th className="py-3 pr-4">Species</th>
                <th className="py-3 pr-4">Death</th>
                <th className="py-3 pr-4">Complexity</th>
                <th className="py-3 pr-4">Priority</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((s, i) => <Row key={s.id} s={s} i={i} />)}
            </tbody>
          </table>
        </div>
      </OrnateFrame>
    </div>
  );
}

function Row({ s, i }: { s: Soul; i: number }) {
  return (
    <motion.tr initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
      className="border-b border-border/40 hover:bg-gold/5 group transition">
      <td className="py-4 pr-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center font-serif text-gold text-sm bg-gradient-to-br from-gold/10 to-transparent">
            {s.name.split(" ").map(w => w[0]).slice(0, 2).join("")}
          </div>
          <div>
            <p className="font-serif text-parchment/95">{s.name}</p>
            <p className="text-[11px] text-muted-foreground">{s.lifespan} · {s.epoch}</p>
          </div>
        </div>
      </td>
      <td className="pr-4 text-muted-foreground">{s.species}</td>
      <td className="pr-4 text-muted-foreground">{s.deathTime}</td>
      <td className="pr-4">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-24 bg-secondary rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${s.complexity}%` }} transition={{ delay: 0.2 + i * 0.04 }}
              className="h-full bg-gradient-gold" />
          </div>
          <span className="font-serif text-gold text-xs">{s.complexity}</span>
        </div>
      </td>
      <td className="pr-4"><PriorityBadge p={s.priority} /></td>
      <td className="pr-4"><StatusBadge s={s.status} /></td>
      <td className="pr-2 text-right">
        <Link to="/case-review/$id" params={{ id: s.id }} className="font-serif text-xs tracking-widest text-gold/80 hover:text-gold border border-gold/30 px-3 py-1.5 rounded transition hover:bg-gold/10">REVIEW →</Link>
      </td>
    </motion.tr>
  );
}

function StatusBadge({ s }: { s: Soul["status"] }) {
  const map = { Pending: "text-gold border-gold/40", "In Review": "text-celestial border-celestial/40", Judged: "text-parchment border-border", Deferred: "text-ember border-ember/40" } as const;
  return <span className={`text-[10px] tracking-widest font-serif border px-2 py-1 rounded ${map[s]}`}>{s.toUpperCase()}</span>;
}
function PriorityBadge({ p }: { p: Soul["priority"] }) {
  const map = { Low: "text-muted-foreground", Standard: "text-parchment", High: "text-gold", Cosmic: "text-ember" } as const;
  return <span className={`text-xs font-serif tracking-wider ${map[p]}`}>{p === "Cosmic" ? "◈ COSMIC" : p}</span>;
}
