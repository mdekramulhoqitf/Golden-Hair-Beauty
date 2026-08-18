import { products, Product } from "@/data/products";
import ProductCard from "@/components/product-card";
import Reveal from "@/components/reveal";

export default function RelatedProducts({ current }: { current: Product }) {
  const related = products.filter((p) => p.id !== current.id);
  if (!related.length) return null;

  return (
    <section className="bg-cream py-20">
      <div className="container-premium">
        <Reveal>
          <span className="eyebrow">Complete the Ritual</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">You May Also Like</h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
