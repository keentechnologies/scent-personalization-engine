"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  fetchCartData,
  saveCartSelection,
  logCartTrace,
  CartComboResponseItem,
} from "@/services/api/cart";
import {
  Trash2,
  Plus,
  Minus,
  Check,
  ShoppingBag,
  ArrowRight,
  Star,
  ShieldCheck,
  Clock,
  Award,
  Sparkles,
} from "lucide-react";

// ── Pricing Constants ─────────────────────────────────────────────
const PRICE_CONFIGS: Record<string, number> = {
  "50ml": 800,
  "100ml": 1200,
};

export default function CartPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartComboResponseItem[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);

  // selections structure: { [pre_cart_item_id]: { "50ml": qty, "100ml": qty } }
  const [selections, setSelections] = useState<Record<string, Record<string, number>>>({});

  // ── Initialize Cart Data ──────────────────────────────────────────
  useEffect(() => {
    const sid = localStorage.getItem("session_id");
    if (!sid) {
      setError("No active session found. Please complete the quiz.");
      setLoading(false);
      return;
    }
    setSessionId(sid);

    fetchCartData(sid)
      .then((data) => {
        if (!data.combinations || data.combinations.length === 0) {
          setError("No recommendations found. Please retake the quiz.");
          return;
        }
        setCartItems(data.combinations);

        // Map server selections to local state
        const initialSelections: Record<string, Record<string, number>> = {};
        data.combinations.forEach((combo) => {
          const comboSel = { "50ml": 0, "100ml": 0 };
          combo.selections.forEach((sel) => {
            if (sel.size === "50ml" || sel.size === "100ml") {
              comboSel[sel.size] = sel.qty;
            }
          });

          // Failsafe: if Rank 1 has no active sizes, select 100ml with qty 1 by default
          if (
            combo.recommendation_rank === 1 &&
            comboSel["50ml"] === 0 &&
            comboSel["100ml"] === 0
          ) {
            comboSel["100ml"] = 1;
          }

          initialSelections[combo.pre_cart_item_id] = comboSel;
        });

        setSelections(initialSelections);
      })
      .catch((e) => {
        console.error("Fetch Cart Error:", e);
        setError(e.message || "Failed to load cart selections.");
      })
      .finally(() => setLoading(false));
  }, []);

  // ── Helper to log trace to backend ────────────────────────────────
  const triggerTrace = async (
    actionType: string,
    comboId: string,
    comboName: string,
    size?: string,
    oldQty?: number,
    newQty?: number
  ) => {
    if (!sessionId) return;
    try {
      await logCartTrace({
        session_id: sessionId,
        pre_cart_item_id: comboId,
        combo_name: comboName,
        action_type: actionType,
        size,
        old_qty: oldQty,
        new_qty: newQty,
      });
    } catch (err) {
      console.error("Failed to log trace:", err);
    }
  };

  // ── Add whole card (Combo) to order ───────────────────────────────
  const handleAddCard = (comboId: string, comboName: string) => {
    setSelections((prev) => {
      const updated = {
        ...prev,
        [comboId]: {
          ...prev[comboId],
          "100ml": 1, // Default to 100ml with quantity 1
        },
      };
      return updated;
    });

    triggerTrace("add_card", comboId, comboName, "100ml", 0, 1);
  };

  // ── Remove whole card (Combo) from order (Trash button) ───────────
  const handleRemoveCard = (comboId: string, comboName: string) => {
    setSelections((prev) => {
      const updated = {
        ...prev,
        [comboId]: {
          "50ml": 0,
          "100ml": 0,
        },
      };
      return updated;
    });

    triggerTrace("remove_card", comboId, comboName);
  };

  // ── Toggle Size selection (Checkbox boxes) ───────────────────────
  const handleToggleSize = (comboId: string, comboName: string, size: string) => {
    const currentQty = selections[comboId]?.[size] || 0;
    const isSelected = currentQty > 0;
    const nextQty = isSelected ? 0 : 1;

    setSelections((prev) => ({
      ...prev,
      [comboId]: {
        ...prev[comboId],
        [size]: nextQty,
      },
    }));

    if (isSelected) {
      triggerTrace("deselect_size", comboId, comboName, size, currentQty, 0);
    } else {
      triggerTrace("select_size", comboId, comboName, size, 0, 1);
    }
  };

  // ── Change Size Quantity ──────────────────────────────────────────
  const handleQtyChange = (
    comboId: string,
    comboName: string,
    size: string,
    change: number
  ) => {
    const currentQty = selections[comboId]?.[size] || 0;
    const nextQty = Math.max(0, currentQty + change);

    setSelections((prev) => ({
      ...prev,
      [comboId]: {
        ...prev[comboId],
        [size]: nextQty,
      },
    }));

    triggerTrace("update_qty", comboId, comboName, size, currentQty, nextQty);
  };

  // ── Final batch save and redirect to shipping ─────────────────────
  const handleContinue = async () => {
    if (!sessionId) return;
    setSaving(true);
    try {
      // Map active selections from state into save payload
      const payloadItems = cartItems.map((item) => {
        const comboSel = selections[item.pre_cart_item_id] || { "50ml": 0, "100ml": 0 };
        const selectionsList = [];
        if (comboSel["50ml"] > 0) {
          selectionsList.push({ size: "50ml", qty: comboSel["50ml"] });
        }
        if (comboSel["100ml"] > 0) {
          selectionsList.push({ size: "100ml", qty: comboSel["100ml"] });
        }
        return {
          pre_cart_item_id: item.pre_cart_item_id,
          selections: selectionsList,
        };
      });

      // Filter out combinations that have no sizes selected
      const hasAnySelection = payloadItems.some((item) => item.selections.length > 0);
      if (!hasAnySelection) {
        toast.error("Please add at least one fragrance to your cart before proceeding.");
        setSaving(false);
        return;
      }

      await saveCartSelection({
        session_id: sessionId,
        items: payloadItems,
      });

      router.push("/shipping");
    } catch (err: any) {
      console.error("Save Cart Error:", err);
      toast.error(err.message || "Failed to save cart. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // ── Calculations ──────────────────────────────────────────────────
  let totalItems = 0;
  let subtotal = 0;

  cartItems.forEach((item) => {
    const comboSel = selections[item.pre_cart_item_id] || { "50ml": 0, "100ml": 0 };
    const qty50 = comboSel["50ml"] || 0;
    const qty100 = comboSel["100ml"] || 0;

    totalItems += qty50 + qty100;
    subtotal += qty50 * PRICE_CONFIGS["50ml"] + qty100 * PRICE_CONFIGS["100ml"];
  });

  // ── Render States ─────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#151311] gap-4">
        <div className="w-12 h-12 border-2 border-[#332d28] border-t-[#c4823a] rounded-full animate-spin" />
        <p className="text-[#b8aea1] font-medium tracking-wide">Crafting your cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#151311] gap-6 px-6 text-center">
        <p className="text-[#b94a48] text-[16px] font-medium">{error}</p>
        <button
          className="btn-outline"
          onClick={() => router.push("/")}
          style={{ padding: "12px 24px" }}
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#151311] text-[#f3efe8] font-sans pb-36 relative grain-overlay overflow-x-hidden">
      {/* Background glow effects */}
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(196,130,58,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-[400px] right-[-200px] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(196,130,58,0.03)_0%,transparent_70%)] pointer-events-none" />

      {/* ── Sticky Header ── */}
      <header className="sticky top-0 z-40 bg-[#151311]/90 backdrop-blur-md border-b border-[#332d28]/40 px-6 py-5 md:px-12 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center gap-2">
          <span
            className="font-serif text-[22px] font-semibold tracking-tight text-[#f3efe8] cursor-pointer"
            onClick={() => router.push("/")}
          >
            Crafted Sprays
          </span>
        </div>
        <div className="relative">
          <ShoppingBag className="w-[22px] h-[22px] text-[#f3efe8]" />
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-[#c4823a] text-[#1a1410] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-pulse">
              {totalItems}
            </span>
          )}
        </div>
      </header>

      {/* ── Main Content Container ── */}
      <div className="max-w-[1100px] mx-auto px-6 pt-10 md:pt-16 space-y-12">
        {/* Title */}
        <div className="space-y-3 text-center md:text-left max-w-2xl">
          <h1 className="heading-serif text-3xl md:text-4xl font-bold tracking-tight">
            Your Order
          </h1>
          <p className="text-[14px] text-[#b8aea1] leading-relaxed">
            Review your selected fragrances, choose size and quantity before we craft them for you.
          </p>
        </div>

        {/* Layout Grid: Cards on left/middle, details on right if desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Fragrance Cards */}
          <div className="lg:col-span-8 space-y-6">
            {cartItems.map((item) => {
              const comboSel = selections[item.pre_cart_item_id] || { "50ml": 0, "100ml": 0 };
              const isSelected = comboSel["50ml"] > 0 || comboSel["100ml"] > 0;

              // Static matching metadata based on rank
              const rank = item.recommendation_rank;
              const matchPercent = rank === 1 ? "94% Match" : rank === 2 ? "87% Match" : "84% Match";
              const tagLabel = rank === 1 ? "BEST MATCH" : rank === 2 ? "ALTERNATIVE" : "WILD CARD";

              if (isSelected) {
                // ── EXPANDED CARD STATE (Selected) ──
                return (
                  <div
                    key={item.pre_cart_item_id}
                    className="card-glow p-6 md:p-8 space-y-6 relative transition-all duration-300"
                  >
                    {/* Header: Title, Image, Rank, and Trash */}
                    <div className="flex gap-5 items-start">
                      {/* Bottle image display */}
                      <div className="w-[85px] h-[105px] md:w-[100px] md:h-[125px] flex-shrink-0 bg-[#1d1a17]/80 rounded-2xl border border-[#332d28]/50 flex items-center justify-center p-2 relative overflow-hidden group shadow-inner">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(196,130,58,0.15),transparent_75%)]" />
                        <img
                          src="/assets/pricing-bottle.png"
                          alt="Perfume Bottle"
                          className="max-h-[90%] object-contain drop-shadow-[0_12px_15px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Content details */}
                      <div className="flex-1 space-y-1.5">
                        <div className="flex items-center flex-wrap gap-2">
                          {rank === 1 ? (
                            <span className="eyebrow text-[10px] bg-[#c4823a]/12 border border-[#c4823a]/30 rounded-md px-2 py-0.5 font-bold tracking-widest flex items-center gap-1">
                              <Star className="w-3 h-3 fill-[#c4823a]" /> {tagLabel}
                            </span>
                          ) : (
                            <span className="text-[10px] text-[#b8aea1] bg-[#332d28]/35 border border-[#332d28] rounded-md px-2 py-0.5 font-bold tracking-widest">
                              {tagLabel}
                            </span>
                          )}
                          <span className="text-[11px] font-semibold text-[#c4823a] tracking-wide">
                            {matchPercent}
                          </span>
                        </div>

                        <h3 className="heading-serif text-xl md:text-2xl font-bold tracking-tight">
                          {item.combo_name}
                        </h3>

                        <p className="text-[12.5px] text-[#b8aea1] leading-relaxed line-clamp-2 md:line-clamp-3">
                          {item.description}
                        </p>
                      </div>

                      {/* Trash action */}
                      <button
                        onClick={() => handleRemoveCard(item.pre_cart_item_id, item.combo_name)}
                        className="text-[#b8aea1] hover:text-[#b94a48] transition-colors p-1.5 hover:bg-[#b94a48]/10 rounded-xl outline-none"
                        title="Remove from Order"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Choose Size Variant Blocks */}
                    <div className="space-y-3 pt-3 border-t border-[#332d28]/40">
                      <h4 className="text-[12px] font-bold tracking-widest text-[#b8aea1] uppercase">
                        Choose Size
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        {/* 50ml Box */}
                        <div
                          onClick={() => handleToggleSize(item.pre_cart_item_id, item.combo_name, "50ml")}
                          className={`relative border rounded-[20px] p-4 cursor-pointer flex flex-col items-center justify-center gap-1 transition-all duration-300 select-none ${
                            comboSel["50ml"] > 0
                              ? "bg-[#c4823a]/12 border-[#c4823a]/65 shadow-[0_4px_20px_rgba(196,130,58,0.08)]"
                              : "bg-[#1d1a17]/50 border-[#332d28] hover:border-[#b8aea1]/30 hover:bg-[#1d1a17]/85"
                          }`}
                        >
                          {comboSel["50ml"] > 0 && (
                            <span className="absolute top-2.5 right-2.5 w-4 h-4 bg-[#c4823a] text-[#1a1410] rounded-full flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 stroke-[3px]" />
                            </span>
                          )}
                          <span className="text-[15px] font-semibold tracking-wide">50ml</span>
                          <span className="text-[12.5px] text-[#b8aea1]">₹1,200</span>
                        </div>

                        {/* 100ml Box */}
                        <div
                          onClick={() => handleToggleSize(item.pre_cart_item_id, item.combo_name, "100ml")}
                          className={`relative border rounded-[20px] p-4 cursor-pointer flex flex-col items-center justify-center gap-1 transition-all duration-300 select-none ${
                            comboSel["100ml"] > 0
                              ? "bg-[#c4823a]/12 border-[#c4823a]/65 shadow-[0_4px_20px_rgba(196,130,58,0.08)]"
                              : "bg-[#1d1a17]/50 border-[#332d28] hover:border-[#b8aea1]/30 hover:bg-[#1d1a17]/85"
                          }`}
                        >
                          {comboSel["100ml"] > 0 && (
                            <span className="absolute top-2.5 right-2.5 w-4 h-4 bg-[#c4823a] text-[#1a1410] rounded-full flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 stroke-[3px]" />
                            </span>
                          )}
                          <span className="text-[15px] font-semibold tracking-wide">100ml</span>
                          <span className="text-[12.5px] text-[#b8aea1]">₹2,000</span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity selectors for active sizes */}
                    {(comboSel["50ml"] > 0 || comboSel["100ml"] > 0) && (
                      <div className="space-y-4 pt-4 border-t border-[#332d28]/40">
                        <h4 className="text-[12px] font-bold tracking-widest text-[#b8aea1] uppercase">
                          Quantity
                        </h4>
                        <div className="space-y-3">
                          {/* 50ml selector */}
                          {comboSel["50ml"] > 0 && (
                            <div className="flex justify-between items-center bg-[#1d1a17]/40 border border-[#332d28]/30 rounded-2xl px-5 py-3">
                              <span className="text-[13.5px] font-medium text-[#f3efe8]">50ml Variant</span>
                              <div className="flex items-center gap-4">
                                <button
                                  onClick={() => handleQtyChange(item.pre_cart_item_id, item.combo_name, "50ml", -1)}
                                  className="w-8 h-8 rounded-lg bg-[#24201d] border border-[#332d28] hover:border-[#c4823a] hover:bg-[#c4823a]/10 flex items-center justify-center transition-all"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="text-[15px] font-bold w-6 text-center">
                                  {comboSel["50ml"]}
                                </span>
                                <button
                                  onClick={() => handleQtyChange(item.pre_cart_item_id, item.combo_name, "50ml", 1)}
                                  className="w-8 h-8 rounded-lg bg-[#24201d] border border-[#332d28] hover:border-[#c4823a] hover:bg-[#c4823a]/10 flex items-center justify-center transition-all"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          )}

                          {/* 100ml selector */}
                          {comboSel["100ml"] > 0 && (
                            <div className="flex justify-between items-center bg-[#1d1a17]/40 border border-[#332d28]/30 rounded-2xl px-5 py-3">
                              <span className="text-[13.5px] font-medium text-[#f3efe8]">100ml Variant</span>
                              <div className="flex items-center gap-4">
                                <button
                                  onClick={() => handleQtyChange(item.pre_cart_item_id, item.combo_name, "100ml", -1)}
                                  className="w-8 h-8 rounded-lg bg-[#24201d] border border-[#332d28] hover:border-[#c4823a] hover:bg-[#c4823a]/10 flex items-center justify-center transition-all"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="text-[15px] font-bold w-6 text-center">
                                  {comboSel["100ml"]}
                                </span>
                                <button
                                  onClick={() => handleQtyChange(item.pre_cart_item_id, item.combo_name, "100ml", 1)}
                                  className="w-8 h-8 rounded-lg bg-[#24201d] border border-[#332d28] hover:border-[#c4823a] hover:bg-[#c4823a]/10 flex items-center justify-center transition-all"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Static traits pills */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {["Confident", "Modern", "Versatile"].map((trait) => (
                        <span
                          key={trait}
                          className="text-[11px] font-semibold text-[#c4823a] bg-[#c4823a]/8 border border-[#c4823a]/20 rounded-full px-3 py-1 flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3 text-[#c4823a]" />
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              } else {
                // ── COLLAPSED CARD STATE (Deselected / Alternative options) ──
                return (
                  <div
                    key={item.pre_cart_item_id}
                    className="card p-5 md:p-6 flex gap-4 md:gap-5 items-center hover:border-[#c4823a]/30 transition-all duration-300 relative group overflow-hidden"
                  >
                    {/* Dark gradient slide on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c4823a]/1 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                    {/* Bottle thumbnail */}
                    <div className="w-[55px] h-[70px] md:w-[65px] md:h-[80px] flex-shrink-0 bg-[#1d1a17] rounded-xl border border-[#332d28]/40 flex items-center justify-center p-1.5 shadow-md">
                      <img
                        src="/assets/pricing-bottle.png"
                        alt="Perfume Bottle"
                        className="max-h-[90%] object-contain drop-shadow-[0_8px_10px_rgba(0,0,0,0.55)] opacity-85 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Details content */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] text-[#b8aea1] bg-[#1d1a17] border border-[#332d28] rounded px-1.5 py-0.5 tracking-wider uppercase font-bold">
                          {tagLabel}
                        </span>
                        <span className="text-[10px] font-medium text-[#c4823a] tracking-wide">
                          {matchPercent}
                        </span>
                      </div>
                      <h4 className="heading-serif text-[15px] md:text-[17px] font-semibold text-[#f3efe8] truncate">
                        {item.combo_name}
                      </h4>
                      <p className="text-[12px] text-[#b8aea1] truncate max-w-md">
                        {item.description}
                      </p>
                    </div>

                    {/* Sleek Add Button */}
                    <div className="flex flex-col items-center gap-1.5 pl-2">
                      <button
                        onClick={() => handleAddCard(item.pre_cart_item_id, item.combo_name)}
                        className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-[#c4823a]/30 bg-[#1d1a17] text-[#c4823a] flex items-center justify-center hover:bg-[#c4823a] hover:text-[#1a1410] hover:scale-105 hover:border-transparent transition-all duration-300 outline-none shadow-md"
                        title="Add to order"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                      <span className="text-[10px] text-[#b8aea1] font-medium tracking-wide">
                        Add to Order
                      </span>
                    </div>
                  </div>
                );
              }
            })}
          </div>

          {/* Right Column: Order Trust Badges & Policies (Desktop view) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="card p-6 bg-[#1d1a17]/50 border-[#332d28]/60 space-y-6 hidden lg:block">
              <h3 className="heading-serif text-lg font-bold border-b border-[#332d28]/50 pb-3">
                Crafting Philosophy
              </h3>
              <p className="text-[13px] text-[#b8aea1] leading-relaxed">
                Every bottle is freshly mixed to order. We compute your scent profile based on your sensory selections and local climate zones to compose a truly customized botanical experience.
              </p>
              <div className="space-y-4 pt-2">
                <div className="flex gap-3.5 items-start">
                  <div className="p-2 bg-[#c4823a]/10 rounded-xl text-[#c4823a] border border-[#c4823a]/15">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-[#f3efe8]">Custom Compounded</h4>
                    <p className="text-[11px] text-[#b8aea1] mt-0.5">Freshly hand-mixed upon order approval.</p>
                  </div>
                </div>
                <div className="flex gap-3.5 items-start">
                  <div className="p-2 bg-[#c4823a]/10 rounded-xl text-[#c4823a] border border-[#c4823a]/15">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-[#f3efe8]">Aroma Integrity</h4>
                    <p className="text-[11px] text-[#b8aea1] mt-0.5">Using high-potency premium base components.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Trust Badges ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-[#332d28]/35">
          {/* Badge 1 */}
          <div className="card p-5 bg-[#1d1a17]/30 border-[#332d28]/40 text-center space-y-2 hover:border-[#c4823a]/15 transition-all">
            <div className="mx-auto w-9 h-9 bg-[#c4823a]/10 border border-[#c4823a]/15 rounded-full flex items-center justify-center text-[#c4823a]">
              <Sparkles className="w-4.5 h-4.5" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-[13.5px] font-bold tracking-tight">Crafted Fresh</h4>
              <p className="text-[11px] text-[#b8aea1]">After order confirmation</p>
            </div>
          </div>

          {/* Badge 2 */}
          <div className="card p-5 bg-[#1d1a17]/30 border-[#332d28]/40 text-center space-y-2 hover:border-[#c4823a]/15 transition-all">
            <div className="mx-auto w-9 h-9 bg-[#c4823a]/10 border border-[#c4823a]/15 rounded-full flex items-center justify-center text-[#c4823a]">
              <Award className="w-4.5 h-4.5" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-[13.5px] font-bold tracking-tight">Premium Ingredients</h4>
              <p className="text-[11px] text-[#b8aea1]">Long-lasting formulation</p>
            </div>
          </div>

          {/* Badge 3 */}
          <div className="card p-5 bg-[#1d1a17]/30 border-[#332d28]/40 text-center space-y-2 hover:border-[#c4823a]/15 transition-all">
            <div className="mx-auto w-9 h-9 bg-[#c4823a]/10 border border-[#c4823a]/15 rounded-full flex items-center justify-center text-[#c4823a]">
              <ShieldCheck className="w-4.5 h-4.5" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-[13.5px] font-bold tracking-tight">Secure & Private</h4>
              <p className="text-[11px] text-[#b8aea1]">Your transaction is safe</p>
            </div>
          </div>

          {/* Badge 4 */}
          <div className="card p-5 bg-[#1d1a17]/30 border-[#332d28]/40 text-center space-y-2 hover:border-[#c4823a]/15 transition-all">
            <div className="mx-auto w-9 h-9 bg-[#c4823a]/10 border border-[#c4823a]/15 rounded-full flex items-center justify-center text-[#c4823a]">
              <Clock className="w-4.5 h-4.5" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-[13.5px] font-bold tracking-tight">Delivered in 4 Days</h4>
              <p className="text-[11px] text-[#b8aea1]">To your doorstep</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky Bottom Checkout Summary Bar ── */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#151311]/95 backdrop-blur-lg border-t border-[#332d28]/60 py-5 px-6 shadow-[0_-12px_40px_rgba(0,0,0,0.5)]">
          <div className="max-w-[1100px] mx-auto flex items-center justify-between gap-6">
            {/* Summary info */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#1d1a17] border border-[#332d28] rounded-xl flex items-center justify-center relative shadow-inner">
                <ShoppingBag className="w-5 h-5 text-[#c4823a]" />
                <span className="absolute -top-1 -right-1 bg-[#c4823a] text-[#1a1410] text-[9.5px] font-extrabold w-4.5 h-4.5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] text-[#b8aea1] uppercase font-bold tracking-wider">
                  {totalItems} Item{totalItems !== 1 ? "s" : ""} Selected
                </span>
                <p className="text-[20px] font-extrabold text-[#f3efe8] leading-none">
                  ₹{subtotal.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Action button */}
            <button
              onClick={handleContinue}
              disabled={saving}
              className="btn-gold relative h-[52px] px-8 rounded-2xl text-[14.5px] font-semibold tracking-wide active:scale-[0.98] transition-all disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2 group w-[220px] md:w-auto"
            >
              <span>{saving ? "Saving..." : "Continue to Shipping"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
