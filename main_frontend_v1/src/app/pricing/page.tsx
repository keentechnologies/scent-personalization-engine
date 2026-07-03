import type { Metadata } from "next";
import { Pricing } from "@/components/home/pricing";

export const metadata: Metadata = {
  title: "Personalised Perfume From ₹1299 | Crafted Sprays",
  description:
    "Explore transparent pricing, premium packaging and everything included with your personalised fragrance recommendation.",
  alternates: {
    canonical: "/pricing",
  },
};

export default function PricingPage() {
  return (
    <div className="flex flex-col">
      <Pricing />
    </div>
  );
}
