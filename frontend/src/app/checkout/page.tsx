"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";
import { toast } from "sonner";
import {
  fetchCheckoutSummary,
  createOrder,
  verifyPayment,
  CheckoutSummaryResponse,
} from "@/services/api/order";
import {
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  MapPin,
  FileText,
  CreditCard,
  ChevronLeft,
} from "lucide-react";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const addressId = searchParams.get("address_id");

  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [summary, setSummary] = useState<CheckoutSummaryResponse | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sid = localStorage.getItem("session_id");
    if (!sid) {
      setError("No active session found. Please complete the quiz first.");
      setLoading(false);
      return;
    }
    if (!addressId) {
      setError("No shipping address selected. Please select an address first.");
      setLoading(false);
      return;
    }
    setSessionId(sid);

    fetchCheckoutSummary(sid, addressId)
      .then((data) => {
        if (!data.items || data.items.length === 0) {
          setError("Your cart is empty. Please select fragrances from the cart.");
          return;
        }
        setSummary(data);
      })
      .catch((err) => {
        console.error("Fetch Summary Error:", err);
        setError(err.message || "Failed to load checkout details.");
      })
      .finally(() => setLoading(false));
  }, [addressId]);

  const handlePlaceOrder = async () => {
    if (!sessionId || !addressId || !summary) return;
    setProcessing(true);
    try {
      // 1. Create the pending order in the database and get Razorpay order token
      const orderRes = await createOrder(sessionId, addressId);
      if (!orderRes.success) {
        throw new Error(orderRes.message || "Order creation failed.");
      }

      // Check if Razorpay SDK script is active
      if (typeof window === "undefined" || !(window as any).Razorpay) {
        throw new Error("Payment gateway SDK failed to load. Please refresh and try again.");
      }

      const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_TC9TyC4WH8LyuC";

      // Configure Razorpay checkout properties
      const options = {
        key: keyId,
        amount: Math.round(orderRes.payable_amount * 100), // in paise
        currency: "INR",
        name: "Crafted Sprays",
        description: "Compounding your customized fragrance",
        order_id: orderRes.razorpay_order_id,
        handler: async function (response: any) {
          setProcessing(true);
          try {
            toast.loading("Verifying payment transaction...", { id: "payment" });
            const verifyRes = await verifyPayment(
              orderRes.order_id,
              response.razorpay_payment_id,
              response.razorpay_signature
            );
            if (!verifyRes.success) {
              throw new Error(verifyRes.message || "Payment signature verification failed.");
            }
            toast.success("Order Placed Successfully!", { id: "payment" });
            router.push(`/orders/success?order_id=${orderRes.order_id}`);
          } catch (verifyErr: any) {
            console.error("Verification Error:", verifyErr);
            toast.error(verifyErr.message || "Verification failed. Please contact support.", { id: "payment" });
            setProcessing(false);
          }
        },
        prefill: {
          name: summary.address.consignee_name,
          contact: summary.address.phone_number,
        },
        theme: {
          color: "#c4823a", // gold matching brand theme
        },
        modal: {
          ondismiss: function () {
            toast.error("Payment cancelled.", { id: "payment" });
            setProcessing(false);
          }
        }
      };

      toast.loading("Opening checkout modal...", { id: "payment" });
      const rzp = new (window as any).Razorpay(options);
      
      rzp.on("payment.failed", function (response: any) {
        console.error("Payment failed raw:", response.error);
        toast.error(`Payment failed: ${response.error.description}`, { id: "payment" });
        setProcessing(false);
      });

      rzp.open();
    } catch (err: any) {
      console.error("Checkout Payment Error:", err);
      toast.error(err.message || "Checkout failed. Please try again.", { id: "payment" });
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#151311] gap-4">
        <div className="w-12 h-12 border-2 border-[#332d28] border-t-[#c4823a] rounded-full animate-spin" />
        <p className="text-[#b8aea1] font-medium tracking-wide">Securing your session...</p>
      </div>
    );
  }

  if (error || !summary) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#151311] gap-6 px-6 text-center">
        <p className="text-[#b94a48] text-[16px] font-medium">{error || "Something went wrong."}</p>
        <button
          className="btn-outline"
          onClick={() => router.push("/shipping")}
          style={{ padding: "12px 24px" }}
        >
          Back to Shipping
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#151311] text-[#f3efe8] font-sans pb-36 relative grain-overlay overflow-x-hidden">
      {/* Glow overlays */}
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(196,130,58,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-[400px] right-[-200px] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(196,130,58,0.03)_0%,transparent_70%)] pointer-events-none" />

      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#151311]/90 backdrop-blur-md border-b border-[#332d28]/40 px-6 py-5 md:px-12 flex justify-between items-center transition-all duration-300">
        <button
          className="flex items-center gap-2 text-[#b8aea1] hover:text-[#f3efe8] transition-colors group outline-none"
          onClick={() => router.push("/shipping")}
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-[13px] font-bold tracking-widest uppercase">Shipping</span>
        </button>
        <span className="font-serif text-[22px] font-semibold tracking-tight text-[#f3efe8]">
          Review Order
        </span>
        <ShoppingBag className="w-[20px] h-[20px] text-[#b8aea1]" />
      </header>

      {/* Layout Content */}
      <div className="max-w-[1000px] mx-auto px-6 pt-10 md:pt-16 space-y-12">
        {/* Title */}
        <div className="space-y-2 text-center md:text-left">
          <h1 className="heading-serif text-3xl md:text-4xl font-bold tracking-tight">
            Checkout Summary
          </h1>
          <p className="text-[14px] text-[#b8aea1] leading-relaxed">
            Please verify your selections and delivery details before completing payment.
          </p>
        </div>

        {/* Checkout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Scent Items & Shipping Address */}
          <div className="lg:col-span-7 space-y-6">
            {/* Fragrances Selection List */}
            <div className="card p-6 md:p-8 space-y-6 relative border border-[#332d28]/50 bg-[#1d1a17]/30 rounded-3xl">
              <div className="flex items-center gap-2.5 pb-4 border-b border-[#332d28]/45">
                <FileText className="w-5 h-5 text-[#c4823a]" />
                <h3 className="heading-serif text-lg font-bold">Your Custom Blends</h3>
              </div>

              <div className="space-y-6 divide-y divide-[#332d28]/35">
                {summary.items.map((item, idx) => (
                  <div key={item.pre_cart_item_id} className={`flex items-start gap-4 ${idx > 0 ? "pt-5" : ""}`}>
                    {/* Scent visual icon / display */}
                    <div className="w-[60px] h-[75px] flex-shrink-0 bg-[#151311] border border-[#332d28]/50 rounded-2xl flex items-center justify-center p-1.5 shadow-md relative overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(196,130,58,0.1),transparent_70%)]" />
                      <img
                        src="/assets/pricing-bottle.png"
                        alt="Custom Bottle"
                        className="max-h-[90%] object-contain drop-shadow-[0_6px_8px_rgba(0,0,0,0.5)]"
                      />
                    </div>

                    <div className="flex-1 space-y-1 min-w-0">
                      <h4 className="heading-serif text-[15px] md:text-[17px] font-semibold text-[#f3efe8] truncate">
                        {item.combo_name}
                      </h4>
                      <p className="text-[12px] text-[#b8aea1] tracking-wide">
                        Variant: <span className="text-[#f3efe8] font-bold">{item.size}</span>
                      </p>
                      <p className="text-[12px] text-[#b8aea1] tracking-wide">
                        Qty: <span className="text-[#f3efe8] font-bold">{item.qty}</span>
                      </p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <p className="text-[15px] font-extrabold text-[#f3efe8]">
                        ₹{item.total_price.toLocaleString()}
                      </p>
                      <span className="text-[10px] text-[#6b6057]">
                        ₹{item.price.toLocaleString()} each
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery address review */}
            <div className="card p-6 md:p-8 space-y-5 border border-[#332d28]/50 bg-[#1d1a17]/30 rounded-3xl">
              <div className="flex items-center gap-2.5 pb-3 border-b border-[#332d28]/45">
                <MapPin className="w-5 h-5 text-[#c4823a]" />
                <h3 className="heading-serif text-lg font-bold">Delivery Address</h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <h4 className="heading-serif text-[16px] font-semibold text-[#f3efe8]">
                    {summary.address.consignee_name}
                  </h4>
                  <span className="text-[9px] text-[#c4823a] bg-[#c4823a]/12 border border-[#c4823a]/30 rounded-[4px] px-1.5 py-0.5 tracking-wider uppercase font-bold">
                    {summary.address.address_type}
                  </span>
                </div>
                
                <p className="text-[13.5px] text-[#b8aea1] leading-relaxed">
                  {summary.address.address_line_1}
                  {summary.address.address_line_2 && `, ${summary.address.address_line_2}`}
                  <br />
                  {summary.address.city}, {summary.address.state} - {summary.address.pincode}
                </p>

                <p className="text-[12.5px] text-[#6b6057] pt-1">
                  Mobile: {summary.address.phone_number}
                  {summary.address.secondary_phone_number && ` / ${summary.address.secondary_phone_number}`}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Place Order CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="card p-6 md:p-8 bg-[#1d1a17]/50 border border-[#332d28]/60 rounded-3xl space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[radial-gradient(circle_at_top_right,rgba(196,130,58,0.06),transparent_70%)] pointer-events-none" />

              <div className="flex items-center gap-2.5 pb-4 border-b border-[#332d28]/45">
                <CreditCard className="w-5 h-5 text-[#c4823a]" />
                <h3 className="heading-serif text-lg font-bold">Payment Summary</h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-[14px]">
                  <span className="text-[#b8aea1]">Subtotal (Fragrances)</span>
                  <span className="font-medium text-[#f3efe8]">
                    ₹{summary.total_items_price.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-[14px]">
                  <span className="text-[#b8aea1]">Delivery Charges</span>
                  {summary.delivery_charge === 0 ? (
                    <span className="text-[#c4823a] font-bold tracking-wider text-[11px] uppercase">
                      FREE
                    </span>
                  ) : (
                    <span className="font-medium text-[#f3efe8]">
                      ₹{summary.delivery_charge.toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="flex justify-between text-[14px] pb-4 border-b border-[#332d28]/35">
                  <span className="text-[#b8aea1]">Tax / GST</span>
                  <span className="text-[#6b6057] italic">Included</span>
                </div>

                <div className="flex justify-between items-end pt-2">
                  <span className="heading-serif text-[16px] font-bold text-[#f3efe8]">Total Payable</span>
                  <span className="text-2xl font-extrabold text-[#f3efe8] tracking-tight leading-none">
                    ₹{summary.payable_amount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Place Order CTA */}
              <button
                onClick={handlePlaceOrder}
                disabled={processing}
                className="btn-gold w-full h-[52px] rounded-2xl text-[14.5px] font-bold tracking-wide transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2 group mt-4 shadow-lg"
              >
                <span>{processing ? "Securing Transaction..." : "Authorize & Place Order"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="card p-5 bg-[#1d1a17]/20 border border-[#332d28]/30 rounded-2xl flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-[#c4823a] flex-shrink-0" />
              <div className="space-y-0.5 min-w-0">
                <h4 className="text-[12.5px] font-bold text-[#f3efe8]">Secure Checkout</h4>
                <p className="text-[11px] text-[#b8aea1] leading-tight">
                  Your payments are processed securely with SSL-encryption.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <Suspense
        fallback={
          <div className="min-h-screen flex flex-col items-center justify-center bg-[#151311] gap-4">
            <div className="w-12 h-12 border-2 border-[#332d28] border-t-[#c4823a] rounded-full animate-spin" />
            <p className="text-[#b8aea1] font-medium tracking-wide">Entering checkout...</p>
          </div>
        }
      >
        <CheckoutContent />
      </Suspense>
    </>
  );
}
