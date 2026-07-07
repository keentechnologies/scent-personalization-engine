import type { Metadata } from "next";
import { AboutUs } from "@/components/about-us/about-us";

export const metadata: Metadata = {
  title: "About Us | Crafted Sprays",
  description:
    "We believe fragrance discovery should work differently. It shouldn't begin with the bottle, popularity, or reviews — it should begin with you.",
  alternates: {
    canonical: "/about-us",
  },
};

export default function AboutUsPage() {
  return (
    <div className="flex flex-col">
      <AboutUs />
    </div>
  );
}
