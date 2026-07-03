import type { Metadata } from "next";
import { WhyUs } from "@/components/home/why-us";

export const metadata: Metadata = {
  title: "Why Personalised Fragrance Works Better | Crafted Sprays",
  description:
    "Most people choose perfumes by following trends or recommendations. Learn why a personalised approach leads to fragrances that feel more natural, memorable and uniquely yours.",
  alternates: {
    canonical: "/why-us",
  },
};

export default function WhyUsPage() {
  return (
    <div className="flex flex-col">
      <WhyUs />
    </div>
  );
}
