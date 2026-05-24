"""cleanup quiz sessions

Revision ID: ce141e4293c8
Revises: 1af0c10b5bd3
Create Date: 2026-05-24 17:08:05.870467

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = 'ce141e4293c8'
down_revision: Union[str, Sequence[str], None] = '1af0c10b5bd3'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:

    op.drop_constraint(
        "sensitivity_filters_session_id_fkey",
        "sensitivity_filters",
        type_="foreignkey"
    )

    op.drop_constraint(
        "sensitivity_filter_history_session_id_fkey",
        "sensitivity_filter_history",
        type_="foreignkey"
    )

    op.create_foreign_key(
        None,
        "sensitivity_filters",
        "user_sessions",
        ["session_id"],
        ["id"]
    )

    op.create_foreign_key(
        None,
        "sensitivity_filter_history",
        "user_sessions",
        ["session_id"],
        ["id"]
    )

    op.drop_table("quiz_sessions")

def downgrade() -> None:

    pass