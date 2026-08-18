"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Star, X } from "lucide-react";
import { useQuickView } from "@/context/quickview-context";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/context/toast-context";
import { formatPrice, cn } from "@/lib/format";

const accentBg = {
  plum: "from-plum via-plum-dark to-ink",
  sapphire: "from-[#0e1c3f] via-[#152a5c] to-[#0a1226]",
  amber: "from-[#241705] via-[#2f2107] to-charcoal",
};

export default function QuickViewModal() {
  const { product, close } = useQuickView();
  const { addItem } = useCart();
  const { push } = useToast();

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[130] bg-ink/70 backdrop-blur-sm"
            onClick={close}
          />
          <div className="fixed inset-0 z-[140] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative grid w-full max-w-3xl grid-cols-1 overflow-hidden rounded-3xl bg-warm-white shadow-premium sm:grid-cols-2"
              role="dialog"
              aria-modal="true"
            >
              <button
                aria-label="Close quick view"
                onClick={close}
                className="btn-focus absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-ink/10 text-ink hover:bg-ink/20"
              >
                <X size={18} />
              </button>

              <div className={cn("relative aspect-square bg-gradient-to-br sm:aspect-auto", accentBg[product.accent])}>
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-contain p-10"
                  sizes="(min-width: 640px) 360px, 90vw"
                />
              </div>

              <div className="flex flex-col justify-center p-7 sm:p-9">
                <span className="eyebrow mb-2">{product.tagline}</span>
                <h3 className="font-serif text-2xl text-ink sm:text-3xl">{product.name}</h3>
                <div className="mt-3 flex items-center gap-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      className={i < Math.round(product.rating) ? "text-gold-500" : "text-ink/15"}
                      fill="currentColor"
                    />
                  ))}
                  <span className="ml-1 text-xs text-ink/45">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink/60">
                  {product.shortDescription}
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <span className="font-serif text-2xl text-ink">{formatPrice(product.price)}</span>
                  {product.oldPrice && (
                    <span className="text-base text-ink/35 line-through">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                </div>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => {
                      addItem(product, 1);
                      push(`${product.name} added to bag`);
                      close();
                    }}
                    className="btn-focus flex-1 rounded-full bg-ink px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-gold-600"
                  >
                    Add to Cart
                  </button>
                  <Link
                    href={`/product/${product.slug}`}
                    onClick={close}
                    className="btn-focus flex-1 rounded-full border border-ink/15 px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:border-ink"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
