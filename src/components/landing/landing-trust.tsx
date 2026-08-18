"use client";

import { Award, BadgeCheck, Leaf, ShieldCheck } from "lucide-react";
import Reveal from "@/components/reveal";

const badges = [
  { icon: Leaf, label: "প্রিমিয়াম উপাদানে তৈরি" },
  { icon: ShieldCheck, label: "নিরাপদ ফর্মুলেশন" },
  { icon: BadgeCheck, label: "যাচাইকৃত কাস্টমার রিভিউ" },
  { icon: Award, label: "ক্যাশ অন ডেলিভারি সুবিধা" },
];

export default function LandingTrust() {
  return (
    <section className="bg-[#fbf3e2] py-16 sm:py-20">
      <div className="container-premium grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <Reveal>
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {badges.map((b) => (
              <div
                key={b.label}
                className="flex flex-col items-center gap-3 rounded-2xl border border-ink/10 bg-white p-5 text-center shadow-sm"
              >
                <b.icon size={26} className="text-[#0f3b38]" strokeWidth={1.5} />
                <span className="text-xs font-medium leading-snug text-ink/70 sm:text-sm">
                  {b.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <h2 className="text-balance font-serif text-2xl leading-tight text-ink sm:text-3xl">
            আস্থা ও বিশ্বাসে
            <br />
            Goldenhair-এর অর্জনসমূহ
          </h2>
          <p className="mt-4 max-w-md text-balance leading-relaxed text-ink/60">
            সারা বাংলাদেশে হাজারো গ্রাহকের আস্থায় গড়ে ওঠা Goldenhair — প্রতিটি পণ্য
            যত্নসহকারে তৈরি এবং যাচাইকৃত গ্রাহক রিভিউয়ে সমর্থিত। নিরাপদ পেমেন্ট ও
            ক্যাশ অন ডেলিভারি সুবিধায় নিশ্চিন্তে অর্ডার করুন।
          </p>
        </Reveal>
      </div>
    </section>
  );
}
