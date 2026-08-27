"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { getSupabaseClient } from "@/lib/supabase";
import { SECRET_KEYS } from "@/data/secret-keys";

export default function SecretsPanel() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<{ key: string; text: string; error?: boolean } | null>(null);
  const supabase = getSupabaseClient();

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function load() {
    if (!supabase) return;
    setLoading(true);
    const { data } = await supabase.from("site_secrets").select("key, value");
    const map: Record<string, string> = Object.fromEntries(SECRET_KEYS.map((k) => [k.key, ""]));
    (data ?? []).forEach((row: { key: string; value: string }) => {
      map[row.key] = row.value;
    });
    setValues(map);
    setLoading(false);
  }

  async function saveValue(key: string) {
    if (!supabase) return;
    setStatus({ key, text: "সেভ হচ্ছে..." });
    const { error } = await supabase
      .from("site_secrets")
      .upsert({ key, value: values[key] ?? "", updated_at: new Date().toISOString() });
    setStatus({ key, text: error ? error.message : "সেভ হয়েছে ✓", error: Boolean(error) });
  }

  if (loading) return <p className="text-ink/60">লোড হচ্ছে...</p>;

  const sections = Array.from(new Set(SECRET_KEYS.map((k) => k.section)));

  return (
    <div className="flex flex-col gap-8">
      {sections.map((section) => (
        <div key={section}>
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-ink/40">{section}</h2>
          <div className="flex flex-col gap-4">
            {SECRET_KEYS.filter((k) => k.section === section).map((secretKey) => (
              <div key={secretKey.key} className="rounded-xl bg-white p-5 shadow-sm">
                <p className="mb-3 text-sm font-semibold text-ink/70">{secretKey.label}</p>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <div className="relative flex-1">
                    <input
                      type={visible[secretKey.key] ? "text" : "password"}
                      placeholder={secretKey.placeholder}
                      className="admin-input w-full pr-10"
                      value={values[secretKey.key] ?? ""}
                      onChange={(e) => setValues((prev) => ({ ...prev, [secretKey.key]: e.target.value }))}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setVisible((prev) => ({ ...prev, [secretKey.key]: !prev[secretKey.key] }))
                      }
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink/70"
                    >
                      {visible[secretKey.key] ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <button
                    onClick={() => saveValue(secretKey.key)}
                    className="admin-btn-primary shrink-0"
                  >
                    সেভ করুন
                  </button>
                </div>
                {status?.key === secretKey.key && (
                  <span className={`mt-2 block text-sm ${status.error ? "text-red-600" : "text-green-700"}`}>
                    {status.text}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
