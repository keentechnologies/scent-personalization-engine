

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

  const [showConfirmationModal, setShowConfirmationModal] =
    useState(false);

  const [answers, setAnswers] = useState<GenderState>({
    masculine_score: 0.5,

    feminine_score: 0.5,

    unisex_score: 0.5,
  });

  const handleSelect = (
    key: keyof GenderState,
    value: number,
  ) => {
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

      const sessionId =
        localStorage.getItem("session_id");

      if (!sessionId) {
        throw new Error("Session not found");
      }

      const payload = {
        session_id: sessionId,

        masculine_score:
          answers.masculine_score,

        feminine_score:
          answers.feminine_score,

        unisex_score:
          answers.unisex_score,
      };

      const response =
        await submitGenderStage(payload);

      console.log(
        "GENDER STAGE SUBMITTED",
        response,
      );

      router.push("/quiz/perception");

    } catch (error) {

      console.log(
        "FAILED TO SUBMIT GENDER",
        error,
      );

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

        const sessionId =
          localStorage.getItem("session_id");

        if (!sessionId) {
          return;
        }

        const response =
          await getGenderStage(sessionId);

        console.log(
          "GENDER RESTORE",
          response,
        );

        setAnswers({
          masculine_score:
            response.masculine_score,

          feminine_score:
            response.feminine_score,

          unisex_score:
            response.unisex_score,
        });

      } catch (error) {

        console.log(
          "NO EXISTING GENDER DATA",
          error,
        );

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

      <main className="min-h-screen bg-white">

        <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-6">

          <div className="space-y-2">

            <h1 className="text-3xl font-semibold">
              Gender Preference
            </h1>

            <p className="text-sm text-neutral-500">
              Select your fragrance direction preferences.
            </p>

          </div>

          <div className="mt-10 space-y-6">

            {questions.map((item) => (
              <div
                key={item.key}
                className="space-y-3"
              >

                <p className="text-base font-medium">
                  {item.question}
                </p>

                <div className="grid grid-cols-3 gap-3">

                  {options.map((option) => (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() =>
                        handleSelect(
                          item.key as keyof GenderState,
                          option.value,
                        )
                      }
                      className={`rounded-2xl border px-4 py-3 text-sm ${
                        answers[
                          item.key as keyof GenderState
                        ] === option.value
                          ? "border-black bg-black text-white"
                          : "border-neutral-300"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}

                </div>

              </div>
            ))}

          </div>

          <div className="mt-auto pt-10">

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="h-14 w-full rounded-2xl bg-black text-white disabled:opacity-40"
            >
              {loading ? "Submitting..." : "Continue"}
            </button>

          </div>

        </div>

      </main>

    </>
  );
}