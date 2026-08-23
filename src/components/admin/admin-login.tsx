"use client";

import { useState } from "react";
import { getSupabaseClient } from "@/lib/supabase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const supabase = getSupabaseClient();
    if (!supabase) {
      setError("Supabase configured hoyni. .env.local check korun.");
      setLoading(false);
      return;
    }
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (signInError) setError("ভুল ইমেইল অথবা পাসওয়ার্ড");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fbf3e2] px-4">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-4 rounded-2xl bg-white p-8 shadow-xl shadow-black/10"
      >
        <h1 className="text-xl font-bold text-[#0f3b38]">Goldenhair Admin</h1>
        <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink/70">
          ইমেইল
          <input
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-ink/15 px-3 py-2 text-base font-normal text-ink"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink/70">
          পাসওয়ার্ড
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg border border-ink/15 px-3 py-2 text-base font-normal text-ink"
          />
        </label>
        {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-1 rounded-full bg-[#f6a623] py-3 text-sm font-bold text-[#0f3b38] transition-opacity disabled:opacity-60"
        >
          {loading ? "লগইন হচ্ছে..." : "লগইন করুন"}
        </button>
      </form>
    </div>
  );
}
