import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, CheckCircle2, ShieldAlert, Zap } from "lucide-react";
import { OrnateFrame } from "@/pages/verdictum/OrnateFrame";
import { useState } from "react";

export const Route = createFileRoute("/_app/notifications")({
  head: () => ({ meta: [{ title: "Notifications — VERDICTUM" }] }),
  component: Notifications,
});

const initialNotifications = [
  { id: 1, type: "alert", title: "Timeline Integrity Warning", message: "A minor fracture detected in Sector 9. Awaiting Oracle review.", time: "4m ago", read: false },
  { id: 2, type: "system", title: "Index Rebalanced", message: "The soul queue has been successfully re-indexed across all active nodes.", time: "12m ago", read: false },
  { id: 3, type: "verdict", title: "High Priority Verdict", message: "Judge Cassian has completed the review of Kaelen Marr. Verdict: Realm of Restoration.", time: "1h ago", read: true },
  { id: 4, type: "system", title: "Archive Sync Complete", message: "Historical records from the Third Age have been synced to the main terminal.", time: "2h ago", read: true },
];

function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-6 md:p-10 max-w-[1200px] mx-auto relative min-h-screen">
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none z-0" />

      <div className="flex items-end justify-between mb-8 flex-wrap gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <p className="font-serif text-[10px] tracking-[0.5em] text-celestial/80">— SYSTEM ALERTS —</p>
            {unreadCount > 0 && (
              <span className="inline-flex items-center gap-1.5 text-[9px] tracking-[0.25em] text-ember font-serif border border-ember/40 px-2 py-0.5 shadow-[0_0_15px_oklch(0.62_0.19_30/0.3)] bg-ember/5 rounded-none">
                <span className="w-1.5 h-1.5 rounded-none bg-ember animate-pulse" />
                {unreadCount} UNREAD
              </span>
            )}
          </div>
          <h1 className="mt-2 font-serif text-4xl md:text-5xl text-celestial">Notifications</h1>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-[10px] font-serif tracking-widest text-celestial/70 hover:text-celestial border border-celestial/30 hover:border-celestial px-4 py-2 hover:bg-celestial/10 transition-all">
            MARK ALL AS READ
          </button>
        )}
      </div>

      <div className="space-y-4 relative z-10">
        <AnimatePresence>
          {notifications.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, height: 0, marginBottom: 0, transition: { duration: 0.2 } }}
              transition={{ delay: i * 0.05 }}
            >
              <OrnateFrame className={`p-4 md:p-6 transition-all duration-300 ${!n.read ? 'panel-holographic border-celestial/40' : 'panel-glass border-border/30 opacity-75'}`}>
                <div className="flex gap-4 sm:gap-6">
                  <div className="shrink-0 mt-1">
                    {n.type === 'alert' ? <ShieldAlert className="w-6 h-6 text-ember glow-ember" /> :
                      n.type === 'verdict' ? <CheckCircle2 className="w-6 h-6 text-gold glow-gold" /> :
                        <Zap className="w-6 h-6 text-celestial glow-celestial" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <h3 className={`font-serif text-lg tracking-wide ${!n.read ? 'text-parchment' : 'text-parchment/70'}`}>{n.title}</h3>
                      <span className="text-[10px] text-muted-foreground/80 tracking-widest uppercase">{n.time}</span>
                    </div>
                    <p className={`text-sm ${!n.read ? 'text-muted-foreground' : 'text-muted-foreground/60'}`}>{n.message}</p>
                  </div>
                  <div className="shrink-0 pl-4 border-l border-border/30 flex items-center justify-center">
                    <button onClick={() => clearNotification(n.id)} className="text-muted-foreground/50 hover:text-ember transition-colors text-[10px] uppercase tracking-widest font-serif">
                      Dismiss
                    </button>
                  </div>
                </div>
              </OrnateFrame>
            </motion.div>
          ))}
          {notifications.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center">
              <Bell className="w-12 h-12 text-muted-foreground/20 mx-auto mb-4" />
              <p className="font-serif text-muted-foreground tracking-widest text-sm uppercase">No pending alerts</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
