import copy
from typing import Dict, List
from uuid import UUID

from sqlalchemy.orm import Session
from sqlalchemy.orm.attributes import flag_modified

from app.models.user_accord_score_table import UserAccordScoreTable
from app.models.master_accord_table import MasterAccordTable
from app.models.master_personality_accord_mapping import MasterPersonalityAccordMapping
from app.models.master_perception_accord_mapping import MasterPerceptionAccordMapping
from app.models.master_gender_table import MasterGenderTable
from app.models.master_climate_accord_mapping import MasterClimateAccordMapping
from app.models.personality_score_table import PersonalityScoreTable
from app.models.perception_score_table import PerceptionScoreTable
from app.models.gender_score_table import GenderScoreTable
from app.models.master_sensitivity_accord_mapping import MasterSensitivityAccordMapping
from app.models.sensitivity_filter import SensitivityFilter
from app.models.master_climate_table import MasterClimateTable

# ---------------------------------------------------------------------------
# Internal helpers
# ---------------------------------------------------------------------------

def _get_all_accord_keys(db: Session) -> List[str]:
    rows = db.query(MasterAccordTable.key).order_by(MasterAccordTable.id).all()
    return [row.key for row in rows]


def _get_or_create_accord_score_row(
    session_id: UUID,
    db: Session,
    accord_keys: List[str],
) -> UserAccordScoreTable:
    row = (
        db.query(UserAccordScoreTable)
        .filter(UserAccordScoreTable.session_id == session_id)
        .first()
    )

    if not row:
        initial_scores = {key: {} for key in accord_keys}
        row = UserAccordScoreTable(
            session_id=session_id,
            accord_scores=initial_scores,
        )
        db.add(row)
        db.flush()

    return row


# ---------------------------------------------------------------------------
# Private score computers (no DB write, return partial score dicts)
# ---------------------------------------------------------------------------

def _compute_personality_scores(
    session_id: UUID,
    db: Session,
) -> Dict[str, float]:
    personality_row = (
        db.query(PersonalityScoreTable)
        .filter(PersonalityScoreTable.session_id == session_id)
        .first()
    )

    personality_score_map = {
        "p1": personality_row.pr_1,
        "p2": personality_row.pr_2,
        "p3": personality_row.pr_3,
        "p4": personality_row.pr_4,
        "p5": personality_row.pr_5,
    }

    mappings = (
        db.query(
            MasterPersonalityAccordMapping.accord_key,
            MasterPersonalityAccordMapping.personality_key,
        )
        .all()
    )

    return {
        mapping.accord_key: personality_score_map.get(mapping.personality_key, 0) / 100
        for mapping in mappings
    }


def _compute_perception_scores(
    session_id: UUID,
    db: Session,
    accord_keys: List[str],
) -> Dict[str, float]:
    perception_row = (
        db.query(PerceptionScoreTable)
        .filter(PerceptionScoreTable.session_id == session_id)
        .first()
    )

    selected_perception_keys = {
        f"d{i}"
        for i in range(1, 23)
        if getattr(perception_row, f"p_{i}", False)
    }

    mappings = (
        db.query(
            MasterPerceptionAccordMapping.accord_key,
            MasterPerceptionAccordMapping.perception_key,
            MasterPerceptionAccordMapping.score_value,
        )
        .all()
    )

    accord_numerator: Dict[str, float] = {key: 0.0 for key in accord_keys}
    accord_denominator: Dict[str, float] = {key: 0.0 for key in accord_keys}

    for mapping in mappings:
        accord_denominator[mapping.accord_key] += mapping.score_value
        if mapping.perception_key in selected_perception_keys:
            accord_numerator[mapping.accord_key] += mapping.score_value

    return {
        key: round(accord_numerator[key] / accord_denominator[key], 4)
        if accord_denominator[key] > 0 else 0.0
        for key in accord_keys
    }


def _compute_gender_scores(
    session_id: UUID,
    db: Session,
) -> Dict[str, float]:
    gender_row = (
        db.query(GenderScoreTable)
        .filter(GenderScoreTable.session_id == session_id)
        .first()
    )
    
    masc = gender_row.masculine_score
    fem = gender_row.feminine_score
    uni = gender_row.unisex_score

    mappings = (
        db.query(
            MasterGenderTable.accord_key,
            MasterGenderTable.male_value,
            MasterGenderTable.female_value,
            MasterGenderTable.unisex_value,
        )
        .all()
    )

    return {
        mapping.accord_key: round(
            (mapping.male_value * masc)
            + (mapping.female_value * fem)
            + (mapping.unisex_value * uni),
            4
        )
        for mapping in mappings
    }


def _compute_s_breach_count(session_id: UUID, db: Session) -> Dict[str, int]:
    sensitivity_row = (
        db.query(SensitivityFilter)
        .filter(SensitivityFilter.session_id == session_id)
        .first()
    )

    user_values = {
        "s1": 1 if getattr(sensitivity_row, "has_migraine_issues", False) else 0,
        "s2": 1 if getattr(sensitivity_row, "has_respiratory_issues", False) else 0,
        "s3": 1 if getattr(sensitivity_row, "has_skin_sensitivity", False) else 0,
        "s4": 1 if getattr(sensitivity_row, "has_body_odour_concern", False) else 0,
        "s5": 1 if getattr(sensitivity_row, "has_strong_smell_discomfort", False) else 0,
    }

    mappings = (
        db.query(
            MasterSensitivityAccordMapping.accord_key,
            MasterSensitivityAccordMapping.sensitivity_key,
            MasterSensitivityAccordMapping.is_flagged,
        )
        .all()
    )

    accord_breaches: Dict[str, int] = {}
    for mapping in mappings:
        user_val = user_values.get(mapping.sensitivity_key, 0)
        is_flagged = mapping.is_flagged
        product = user_val * is_flagged
        accord_breaches[mapping.accord_key] = accord_breaches.get(mapping.accord_key, 0) + int(product)

    return accord_breaches

