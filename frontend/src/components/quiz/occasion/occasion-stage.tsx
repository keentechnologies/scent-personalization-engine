

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
    <main className="min-h-screen bg-white">

      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-6">

        <div className="space-y-2">

          <h1 className="text-3xl font-semibold">
            Occasion Preferences
          </h1>

          <p className="text-sm leading-6 text-neutral-500">
            Select the occasions where you would
            like your fragrance recommendations to
            perform well.
          </p>

        </div>

        <div className="mt-10 flex flex-wrap gap-3">

          {occasionOptions.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() =>
                handleToggle(item.key)
              }
              className={`rounded-2xl border px-4 py-3 text-sm ${
                answers[item.key]
                  ? "border-black bg-black text-white"
                  : "border-neutral-300"
              }`}
            >
              {item.label}
            </button>
          ))}

        </div>

        <div className="mt-4">

          <p className="text-sm text-neutral-500">
            {selectedCount} selected
          </p>

          {validationError && (
            <p className="mt-2 text-sm text-red-500">
              {validationError}
            </p>
          )}

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
  );
}