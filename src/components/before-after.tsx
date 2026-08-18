"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronsLeftRight } from "lucide-react";
import SectionHeading from "@/components/section-heading";
import Reveal from "@/components/reveal";

export default function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(50);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPercent(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <section className="bg-cream py-24 sm:py-32">
      <div className="container-premium">
        <SectionHeading
          eyebrow="See The Difference"
          title="Drag to Reveal"
          description="A visible difference in hair appearance — smoother, glossier, healthier-looking with consistent care."
        />

        <Reveal delay={0.15} className="mx-auto mt-14 max-w-4xl">
          <div
            ref={containerRef}
            data-testid="before-after-slider"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
            className="relative aspect-[3/2] w-full touch-none select-none overflow-hidden rounded-3xl shadow-premium"
          >
            <Image
              src="/images/lifestyle/afterbefore.png"
              alt="After — smooth, shiny, healthy-looking hair"
              fill
              sizes="(min-width: 1024px) 900px, 100vw"
              className="pointer-events-none object-cover"
              draggable={false}
            />

            <div
              className="pointer-events-none absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}
            >
              <Image
                src="/images/lifestyle/afterbefore.png"
                alt="Before — dry, frizzy, unmanageable hair"
                fill
                sizes="(min-width: 1024px) 900px, 100vw"
                className="object-cover"
                style={{ filter: "grayscale(0.55) contrast(0.92) brightness(0.88) blur(0.5px)" }}
                draggable={false}
              />
            </div>

            <div
              className="pointer-events-none absolute inset-y-0 w-[2px] bg-cream/90"
              style={{ left: `${percent}%` }}
            />

            <motion.div
              style={{ left: `${percent}%` }}
              className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-gold-400/60 bg-warm-white text-ink shadow-premium"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
            >
              <ChevronsLeftRight size={17} strokeWidth={1.75} />
            </motion.div>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="mx-auto mt-6 max-w-lg text-center text-xs text-ink/40">
            Individual results may vary. Images shown reflect visible difference in hair
            appearance with consistent, proper use.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
