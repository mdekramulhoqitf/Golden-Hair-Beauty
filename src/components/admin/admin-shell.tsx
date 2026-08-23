"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, ShoppingBag, Package, Star, LogOut } from "lucide-react";
import { getSupabaseClient } from "@/lib/supabase";

const NAV_ITEMS = [
  { href: "/admin", label: "Overview", icon: LayoutGrid },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const supabase = getSupabaseClient();

  return (
    <div className="flex min-h-screen bg-[#fbf3e2]">
      <aside className="hidden w-64 shrink-0 flex-col gap-6 border-r border-ink/10 bg-white px-4 py-6 sm:flex">
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0f3b38] text-sm font-bold text-[#f6a623]">
            G
          </div>
          <span className="text-lg font-bold text-[#0f3b38]">Goldenhair</span>
        </div>

        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                  active ? "bg-[#0f3b38] text-white" : "text-ink/60 hover:bg-[#fbf3e2]"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => supabase?.auth.signOut()}
          className="mt-auto flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
        >
          <LogOut size={18} />
          লগআউট
        </button>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-ink/10 bg-white px-6 py-4 sm:hidden">
          <span className="text-lg font-bold text-[#0f3b38]">Goldenhair Admin</span>
          <button onClick={() => supabase?.auth.signOut()} className="text-sm font-semibold text-red-600">
            লগআউট
          </button>
        </header>

        <nav className="flex gap-1 overflow-x-auto border-b border-ink/10 bg-white px-3 py-2 sm:hidden">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold ${
                  active ? "bg-[#0f3b38] text-white" : "text-ink/60"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <main className="flex-1 px-4 py-6 sm:px-8 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
