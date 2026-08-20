"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, BadgeCheck, Play, Star } from "lucide-react";
import { landingTestimonials as testimonials } from "@/data/landing-testimonials";
import Reveal from "@/components/reveal";

export default function LandingReviews() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="bg-[#0f3b38] py-16 sm:py-20">
      <div className="container-premium">
        <Reveal className="mb-12 text-center">
          <h2 className="text-balance text-xl font-bold text-white sm:text-2xl">
            ⭐ ⭐ ⭐ কাস্টমার রিভিউ ⭐ ⭐ ⭐
          </h2>
        </Reveal>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="-ml-5 flex">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="min-w-0 shrink-0 grow-0 basis-[82%] pl-5 sm:basis-[46%] lg:basis-[25%]"
                >
                  <div className="flex h-full flex-col rounded-2xl bg-[#fbf3e2] p-6 shadow-lg shadow-black/20">
                    {t.media?.type === "image" && (
                      <div className="relative -mx-6 -mt-6 mb-4 aspect-[4/3] overflow-hidden rounded-t-2xl">
                        <Image
                          src={t.media.src}
                          alt={`${t.name} এর রিভিউ`}
                          fill
                          sizes="(max-width: 1024px) 82vw, 320px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    {t.media?.type === "video" && (
                      <div className="relative -mx-6 -mt-6 mb-4 aspect-[4/3] overflow-hidden rounded-t-2xl bg-ink">
                        <video
                          src={t.media.src}
                          poster={t.media.poster}
                          controls
                          preload="metadata"
                          className="h-full w-full object-cover"
                        />
                        <span className="pointer-events-none absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white">
                          <Play size={12} fill="currentColor" />
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={13}
                          className={i < t.rating ? "text-[#f6a623]" : "text-ink/15"}
                          fill="currentColor"
                        />
                      ))}
                    </div>
                    {t.review && (
                      <p className="mt-3 flex-1 text-base leading-relaxed text-ink/80">
                        &ldquo;{t.review}&rdquo;
                      </p>
                    )}
                    <div className="mt-4 flex items-center gap-2 border-t border-ink/10 pt-4">
                      <span className="text-base font-medium text-ink">{t.name}</span>
                      <span className="text-ink/30">·</span>
                      <span className="text-sm text-ink/50">{t.location}</span>
                    </div>
                    {t.verified && (
                      <span className="mt-2 inline-flex w-fit items-center gap-1 rounded-full bg-[#0f3b38]/10 px-2.5 py-1 text-xs font-medium text-[#0f3b38]">
                        <BadgeCheck size={13} />
                        যাচাইকৃত ক্রেতা
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              aria-label="Previous review"
              onClick={() => emblaApi?.scrollPrev()}
              className="btn-focus flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-[#f6a623] hover:text-[#f6a623]"
            >
              <ArrowLeft size={16} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  aria-label={`Go to review ${i + 1}`}
                  onClick={() => emblaApi?.scrollTo(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === selected ? "w-7 bg-[#f6a623]" : "w-1.5 bg-white/25"
                  }`}
                />
              ))}
            </div>
            <button
              aria-label="Next review"
              onClick={() => emblaApi?.scrollNext()}
              className="btn-focus flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-[#f6a623] hover:text-[#f6a623]"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
