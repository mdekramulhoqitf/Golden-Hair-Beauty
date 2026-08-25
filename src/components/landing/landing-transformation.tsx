"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Check, ShoppingCart } from "lucide-react";
import Reveal from "@/components/reveal";
import { fetchSiteMedia } from "@/data/site-media";
import { MEDIA_KEYS } from "@/data/media-keys";

const FALLBACK_IMAGE = MEDIA_KEYS.find((k) => k.key === "transformation_image")!.fallback;
const FALLBACK_HEADING = MEDIA_KEYS.find((k) => k.key === "transformation_heading")!.fallback;
const FALLBACK_LIST = JSON.parse(
  MEDIA_KEYS.find((k) => k.key === "transformation_list")!.fallback
) as string[];

export default function LandingTransformation() {
  const [image, setImage] = useState(FALLBACK_IMAGE);
  const [heading, setHeading] = useState(FALLBACK_HEADING);
  const [changes, setChanges] = useState<string[]>(FALLBACK_LIST);

  useEffect(() => {
    fetchSiteMedia().then((media) => {
      setImage(media.transformation_image);
      setHeading(media.transformation_heading);
      try {
        setChanges(JSON.parse(media.transformation_list));
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

        <div className="mt-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div>
              <ul className="flex flex-col gap-6">
                {changes.map((c, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f6a623] text-[#0f3b38]">
                      <Check size={18} strokeWidth={3} />
                    </span>
                    <span className="text-lg leading-relaxed text-white/85 sm:text-xl">
                      {c}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="#order"
                className="btn-focus mt-8 inline-flex items-center gap-2 rounded-full bg-[#99CA3B] px-8 py-4 text-sm font-semibold text-[#0f3b38] shadow-lg shadow-black/20 transition-transform duration-300 hover:scale-[1.03] sm:text-base"
              >
                অর্ডার করুন
                <ShoppingCart size={18} strokeWidth={2} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:-mt-16">
            <div className="relative aspect-[2/3] w-full max-w-[360px] overflow-hidden rounded-2xl shadow-xl shadow-black/30 lg:ml-auto">
              <Image
                src={image}
                alt="Golden Hair Booster ব্যবহারের পর পরিবর্তন"
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
