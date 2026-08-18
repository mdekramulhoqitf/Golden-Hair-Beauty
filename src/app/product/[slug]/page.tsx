import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/data/products";
import ProductGallery from "@/components/product-gallery";
import ProductInfo from "@/components/product-info";
import ProductTabs from "@/components/product-tabs";
import RelatedProducts from "@/components/related-products";
import StickyPurchaseBar from "@/components/sticky-purchase-bar";
import Breadcrumbs from "@/components/breadcrumbs";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | Goldenhair`,
      description: product.shortDescription,
      images: [{ url: product.images[0] }],
    },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.images[0],
    brand: { "@type": "Brand", name: "Goldenhair" },
    offers: {
      "@type": "Offer",
      priceCurrency: "BDT",
      price: product.price,
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: product.name },
        ]}
      />

      <section className="bg-warm-white py-10 sm:py-14">
        <div className="container-premium grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <ProductGallery product={product} />
          <ProductInfo product={product} />
        </div>
      </section>

      <ProductTabs product={product} />
      <RelatedProducts current={product} />
      <StickyPurchaseBar product={product} />
    </>
  );
}
