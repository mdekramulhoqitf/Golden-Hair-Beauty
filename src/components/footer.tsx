"use client";

import Link from "next/link";
import { useState } from "react";
import { Globe, Instagram, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import Logo from "@/components/logo";
import { useToast } from "@/context/toast-context";

const contactInfo = [
  { icon: Phone, label: "01787 478 146", href: "tel:+8801787478146" },
  { icon: MessageCircle, label: "01345 772 865", href: "https://wa.me/8801345772865" },
  { icon: MapPin, label: "Dhaka, Bangladesh", href: undefined },
  { icon: Globe, label: "goldenhairbeauty.com", href: "https://goldenhairbeauty.com" },
];

const shopLinks = [
  { href: "/shop", label: "All Products" },
  { href: "/product/sulfate-free-shampoo", label: "Sulfate Free Shampoo" },
  { href: "/product/hair-booster-hair-fall-solution", label: "Hair Booster" },
  { href: "/product/growth-serum-scalp-nutrition", label: "Growth Serum" },
];

const careLinks = [
  { href: "/contact", label: "Contact Us" },
  { href: "/shipping-returns", label: "Shipping & Returns" },
  { href: "/faq", label: "FAQ" },
  { href: "/track-order", label: "Track Order" },
];

const aboutLinks = [
  { href: "/about", label: "Our Story" },
  { href: "/hair-care", label: "Hair Care Guide" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const { push } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    push("Welcome to Goldenhair — check your inbox.", "cart");
    setEmail("");
  };

  return (
    <footer className="relative overflow-hidden bg-plum-gradient text-cream">
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="container-premium relative py-20">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr]">
          <div>
            <Logo />
            <p className="mt-5 text-xs font-medium uppercase tracking-widest2 text-gold-400/90">
              Hair &amp; Beauty Care
            </p>
            <p className="mt-3 max-w-xs font-serif text-lg italic leading-snug text-cream/85">
              হারিয়ে যাওয়া আত্মবিশ্বাস ফিরে আসুক — Goldenhair-এর সাথে। ✨
            </p>

            <ul className="mt-6 flex flex-col gap-2.5">
              {contactInfo.map((c) => (
                <li key={c.label}>
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-2.5 text-sm text-cream/65 transition-colors hover:text-cream"
                    >
                      <c.icon size={14} className="shrink-0 text-gold-400" strokeWidth={1.5} />
                      {c.label}
                    </a>
                  ) : (
                    <span className="flex items-center gap-2.5 text-sm text-cream/65">
                      <c.icon size={14} className="shrink-0 text-gold-400" strokeWidth={1.5} />
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="btn-focus flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-colors duration-300 hover:border-gold-400 hover:text-gold-400"
              >
                <Instagram size={15} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <div>
            <p className="eyebrow mb-5 text-gold-400/90">Shop</p>
            <ul className="flex flex-col gap-3">
              {shopLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="gold-underline text-sm text-cream/65 transition-colors hover:text-cream"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5 text-gold-400/90">Customer Care</p>
            <ul className="flex flex-col gap-3">
              {careLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="gold-underline text-sm text-cream/65 transition-colors hover:text-cream"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5 text-gold-400/90">About</p>
            <ul className="flex flex-col gap-3">
              {aboutLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="gold-underline text-sm text-cream/65 transition-colors hover:text-cream"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5 text-gold-400/90">Stay in Touch</p>
            <p className="mb-4 text-sm leading-relaxed text-cream/60">
              Subscribe for early access to new formulas and exclusive offers.
            </p>
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="btn-focus w-full rounded-full border border-cream/20 bg-transparent px-4 py-3 text-sm text-cream placeholder:text-cream/35 focus:border-gold-400"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="btn-focus flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-gradient text-ink transition-transform duration-300 hover:scale-105"
              >
                <Send size={16} strokeWidth={2} />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-6 border-t border-cream/10 pt-8 sm:flex-row sm:justify-between">
          <p className="text-xs text-cream/40">
            &copy; {new Date().getFullYear()} Goldenhair Luxury Hair &amp; Beauty. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-cream/40">
            <span className="rounded border border-cream/15 px-2 py-1">bKash</span>
            <span className="rounded border border-cream/15 px-2 py-1">Nagad</span>
            <span className="rounded border border-cream/15 px-2 py-1">COD</span>
            <span className="rounded border border-cream/15 px-2 py-1">Visa</span>
            <span className="rounded border border-cream/15 px-2 py-1">Mastercard</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
