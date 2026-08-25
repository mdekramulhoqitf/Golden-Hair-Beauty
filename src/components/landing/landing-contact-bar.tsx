"use client";

import { useEffect, useState } from "react";
import { fetchSiteMedia } from "@/data/site-media";
import { MEDIA_KEYS } from "@/data/media-keys";

const FALLBACK_LABEL = MEDIA_KEYS.find((k) => k.key === "contact_bar_label")!.fallback;
const FALLBACK_PHONE = MEDIA_KEYS.find((k) => k.key === "contact_bar_phone")!.fallback;

function toTelHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.startsWith("0") ? `tel:+880${digits.slice(1)}` : `tel:+${digits}`;
}

export default function LandingContactBar() {
  const [label, setLabel] = useState(FALLBACK_LABEL);
  const [phone, setPhone] = useState(FALLBACK_PHONE);

  useEffect(() => {
    fetchSiteMedia().then((media) => {
      setLabel(media.contact_bar_label);
      setPhone(media.contact_bar_phone);
    });
  }, []);

  return (
    <div className="relative overflow-hidden bg-plum-gradient text-cream">
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="container-premium relative flex items-center justify-center py-7 text-center">
        <a href={toTelHref(phone)} className="btn-focus text-2xl font-extrabold tracking-wide sm:text-3xl">
          <span className="text-cream">{label}</span>
          <span className="text-[#f6a623]">{phone}</span>
        </a>
      </div>
    </div>
  );
}
