"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Award, BadgeCheck, Leaf, ShieldCheck } from "lucide-react";
import Reveal from "@/components/reveal";
import { fetchSiteMedia } from "@/data/site-media";
import { MEDIA_KEYS } from "@/data/media-keys";

const badges = [
  { icon: Leaf, label: "প্রিমিয়াম উপাদানে তৈরি" },
  { icon: ShieldCheck, label: "নিরাপদ ফর্মুলেশন" },
  { icon: BadgeCheck, label: "যাচাইকৃত কাস্টমার রিভিউ" },
  { icon: Award, label: "ক্যাশ অন ডেলিভারি সুবিধা" },
];

const CERTIFIED_KEYS = ["certified_1", "certified_2", "certified_3", "certified_4"];
const FALLBACKS = Object.fromEntries(MEDIA_KEYS.map((k) => [k.key, k.fallback]));

export default function LandingTrust() {
  const [media, setMedia] = useState(FALLBACKS);

  useEffect(() => {
    fetchSiteMedia().then(setMedia);
  }, []);

  return (
    <section className="bg-[#fbf3e2] py-16 sm:py-20">
      <div className="container-premium grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <Reveal>
          <div className="grid grid-cols-2 gap-5 sm:gap-7">
            {badges.map((b) => (
              <div
                key={b.label}
                className="flex flex-col items-center gap-3 rounded-2xl border border-ink/10 bg-white p-4 text-center shadow-sm sm:gap-4 sm:p-7 lg:p-8"
              >
                <b.icon size={32} className="shrink-0 text-green-600 sm:h-10 sm:w-10" strokeWidth={1.5} />
                <span className="text-sm font-medium leading-snug text-ink/70 sm:text-base">
                  {b.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15} className="self-start lg:mt-8">
          <h2 className="text-balance font-serif text-xl leading-tight text-ink sm:text-4xl">
            {media.trust_heading}
          </h2>
          <p className="mt-5 max-w-[36rem] text-xl leading-relaxed text-ink/60 sm:text-2xl">
            {media.trust_paragraph}
          </p>

          <div className="mt-6 grid max-w-[36rem] grid-cols-4 gap-3 sm:gap-5">
            {CERTIFIED_KEYS.map((key) => (
              <div key={key} className="relative aspect-square w-full">
                <Image
                  src={media[key]}
                  alt="সার্টিফিকেশন"
                  fill
                  sizes="80px"
                  className={`object-contain ${key === "certified_2" ? "scale-125" : ""}`}
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
