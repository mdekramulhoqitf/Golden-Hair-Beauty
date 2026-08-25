export interface MediaKeyDef {
  key: string;
  label: string;
  section: string;
  type: "image" | "video";
  fallback: string;
}

export const MEDIA_KEYS: MediaKeyDef[] = [
  {
    key: "hero_video_id",
    label: "ভিডিও (YouTube লিংক বা ID)",
    section: "Hero",
    type: "video",
    fallback: "",
  },
  {
    key: "benefits_image",
    label: "উপকারিতা সেকশনের ছবি",
    section: "Benefits",
    type: "image",
    fallback: "/images/lifestyle/hair-booster-lifestyle.png",
  },
  {
    key: "how_to_use_image",
    label: "ব্যবহারবিধি সেকশনের ছবি",
    section: "How To Use",
    type: "image",
    fallback: "/images/hero-products/Booster.png",
  },
  {
    key: "transformation_image",
    label: "পরিবর্তন সেকশনের ছবি",
    section: "Transformation",
    type: "image",
    fallback: "/images/item/hair_boster/hair booster (4).png",
  },
  {
    key: "banner_image",
    label: "নিচের ব্যানার ছবি",
    section: "Banner",
    type: "image",
    fallback: "/images/lifestyle/banner-2.png",
  },
  {
    key: "certified_1",
    label: "সার্টিফিকেশন সিল ১",
    section: "Trust",
    type: "image",
    fallback: "/images/certified/BCSIR.png",
  },
  {
    key: "certified_2",
    label: "সার্টিফিকেশন সিল ২",
    section: "Trust",
    type: "image",
    fallback: "/images/certified/Halal.png",
  },
  {
    key: "certified_3",
    label: "সার্টিফিকেশন সিল ৩",
    section: "Trust",
    type: "image",
    fallback: "/images/certified/LAB TESTED.png",
  },
  {
    key: "certified_4",
    label: "সার্টিফিকেশন সিল ৪",
    section: "Trust",
    type: "image",
    fallback: "/images/certified/DOCTOR.png",
  },
];
