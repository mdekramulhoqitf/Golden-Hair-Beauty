export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-warm-white">
      <div className="flex items-center gap-3">
        <span className="h-2 w-2 animate-pulse rounded-full bg-gold-500 [animation-delay:-0.3s]" />
        <span className="h-2 w-2 animate-pulse rounded-full bg-gold-500 [animation-delay:-0.15s]" />
        <span className="h-2 w-2 animate-pulse rounded-full bg-gold-500" />
      </div>
    </div>
  );
}
