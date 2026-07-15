import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function OrnateFrame({ children, className, eyebrow, title, subtitle, action }: {
  children?: ReactNode;
  className?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className={cn("relative panel-engraved rounded-xl p-6 ornate-corners group", className)}
    >
      <span className="corner-tr" />
      <span className="corner-bl" />

      {/* Ambient hover glow */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, oklch(0.82 0.15 82 / 0.07), transparent 60%)" }}
      />

      {(eyebrow || title) && (
        <header className="mb-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              {eyebrow && (
                <p className="font-serif text-[10px] tracking-[0.55em] text-gold/75 uppercase">{eyebrow}</p>
              )}
              {title && (
                <h2 className="mt-1 font-serif text-xl md:text-2xl text-gradient-gold leading-tight">{title}</h2>
              )}
              {subtitle && (
                <p className="mt-1 text-xs text-muted-foreground/80 max-w-2xl">{subtitle}</p>
              )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </div>
          {/* Animated divider */}
          <div className="relative mt-4 h-px overflow-hidden">
            <div className="divider-gold absolute inset-0" />
            <div className="animate-shimmer absolute inset-0" />
          </div>
        </header>
      )}
      {children}
    </motion.section>
  );
}

export function Sigil({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn("w-10 h-10", className)} fill="none">
      <defs>
        <linearGradient id="gld" x1="0" x2="1">
          <stop offset="0" stopColor="oklch(0.92 0.13 85)" />
          <stop offset="1" stopColor="oklch(0.58 0.14 70)" />
        </linearGradient>
        <linearGradient id="gld2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="oklch(0.92 0.13 85)" />
          <stop offset="1" stopColor="oklch(0.58 0.14 70)" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="29" stroke="url(#gld)" strokeWidth="0.8" opacity="0.9" />
      <circle cx="32" cy="32" r="22" stroke="url(#gld)" strokeWidth="0.5" opacity="0.5" strokeDasharray="3 5" />
      <circle cx="32" cy="32" r="15" stroke="url(#gld2)" strokeWidth="0.4" opacity="0.4" />
      <path d="M32 5 L36.5 29.5 L59 32 L36.5 34.5 L32 59 L27.5 34.5 L5 32 L27.5 29.5 Z" fill="url(#gld)" opacity="0.92" />
      <circle cx="32" cy="32" r="3.5" fill="oklch(0.10 0.02 265)" stroke="url(#gld)" strokeWidth="1" />
    </svg>
  );
}
