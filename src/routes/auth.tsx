import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { AmbientBackground } from "@/pages/verdictum/AmbientBackground";
import { Sigil } from "@/pages/verdictum/OrnateFrame";
import { signIn, signUp, resetPassword, signInWithGoogle } from "@/lib/auth";

export const Route = createFileRoute("/auth")({ component: AuthPage });

type Mode = "login" | "signup" | "forgot";

function AuthPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "login") { await signIn(email, password); toast.success("The Codex opens."); navigate({ to: "/dashboard" }); }
      else if (mode === "signup") { await signUp(email, password, name || "Nameless Judge"); toast.success("Sigil inscribed."); navigate({ to: "/dashboard" }); }
      else { await resetPassword(email); toast.success("A raven has been dispatched."); setMode("login"); }
    } catch (err: any) { toast.error(err.message ?? "The rite failed."); }
    finally { setLoading(false); }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-16">
      <AmbientBackground />
      <div className="relative z-10 w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-3 mb-8">
          <Sigil />
          <span className="font-serif text-gold tracking-[0.4em] text-lg">VERDICTUM</span>
        </Link>

        <motion.div layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="panel-engraved rounded-lg p-8 relative ornate-corners">
          <span className="corner-tr" /><span className="corner-bl" />
          <p className="font-serif text-[10px] tracking-[0.5em] text-gold/80 text-center">
            {mode === "login" ? "— RITE OF ENTRY —" : mode === "signup" ? "— RITE OF INSCRIPTION —" : "— RITE OF RECALL —"}
          </p>
          <h1 className="mt-3 font-serif text-3xl text-center text-gradient-gold">
            {mode === "login" ? "Present your sigil" : mode === "signup" ? "Inscribe a new judge" : "Recover your sigil"}
          </h1>
          <div className="divider-gold my-6" />

          <form onSubmit={submit} className="space-y-4">
            <AnimatePresence mode="popLayout">
              {mode === "signup" && (
                <motion.div key="name" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                  <Field label="Judge Name">
                    <input required value={name} onChange={e => setName(e.target.value)} className="verdictum-input" placeholder="Cassian of the Ninth Bench" />
                  </Field>
                </motion.div>
              )}
            </AnimatePresence>

            <Field label="Sigil (email)">
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="verdictum-input" placeholder="judge@tribunal.cosmos" />
            </Field>

            {mode !== "forgot" && (
              <Field label="Word of Passage">
                <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="verdictum-input" placeholder="••••••••" />
              </Field>
            )}

            <button disabled={loading} className="w-full mt-2 py-3 rounded-md bg-gradient-gold text-primary-foreground font-serif tracking-[0.3em] text-sm shadow-gold hover:shadow-[0_0_60px_oklch(0.82_0.15_82/0.6)] transition disabled:opacity-60">
              {loading ? "INVOKING…" : mode === "login" ? "ENTER" : mode === "signup" ? "INSCRIBE" : "DISPATCH RAVEN"}
            </button>
          </form>

          {mode !== "forgot" && (
            <>
              <div className="flex items-center my-6 gap-3">
                <div className="flex-1 h-px bg-border/40" />
                <span className="text-[10px] text-muted-foreground tracking-[0.4em]">OR</span>
                <div className="flex-1 h-px bg-border/40" />
              </div>
              <button
                type="button"
                disabled={loading}
                onClick={async () => {
                  setLoading(true);
                  try {
                    await signInWithGoogle();
                    toast.success("The Codex opens via Google.");
                    navigate({ to: "/dashboard" });
                  } catch (err: any) {
                    toast.error(err.message ?? "Google rite failed.");
                  } finally {
                    setLoading(false);
                  }
                }}
                className="w-full py-3 rounded-md border border-gold/40 text-gold font-serif tracking-[0.2em] text-xs hover:bg-gold/10 transition disabled:opacity-60 flex items-center justify-center gap-3"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                CONTINUE WITH GOOGLE
              </button>
            </>
          )}

          <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
            {mode !== "login" ? (
              <button onClick={() => setMode("login")} className="hover:text-gold transition tracking-wider">← Return to entry</button>
            ) : <span />}
            {mode === "login" && (
              <>
                <button onClick={() => setMode("forgot")} className="hover:text-gold transition tracking-wider">Lost sigil?</button>
                <button onClick={() => setMode("signup")} className="hover:text-gold transition tracking-wider">Inscribe →</button>
              </>
            )}
          </div>
        </motion.div>
        <p className="mt-6 text-center text-[10px] tracking-[0.4em] text-muted-foreground">ALL RITES ARE OBSERVED BY THE WEAVE</p>
      </div>
      <style>{`.verdictum-input { width:100%; background: oklch(0.11 0.02 265); border: 1px solid oklch(0.82 0.15 82 / 0.25); color: var(--parchment); padding: 0.75rem 0.9rem; border-radius: 6px; font-family: var(--font-sans); font-size: 0.9rem; outline: none; transition: all .2s; }
      .verdictum-input:focus { border-color: oklch(0.82 0.15 82 / 0.7); box-shadow: 0 0 0 3px oklch(0.82 0.15 82 / 0.15); }
      .verdictum-input::placeholder { color: oklch(0.5 0.02 90); font-style: italic; }`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block font-serif text-[10px] tracking-[0.4em] text-gold/80 mb-2 uppercase">{label}</span>
      {children}
    </label>
  );
}
