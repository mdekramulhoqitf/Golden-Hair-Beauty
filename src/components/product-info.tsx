"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BadgeCheck, Check, Heart, Minus, Plus, RotateCcw, ShieldCheck, Star, Truck } from "lucide-react";
import { Product } from "@/data/products";
import { formatPrice, cn } from "@/lib/format";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { useToast } from "@/context/toast-context";

export default function ProductInfo({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { push } = useToast();
  const router = useRouter();
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="flex flex-col">
      <span className="eyebrow">{product.tagline}</span>
      <h1 className="mt-3 font-serif text-3xl leading-tight text-ink sm:text-4xl">
        {product.name}
      </h1>

      <div className="mt-4 flex items-center gap-3">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < Math.round(product.rating) ? "text-gold-500" : "text-ink/15"}
              fill="currentColor"
            />
          ))}
        </div>
        <span className="text-sm text-ink/50">
          {product.rating} ({product.reviewCount} reviews)
        </span>
        <span className="h-1 w-1 rounded-full bg-ink/20" />
        <span className="text-sm text-emerald-700">In Stock</span>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <span className="font-serif text-3xl text-ink">{formatPrice(product.price)}</span>
        {product.oldPrice && (
          <span className="text-lg text-ink/35 line-through">{formatPrice(product.oldPrice)}</span>
        )}
        {product.oldPrice && (
          <span className="rounded-full bg-gold-500/10 px-3 py-1 text-xs font-medium text-gold-700">
            Save {Math.round(100 - (product.price / product.oldPrice) * 100)}%
          </span>
        )}
      </div>

      <p className="mt-6 max-w-md text-sm leading-relaxed text-ink/60">
        {product.shortDescription}
      </p>

      <ul className="mt-6 flex flex-col gap-2.5">
        {product.benefits.slice(0, 4).map((b) => (
          <li key={b} className="flex items-start gap-2.5 text-sm text-ink/70">
            <Check size={15} className="mt-0.5 shrink-0 text-gold-600" />
            {b}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-4 rounded-full border border-ink/15 px-2 py-2">
          <button
            aria-label="Decrease quantity"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="btn-focus flex h-8 w-8 items-center justify-center rounded-full text-ink/60 hover:bg-ink/5"
          >
            <Minus size={14} />
          </button>
          <span className="w-5 text-center text-sm font-medium">{qty}</span>
          <button
            aria-label="Increase quantity"
            onClick={() => setQty((q) => q + 1)}
            className="btn-focus flex h-8 w-8 items-center justify-center rounded-full text-ink/60 hover:bg-ink/5"
          >
            <Plus size={14} />
          </button>
        </div>

        <button
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => {
            toggle(product.id);
            push(wishlisted ? "Removed from wishlist" : "Added to wishlist", "wishlist");
          }}
          className="btn-focus flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 text-ink/60 transition-colors hover:border-gold-500 hover:text-gold-600"
        >
          <motion.span animate={wishlisted ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.4 }}>
            <Heart size={18} fill={wishlisted ? "currentColor" : "none"} className={wishlisted ? "text-gold-500" : ""} />
          </motion.span>
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={() => {
            addItem(product, qty);
            push(`${product.name} added to bag`);
          }}
          className="btn-focus flex-1 rounded-full bg-ink px-8 py-4 text-sm font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-gold-600"
        >
          Add to Cart
        </button>
        <button
          onClick={() => {
            addItem(product, qty);
            router.push("/checkout");
          }}
          className={cn(
            "btn-focus flex-1 rounded-full bg-gold-gradient px-8 py-4 text-sm font-semibold uppercase tracking-widest text-ink shadow-gold-glow transition-transform duration-300 hover:scale-[1.02]"
          )}
        >
          Buy Now
        </button>
      </div>

      <div className="mt-9 grid grid-cols-1 gap-3 rounded-2xl border border-ink/10 p-5 sm:grid-cols-3">
        {[
          [Truck, "Fast Delivery", "2–5 days nationwide"],
          [ShieldCheck, "Quality Assured", "100% authentic formula"],
          [RotateCcw, "Easy Returns", "7-day return window"],
        ].map(([Icon, title, desc]: any) => (
          <div key={title} className="flex items-start gap-2.5">
            <Icon size={17} className="mt-0.5 shrink-0 text-gold-600" strokeWidth={1.5} />
            <div>
              <p className="text-xs font-medium text-ink">{title}</p>
              <p className="text-[11px] text-ink/45">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-2 text-xs text-ink/40">
        <BadgeCheck size={13} className="text-gold-600" />
        Cash on Delivery, bKash, Nagad & Card accepted
      </div>
    </div>
  );
}
