"use client";

import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { checkFreeDelivery } from "@/services/api/pincode";
import ProcessingModal from "@/components/modals/processing-modal";
import { generateRecommendations } from "@/services/api/recommendation";

export default function ClimateStage() {
  const router = useRouter();
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [freeDelivery, setFreeDelivery] = useState(false);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  const processingMessages = [
    "Analyzing your fragrance profile...",
    "Understanding your scent personality...",
    "Matching environmental compatibility...",
    "Building your personalized recommendations...",
  ];

  const handleCheckAvailability = async () => {
    try {
      setLoading(true);
      setError("");
      setChecked(false);

      if (pincode.length !== 6) {
        setError("Please enter a valid 6 digit pincode.");
        return;
      }

      const response = await checkFreeDelivery({ pincode });
      console.log("FREE DELIVERY RESPONSE", response);
      setFreeDelivery(response.free_delivery);
      setChecked(true);
      setShowDeliveryModal(true);
    } catch (error) {
      console.log("FAILED TO CHECK DELIVERY", error);
      setError("Unable to check delivery availability.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!processing) {
      return;
    }

    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % processingMessages.length);
    }, 2200);

    return () => clearInterval(interval);
  }, [processing]);

  const handleContinue = async () => {
    try {
      setProcessing(true);
      const sessionId = localStorage.getItem("session_id");
      console.log("-------", sessionId);

      if (!sessionId) {
        throw new Error("Session not found");
      }

      const payload = {
        session_id: sessionId,
        pincode: pincode
      };

      const response = await generateRecommendations(payload);
      console.log("Recommendations generated successfully", response);

      // Redirect to recommendation page after successful generation
      router.push("/recommendation");
    } catch (error) {
      console.log("FAILED TO GENERATE RECOMMENDATIONS", error);
      setProcessing(false);
    }
  };


  return (
    <>
      <ProcessingModal
        isOpen={processing}
        message={processingMessages[messageIndex]}
      />

      <AnimatePresence>
        {showDeliveryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDeliveryModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-sm rounded-[32px] bg-[#1d1a17]/95 border border-border p-6 shadow-[0_24px_50px_rgba(0,0,0,0.6)] text-center space-y-5 overflow-hidden"
            >
              {/* Ambient card glow */}
              <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[radial-gradient(circle,rgba(196,130,58,0.12)_0%,transparent_70%)] pointer-events-none" />

              {freeDelivery ? (
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#c4823a]/15 text-gold border border-gold/20 relative z-10">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              ) : (
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#c4823a]/15 text-gold border border-gold/20 relative z-10">
                  <span className="text-xl font-bold font-serif tracking-tight">₹100</span>
                </div>
              )}

              <div className="space-y-2 relative z-10">
                <h2 className="heading-serif text-2xl font-bold text-[#f3efe8] tracking-tight">
                  {freeDelivery ? "Complimentary Shipping" : "₹100 Off Your Delivery!"}
                </h2>
                <p className="text-[14px] text-text-secondary leading-relaxed">
                  {freeDelivery
                    ? "Congratulations! Your location qualifies for free delivery. We will ship your personalized fragrance at no extra cost."
                    : "Great news! Since shipping to your location is over ₹100, we have applied a flat discount of ₹100 off on your delivery charges."}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowDeliveryModal(false)}
                className="btn-gold h-[52px] w-full rounded-2xl text-[15px] font-semibold tracking-wide relative z-10"
              >
                Proceed
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col px-6 py-6 md:py-8 bg-transparent">
        {/* ── Heading ── */}
        <div className="space-y-2">
          <h1 className="heading-serif text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] text-[#f3efe8]">
            Delivery Availability
          </h1>
          <p className="text-[14px] text-text-secondary leading-relaxed">
            Please enter your pincode to check eligibility for free delivery.
          </p>
        </div>

        {/* ── Input & Check Action ── */}
        <div className="mt-8 space-y-4 flex-1">
          <input
            type="text"
            value={pincode}
            onChange={(event) => setPincode(event.target.value)}
            placeholder="Enter pincode"
            maxLength={6}
            className="h-[52px] w-full rounded-2xl border border-border bg-[#1d1a17]/60 backdrop-blur-md px-4 outline-none text-[16px] font-semibold text-[#f3efe8] transition-all duration-300 focus:border-gold focus:shadow-[0_0_0_4px_rgba(196,130,58,0.15)] placeholder:text-[#b8aea1]/30"
          />

          <button
            onClick={handleCheckAvailability}
            disabled={loading}
            className="btn-outline h-[52px] w-full rounded-2xl text-[15px] font-semibold tracking-wide border-[#332d28]"
          >
            {loading ? "Checking..." : "Check availability"}
          </button>

          {checked && (
            <div className="rounded-2xl border border-border bg-[#24201d]/60 backdrop-blur-md p-4 shadow-sm">
              <p className="text-[14px] font-semibold text-gold">
                {freeDelivery
                  ? "✓ Free delivery available for your location"
                  : "✓ Flat ₹100 discount applied to delivery charges"}
              </p>
            </div>
          )}

          {error && <p className="text-sm text-error font-medium">{error}</p>}
        </div>

        {/* ── Continue & Back Buttons ── */}
        <div className="mt-8 pt-4">
          <button
            onClick={handleContinue}
            disabled={!checked}
            className="group btn-gold relative h-[52px] w-full overflow-hidden rounded-2xl text-[15px] font-semibold tracking-wide active:scale-[0.98] disabled:active:scale-100"
          >
            <span className="relative z-10">
              Continue
            </span>
            <span className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/[0.15] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>

          <button
            type="button"
            onClick={() => router.push("/quiz/occasion")}
            className="btn-outline mt-3 h-[52px] w-full rounded-2xl text-[15px] font-semibold tracking-wide"
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
}
