"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import Reveal from "@/components/reveal";

export default function LandingHero() {
  return (
    <section className="bg-[#fbf3e2] px-4 pb-10 pt-28 sm:pt-32">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-5 text-center">
        <Reveal>
          <div className="w-full rounded-2xl bg-[#0f3b38] px-5 py-4 shadow-lg shadow-black/10">
            <h1 className="text-balance text-lg font-bold leading-snug text-white sm:text-2xl">
              চুল পড়া ও খুশকি রোধের সায়েন্টিফিক সমাধান
            </h1>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="w-full">
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[1717/916] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-[#eef6d8] to-[#c7e08f] shadow-xl shadow-black/10"
          >
            <Image
              src="/images/lifestyle/banner.png"
              alt="Goldenhair সালফেট ফ্রি শ্যাম্পু, হেয়ার বুস্টার ও গ্রোথ সিরাম"
              fill
              priority
              sizes="(max-width: 640px) 100vw, 576px"
              className="object-contain p-3"
            />
          </motion.div>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="text-balance text-sm leading-relaxed text-[#1c1c1c]/80 sm:text-base">
            বাজারের সাধারণ শ্যাম্পু ব্যবহারে চুলের গোড়া দুর্বল হয়ে পড়ে, ফলে বাড়ে চুল পড়া ও
            খুশকির সমস্যা। Goldenhair-এর সালফেট ফ্রি শ্যাম্পু, হেয়ার বুস্টার ও গ্রোথ সিরাম
            একসাথে ব্যবহার করে ফিরে পান স্বাস্থ্যোজ্জ্বল, মজবুত চুল।
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <p className="text-sm font-semibold text-red-600 sm:text-base">
            স্টক সীমিত! আজই অর্ডার করে পান বিশেষ ছাড়।
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
