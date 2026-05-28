"use client";

import { useState, useEffect } from "react";

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

      // later:
      // router.push("/quiz/gender");
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
    <main className="min-h-screen bg-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">Sensitivity Screening</h1>

          <p className="text-sm text-neutral-500">
            Answer the following questions.
          </p>
        </div>

        <div className="mt-10 space-y-6">
          {questions.map((item) => (
            <div key={item.key} className="space-y-3">
              <p className="text-base font-medium">{item.question}</p>

              <div className="flex gap-3">
                <button
                  onClick={() =>
                    handleSelect(item.key as keyof SensitivityState, true)
                  }
                  className={`flex-1 rounded-2xl border px-4 py-3 ${
                    answers[item.key as keyof SensitivityState] === true
                      ? "border-black bg-black text-white"
                      : "border-neutral-300"
                  } `}
                >
                  Yes
                </button>

                <button
                  onClick={() =>
                    handleSelect(item.key as keyof SensitivityState, false)
                  }
                  className={`flex-1 rounded-2xl border px-4 py-3 ${
                    answers[item.key as keyof SensitivityState] === false
                      ? "border-black bg-black text-white"
                      : "border-neutral-300"
                  } `}
                >
                  No
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-10">
          <button
            onClick={handleSubmit}
            disabled={!allAnswered || loading}
            className="h-14 w-full rounded-2xl bg-black text-white disabled:opacity-40"
          >
            {loading ? "Submitting..." : "Continue"}
          </button>
        </div>
      </div>
    </main>
  );
}
