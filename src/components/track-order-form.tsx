"use client";

import { useState } from "react";
import { PackageSearch } from "lucide-react";

export default function TrackOrderForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="flex flex-col gap-5 rounded-3xl border border-ink/10 bg-cream p-8"
    >
      <label className="flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-ink/50">Order ID</span>
        <input
          required
          placeholder="GH-100234"
          className="btn-focus rounded-xl border border-ink/15 bg-warm-white px-4 py-3.5 text-sm text-ink placeholder:text-ink/30 focus:border-gold-500"
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-ink/50">Phone Number</span>
        <input
          required
          type="tel"
          placeholder="01XXXXXXXXX"
          className="btn-focus rounded-xl border border-ink/15 bg-warm-white px-4 py-3.5 text-sm text-ink placeholder:text-ink/30 focus:border-gold-500"
        />
      </label>
      <button
        type="submit"
        className="btn-focus mt-2 rounded-full bg-ink py-3.5 text-sm font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-gold-600"
      >
        Track Order
      </button>

      {submitted && (
        <div className="mt-2 flex items-center gap-3 rounded-xl border border-gold-500/30 bg-gold-500/5 p-4">
          <PackageSearch size={18} className="shrink-0 text-gold-600" />
          <p className="text-sm text-ink/70">
            We couldn&apos;t find a matching order. Please double-check your details or contact support.
          </p>
        </div>
      )}
    </form>
  );
}
