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
        <h1 className="heading-serif text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] text-[#f3efe8]">
          Sensitivity Screening
        </h1>
        <p className="text-[14px] text-text-secondary leading-relaxed">
          Answer the following questions to help us understand your fragrance tolerance.
        </p>
      </div>

      {/* ── Questions List ── */}
      <div className="mt-8 space-y-6 flex-1">
        {questions.map((item) => (
          <div key={item.key} className="space-y-2.5">
            <p className="text-[15px] font-medium text-[#f3efe8]">{item.question}</p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() =>
                  handleSelect(item.key as keyof SensitivityState, true)
                }
                className={`h-[52px] flex-1 rounded-2xl border text-[15px] font-semibold transition-all duration-250 cursor-pointer active:scale-[0.98] ${
                  answers[item.key as keyof SensitivityState] === true
                    ? "border-gold bg-[#c4823a] text-[#1a1410] shadow-[0_4px_20px_rgba(196,130,58,0.2)]"
                    : "border-border bg-[#1d1a17]/50 text-text-secondary hover:border-gold/60 hover:bg-[#24201d]/60"
                }`}
              >
                Yes
              </button>

              <button
                type="button"
                onClick={() =>
                  handleSelect(item.key as keyof SensitivityState, false)
                }
                className={`h-[52px] flex-1 rounded-2xl border text-[15px] font-semibold transition-all duration-250 cursor-pointer active:scale-[0.98] ${
                  answers[item.key as keyof SensitivityState] === false
                    ? "border-gold bg-[#c4823a] text-[#1a1410] shadow-[0_4px_20px_rgba(196,130,58,0.2)]"
                    : "border-border bg-[#1d1a17]/50 text-text-secondary hover:border-gold/60 hover:bg-[#24201d]/60"
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
          className="group btn-gold relative h-[52px] w-full overflow-hidden rounded-2xl text-[15px] font-semibold tracking-wide active:scale-[0.98] disabled:active:scale-100"
        >
          <span className="relative z-10">
            {loading ? "Submitting..." : "Continue"}
          </span>
          <span className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/[0.15] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </button>

        <button
          type="button"
          onClick={() => router.push("/login")}
          className="btn-outline mt-3 h-[52px] w-full rounded-2xl text-[15px] font-semibold tracking-wide"
        >
          Back
        </button>
      </div>
    </div>
  );
}
