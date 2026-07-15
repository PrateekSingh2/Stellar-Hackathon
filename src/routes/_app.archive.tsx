import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { Search, Filter, ArrowUpDown, Archive } from "lucide-react";
import { OrnateFrame } from "@/components/verdictum/OrnateFrame";
import { souls as initialSouls, type Soul } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/archive")({
  head: () => ({ meta: [{ title: "Archive — VERDICTUM" }] }),
  component: ArchivePage,
});

function ArchivePage() {
  const [q, setQ] = useState("");
  const [sortDesc, setSortDesc] = useState(true);

  // We only want judged souls in the archive. 
  // In a real app this would fetch from a database. We'll use the mock data and generate a few more.
  const [archiveRecords, setArchiveRecords] = useState(() => {
    const judged = initialSouls.filter(s => s.status === "Judged");
    // duplicate some to make the archive look full
    return [...judged, ...judged.map(s => ({...s, id: s.id + "-copy", name: s.name + " (Echo)"}))];
  });

  const rows = useMemo(() => {
    return archiveRecords
      .filter(s => s.name.toLowerCase().includes(q.toLowerCase()) || s.species.toLowerCase().includes(q.toLowerCase()))
      .sort((a, b) => sortDesc ? b.complexity - a.complexity : a.complexity - b.complexity);
  }, [archiveRecords, q, sortDesc]);

  return (
    <div className="p-6 md:p-10 max-w-[1600px] mx-auto relative">
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none z-0" />

      <div className="flex items-end justify-between mb-6 flex-wrap gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <p className="font-serif text-[10px] tracking-[0.5em] text-gold/80">— THE ETERNAL RECORDS —</p>
          </div>
          <h1 className="mt-2 font-serif text-4xl md:text-5xl text-gradient-gold">Archive</h1>
          <p className="mt-2 text-muted-foreground font-mono tracking-wide text-sm">{rows.length} records found · Sealed and finalized.</p>
        </div>
      </div>

      <OrnateFrame className="panel-holographic relative z-10 border-gold/20">
        <div className="flex flex-wrap gap-3 mb-6 items-center">
          <div className="relative w-full sm:flex-1 sm:min-w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search archived names or species…"
              className="w-full pl-10 pr-3 py-2.5 rounded-none bg-background/50 border border-gold/30 focus:border-gold outline-none text-sm text-gold placeholder:text-gold/30 transition-colors shadow-[inset_0_0_10px_oklch(0.82_0.15_82/0.1)]" />
          </div>
          <button onClick={() => setSortDesc(v => !v)} className="ml-auto flex items-center gap-2 text-xs text-gold/60 hover:text-gold transition">
            <ArrowUpDown className="w-3.5 h-3.5" /> Complexity {sortDesc ? "↓" : "↑"}
          </button>
        </div>

        <div className="overflow-x-auto scrollbar-none border border-gold/20">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] tracking-[0.3em] text-gold/70 uppercase border-b border-gold/30 bg-gold/5">
                <th className="py-3 pl-4 pr-4">Soul</th>
                <th className="py-3 pr-4">Species</th>
                <th className="py-3 pr-4">Assigned Realm</th>
                <th className="py-3 pr-4">Complexity</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-4 text-right">Record</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence initial={false}>
                {rows.map((s, i) => (
                  <motion.tr 
                    key={s.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-gold/10 hover:bg-gold/5 group transition">
                    <td className="py-4 pl-4 pr-4">
                      <div className="flex items-center gap-3 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        <div className="w-9 h-9 rounded-none border border-gold/40 flex items-center justify-center font-serif text-gold text-sm bg-gradient-to-br from-gold/10 to-transparent shadow-[0_0_8px_oklch(0.82_0.15_82/0.2)]">
                          {s.name.split(" ").map(w => w[0]).slice(0, 2).join("")}
                        </div>
                        <div className="relative z-10">
                          <p className="font-serif text-parchment/95">{s.name}</p>
                          <p className="text-[11px] text-gold/60">{s.lifespan} · {s.epoch}</p>
                        </div>
                      </div>
                    </td>
                    <td className="pr-4 text-gold/70">{s.species}</td>
                    <td className="pr-4 text-parchment/80 font-serif italic">{s.realm || "Unknown Realm"}</td>
                    <td className="pr-4">
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-gold text-xs">{s.complexity}</span>
                      </div>
                    </td>
                    <td className="pr-4">
                      <span className="text-[9px] tracking-widest font-serif border px-2 py-1 rounded-none bg-background/50 text-muted-foreground border-border/40">SEALED</span>
                    </td>
                    <td className="pr-4 text-right">
                      <Link to="/case-review/$id" params={{ id: s.id }} className="inline-flex font-serif text-[10px] tracking-widest text-gold/80 hover:text-gold border border-gold/30 px-3 py-1.5 rounded-none transition hover:bg-gold/10 hover:shadow-[0_0_10px_oklch(0.82_0.15_82/0.4)]">
                        VIEW <Archive className="w-3 h-3 ml-1" />
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </OrnateFrame>
    </div>
  );
}
