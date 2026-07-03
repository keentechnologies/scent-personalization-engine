"""add deleted column to addresses

Revision ID: i5d6e7f8g9h0
Revises: h4c5d6e7f8g9
Create Date: 2026-07-01 21:24:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'i5d6e7f8g9h0'
down_revision: Union[str, Sequence[str], None] = 'h4c5d6e7f8g9'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.add_column(
        'addresses',
        sa.Column('deleted', sa.Boolean(), nullable=False, server_default='false')
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_column('addresses', 'deleted')
