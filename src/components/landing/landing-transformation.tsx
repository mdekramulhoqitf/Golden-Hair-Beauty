"use client";

import Image from "next/image";
import { Check, ShoppingCart } from "lucide-react";
import Reveal from "@/components/reveal";

const changes = [
  "চুল পড়া বন্ধ হবে শতভাগ ইনশাআল্লাহ।",
  "স্ক্যাল্প ও চুলের যাবতীয় সমস্যা দূর হবে।",
  "ফিরে পাবেন হারানো চুলের রাজকীয় সৌন্দর্য।",
  "ফিরে পাবেন আপনার হারিয়ে যাওয়া আত্মবিশ্বাস।",
  "হতাশা, দুশ্চিন্তা থেকে মুক্ত হয়ে ফিরে পাবেন মানসিক প্রশান্তি।",
  "আপনার ভেতর ফুটে উঠবে তারুণ্য ও কৈশোরের এক প্রতিচ্ছবি।",
  "সবার সামনে নিজেকে উপস্থাপন করবে আরো বেশি আত্মবিশ্বাসী।",
];

export default function LandingTransformation() {
  return (
    <section className="bg-[#0f3b38] py-16 sm:py-20">
      <div className="container-premium grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="lg:pl-8">
            <h2 className="text-balance text-4xl font-bold leading-[1.5] text-white sm:text-5xl">
              <span className="text-gold-300">Golden Hair- Hair Booster</span> ব্যবহারের পর
              আপনার পরিবর্তন সমূহ:
            </h2>
            <ul className="mt-8 flex flex-col gap-6">
              {changes.map((c, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f6a623] text-[#0f3b38]">
                    <Check size={18} strokeWidth={3} />
                  </span>
                  <span className="text-lg leading-relaxed text-white/85 sm:text-xl">
                    {c}
                  </span>
                </li>
              ))}
            </ul>
            <a
              href="#order"
              className="btn-focus mt-8 inline-flex items-center gap-2 rounded-full bg-gold-gradient px-8 py-4 text-sm font-semibold text-[#0f3b38] shadow-gold-glow transition-transform duration-300 hover:scale-[1.03] sm:text-base"
            >
              অর্ডার করুন
              <ShoppingCart size={18} strokeWidth={2} />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative aspect-[1122/1402] w-full max-w-sm overflow-hidden rounded-2xl shadow-xl shadow-black/30 lg:ml-auto">
            <Image
              src="/images/item/hair_boster/hair booster (4).png"
              alt="Golden Hair Booster ব্যবহারের পর পরিবর্তন"
              fill
              sizes="(max-width: 1024px) 90vw, 380px"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
