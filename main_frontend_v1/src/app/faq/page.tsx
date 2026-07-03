import type { Metadata } from "next";
import { Faq } from "@/components/home/faq";

export const metadata: Metadata = {
  title: "Questions About Crafted Sprays? Start Here.",
  description:
    "Find answers about personalised fragrance recommendations, ordering, delivery, returns, recommendations and everything else you might want to know.",
  alternates: {
    canonical: "/faq",
  },
};

export default function FaqPage() {
  return (
    <div className="flex flex-col">
      <Faq />
    </div>
  );
}
