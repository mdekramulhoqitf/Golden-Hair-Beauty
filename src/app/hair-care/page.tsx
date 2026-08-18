import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Hair Care Guide",
  description: "A simple, effective daily hair care ritual using Goldenhair's sulfate-free shampoo, growth serum and hair booster.",
};

const steps = [
  {
    step: "01",
    title: "Cleanse",
    product: "Sulfate Free Shampoo",
    desc: "Begin every ritual with a gentle, sulfate-free cleanse. Massage into a wet scalp, lather through lengths, and rinse thoroughly to remove buildup without stripping natural oils.",
    image: "/images/products/shampoo.png",
    href: "/product/sulfate-free-shampoo",
  },
  {
    step: "02",
    title: "Nourish",
    product: "Growth Serum – Scalp Nutrition",
    desc: "Mist the Growth Serum evenly across a clean scalp and mid-lengths. Massage gently in circular motions to help support the appearance of healthier hair growth and shine.",
    image: "/images/products/growth-serum.png",
    href: "/product/growth-serum-scalp-nutrition",
  },
  {
    step: "03",
    title: "Strengthen",
    product: "Hair Booster – Hair Fall Solution",
    desc: "Apply the Hair Booster to targeted areas before bed. Leave in overnight for absorption, helping support stronger-looking roots and reduce the appearance of hair fall.",
    image: "/images/products/hair-booster.png",
    href: "/product/hair-booster-hair-fall-solution",
  },
];

export default function HairCarePage() {
  return (
    <>
      <PageHero
        eyebrow="The Ritual"
        title="A Simple Daily Hair Care Routine"
        description="Three steps, one consistent ritual — designed to work together for visibly healthier-looking hair."
      />

      <section className="bg-warm-white py-20">
        <div className="container-premium flex flex-col gap-24">
          {steps.map((s, i) => (
            <Reveal key={s.step}>
              <div
                className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-2 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-3xl bg-cream">
                  <Image
                    src={s.image}
                    alt={s.product}
                    fill
                    sizes="(min-width: 1024px) 400px, 90vw"
                    className="object-contain p-12"
                  />
                </div>
                <div>
                  <span className="font-serif text-5xl text-gold-500/30">{s.step}</span>
                  <h2 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">{s.title}</h2>
                  <p className="mt-1 text-sm font-medium uppercase tracking-wide text-gold-600">
                    {s.product}
                  </p>
                  <p className="mt-5 max-w-md leading-relaxed text-ink/60">{s.desc}</p>
                  <Link
                    href={s.href}
                    className="btn-focus group mt-6 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-ink transition-colors hover:text-gold-600"
                  >
                    Shop This Step
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
