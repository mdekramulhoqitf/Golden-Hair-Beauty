"use client";

import Image from "next/image";
import { Hind_Siliguri } from "next/font/google";
import Reveal from "@/components/reveal";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["600"],
  display: "swap",
});

const steps = [
  "রাতে ঘুমানোর পূর্বে মাথার ত্বকে ৭-৮ বার স্প্রে করতে হবে।",
  "আঙ্গুলের মাথার নরম পেড অথবা মোটা দাঁতের চিরুনির সাহায্যে আলতোভাবে ৩-৪ মিনিট ম্যাসাজ করতে হবে।",
  "সকালে গোসলের সময় সালফেটফ্রী শ্যাম্পু দিয়ে চুল ধুয়ে নিতে হবে।",
  "ভালো ফলাফলের জন্য সপ্তাহে ৪-৫বার ব্যবহার করুন।",
];

export default function LandingHowToUse() {
  return (
    <section className="bg-[#fbf3e2] py-12 sm:py-16">
      <div className="container-premium">
        <Reveal className="mb-8 text-center">
          <span className={`${hindSiliguri.className} text-base tracking-wide text-gold-500 sm:text-lg`}>
            যেভাবে ব্যবহার করবেন
          </span>
          <h2 className="mt-2 font-serif text-4xl text-ink sm:text-5xl">ব্যবহারবিধি</h2>
        </Reveal>

        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 sm:flex-row sm:items-center sm:gap-10">
          <Reveal delay={0.1} className="shrink-0">
            <div className="relative">
              <div className="absolute inset-0 -z-10 scale-90 rounded-full bg-gradient-to-b from-gold-200/50 to-transparent blur-3xl" />
              <div className="relative h-[380px] w-[175px] sm:h-[560px] sm:w-[257px]">
                <Image
                  src="/images/hero-products/Booster.png"
                  alt="Goldenhair Hair Booster"
                  fill
                  sizes="(max-width: 640px) 175px, 257px"
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="w-full">
            <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-black/5 sm:p-8">
              <ol className="flex flex-col gap-5">
                {steps.map((s, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0f3b38] text-base font-semibold text-white sm:h-11 sm:w-11 sm:text-lg">
                      {i + 1}
                    </span>
                    <span className="pt-1 text-lg leading-relaxed text-ink/80 sm:text-xl">
                      {s}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
