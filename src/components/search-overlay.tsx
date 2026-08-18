"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/format";

export default function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return products;
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.concern.some((c) => c.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[95] bg-ink/95 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="container-premium mt-24 sm:mt-32"
          >
            <div className="flex items-center gap-4 border-b border-gold-500/30 pb-4">
              <Search size={22} className="text-gold-400" strokeWidth={1.5} />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search shampoo, serum, hair fall..."
                className="w-full bg-transparent font-serif text-2xl text-cream placeholder:text-cream/30 focus:outline-none sm:text-4xl"
              />
              <button
                aria-label="Close search"
                onClick={onClose}
                className="btn-focus rounded-full p-2 text-cream/70 hover:text-gold-400"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="mt-8 grid max-h-[60vh] grid-cols-1 gap-3 overflow-y-auto sm:grid-cols-2 lg:grid-cols-3">
              {results.map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.slug}`}
                  onClick={onClose}
                  className="group flex items-center gap-4 rounded-2xl border border-cream/10 p-3 transition-colors duration-300 hover:border-gold-500/40 hover:bg-cream/5"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-cream/5">
                    <Image src={p.images[0]} alt={p.name} fill className="object-contain p-1" sizes="64px" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-serif text-base text-cream group-hover:text-gold-400">
                      {p.name}
                    </p>
                    <p className="text-xs text-cream/50">{formatPrice(p.price)}</p>
                  </div>
                </Link>
              ))}
              {results.length === 0 && (
                <p className="col-span-full py-10 text-center text-cream/50">
                  No products found for &ldquo;{query}&rdquo;
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