def _compute_c_breach_count(session_id: UUID, db: Session, climate_result: str) -> Dict[str, int]:
    
    climate_key = climate_result
    
    check = (
        db.query(
            MasterClimateTable.key
        )
        .where(MasterClimateTable.key == climate_key).one_or_none()
    )
    
    if check is None:
        raise ValueError("Climate not found")
    
    mappings = (
        db.query(
            MasterClimateAccordMapping.accord_key,
            MasterClimateAccordMapping.breach_count,
        )
        .where(MasterClimateAccordMapping.climate_key == climate_key)
        .all()
    )
    
    return {mapping.accord_key: mapping.breach_count for mapping in mappings}


def _compute_competitive_ranks(scores: Dict[str, float]) -> Dict[str, int]:
    # Sort keys by score descending
    sorted_keys = sorted(scores.keys(), key=lambda k: scores[k], reverse=True)
    
    ranks = {}
    current_rank = 1
    for i, key in enumerate(sorted_keys):
        if i > 0 and scores[key] < scores[sorted_keys[i - 1]]:
            current_rank = i + 1
        ranks[key] = current_rank
    return ranks

# ---------------------------------------------------------------------------
# Public orchestrator — only function to call from outside this module
# ---------------------------------------------------------------------------

def compute_and_store_all_accord_scores(
    session_id: UUID,
    db: Session,
    climate_result: str
) -> dict:
    accord_keys = _get_all_accord_keys(db)
    row = _get_or_create_accord_score_row(session_id, db, accord_keys)

    personality_scores = _compute_personality_scores(session_id, db)
    perception_scores = _compute_perception_scores(session_id, db, accord_keys)
    gender_scores = _compute_gender_scores(session_id, db)
    sensitivity_breach_count = _compute_s_breach_count(session_id,db)
    c_breach_count = _compute_c_breach_count(session_id,db,climate_result)
    
    personality_ranks = _compute_competitive_ranks(personality_scores)
    perception_ranks = _compute_competitive_ranks(perception_scores)
    
    combined_scores = {
        key: round((personality_scores.get(key, 0.0) + perception_scores.get(key, 0.0)) / 2, 4)
        for key in accord_keys
    }
    
    combined_ranks = _compute_competitive_ranks(combined_scores)

    updated_scores = copy.deepcopy(row.accord_scores)

    for key in accord_keys:
        p_score = personality_scores.get(key, 0.0)
        perc_score = perception_scores.get(key, 0.0)
        combined_val = combined_scores.get(key, 0.0)
        
        s_breach = sensitivity_breach_count.get(key,0)
        c_breach = c_breach_count.get(key,0)
        g_score = gender_scores.get(key,0.0)
        
        pr_rank = personality_ranks.get(key)
        pc_rank = perception_ranks.get(key)
        cb_rank = combined_ranks.get(key)
        
        
        f_out_sensitivity_and_climate = 1 if max(s_breach, c_breach) > 0 else 0
        f_out_gender = 1 if g_score < 0.0001 else 0
        f_out_any = max(f_out_sensitivity_and_climate,f_out_gender)
        
        combined_override_possibility = 1 if(cb_rank <= 15 and f_out_any ==1) else 0
        
        sensitivity_breach_condition = (
            (s_breach == 1 and (
                pr_rank <= 8 or
                pc_rank <= 8 or
                cb_rank <= 6
            ))
            or
            (s_breach == 2 and (
                pr_rank <= 5 or
                pc_rank <= 5 or
                cb_rank <= 3
            ))
        )

        sensitivity_override_possibility = int(
            sensitivity_breach_condition
            and combined_override_possibility == 1
        )
        
        climate_breach_condition = (
            (c_breach == 1 and (
                pr_rank <= 10 or
                pc_rank <= 10 or
                cb_rank <= 8
            ))
            or
            (c_breach == 2 and (
                pr_rank <= 7 or
                pc_rank <= 7 or
                cb_rank <= 5
            ))
            or
            (c_breach == 3 and (
                pr_rank <= 5 or
                pc_rank <= 5 or
                cb_rank <= 3
            ))
        )

        climate_override_possibility = int(
            climate_breach_condition
            and combined_override_possibility == 1
        )
        
        bring_back_flag = max(sensitivity_override_possibility,climate_override_possibility)
        
    
        updated_scores[key]["personality_score"] = p_score
        updated_scores[key]["perception_score"] = perc_score
        updated_scores[key]["combined_score"] = combined_val
        updated_scores[key]["gender_score"] = g_score
        updated_scores[key]["sensitivity_breach_count"] = s_breach
        updated_scores[key]["climate_breach_count"] = c_breach
        updated_scores[key]["f_out_sensitivity_and_climate"] = f_out_sensitivity_and_climate
        updated_scores[key]["f_out_gender"] = f_out_gender
        updated_scores[key]["f_out_any"] = f_out_any
        
        updated_scores[key]["personality_rank"] = pr_rank
        updated_scores[key]["perception_rank"] = pc_rank
        updated_scores[key]["combined_rank"] = cb_rank
        
        updated_scores[key]["combined_override_possibility"] = combined_override_possibility
        updated_scores[key]["sensitivity_override_possibility"] = sensitivity_override_possibility
        updated_scores[key]["climate_override_possibility"] = climate_override_possibility
        
        updated_scores[key]["bring_back_flag"] = bring_back_flag
        
        
    row.accord_scores = updated_scores
    flag_modified(row, "accord_scores")
    db.commit()

    return row.accord_scores
