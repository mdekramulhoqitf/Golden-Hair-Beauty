"use client";

import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { getSupabaseClient } from "@/lib/supabase";
import AdminLogin from "./admin-login";
import AdminShell from "./admin-shell";

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null | "loading">("loading");

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      setSession(null);
      return;
    }
    supabase.auth.getSession().then(({ data }: { data: { session: Session | null } }) =>
      setSession(data.session)
    );
    const { data: listener } = supabase.auth.onAuthStateChange((_event: string, newSession: Session | null) => {
      setSession(newSession);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  if (session === "loading") {
    return <div className="flex min-h-screen items-center justify-center bg-[#fbf3e2]">লোড হচ্ছে...</div>;
  }

  return session ? <AdminShell>{children}</AdminShell> : <AdminLogin />;
}
