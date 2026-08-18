"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "@/data/faq";
import SectionHeading from "@/components/section-heading";
import Reveal from "@/components/reveal";

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-warm-white py-24 sm:py-32">
      <div className="container-premium">
        <SectionHeading
          eyebrow="Good to Know"
          title="Frequently Asked Questions"
          description="Everything you need to know before starting your Goldenhair ritual."
        />

        <div className="mx-auto mt-14 max-w-3xl divide-y divide-ink/10 border-y border-ink/10">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={faq.question} delay={i * 0.04}>
                <div>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="btn-focus flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-serif text-lg text-ink sm:text-xl">
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold-500/40 text-gold-600"
                    >
                      <Plus size={15} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-7 pr-10 text-sm leading-relaxed text-ink/60">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
