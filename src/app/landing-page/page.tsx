import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import MetaPixel from "@/components/landing/meta-pixel";
import FloatingContact from "@/components/landing/floating-contact";
import LandingHero from "@/components/landing/landing-hero";
import LandingBenefits from "@/components/landing/landing-benefits";
import LandingHowToUse from "@/components/landing/landing-how-to-use";
import LandingTransformation from "@/components/landing/landing-transformation";
import LandingReviews from "@/components/landing/landing-reviews";
import LandingTrust from "@/components/landing/landing-trust";
import LandingOrderForm from "@/components/landing/landing-order-form";
import LandingBanner from "@/components/landing/landing-banner";
import LandingContactBar from "@/components/landing/landing-contact-bar";

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "বিশেষ অফার — চুল পড়া ও খুশকি রোধের সমাধান",
  description:
    "Goldenhair সালফেট ফ্রি শ্যাম্পু, হেয়ার বুস্টার ও গ্রোথ সিরাম — চুল পড়া, খুশকি ও দুর্বল স্ক্যাল্পের সায়েন্টিফিক সমাধান। ক্যাশ অন ডেলিভারিতে আজই অর্ডার করুন।",
  openGraph: {
    title: "Goldenhair — চুল পড়া ও খুশকি রোধের সমাধান",
    description:
      "সালফেট ফ্রি শ্যাম্পু, হেয়ার বুস্টার ও গ্রোথ সিরাম দিয়ে ফিরে পান স্বাস্থ্যোজ্জ্বল চুল। ক্যাশ অন ডেলিভারিতে আজই অর্ডার করুন।",
    images: [{ url: "/images/lifestyle/banner.png", width: 1717, height: 916 }],
    locale: "bn_BD",
    type: "website",
  },
};

export default function LandingPage() {
  return (
    <div className={notoSansBengali.className}>
      <MetaPixel />
      <FloatingContact />
      <LandingHero />
      <LandingBenefits />
      <LandingHowToUse />
      <LandingTransformation />
      <LandingReviews />
      <LandingTrust />
      <LandingOrderForm />
      <LandingBanner />
      <LandingContactBar />
    </div>
  );
}
