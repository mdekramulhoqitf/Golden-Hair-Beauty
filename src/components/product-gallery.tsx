"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Product } from "@/data/products";
import { cn } from "@/lib/format";

const accentBg: Record<Product["accent"], string> = {
  plum: "from-plum via-plum-dark to-ink",
  sapphire: "from-[#0e1c3f] via-[#152a5c] to-[#0a1226]",
  amber: "from-[#241705] via-[#2f2107] to-charcoal",
};

export default function ProductGallery({ product }: { product: Product }) {
  const images = [...product.images, ...product.lifestyleImages];
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");

  return (
    <div className="flex flex-col-reverse gap-4 sm:flex-row">
      <div className="flex shrink-0 gap-3 overflow-x-auto sm:flex-col sm:overflow-visible">
        {images.map((img, i) => (
          <button
            key={img + i}
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            className={cn(
              "relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 bg-cream transition-colors duration-300",
              active === i ? "border-gold-500" : "border-transparent hover:border-ink/15"
            )}
          >
            <Image src={img} alt="" fill className="object-cover" sizes="64px" />
          </button>
        ))}
      </div>

      <div
        className={cn(
          "relative aspect-square flex-1 overflow-hidden rounded-3xl bg-gradient-to-br shadow-premium",
          accentBg[product.accent]
        )}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          setOrigin(`${x}% ${y}%`);
        }}
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={images[active]}
              alt={`${product.name} — view ${active + 1}`}
              fill
              priority
              sizes="(min-width: 1024px) 520px, 90vw"
              className="object-contain p-10 transition-transform duration-500 ease-premium"
              style={{
                transform: zoom ? "scale(1.35)" : "scale(1)",
                transformOrigin: origin,
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
