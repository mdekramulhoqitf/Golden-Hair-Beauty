"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import Logo from "@/components/logo";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { cn } from "@/lib/format";
import SearchOverlay from "@/components/search-overlay";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/hair-care", label: "Hair Care" },
  { href: "/contact", label: "Contact" },
  { href: "/landing-page", label: "Landing Page" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  const { ids } = useWishlist();

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-premium",
          transparent
            ? "bg-transparent py-6"
            : "border-b border-black/5 bg-warm-white/85 py-4 shadow-[0_1px_0_rgba(0,0,0,0.03)] backdrop-blur-xl"
        )}
      >
        <div className="container-premium grid grid-cols-[1fr_auto_1fr] items-center">
          <div className="flex items-center">
            <AnimatePresence mode="wait">
              {!transparent && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Logo />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <nav className="hidden items-center gap-9 justify-self-center lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "gold-underline text-sm font-medium tracking-wide transition-colors duration-300 btn-focus",
                  transparent ? "text-cream/90 hover:text-cream" : "text-ink/80 hover:text-ink"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-self-end gap-0 sm:gap-3">
            <button
              aria-label="Search products"
              onClick={() => setSearchOpen(true)}
              className={cn(
                "btn-focus rounded-full p-2 sm:p-2.5 transition-colors duration-300 hover:bg-gold-500/10",
                transparent ? "text-cream" : "text-ink"
              )}
            >
              <Search size={19} strokeWidth={1.5} />
            </button>
            <Link
              href="/wishlist"
              aria-label={`Wishlist, ${ids.length} items`}
              className={cn(
                "btn-focus relative rounded-full p-2 sm:p-2.5 transition-colors duration-300 hover:bg-gold-500/10",
                transparent ? "text-cream" : "text-ink"
              )}
            >
              <Heart size={19} strokeWidth={1.5} />
              {ids.length > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 text-[9px] font-semibold text-ink">
                  {ids.length}
                </span>
              )}
            </Link>
            <button
              aria-label={`Open cart, ${itemCount} items`}
              onClick={openCart}
              className={cn(
                "btn-focus relative rounded-full p-2 sm:p-2.5 transition-colors duration-300 hover:bg-gold-500/10",
                transparent ? "text-cream" : "text-ink"
              )}
            >
              <ShoppingBag size={19} strokeWidth={1.5} />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    key={itemCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 text-[9px] font-semibold text-ink"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className={cn(
                "btn-focus rounded-full p-2 sm:p-2.5 transition-colors duration-300 hover:bg-gold-500/10 lg:hidden",
                transparent ? "text-cream" : "text-ink"
              )}
            >
              <Menu size={21} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[90] bg-plum-gradient lg:hidden"
          >
            <div className="grain relative flex h-full flex-col overflow-y-auto px-6 pb-10 pt-6">
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                  className="btn-focus rounded-full p-2.5 text-cream hover:bg-gold-500/10"
                >
                  <X size={22} strokeWidth={1.5} />
                </button>
              </div>

              <nav className="mt-16 flex flex-1 flex-col gap-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between border-b border-cream/10 py-5 font-serif text-3xl text-cream transition-colors hover:text-gold-400"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-10 flex items-center justify-between text-cream/60">
                <span className="text-xs uppercase tracking-widest2">Dhaka, Bangladesh</span>
                <a
                  href="tel:+8801787478146"
                  className="text-xs uppercase tracking-widest2 transition-colors hover:text-gold-400"
                >
                  01787 478 146
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
