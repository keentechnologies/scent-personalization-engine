import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { WhyUs } from "@/components/home/why-us";
import { HowItWorks } from "@/components/home/how-it-works";
import { Pricing } from "@/components/home/pricing";
import { Faq } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "Crafted Sprays | Find The Perfume That Truly Suits You",
  description:
    "Stop choosing perfumes based on trends, reviews or guesswork. Discover the fragrance that truly suits your personality, lifestyle and preferences.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="order-1 lg:order-1">
        <Hero />
      </div>
      <div className="order-4 lg:order-2">
        <WhyUs />
      </div>
      <div className="order-2 lg:order-3">
        <HowItWorks />
      </div>
      <div className="order-3 lg:order-4">
        <Pricing />
      </div>
      <div className="order-6 lg:order-5">
        <Faq />
      </div>
      <div className="order-5 lg:order-6">
        <FinalCta />
      </div>
    </div>
  );
}
