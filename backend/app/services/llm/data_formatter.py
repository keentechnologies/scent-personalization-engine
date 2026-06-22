from sqlalchemy.orm import Session
from uuid import UUID
from typing import Dict, Any, List

from app.models.user_accord_score_table import UserAccordScoreTable
from app.models.gender_score_table import GenderScoreTable
from app.models.sensitivity_filter import SensitivityFilter
from app.models.occasion_table import OccasionTable
from app.models.master_accord_table import MasterAccordTable
from app.constants.occasion_types import OCCASION_TYPES

class DataFormatter:
    """
    Formats the session database records (scores, gender preferences, sensitivity, occasions)
    into a structured text prompt for the LLM.
    """
    def __init__(self, db: Session):
        self.db = db

    def format_all_data(self, session_id: UUID) -> str:
        # 1. Fetch accord score table from database
        accord_scores_row = (
            self.db.query(UserAccordScoreTable)
            .filter(UserAccordScoreTable.session_id == session_id)
            .first()
        )
        if not accord_scores_row:
            raise ValueError(f"No accord scores found for session: {session_id}")

        accord_scores = accord_scores_row.accord_scores

        # 2. Get master accord mapping for friendly names and note types
        master_accords = self.db.query(MasterAccordTable).all()
        accord_meta = {
            acc.key: {"name": acc.name, "note_type": acc.note_type}
            for acc in master_accords
        }

        # 3. Format accord scores table
        formatted_accords = []
        for key, scores in accord_scores.items():
            meta = accord_meta.get(key, {"name": key, "note_type": "Unknown"})
            formatted_accords.append({
                "key": key,
                "name": meta["name"],
                "note_type": meta["note_type"],
                "combined_score": scores.get("combined_score", 0.0),
                "perception_score": scores.get("perception_score", 0.0),
                "personality_score": scores.get("personality_score", 0.0),
                "combined_rank": scores.get("combined_rank", 99),
                "gender_score": scores.get("gender_score", 0.0),
                "f_out_any": scores.get("f_out_any", 0),
                "bring_back_flag": scores.get("bring_back_flag", 0),
                "sensitivity_breach_count": scores.get("sensitivity_breach_count", 0),
                "climate_breach_count": scores.get("climate_breach_count", 0),
            })

        # Sort by combined rank (ascending)
        formatted_accords.sort(key=lambda x: x["combined_rank"])

        # Format markdown table
        markdown_table = (
            "| Accord Name | Note Type | Combined Score | Personality Score | Perception Score | Gender Score | f_out_any | bring_back_flag | Sensitivity Breaches | Climate Breaches |\n"
            "|-------------|-----------|----------------|-------------------|------------------|--------------|-----------|------------------|----------------------|------------------|\n"
        )
        for acc in formatted_accords:
            markdown_table += (
                f"| {acc['name']} | {acc['note_type']} | {acc['combined_score']:.4f} | "
                f"{acc['personality_score']:.4f} | {acc['perception_score']:.4f} | {acc['gender_score']:.4f} | "
                f"{acc['f_out_any']} | {acc['bring_back_flag']} | "
                f"{acc['sensitivity_breach_count']} | {acc['climate_breach_count']} |\n"
            )

        # 4. Fetch and format gender preferences
        gender_row = (
            self.db.query(GenderScoreTable)
            .filter(GenderScoreTable.session_id == session_id)
            .first()
        )
        gender_prefs_str = "No gender preferences found."
        if gender_row:
            def format_score(score):
                if score == 1.0: return "Yes"
                if score == 0.5: return "Open / Do not mind"
                return "No"

            gender_prefs_str = (
                f"* Masculine: {format_score(gender_row.masculine_score)}\n"
                f"* Feminine: {format_score(gender_row.feminine_score)}\n"
                f"* Unisex: {format_score(gender_row.unisex_score)}"
            )

        # 5. Fetch and format sensitivity issues
        sensitivity_row = (
            self.db.query(SensitivityFilter)
            .filter(SensitivityFilter.session_id == session_id)
            .first()
        )
        flagged_issues = []
        if sensitivity_row:
            if sensitivity_row.has_migraine_issues: flagged_issues.append("Migraines")
            if sensitivity_row.has_respiratory_issues: flagged_issues.append("Respiratory Irritation")
            if sensitivity_row.has_skin_sensitivity: flagged_issues.append("Skin Sensitivity")
            if sensitivity_row.has_strong_smell_discomfort: flagged_issues.append("Discomfort with Strong Smells")
            if sensitivity_row.has_body_odour_concern: flagged_issues.append("Body Odour Concerns")
        
        sensitivity_str = (
            ", ".join(flagged_issues) if flagged_issues else "None reported"
        )

        # 6. Fetch and format occasions
        occasion_row = (
            self.db.query(OccasionTable)
            .filter(OccasionTable.session_id == session_id)
            .first()
        )
        selected_occasions = []
        if occasion_row:
            for oc_key, oc_name in OCCASION_TYPES.items():
                if getattr(occasion_row, oc_key, False):
                    selected_occasions.append(oc_name)

        occasions_str = (
            ", ".join(selected_occasions) if selected_occasions else "None selected"
        )

        # Assemble full formatted message
        user_message = (
            "# FRAGRANCE RECOMMENDATION INPUT DATA\n\n"
            "Below is the computed table of accords and user profile parameters to build the fragrance recommendations.\n\n"
            "## 1. ACCORD SCORES TABLE\n"
            f"{markdown_table}\n"
            "## 2. GENDER PREFERENCES\n"
            f"{gender_prefs_str}\n\n"
            "## 3. SENSITIVITY ISSUES\n"
            f"User flagged issues: {sensitivity_str}\n\n"
            "## 4. SELECTED OCCASIONS\n"
            f"User selected occasions: {occasions_str}\n\n"
            "---\n"
            "Please apply the workflow rules to find the top 10 accords, build and score 2-3 optimal accord combinations, map them to occasions, and select the final recommendations."
        )
        return user_message
