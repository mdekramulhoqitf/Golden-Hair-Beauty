"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import SectionHeading from "@/components/section-heading";
import Reveal from "@/components/reveal";

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const go = (dir: number) => {
    setDirection(dir);
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  };

  const t = testimonials[index];

  return (
    <section className="bg-cream py-24 sm:py-32">
      <div className="container-premium">
        <SectionHeading
          eyebrow="Customer Stories"
          title="What Our Customers Say"
          description="Real experiences from the Goldenhair community across Bangladesh."
        />

        <Reveal delay={0.15} className="relative mx-auto mt-16 max-w-2xl">
          <Quote size={48} className="mx-auto mb-6 text-gold-500/25" strokeWidth={1} />

          <div className="relative min-h-[220px] sm:min-h-[180px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={t.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 40 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex flex-col items-center text-center"
              >
                <div className="mb-4 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      className={i < t.rating ? "text-gold-500" : "text-ink/15"}
                      fill="currentColor"
                    />
                  ))}
                </div>
                <p className="text-balance font-serif text-xl leading-relaxed text-ink sm:text-2xl">
                  &ldquo;{t.review}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-2">
                  <span className="font-medium text-ink">{t.name}</span>
                  <span className="text-ink/30">·</span>
                  <span className="text-sm text-ink/50">{t.location}</span>
                  {t.verified && (
                    <span className="ml-1 flex items-center gap-1 rounded-full bg-gold-500/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-gold-700">
                      <BadgeCheck size={11} />
                      Verified
                    </span>
                  )}
                </div>
                <span className="mt-1 text-xs text-ink/40">Purchased {t.product}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              aria-label="Previous review"
              onClick={() => go(-1)}
              className="btn-focus flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink/60 transition-colors hover:border-gold-500 hover:text-gold-600"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((tm, i) => (
                <button
                  key={tm.id}
                  aria-label={`Go to review ${i + 1}`}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === index ? "w-7 bg-gold-500" : "w-1.5 bg-ink/15"
                  }`}
                />
              ))}
            </div>
            <button
              aria-label="Next review"
              onClick={() => go(1)}
              className="btn-focus flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink/60 transition-colors hover:border-gold-500 hover:text-gold-600"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
