"use client";

import { useState } from "react";
import { getSupabaseClient } from "@/lib/supabase";
import PackagesPanel from "./packages-panel";
import ReviewsPanel from "./reviews-panel";

export default function AdminDashboard() {
  const [tab, setTab] = useState<"packages" | "reviews">("packages");
  const supabase = getSupabaseClient();

  return (
    <div className="min-h-screen bg-[#fbf3e2]">
      <header className="flex items-center justify-between bg-[#0f3b38] px-6 py-4 text-white">
        <h1 className="text-lg font-bold">Goldenhair Admin</h1>
        <button
          onClick={() => supabase?.auth.signOut()}
          className="rounded-full border border-white/30 px-4 py-1.5 text-sm"
        >
          লগআউট
        </button>
      </header>

      <nav className="flex gap-2 px-6 pt-4">
        <button
          onClick={() => setTab("packages")}
          className={`rounded-t-lg px-5 py-2.5 text-sm font-semibold ${
            tab === "packages" ? "bg-white text-[#0f3b38]" : "bg-[#eee0c2] text-ink/60"
          }`}
        >
          প্যাকেজ / প্রাইস
        </button>
        <button
          onClick={() => setTab("reviews")}
          className={`rounded-t-lg px-5 py-2.5 text-sm font-semibold ${
            tab === "reviews" ? "bg-white text-[#0f3b38]" : "bg-[#eee0c2] text-ink/60"
          }`}
        >
          কাস্টমার রিভিউ
        </button>
      </nav>

      <main className="px-6 pb-16 pt-5">
        {tab === "packages" ? <PackagesPanel /> : <ReviewsPanel />}
      </main>
    </div>
  );
}
