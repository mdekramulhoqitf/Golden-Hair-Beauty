"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Reveal from "@/components/reveal";
import { fetchSiteMedia } from "@/data/site-media";
import { MEDIA_KEYS } from "@/data/media-keys";

const FALLBACK_IMAGE = MEDIA_KEYS.find((k) => k.key === "how_to_use_image")!.fallback;
const FALLBACK_HEADING = MEDIA_KEYS.find((k) => k.key === "how_to_use_heading")!.fallback;
const FALLBACK_LIST = JSON.parse(MEDIA_KEYS.find((k) => k.key === "how_to_use_list")!.fallback) as string[];

export default function LandingHowToUse() {
  const [image, setImage] = useState(FALLBACK_IMAGE);
  const [heading, setHeading] = useState(FALLBACK_HEADING);
  const [stepLines, setStepLines] = useState<string[]>(FALLBACK_LIST);

  useEffect(() => {
    fetchSiteMedia().then((media) => {
      setImage(media.how_to_use_image);
      setHeading(media.how_to_use_heading);
      try {
        setStepLines(JSON.parse(media.how_to_use_list));
      } catch {
        // keep fallback list
      }
    });
  }, []);

  return (
    <section className="bg-[#fbf3e2] py-12 sm:py-16">
      <div className="container-premium">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 md:flex-row md:items-end md:gap-6">
          <Reveal delay={0.1} className="shrink-0">
            <div className="relative">
              <div className="absolute inset-0 -z-10 scale-90 rounded-full bg-gradient-to-b from-gold-200/50 to-transparent blur-3xl" />
              <div className="relative h-[360px] w-[166px] sm:h-[440px] sm:w-[203px] md:h-[640px] md:w-[294px]">
                <Image
                  src={image}
                  alt="Goldenhair Hair Booster"
                  fill
                  sizes="(max-width: 768px) 203px, 294px"
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="w-full md:mb-[38px]">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">{heading}</h2>
            <div className="mt-4 whitespace-pre-wrap rounded-2xl border-2 border-dashed border-gold-400 bg-white p-5 text-lg leading-relaxed text-ink/80 sm:p-7 sm:text-xl md:p-9 md:text-3xl">
              {stepLines.join("\n")}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
