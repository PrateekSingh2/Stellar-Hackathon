import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Scale, Users, ScrollText, Archive, Settings, LogOut, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useState } from "react";
import { signOut, useAuthUser } from "@/lib/auth";
import { Sigil } from "./OrnateFrame";
import { cn } from "@/lib/utils";

const items: { to: string; label: string; icon: typeof Scale; match?: string }[] = [
  { to: "/dashboard", label: "Tribunal", icon: Scale },
  { to: "/soul-queue", label: "Soul Queue", icon: Users },
  { to: "/case-review/sol-001", label: "Case Review", icon: ScrollText, match: "/case-review" },
  { to: "/archive", label: "Archive", icon: Archive },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: s => s.location.pathname });
  const user = useAuthUser();

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 78 : 264 }}
      transition={{ type: "spring", stiffness: 240, damping: 28 }}
      className="relative z-20 shrink-0 h-screen sticky top-0 border-r border-sidebar-border bg-sidebar/80 backdrop-blur-xl"
    >
      <div className="absolute inset-y-0 right-0 w-px" style={{ background: "linear-gradient(180deg, transparent, oklch(0.82 0.15 82 / 0.4), transparent)" }} />
      <div className="flex items-center gap-3 px-4 h-20 border-b border-sidebar-border">
        <Sigil className="w-9 h-9 shrink-0" />
        {!collapsed && (
          <div className="min-w-0">
            <p className="font-serif text-gold text-lg leading-none tracking-widest">VERDICTUM</p>
            <p className="text-[10px] tracking-[0.3em] text-muted-foreground mt-1">COSMIC TRIBUNAL</p>
          </div>
        )}
      </div>

      <nav className="p-3 space-y-1">
        {items.map(it => {
          const active = it.match ? pathname.startsWith(it.match) : pathname === it.to;
          const Icon = it.icon;
          return (
            <Link key={it.to} to={it.to as any} className="block">
              <motion.div
                whileHover={{ x: 3 }}
                className={cn(
                  "group relative flex items-center gap-3 px-3 py-2.5 rounded-md border border-transparent transition",
                  active
                    ? "bg-gradient-to-r from-gold/15 to-transparent border-gold/30 text-gold"
                    : "text-sidebar-foreground/80 hover:text-gold hover:border-gold/20 hover:bg-sidebar-accent/40"
                )}
              >
                {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[2px] bg-gradient-gold rounded-r-sm shadow-gold" />}
                <Icon className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                {!collapsed && <span className="font-serif tracking-wide text-sm">{it.label}</span>}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="divider-gold mx-4 my-2" />

      <div className="absolute bottom-0 inset-x-0 p-3 space-y-2">
        {!collapsed && user && (
          <div className="px-3 py-2 rounded-md bg-sidebar-accent/40 border border-sidebar-border">
            <p className="text-[10px] tracking-widest text-muted-foreground">JUDGE</p>
            <p className="font-serif text-gold text-sm truncate">{user.name}</p>
            <p className="text-[11px] text-muted-foreground truncate">{user.email}</p>
          </div>
        )}
        <button
          onClick={() => { signOut(); navigate({ to: "/auth" }); }}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground/70 hover:text-ember hover:bg-sidebar-accent/40 transition text-sm"
        >
          <LogOut className="w-4 h-4" strokeWidth={1.5} />
          {!collapsed && <span className="font-serif tracking-wide">Depart</span>}
        </button>
        <button
          onClick={() => setCollapsed(c => !c)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md text-muted-foreground hover:text-gold border border-sidebar-border hover:border-gold/30 transition text-xs"
        >
          {collapsed ? <ChevronsRight className="w-4 h-4" /> : <><ChevronsLeft className="w-4 h-4" /> collapse</>}
        </button>
      </div>
    </motion.aside>
  );
}
