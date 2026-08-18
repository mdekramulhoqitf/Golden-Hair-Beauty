"use client";

import Image from "next/image";
import Reveal from "@/components/reveal";

const steps = [
  "চুল ভালোভাবে কুসুম গরম পানি দিয়ে ভিজিয়ে নিন।",
  "পরিমাণমতো শ্যাম্পু নিয়ে আলতোভাবে মাথার তালুতে ম্যাসাজ করুন।",
  "পুরো চুলে ফেনা ছড়িয়ে ১–২ মিনিট রেখে দিন।",
  "ভালোভাবে ধুয়ে ফেলুন। সেরা ফলাফলের জন্য এরপর Growth Serum ব্যবহার করুন।",
];

export default function LandingHowToUse() {
  return (
    <section className="bg-[#fbf3e2] py-16 sm:py-20">
      <div className="container-premium">
        <Reveal className="mb-12 text-center">
          <h2 className="font-serif text-2xl text-ink sm:text-3xl">ব্যবহারবিধি</h2>
        </Reveal>

        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 sm:flex-row sm:items-center sm:gap-10">
          <Reveal delay={0.1} className="shrink-0">
            <div className="relative h-64 w-40 sm:h-72 sm:w-44">
              <Image
                src="/images/hero-products/shampoo-cutout.png"
                alt="Goldenhair Sulfate Free Shampoo"
                fill
                sizes="176px"
                className="object-contain drop-shadow-xl"
              />
            </div>
          </Reveal>

          <Reveal delay={0.2} className="w-full">
            <div className="rounded-3xl bg-white p-7 shadow-lg shadow-black/5 sm:p-9">
              <ol className="flex flex-col gap-4">
                {steps.map((s, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0f3b38] text-xs font-semibold text-white">
                      {i + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-ink/80 sm:text-base">
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
