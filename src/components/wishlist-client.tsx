"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { products } from "@/data/products";
import { useWishlist } from "@/context/wishlist-context";
import ProductCard from "@/components/product-card";

export default function WishlistClient() {
  const { ids } = useWishlist();
  const saved = products.filter((p) => ids.includes(p.id));

  return (
    <section className="bg-warm-white py-16 sm:py-20">
      <div className="container-premium">
        {saved.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <Heart size={40} className="text-gold-400" strokeWidth={1} />
            <p className="font-serif text-xl text-ink/70">Your wishlist is empty</p>
            <Link
              href="/shop"
              className="btn-focus mt-2 rounded-full bg-ink px-8 py-4 text-sm font-medium uppercase tracking-widest text-cream transition-colors hover:bg-gold-600"
            >
              Discover Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 xl:grid-cols-3">
            {saved.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
