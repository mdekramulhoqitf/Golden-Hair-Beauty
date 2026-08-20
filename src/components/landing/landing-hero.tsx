"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import Reveal from "@/components/reveal";

const SLIDESHOW_IMAGES = [
  { src: "/images/item/hair_boster/hair booster (1).png", width: 1023, height: 1537 },
  { src: "/images/item/hair_boster/hair booster (2).png", width: 1023, height: 1537 },
  { src: "/images/item/hair_boster/hair booster (3).png", width: 1023, height: 1537 },
  { src: "/images/item/hair_boster/hair booster (4).png", width: 1122, height: 1402 },
  { src: "/images/item/hair_boster/hair booster (5).png", width: 1023, height: 1537 },
];

export default function LandingHero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDESHOW_IMAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-[#fbf3e2] px-4 pb-10 pt-28 sm:pt-32">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-5 text-center">
        <Reveal>
          <div className="w-full overflow-x-auto rounded-2xl bg-[#0f3b38] px-5 py-4 shadow-lg shadow-black/10">
            <h1 className="whitespace-nowrap text-[13px] font-bold leading-snug text-white sm:text-2xl">
              Hair Booster এর ছোঁয়ায় চুলের হারানো সৌন্দর্য ফিরে পেয়েছে হাজারো মানুষ।
            </h1>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="w-full">
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[340px] w-full overflow-hidden rounded-2xl sm:h-[440px] lg:h-[520px]"
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeSlide}
                initial={{ x: 80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -80, opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Image
                  src={SLIDESHOW_IMAGES[activeSlide].src}
                  alt="Goldenhair সালফেট ফ্রি শ্যাম্পু, হেয়ার বুস্টার ও গ্রোথ সিরাম"
                  width={SLIDESHOW_IMAGES[activeSlide].width}
                  height={SLIDESHOW_IMAGES[activeSlide].height}
                  priority={activeSlide === 0}
                  sizes="(max-width: 640px) 90vw, 480px"
                  className="h-full w-auto max-w-full rounded-2xl object-contain"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="w-full overflow-x-auto text-lg leading-relaxed text-[#1c1c1c]/80 sm:text-2xl">
            <span className="block whitespace-nowrap">
              Hair Booster- ব্যাবহারে চুল পড়া বন্ধ করে,নতুন চুল গজাতে সাহায্য করে,চুল হবে লম্বা সিল্ক ও সাইনি।
            </span>
            ফিরে আসবে চুলের হারিয়ে যাওয়া সৌন্দর্যের আত্নবিশ্বাস।
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <a
            href="#order"
            className="btn-focus flex items-center gap-2 rounded-full bg-[#111813] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-transform duration-300 hover:scale-[1.03] sm:text-base"
          >
            অর্ডার করুন
            <ShoppingCart size={18} strokeWidth={2} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
