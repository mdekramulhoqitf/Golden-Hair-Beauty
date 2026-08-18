import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import TrackOrderForm from "@/components/track-order-form";

export const metadata: Metadata = {
  title: "Track Your Order",
  description: "Track the status and delivery progress of your Goldenhair order.",
};

export default function TrackOrderPage() {
  return (
    <>
      <PageHero
        eyebrow="Order Status"
        title="Track Your Order"
        description="Enter your order ID and the phone number used at checkout to view your delivery status."
      />
      <section className="bg-warm-white py-20">
        <div className="container-premium mx-auto max-w-md">
          <TrackOrderForm />
        </div>
      </section>
    </>
  );
}
