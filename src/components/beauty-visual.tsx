"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/reveal";

export default function BeautyVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative h-[85vh] min-h-[560px] overflow-hidden bg-ink">
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <Image
          src="/images/lifestyle/about.png"
          alt="Editorial portrait of glossy, healthy-looking long hair"
          fill
          sizes="100vw"
          className="object-cover object-[30%_center]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-ink/40" />

      <div className="container-premium relative flex h-full flex-col items-start justify-end pb-20">
        <Reveal>
          <span className="eyebrow">Editorial · Goldenhair Campaign</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-4 max-w-2xl text-balance font-serif text-4xl leading-[1.1] text-cream sm:text-5xl lg:text-6xl">
            Hair that looks like it&apos;s <span className="italic text-gold-400">meant to shine.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-md text-balance leading-relaxed text-cream/65">
            A beauty ritual designed around confidence — because healthy-looking
            hair is a statement all its own.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <Link
            href="/shop"
            className="btn-focus group mt-9 inline-flex items-center gap-2 rounded-full border border-gold-400/50 px-8 py-4 text-sm font-medium uppercase tracking-widest text-cream transition-all duration-500 hover:border-gold-400 hover:bg-gold-400/10"
          >
            Shop the Ritual
            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
