import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center panel-engraved rounded-lg p-10 relative ornate-corners">
        <span className="corner-tr" /><span className="corner-bl" />
        <p className="font-serif text-gold text-xs tracking-[0.4em]">CODEX · 404</p>
        <h1 className="mt-4 font-serif text-5xl text-gradient-gold">Beyond the Veil</h1>
        <p className="mt-3 text-sm text-muted-foreground">This record does not exist in the Cosmic Archive.</p>
        <Link to="/" className="mt-6 inline-block font-serif tracking-widest text-sm text-gold hover:text-gold-soft transition">Return to Tribunal →</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center panel-engraved rounded-lg p-10">
        <h1 className="font-serif text-2xl text-gradient-gold">A rift in the Weave</h1>
        <p className="mt-2 text-sm text-muted-foreground">The Oracle stumbled interpreting this record.</p>
        <div className="mt-6 flex gap-3 justify-center">
          <button onClick={() => { router.invalidate(); reset(); }} className="px-4 py-2 rounded border border-gold/40 text-gold text-sm hover:bg-gold/10 transition">Re-cast</button>
          <a href="/" className="px-4 py-2 rounded border border-border text-sm hover:bg-accent transition">Return</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "VERDICTUM — The Cosmic Tribunal Interface" },
      { name: "description", content: "VERDICTUM is the sacred interface used by Cosmic Judges to review souls, replay lives, and deliver final verdict before the eternal realms." },
      { property: "og:title", content: "VERDICTUM — The Cosmic Tribunal Interface" },
      { property: "og:description", content: "Review souls, replay lives, map consequences, and deliver verdict from the celestial courtroom." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster theme="dark" position="top-center" toastOptions={{ style: { background: "oklch(0.14 0.02 265)", border: "1px solid oklch(0.82 0.15 82 / 0.3)", color: "oklch(0.94 0.02 90)" } }} />
    </QueryClientProvider>
  );
}
