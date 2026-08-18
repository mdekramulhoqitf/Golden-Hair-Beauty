import type { Metadata } from "next";
import CheckoutClient from "@/components/checkout-client";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your Goldenhair order — fast, secure checkout.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
