"use client";

import { useEffect, useState } from "react";
import { Product } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/context/toast-context";

export default function StickyPurchaseBar({ product }: { product: Product }) {
  const [visible, setVisible] = useState(false);
  const { addItem } = useCart();
  const { push } = useToast();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-ink/10 bg-warm-white/95 px-5 py-4 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:hidden">
      <div>
        <p className="truncate text-xs text-ink/50">{product.name}</p>
        <p className="font-serif text-lg text-ink">{formatPrice(product.price)}</p>
      </div>
      <button
        onClick={() => {
          addItem(product, 1);
          push(`${product.name} added to bag`);
        }}
        className="btn-focus shrink-0 rounded-full bg-ink px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-cream"
      >
        Add to Cart
      </button>
    </div>
  );
}
