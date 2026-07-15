import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Terminal, Shield, Scale } from "lucide-react";
import { OrnateFrame } from "@/components/verdictum/OrnateFrame";

export const Route = createFileRoute("/_app/codex-help")({
  head: () => ({ meta: [{ title: "Codex Help — VERDICTUM" }] }),
  component: CodexHelp,
});

function CodexHelp() {
  return (
    <div className="p-6 md:p-10 max-w-[1200px] mx-auto relative min-h-screen">
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none z-0" />

      <div className="flex items-end justify-between mb-8 flex-wrap gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <p className="font-serif text-[10px] tracking-[0.5em] text-celestial/80">— SYSTEM DOCUMENTATION —</p>
          </div>
          <h1 className="mt-2 font-serif text-4xl md:text-5xl text-celestial">Codex Manual</h1>
          <p className="mt-2 text-celestial/70 font-mono tracking-wide text-sm">
            &gt; ACCESSING KNOWLEDGE BASE...<br/>
            &gt; TRIBUNAL PROCEDURES VER 4.0 LOADED.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 relative z-10">
        <div className="lg:col-span-1 space-y-4">
          <OrnateFrame className="panel-holographic border-celestial/30">
            <h3 className="font-serif text-gold text-lg mb-4 tracking-widest uppercase text-center border-b border-gold/20 pb-3">Directory</h3>
            <ul className="space-y-2 font-serif text-sm tracking-wide text-celestial/80">
              <li className="p-2 bg-celestial/10 border border-celestial/30 text-celestial cursor-pointer">1. Tribunal Operations</li>
              <li className="p-2 hover:bg-celestial/5 hover:text-celestial cursor-pointer transition-colors">2. Soul Complexity Metrics</li>
              <li className="p-2 hover:bg-celestial/5 hover:text-celestial cursor-pointer transition-colors">3. Realm Assignments</li>
              <li className="p-2 hover:bg-celestial/5 hover:text-celestial cursor-pointer transition-colors">4. System Anomalies</li>
            </ul>
          </OrnateFrame>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <OrnateFrame className="panel-glass">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-5 h-5 text-gold" />
              <h2 className="font-serif text-2xl text-gradient-gold">1. Tribunal Operations</h2>
            </div>
            <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
              <p>
                The Cosmic Tribunal is responsible for the continuous indexing, evaluation, and assignment of souls post-termination. The process is entirely automated through the Weave, with anomalous cases being elevated to a Judge for manual review.
              </p>
              <p>
                As a Judge, your primary interface is the <strong>Dashboard</strong>, which provides a real-time overview of Universe Health and the current processing load. The <strong>Soul Queue</strong> contains all pending records requiring attention.
              </p>
              <div className="p-4 bg-background/50 border border-border/50 rounded-sm font-mono text-[11px] text-celestial/70">
                &gt; RULE 1.1: ALL DECISIONS ARE FINAL.<br/>
                &gt; RULE 1.2: DO NOT ATTEMPT TO ALTER THE TIMELINE DIRECTLY.
              </div>
            </div>
          </OrnateFrame>

          <OrnateFrame className="panel-glass">
            <div className="flex items-center gap-3 mb-4">
              <Terminal className="w-5 h-5 text-celestial" />
              <h2 className="font-serif text-2xl text-celestial">2. Soul Complexity Metrics</h2>
            </div>
            <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
              <p>
                Complexity is calculated by the Oracle using a 100-point scale. It aggregates factors such as lifespan, ripple effect magnitude, and intent distribution (Love vs. Greed vs. Fear).
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong className="text-parchment/80">0-30:</strong> Simple existences. Often judged automatically.</li>
                <li><strong className="text-parchment/80">31-70:</strong> Standard complexity. May require brief review.</li>
                <li><strong className="text-parchment/80">71-100:</strong> High complexity. Requires deep ripple analysis.</li>
              </ul>
            </div>
          </OrnateFrame>

          <OrnateFrame className="panel-glass border-ember/20">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-ember" />
              <h2 className="font-serif text-2xl text-ember">4. System Anomalies</h2>
            </div>
            <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
              <p>
                Occasionally, the timeline fractures or a soul's record is corrupted by void interference. These will appear in your Notifications panel.
              </p>
              <p className="text-ember/80">
                If you encounter a Class-4 Anomaly (Cosmic Priority), initiate the Ascendant Protocol immediately and do not attempt to parse the memory fragments manually.
              </p>
            </div>
          </OrnateFrame>
        </div>
      </div>
    </div>
  );
}
