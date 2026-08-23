import PackagesPanel from "@/components/admin/packages-panel";

export default function AdminProductsPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-[#0f3b38]">প্রোডাক্ট / প্রাইস</h1>
      <PackagesPanel />
    </div>
  );
}
