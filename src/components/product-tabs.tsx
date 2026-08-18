"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, Star } from "lucide-react";
import { Product } from "@/data/products";
import { testimonials } from "@/data/testimonials";
import { faqs } from "@/data/faq";
import { cn } from "@/lib/format";

const categoryLabel: Record<Product["category"], string> = {
  shampoo: "Sulfate Free Shampoo",
  booster: "Hair Booster",
  serum: "Growth Serum",
};

const TABS = ["Overview", "Benefits", "Ingredients", "How To Use", "Suitable For", "Reviews", "FAQ"] as const;

export default function ProductTabs({ product }: { product: Product }) {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Overview");
  const relatedReviews = testimonials.filter((t) => t.product === categoryLabel[product.category]);

  return (
    <section className="border-t border-ink/10 py-20">
      <div className="container-premium">
        <div className="flex gap-2 overflow-x-auto border-b border-ink/10 pb-px">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "btn-focus relative shrink-0 px-5 py-4 text-sm font-medium transition-colors duration-300",
                tab === t ? "text-ink" : "text-ink/45 hover:text-ink/70"
              )}
            >
              {t}
              {tab === t && (
                <motion.span
                  layoutId="tab-underline"
                  className="absolute inset-x-0 -bottom-px h-[2px] bg-gold-gradient"
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="mt-10 max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {tab === "Overview" && (
                <p className="text-base leading-relaxed text-ink/65">{product.description}</p>
              )}

              {tab === "Benefits" && (
                <ul className="flex flex-col gap-3">
                  {product.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-ink/70">
                      <BadgeCheck size={16} className="mt-0.5 shrink-0 text-gold-600" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}

              {tab === "Ingredients" && (
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="rounded-full border border-ink/12 px-4 py-2 text-xs text-ink/65"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              )}

              {tab === "How To Use" && (
                <ol className="flex flex-col gap-4">
                  {product.howToUse.map((step, i) => (
                    <li key={step} className="flex items-start gap-4 text-sm text-ink/70">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-500/10 text-xs font-semibold text-gold-700">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              )}

              {tab === "Suitable For" && (
                <p className="text-base leading-relaxed text-ink/65">{product.suitableFor}</p>
              )}

              {tab === "Reviews" && (
                <div className="flex flex-col gap-6">
                  {(relatedReviews.length ? relatedReviews : testimonials.slice(0, 2)).map((t) => (
                    <div key={t.id} className="border-b border-ink/10 pb-6">
                      <div className="mb-2 flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={13}
                            className={i < t.rating ? "text-gold-500" : "text-ink/15"}
                            fill="currentColor"
                          />
                        ))}
                      </div>
                      <p className="text-sm leading-relaxed text-ink/70">&ldquo;{t.review}&rdquo;</p>
                      <p className="mt-2 text-xs text-ink/45">
                        {t.name} · {t.location}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {tab === "FAQ" && (
                <div className="flex flex-col gap-6">
                  {faqs.slice(0, 4).map((f) => (
                    <div key={f.question}>
                      <p className="font-serif text-base text-ink">{f.question}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{f.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
