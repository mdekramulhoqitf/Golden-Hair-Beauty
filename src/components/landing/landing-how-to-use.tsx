"use client";

import Image from "next/image";
import Reveal from "@/components/reveal";

const stepLines = [
  "রাতে ঘুমানোর পূর্বে মাথার ত্বকে ৭-৮বার স্প্রে করতে হবে।",
  "আঙ্গুলের মাথার পেড অথবা মোটা দাঁতের চিরুনির সাহায্যে",
  "আলতোভাবে ৩-৪ মিনিট ম্যাসাজ করতে হবে। সকাল",
  "গোসলের সময় সালফেট ফ্রি শ্যাম্পু দিয়ে চুল নিতে হবে।",
  "ভালো ফলাফলের জন্য সপ্তাহে ৫-৬ দিন ব্যবহার উত্তম।",
];

export default function LandingHowToUse() {
  return (
    <section className="bg-[#fbf3e2] py-12 sm:py-16">
      <div className="container-premium">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 sm:flex-row sm:items-center sm:gap-12">
          <Reveal delay={0.1} className="shrink-0">
            <div className="relative">
              <div className="absolute inset-0 -z-10 scale-90 rounded-full bg-gradient-to-b from-gold-200/50 to-transparent blur-3xl" />
              <div className="relative h-[440px] w-[203px] sm:h-[640px] sm:w-[294px]">
                <Image
                  src="/images/hero-products/Booster.png"
                  alt="Goldenhair Hair Booster"
                  fill
                  sizes="(max-width: 640px) 203px, 294px"
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="w-full">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">ব্যবহারবিধি :</h2>
            <p className="mt-4 inline-block max-w-full overflow-x-auto space-y-4 rounded-2xl border-2 border-dashed border-gold-400 bg-white p-7 text-2xl leading-relaxed text-ink/80 sm:space-y-5 sm:p-9 sm:text-3xl">
              {stepLines.map((line, i) => (
                <span key={i} className="block whitespace-nowrap">
                  {line}
                </span>
              ))}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
