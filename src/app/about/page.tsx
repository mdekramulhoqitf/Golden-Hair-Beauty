import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/page-hero";
import SectionHeading from "@/components/section-heading";
import Reveal from "@/components/reveal";
import { Gem, Leaf, ShieldCheck, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Discover the story behind Goldenhair — a premium hair care and beauty brand crafted for visibly healthier, stronger, shinier-looking hair.",
};

const values = [
  { icon: Leaf, title: "Thoughtful Formulation", desc: "Every ingredient is chosen for a reason — nourishment without compromise." },
  { icon: ShieldCheck, title: "Quality First", desc: "Rigorously tested formulas that meet international beauty standards." },
  { icon: Gem, title: "Refined Experience", desc: "From bottle to ritual, every detail is considered and elevated." },
  { icon: Sparkles, title: "Visible Confidence", desc: "We measure success in how our customers feel, not just how products perform." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="Crafted for Confidence"
        description="Goldenhair was founded on a simple belief — that premium hair care should feel as good as it performs."
      />

      <section className="bg-warm-white py-24">
        <div className="container-premium grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-premium">
              <Image
                src="/images/lifestyle/about.png"
                alt="Goldenhair brand portrait — healthy, glossy long hair"
                fill
                sizes="(min-width: 1024px) 44vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <span className="eyebrow">Since Day One</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 max-w-lg text-balance font-serif text-4xl leading-[1.15] text-ink">
                A modern approach to timeless hair care
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-md leading-relaxed text-ink/60">
                Goldenhair began with a question: why should premium hair care
                feel inaccessible? We set out to build formulas — a sulfate-free
                shampoo, a scalp nutrition serum, and a targeted hair booster —
                that combine effective, thoughtfully-sourced ingredients with an
                experience that feels genuinely luxurious.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="mt-4 max-w-md leading-relaxed text-ink/60">
                Designed for men and women alike, every formula is crafted to
                help support healthier-looking hair, one consistent ritual at a
                time.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-24">
        <div className="container-premium">
          <SectionHeading
            eyebrow="What We Stand For"
            title="Our Values"
            dark
          />
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="rounded-2xl border border-cream/10 p-7 transition-colors duration-500 hover:border-gold-500/40">
                  <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-gold-500/10 text-gold-400">
                    <v.icon size={19} strokeWidth={1.5} />
                  </span>
                  <h3 className="font-serif text-lg text-cream">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/55">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
