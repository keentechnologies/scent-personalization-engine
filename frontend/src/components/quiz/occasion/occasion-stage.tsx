

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

  const [validationError, setValidationError] =
    useState("");

  const [answers, setAnswers] =
    useState<OccasionState>(initialState);

  const handleToggle = (key: string) => {
    setAnswers((prev) => ({
      ...prev,

      [key]: !prev[key],
    }));
  };

  const selectedCount =
    Object.values(answers).filter(Boolean)
      .length;

  const handleSubmit = async () => {
    if (selectedCount < 1) {
      setValidationError(
        "Please select at least one occasion.",
      );

      return;
    }

    try {
      setLoading(true);

      setValidationError("");

      const sessionId =
        localStorage.getItem("session_id");

      if (!sessionId) {
        throw new Error("Session not found");
      }

      const payload = {
        session_id: sessionId,

        ...answers,
      };

      const response =
        await submitOccasionStage(payload);

      console.log(
        "OCCASION STAGE SUBMITTED",
        response,
      );

      router.push("/quiz/climate");

    } catch (error) {

      console.log(
        "FAILED TO SUBMIT OCCASION",
        error,
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    const fetchOccasionStage = async () => {
      try {

        const sessionId =
          localStorage.getItem("session_id");

        if (!sessionId) {
          return;
        }

        const response =
          await getOccasionStage(sessionId);

        console.log(
          "OCCASION RESTORE",
          response,
        );

        const restoredAnswers: OccasionState =
          { ...initialState };

        occasionOptions.forEach((item) => {
          restoredAnswers[item.key] =
            response[item.key];
        });

        setAnswers(restoredAnswers);

      } catch (error) {

        console.log(
          "NO EXISTING OCCASION DATA",
          error,
        );

      }
    };

    fetchOccasionStage();
  }, []);

  return (
    <div className="flex-1 flex flex-col px-6 py-6 md:py-8 bg-transparent">
      {/* ── Heading ── */}
      <div className="space-y-2">
        <h1 className="font-serif text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] text-obsidian">
          Occasion Preferences
        </h1>
        <p className="text-[14px] text-text-muted leading-relaxed">
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
            className={`rounded-full px-5 py-2.5 text-[14px] font-semibold border-2 transition-all duration-200 cursor-pointer active:scale-[0.96] ${
              answers[item.key]
                ? "border-obsidian bg-obsidian text-cream shadow-sm"
                : "border-border bg-white text-obsidian md:hover:bg-ivory/50 md:hover:border-border-strong"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* ── Selection Count and Error Info ── */}
      <div className="mt-6">
        <p className="text-[13px] font-semibold uppercase tracking-wider text-text-muted">
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
          className="group relative flex h-[52px] w-full items-center justify-center overflow-hidden rounded-2xl bg-obsidian text-[15px] font-semibold tracking-wide text-cream transition-all duration-200 active:scale-[0.98] disabled:opacity-35 disabled:active:scale-100 cursor-pointer md:hover:shadow-lg md:hover:-translate-y-[1px]"
        >
          <span className="relative z-10">
            {loading ? "Submitting..." : "Continue"}
          </span>
          <span className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </button>

        <button
          type="button"
          onClick={() => router.push("/quiz/personality")}
          className="mt-3 flex h-[52px] w-full items-center justify-center rounded-2xl border-2 border-obsidian bg-transparent text-[15px] font-semibold tracking-wide text-obsidian transition-all duration-200 active:scale-[0.98] cursor-pointer md:hover:bg-obsidian/5"
        >
          Back
        </button>
      </div>
    </div>
  );
}