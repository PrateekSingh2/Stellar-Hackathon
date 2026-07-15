import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { OrnateFrame } from "@/pages/verdictum/OrnateFrame";
import { LifeReplay } from "@/pages/verdictum/LifeReplay";
import { IntentRadar } from "@/pages/verdictum/IntentRadar";
import { RippleMap } from "@/pages/verdictum/RippleMap";
import { AlternateReality } from "@/pages/verdictum/AlternateReality";
import { OracleRecommendation } from "@/pages/verdictum/OracleRecommendation";
import { FinalVerdict } from "@/pages/verdictum/FinalVerdict";
import { souls } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/case-review/$id")({
  head: ({ params }) => ({ meta: [{ title: `Case Review · ${params.id} — VERDICTUM` }, { name: "description", content: "Life replay, intent analysis, ripple map and Oracle recommendation for the soul under review." }] }),
  component: CaseReview,
});

function CaseReview() {
  const { id } = Route.useParams();
  const soul = souls.find(s => s.id === id) ?? souls[0];

  return (
    <div className="p-6 md:p-10 max-w-[1600px] mx-auto space-y-8">
      {/* Case header */}
      <div>
        <Link to="/soul-queue" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-gold transition font-serif tracking-widest uppercase">
          <ChevronLeft className="w-3 h-3" /> Back to Queue
        </Link>
        <div className="mt-4 panel-engraved rounded-lg p-6 relative ornate-corners">
          <span className="corner-tr" /><span className="corner-bl" />
          <div className="flex items-start justify-between flex-wrap gap-6">
            <div className="flex items-center gap-5">
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }}
                className="w-24 h-24 rounded-full border-2 border-gold/50 flex items-center justify-center font-serif text-gold text-3xl bg-gradient-to-br from-gold/10 to-transparent shadow-gold">
                {soul.name.split(" ").map(w => w[0]).slice(0, 2).join("")}
              </motion.div>
              <div>
                <p className="font-serif text-[10px] tracking-[0.5em] text-gold/80 uppercase">Case File · {soul.id.toUpperCase()}</p>
                <h1 className="mt-1 font-serif text-3xl md:text-4xl text-gradient-gold">{soul.name}</h1>
                <p className="mt-1 text-muted-foreground text-sm">{soul.species} · {soul.lifespan} · {soul.epoch} · died {soul.deathTime}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <Meta label="Complexity" value={String(soul.complexity)} />
              <Meta label="Priority" value={soul.priority} />
              <Meta label="Status" value={soul.status} />
            </div>
          </div>
        </div>
      </div>

      <OrnateFrame eyebrow="I · Life Replay" title="The recorded life" subtitle="A traversal through the moments the Weave chose to preserve. Every point is a memory the soul cannot revise.">
        <LifeReplay />
      </OrnateFrame>

      <div className="grid xl:grid-cols-2 gap-6">
        <OrnateFrame eyebrow="II · Intent Analyzer" title="What moved the soul" subtitle="Motives read directly from intent-signatures.">
          <IntentRadar />
        </OrnateFrame>
        <OrnateFrame eyebrow="III · Ripple Effect" title="Consequence across generations" subtitle="One act, expanding outward. Hover the nodes.">
          <RippleMap />
        </OrnateFrame>
      </div>

      <OrnateFrame eyebrow="IV · Alternate Reality" title="Reality reimagined" subtitle="The life the soul did not live, projected from the branching point.">
        <AlternateReality />
      </OrnateFrame>

      <OrnateFrame eyebrow="V · Oracle Recommendation" title="The Oracle counsels" subtitle="An offering. Never a decree.">
        <OracleRecommendation />
      </OrnateFrame>

      <OrnateFrame eyebrow="VI · Final Verdict" title="The Judge speaks">
        <FinalVerdict soulName={soul.name} />
      </OrnateFrame>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-[80px]">
      <p className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase font-serif">{label}</p>
      <p className="mt-1 font-serif text-gold">{value}</p>
    </div>
  );
}
