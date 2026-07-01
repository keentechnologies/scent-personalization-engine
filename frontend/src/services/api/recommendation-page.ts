const API_BASE_URL = "http://localhost:8000";

// ── Types ─────────────────────────────────────────────────────────

export interface AccordFormulaItem {
  accord_id: string;
  accord_name: string;
  volume_ml: number;
}

export interface RecommendationCombination {
  combo_id: string;            // e.g. "comb_1" — identifier for selection
  recommendation_rank: number;
  is_default_selected: boolean;
  status: string;
  combo_name: string;
  description: string;
  justification: string;
  formula: AccordFormulaItem[];
  quantity: number;
  total_volume_ml: number;
}

export interface RecommendationPageData {
  success: boolean;
  session_id: string;
  combinations: RecommendationCombination[];
  message?: string;
}

export interface ConfirmSelectionPayload {
  session_id: string;
  selected_combo_ids: string[];            // e.g. ["comb_1", "comb_3"]
  qty_updates?: Record<string, number>;   // e.g. { "comb_1": 2 }
}

export interface ConfirmSelectionResponse {
  success: boolean;
  message: string;
  selected_count?: number;
}

// ── Fetch recommendation page data ───────────────────────────────

export async function fetchRecommendationPageData(
  sessionId: string
): Promise<RecommendationPageData> {
  const token = localStorage.getItem("jwt_token");

  const response = await fetch(
    `${API_BASE_URL}/recommendation/page-data?session_id=${sessionId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.log("RECOMMENDATION PAGE DATA ERROR", errorData);
    throw new Error(errorData?.detail || "Failed to load recommendations.");
  }

  return response.json();
}

// ── Confirm cart selection ────────────────────────────────────────

export async function confirmSelection(
  payload: ConfirmSelectionPayload
): Promise<ConfirmSelectionResponse> {
  const token = localStorage.getItem("jwt_token");

  const response = await fetch(`${API_BASE_URL}/recommendation/confirm`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.log("CONFIRM SELECTION ERROR", errorData);
    throw new Error(errorData?.detail || "Failed to confirm selection.");
  }

  return response.json();
}
