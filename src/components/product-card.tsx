"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Heart, ShoppingBag, Star } from "lucide-react";
import { Product } from "@/data/products";
import { formatPrice, cn } from "@/lib/format";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { useQuickView } from "@/context/quickview-context";
import { useToast } from "@/context/toast-context";

const accentBg: Record<Product["accent"], string> = {
  plum: "from-plum via-plum-dark to-ink",
  sapphire: "from-[#0e1c3f] via-[#152a5c] to-[#0a1226]",
  amber: "from-[#241705] via-[#2f2107] to-charcoal",
};

const accentGlow: Record<Product["accent"], string> = {
  plum: "bg-fuchsia-400/10",
  sapphire: "bg-blue-400/10",
  amber: "bg-amber-300/15",
};

export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { open } = useQuickView();
  const { push } = useToast();
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="group relative flex flex-col">
      <div
        className={cn(
          "relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br",
          accentBg[product.accent]
        )}
      >
        <div
          className={cn(
            "absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl transition-opacity duration-700 group-hover:opacity-100",
            accentGlow[product.accent]
          )}
        />

        <button
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => {
            toggle(product.id);
            push(
              wishlisted ? "Removed from wishlist" : "Added to wishlist",
              "wishlist"
            );
          }}
          className="btn-focus absolute right-3.5 top-3.5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-ink/30 text-cream backdrop-blur-sm transition-colors duration-300 hover:bg-ink/50"
        >
          <motion.span animate={wishlisted ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.4 }}>
            <Heart
              size={16}
              strokeWidth={1.75}
              className={wishlisted ? "text-gold-400" : "text-cream"}
              fill={wishlisted ? "currentColor" : "none"}
            />
          </motion.span>
        </button>

        {product.oldPrice && (
          <span className="absolute left-3.5 top-3.5 z-10 rounded-full bg-gold-gradient px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-ink">
            Save {Math.round(100 - (product.price / product.oldPrice) * 100)}%
          </span>
        )}

        <Link href={`/product/${product.slug}`} className="absolute inset-0">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
            className="object-contain p-8 transition-transform duration-700 ease-premium group-hover:scale-[1.08] sm:p-10"
          />
        </Link>

        <div className="absolute inset-x-0 bottom-0 flex translate-y-[calc(100%-0px)] items-center justify-center gap-2 p-4 opacity-0 transition-all duration-500 ease-premium group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={() => {
              addItem(product, 1);
              push(`${product.name} added to bag`);
            }}
            className="btn-focus flex flex-1 items-center justify-center gap-2 rounded-full bg-gold-gradient px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-ink shadow-gold-glow transition-transform duration-300 hover:scale-[1.02]"
          >
            <ShoppingBag size={13} />
            Add to Cart
          </button>
          <button
            aria-label="Quick view"
            onClick={() => open(product)}
            className="btn-focus flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream/15 text-cream backdrop-blur-sm transition-colors duration-300 hover:bg-cream/25"
          >
            <Eye size={15} strokeWidth={1.75} />
          </button>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-1.5 px-1">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={12}
              className={i < Math.round(product.rating) ? "text-gold-500" : "text-ink/15"}
              fill="currentColor"
            />
          ))}
          <span className="ml-1 text-[11px] text-ink/40">({product.reviewCount})</span>
        </div>
        <Link href={`/product/${product.slug}`}>
          <h3 className="gold-underline inline font-serif text-lg leading-snug text-ink">
            {product.name}
          </h3>
        </Link>
        <p className="line-clamp-1 text-sm text-ink/50">{product.shortDescription}</p>
        <div className="mt-1 flex items-center gap-2">
          <span className="font-serif text-base text-ink">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="text-sm text-ink/35 line-through">{formatPrice(product.oldPrice)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
