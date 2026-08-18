import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Goldenhair collects, uses and protects your personal information.",
};

const sections = [
  {
    title: "Information We Collect",
    body: "We collect information you provide directly, such as your name, phone number, email address and delivery address when placing an order or contacting our support team.",
  },
  {
    title: "How We Use Your Information",
    body: "Your information is used to process orders, provide customer support, and — with your consent — send updates about new products and offers. We never sell your personal data to third parties.",
  },
  {
    title: "Data Security",
    body: "We employ industry-standard measures to protect your information from unauthorized access, alteration or disclosure.",
  },
  {
    title: "Your Rights",
    body: "You may request access to, correction of, or deletion of your personal data at any time by contacting hello@goldenhairbeauty.com.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
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
