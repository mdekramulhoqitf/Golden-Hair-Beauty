import Hero from "@/components/hero";
import FeaturedProducts from "@/components/featured-products";
import BrandDifference from "@/components/brand-difference";
import BeforeAfter from "@/components/before-after";
import Benefits from "@/components/benefits";
import BeautyVisual from "@/components/beauty-visual";
import BestSellers from "@/components/best-sellers";
import Reviews from "@/components/reviews";
import FaqAccordion from "@/components/faq-accordion";
import FinalCta from "@/components/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <BrandDifference />
      <BeforeAfter />
      <Benefits />
      <BeautyVisual />
      <BestSellers />
      <Reviews />
      <FaqAccordion />
      <FinalCta />
    </>
  );
}
