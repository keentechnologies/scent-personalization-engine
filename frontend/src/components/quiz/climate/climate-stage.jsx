"use client";

import { useState } from "react";
import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { checkFreeDelivery } from "@/services/api/pincode";
import ProcessingModal from "@/components/modals/processing-modal";

export default function ClimateStage() {
  const router = useRouter();

  const [pincode, setPincode] = useState("");

  const [loading, setLoading] = useState(false);

  const [checked, setChecked] = useState(false);

  const [freeDelivery, setFreeDelivery] = useState(false);

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

      // const response =
      //   await generateRecommendations();

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
      <main className="min-h-screen bg-white">
        <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold">Delivery Availability</h1>

            <p className="text-sm leading-6 text-neutral-500">
              Please enter your pincode to check eligibility for free delivery.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            <input
              type="text"
              value={pincode}
              onChange={(event) => setPincode(event.target.value)}
              placeholder="Enter pincode"
              className="h-14 w-full rounded-2xl border border-neutral-300 px-4 outline-none"
            />

            <button
              onClick={handleCheckAvailability}
              disabled={loading}
              className="h-14 w-full rounded-2xl border border-black bg-black text-white disabled:opacity-40"
            >
              {loading ? "Checking..." : "Check availability"}
            </button>

            {checked && (
              <div className="rounded-2xl border border-neutral-200 p-4">
                <p className="text-sm font-medium">
                  {freeDelivery
                    ? "Free delivery available"
                    : "Delivery charges apply"}
                </p>
              </div>
            )}

            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>

          <div className="mt-auto pt-10">
            <button
              onClick={handleContinue}
              disabled={!checked}
              className="h-14 w-full rounded-2xl bg-black text-white disabled:opacity-40"
            >
              Continue
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
