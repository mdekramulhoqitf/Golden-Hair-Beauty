"use client";

import { motion } from "framer-motion";
import { Droplets, Feather, Gem, ShieldCheck, Sparkles, Users2 } from "lucide-react";
import SectionHeading from "@/components/section-heading";

const benefits = [
  { icon: Droplets, title: "Nourishes Hair", desc: "Deep hydration that helps replenish moisture from within." },
  { icon: ShieldCheck, title: "Stronger-Looking Hair", desc: "Supports the appearance of resilient, fortified strands." },
  { icon: Sparkles, title: "Improves Appearance", desc: "Helps improve the overall look and texture of hair." },
  { icon: Gem, title: "Adds Shine", desc: "A glass-like finish that catches the light beautifully." },
  { icon: Feather, title: "Scalp Care", desc: "Gently balances and nourishes the scalp environment." },
  { icon: Users2, title: "Men & Women", desc: "Thoughtfully formulated to suit every hair journey." },
];

export default function Benefits() {
  return (
    <section className="relative bg-warm-white py-24 sm:py-32">
      <div className="container-premium">
        <SectionHeading
          eyebrow="Why Goldenhair"
          title="Benefits You Can See & Feel"
          description="Every formula is engineered around one goal — hair that looks and feels genuinely healthier."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-ink/8 bg-warm-white p-8 transition-colors duration-500 hover:border-gold-500/40"
            >
              <motion.span
                whileHover={{ rotate: 8, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/10 text-gold-600"
              >
                <b.icon size={20} strokeWidth={1.5} />
              </motion.span>
              <h3 className="font-serif text-lg text-ink">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/55">{b.desc}</p>
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gold-gradient transition-all duration-500 ease-premium group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
