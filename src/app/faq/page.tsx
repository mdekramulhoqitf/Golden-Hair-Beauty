import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import FaqAccordion from "@/components/faq-accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Goldenhair products, usage, shipping and returns.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="Support" title="Frequently Asked Questions" />
      <FaqAccordion />
    </>
  );
}
