export default function LandingCopyright() {
  return (
    <div className="relative overflow-hidden bg-plum-gradient text-cream">
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="container-premium relative flex flex-col items-center gap-6 py-8 sm:flex-row sm:justify-between">
        <p className="text-xs text-cream/40">
          &copy; {new Date().getFullYear()} Goldenhair Luxury Hair &amp; Beauty. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] uppercase tracking-widest text-cream/40">
          <span className="rounded border border-cream/15 px-2 py-1">bKash</span>
          <span className="rounded border border-cream/15 px-2 py-1">Nagad</span>
          <span className="rounded border border-cream/15 px-2 py-1">COD</span>
          <span className="rounded border border-cream/15 px-2 py-1">Visa</span>
          <span className="rounded border border-cream/15 px-2 py-1">Mastercard</span>
        </div>
      </div>
    </div>
  );
}
