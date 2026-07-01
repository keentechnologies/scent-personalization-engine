"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  fetchRecommendationPageData,
  confirmSelection,
  RecommendationCombination,
} from "@/services/api/recommendation-page";

// ── Single Cart Item Card ─────────────────────────────────────────
function CartItemCard({
  item,
  qty,
  onQtyChange,
  onRemove,
}: {
  item: RecommendationCombination;
  qty: number;
  onQtyChange: (qty: number) => void;
  onRemove: () => void;
}) {
  const pricePerUnit = 1000;
  const itemTotal = pricePerUnit * qty;

  return (
    <div
      style={{
        background: "#1d1a17",
        border: "1px solid #332d28",
        borderRadius: "20px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        transition: "border-color 0.2s ease",
      }}
      className="hover:border-gold/30"
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          {/* Rank Badge */}
          <span
            style={{
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#c4823a",
              background: "rgba(196,130,58,0.1)",
              border: "1px solid rgba(196,130,58,0.2)",
              borderRadius: "4px",
              padding: "2px 8px",
              display: "inline-block",
              marginBottom: "8px",
            }}
          >
            {["TOP PICK", "ALTERNATIVE", "WILD CARD"][item.recommendation_rank - 1] || "CUSTOM MIX"}
          </span>
          <h3
            style={{
              fontFamily: "var(--font-serif), Georgia, serif",
              fontSize: "20px",
              fontWeight: 600,
              color: "#f3efe8",
            }}
          >
            {item.combo_name}
          </h3>
        </div>

        {/* Remove Button */}
        <button
          onClick={onRemove}
          style={{
            background: "transparent",
            border: "none",
            color: "#6b6057",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: 500,
            transition: "color 0.2s ease",
          }}
          className="hover:text-error"
        >
          Remove
        </button>
      </div>

      {/* Accord Formula Breakdown */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {item.formula.map((f) => (
          <span
            key={f.accord_id}
            style={{
              fontSize: "11px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "999px",
              padding: "2px 10px",
              color: "#b8aea1",
            }}
          >
            {f.accord_name} ({f.volume_ml}ml)
          </span>
        ))}
      </div>

      {/* Pricing & Quantity Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #332d28",
          paddingTop: "16px",
          marginTop: "4px",
        }}
      >
        {/* Quantity Toggle */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            onClick={() => onQtyChange(Math.max(1, qty - 1))}
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "6px 0 0 6px",
              border: "1px solid #332d28",
              background: "#151311",
              color: "#f3efe8",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
            }}
          >
            −
          </button>
          <span
            style={{
              width: "36px",
              height: "28px",
              border: "1px solid #332d28",
              borderLeft: "none",
              borderRight: "none",
              background: "#1d1a17",
              color: "#f3efe8",
              fontSize: "13px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {qty}
          </span>
          <button
            onClick={() => onQtyChange(qty + 1)}
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "0 6px 6px 0",
              border: "1px solid #332d28",
              background: "#151311",
              color: "#f3efe8",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
            }}
          >
            +
          </button>
        </div>

        {/* Pricing Info */}
        <div style={{ textAlign: "right" }}>
          <span style={{ fontSize: "11px", color: "#6b6057", display: "block" }}>
            {qty} × ₹{pricePerUnit}
          </span>
          <span
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#f3efe8",
            }}
          >
            ₹{itemTotal.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Main Cart Page Component ──────────────────────────────────────
export default function CartPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<RecommendationCombination[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Tracks active selections and quantities
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [qtyMap, setQtyMap] = useState<Record<string, number>>({});
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const sid = localStorage.getItem("session_id");
    if (!sid) {
      setError("No active session found. Please complete the quiz.");
      setLoading(false);
      return;
    }
    setSessionId(sid);

    fetchRecommendationPageData(sid)
      .then((data) => {
        // Filter combos that have status === 'selected'
        const selectedCombos = data.combinations.filter(
          (c) => c.status === "selected"
        );
        setCartItems(selectedCombos);

        const ids = new Set<string>();
        const qtys: Record<string, number> = {};
        selectedCombos.forEach((c) => {
          ids.add(c.combo_id);
          qtys[c.combo_id] = c.quantity || 1;
        });
        setSelectedIds(ids);
        setQtyMap(qtys);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // Updates quantities and selection status in the DB using the existing backend confirm endpoint
  async function persistCartChanges(
    updatedSelectedIds: Set<string>,
    updatedQtyMap: Record<string, number>
  ) {
    if (!sessionId) return;
    setUpdating(true);
    try {
      await confirmSelection({
        session_id: sessionId,
        selected_combo_ids: Array.from(updatedSelectedIds),
        qty_updates: updatedQtyMap,
      });
    } catch (e: any) {
      console.error("Failed to sync cart changes with server:", e);
    } finally {
      setUpdating(false);
    }
  }

  function handleQtyChange(comboId: string, newQty: number) {
    const nextQtyMap = { ...qtyMap, [comboId]: newQty };
    setQtyMap(nextQtyMap);
    persistCartChanges(selectedIds, nextQtyMap);
  }

  function handleRemove(comboId: string) {
    const nextSelectedIds = new Set(selectedIds);
    nextSelectedIds.delete(comboId);

    // Update frontend state immediately to feel snappy
    setSelectedIds(nextSelectedIds);
    setCartItems((prev) => prev.filter((item) => item.combo_id !== comboId));

    persistCartChanges(nextSelectedIds, qtyMap);
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + 1000 * (qtyMap[item.combo_id] || 1),
    0
  );

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
            width: "40px",
            height: "40px",
            border: "2px solid #332d28",
            borderTopColor: "#c4823a",
            borderRadius: "50%",
            animation: "spin 0.9s linear infinite",
          }}
        />
        <p style={{ color: "#6b6057", fontSize: "14px" }}>Loading cart...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

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
        <p style={{ color: "#b94a48", fontSize: "15px" }}>{error}</p>
        <button className="btn-outline" onClick={() => router.push("/")}>
          Back to Quiz
        </button>
      </div>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#151311",
        paddingBottom: "140px",
      }}
    >
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
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1
            className="heading-serif"
            style={{ fontSize: "28px", marginBottom: "4px" }}
          >
            Shopping Cart
          </h1>
          <p style={{ color: "#6b6057", fontSize: "13px" }}>
            {cartItems.length} custom blend{cartItems.length !== 1 ? "s" : ""} selected
          </p>
        </div>
        <button
          className="btn-outline"
          onClick={() => router.push("/recommendation")}
          style={{ padding: "10px 20px", fontSize: "13px", borderRadius: "10px" }}
        >
          ← Add More Blends
        </button>
      </div>

      {/* Cart Items Container */}
      <div
        style={{
          maxWidth: "680px",
          margin: "0 auto",
          padding: "32px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {cartItems.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 0",
              color: "#6b6057",
            }}
          >
            <p style={{ fontSize: "16px", marginBottom: "20px" }}>
              Your cart is empty.
            </p>
            <button
              className="btn-gold"
              onClick={() => router.push("/recommendation")}
            >
              Go to Recommendations
            </button>
          </div>
        ) : (
          cartItems.map((item) => (
            <CartItemCard
              key={item.combo_id}
              item={item}
              qty={qtyMap[item.combo_id] || 1}
              onQtyChange={(qty) => handleQtyChange(item.combo_id, qty)}
              onRemove={() => handleRemove(item.combo_id)}
            />
          ))
        )}
      </div>

      {/* Sticky Bottom Summary Bar */}
      {cartItems.length > 0 && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "24px",
            background: "rgba(21,19,17,0.97)",
            borderTop: "1px solid #332d28",
            backdropFilter: "blur(12px)",
            zIndex: 20,
          }}
        >
          <div
            style={{
              maxWidth: "680px",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "24px",
            }}
          >
            <div>
              <span style={{ fontSize: "12px", color: "#6b6057" }}>
                Total (excluding delivery)
              </span>
              <p
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#f3efe8",
                  marginTop: "2px",
                }}
              >
                ₹{subtotal.toLocaleString()}
              </p>
            </div>

            <button
              className="btn-gold"
              onClick={() => router.push("/shipping")}
              style={{ minWidth: "220px", height: "52px" }}
              disabled={updating}
            >
              Add Shipping Address →
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
