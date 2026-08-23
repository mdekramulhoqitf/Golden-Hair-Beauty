"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/reveal";

const SLIDESHOW_IMAGES = [
  { src: "/images/item/hair_boster/hair booster (1).png", width: 1023, height: 1537 },
  { src: "/images/item/hair_boster/hair booster (2).png", width: 1023, height: 1537 },
  { src: "/images/item/hair_boster/hair booster (3).png", width: 1023, height: 1537 },
  { src: "/images/item/hair_boster/hair booster (4).png", width: 1122, height: 1402 },
  { src: "/images/item/hair_boster/hair booster (5).png", width: 1023, height: 1537 },
];

const CLONE_COUNT = 2;
const LOOP_IMAGES = [
  ...SLIDESHOW_IMAGES.slice(-CLONE_COUNT),
  ...SLIDESHOW_IMAGES,
  ...SLIDESHOW_IMAGES.slice(0, CLONE_COUNT),
];
const START_STEP = CLONE_COUNT;
const RESET_STEP = CLONE_COUNT + SLIDESHOW_IMAGES.length - 1;

export default function LandingHero() {
  const [step, setStep] = useState(START_STEP);
  const instantRef = useRef(false);
  const instant = instantRef.current;

  useEffect(() => {
    instantRef.current = false;
  }, [step]);

  useEffect(() => {
    if (step === RESET_STEP) {
      const t = setTimeout(() => {
        instantRef.current = true;
        setStep(step - SLIDESHOW_IMAGES.length);
      }, 1450);
      return () => clearTimeout(t);
    }
  }, [step]);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-[#fbf3e2] px-4 pb-10 pt-28 sm:pt-32">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 text-center">
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
            className="w-full overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            }}
          >
            <motion.div
              animate={{ x: `-${step * (100 / LOOP_IMAGES.length)}%` }}
              transition={instant ? { duration: 0 } : { duration: 1.4, ease: "linear" }}
              className="flex"
              style={{ width: `${(LOOP_IMAGES.length / 3) * 100}%` }}
            >
              {LOOP_IMAGES.map((image, i) => (
                <div
                  key={i}
                  className="px-1.5"
                  style={{ width: `${100 / LOOP_IMAGES.length}%` }}
                >
                  <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl">
                    <Image
                      src={image.src}
                      alt="Goldenhair সালফেট ফ্রি শ্যাম্পু, হেয়ার বুস্টার ও গ্রোথ সিরাম"
                      fill
                      priority={i === START_STEP}
                      sizes="(max-width: 640px) 33vw, 200px"
                      className="rounded-2xl object-cover"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
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
