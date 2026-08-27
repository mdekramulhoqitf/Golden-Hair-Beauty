"use client";

import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Reveal from "@/components/reveal";
import Logo from "@/components/logo";
import YoutubeEmbed from "@/components/youtube-embed";
import { fetchSiteMedia } from "@/data/site-media";
import { MEDIA_KEYS } from "@/data/media-keys";
import { generateEventId, trackConversion } from "@/lib/meta-conversion";

const FALLBACKS = Object.fromEntries(MEDIA_KEYS.map((k) => [k.key, k.fallback]));

const MAX_HEADLINE_FONT_PX = 24;
const MIN_HEADLINE_FONT_PX = 10;

function FitOneLineText({ text, className }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [fontSize, setFontSize] = useState(MAX_HEADLINE_FONT_PX);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const el = textRef.current;
    if (!container || !el) return;

    const fit = () => {
      let size = MAX_HEADLINE_FONT_PX;
      el.style.fontSize = `${size}px`;
      const containerWidth = container.clientWidth;
      while (el.scrollWidth > containerWidth && size > MIN_HEADLINE_FONT_PX) {
        size -= 0.5;
        el.style.fontSize = `${size}px`;
      }
      setFontSize(size);
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(container);
    return () => observer.disconnect();
  }, [text]);

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <h1
        ref={textRef}
        className={className}
        style={{ fontSize, whiteSpace: "nowrap" }}
      >
        {text}
      </h1>
    </div>
  );
}

export default function LandingHero() {
  const [media, setMedia] = useState(FALLBACKS);

  useEffect(() => {
    fetchSiteMedia().then(setMedia);
  }, []);

  return (
    <section className="relative bg-[#fbf3e2] px-4 pb-10 pt-6 sm:pt-16">
      <div className="relative z-10 mb-4 flex justify-start sm:absolute sm:left-14 sm:top-16 sm:mb-0">
        <Logo href="/landing-page" />
      </div>

      <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 text-center">
        <Reveal className="w-full">
          <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-2xl bg-[#0f3b38] px-5 py-4 shadow-lg shadow-black/10">
            <FitOneLineText
              text={media.hero_headline}
              className="font-bold leading-snug text-white"
            />
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
          <p className="w-full text-balance text-lg leading-relaxed text-[#1c1c1c]/80 sm:text-2xl">
            <span className="block">{media.hero_description_line1}</span>
            {media.hero_description_line2}
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <a
            href="#order"
            onClick={() => trackConversion("InitiateCheckout", generateEventId())}
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
