"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { bestsellerProducts } from "@/data/products";
import ProductCard from "@/components/product-card";
import SectionHeading from "@/components/section-heading";
import Reveal from "@/components/reveal";

export default function BestSellers() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="bg-charcoal py-24 sm:py-32">
      <div className="container-premium">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Best Sellers"
            title="Loved by Thousands"
            description="Our most-reached-for formulas, trusted for consistent, visible results."
            align="left"
            dark
          />
          <Reveal delay={0.15} className="flex shrink-0 items-center gap-3">
            <button
              aria-label="Previous product"
              disabled={!canPrev}
              onClick={() => emblaApi?.scrollPrev()}
              className="btn-focus flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors duration-300 hover:border-gold-400 hover:text-gold-400 disabled:opacity-30"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              aria-label="Next product"
              disabled={!canNext}
              onClick={() => emblaApi?.scrollNext()}
              className="btn-focus flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors duration-300 hover:border-gold-400 hover:text-gold-400 disabled:opacity-30"
            >
              <ArrowRight size={16} />
            </button>
          </Reveal>
        </div>

        <div className="mt-14 overflow-hidden" ref={emblaRef}>
          <div className="-ml-6 flex">
            {bestsellerProducts.concat(bestsellerProducts).map((product, i) => (
              <div
                key={`${product.id}-${i}`}
                className="min-w-0 shrink-0 grow-0 basis-[78%] pl-6 sm:basis-[46%] lg:basis-[30%]"
              >
                <div className="rounded-3xl bg-warm-white p-5">
                  <ProductCard product={product} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
