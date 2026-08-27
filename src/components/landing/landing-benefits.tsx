"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Check, ShoppingCart } from "lucide-react";
import Reveal from "@/components/reveal";
import FitOneLineText from "@/components/fit-one-line-text";
import { fetchSiteMedia } from "@/data/site-media";
import { MEDIA_KEYS } from "@/data/media-keys";
import { generateEventId, trackConversion } from "@/lib/meta-conversion";

const FALLBACK_IMAGE = MEDIA_KEYS.find((k) => k.key === "benefits_image")!.fallback;
const FALLBACK_HEADING = MEDIA_KEYS.find((k) => k.key === "benefits_heading")!.fallback;
const FALLBACK_LIST = JSON.parse(MEDIA_KEYS.find((k) => k.key === "benefits_list")!.fallback) as string[];

export default function LandingBenefits() {
  const [image, setImage] = useState(FALLBACK_IMAGE);
  const [heading, setHeading] = useState(FALLBACK_HEADING);
  const [benefits, setBenefits] = useState<string[]>(FALLBACK_LIST);
  const [iconSizes, setIconSizes] = useState<number[]>(FALLBACK_LIST.map(() => 32));

  useEffect(() => {
    fetchSiteMedia().then((media) => {
      setImage(media.benefits_image);
      setHeading(media.benefits_heading);
      try {
        setBenefits(JSON.parse(media.benefits_list));
      } catch {
        // keep fallback list
      }
    });
  }, []);

  return (
    <section className="bg-[#0f3b38] py-16 sm:py-20">
      <div className="container-premium">
        <Reveal>
          <h2 className="text-balance text-3xl font-bold leading-snug text-white sm:text-4xl lg:text-5xl">
            {heading}
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="flex h-full flex-col justify-between">
              <div>
                <ul className="flex flex-col gap-6">
                  {benefits.map((b, i) => {
                    const iconSize = iconSizes[i] ?? 32;
                    return (
                      <li key={i} className="flex min-w-0 items-center gap-3">
                        <span
                          className="flex shrink-0 items-center justify-center rounded-full bg-[#f6a623] text-[#0f3b38]"
                          style={{ height: iconSize, width: iconSize }}
                        >
                          <Check size={Math.round(iconSize * 0.55)} strokeWidth={3} />
                        </span>
                        <FitOneLineText
                          text={b}
                          className="leading-relaxed text-white/85"
                          maxFontPx={24}
                          minFontPx={12}
                          onFontSize={(size) =>
                            setIconSizes((prev) => {
                              const value = (size / 24) * 32;
                              if (prev[i] === value) return prev;
                              const next = [...prev];
                              next[i] = value;
                              return next;
                            })
                          }
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
              <a
                href="#order"
                onClick={() => trackConversion("InitiateCheckout", generateEventId())}
                className="btn-focus mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#99CA3B] px-8 py-4 text-sm font-semibold text-[#0f3b38] shadow-lg shadow-black/20 transition-transform duration-300 hover:scale-[1.03] sm:text-base"
              >
                অর্ডার করুন
                <ShoppingCart size={18} strokeWidth={2} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative aspect-[1023/1537] w-full max-w-sm overflow-hidden rounded-2xl shadow-xl shadow-black/30 lg:ml-auto">
              <Image
                src={image}
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
