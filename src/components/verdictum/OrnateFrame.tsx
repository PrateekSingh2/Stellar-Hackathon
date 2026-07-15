import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function OrnateFrame({ children, className, eyebrow, title, subtitle }: {
  children?: ReactNode; className?: string; eyebrow?: string; title?: string; subtitle?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn("relative panel-engraved rounded-lg p-6 ornate-corners", className)}
    >
      <span className="corner-tr" /><span className="corner-bl" />
      {(eyebrow || title) && (
        <header className="mb-5">
          {eyebrow && <p className="font-serif text-[10px] tracking-[0.5em] text-gold/80 uppercase">{eyebrow}</p>}
          {title && <h2 className="mt-1 font-serif text-2xl md:text-3xl text-gradient-gold">{title}</h2>}
          {subtitle && <p className="mt-1 text-sm text-muted-foreground max-w-2xl">{subtitle}</p>}
          <div className="divider-gold mt-4" />
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
        <linearGradient id="gld" x1="0" x2="1"><stop offset="0" stopColor="oklch(0.9 0.13 85)" /><stop offset="1" stopColor="oklch(0.6 0.14 70)" /></linearGradient>
      </defs>
      <circle cx="32" cy="32" r="28" stroke="url(#gld)" strokeWidth="1" />
      <circle cx="32" cy="32" r="20" stroke="url(#gld)" strokeWidth="0.6" opacity=".6" />
      <path d="M32 6 L36 30 L58 32 L36 34 L32 58 L28 34 L6 32 L28 30 Z" fill="url(#gld)" opacity=".9" />
      <circle cx="32" cy="32" r="3" fill="oklch(0.14 0.02 265)" stroke="url(#gld)" />
    </svg>
  );
}
