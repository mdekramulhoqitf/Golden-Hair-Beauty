"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import Reveal from "@/components/reveal";

const benefits = [
  "সালফেট ফ্রি ফর্মুলা চুলের গোড়া নরম না করে আলতোভাবে পরিষ্কার করে",
  "Minoxidil 5 সমৃদ্ধ হেয়ার বুস্টার চুল পড়ার প্রবণতা কমাতে সাহায্য করে",
  "গ্রোথ সিরাম স্ক্যাল্পে পুষ্টি জুগিয়ে চুলের বৃদ্ধিতে সহায়তা করে",
  "নিয়মিত ব্যবহারে চুলের গোড়া মজবুত ও স্বাস্থ্যোজ্জ্বল হয়ে ওঠে",
  "হালকা, নন-গ্রিজি ফর্মুলা — পুরুষ ও নারী উভয়ের জন্য উপযোগী",
  "প্রতিদিনের ব্যবহারের জন্য নিরাপদভাবে তৈরি সম্পূর্ণ হেয়ার কেয়ার রুটিন",
];

export default function LandingBenefits() {
  return (
    <section className="bg-[#0f3b38] py-16 sm:py-20">
      <div className="container-premium grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="lg:pl-8">
            <h2 className="text-balance text-2xl font-bold leading-snug text-white sm:text-3xl">
              Goldenhair ব্যবহারের উপকারিতা:
            </h2>
            <ul className="mt-7 flex flex-col gap-4">
              {benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f6a623] text-[#0f3b38]">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  <span className="text-sm leading-relaxed text-white/85 sm:text-base">
                    {b}
                  </span>
                </li>
              ))}
            </ul>
            <a
              href="#order"
              className="btn-focus mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#0f3b38] shadow-lg transition-transform duration-300 hover:scale-[1.03]"
            >
              অর্ডার করুন
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
    </section>
  );
}
