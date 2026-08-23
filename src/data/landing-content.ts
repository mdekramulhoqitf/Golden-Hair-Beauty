import { getSupabaseClient } from "@/lib/supabase";
import fallbackPackages from "./store/landing-packages.json";
import fallbackReviews from "./store/landing-reviews.json";

export interface LandingPackage {
  id: string;
  name: string;
  volume: string;
  price: number;
  oldPrice?: number | null;
  images: string[];
}

export interface LandingReview {
  id: string;
  name: string;
  location: string;
  rating: number;
  verified: boolean;
  review?: string;
  media?: {
    type: "image" | "video";
    src: string;
    poster?: string;
  };
}

interface RawPackageRow {
  id: string;
  name: string;
  volume: string | null;
  price: number;
  old_price: number | null;
  image_url: string | null;
  sort_order: number;
}

export async function fetchLandingPackages(): Promise<LandingPackage[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return fallbackPackages as LandingPackage[];

  const { data, error } = await supabase
    .from("landing_packages")
    .select("id, name, volume, price, old_price, image_url, sort_order")
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) {
    if (error) console.warn("Supabase fetch failed for packages, using local fallback:", error.message);
    return fallbackPackages as LandingPackage[];
  }

  return (data as RawPackageRow[]).map((row) => ({
    id: row.id,
    name: row.name,
    volume: row.volume ?? "",
    price: Number(row.price),
    oldPrice: row.old_price != null ? Number(row.old_price) : null,
    images: row.image_url ? [row.image_url] : [],
  }));
}

interface RawReviewRow {
  id: string;
  name: string;
  location: string | null;
  rating: number;
  verified: boolean;
  review: string | null;
  media_type: "none" | "image" | "video";
  media_url: string | null;
  sort_order: number;
}

export async function fetchLandingReviews(): Promise<LandingReview[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return fallbackReviews as LandingReview[];

  const { data, error } = await supabase
    .from("landing_reviews")
    .select("id, name, location, rating, verified, review, media_type, media_url, sort_order")
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) {
    if (error) console.warn("Supabase fetch failed for reviews, using local fallback:", error.message);
    return fallbackReviews as LandingReview[];
  }

  return (data as RawReviewRow[]).map((row) => ({
    id: row.id,
    name: row.name,
    location: row.location ?? "",
    rating: row.rating,
    verified: row.verified,
    review: row.review ?? undefined,
    media:
      row.media_type !== "none" && row.media_url
        ? { type: row.media_type as "image" | "video", src: row.media_url }
        : undefined,
  }));
}
