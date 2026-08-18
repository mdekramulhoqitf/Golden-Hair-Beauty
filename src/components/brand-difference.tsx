"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Reveal from "@/components/reveal";

const pillars = [
  {
    n: "01",
    title: "Nourish",
    desc: "Botanical oils and vitamins help replenish moisture from root to tip.",
  },
  {
    n: "02",
    title: "Strengthen",
    desc: "Peptide-rich actives support the appearance of stronger, more resilient roots.",
  },
  {
    n: "03",
    title: "Shine",
    desc: "A refined finish that leaves hair looking smooth, glossy and healthy.",
  },
];

export default function BrandDifference() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-24 sm:py-32">
      <div className="grain pointer-events-none absolute inset-0 opacity-50" />
      <div className="container-premium relative grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div>
          <Reveal>
            <span className="eyebrow">The Goldenhair Difference</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 text-balance font-serif text-4xl leading-[1.12] text-cream sm:text-5xl lg:text-[3.4rem]">
              Beauty rituals, built on{" "}
              <span className="italic text-gold-400">visible results.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-md text-balance leading-relaxed text-cream/60">
              Every Goldenhair formula is crafted around a simple philosophy —
              nourish deeply, strengthen visibly, and finish with a shine that
              speaks for itself.
            </p>
          </Reveal>

          <div className="mt-12 flex flex-col divide-y divide-cream/10 border-t border-cream/10">
            {pillars.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group flex items-center gap-6 py-6"
              >
                <span className="font-serif text-sm text-gold-500/70">{p.n}</span>
                <div className="flex-1">
                  <h3 className="font-serif text-xl text-cream transition-colors duration-300 group-hover:text-gold-400">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm text-cream/50">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <Reveal delay={0.1} className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-premium"
          >
            <Image
              src="/images/lifestyle/banner.png"
              alt="Goldenhair product collection — shampoo, hair booster and growth serum"
              fill
              sizes="(min-width: 1024px) 44vw, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
          </motion.div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-gold-500/30 bg-charcoal/90 px-6 py-4 backdrop-blur sm:block">
            <p className="font-serif text-2xl text-gold-400">3</p>
            <p className="text-[11px] uppercase tracking-wide text-cream/60">Essential Formulas</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
