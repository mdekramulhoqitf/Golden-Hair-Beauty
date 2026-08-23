"use client";

import { useEffect, useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Package, ShoppingBag, Clock, Wallet, type LucideIcon } from "lucide-react";
import { getSupabaseClient } from "@/lib/supabase";
import { formatPrice } from "@/lib/format";
import StatusBadge from "@/components/admin/status-badge";

interface OrderRow {
  id: string;
  package_name: string;
  total: number;
  status: string;
  customer_name: string;
  created_at: string;
}

const RANGE_OPTIONS = [
  { key: "7", label: "৭ দিন" },
  { key: "30", label: "৩০ দিন" },
  { key: "90", label: "৯০ দিন" },
];

export default function AdminOverviewPage() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [productCount, setProductCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState("7");

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      setLoading(false);
      return;
    }
    Promise.all([
      supabase
        .from("orders")
        .select("id, package_name, total, status, customer_name, created_at")
        .order("created_at", { ascending: false }),
      supabase.from("landing_packages").select("id", { count: "exact", head: true }),
    ]).then(([ordersRes, productsRes]) => {
      setOrders((ordersRes.data as OrderRow[]) ?? []);
      setProductCount(productsRes.count ?? 0);
      setLoading(false);
    });
  }, []);

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const totalSales = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + Number(o.total), 0);

  const chartData = useMemo(() => {
    const days = Number(range);
    const buckets = new Map<string, number>();
    const now = new Date();
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = d.toLocaleDateString("en-CA");
      buckets.set(key, 0);
    }
    orders
      .filter((o) => o.status !== "cancelled")
      .forEach((o) => {
        const key = new Date(o.created_at).toLocaleDateString("en-CA");
        if (buckets.has(key)) buckets.set(key, (buckets.get(key) ?? 0) + Number(o.total));
      });
    return Array.from(buckets.entries()).map(([date, sales]) => ({
      date: date.slice(5),
      sales,
    }));
  }, [orders, range]);

  const recentOrders = orders.slice(0, 8);

  if (loading) return <p className="text-ink/60">লোড হচ্ছে...</p>;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0f3b38]">শুভেচ্ছা 👋</h1>
        <p className="text-sm text-ink/60">আজকের ওভারভিউ দেখুন</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Package} label="মোট প্রোডাক্ট" value={productCount.toString()} />
        <StatCard icon={ShoppingBag} label="মোট অর্ডার" value={totalOrders.toString()} />
        <StatCard icon={Clock} label="অপেক্ষমাণ অর্ডার" value={pendingOrders.toString()} />
        <StatCard icon={Wallet} label="মোট বিক্রি" value={formatPrice(totalSales)} />
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-[#0f3b38]">সেলস রিপোর্ট</h2>
          <div className="flex gap-1 rounded-full bg-[#fbf3e2] p-1">
            {RANGE_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setRange(opt.key)}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  range === opt.key ? "bg-[#0f3b38] text-white" : "text-ink/60"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e0d0" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#8a8578" />
              <YAxis tick={{ fontSize: 11 }} stroke="#8a8578" />
              <Tooltip
                formatter={(value) => formatPrice(Number(value))}
                contentStyle={{ borderRadius: 12, border: "1px solid #eee0c2" }}
              />
              <Line type="monotone" dataKey="sales" stroke="#f6a623" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-bold text-[#0f3b38]">সাম্প্রতিক অর্ডার</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink/10 text-left text-xs font-semibold text-ink/50">
                <th className="pb-2 pr-4">গ্রাহক</th>
                <th className="pb-2 pr-4">প্যাকেজ</th>
                <th className="pb-2 pr-4">দাম</th>
                <th className="pb-2">স্ট্যাটাস</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id} className="border-b border-ink/5 last:border-0">
                  <td className="py-2.5 pr-4 font-medium text-ink">{o.customer_name}</td>
                  <td className="py-2.5 pr-4 text-ink/70">{o.package_name}</td>
                  <td className="py-2.5 pr-4 text-ink/70">{formatPrice(Number(o.total))}</td>
                  <td className="py-2.5">
                    <StatusBadge status={o.status} />
                  </td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-ink/40">
                    এখনো কোনো অর্ডার নেই
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#fbf3e2] text-[#0f3b38]">
        <Icon size={18} />
      </div>
      <p className="text-xs font-semibold text-ink/50">{label}</p>
      <p className="mt-1 text-xl font-bold text-[#0f3b38]">{value}</p>
    </div>
  );
}
