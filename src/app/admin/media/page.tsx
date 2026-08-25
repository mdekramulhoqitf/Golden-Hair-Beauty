import MediaPanel from "@/components/admin/media-panel";

export default function AdminMediaPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-[#0f3b38]">ভিডিও ও ছবি</h1>
      <MediaPanel />
    </div>
  );
}
