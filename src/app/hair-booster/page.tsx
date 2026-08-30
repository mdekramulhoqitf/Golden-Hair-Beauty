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
import LandingContactBar from "@/components/landing/landing-contact-bar";
import LandingCopyright from "@/components/landing/landing-copyright";

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Golden Hair- চুলের সমস্যায় আধুনিক সমাধান।",
  description:
    "হেয়ার বুস্টার, হেয়ার গ্রোথ সিরাম, সালফেট ফ্রি শ্যাম্পু ব্যবহারে ফিরে পান সিল্কি ও সাইনি চুল। ক্যাশ অন ডেলিভারিতে আজই অর্ডার করুন।",
  openGraph: {
    title: "Golden Hair- চুলের সমস্যায় আধুনিক সমাধান।",
    description:
      "হেয়ার বুস্টার, হেয়ার গ্রোথ সিরাম, সালফেট ফ্রি শ্যাম্পু ব্যবহারে ফিরে পান সিল্কি ও সাইনি চুল। ক্যাশ অন ডেলিভারিতে আজই অর্ডার করুন।",
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
      <LandingContactBar />
      <LandingCopyright />
    </div>
  );
}
