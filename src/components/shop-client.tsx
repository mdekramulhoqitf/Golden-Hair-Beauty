"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ListFilter, Search, SlidersHorizontal, X } from "lucide-react";
import { products, ProductCategory } from "@/data/products";
import ProductCard from "@/components/product-card";
import { cn } from "@/lib/format";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating" | "newest";

const categories: { key: ProductCategory | "all"; label: string }[] = [
  { key: "all", label: "All Products" },
  { key: "shampoo", label: "Shampoo" },
  { key: "booster", label: "Hair Booster" },
  { key: "serum", label: "Growth Serum" },
];

const allConcerns = Array.from(new Set(products.flatMap((p) => p.concern)));

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "newest", label: "New Arrivals" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "rating", label: "Best Rated" },
];

export default function ShopClient() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProductCategory | "all">("all");

  useEffect(() => {
    const param = searchParams.get("category") as ProductCategory | null;
    if (param && categories.some((c) => c.key === param)) setCategory(param);
  }, [searchParams]);
  const [concerns, setConcerns] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>("featured");
  const [maxPrice, setMaxPrice] = useState(2200);
  const [bestsellerOnly, setBestsellerOnly] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleConcern = (c: string) =>
    setConcerns((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.price <= maxPrice);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (concerns.length) list = list.filter((p) => p.concern.some((c) => concerns.includes(c)));
    if (bestsellerOnly) list = list.filter((p) => p.bestseller);

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list = [...list].sort((a, b) => Number(b.newArrival) - Number(a.newArrival));
        break;
    }
    return list;
  }, [query, category, concerns, sort, maxPrice, bestsellerOnly]);

  const FilterPanel = (
    <div className="flex flex-col gap-9">
      <div>
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-ink/40">
          Category
        </p>
        <div className="flex flex-col gap-1">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setCategory(c.key)}
              className={cn(
                "btn-focus rounded-lg px-3 py-2.5 text-left text-sm transition-colors duration-300",
                category === c.key
                  ? "bg-ink text-cream"
                  : "text-ink/65 hover:bg-ink/5"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-ink/40">
          Hair Concern
        </p>
        <div className="flex flex-wrap gap-2">
          {allConcerns.map((c) => (
            <button
              key={c}
              onClick={() => toggleConcern(c)}
              className={cn(
                "btn-focus rounded-full border px-3.5 py-1.5 text-xs transition-colors duration-300",
                concerns.includes(c)
                  ? "border-gold-500 bg-gold-500/10 text-gold-700"
                  : "border-ink/15 text-ink/60 hover:border-ink/30"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-ink/40">
          Max Price: ৳{maxPrice.toLocaleString("en-BD")}
        </p>
        <input
          type="range"
          min={1000}
          max={2200}
          step={50}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-gold-500"
        />
      </div>

      <label className="flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          checked={bestsellerOnly}
          onChange={(e) => setBestsellerOnly(e.target.checked)}
          className="h-4 w-4 accent-gold-500"
        />
        <span className="text-sm text-ink/70">Best Sellers Only</span>
      </label>
    </div>
  );

  return (
    <section className="bg-warm-white py-16 sm:py-20">
      <div className="container-premium">
        <div className="flex flex-col gap-4 border-b border-ink/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-xs">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/35" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="btn-focus w-full rounded-full border border-ink/15 bg-transparent py-3 pl-11 pr-4 text-sm text-ink placeholder:text-ink/35 focus:border-gold-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              className="btn-focus flex items-center gap-2 rounded-full border border-ink/15 px-4 py-3 text-sm text-ink/70 transition-colors hover:border-gold-500 lg:hidden"
            >
              <SlidersHorizontal size={15} />
              Filters
            </button>
            <div className="flex items-center gap-2">
              <ListFilter size={15} className="hidden text-ink/40 sm:block" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="btn-focus rounded-full border border-ink/15 bg-transparent py-3 pl-4 pr-9 text-sm text-ink"
              >
                {sortOptions.map((o) => (
                  <option key={o.key} value={o.key}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">{FilterPanel}</aside>

          <div>
            <p className="mb-6 text-sm text-ink/50">
              Showing {filtered.length} of {products.length} products
            </p>
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-ink/15 py-24 text-center">
                <p className="font-serif text-xl text-ink/70">No products match your filters</p>
                <button
                  onClick={() => {
                    setQuery("");
                    setCategory("all");
                    setConcerns([]);
                    setMaxPrice(2200);
                    setBestsellerOnly(false);
                  }}
                  className="btn-focus mt-2 text-sm text-gold-600 underline"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-[110] bg-ink/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-0 top-0 z-[120] h-full w-full max-w-xs overflow-y-auto bg-warm-white p-6 shadow-premium lg:hidden"
            >
              <div className="mb-8 flex items-center justify-between">
                <h3 className="font-serif text-xl text-ink">Filters</h3>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="btn-focus rounded-full p-2 hover:bg-ink/5"
                  aria-label="Close filters"
                >
                  <X size={20} />
                </button>
              </div>
              {FilterPanel}
              <button
                onClick={() => setDrawerOpen(false)}
                className="btn-focus mt-10 w-full rounded-full bg-ink py-3.5 text-sm font-medium uppercase tracking-widest text-cream"
              >
                Show {filtered.length} Results
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
