"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  fetchRecommendationPageData,
  confirmSelection,
  RecommendationCombination,
} from "@/services/api/recommendation-page";

// ── Accord formula pill ───────────────────────────────────────────
function AccordPill({ name, volume }: { name: string; volume: number }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        background: "rgba(196,130,58,0.12)",
        border: "1px solid rgba(196,130,58,0.3)",
        borderRadius: "999px",
        padding: "4px 12px",
        fontSize: "12px",
        color: "#c4823a",
        fontWeight: 600,
        letterSpacing: "0.02em",
      }}
    >
      {name}
      <span
        style={{
          background: "rgba(196,130,58,0.2)",
          borderRadius: "999px",
          padding: "1px 7px",
          fontSize: "11px",
          color: "#e0a86a",
        }}
      >
        {volume}ml
      </span>
    </span>
  );
}

// ── Single recommendation card ────────────────────────────────────
function RecommendationCard({
  combo,
  isSelected,
  qty,
  onToggle,
  onQtyChange,
}: {
  combo: RecommendationCombination;
  isSelected: boolean;
  qty: number;
  onToggle: () => void;
  onQtyChange: (qty: number) => void;
}) {
  const rank = combo.recommendation_rank;
  const rankLabel = ["TOP PICK", "ALTERNATIVE", "WILD CARD"][rank - 1] || "";

  return (
    <div
      id={`recommendation-card-${rank}`}
      onClick={onToggle}
      style={{
        position: "relative",
        background: isSelected
          ? "radial-gradient(140% 100% at 100% 0%, rgba(196,130,58,0.18) 0%, rgba(196,130,58,0.06) 38%, transparent 70%), #24201d"
          : "#1d1a17",
        border: isSelected
          ? "1.5px solid rgba(196,130,58,0.55)"
          : "1px solid #332d28",
        borderRadius: "20px",
        padding: "28px 28px 24px",
        cursor: "pointer",
        transition: "all 0.25s ease",
        boxShadow: isSelected
          ? "0 0 0 1px rgba(196,130,58,0.15), 0 16px 40px rgba(0,0,0,0.3)"
          : "0 4px 20px rgba(0,0,0,0.2)",
      }}
    >
      {/* Rank badge + checkbox */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "16px",
        }}
      >
        <span
          style={{
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: isSelected ? "#c4823a" : "#6b6057",
            background: isSelected
              ? "rgba(196,130,58,0.12)"
              : "rgba(255,255,255,0.04)",
            border: isSelected
              ? "1px solid rgba(196,130,58,0.25)"
              : "1px solid rgba(255,255,255,0.06)",
            borderRadius: "6px",
            padding: "4px 10px",
          }}
        >
          {rankLabel}
        </span>

        {/* Checkbox */}
        <div
          style={{
            width: "22px",
            height: "22px",
            borderRadius: "6px",
            border: isSelected ? "2px solid #c4823a" : "2px solid #4a4037",
            background: isSelected ? "#c4823a" : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.2s ease",
          }}
        >
          {isSelected && (
            <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
              <path
                d="M1 4L4.5 7.5L11 1"
                stroke="#1a1410"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>

      {/* Combo name */}
      <h2
        style={{
          fontFamily: "var(--font-serif), Georgia, serif",
          fontSize: "22px",
          fontWeight: 600,
          color: "#f3efe8",
          lineHeight: 1.2,
          marginBottom: "10px",
        }}
      >
        {combo.combo_name}
      </h2>

      {/* Accord pills */}
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}
      >
        {combo.formula.map((f) => (
          <AccordPill key={f.accord_id} name={f.accord_name} volume={f.volume_ml} />
        ))}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            fontSize: "11px",
            color: "#6b6057",
            padding: "4px 10px",
          }}
        >
          = {combo.total_volume_ml}ml total
        </span>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: "14px",
          lineHeight: 1.65,
          color: "#b8aea1",
          marginBottom: "16px",
        }}
      >
        {combo.description}
      </p>

      {/* Justification collapsible */}
      <details style={{ marginBottom: "20px" }}>
        <summary
          style={{
            fontSize: "12px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#c4823a",
            cursor: "pointer",
            userSelect: "none",
            fontWeight: 600,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          Why this for you ↓
        </summary>
        <p
          style={{
            fontSize: "13px",
            color: "#9a9087",
            lineHeight: 1.7,
            marginTop: "10px",
            paddingLeft: "4px",
          }}
        >
          {combo.justification}
        </p>
      </details>

      {/* Qty selector — only visible when selected */}
      {isSelected && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            borderTop: "1px solid rgba(196,130,58,0.15)",
            paddingTop: "16px",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <span style={{ fontSize: "13px", color: "#b8aea1", fontWeight: 500 }}>
            Qty
          </span>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button
              id={`qty-dec-${rank}`}
              onClick={() => onQtyChange(Math.max(1, qty - 1))}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px 0 0 8px",
                border: "1px solid #332d28",
                background: "#151311",
                color: "#f3efe8",
                fontSize: "18px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              −
            </button>
            <span
              style={{
                width: "40px",
                height: "32px",
                border: "1px solid #332d28",
                borderLeft: "none",
                borderRight: "none",
                background: "#1d1a17",
                color: "#f3efe8",
                fontSize: "14px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {qty}
            </span>
            <button
              id={`qty-inc-${rank}`}
              onClick={() => onQtyChange(qty + 1)}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "0 8px 8px 0",
                border: "1px solid #332d28",
                background: "#151311",
                color: "#f3efe8",
                fontSize: "18px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              +
            </button>
          </div>
          <span style={{ fontSize: "12px", color: "#6b6057" }}>
            × {combo.total_volume_ml}ml
          </span>
        </div>
      )}
    </div>
  );
}

// ── Main Recommendation Page ──────────────────────────────────────
export default function RecommendationPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [combinations, setCombinations] = useState<RecommendationCombination[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Track selected combo_ids (e.g. "comb_1", "comb_2")
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  // Track qty per combo_id
  const [qtyMap, setQtyMap] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const sid = localStorage.getItem("session_id");
    if (!sid) {
      setError("No active session found. Please complete the quiz first.");
      setLoading(false);
      return;
    }
    setSessionId(sid);

    fetchRecommendationPageData(sid)
      .then((data) => {
        setCombinations(data.combinations);

        // Build initial selection state from restored status
        const defaultSelected = new Set<string>();
        const defaultQty: Record<string, number> = {};

        data.combinations.forEach((c) => {
          if (c.status === "selected" || c.is_default_selected) {
            defaultSelected.add(c.combo_id);
          }
          defaultQty[c.combo_id] = c.quantity || 1;
        });

        setSelectedIds(defaultSelected);
        setQtyMap(defaultQty);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  function toggleSelect(comboId: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(comboId)) {
        next.delete(comboId);
      } else {
        next.add(comboId);
      }
      return next;
    });
  }

  function updateQty(comboId: string, qty: number) {
    setQtyMap((prev) => ({ ...prev, [comboId]: qty }));
  }

  async function handleGoToCart() {
    if (!sessionId || selectedIds.size === 0) return;
    setSubmitting(true);
    try {
      await confirmSelection({
        session_id: sessionId,
        selected_combo_ids: Array.from(selectedIds),
        qty_updates: qtyMap,
      });
      router.push("/cart");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  // ── Loading state ──
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#151311",
          gap: "20px",
        }}
      >
        <div
          style={{
            width: "44px",
            height: "44px",
            border: "2px solid #332d28",
            borderTopColor: "#c4823a",
            borderRadius: "50%",
            animation: "spin 0.9s linear infinite",
          }}
        />
        <p style={{ color: "#6b6057", fontSize: "14px", letterSpacing: "0.05em" }}>
          Loading your recommendations…
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ── Error state ──
  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#151311",
          gap: "16px",
          padding: "24px",
        }}
      >
        <p style={{ color: "#b94a48", fontSize: "16px", textAlign: "center" }}>
          {error}
        </p>
        <button className="btn-outline" onClick={() => router.push("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "#151311", padding: "0 0 120px" }}>
      {/* Header */}
      <div
        style={{
          borderBottom: "1px solid #1d1a17",
          padding: "28px 32px 24px",
          position: "sticky",
          top: 0,
          background: "rgba(21,19,17,0.95)",
          backdropFilter: "blur(12px)",
          zIndex: 10,
        }}
      >
        <p className="eyebrow" style={{ marginBottom: "6px" }}>
          <span>✦</span> Your Fragrance Profile
        </p>
        <h1 className="heading-serif" style={{ fontSize: "28px", marginBottom: "4px" }}>
          Your Recommendations
        </h1>
        <p style={{ color: "#6b6057", fontSize: "13px" }}>
          Select one or more combinations to add to your cart
        </p>
      </div>

      {/* Cards */}
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          padding: "32px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {combinations.map((combo) => (
          <RecommendationCard
            key={combo.combo_id}
            combo={combo}
            isSelected={selectedIds.has(combo.combo_id)}
            qty={qtyMap[combo.combo_id] || 1}
            onToggle={() => toggleSelect(combo.combo_id)}
            onQtyChange={(qty) => updateQty(combo.combo_id, qty)}
          />
        ))}
      </div>

      {/* Sticky bottom CTA */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "16px 24px",
          background: "rgba(21,19,17,0.97)",
          borderTop: "1px solid #1d1a17",
          backdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          zIndex: 20,
        }}
      >
        <p style={{ fontSize: "13px", color: "#6b6057" }}>
          {selectedIds.size === 0
            ? "Select at least one combination"
            : `${selectedIds.size} combination${selectedIds.size > 1 ? "s" : ""} selected`}
        </p>
        <button
          id="go-to-cart-btn"
          className="btn-gold"
          disabled={selectedIds.size === 0 || submitting}
          onClick={handleGoToCart}
          style={{ minWidth: "160px" }}
        >
          {submitting ? "Saving…" : "Go to Cart →"}
        </button>
      </div>
    </main>
  );
}
