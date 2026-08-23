import type { Metadata } from "next";
import AdminGate from "@/components/admin/admin-gate";

export const metadata: Metadata = {
  title: "Admin — Goldenhair",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminGate>{children}</AdminGate>;
}
