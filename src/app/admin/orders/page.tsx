"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { getSupabaseClient } from "@/lib/supabase";
import { formatPrice } from "@/lib/format";
import StatusBadge from "@/components/admin/status-badge";

interface OrderRow {
  id: string;
  package_name: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
  delivery_fee: number;
  total: number;
  customer_name: string;
  customer_phone: string;
  customer_address: string | null;
  customer_district: string | null;
  notes: string | null;
  status: string;
  created_at: string;
}

const STATUS_FILTERS = [
  { key: "all", label: "সব" },
  { key: "pending", label: "অপেক্ষমাণ" },
  { key: "processing", label: "প্রসেসিং" },
  { key: "delivered", label: "ডেলিভার্ড" },
  { key: "cancelled", label: "বাতিল" },
];

const STATUS_OPTIONS = ["pending", "processing", "delivered", "cancelled"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const supabase = getSupabaseClient();

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function load() {
    if (!supabase) return;
    setLoading(true);
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    setOrders((data as OrderRow[]) ?? []);
    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    if (!supabase) return;
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    await supabase.from("orders").update({ status }).eq("id", id);
  }

  const filtered = orders.filter((o) => {
    if (filter !== "all" && o.status !== filter) return false;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      return o.customer_name.toLowerCase().includes(q) || o.customer_phone.includes(q);
    }
    return true;
  });

  if (loading) return <p className="text-ink/60">লোড হচ্ছে...</p>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-[#0f3b38]">অর্ডার সমূহ</h1>
        <input
          type="text"
          placeholder="নাম বা ফোন নম্বর দিয়ে খুঁজুন"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="admin-input w-full sm:w-64"
        />
      </div>

      <div className="flex gap-1 overflow-x-auto rounded-full bg-white p-1 shadow-sm w-fit">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold ${
              filter === f.key ? "bg-[#0f3b38] text-white" : "text-ink/60"
            }`}
          >
            {f.label}
            {f.key !== "all" && (
              <span className="ml-1 text-xs opacity-70">
                ({orders.filter((o) => o.status === f.key).length})
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map((o) => {
          const isOpen = expanded === o.id;
          return (
            <div key={o.id} className="rounded-2xl bg-white shadow-sm">
              <button
                onClick={() => setExpanded(isOpen ? null : o.id)}
                className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-ink">{o.customer_name}</p>
                  <p className="text-xs text-ink/50">
                    {o.package_name} · {o.quantity} পিস · {new Date(o.created_at).toLocaleDateString("bn-BD")}
                  </p>
                </div>
                <span className="shrink-0 font-bold text-[#0f3b38]">{formatPrice(Number(o.total))}</span>
                <StatusBadge status={o.status} />
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              {isOpen && (
                <div className="border-t border-ink/10 px-5 py-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Detail label="ফোন" value={o.customer_phone} />
                    <Detail label="জেলা / এলাকা" value={o.customer_district ?? "-"} />
                    <Detail label="ঠিকানা" value={o.customer_address ?? "-"} />
                    <Detail label="অতিরিক্ত তথ্য" value={o.notes ?? "-"} />
                    <Detail label="একক দাম" value={formatPrice(Number(o.unit_price))} />
                    <Detail label="সাবটোটাল" value={formatPrice(Number(o.subtotal))} />
                    <Detail label="ডেলিভারি চার্জ" value={formatPrice(Number(o.delivery_fee))} />
                    <Detail label="সর্বমোট" value={formatPrice(Number(o.total))} />
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-xs font-semibold text-ink/50">স্ট্যাটাস পরিবর্তন করুন:</span>
                    <select
                      value={o.status}
                      onChange={(e) => updateStatus(o.id, e.target.value)}
                      className="admin-input"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <p className="rounded-2xl bg-white py-10 text-center text-ink/40 shadow-sm">কোনো অর্ডার পাওয়া যায়নি</p>
        )}
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold text-ink/40">{label}</p>
      <p className="text-sm text-ink">{value}</p>
    </div>
  );
}
