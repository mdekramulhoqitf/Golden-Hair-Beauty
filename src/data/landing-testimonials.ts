export interface LandingTestimonial {
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

export const landingTestimonials: LandingTestimonial[] = [
  {
    id: "lt1",
    name: "ফারজানা রহমান",
    location: "ঢাকা",
    rating: 5,
    review:
      "গ্রোথ সিরাম এখন আমার রাতের রুটিনের অংশ হয়ে গেছে। স্ক্যাল্প অনেক শান্ত লাগে আর কয়েক সপ্তাহেই চুল আগের চেয়ে চকচকে দেখাচ্ছে।",
    verified: true,
  },
  {
    id: "lt2",
    name: "ইমরান কবির",
    location: "চট্টগ্রাম",
    rating: 5,
    review: "হেয়ার বুস্টার ব্যবহার শুরু করার পর থেকে চুল পড়া অনেকটাই কমে গেছে — ছবিতেই পার্থক্য বোঝা যাচ্ছে।",
    verified: true,
    media: {
      type: "image",
      src: "/images/lifestyle/afterbefore.png",
    },
  },
  {
    id: "lt3",
    name: "নুসরাত জাহান",
    location: "সিলেট",
    rating: 5,
    review:
      "অবশেষে একটা সালফেট ফ্রি শ্যাম্পু পেলাম যা ভালোভাবে ফেনা তোলে অথচ চুল রুক্ষ করে না। প্যাকেজিংটাও বেশ প্রিমিয়াম লাগে।",
    verified: true,
  },
  {
    id: "lt4",
    name: "রাফিউল ইসলাম",
    location: "খুলনা",
    rating: 5,
    review:
      "Goldenhair-এর প্রতিটি জিনিস যত্ন করে বানানো মনে হয় — গন্ধ থেকে শুরু করে টেক্সচার পর্যন্ত। এক মাস ব্যবহারে চুল আগের চেয়ে ঘন ও স্বাস্থ্যোজ্জ্বল লাগছে।",
    verified: true,
  },
  {
    id: "lt5",
    name: "আয়েশা সিদ্দিকা",
    location: "রাজশাহী",
    rating: 4,
    review:
      "হালকা সিরাম, খুব দ্রুত শুষে যায়। দুই সপ্তাহের মধ্যেই চুলের উজ্জ্বলতা আর মসৃণতায় স্পষ্ট পার্থক্য বুঝতে পেরেছি।",
    verified: true,
  },
];
