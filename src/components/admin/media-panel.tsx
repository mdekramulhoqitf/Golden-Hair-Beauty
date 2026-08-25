"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase";
import { MEDIA_KEYS } from "@/data/media-keys";

export default function MediaPanel() {
  const [values, setValues] = useState<Record<string, string>>({});
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
    const { data } = await supabase.from("site_media").select("key, value");
    const map: Record<string, string> = Object.fromEntries(MEDIA_KEYS.map((k) => [k.key, k.fallback]));
    (data ?? []).forEach((row: { key: string; value: string }) => {
      if (row.value) map[row.key] = row.value;
    });
    setValues(map);
    setLoading(false);
  }

  async function saveValue(key: string, value: string) {
    if (!supabase) return;
    setStatus({ key, text: "সেভ হচ্ছে..." });
    const { error } = await supabase.from("site_media").upsert({ key, value, updated_at: new Date().toISOString() });
    setStatus({ key, text: error ? error.message : "সেভ হয়েছে ✓", error: Boolean(error) });
  }

  async function uploadImage(key: string, file: File) {
    if (!supabase) return;
    setStatus({ key, text: "আপলোড হচ্ছে..." });
    const path = `site/${key}-${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage.from("landing-media").upload(path, file, {
      upsert: true,
    });
    if (uploadError) {
      setStatus({ key, text: uploadError.message, error: true });
      return;
    }
    const { data } = supabase.storage.from("landing-media").getPublicUrl(path);
    setValues((prev) => ({ ...prev, [key]: data.publicUrl }));
    await saveValue(key, data.publicUrl);
  }

  if (loading) return <p className="text-ink/60">লোড হচ্ছে...</p>;

  const sections = Array.from(new Set(MEDIA_KEYS.map((k) => k.section)));

  return (
    <div className="flex flex-col gap-8">
      {sections.map((section) => (
        <div key={section}>
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-ink/40">{section}</h2>
          <div className="flex flex-col gap-4">
            {MEDIA_KEYS.filter((k) => k.section === section).map((mediaKey) => (
              <div key={mediaKey.key} className="rounded-xl bg-white p-5 shadow-sm">
                <p className="mb-3 text-sm font-semibold text-ink/70">{mediaKey.label}</p>

                {mediaKey.type === "video" ? (
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <input
                      type="text"
                      placeholder="https://youtube.com/watch?v=..."
                      className="admin-input flex-1"
                      value={values[mediaKey.key] ?? ""}
                      onChange={(e) => setValues((prev) => ({ ...prev, [mediaKey.key]: e.target.value }))}
                    />
                    <button
                      onClick={() => saveValue(mediaKey.key, values[mediaKey.key] ?? "")}
                      className="admin-btn-primary shrink-0"
                    >
                      সেভ করুন
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    {values[mediaKey.key] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={values[mediaKey.key]}
                        alt=""
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-lg bg-ink/5" />
                    )}
                    <label className="cursor-pointer rounded-lg border border-ink/20 px-3 py-2 text-sm font-semibold text-ink/70">
                      ছবি বদলান
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) uploadImage(mediaKey.key, file);
                        }}
                      />
                    </label>
                  </div>
                )}

                {status?.key === mediaKey.key && (
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
