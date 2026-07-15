import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scale, Users, ScrollText, Archive, Settings, LogOut,
  ChevronsLeft, ChevronsRight, Bell, HelpCircle, X
} from "lucide-react";
import { useState, useEffect } from "react";
import { signOut, useAuthUser } from "@/lib/auth";
import { Sigil } from "./OrnateFrame";
import { cn } from "@/lib/utils";

const items: { to: string; label: string; icon: typeof Scale; match?: string; badge?: number }[] = [
  { to: "/dashboard", label: "Tribunal", icon: Scale },
  { to: "/soul-queue", label: "Soul Queue", icon: Users, badge: 6 },
  { to: "/case-review/sol-001", label: "Case Review", icon: ScrollText, match: "/case-review" },
  { to: "/archive", label: "Archive", icon: Archive },
  { to: "/settings", label: "Settings", icon: Settings },
];

const secondaryItems = [
  { icon: Bell, label: "Notifications", badge: 2, to: "/notifications" },
  { icon: HelpCircle, label: "Codex Help", to: "/codex-help" },
];

function getInitials(name?: string | null) {
  if (!name) return "J";
  return name.split(" ").slice(0, 2).map(p => p[0]).join("").toUpperCase();
}

interface AppSidebarProps {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

export function AppSidebar({ mobileOpen = false, setMobileOpen }: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: s => s.location.pathname });
  const user = useAuthUser();

  // Close mobile sidebar on route change
  useEffect(() => {
    if (mobileOpen && setMobileOpen) {
      setMobileOpen(false);
    }
  }, [pathname]);

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMobileOpen?.(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 72 : 256 }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className={cn(
          "z-50 shrink-0 h-[100dvh] border-r border-sidebar-border overflow-hidden bg-background",
          "fixed inset-y-0 left-0 transform transition-transform duration-300 md:relative md:translate-x-0",
          mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        )}
        style={{ background: "linear-gradient(180deg, oklch(0.10 0.025 265) 0%, oklch(0.08 0.02 265) 100%)" }}
      >
        {/* Gold border line */}
        <div className="absolute inset-y-0 right-0 w-px"
          style={{ background: "linear-gradient(180deg, transparent 0%, oklch(0.82 0.15 82 / 0.5) 40%, oklch(0.82 0.15 82 / 0.5) 60%, transparent 100%)" }}
        />

        {/* Ambient top glow */}
        <div className="absolute top-0 inset-x-0 h-32 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, oklch(0.82 0.15 82 / 0.08), transparent 70%)" }}
        />

        {/* ── Brand header ── */}
        <div className="flex items-center gap-3 px-4 h-[70px] border-b border-sidebar-border relative">
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} className="shrink-0">
            <Sigil className="w-8 h-8" />
          </motion.div>
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.div
                key="brand"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="min-w-0 leading-none flex-1"
              >
                <p className="font-serif text-gold text-base tracking-[0.35em] leading-none">VERDICTUM</p>
                <p className="text-[8px] tracking-[0.35em] text-muted-foreground mt-1">COSMIC TRIBUNAL</p>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Mobile close button */}
          <button 
            className="md:hidden absolute right-3 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-gold"
            onClick={() => setMobileOpen?.(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-none h-[calc(100dvh-70px)] pb-24">
          {/* ── Nav items ── */}
          <nav className="p-2.5 space-y-0.5 mt-1">
            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.p key="section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="px-3 pt-2 pb-1.5 text-[8px] tracking-[0.45em] text-muted-foreground/50 uppercase font-serif">
                  Navigation
                </motion.p>
              )}
            </AnimatePresence>

            {items.map(it => {
              const active = it.match ? pathname.startsWith(it.match) : pathname === it.to;
              const Icon = it.icon;
              return (
                <Link key={it.to} to={it.to as any} className="block">
                  <motion.div
                    whileHover={{ x: collapsed ? 0 : 2 }}
                    title={collapsed ? it.label : undefined}
                    className={cn(
                      "group relative flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-all duration-200",
                      active
                        ? "bg-gradient-to-r from-gold/15 via-gold/8 to-transparent border-gold/30 text-gold"
                        : "border-transparent text-sidebar-foreground/75 hover:text-gold hover:border-gold/15 hover:bg-sidebar-accent/30"
                    )}
                  >
                    {/* Active indicator */}
                    {active && (
                      <motion.span
                        layoutId="sidebar-active"
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[2.5px] rounded-r-full"
                        style={{ background: "linear-gradient(180deg, oklch(0.92 0.13 85), oklch(0.62 0.14 70))", boxShadow: "0 0 8px oklch(0.82 0.15 82 / 0.6)" }}
                      />
                    )}

                    <div className="relative shrink-0">
                      <Icon className={cn("w-4 h-4 transition-all", active ? "glow-gold" : "group-hover:text-gold")} strokeWidth={1.5} />
                      {it.badge && !collapsed && (
                        <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-gold text-[8px] font-bold text-primary-foreground flex items-center justify-center leading-none">
                          {it.badge}
                        </span>
                      )}
                    </div>

                    <AnimatePresence initial={false}>
                      {!collapsed && (
                        <motion.div key="label" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="flex-1 flex items-center justify-between min-w-0">
                          <span className="font-serif tracking-wide text-sm truncate">{it.label}</span>
                          {it.badge && (
                            <span className="ml-2 shrink-0 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-gold/15 text-gold border border-gold/30">
                              {it.badge}
                            </span>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* ── Divider ── */}
          <div className="divider-subtle mx-4 my-2" />

          {/* ── Secondary items ── */}
          <div className="p-2.5 space-y-0.5">
            {secondaryItems.map(it => {
              const active = pathname === it.to;
              const Icon = it.icon;
              return (
                <Link key={it.label} to={it.to as any}
                  title={collapsed ? it.label : undefined}
                  className={cn("w-full group relative flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-all duration-200", 
                    active ? "bg-sidebar-accent/50 border-gold/30 text-gold" : "border-transparent text-sidebar-foreground/55 hover:text-gold/80 hover:border-gold/15 hover:bg-sidebar-accent/25"
                  )}>
                  <div className="relative shrink-0">
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                    {it.badge && (
                      <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-ember text-[8px] font-bold text-white flex items-center justify-center leading-none">
                        {it.badge}
                      </span>
                    )}
                  </div>
                  <AnimatePresence initial={false}>
                    {!collapsed && (
                      <motion.span key={it.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="font-serif tracking-wide text-sm">
                        {it.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ── Bottom section ── */}
        <div className="absolute bottom-0 inset-x-0 p-3 space-y-2 bg-background border-t border-sidebar-border">
          {/* User card */}
          <AnimatePresence initial={false}>
            {!collapsed && user && (
              <motion.div key="user"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-sidebar-border/60 hover:border-gold/25 transition-all group"
                style={{ background: "oklch(0.14 0.025 265 / 0.7)" }}>
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center font-serif text-sm text-primary-foreground"
                  style={{ background: "linear-gradient(135deg, oklch(0.90 0.13 85), oklch(0.62 0.14 70))", boxShadow: "0 0 12px oklch(0.82 0.15 82 / 0.3)" }}>
                  {getInitials(user.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] tracking-[0.35em] text-muted-foreground/60 uppercase">Judge</p>
                  <p className="font-serif text-gold text-xs truncate mt-0.5">{user.name}</p>
                  <p className="text-[10px] text-muted-foreground/55 truncate">{user.email}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Collapsed user avatar */}
          {collapsed && user && (
            <div className="flex justify-center">
              <div className="w-9 h-9 rounded-full flex items-center justify-center font-serif text-sm text-primary-foreground"
                style={{ background: "linear-gradient(135deg, oklch(0.90 0.13 85), oklch(0.62 0.14 70))", boxShadow: "0 0 12px oklch(0.82 0.15 82 / 0.3)" }}
                title={user.name ?? undefined}>
                {getInitials(user.name)}
              </div>
            </div>
          )}

          {/* Sign out */}
          <button
            onClick={() => { signOut(); navigate({ to: "/auth" }); }}
            title={collapsed ? "Depart" : undefined}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/55 hover:text-ember hover:bg-ember/8 border border-transparent hover:border-ember/20 transition-all duration-200 text-sm"
          >
            <LogOut className="w-4 h-4 shrink-0" strokeWidth={1.5} />
            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.span key="depart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="font-serif tracking-wide">
                  Depart
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Collapse toggle (hidden on mobile) */}
          <button
            onClick={() => setCollapsed(c => !c)}
            className="hidden md:flex w-full items-center justify-center gap-2 px-3 py-2 rounded-lg text-muted-foreground/50 hover:text-gold border border-sidebar-border/50 hover:border-gold/25 transition-all duration-200 text-xs hover:bg-gold/5"
          >
            {collapsed
              ? <ChevronsRight className="w-4 h-4" />
              : <><ChevronsLeft className="w-4 h-4" /><span className="font-serif text-[10px] tracking-widest">Collapse</span></>}
          </button>
        </div>
      </motion.aside>
    </>
  );
}
