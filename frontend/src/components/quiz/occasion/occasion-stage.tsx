"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { occasionOptions } from "@/constants/occasion-options";
import {
  submitOccasionStage,
  getOccasionStage,
} from "@/services/api/occasion";

type OccasionState = Record<string, boolean>;

const initialState: OccasionState =
  occasionOptions.reduce((accumulator, item) => {
    accumulator[item.key] = false;
    return accumulator;
  }, {} as OccasionState);

export default function OccasionStage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [answers, setAnswers] = useState<OccasionState>(initialState);

  const handleToggle = (key: string) => {
    setAnswers((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const selectedCount = Object.values(answers).filter(Boolean).length;

  const handleSubmit = async () => {
    if (selectedCount < 1) {
      setValidationError("Please select at least one occasion.");
      return;
    }

    try {
      setLoading(true);
      setValidationError("");
      const sessionId = localStorage.getItem("session_id");

      if (!sessionId) {
        throw new Error("Session not found");
      }

      const payload = {
        session_id: sessionId,
        ...answers,
      };

      const response = await submitOccasionStage(payload);
      console.log("OCCASION STAGE SUBMITTED", response);
      router.push("/quiz/climate");
    } catch (error) {
      console.log("FAILED TO SUBMIT OCCASION", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchOccasionStage = async () => {
      try {
        const sessionId = localStorage.getItem("session_id");
        if (!sessionId) {
          return;
        }

        const response = await getOccasionStage(sessionId);
        console.log("OCCASION RESTORE", response);

        const restoredAnswers: OccasionState = { ...initialState };
        occasionOptions.forEach((item) => {
          restoredAnswers[item.key] = response[item.key];
        });

        setAnswers(restoredAnswers);
      } catch (error) {
        console.log("NO EXISTING OCCASION DATA", error);
      }
    };

    fetchOccasionStage();
  }, []);

  return (
    <div className="flex-1 flex flex-col px-6 py-6 md:py-8 bg-transparent">
      {/* ── Heading ── */}
      <div className="space-y-2">
        <h1 className="heading-serif text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] text-[#f3efe8]">
          Occasion Preferences
        </h1>
        <p className="text-[14px] text-text-secondary leading-relaxed">
          Select the occasions where you would like your fragrance recommendations to perform well.
        </p>
      </div>

      {/* ── Occasions Cloud ── */}
      <div className="mt-8 flex flex-wrap gap-2.5 flex-1 content-start">
        {occasionOptions.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => handleToggle(item.key)}
            className={`rounded-full px-5 py-2.5 text-[14px] font-semibold border transition-all duration-250 cursor-pointer active:scale-[0.96] ${
              answers[item.key]
                ? "border-gold bg-[#c4823a] text-[#1a1410] shadow-[0_4px_15px_rgba(196,130,58,0.2)]"
                : "border-border bg-[#1d1a17]/50 text-text-secondary hover:border-gold/60 hover:bg-[#24201d]/60"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* ── Selection Count and Error Info ── */}
      <div className="mt-6">
        <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-text-secondary">
          {selectedCount} Selected (Min 1)
        </p>

        {validationError && (
          <p className="mt-2 text-sm text-error font-medium">
            {validationError}
          </p>
        )}
      </div>

      {/* ── Continue & Back Buttons ── */}
      <div className="mt-8 pt-4">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="group btn-gold relative h-[52px] w-full overflow-hidden rounded-2xl text-[15px] font-semibold tracking-wide active:scale-[0.98] disabled:active:scale-100"
        >
          <span className="relative z-10">
            {loading ? "Submitting..." : "Continue"}
          </span>
          <span className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/[0.15] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </button>

        <button
          type="button"
          onClick={() => router.push("/quiz/personality")}
          className="btn-outline mt-3 h-[52px] w-full rounded-2xl text-[15px] font-semibold tracking-wide"
        >
          Back
        </button>
      </div>
    </div>
  );
}