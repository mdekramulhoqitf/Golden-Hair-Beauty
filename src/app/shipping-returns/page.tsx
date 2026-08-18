import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import { Package, RotateCcw, Truck } from "lucide-react";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: "Goldenhair shipping timelines, delivery coverage and return policy across Bangladesh.",
};

const sections = [
  {
    icon: Truck,
    title: "Delivery Timelines",
    body: "Orders within Dhaka typically arrive within 24–48 hours. District-based deliveries across Bangladesh take 2–5 business days depending on location. A tracking confirmation is sent once your order is dispatched.",
  },
  {
    icon: Package,
    title: "Order Packaging",
    body: "Every order is carefully packed in protective, tamper-evident packaging to ensure your products arrive in pristine condition.",
  },
  {
    icon: RotateCcw,
    title: "Returns & Exchanges",
    body: "Unopened products may be returned within 7 days of delivery for a full refund. If you receive a damaged, defective or incorrect item, contact our support team within 48 hours for a free replacement.",
  },
];

export default function ShippingReturnsPage() {
  return (
    <>
      <PageHero
        eyebrow="Customer Care"
        title="Shipping & Returns"
        description="Nationwide delivery across Bangladesh, with a straightforward return policy you can rely on."
      />
      <section className="bg-warm-white py-20">
        <div className="container-premium mx-auto max-w-3xl flex flex-col gap-10">
          {sections.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="flex gap-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-500/10 text-gold-600">
                  <s.icon size={18} strokeWidth={1.5} />
                </span>
                <div>
                  <h2 className="font-serif text-xl text-ink">{s.title}</h2>
                  <p className="mt-2 leading-relaxed text-ink/60">{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
