

"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import {
  submitPersonalityStage,
  getPersonalityStage,
} from "@/services/api/personality";

import PersonalityConfirmationModal from "./personality-confirmation-modal";

const personalities = [
  {
    key: "pr_1",

    title: "The Minimalist Professional",

    description:
      "You like to keep things simple, clean, and put-together. You prefer not to stand out too much but always come across as sharp and well-groomed.",
  },

  {
    key: "pr_2",

    title: "The Power Player",

    description:
      "You enjoy making an impact wherever you go. You naturally carry confidence and like being noticed for your strong and commanding presence.",
  },

  {
    key: "pr_3",

    title: "The Romantic Charmer",

    description:
      "You are warm, expressive, and enjoy meaningful connections. You like leaving a soft, memorable impression that feels inviting and attractive.",
  },

  {
    key: "pr_4",

    title: "The Playful Energiser",

    description:
      "You are lively, fun, and bring energy into every room. You enjoy feeling fresh, vibrant, and a little spontaneous in your everyday life.",
  },

  {
    key: "pr_5",

    title: "The Comfort Seeker",

    description:
      "You prefer things that feel familiar, warm, and easy. You like to stay relaxed and enjoy scents that feel cozy and comforting throughout the day.",
  },
];

type PersonalityState = {
  pr_1: number;

  pr_2: number;

  pr_3: number;

  pr_4: number;

  pr_5: number;
};

const initialState: PersonalityState = {
  pr_1: 0,

  pr_2: 0,

  pr_3: 0,

  pr_4: 0,

  pr_5: 0,
};

export default function PersonalityStage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [showConfirmationModal, setShowConfirmationModal] =
    useState(false);

  const [answers, setAnswers] =
    useState<PersonalityState>(initialState);

  const handleSliderChange = (
    key: keyof PersonalityState,
    value: number,
  ) => {
    setAnswers((prev) => ({
      ...prev,

      [key]: value,
    }));
  };

  const allZero =
    answers.pr_1 === 0 &&
    answers.pr_2 === 0 &&
    answers.pr_3 === 0 &&
    answers.pr_4 === 0 &&
    answers.pr_5 === 0;

  const submitPersonality = async () => {
    try {
      setLoading(true);

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
        await submitPersonalityStage(payload);

      console.log(
        "PERSONALITY STAGE SUBMITTED",
        response,
      );

      router.push("/quiz/occasion");

    } catch (error) {

      console.log(
        "FAILED TO SUBMIT PERSONALITY",
        error,
      );

    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {

    if (allZero) {
      setShowConfirmationModal(true);

      return;
    }

    await submitPersonality();
  };

  const handleConfirmationContinue = async () => {
    setShowConfirmationModal(false);

    await submitPersonality();
  };

  const handleConfirmationCancel = () => {
    setShowConfirmationModal(false);
  };

  useEffect(() => {

    const fetchPersonalityStage = async () => {
      try {

        const sessionId =
          localStorage.getItem("session_id");

        if (!sessionId) {
          return;
        }

        const response =
          await getPersonalityStage(sessionId);

        console.log(
          "PERSONALITY RESTORE",
          response,
        );

        setAnswers({
          pr_1: response.pr_1,

          pr_2: response.pr_2,

          pr_3: response.pr_3,

          pr_4: response.pr_4,

          pr_5: response.pr_5,
        });

      } catch (error) {

        console.log(
          "NO EXISTING PERSONALITY DATA",
          error,
        );

      }
    };

    fetchPersonalityStage();
  }, []);

  return (
    <>

      <PersonalityConfirmationModal
        isOpen={showConfirmationModal}
        onConfirm={handleConfirmationContinue}
        onCancel={handleConfirmationCancel}
      />

      <main className="min-h-screen bg-white">

        <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-6">

          <div className="space-y-2">

            <h1 className="text-3xl font-semibold">
              Personality Fit
            </h1>

            <p className="text-sm leading-6 text-neutral-500">
              How strongly does each personality type
              reflect who you are? Rate each on a
              scale from 0 to 100.
            </p>

          </div>

          <div className="mt-10 space-y-8">

            {personalities.map((item) => (
              <div
                key={item.key}
                className="space-y-4 rounded-3xl border border-neutral-200 p-5"
              >

                <div className="space-y-2">

                  <h2 className="text-lg font-semibold">
                    {item.title}
                  </h2>

                  <p className="text-sm leading-6 text-neutral-600">
                    {item.description}
                  </p>

                </div>

                <div className="space-y-3">

                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={
                      answers[
                        item.key as keyof PersonalityState
                      ]
                    }
                    onChange={(event) =>
                      handleSliderChange(
                        item.key as keyof PersonalityState,
                        Number(event.target.value),
                      )
                    }
                    className="w-full"
                  />

                  <div className="flex justify-between text-sm text-neutral-500">
                    <span>0</span>

                    <span>
                      {
                        answers[
                          item.key as keyof PersonalityState
                        ]
                      }
                    </span>

                    <span>100</span>
                  </div>

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