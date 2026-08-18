"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronRight,
  Droplet,
  Leaf,
  ShieldCheck,
  Sparkle,
  Sparkles,
  Users,
} from "lucide-react";

const stageProducts = [
  {
    src: "/images/hero-products/shampoo-cutout.png",
    alt: "Goldenhair Sulfate Free Shampoo",
  },
  {
    src: "/images/hero-products/hair-booster-cutout.png",
    alt: "Goldenhair Hair Booster Hair Fall Solution",
  },
  {
    src: "/images/hero-products/growth-serum-cutout.png",
    alt: "Goldenhair Growth Serum Scalp Nutrition",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const trustItems = [
  { icon: Leaf, label: "Premium Hair Care" },
  { icon: Users, label: "For Men & Women" },
  { icon: Droplet, label: "Carefully Crafted Formula" },
  { icon: Sparkle, label: "Hair & Scalp Care" },
  { icon: ShieldCheck, label: "Quality Assured" },
];

export default function Hero() {
  const [productIndex, setProductIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setProductIndex((i) => (i + 1) % stageProducts.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/lifestyle/podium-purple-banner-img.png"
          alt="Goldenhair purple podium background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-ink/32 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
      </div>

      <div
        className="pointer-events-none absolute z-[2] h-[34svh] w-[19svh] -translate-x-1/2 -translate-y-full sm:h-[60svh] sm:w-[34svh]"
        style={{
          left: "min(calc(50vw + 52svh), calc(100vw - 19svh))",
          top: "82svh",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={productIndex}
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full w-full"
          >
            <Image
              src={stageProducts[productIndex].src}
              alt={stageProducts[productIndex].alt}
              fill
              sizes="220px"
              className="object-contain object-bottom drop-shadow-[0_18px_20px_rgba(0,0,0,0.45)]"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="grain pointer-events-none absolute inset-0 z-[1]" />

      <div className="container-premium pointer-events-none absolute inset-x-0 top-28 sm:top-32">
        <div className="relative h-28 w-80 sm:h-36 sm:w-[26rem]">
          <Image
            src="/images/lifestyle/logo-transparent.png"
            alt="Goldenhair — Luxury Hair & Beauty"
            fill
            className="object-contain object-left"
            style={{
              filter:
                "drop-shadow(2px 0 0 #000) drop-shadow(-2px 0 0 #000) drop-shadow(0 2px 0 #000) drop-shadow(0 -2px 0 #000)",
            }}
          />
        </div>
      </div>

      <div className="container-premium relative z-10 flex flex-1 flex-col justify-center pt-28 pb-12 sm:pt-32">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-[128px] max-w-2xl sm:mt-[168px]"
        >
          <motion.div variants={item} className="relative inline-block">
            <h1 className="text-balance font-display text-5xl font-medium leading-[1.08] tracking-tight text-cream sm:text-6xl lg:text-7xl">
              Healthy Hair.
              <br />
              <span className="text-gold-400">Elevated Beauty.</span>
            </h1>
            <motion.span
              aria-hidden
              animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-2 top-2 hidden text-gold-400 sm:-right-10 sm:top-6 sm:block"
            >
              <Sparkles size={30} strokeWidth={1.25} />
            </motion.span>
          </motion.div>

          <motion.div variants={item} className="mt-5 h-[3px] w-16 rounded-full bg-gold-gradient" />

          <motion.p
            variants={item}
            className="mt-6 max-w-md text-balance text-base leading-relaxed text-cream/75 sm:text-lg"
          >
            Premium hair care solutions designed to nourish, strengthen and
            bring out your natural shine.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/shop"
              className="btn-focus group relative flex items-center gap-1.5 overflow-hidden rounded-lg bg-gold-gradient px-7 py-3.5 text-sm font-semibold text-ink shadow-gold-glow transition-transform duration-500 ease-premium hover:scale-[1.03]"
            >
              Shop Collection
              <ChevronRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/hair-care"
              className="btn-focus group flex items-center gap-1.5 rounded-lg border border-gold-400/70 px-7 py-3.5 text-sm font-semibold text-gold-300 transition-colors duration-300 hover:bg-gold-400/10 hover:text-gold-200"
            >
              Explore Products
              <ChevronRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-5 border-t border-cream/15 pt-7 sm:gap-x-8"
        >
          {trustItems.map((t, i) => (
            <div key={t.label} className="flex items-center gap-6">
              <div className="flex items-center gap-2.5">
                <t.icon size={17} strokeWidth={1.5} className="shrink-0 text-gold-400" />
                <span className="text-xs font-medium leading-tight text-cream/85 sm:text-[13px]">
                  {t.label}
                </span>
              </div>
              {i < trustItems.length - 1 && (
                <span className="hidden h-8 w-px bg-cream/15 sm:block" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
