"use client";

import Image from "next/image";
import Reveal from "@/components/reveal";

export default function LandingBanner() {
  return (
    <section className="bg-[#fbf3e2] pb-16 sm:pb-20">
      <div className="container-premium">
        <Reveal>
          <div className="relative mx-auto aspect-[1717/916] w-full max-w-4xl overflow-hidden rounded-3xl shadow-xl shadow-black/10">
            <Image
              src="/images/lifestyle/banner.png"
              alt="Goldenhair সম্পূর্ণ হেয়ার কেয়ার কালেকশন"
              fill
              sizes="(max-width: 1024px) 90vw, 896px"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
