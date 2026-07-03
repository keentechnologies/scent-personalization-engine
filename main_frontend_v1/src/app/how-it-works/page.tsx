import type { Metadata } from "next";
import { HowItWorks } from "@/components/home/how-it-works";

export const metadata: Metadata = {
  title: "How We Find The Right Perfume For You | Crafted Sprays",
  description:
    "Discover how Crafted Sprays understands your personality, lifestyle and preferences before recommending fragrances designed specifically for you.",
  alternates: {
    canonical: "/how-it-works",
  },
};

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col">
      <HowItWorks />
    </div>
  );
}
