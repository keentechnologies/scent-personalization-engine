"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  submitGenderStage,
  getGenderStage,
} from "@/services/api/gender";
import GenderConfirmationModal from "./gender-confirmation-modal";

const questions = [
  {
    key: "masculine_score",
    question: "Masculine preference",
  },
  {
    key: "feminine_score",
    question: "Feminine preference",
  },
  {
    key: "unisex_score",
    question: "Unisex preference",
  },
];

const options = [
  {
    label: "Yes",
    value: 1,
  },
  {
    label: "I do not mind",
    value: 0.5,
  },
  {
    label: "No",
    value: 0,
  },
];

type GenderState = {
  masculine_score: number;
  feminine_score: number;
  unisex_score: number;
};

export default function GenderStage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [answers, setAnswers] = useState<GenderState>({
    masculine_score: 0.5,
    feminine_score: 0.5,
    unisex_score: 0.5,
  });

  const handleSelect = (key: keyof GenderState, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const shouldShowConfirmation =
    answers.masculine_score === 0.5 &&
    answers.feminine_score === 0.5 &&
    answers.unisex_score === 0.5;

  const submitGender = async () => {
    try {
      setLoading(true);
      const sessionId = localStorage.getItem("session_id");

      if (!sessionId) {
        throw new Error("Session not found");
      }

      const payload = {
        session_id: sessionId,
        masculine_score: answers.masculine_score,
        feminine_score: answers.feminine_score,
        unisex_score: answers.unisex_score,
      };

      const response = await submitGenderStage(payload);
      console.log("GENDER STAGE SUBMITTED", response);
      router.push("/quiz/perception");
    } catch (error) {
      console.log("FAILED TO SUBMIT GENDER", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (shouldShowConfirmation) {
      setShowConfirmationModal(true);
      return;
    }

    await submitGender();
  };

  const handleConfirmationContinue = async () => {
    setShowConfirmationModal(false);
    await submitGender();
  };

  const handleConfirmationCancel = () => {
    setShowConfirmationModal(false);
  };

  useEffect(() => {
    const fetchGenderStage = async () => {
      try {
        const sessionId = localStorage.getItem("session_id");
        if (!sessionId) {
          return;
        }

        const response = await getGenderStage(sessionId);
        console.log("GENDER RESTORE", response);

        setAnswers({
          masculine_score: response.masculine_score,
          feminine_score: response.feminine_score,
          unisex_score: response.unisex_score,
        });
      } catch (error) {
        console.log("NO EXISTING GENDER DATA", error);
      }
    };

    fetchGenderStage();
  }, []);

  return (
    <>
      <GenderConfirmationModal
        isOpen={showConfirmationModal}
        onConfirm={handleConfirmationContinue}
        onCancel={handleConfirmationCancel}
      />

      <div className="flex-1 flex flex-col px-6 py-6 md:py-8 bg-transparent">
        {/* ── Heading ── */}
        <div className="space-y-2">
          <h1 className="heading-serif text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] text-[#f3efe8]">
            Gender Preference
          </h1>
          <p className="text-[14px] text-text-secondary leading-relaxed">
            Select your fragrance direction preferences.
          </p>
        </div>

        {/* ── Questions List ── */}
        <div className="mt-8 space-y-6 flex-1">
          {questions.map((item) => (
            <div key={item.key} className="space-y-2.5">
              <p className="text-[15px] font-medium text-[#f3efe8]">{item.question}</p>

              <div className="grid grid-cols-3 gap-3">
                {options.map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => handleSelect(item.key as keyof GenderState, option.value)}
                    className={`h-[52px] rounded-2xl border text-[14px] font-semibold transition-all duration-250 cursor-pointer active:scale-[0.98] ${
                      answers[item.key as keyof GenderState] === option.value
                        ? "border-gold bg-[#c4823a] text-[#1a1410] shadow-[0_4px_20px_rgba(196,130,58,0.2)]"
                        : "border-border bg-[#1d1a17]/50 text-text-secondary hover:border-gold/60 hover:bg-[#24201d]/60"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
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
            onClick={() => router.push("/quiz/sensitivity")}
            className="btn-outline mt-3 h-[52px] w-full rounded-2xl text-[15px] font-semibold tracking-wide"
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
}