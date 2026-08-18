export type ProductCategory = "shampoo" | "booster" | "serum";

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  price: number;
  oldPrice?: number;
  images: string[];
  lifestyleImages: string[];
  category: ProductCategory;
  concern: string[];
  description: string;
  shortDescription: string;
  benefits: string[];
  ingredients: string[];
  howToUse: string[];
  suitableFor: string;
  rating: number;
  reviewCount: number;
  stock: number;
  featured: boolean;
  bestseller: boolean;
  newArrival: boolean;
  volume: string;
  accent: "plum" | "sapphire" | "amber";
}

export const products: Product[] = [
  {
    id: "prod-shampoo-sf",
    name: "Sulfate Free Shampoo",
    slug: "sulfate-free-shampoo",
    tagline: "Nourish · Strengthen · Shine",
    price: 1450,
    oldPrice: 1800,
    images: ["/images/products/shampoo.png"],
    lifestyleImages: ["/images/lifestyle/shampoo-lifestyle.png"],
    category: "shampoo",
    concern: ["Dryness", "Frizz", "Everyday Care"],
    description:
      "A gentle, sulfate-free cleansing ritual formulated to help nourish strands from root to tip. Free from harsh sulfates, this silky formula helps support a smoother-looking finish while respecting your scalp's natural balance — for men and women alike.",
    shortDescription:
      "A silky sulfate-free cleanse that helps nourish hair and support a smoother, shinier finish.",
    benefits: [
      "Gently cleanses without stripping natural oils",
      "Helps nourish hair from root to tip",
      "Supports a smoother, shinier-looking finish",
      "Formulated for daily use, for men & women",
    ],
    ingredients: [
      "Sulfate-Free Cleansing Base",
      "Botanical Keratin Complex",
      "Argan & Almond Oil Extracts",
      "Vitamin E",
      "Panthenol (Pro-Vitamin B5)",
    ],
    howToUse: [
      "Wet hair thoroughly with warm water",
      "Apply a coin-sized amount and massage gently into scalp",
      "Lather through lengths and leave for 1–2 minutes",
      "Rinse thoroughly. Follow with Growth Serum for best results",
    ],
    suitableFor: "All hair types, for men & women. Color-safe formula.",
    rating: 4.8,
    reviewCount: 312,
    stock: 48,
    featured: true,
    bestseller: true,
    newArrival: false,
    volume: "200 ml",
    accent: "plum",
  },
  {
    id: "prod-hair-booster",
    name: "Hair Booster – Hair Fall Solution",
    slug: "hair-booster-hair-fall-solution",
    tagline: "With Minoxidil 5 · Nourish · Strengthen · Shine",
    price: 1650,
    oldPrice: 2100,
    images: ["/images/products/hair-booster.png"],
    lifestyleImages: ["/images/lifestyle/hair-booster-lifestyle.png"],
    category: "booster",
    concern: ["Hair Fall", "Thinning", "Roots"],
    description:
      "An advanced leave-in booster crafted with Minoxidil 5 to help support stronger-looking roots and reduce the appearance of hair fall over time. Lightweight and fast-absorbing, it becomes an essential step for anyone seeking fuller, healthier-looking hair.",
    shortDescription:
      "A leave-in formula with Minoxidil 5 that helps support stronger roots and reduce visible hair fall.",
    benefits: [
      "Helps reduce the appearance of hair fall",
      "Supports stronger, more resilient-looking roots",
      "Lightweight, non-greasy, fast-absorbing formula",
      "Suitable for daily scalp care, for men & women",
    ],
    ingredients: [
      "Minoxidil 5%",
      "Biotin Complex",
      "Saw Palmetto Extract",
      "Caffeine",
      "Rosemary Oil",
    ],
    howToUse: [
      "Apply to clean, dry or towel-dried scalp",
      "Massage gently into targeted areas using fingertips",
      "Do not rinse — leave in for overnight absorption",
      "Use consistently, once daily, for best visible results",
    ],
    suitableFor: "For men & women experiencing visible thinning or hair fall.",
    rating: 4.9,
    reviewCount: 428,
    stock: 36,
    featured: true,
    bestseller: true,
    newArrival: false,
    volume: "200 ml",
    accent: "amber",
  },
  {
    id: "prod-growth-serum",
    name: "Growth Serum – Scalp Nutrition",
    slug: "growth-serum-scalp-nutrition",
    tagline: "Nourish · Strengthen · Shine",
    price: 1550,
    oldPrice: 1950,
    images: ["/images/products/growth-serum.png"],
    lifestyleImages: [
      "/images/lifestyle/growth-serum-lifestyle-1.png",
      "/images/lifestyle/growth-serum-lifestyle-2.png",
    ],
    category: "serum",
    concern: ["Scalp Care", "Growth Support", "Shine"],
    description:
      "A concentrated scalp-nutrition serum designed to help support the appearance of healthier hair growth over time. Infused with botanical actives, it helps strengthen the look of roots while adding a luminous, glass-like shine to every strand.",
    shortDescription:
      "A concentrated scalp serum that helps support hair growth appearance and adds glass-like shine.",
    benefits: [
      "Helps support the appearance of healthy hair growth",
      "Nourishes the scalp with botanical actives",
      "Adds visible shine and softness",
      "Lightweight mist, absorbs instantly",
    ],
    ingredients: [
      "Peptide Growth Complex",
      "Niacinamide",
      "Saffron Flower Extract",
      "Hyaluronic Acid",
      "Vitamin B5 & E",
    ],
    howToUse: [
      "Shake well before use",
      "Mist evenly across scalp and mid-lengths",
      "Massage gently in circular motions for 30 seconds",
      "Use morning or night — no rinsing required",
    ],
    suitableFor: "All hair types and scalp conditions, for men & women.",
    rating: 4.7,
    reviewCount: 256,
    stock: 52,
    featured: true,
    bestseller: false,
    newArrival: true,
    volume: "200 ml",
    accent: "sapphire",
  },
];

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const featuredProducts = products.filter((p) => p.featured);
export const bestsellerProducts = products.filter((p) => p.bestseller);
