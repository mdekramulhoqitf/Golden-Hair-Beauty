import type { Metadata } from "next";
import WishlistClient from "@/components/wishlist-client";
import PageHero from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Your saved Goldenhair favorites.",
};

export default function WishlistPage() {
  return (
    <>
      <PageHero eyebrow="Saved for Later" title="Your Wishlist" />
      <WishlistClient />
    </>
  );
}
