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

      const response = await checkFreeDelivery({
        pincode,
      });

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
      }

      const response = await generateRecommendations(payload);

      console.log("climate profile saved in db", response);


      await new Promise((resolve) => setTimeout(resolve, 1000000));

      // router.push("/results");
    } catch (error) {
      console.log("FAILED TO GENERATE RECOMMENDATIONS", error);
    } finally {
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
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-sm rounded-3xl bg-cream border border-border p-6 shadow-xl text-center space-y-5"
            >
              {freeDelivery ? (
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sand/20 text-sand-dark">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              ) : (
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sand/20 text-sand-dark">
                  <span className="text-xl font-bold font-serif tracking-tight">₹100</span>
                </div>
              )}

              <div className="space-y-2">
                <h2 className="font-serif text-2xl font-bold text-obsidian tracking-tight">
                  {freeDelivery ? "Complimentary Shipping" : "₹100 Off Your Delivery!"}
                </h2>
                <p className="text-[14px] text-text-muted leading-relaxed">
                  {freeDelivery
                    ? "Congratulations! Your location qualifies for free delivery. We will ship your personalized fragrance at no extra cost."
                    : "Great news! Since shipping to your location is over ₹100, we have applied a flat discount of ₹100 off on your delivery charges."}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowDeliveryModal(false)}
                className="h-[52px] w-full rounded-2xl bg-obsidian text-[15px] font-semibold tracking-wide text-cream transition-all duration-200 active:scale-[0.98] cursor-pointer"
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
          <h1 className="font-serif text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] text-obsidian">
            Delivery Availability
          </h1>
          <p className="text-[14px] text-text-muted leading-relaxed">
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
            className="h-[52px] w-full rounded-2xl border-2 border-border bg-white px-4 outline-none text-[16px] font-semibold text-obsidian transition-all duration-200 focus:border-sand focus:shadow-[0_0_0_4px_rgba(214,199,178,0.15)]"
          />

          <button
            onClick={handleCheckAvailability}
            disabled={loading}
            className="h-[52px] w-full rounded-2xl border-2 border-obsidian bg-obsidian text-[15px] font-semibold tracking-wide text-cream transition-all duration-200 cursor-pointer active:scale-[0.98] disabled:opacity-35 disabled:active:scale-100"
          >
            {loading ? "Checking..." : "Check availability"}
          </button>

          {checked && (
            <div className="rounded-2xl border-2 border-border bg-white p-4 shadow-sm">
              <p className="text-[14px] font-bold text-obsidian">
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
            className="group relative flex h-[52px] w-full items-center justify-center overflow-hidden rounded-2xl bg-obsidian text-[15px] font-semibold tracking-wide text-cream transition-all duration-200 active:scale-[0.98] disabled:opacity-35 disabled:active:scale-100 cursor-pointer md:hover:shadow-lg md:hover:-translate-y-[1px]"
          >
            <span className="relative z-10">
              Continue
            </span>
            <span className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>

          <button
            type="button"
            onClick={() => router.push("/quiz/occasion")}
            className="mt-3 flex h-[52px] w-full items-center justify-center rounded-2xl border-2 border-obsidian bg-transparent text-[15px] font-semibold tracking-wide text-obsidian transition-all duration-200 active:scale-[0.98] cursor-pointer md:hover:bg-obsidian/5"
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
}
