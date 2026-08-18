import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Collections",
  description: "Shop Goldenhair by collection — Sulfate Free Shampoo, Hair Booster and Growth Serum.",
};

const collections = [
  {
    title: "Sulfate Free Shampoo",
    desc: "Gentle daily cleansing that nourishes from root to tip.",
    image: "/images/lifestyle/shampoo-lifestyle.png",
    href: "/shop?category=shampoo",
  },
  {
    title: "Hair Booster",
    desc: "Targeted hair fall solution with Minoxidil 5.",
    image: "/images/lifestyle/hair-booster-lifestyle.png",
    href: "/shop?category=booster",
  },
  {
    title: "Growth Serum",
    desc: "Concentrated scalp nutrition for visible shine.",
    image: "/images/lifestyle/growth-serum-lifestyle-1.png",
    href: "/shop?category=serum",
  },
];

export default function CollectionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Shop By Ritual"
        title="Our Collections"
        description="Three formulas, each engineered for a distinct purpose within your daily hair care ritual."
      />
      <section className="bg-warm-white py-20">
        <div className="container-premium grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <Link
                href={c.href}
                className="group relative block aspect-[3/4] overflow-hidden rounded-3xl shadow-premium"
              >
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 90vw"
                  className="object-cover transition-transform duration-700 ease-premium group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <h2 className="font-serif text-2xl text-cream">{c.title}</h2>
                  <p className="mt-2 max-w-xs text-sm text-cream/70">{c.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-gold-400">
                    Shop Now
                    <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
