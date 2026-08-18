"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, CreditCard, Landmark, Smartphone, Truck } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { formatPrice, cn } from "@/lib/format";
import PageHero from "@/components/page-hero";

type PaymentMethod = "cod" | "bkash" | "nagad" | "card";

const paymentOptions: { key: PaymentMethod; label: string; icon: any; desc: string }[] = [
  { key: "cod", label: "Cash on Delivery", icon: Truck, desc: "Pay when your order arrives" },
  { key: "bkash", label: "bKash", icon: Smartphone, desc: "Pay via bKash mobile wallet" },
  { key: "nagad", label: "Nagad", icon: Smartphone, desc: "Pay via Nagad mobile wallet" },
  { key: "card", label: "Card Payment", icon: CreditCard, desc: "Visa, Mastercard, Amex" },
];

const SHIPPING_FEE = 120;

export default function CheckoutClient() {
  const { lines, subtotal } = useCart();
  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [placed, setPlaced] = useState(false);

  const total = subtotal + (lines.length ? SHIPPING_FEE : 0);

  if (placed) {
    return (
      <section className="flex min-h-[70vh] items-center bg-warm-white py-32">
        <div className="container-premium flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <CheckCircle2 size={56} className="text-gold-500" strokeWidth={1.25} />
          </motion.div>
          <h1 className="mt-6 font-serif text-3xl text-ink sm:text-4xl">Order Confirmed</h1>
          <p className="mt-3 max-w-md text-ink/60">
            Thank you for choosing Goldenhair. A confirmation has been sent and your
            order will be prepared for {payment === "cod" ? "Cash on Delivery" : payment} dispatch shortly.
          </p>
          <Link
            href="/shop"
            className="btn-focus mt-8 rounded-full bg-ink px-8 py-4 text-sm font-medium uppercase tracking-widest text-cream transition-colors hover:bg-gold-600"
          >
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  if (lines.length === 0) {
    return (
      <section className="flex min-h-[60vh] items-center bg-warm-white py-32">
        <div className="container-premium flex flex-col items-center text-center">
          <h1 className="font-serif text-3xl text-ink">Your bag is empty</h1>
          <p className="mt-3 text-ink/60">Add a few essentials before checking out.</p>
          <Link
            href="/shop"
            className="btn-focus mt-8 rounded-full bg-ink px-8 py-4 text-sm font-medium uppercase tracking-widest text-cream transition-colors hover:bg-gold-600"
          >
            Shop Collection
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHero eyebrow="Secure Checkout" title="Complete Your Order" />
      <section className="bg-warm-white py-16">
        <div className="container-premium grid grid-cols-1 gap-12 lg:grid-cols-[1fr_400px]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setPlaced(true);
            }}
            className="flex flex-col gap-10"
          >
            <div>
              <h2 className="mb-5 font-serif text-xl text-ink">Customer Information</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Full Name" placeholder="Your full name" required />
                <Field label="Phone Number" type="tel" placeholder="01XXXXXXXXX" required />
                <Field label="Email Address" type="email" placeholder="you@email.com" className="sm:col-span-2" required />
                <Field label="Delivery Address" placeholder="House, Road, Area" className="sm:col-span-2" required />
                <Field label="City / District" placeholder="Dhaka" required />
                <Field label="Postal Code" placeholder="1207" />
              </div>
            </div>

            <div>
              <h2 className="mb-5 font-serif text-xl text-ink">Payment Method</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {paymentOptions.map((opt) => (
                  <button
                    type="button"
                    key={opt.key}
                    onClick={() => setPayment(opt.key)}
                    className={cn(
                      "btn-focus flex items-center gap-3 rounded-2xl border p-4 text-left transition-colors duration-300",
                      payment === opt.key
                        ? "border-gold-500 bg-gold-500/5"
                        : "border-ink/12 hover:border-ink/25"
                    )}
                  >
                    <opt.icon size={20} className="shrink-0 text-gold-600" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm font-medium text-ink">{opt.label}</p>
                      <p className="text-xs text-ink/45">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="btn-focus w-full rounded-full bg-ink py-4 text-sm font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-gold-600 lg:w-auto lg:px-12"
            >
              Place Order &mdash; {formatPrice(total)}
            </button>
          </form>

          <aside className="h-fit rounded-3xl border border-ink/10 bg-cream p-7">
            <h3 className="mb-6 font-serif text-lg text-ink">Order Summary</h3>
            <ul className="flex flex-col gap-4">
              {lines.map((line) => (
                <li key={line.product.id} className="flex items-center gap-3">
                  <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-xl bg-warm-white">
                    <Image
                      src={line.product.images[0]}
                      alt={line.product.name}
                      fill
                      className="object-contain p-1.5"
                      sizes="56px"
                    />
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[10px] text-cream">
                      {line.quantity}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-ink">{line.product.name}</p>
                    <p className="text-xs text-ink/45">{line.product.volume}</p>
                  </div>
                  <span className="text-sm text-ink">
                    {formatPrice(line.product.price * line.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-2 border-t border-ink/10 pt-5 text-sm">
              <div className="flex justify-between text-ink/60">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-ink/60">
                <span>Shipping</span>
                <span>{formatPrice(SHIPPING_FEE)}</span>
              </div>
              <div className="mt-2 flex justify-between border-t border-ink/10 pt-3 font-serif text-lg text-ink">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className={cn("flex flex-col gap-2", className)}>
      <span className="text-xs font-medium uppercase tracking-wide text-ink/50">{label}</span>
      <input
        {...props}
        className="btn-focus rounded-xl border border-ink/15 bg-warm-white px-4 py-3 text-sm text-ink placeholder:text-ink/30 focus:border-gold-500"
      />
    </label>
  );
}
