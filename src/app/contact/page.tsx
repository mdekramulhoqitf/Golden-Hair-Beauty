import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import ContactForm from "@/components/contact-form";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import Reveal from "@/components/reveal";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Goldenhair team — we're here to help with orders, products and support.",
};

const details = [
  { icon: MapPin, title: "Visit Us", desc: "Dhaka, Bangladesh" },
  { icon: Phone, title: "Call Us", desc: "01787 478 146", href: "tel:+8801787478146" },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    desc: "01345 772 865",
    href: "https://wa.me/8801345772865",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="We're Here to Help"
        description="Questions about your order, our formulas, or your hair care routine? Reach out — we typically respond within 24 hours."
      />
      <section className="bg-warm-white py-20">
        <div className="container-premium grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.2fr]">
          <div className="flex flex-col gap-8">
            {details.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.08}>
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-500/10 text-gold-600">
                    <d.icon size={18} strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="font-serif text-lg text-ink">{d.title}</p>
                    {d.href ? (
                      <a
                        href={d.href}
                        target={d.href.startsWith("http") ? "_blank" : undefined}
                        rel={d.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="mt-1 block text-sm text-ink/55 transition-colors hover:text-gold-600"
                      >
                        {d.desc}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm text-ink/55">{d.desc}</p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
