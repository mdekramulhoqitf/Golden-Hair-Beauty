import { featuredProducts } from "@/data/products";
import ProductCard from "@/components/product-card";
import SectionHeading from "@/components/section-heading";
import Reveal from "@/components/reveal";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FeaturedProducts() {
  return (
    <section className="bg-warm-white py-24 sm:py-32">
      <div className="container-premium">
        <SectionHeading
          eyebrow="The Collection"
          title="Formulated for Visibly Healthier Hair"
          description="Three essentials, one ritual — designed to nourish, strengthen and restore shine to every strand."
        />

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.12}>
              <ProductCard product={product} priority={i === 0} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-16 flex justify-center">
          <Link
            href="/shop"
            className="btn-focus group inline-flex items-center gap-2 rounded-full border border-ink/15 px-8 py-4 text-sm font-medium uppercase tracking-widest text-ink transition-colors duration-300 hover:border-gold-500 hover:text-gold-600"
          >
            View All Products
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
