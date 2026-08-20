"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { cn } from "@/lib/format";

// Facebook Page: https://www.facebook.com/goldenhairbd
const MESSENGER_LINK = "https://m.me/goldenhairbd";
const WHATSAPP_LINK = "https://wa.me/8801345772865";
const PHONE_LINK = "tel:+8801787478146";

export default function FloatingContact() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const siteFooter = document.querySelector("body > footer");
    if (!siteFooter) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { rootMargin: "0px" }
    );
    observer.observe(siteFooter);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Desktop: vertical stack, bottom-left, clear of the container gutter */}
      <div
        className={cn(
          "fixed bottom-6 left-3 z-40 hidden flex-col gap-4 transition-opacity duration-300 lg:flex",
          hidden && "pointer-events-none opacity-0"
        )}
      >
        <a
          href={PHONE_LINK}
          aria-label="Call Goldenhair"
          className="btn-focus flex h-14 w-14 items-center justify-center rounded-full bg-[#e5493f] text-white shadow-lg shadow-black/20 transition-transform duration-300 hover:scale-110"
        >
          <Phone size={22} strokeWidth={2} fill="currentColor" />
        </a>
        <a
          href={MESSENGER_LINK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message on Messenger"
          className="btn-focus flex h-14 w-14 items-center justify-center rounded-full bg-[#0084ff] text-white shadow-lg shadow-black/20 transition-transform duration-300 hover:scale-110"
        >
          <MessengerIcon size={26} />
        </a>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message on WhatsApp"
          className="btn-focus flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg shadow-black/20 transition-transform duration-300 hover:scale-110"
        >
          <WhatsAppIcon size={26} />
        </a>
      </div>

      {/* Mobile & tablet: bottom-right cluster, out of the way of flush-left content */}
      <div
        className={cn(
          "fixed bottom-4 right-4 z-40 flex flex-col gap-3 transition-opacity duration-300 lg:hidden",
          hidden && "pointer-events-none opacity-0"
        )}
      >
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message on WhatsApp"
          className="btn-focus flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg shadow-black/25 transition-transform duration-300 hover:scale-110"
        >
          <WhatsAppIcon size={26} />
        </a>
        <a
          href={MESSENGER_LINK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message on Messenger"
          className="btn-focus flex h-14 w-14 items-center justify-center rounded-full bg-[#0084ff] text-white shadow-lg shadow-black/25 transition-transform duration-300 hover:scale-110"
        >
          <MessengerIcon size={26} />
        </a>
        <a
          href={PHONE_LINK}
          aria-label="Call Goldenhair"
          className="btn-focus flex h-14 w-14 items-center justify-center rounded-full bg-[#e5493f] text-white shadow-lg shadow-black/25 transition-transform duration-300 hover:scale-110"
        >
          <Phone size={22} strokeWidth={2} fill="currentColor" />
        </a>
      </div>
    </>
  );
}

function MessengerIcon({ size = 19 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.14 2 11.25c0 2.9 1.44 5.49 3.69 7.19V22l3.37-1.85c.9.25 1.86.38 2.94.38 5.52 0 10-4.14 10-9.28C22 6.14 17.52 2 12 2Zm1.01 12.5-2.55-2.72-4.98 2.72 5.48-5.82 2.61 2.72 4.92-2.72-5.48 5.82Z" />
    </svg>
  );
}

function WhatsAppIcon({ size = 19 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.29-.15-1.72-.85-1.99-.95-.27-.1-.46-.15-.66.15-.2.29-.76.94-.93 1.14-.17.2-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.43-.86-.76-1.44-1.7-1.61-1.99-.17-.29-.02-.44.13-.59.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.59-.9-2.18-.24-.57-.48-.5-.66-.5-.17 0-.37-.02-.56-.02s-.51.07-.78.37c-.27.29-1.02 1-1.02 2.43 0 1.43 1.04 2.82 1.19 3.01.15.2 2.05 3.13 4.96 4.39.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.11.55-.08 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.27-.2-.56-.35Z" />
      <path d="M12.02 2C6.5 2 2.03 6.42 2.03 11.87c0 1.83.5 3.55 1.36 5.03L2 22l5.28-1.37a10.1 10.1 0 0 0 4.74 1.2h.01c5.52 0 10-4.42 10-9.87S17.54 2 12.02 2Zm0 18.05h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.13.81.84-3.02-.2-.31a8.03 8.03 0 0 1-1.27-4.34c0-4.44 3.65-8.06 8.15-8.06 2.18 0 4.22.85 5.76 2.38a8 8 0 0 1 2.39 5.68c0 4.44-3.65 8.18-8.05 8.18Z" />
    </svg>
  );
}
