import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AmbientBackground } from "@/components/verdictum/AmbientBackground";
import { AppSidebar } from "@/components/verdictum/AppSidebar";
import { useAuthUser } from "@/lib/auth";
import { auth } from "@/lib/firebase";
import { Menu, X } from "lucide-react";
import { Sigil } from "@/components/verdictum/OrnateFrame";

export const Route = createFileRoute("/_app")({ component: AppLayout });

function AppLayout() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = useAuthUser();
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u: any) => {
      if (u) setReady(true);
      else navigate({ to: "/auth" });
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row bg-background">
      <AmbientBackground intensity={0.7} />
      
      {/* Mobile Header */}
      {ready && (
        <header className="md:hidden flex items-center justify-between p-4 border-b border-border/30 relative z-40 bg-background/80 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Sigil className="w-6 h-6" />
            <span className="font-serif text-gold tracking-widest text-sm">VERDICTUM</span>
          </div>
          <button 
            onClick={() => setMobileOpen(true)} 
            className="p-1.5 text-gold hover:bg-gold/10 rounded-md transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>
      )}

      {ready && (
        <AppSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      )}
      
      <main className="relative z-10 flex-1 min-w-0 flex flex-col h-[calc(100vh-65px)] md:h-screen overflow-y-auto overflow-x-hidden">
        {ready && <Outlet />}
      </main>
    </div>
  );
}
