import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { OrnateFrame } from "@/components/verdictum/OrnateFrame";
import { useAuthUser, signOut } from "@/lib/auth";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Settings — VERDICTUM" }, { name: "description", content: "Judge preferences and profile." }] }),
  component: Settings,
});

function Settings() {
  const user = useAuthUser();
  const navigate = useNavigate();
  const [anim, setAnim] = useState(true);
  const [sound, setSound] = useState(false);
  const [dark, setDark] = useState(true);

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8">
      <div>
        <p className="font-serif text-[10px] tracking-[0.5em] text-gold/80">— SETTINGS —</p>
        <h1 className="mt-2 font-serif text-4xl md:text-5xl text-gradient-gold">Judge Preferences</h1>
      </div>

      <OrnateFrame eyebrow="Profile" title="Your inscription">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full border border-gold/50 flex items-center justify-center font-serif text-gold text-2xl bg-gradient-to-br from-gold/15 to-transparent shadow-gold">
            {user?.name?.split(" ").map(w => w[0]).slice(0, 2).join("") || "J"}
          </div>
          <div>
            <p className="font-serif text-2xl text-parchment">{user?.name}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
            <p className="text-[11px] tracking-widest text-gold/80 mt-1">SIGIL VERIFIED · BENCH XII</p>
          </div>
        </div>
      </OrnateFrame>

      <OrnateFrame eyebrow="Rites" title="Sensations of the interface">
        <div className="space-y-4">
          <ToggleRow label="Cosmic theme" desc="Dark charcoal void, golden ornament." checked={dark} onChange={setDark} />
          <ToggleRow label="Animations" desc="Cinematic transitions, floating motes, celestial pulses." checked={anim} onChange={setAnim} />
          <ToggleRow label="Sound of the Weave" desc="Subtle bells, page-turn parchment, ceremonial gong." checked={sound} onChange={setSound} />
        </div>
      </OrnateFrame>

      <OrnateFrame eyebrow="Passage" title="Depart the bench">
        <p className="text-sm text-muted-foreground mb-4">Ending your session locks the Codex to your sigil. Re-entry requires the rite.</p>
        <button onClick={() => { signOut(); toast.success("The bench is empty."); navigate({ to: "/auth" }); }}
          className="px-6 py-2.5 rounded border border-ember/50 text-ember font-serif tracking-wider text-sm hover:bg-ember/10 transition">
          Depart Tribunal
        </button>
      </OrnateFrame>
    </div>
  );
}

function ToggleRow({ label, desc, checked, onChange }: { label: string; desc: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-border/40 last:border-0">
      <div>
        <p className="font-serif text-parchment">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
