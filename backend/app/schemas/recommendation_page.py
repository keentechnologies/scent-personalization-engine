from typing import Optional
from uuid import UUID
from pydantic import BaseModel


# ── Formula accord item ──────────────────────────────────────────
class AccordFormulaItem(BaseModel):
    accord_id: str
    accord_name: str
    volume_ml: float


# ── Single combination shown on recommendation page ──────────────
class RecommendationCombination(BaseModel):
    combo_id: str               # e.g. "comb_1" — from LLM output id field
    recommendation_rank: int
    is_default_selected: bool
    status: str                 # not_selected | selected | removed | purchased
    combo_name: str
    description: str
    justification: str
    formula: list[AccordFormulaItem]
    quantity: int
    total_volume_ml: float


# ── Response for GET /recommendation/page-data ───────────────────
class RecommendationPageResponse(BaseModel):
    success: bool
    session_id: Optional[str] = None
    combinations: Optional[list[RecommendationCombination]] = None
    message: Optional[str] = None


# ── Request for POST /recommendation/confirm ─────────────────────
class ConfirmSelectionRequest(BaseModel):
    session_id: UUID
    # combo_ids of the combinations the user selected (e.g. ["comb_1", "comb_3"])
    selected_combo_ids: list[str]
    # Optional qty per combo_id: { "comb_1": 2, "comb_2": 1 }
    qty_updates: Optional[dict[str, int]] = None


# ── Response for POST /recommendation/confirm ────────────────────
class ConfirmSelectionResponse(BaseModel):
    success: bool
    message: str
    selected_count: Optional[int] = None
