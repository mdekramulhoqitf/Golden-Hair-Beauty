import MediaPanel from "@/components/admin/media-panel";
import SecretsPanel from "@/components/admin/secrets-panel";

export default function AdminSettingsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-[#0f3b38]">Settings</h1>
        <p className="mt-1 text-sm text-ink/60">
          Meta Pixel, Conversion API, BizMation ও SEO সেটিংস এখান থেকে পরিবর্তন করুন। SEO পরিবর্তন লাইভ
          সাইটে দেখাতে সাইট নতুন করে বিল্ড ও পাবলিশ করতে হবে।
        </p>
      </div>

      <MediaPanel sections={["Pixel ও SEO"]} />
      <SecretsPanel />
    </div>
  );
}
