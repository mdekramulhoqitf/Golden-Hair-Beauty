export interface MediaKeyDef {
  key: string;
  label: string;
  section: string;
  type: "image" | "video" | "text" | "list";
  fallback: string;
}

export const MEDIA_KEYS: MediaKeyDef[] = [
  {
    key: "hero_headline",
    label: "হেডলাইন",
    section: "Hero",
    type: "text",
    fallback: "Hair Booster এর ছোঁয়ায় চুলের হারানো সৌন্দর্য ফিরে পেয়েছে হাজারো মানুষ।",
  },
  {
    key: "hero_video_id",
    label: "ভিডিও (YouTube লিংক বা ID)",
    section: "Hero",
    type: "video",
    fallback: "",
  },
  {
    key: "hero_description_line1",
    label: "বর্ণনা লাইন ১",
    section: "Hero",
    type: "text",
    fallback: "Hair Booster- ব্যাবহারে চুল পড়া বন্ধ করে,নতুন চুল গজাতে সাহায্য করে,চুল হবে লম্বা সিল্ক ও সাইনি।",
  },
  {
    key: "hero_description_line2",
    label: "বর্ণনা লাইন ২",
    section: "Hero",
    type: "text",
    fallback: "ফিরে আসবে চুলের হারিয়ে যাওয়া সৌন্দর্যের আত্নবিশ্বাস।",
  },
  {
    key: "benefits_heading",
    label: "শিরোনাম",
    section: "Benefits",
    type: "text",
    fallback: "Hair Booster-ব্যবহারের উপকারিতা:",
  },
  {
    key: "benefits_list",
    label: "উপকারিতার লিস্ট (প্রতি লাইনে একটি)",
    section: "Benefits",
    type: "list",
    fallback: JSON.stringify([
      "চুল পড়া বন্ধ করে চুলের গোড়া মজবুত করে।",
      "স্ক্যাল্পের খুশকি দূর করে ও চুলকানি কমায়।",
      "চুলের ড্যামেজ হওয়া প্রতিরোধ করে।",
      "স্ক্যাল্প পরিষ্কার করে নতুন চুল গজাতে সহায়তা করে।",
      "ফলিকলে পুষ্টি যোগায়, স্ক্যাল্পে রক্ত সঞ্চালন বৃদ্ধি করে।",
    ]),
  },
  {
    key: "benefits_image",
    label: "উপকারিতা সেকশনের ছবি",
    section: "Benefits",
    type: "image",
    fallback: "/images/lifestyle/hair-booster-lifestyle.png",
  },
  {
    key: "how_to_use_heading",
    label: "শিরোনাম",
    section: "How To Use",
    type: "text",
    fallback: "ব্যবহারবিধি :",
  },
  {
    key: "how_to_use_list",
    label: "ধাপসমূহ (প্রতি লাইনে একটি)",
    section: "How To Use",
    type: "list",
    fallback: JSON.stringify([
      "রাতে ঘুমানোর পূর্বে মাথার ত্বকে ৭-৮বার স্প্রে করতে হবে।",
      "আঙ্গুলের মাথার পেড অথবা মোটা দাঁতের চিরুনির সাহায্যে",
      "আলতোভাবে ৩-৪ মিনিট ম্যাসাজ করতে হবে। সকাল",
      "গোসলের সময় সালফেট ফ্রি শ্যাম্পু দিয়ে চুল নিতে হবে।",
      "ভালো ফলাফলের জন্য সপ্তাহে ৫-৬ দিন ব্যবহার উত্তম।",
    ]),
  },
  {
    key: "how_to_use_image",
    label: "ব্যবহারবিধি সেকশনের ছবি",
    section: "How To Use",
    type: "image",
    fallback: "/images/hero-products/Booster.png",
  },
  {
    key: "transformation_heading",
    label: "শিরোনাম",
    section: "Transformation",
    type: "text",
    fallback: "Hair Booster ব্যবহারের পর আপনার পরিবর্তন সমূহ:",
  },
  {
    key: "transformation_list",
    label: "পরিবর্তনসমূহ (প্রতি লাইনে একটি)",
    section: "Transformation",
    type: "list",
    fallback: JSON.stringify([
      "চুল পড়া বন্ধ হবে শতভাগ ইনশাআল্লাহ।",
      "স্ক্যাল্প ও চুলের যাবতীয় সমস্যা দূর হবে।",
      "ফিরে পাবেন হারানো চুলের রাজকীয় সৌন্দর্য।",
      "ফিরে পাবেন আপনার হারিয়ে যাওয়া আত্মবিশ্বাস।",
      "হতাশা, দুশ্চিন্তা থেকে মুক্ত হয়ে ফিরে পাবেন মানসিক প্রশান্তি।",
      "আপনার ভেতর ফুটে উঠবে তারুণ্য ও কৈশোরের এক প্রতিচ্ছবি।",
      "সবার সামনে নিজেকে উপস্থাপন করবে আরো বেশি আত্মবিশ্বাসী।",
    ]),
  },
  {
    key: "transformation_image",
    label: "পরিবর্তন সেকশনের ছবি",
    section: "Transformation",
    type: "image",
    fallback: "/images/item/hair_boster/hair booster (4).png",
  },
  {
    key: "trust_heading",
    label: "শিরোনাম",
    section: "Trust",
    type: "text",
    fallback: "আস্থা ও বিশ্বাসে Golden Hair-এর অর্জনসমূহ",
  },
  {
    key: "trust_paragraph",
    label: "বর্ণনা",
    section: "Trust",
    type: "text",
    fallback:
      "সারা বাংলাদেশে হাজারো গ্রাহকের আস্থায় গড়ে ওঠা Golden Hair — প্রতিটি পণ্য যত্নসহকারে তৈরি এবং যাচাইকৃত গ্রাহক রিভিউয়ে সমর্থিত। নিরাপদ পেমেন্ট ও ক্যাশ অন ডেলিভারি সুবিধায় নিশ্চিন্তে অর্ডার করুন।",
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
  {
    key: "contact_bar_label",
    label: "নিচের ফিক্সড বার এর লেখা",
    section: "Contact Bar",
    type: "text",
    fallback: "অর্ডার/যোগাযোগ করুন-",
  },
  {
    key: "contact_bar_phone",
    label: "ফোন নম্বর",
    section: "Contact Bar",
    type: "text",
    fallback: "01787 478 146",
  },
];
