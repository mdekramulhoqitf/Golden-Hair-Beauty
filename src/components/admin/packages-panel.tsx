"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase";

interface PackageRow {
  id: string;
  name: string;
  volume: string;
  price: number;
  old_price: number | null;
  image_url: string | null;
  sort_order: number;
  available: boolean;
}

export default function PackagesPanel() {
  const [rows, setRows] = useState<PackageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<{ id: string; text: string; error?: boolean } | null>(null);
  const supabase = getSupabaseClient();

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function load() {
    if (!supabase) return;
    setLoading(true);
    const { data } = await supabase.from("landing_packages").select("*").order("sort_order");
    setRows((data as PackageRow[]) ?? []);
    setLoading(false);
  }

  function updateLocal(id: string, patch: Partial<PackageRow>) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  async function saveRow(row: PackageRow) {
    if (!supabase) return;
    setStatus({ id: row.id, text: "সেভ হচ্ছে..." });
    const { error } = await supabase
      .from("landing_packages")
      .update({
        name: row.name,
        volume: row.volume,
        price: row.price,
        old_price: row.old_price,
        image_url: row.image_url,
        available: row.available,
      })
      .eq("id", row.id);
    setStatus({ id: row.id, text: error ? error.message : "সেভ হয়েছে ✓", error: Boolean(error) });
  }

  async function deleteRow(id: string) {
    if (!supabase) return;
    if (!confirm("এই প্যাকেজটি মুছে ফেলবেন?")) return;
    await supabase.from("landing_packages").delete().eq("id", id);
    setRows((prev) => prev.filter((r) => r.id !== id));
  }

  async function addRow() {
    if (!supabase) return;
    const id = crypto.randomUUID();
    const newRow: PackageRow = {
      id,
      name: "নতুন প্যাকেজ",
      volume: "",
      price: 0,
      old_price: null,
      image_url: null,
      sort_order: rows.length,
      available: true,
    };
    const { error } = await supabase.from("landing_packages").insert(newRow);
    if (!error) setRows((prev) => [...prev, newRow]);
  }

  async function uploadImage(row: PackageRow, file: File) {
    if (!supabase) return;
    setStatus({ id: row.id, text: "আপলোড হচ্ছে..." });
    const path = `packages/${row.id}-${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage.from("landing-media").upload(path, file, {
      upsert: true,
    });
    if (uploadError) {
      setStatus({ id: row.id, text: uploadError.message, error: true });
      return;
    }
    const { data } = supabase.storage.from("landing-media").getPublicUrl(path);
    updateLocal(row.id, { image_url: data.publicUrl });
    await supabase.from("landing_packages").update({ image_url: data.publicUrl }).eq("id", row.id);
    setStatus({ id: row.id, text: "ছবি আপলোড হয়েছে ✓" });
  }

  if (loading) return <p className="text-ink/60">লোড হচ্ছে...</p>;

  return (
    <div className="flex flex-col gap-4">
      {rows.map((row) => (
        <div key={row.id} className="grid gap-3 rounded-xl bg-white p-5 shadow-sm sm:grid-cols-2">
          <Field label="প্যাকেজের নাম">
            <input
              className="admin-input"
              value={row.name}
              onChange={(e) => updateLocal(row.id, { name: e.target.value })}
            />
          </Field>
          <Field label="ভলিউম">
            <input
              className="admin-input"
              value={row.volume}
              onChange={(e) => updateLocal(row.id, { volume: e.target.value })}
            />
          </Field>
          <Field label="দাম (৳)">
            <input
              type="number"
              className="admin-input"
              value={row.price}
              onChange={(e) => updateLocal(row.id, { price: Number(e.target.value) })}
            />
          </Field>
          <Field label="আগের দাম / ছাড় (৳, খালি রাখলে ছাড় দেখাবে না)">
            <input
              type="number"
              className="admin-input"
              value={row.old_price ?? ""}
              onChange={(e) =>
                updateLocal(row.id, { old_price: e.target.value === "" ? null : Number(e.target.value) })
              }
            />
          </Field>

          <label className="flex items-center gap-2 text-sm font-semibold text-ink/70">
            <input
              type="checkbox"
              checked={row.available}
              onChange={(e) => updateLocal(row.id, { available: e.target.checked })}
            />
            পণ্যটি বর্তমানে অর্ডারযোগ্য (আনচেক করলে &ldquo;স্টকে নেই&rdquo; দেখাবে)
          </label>

          <div className="sm:col-span-2 flex items-center gap-4">
            {row.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={row.image_url} alt="" className="h-16 w-16 rounded-lg object-cover" />
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
                  if (file) uploadImage(row, file);
                }}
              />
            </label>
          </div>

          <div className="sm:col-span-2 flex items-center justify-between">
            <div className="flex gap-2">
              <button onClick={() => saveRow(row)} className="admin-btn-primary">
                সেভ করুন
              </button>
              <button onClick={() => deleteRow(row.id)} className="admin-btn-danger">
                মুছে ফেলুন
              </button>
            </div>
            {status?.id === row.id && (
              <span className={status.error ? "text-sm text-red-600" : "text-sm text-green-700"}>
                {status.text}
              </span>
            )}
          </div>
        </div>
      ))}

      <button onClick={addRow} className="admin-btn-secondary w-fit">
        + নতুন প্যাকেজ
      </button>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1 text-xs font-semibold text-ink/60">
      {label}
      {children}
    </label>
  );
}
