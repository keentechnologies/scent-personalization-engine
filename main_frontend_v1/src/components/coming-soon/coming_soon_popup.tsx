"use client";

import { useState } from "react";
import { X, Sparkles, Check } from "lucide-react";

interface ComingSoonPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ComingSoonPopup({ isOpen, onClose }: ComingSoonPopupProps) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanedPhone = phone.trim().replace(/[\s\-()]/g, "");
    if (!cleanedPhone) {
      setError("Please enter your phone number.");
      return;
    }

    const phoneRegex = /^\d{10}$/; // Only exactly 10 digits allowed
    if (!phoneRegex.test(cleanedPhone)) {
      setError("Please enter a valid 10-digit phone number (without +91).");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/interest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: cleanedPhone }),
      });

      if (response.ok) {
        setSuccess(true);
        setPhone("");
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
          window.gtag("event", "preregister_success", {
            event_category: "engagement",
            event_label: "coming_soon_registration",
          });
          window.gtag("event", "conversion", {
            send_to: "AW-17772674522",
          });
        }
      } else {
        const data = await response.json();
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to submit. Please check your network connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setError(null);
    setPhone("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/75 p-4 backdrop-blur-md flex items-start sm:items-center justify-center">
      <div className="relative w-full max-w-xl my-8 sm:my-auto rounded-[24px] border border-border bg-[#1d1a17] p-6 sm:p-10 shadow-2xl text-text-primary">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-secondary transition hover:bg-card hover:text-gold"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6 flex justify-center">
          <div className="text-gold">
            <Sparkles className="w-12 h-12 animate-pulse" />
          </div>
        </div>

        <div className="mb-4 text-center">
          <span className="rounded-full border border-gold/30 bg-gold/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
            Coming Soon
          </span>
        </div>

        <h2 className="text-center text-2xl sm:text-3xl font-semibold heading-serif">
          You Are Early.
        </h2>

        <p className="mx-auto mt-4 max-w-md text-center text-sm sm:text-base leading-relaxed text-text-secondary">
          Our AI-powered fragrance recommendation engine is currently being perfected behind the scenes.
        </p>

        {/* Feature List */}
        <div className="mx-auto mt-6 max-w-md space-y-2 text-sm">
          <div className="flex items-center gap-3 rounded-xl bg-card border border-border p-3">
            <Check className="w-4 h-4 text-gold flex-shrink-0" />
            <span className="text-text-secondary">Personalized scent profiling</span>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-card border border-border p-3">
            <Check className="w-4 h-4 text-gold flex-shrink-0" />
            <span className="text-text-secondary">Occasion-based recommendations</span>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-card border border-border p-3">
            <Check className="w-4 h-4 text-gold flex-shrink-0" />
            <span className="text-text-secondary">Climate-aware fragrance matching</span>
          </div>
        </div>

        {/* Action / Phone Input Section */}
        <div className="mx-auto mt-8 max-w-md">
          {success ? (
            <div className="rounded-xl border border-gold/30 bg-gold/10 p-5 text-center">
              <p className="text-gold font-semibold text-base mb-1">Interest Registered!</p>
              <p className="text-text-secondary text-sm">
                We have taken your interest. We will notify you when we are live!
              </p>
              <button
                onClick={handleClose}
                className="mt-4 btn-gold py-2 px-6 text-sm"
              >
                Got It
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone" className="text-xs text-text-secondary font-medium">
                  Get notified when we go live (10-digit number):
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    maxLength={10}
                    disabled={loading}
                    className="flex-1 rounded-lg border border-border bg-[#151311] px-4 py-3 text-sm text-text-primary placeholder-text-secondary/50 focus:border-gold focus:outline-none disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-gold py-3 px-6 text-sm font-semibold rounded-lg justify-center disabled:opacity-50"
                  >
                    {loading ? "Submitting..." : "Notify Me"}
                  </button>
                </div>
              </div>
              {error && <p className="text-red-400 text-xs mt-1 text-center">{error}</p>}
            </form>
          )}
        </div>

        <p className="mt-8 text-center text-[12px] text-text-secondary/65">
          Thank you for being among the first to explore Crafted Sprays.
        </p>
      </div>
    </div>
  );
}
