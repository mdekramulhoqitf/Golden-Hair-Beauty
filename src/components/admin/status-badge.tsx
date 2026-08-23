const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  processing: "bg-blue-100 text-blue-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const STATUS_LABELS: Record<string, string> = {
  pending: "অপেক্ষমাণ",
  processing: "প্রসেসিং",
  delivered: "ডেলিভার্ড",
  cancelled: "বাতিল",
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
        STATUS_STYLES[status] ?? "bg-ink/10 text-ink/60"
      }`}
    >
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}
