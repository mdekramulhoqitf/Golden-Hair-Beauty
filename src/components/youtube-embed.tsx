"use client";

import { useState } from "react";
import { Play } from "lucide-react";

function extractYoutubeId(input: string): string {
  const match = input.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/
  );
  if (match) return match[1];
  return /^[a-zA-Z0-9_-]{11}$/.test(input.trim()) ? input.trim() : "";
}

export default function YoutubeEmbed({
  videoIdOrUrl,
  className = "",
}: {
  videoIdOrUrl: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const id = extractYoutubeId(videoIdOrUrl);

  if (!id) return null;

  return (
    <div className={`relative aspect-video w-full overflow-hidden rounded-2xl bg-black ${className}`}>
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          title="Goldenhair ভিডিও"
          className="h-full w-full"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label="ভিডিও চালু করুন"
          className="group relative h-full w-full"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
            alt="ভিডিও থাম্বনেইল"
            className="h-full w-full object-cover"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/40">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-[#0f3b38] shadow-lg transition-transform group-hover:scale-105">
              <Play size={26} fill="currentColor" className="ml-1" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
