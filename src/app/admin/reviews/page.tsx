import ReviewsPanel from "@/components/admin/reviews-panel";

export default function AdminReviewsPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-[#0f3b38]">কাস্টমার রিভিউ</h1>
      <ReviewsPanel />
    </div>
  );
}
