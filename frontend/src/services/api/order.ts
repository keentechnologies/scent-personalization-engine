const API_BASE_URL = "http://localhost:8000";

export interface CheckoutAddressDetail {
  consignee_name: string;
  phone_number: string;
  secondary_phone_number?: string;
  address_type: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface CheckoutItemDetail {
  pre_cart_item_id: string;
  combo_name: string;
  size: string;
  qty: number;
  price: number;
  total_price: number;
}

export interface CheckoutSummaryResponse {
  success: boolean;
  items: CheckoutItemDetail[];
  total_items_price: number;
  delivery_charge: number;
  payable_amount: number;
  address: CheckoutAddressDetail;
}

export interface CreateOrderResponse {
  success: boolean;
  order_id: string;
  payable_amount: number;
  razorpay_order_id: string;
  message?: string;
}

export interface OrderItemHistory {
  id: string;
  size: string;
  qty: number;
  price: number;
  combo_name: string;
  description: string;
  accord_1_id: string;
  accord_1_volume_ml: number;
  accord_2_id?: string;
  accord_2_volume_ml?: number;
  accord_3_id?: string;
  accord_3_volume_ml?: number;
}

export interface OrderHistoryItem {
  id: string;
  created_at: string;
  status: string;
  total_amount: number;
  delivery_charge: number;
  payable_amount: number;
  address: CheckoutAddressDetail;
  items: OrderItemHistory[];
}

function getHeaders() {
  const token = localStorage.getItem("jwt_token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function fetchCheckoutSummary(
  sessionId: string,
  addressId: string
): Promise<CheckoutSummaryResponse> {
  const res = await fetch(
    `${API_BASE_URL}/orders/checkout-summary?session_id=${sessionId}&address_id=${addressId}`,
    {
      method: "GET",
      headers: getHeaders(),
    }
  );
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.detail || "Failed to fetch checkout summary.");
  }
  return res.json();
}

export async function createOrder(
  sessionId: string,
  addressId: string
): Promise<CreateOrderResponse> {
  const res = await fetch(`${API_BASE_URL}/orders/create`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      session_id: sessionId,
      address_id: addressId,
    }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.detail || "Failed to create order.");
  }
  return res.json();
}

export async function verifyPayment(
  orderId: string,
  razorpayPaymentId?: string,
  razorpaySignature?: string
): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${API_BASE_URL}/orders/verify-payment`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      order_id: orderId,
      razorpay_payment_id: razorpayPaymentId,
      razorpay_signature: razorpaySignature,
    }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.detail || "Failed to verify payment.");
  }
  return res.json();
}

export async function fetchOrderHistory(): Promise<OrderHistoryItem[]> {
  const res = await fetch(`${API_BASE_URL}/orders/history`, {
    method: "GET",
    headers: getHeaders(),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.detail || "Failed to fetch order history.");
  }
  return res.json();
}
