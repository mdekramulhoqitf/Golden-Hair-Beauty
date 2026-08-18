"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/format";
import { products } from "@/data/products";

export default function CartDrawer() {
  const { lines, isOpen, closeCart, removeItem, updateQuantity, subtotal, addItem } =
    useCart();

  const recommended = products.filter(
    (p) => !lines.some((l) => l.product.id === p.id)
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[110] bg-ink/60 backdrop-blur-sm"
            onClick={closeCart}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 z-[120] flex h-full w-full max-w-md flex-col bg-warm-white shadow-premium"
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-6">
              <h2 className="font-serif text-xl text-ink">
                Your Bag {lines.length > 0 && `(${lines.length})`}
              </h2>
              <button
                aria-label="Close cart"
                onClick={closeCart}
                className="btn-focus rounded-full p-2 text-ink/60 hover:bg-ink/5 hover:text-ink"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <ShoppingBag size={40} className="text-gold-400" strokeWidth={1} />
                <p className="font-serif text-lg text-ink/70">Your bag is empty</p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="mt-2 rounded-full bg-ink px-7 py-3 text-sm font-medium uppercase tracking-widest text-cream transition-colors hover:bg-gold-600"
                >
                  Shop Collection
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <ul className="flex flex-col gap-5">
                    {lines.map((line) => (
                      <motion.li
                        key={line.product.id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="flex gap-4 border-b border-ink/10 pb-5"
                      >
                        <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-cream">
                          <Image
                            src={line.product.images[0]}
                            alt={line.product.name}
                            fill
                            className="object-contain p-1.5"
                            sizes="80px"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-serif text-sm leading-tight text-ink">
                                {line.product.name}
                              </p>
                              <p className="mt-1 text-xs text-ink/50">{line.product.volume}</p>
                            </div>
                            <button
                              aria-label={`Remove ${line.product.name}`}
                              onClick={() => removeItem(line.product.id)}
                              className="btn-focus text-ink/40 hover:text-ink"
                            >
                              <X size={16} />
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 rounded-full border border-ink/15 px-2 py-1">
                              <button
                                aria-label="Decrease quantity"
                                onClick={() =>
                                  updateQuantity(line.product.id, line.quantity - 1)
                                }
                                className="btn-focus text-ink/60 hover:text-gold-600"
                              >
                                <Minus size={13} />
                              </button>
                              <span className="w-4 text-center text-xs font-medium">
                                {line.quantity}
                              </span>
                              <button
                                aria-label="Increase quantity"
                                onClick={() =>
                                  updateQuantity(line.product.id, line.quantity + 1)
                                }
                                className="btn-focus text-ink/60 hover:text-gold-600"
                              >
                                <Plus size={13} />
                              </button>
                            </div>
                            <span className="font-serif text-sm text-ink">
                              {formatPrice(line.product.price * line.quantity)}
                            </span>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </ul>

                  {recommended.length > 0 && (
                    <div className="mt-8">
                      <p className="eyebrow mb-4">You may also like</p>
                      <div className="flex flex-col gap-3">
                        {recommended.slice(0, 2).map((p) => (
                          <div
                            key={p.id}
                            className="flex items-center gap-3 rounded-2xl border border-ink/10 p-3"
                          >
                            <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded-lg bg-cream">
                              <Image
                                src={p.images[0]}
                                alt={p.name}
                                fill
                                className="object-contain p-1"
                                sizes="48px"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-xs font-medium text-ink">{p.name}</p>
                              <p className="text-xs text-ink/50">{formatPrice(p.price)}</p>
                            </div>
                            <button
                              onClick={() => addItem(p, 1)}
                              className="btn-focus shrink-0 rounded-full border border-gold-500/40 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wide text-gold-700 transition-colors hover:bg-gold-500/10"
                            >
                              Add
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-ink/10 px-6 py-6">
                  <div className="mb-4 flex items-center justify-between text-sm text-ink/60">
                    <span>Subtotal</span>
                    <span className="font-serif text-lg text-ink">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="mb-4 text-xs text-ink/50">
                    Shipping & taxes calculated at checkout.
                  </p>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="btn-focus flex w-full items-center justify-center rounded-full bg-ink px-7 py-4 text-sm font-medium uppercase tracking-widest text-cream shadow-premium transition-colors hover:bg-gold-600"
                  >
                    Checkout
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
