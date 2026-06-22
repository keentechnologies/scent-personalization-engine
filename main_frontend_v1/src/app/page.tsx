import { Hero } from "@/components/home/hero";
import { WhyUs } from "@/components/home/why-us";
import { HowItWorks } from "@/components/home/how-it-works";
import { Pricing } from "@/components/home/pricing";
import { Faq } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyUs />
      <HowItWorks />
      <Pricing />
      <Faq />
      <FinalCta />
    </>
  );
}
