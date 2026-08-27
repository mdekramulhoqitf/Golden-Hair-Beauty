import MediaPanel from "@/components/admin/media-panel";
import { MEDIA_KEYS } from "@/data/media-keys";

const CONTENT_SECTIONS = Array.from(new Set(MEDIA_KEYS.map((k) => k.section))).filter(
  (section) => section !== "Pixel ও SEO"
);

export default function AdminMediaPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-[#0f3b38]">টেক্সট, ছবি ও ভিডিও</h1>
      <MediaPanel sections={CONTENT_SECTIONS} />
    </div>
  );
}
