"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import {
  submitSensitivityStage,
  getSensitivityStage,
} from "@/services/api/sensitivity";

const questions = [
  {
    key: "has_migraine_issues",
    question: "Do you frequently experience migraine attacks?",
  },

  {
    key: "has_respiratory_issues",
    question: "Do you have respiratory conditions such as asthma?",
  },

  {
    key: "has_skin_sensitivity",
    question: "Do you have sensitive skin or irritation from fragrances?",
  },

  {
    key: "has_body_odour_concern",
    question: "Are you concerned fragrances may worsen body odour?",
  },

  {
    key: "has_strong_smell_discomfort",
    question: "Do you find strong fragrances uncomfortable?",
  },
];

type SensitivityState = {
  has_migraine_issues: boolean | null;

  has_respiratory_issues: boolean | null;

  has_skin_sensitivity: boolean | null;

  has_body_odour_concern: boolean | null;

  has_strong_smell_discomfort: boolean | null;
};

export default function SensitivityStage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [answers, setAnswers] = useState<SensitivityState>({
    has_migraine_issues: null,

    has_respiratory_issues: null,

    has_skin_sensitivity: null,

    has_body_odour_concern: null,

    has_strong_smell_discomfort: null,
  });

  const handleSelect = (key: keyof SensitivityState, value: boolean) => {
    setAnswers((prev) => ({
      ...prev,

      [key]: value,
    }));
  };

  const allAnswered = Object.values(answers).every((value) => value !== null);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const sessionId = localStorage.getItem("session_id");

      console.log("-------", sessionId);

      if (!sessionId) {
        throw new Error("Session not found");
      }

      const payload = {
        session_id: sessionId,

        has_migraine_issues: answers.has_migraine_issues as boolean,

        has_respiratory_issues: answers.has_respiratory_issues as boolean,

        has_skin_sensitivity: answers.has_skin_sensitivity as boolean,

        has_body_odour_concern: answers.has_body_odour_concern as boolean,

        has_strong_smell_discomfort:
          answers.has_strong_smell_discomfort as boolean,
      };

      const response = await submitSensitivityStage(payload);

      console.log("SENSITIVITY STAGE SUBMITTED", response);

      router.push("/quiz/gender");
    } catch (error) {
      console.log("FAILED TO SUBMIT SENSITIVITY", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSensitivityStage = async () => {
      try {
        const sessionId = localStorage.getItem("session_id");

        if (!sessionId) {
          return;
        }

        const response = await getSensitivityStage(sessionId);

        console.log("SENSITIVITY RESTORE", response);

        setAnswers({
          has_migraine_issues: response.has_migraine_issues,

          has_respiratory_issues: response.has_respiratory_issues,

          has_skin_sensitivity: response.has_skin_sensitivity,

          has_body_odour_concern: response.has_body_odour_concern,

          has_strong_smell_discomfort: response.has_strong_smell_discomfort,
        });
      } catch (error) {
        console.log("NO EXISTING SENSITIVITY DATA", error);
      }
    };

    fetchSensitivityStage();
  }, []);

  return (
    <div className="flex-1 flex flex-col px-6 py-6 md:py-8 bg-transparent">
      {/* ── Heading ── */}
      <div className="space-y-2">
        <h1 className="font-serif text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] text-obsidian">
          Sensitivity Screening
        </h1>
        <p className="text-[14px] text-text-muted leading-relaxed">
          Answer the following questions to help us understand your fragrance tolerance.
        </p>
      </div>

      {/* ── Questions List ── */}
      <div className="mt-8 space-y-6 flex-1">
        {questions.map((item) => (
          <div key={item.key} className="space-y-2.5">
            <p className="text-[15px] font-medium text-obsidian">{item.question}</p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() =>
                  handleSelect(item.key as keyof SensitivityState, true)
                }
                className={`h-[52px] flex-1 rounded-2xl border-2 text-[15px] font-semibold transition-all duration-200 cursor-pointer active:scale-[0.98] ${
                  answers[item.key as keyof SensitivityState] === true
                    ? "border-obsidian bg-obsidian text-cream"
                    : "border-border bg-white text-obsidian md:hover:bg-ivory/50 md:hover:border-border-strong"
                }`}
              >
                Yes
              </button>

              <button
                type="button"
                onClick={() =>
                  handleSelect(item.key as keyof SensitivityState, false)
                }
                className={`h-[52px] flex-1 rounded-2xl border-2 text-[15px] font-semibold transition-all duration-200 cursor-pointer active:scale-[0.98] ${
                  answers[item.key as keyof SensitivityState] === false
                    ? "border-obsidian bg-obsidian text-cream"
                    : "border-border bg-white text-obsidian md:hover:bg-ivory/50 md:hover:border-border-strong"
                }`}
              >
                No
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Continue & Back Buttons ── */}
      <div className="mt-8 pt-4">
        <button
          onClick={handleSubmit}
          disabled={!allAnswered || loading}
          className="group relative flex h-[52px] w-full items-center justify-center overflow-hidden rounded-2xl bg-obsidian text-[15px] font-semibold tracking-wide text-cream transition-all duration-200 active:scale-[0.98] disabled:opacity-35 disabled:active:scale-100 cursor-pointer md:hover:shadow-lg md:hover:-translate-y-[1px]"
        >
          <span className="relative z-10">
            {loading ? "Submitting..." : "Continue"}
          </span>
          <span className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </button>

        <button
          type="button"
          onClick={() => router.push("/login")}
          className="mt-3 flex h-[52px] w-full items-center justify-center rounded-2xl border-2 border-obsidian bg-transparent text-[15px] font-semibold tracking-wide text-obsidian transition-all duration-200 active:scale-[0.98] cursor-pointer md:hover:bg-obsidian/5"
        >
          Back
        </button>
      </div>
    </div>
  );
}
