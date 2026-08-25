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
const FALLBACK_CERTIFIED = Object.fromEntries(
  MEDIA_KEYS.filter((k) => CERTIFIED_KEYS.includes(k.key)).map((k) => [k.key, k.fallback])
);

export default function LandingTrust() {
  const [certified, setCertified] = useState(FALLBACK_CERTIFIED);

  useEffect(() => {
    fetchSiteMedia().then((media) =>
      setCertified(Object.fromEntries(CERTIFIED_KEYS.map((k) => [k, media[k]])))
    );
  }, []);

  return (
    <section className="bg-[#fbf3e2] py-16 sm:py-20">
      <div className="container-premium grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <Reveal>
          <div className="grid grid-cols-2 gap-5 sm:gap-7">
            {badges.map((b) => (
              <div
                key={b.label}
                className="flex flex-col items-center gap-4 rounded-2xl border border-ink/10 bg-white p-7 text-center shadow-sm sm:p-8"
              >
                <b.icon size={40} className="text-green-600" strokeWidth={1.5} />
                <span className="text-sm font-medium leading-snug text-ink/70 sm:text-base">
                  {b.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-4 gap-3 sm:gap-5">
            {CERTIFIED_KEYS.map((key) => (
              <div
                key={key}
                className="flex aspect-square items-center justify-center rounded-full border border-ink/10 bg-white p-3 shadow-sm"
              >
                <div className="relative h-full w-full">
                  <Image src={certified[key]} alt="সার্টিফিকেশন" fill sizes="80px" className="object-contain" />
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15} className="overflow-x-auto">
          <h2 className="whitespace-nowrap font-serif text-xl leading-tight text-ink sm:text-4xl">
            আস্থা ও বিশ্বাসে Golden Hair-এর অর্জনসমূহ
          </h2>
          <p className="mt-5 max-w-[36rem] text-xl leading-relaxed text-ink/60 sm:text-2xl">
            সারা বাংলাদেশে হাজারো গ্রাহকের আস্থায় গড়ে ওঠা Golden Hair — প্রতিটি পণ্য
            যত্নসহকারে তৈরি এবং যাচাইকৃত গ্রাহক রিভিউয়ে সমর্থিত। নিরাপদ পেমেন্ট ও
            ক্যাশ অন ডেলিভারি সুবিধায় নিশ্চিন্তে অর্ডার করুন।
          </p>
        </Reveal>
      </div>
    </section>
  );
}
