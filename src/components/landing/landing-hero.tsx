"use client";

import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import Reveal from "@/components/reveal";
import Logo from "@/components/logo";
import YoutubeEmbed from "@/components/youtube-embed";
import { fetchSiteMedia } from "@/data/site-media";
import { MEDIA_KEYS } from "@/data/media-keys";

const FALLBACKS = Object.fromEntries(MEDIA_KEYS.map((k) => [k.key, k.fallback]));

export default function LandingHero() {
  const [media, setMedia] = useState(FALLBACKS);

  useEffect(() => {
    fetchSiteMedia().then(setMedia);
  }, []);

  return (
    <section className="relative bg-[#fbf3e2] px-4 pb-10 pt-20 sm:pt-16">
      <div className="absolute left-12 top-16 z-10 sm:left-14">
        <Logo />
      </div>

      <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 text-center">
        <Reveal className="w-full">
          <div className="mx-auto w-full max-w-3xl overflow-x-auto rounded-2xl bg-[#0f3b38] px-5 py-4 shadow-lg shadow-black/10">
            <h1 className="whitespace-nowrap text-[13px] font-bold leading-snug text-white sm:text-2xl">
              {media.hero_headline}
            </h1>
          </div>
        </Reveal>

        {media.hero_video_id && (
          <Reveal delay={0.1} className="w-full max-w-3xl">
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <YoutubeEmbed videoIdOrUrl={media.hero_video_id} className="shadow-xl shadow-black/20" />
            </motion.div>
          </Reveal>
        )}

        <Reveal delay={0.18}>
          <p className="w-full overflow-x-auto text-lg leading-relaxed text-[#1c1c1c]/80 sm:text-2xl">
            <span className="block whitespace-nowrap">{media.hero_description_line1}</span>
            {media.hero_description_line2}
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <a
            href="#order"
            className="btn-focus flex items-center gap-2 rounded-full bg-[#111813] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-transform duration-300 hover:scale-[1.03] sm:text-base"
          >
            অর্ডার করুন
            <ShoppingCart size={18} strokeWidth={2} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
