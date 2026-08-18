export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  verified: boolean;
  product: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Farzana Rahman",
    location: "Dhaka",
    rating: 5,
    review:
      "The Growth Serum has genuinely become part of my nightly ritual. My scalp feels calmer and my hair looks noticeably shinier within a few weeks.",
    verified: true,
    product: "Growth Serum",
  },
  {
    id: "t2",
    name: "Imran Kabir",
    location: "Chattogram",
    rating: 5,
    review:
      "Switched to the Hair Booster after struggling with visible thinning. The formula feels premium and my roots look stronger already.",
    verified: true,
    product: "Hair Booster",
  },
  {
    id: "t3",
    name: "Nusrat Jahan",
    location: "Sylhet",
    rating: 5,
    review:
      "Finally a sulfate-free shampoo that actually lathers beautifully and leaves my hair soft, not stripped. The packaging feels luxurious too.",
    verified: true,
    product: "Sulfate Free Shampoo",
  },
  {
    id: "t4",
    name: "Rafiul Islam",
    location: "Khulna",
    rating: 5,
    review:
      "Everything about Goldenhair feels considered — from the scent to the texture. My hair appears fuller and healthier after a month of use.",
    verified: true,
    product: "Hair Booster",
  },
  {
    id: "t5",
    name: "Ayesha Siddiqua",
    location: "Rajshahi",
    rating: 4,
    review:
      "Lovely lightweight serum that absorbs instantly. I noticed a visible difference in shine and smoothness within two weeks.",
    verified: true,
    product: "Growth Serum",
  },
];
