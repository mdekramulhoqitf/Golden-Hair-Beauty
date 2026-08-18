import type { Metadata } from "next";
import { Suspense } from "react";
import ShopClient from "@/components/shop-client";
import PageHero from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Shop All Products",
  description:
    "Explore the full Goldenhair collection — sulfate-free shampoo, hair booster and growth serum crafted for visibly healthier hair.",
};

export default function ShopPage() {
  return (
    <>
      <PageHero
        eyebrow="Shop Goldenhair"
        title="The Full Collection"
        description="Every formula, one destination — filter by concern, category or bestseller status to build your ritual."
      />
      <Suspense fallback={null}>
        <ShopClient />
      </Suspense>
    </>
  );
}
