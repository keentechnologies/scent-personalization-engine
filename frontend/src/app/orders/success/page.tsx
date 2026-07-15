"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, Sparkles, Calendar, MapPin, Gift } from "lucide-react";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id") || "N/A";

  // Calculate estimated delivery date (4 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 4);
  const formattedDelivery = deliveryDate.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-[#151311] text-[#f3efe8] font-sans flex items-center justify-center p-6 relative grain-overlay overflow-hidden">
      {/* Visual lighting background effects */}
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(196,130,58,0.06)_0%,transparent_75%)] pointer-events-none" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(196,130,58,0.04)_0%,transparent_75%)] pointer-events-none" />

      {/* Main card */}
      <div className="max-w-[480px] w-full text-center space-y-8 relative z-10 card-glow p-8 md:p-10 border border-[#332d28]/60 bg-[#1d1a17]/45 rounded-[36px] shadow-2xl flex flex-col items-center">
        {/* Animated Check circle */}
        <div className="w-16 h-16 bg-[#c4823a]/12 border border-[#c4823a]/30 rounded-full flex items-center justify-center text-[#c4823a] shadow-inner mb-2 animate-bounce">
          <CheckCircle2 className="w-9 h-9 stroke-[1.5px]" />
        </div>

        {/* Header Titles */}
        <div className="space-y-2">
          <span className="eyebrow text-[10px] bg-[#c4823a]/10 border border-[#c4823a]/20 rounded-md px-2.5 py-0.5 font-bold tracking-widest uppercase text-[#c4823a]">
            Order Confirmed
          </span>
          <h1 className="heading-serif text-3xl font-extrabold tracking-tight">
            Crafting Begun!
          </h1>
          <p className="text-[13.5px] text-[#b8aea1] leading-relaxed max-w-sm mx-auto">
            Your custom botanical fragrance is being compounded. We mix each batch fresh upon order validation.
          </p>
        </div>

        {/* Details section */}
        <div className="w-full space-y-4 pt-4 border-t border-[#332d28]/35 text-left">
          {/* Order ID */}
          <div className="flex gap-3 items-start">
            <Gift className="w-4.5 h-4.5 text-[#c4823a] mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-[10px] text-[#6b6057] font-bold uppercase tracking-wider">
                Order ID
              </span>
              <p className="text-[13px] text-[#f3efe8] font-mono select-all truncate max-w-[280px]">
                {orderId}
              </p>
            </div>
          </div>

          {/* Delivery Date */}
          <div className="flex gap-3 items-start">
            <Calendar className="w-4.5 h-4.5 text-[#c4823a] mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-[10px] text-[#6b6057] font-bold uppercase tracking-wider">
                Estimated Delivery
              </span>
              <p className="text-[13px] text-[#f3efe8] font-semibold">
                {formattedDelivery}
              </p>
            </div>
          </div>

          {/* Logistics Note */}
          <div className="flex gap-3 items-start">
            <MapPin className="w-4.5 h-4.5 text-[#c4823a] mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-[10px] text-[#6b6057] font-bold uppercase tracking-wider">
                Delivery Method
              </span>
              <p className="text-[13px] text-[#b8aea1]">
                Express courier delivery directly to your doorstep.
              </p>
            </div>
          </div>
        </div>

        {/* Philosophy Badge */}
        <div className="w-full bg-[#151311]/55 border border-[#332d28]/30 rounded-2xl p-4 flex items-start gap-3 text-left">
          <Sparkles className="w-5 h-5 text-[#c4823a] flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h4 className="text-[12.5px] font-bold text-[#f3efe8]">Compounded Fresh</h4>
            <p className="text-[11px] text-[#b8aea1] leading-normal">
              To preserve scent integrity, base components are hand-poured only after checkout verification.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full flex flex-col gap-3 pt-2">
          <button
            onClick={() => router.push("/")}
            className="btn-gold w-full h-[50px] rounded-xl text-[14px] font-bold tracking-wide transition-all active:scale-[0.98] shadow-md"
          >
            Start New Scent Quiz
          </button>
          <button
            onClick={() => router.push("/shipping")}
            className="btn-outline w-full h-[50px] rounded-xl text-[13.5px] font-medium tracking-wide transition-all active:scale-[0.98]"
          >
            Go Back
          </button>
        </div>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#151311] gap-4">
          <div className="w-12 h-12 border-2 border-[#332d28] border-t-[#c4823a] rounded-full animate-spin" />
          <p className="text-[#b8aea1] font-medium tracking-wide">Loading confirmation details...</p>
        </div>
      }
    >
      <Suspense fallback={<div>Loading...</div>}>
        <SuccessContent />
      </Suspense>
    </Suspense>
  );
}
