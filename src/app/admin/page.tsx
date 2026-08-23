"use client";

import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { getSupabaseClient } from "@/lib/supabase";
import AdminLogin from "@/components/admin/admin-login";
import AdminDashboard from "@/components/admin/admin-dashboard";

export default function AdminPage() {
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

  return session ? <AdminDashboard /> : <AdminLogin />;
}
