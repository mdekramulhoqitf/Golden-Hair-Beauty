"use client";

import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import Reveal from "@/components/reveal";
import YoutubeEmbed from "@/components/youtube-embed";
import { fetchSiteMedia } from "@/data/site-media";

export default function LandingHero() {
  const [videoId, setVideoId] = useState("");

  useEffect(() => {
    fetchSiteMedia().then((media) => setVideoId(media.hero_video_id ?? ""));
  }, []);

  return (
    <section className="bg-[#fbf3e2] px-4 pb-10 pt-28 sm:pt-32">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 text-center">
        <Reveal>
          <div className="w-full overflow-x-auto rounded-2xl bg-[#0f3b38] px-5 py-4 shadow-lg shadow-black/10">
            <h1 className="whitespace-nowrap text-[13px] font-bold leading-snug text-white sm:text-2xl">
              Hair Booster এর ছোঁয়ায় চুলের হারানো সৌন্দর্য ফিরে পেয়েছে হাজারো মানুষ।
            </h1>
          </div>
        </Reveal>

        {videoId && (
          <Reveal delay={0.1} className="w-full max-w-xl">
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <YoutubeEmbed videoIdOrUrl={videoId} className="shadow-xl shadow-black/20" />
            </motion.div>
          </Reveal>
        )}

        <Reveal delay={0.18}>
          <p className="w-full overflow-x-auto text-lg leading-relaxed text-[#1c1c1c]/80 sm:text-2xl">
            <span className="block whitespace-nowrap">
              Hair Booster- ব্যাবহারে চুল পড়া বন্ধ করে,নতুন চুল গজাতে সাহায্য করে,চুল হবে লম্বা সিল্ক ও সাইনি।
            </span>
            ফিরে আসবে চুলের হারিয়ে যাওয়া সৌন্দর্যের আত্নবিশ্বাস।
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
