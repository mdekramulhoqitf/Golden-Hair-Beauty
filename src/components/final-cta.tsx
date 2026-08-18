"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/reveal";
import MagneticButton from "@/components/magnetic-button";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 sm:py-36">
      <div className="absolute inset-0 opacity-30">
        <Image
          src="/images/lifestyle/hair-booster-lifestyle.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/70" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/10 blur-[140px]"
      />

      <div className="container-premium relative flex flex-col items-center text-center">
        <Reveal>
          <span className="eyebrow">Elevate Your Ritual</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-5 max-w-2xl text-balance font-serif text-4xl leading-[1.1] text-cream sm:text-5xl lg:text-6xl">
            Your Hair Deserves <span className="italic text-gold-400">Better.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-md text-balance leading-relaxed text-cream/60">
            Discover a smarter approach to everyday hair care — nourishing
            formulas crafted for visible, lasting confidence.
          </p>
        </Reveal>
        <Reveal delay={0.3} className="mt-10">
          <MagneticButton>
            <Link
              href="/shop"
              className="btn-focus group inline-flex items-center gap-2.5 rounded-full bg-gold-gradient px-10 py-5 text-sm font-semibold uppercase tracking-widest text-ink shadow-gold-glow transition-transform duration-500 ease-premium hover:scale-[1.03]"
            >
              Shop Goldenhair
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
