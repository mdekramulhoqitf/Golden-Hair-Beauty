"use client";

import Image from "next/image";
import { Check, ShoppingCart } from "lucide-react";
import Reveal from "@/components/reveal";

const benefits = [
  "চুল পড়া বন্ধ করে চুলের গোড়া মজবুত করে।",
  "স্ক্যাল্পের খুশকি দূর করে ও চুলকানি কমায়।",
  "চুলের ড্যামেজ হওয়া প্রতিরোধ করে।",
  "স্ক্যাল্প পরিষ্কার করে নতুন চুল গজাতে সহায়তা করে।",
  "ফলিকলে পুষ্টি যোগায়, স্ক্যাল্পে রক্ত সঞ্চালন বৃদ্ধি করে।",
];

export default function LandingBenefits() {
  return (
    <section className="bg-[#0f3b38] py-16 sm:py-20">
      <div className="container-premium">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div>
              <h2 className="mb-6 w-full overflow-hidden whitespace-nowrap text-3xl font-bold text-white sm:text-4xl">
                Hair Booster-ব্যবহারের উপকারিতা:
              </h2>
              <ul className="flex flex-col gap-6">
                {benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f6a623] text-[#0f3b38]">
                      <Check size={18} strokeWidth={3} />
                    </span>
                    <span className="text-xl leading-relaxed text-white/85 sm:text-2xl">
                      {b}
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
            <div className="relative aspect-[1023/1537] w-full max-w-sm overflow-hidden rounded-2xl shadow-xl shadow-black/30 lg:ml-auto">
              <Image
                src="/images/lifestyle/hair-booster-lifestyle.png"
                alt="Goldenhair Hair Booster ব্যবহারের দৃশ্য"
                fill
                sizes="(max-width: 1024px) 90vw, 380px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
