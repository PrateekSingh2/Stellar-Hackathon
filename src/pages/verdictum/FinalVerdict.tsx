import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, RotateCw, MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const realms = ["Ascendant Gardens", "Realm of Restoration", "The Long Silence", "The Fifth Return", "The Undreamt"];

export function FinalVerdict({ soulName }: { soulName: string }) {
  const [open, setOpen] = useState(false);
  const [realm, setRealm] = useState(realms[1]);
  const [confirmed, setConfirmed] = useState(false);

  function approve() {
    setConfirmed(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmed(false);
      toast.success(`${soulName} → ${realm}. The name is spoken.`);
    }, 1800);
  }

  return (
    <>
      <div className="grid md:grid-cols-3 gap-4">
        <VerdictButton onClick={() => setOpen(true)} icon={CheckCircle2} label="Approve Verdict" desc="Speak the realm and seal the record." primary />
        <VerdictButton onClick={() => toast("Deferred. The soul remains in queue.")} icon={RotateCw} label="Request Further Review" desc="Return the case to the higher bench." />
        <div className="panel-glass rounded p-4">
          <p className="text-[10px] tracking-[0.4em] text-gold/80 font-serif uppercase flex items-center gap-2"><MapPin className="w-3 h-3" /> Assign Realm</p>
          <select value={realm} onChange={e => setRealm(e.target.value)}
            className="mt-3 w-full bg-background border border-border rounded px-3 py-2 text-sm focus:border-gold/50 outline-none">
            {realms.map(r => <option key={r}>{r}</option>)}
          </select>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="panel-engraved border-gold/40 max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl text-gradient-gold text-center">Seal the Verdict</DialogTitle>
          </DialogHeader>
          <AnimatePresence mode="wait">
            {!confirmed ? (
              <motion.div key="ask" exit={{ opacity: 0, scale: 0.95 }} className="text-center">
                <p className="text-parchment/80 font-display italic text-lg">You will assign <span className="text-gold">{soulName}</span> to</p>
                <p className="mt-2 font-serif text-2xl text-gradient-gold">{realm}</p>
                <p className="mt-4 text-xs text-muted-foreground">Once spoken, the name cannot be withdrawn.</p>
                <div className="mt-6 flex gap-3">
                  <button onClick={() => setOpen(false)} className="flex-1 py-2.5 rounded border border-border text-sm hover:bg-accent transition">Withdraw</button>
                  <button onClick={approve} className="flex-1 py-2.5 rounded bg-gradient-gold text-primary-foreground font-serif tracking-wider text-sm shadow-gold">Speak the name</button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="ok" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="mx-auto w-20 h-20 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold animate-pulse-gold">
                  <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
                </motion.div>
                <p className="mt-4 font-serif text-xl text-gradient-gold">The Codex has recorded it.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  );
}

function VerdictButton({ icon: Icon, label, desc, onClick, primary }: { icon: any; label: string; desc: string; onClick: () => void; primary?: boolean }) {
  return (
    <motion.button whileHover={{ y: -2 }} onClick={onClick}
      className={`text-left p-4 rounded border transition ${primary ? "border-gold/50 bg-gradient-to-br from-gold/15 to-transparent hover:shadow-gold" : "border-border hover:border-gold/30 panel-glass"}`}>
      <div className="flex items-center gap-2">
        <Icon className={`w-4 h-4 ${primary ? "text-gold" : "text-parchment/80"}`} strokeWidth={1.4} />
        <p className={`font-serif tracking-wider ${primary ? "text-gold" : "text-parchment"}`}>{label}</p>
      </div>
      <p className="mt-1.5 text-xs text-muted-foreground">{desc}</p>
    </motion.button>
  );
}
