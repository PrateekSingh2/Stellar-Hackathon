import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Search } from "lucide-react";
import { OrnateFrame } from "@/components/verdictum/OrnateFrame";
import { souls } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/archive")({
  head: () => ({ meta: [{ title: "Archive — VERDICTUM" }, { name: "description", content: "Historical verdicts across every epoch of the Weave." }] }),
  component: Archive,
});

function Archive() {
  const [q, setQ] = useState("");
  const judged = souls.filter(s => s.status === "Judged").filter(s => s.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="p-6 md:p-10 max-w-[1400px] mx-auto space-y-8">
      <div>
        <p className="font-serif text-[10px] tracking-[0.5em] text-gold/80">— ARCHIVE —</p>
        <h1 className="mt-2 font-serif text-4xl md:text-5xl text-gradient-gold">The Codex Recalls</h1>
        <p className="mt-2 text-muted-foreground">Every verdict, indexed across all epochs. Search is instant; forgetting is impossible.</p>
      </div>

      <OrnateFrame>
        <div className="relative mb-6 max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search the archive…"
            className="w-full pl-10 pr-3 py-2.5 rounded bg-background/50 border border-border focus:border-gold/50 outline-none text-sm" />
        </div>

        {/* Timeline */}
        <div className="relative pl-6">
          <div className="absolute left-2 top-0 bottom-0 w-px" style={{ background: "linear-gradient(180deg, transparent, oklch(0.82 0.15 82 / 0.5), transparent)" }} />
          {judged.length === 0 && <p className="text-muted-foreground italic">No records match this sigil.</p>}
          {judged.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
              className="relative pb-8">
              <span className="absolute -left-[22px] top-1.5 w-3 h-3 rounded-full bg-gradient-gold shadow-gold border-2 border-background" />
              <p className="font-serif text-xs tracking-[0.3em] text-gold/80 uppercase">{s.deathTime} · {s.epoch}</p>
              <h3 className="font-serif text-xl text-gradient-gold mt-1">{s.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">Assigned to <span className="text-parchment">{s.realm}</span> · Complexity {s.complexity}</p>
            </motion.div>
          ))}
        </div>
      </OrnateFrame>
    </div>
  );
}
