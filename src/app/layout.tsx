import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";
import { WishlistProvider } from "@/context/wishlist-context";
import { ToastProvider } from "@/context/toast-context";
import { QuickViewProvider } from "@/context/quickview-context";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CartDrawer from "@/components/cart-drawer";
import QuickViewModal from "@/components/quick-view-modal";
import ScrollProgress from "@/components/scroll-progress";

const openSans = Open_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-open-sans",
  display: "swap",
});

const siteUrl = "https://goldenhairbeauty.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Goldenhair — Luxury Hair & Beauty",
    template: "%s | Goldenhair",
  },
  description:
    "Goldenhair is a premium hair care and beauty brand crafting sulfate-free shampoo, hair boosters and scalp nutrition serums for men & women who expect visibly healthier-looking hair.",
  keywords: [
    "Goldenhair",
    "luxury hair care",
    "sulfate free shampoo",
    "hair fall solution",
    "growth serum",
    "scalp nutrition",
    "premium beauty brand Bangladesh",
  ],
  openGraph: {
    title: "Goldenhair — Luxury Hair & Beauty",
    description:
      "Premium hair care crafted for visibly healthier, stronger, shinier-looking hair. For men & women.",
    url: siteUrl,
    siteName: "Goldenhair",
    images: [{ url: "/images/lifestyle/banner.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Goldenhair — Luxury Hair & Beauty",
    description:
      "Premium hair care crafted for visibly healthier, stronger, shinier-looking hair.",
    images: ["/images/lifestyle/banner.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={openSans.variable}>
      <body className="min-h-screen bg-warm-white font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Goldenhair",
              url: siteUrl,
              logo: `${siteUrl}/images/products/shampoo.png`,
              description:
                "Goldenhair is a premium hair care and beauty brand crafting sulfate-free shampoo, hair boosters and scalp nutrition serums.",
              sameAs: [],
            }),
          }}
        />
        <ToastProvider>
          <WishlistProvider>
            <CartProvider>
              <QuickViewProvider>
                <ScrollProgress />
                <a
                  href="#main-content"
                  className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-cream"
                >
                  Skip to content
                </a>
                <Header />
                <main id="main-content">{children}</main>
                <Footer />
                <CartDrawer />
                <QuickViewModal />
              </QuickViewProvider>
            </CartProvider>
          </WishlistProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
