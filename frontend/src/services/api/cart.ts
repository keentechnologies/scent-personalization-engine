const API_BASE_URL = "http://localhost:8000";

// ── Types ─────────────────────────────────────────────────────────

export interface AccordFormulaItem {
  accord_id: string;
  accord_name: string;
  volume_ml: number;
}

export interface CartSelectionItem {
  cart_item_id?: string;
  qty: number;
  size: string;
}

export interface CartComboResponseItem {
  pre_cart_item_id: string;
  recommendation_rank: number;
  is_default_selected: boolean;
  combo_name: string;
  description: string;
  justification: string;
  formula: AccordFormulaItem[];
  selections: CartSelectionItem[];
}

export interface CartDataResponse {
  success: boolean;
  session_id?: string;
  combinations?: CartComboResponseItem[];
  message?: string;
}

export interface SaveCartSelection {
  size: string;
  qty: number;
}

export interface SaveCartItemRequest {
  pre_cart_item_id: string;
  selections: SaveCartSelection[];
}

export interface SaveCartPayload {
  session_id: string;
  items: SaveCartItemRequest[];
}

export interface LogTracePayload {
  session_id: string;
  pre_cart_item_id?: string;
  combo_name?: string;
  action_type: string;
  size?: string;
  old_qty?: number;
  new_qty?: number;
}

// ── API Operations ────────────────────────────────────────────────

export async function fetchCartData(sessionId: string): Promise<CartDataResponse> {
  const token = localStorage.getItem("jwt_token");

  const response = await fetch(
    `${API_BASE_URL}/cart?session_id=${sessionId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.log("FETCH CART DATA ERROR", errorData);
    throw new Error(errorData?.detail || "Failed to load cart.");
  }

  return response.json();
}

export async function saveCartSelection(payload: SaveCartPayload): Promise<{ success: boolean; message: string }> {
  const token = localStorage.getItem("jwt_token");

  const response = await fetch(`${API_BASE_URL}/cart/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.log("SAVE CART ERROR", errorData);
    throw new Error(errorData?.detail || "Failed to save cart selections.");
  }

  return response.json();
}

export async function logCartTrace(payload: LogTracePayload): Promise<{ success: boolean; message: string }> {
  const token = localStorage.getItem("jwt_token");

  const response = await fetch(`${API_BASE_URL}/cart/trace`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.log("LOG TRACE ERROR", errorData);
    throw new Error(errorData?.detail || "Failed to log cart trace.");
  }

  return response.json();
}
