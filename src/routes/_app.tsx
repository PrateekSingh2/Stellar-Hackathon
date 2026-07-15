import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AmbientBackground } from "@/components/verdictum/AmbientBackground";
import { AppSidebar } from "@/components/verdictum/AppSidebar";
import { useAuthUser } from "@/lib/auth";
import { auth } from "@/lib/firebase";

export const Route = createFileRoute("/_app")({ component: AppLayout });

function AppLayout() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const user = useAuthUser();
  
  useEffect(() => {
    // Wait a brief moment for firebase auth to initialize before redirecting. 
    // If it's initialized and user is null, then we redirect.
    // However, if we just rely on `user`, it's initially null until onAuthStateChanged fires.
    // Firebase auth currentUser is initially null even if logged in.
    // Actually, useAuthUser handles this. But we need a way to know if auth has loaded.
    // Let's just do a simple check.
    const unsubscribe = auth.onAuthStateChanged((u: any) => {
      if (u) setReady(true);
      else navigate({ to: "/auth" });
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="relative min-h-screen flex">
      <AmbientBackground intensity={0.7} />
      <AppSidebar />
      <main className="relative z-10 flex-1 min-w-0">
        {ready && <Outlet />}
      </main>
    </div>
  );
}
