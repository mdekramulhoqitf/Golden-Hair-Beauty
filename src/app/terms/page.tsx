import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms and conditions governing your use of Goldenhair's website and services.",
};

const sections = [
  {
    title: "Use of Our Website",
    body: "By accessing this website, you agree to use it lawfully and refrain from any activity that could harm the site, its content or other users.",
  },
  {
    title: "Product Information",
    body: "We strive to ensure product descriptions and imagery are accurate. Minor variations in packaging or formulation may occur without notice.",
  },
  {
    title: "Orders & Payment",
    body: "All orders are subject to availability and confirmation. We accept Cash on Delivery, bKash, Nagad and major card payments. Prices are listed in BDT and inclusive of applicable taxes.",
  },
  {
    title: "Limitation of Liability",
    body: "Goldenhair products are cosmetic formulations intended to support the appearance of healthier-looking hair and are not a substitute for medical treatment.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Service" />
      <section className="bg-warm-white py-20">
        <div className="container-premium mx-auto max-w-2xl flex flex-col gap-9">
          {sections.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <h2 className="font-serif text-xl text-ink">{s.title}</h2>
              <p className="mt-2 leading-relaxed text-ink/60">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
