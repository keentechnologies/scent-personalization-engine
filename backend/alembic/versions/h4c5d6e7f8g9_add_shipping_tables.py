"""add shipping address tables

Revision ID: h4c5d6e7f8g9
Revises: g3b4c5d6e7f8
Create Date: 2026-07-01 21:12:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = 'h4c5d6e7f8g9'
down_revision: Union[str, Sequence[str], None] = 'g3b4c5d6e7f8'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # 1. Create addresses table
    op.create_table(
        'addresses',
        sa.Column('id', sa.UUID(), nullable=False),
        sa.Column('consignee_name', sa.String(), nullable=False),
        sa.Column('phone_number', sa.String(length=15), nullable=False),
        sa.Column('secondary_phone_number', sa.String(length=15), nullable=True),
        sa.Column('address_type', sa.String(), nullable=False, server_default='home'),
        sa.Column('address_line_1', sa.String(), nullable=False),
        sa.Column('address_line_2', sa.String(), nullable=True),
        sa.Column('city', sa.String(), nullable=False),
        sa.Column('state', sa.String(), nullable=False),
        sa.Column('pincode', sa.String(length=10), nullable=False),
        sa.Column(
            'created_at',
            postgresql.TIMESTAMP(timezone=True),
            server_default=sa.text('now()'),
            nullable=False,
        ),
        sa.Column(
            'updated_at',
            postgresql.TIMESTAMP(timezone=True),
            server_default=sa.text('now()'),
            nullable=False,
        ),
        sa.PrimaryKeyConstraint('id')
    )

    # 2. Create user_addresses junction table
    op.create_table(
        'user_addresses',
        sa.Column('id', sa.UUID(), nullable=False),
        sa.Column('user_id', sa.UUID(), nullable=False),
        sa.Column('address_id', sa.UUID(), nullable=False),
        sa.Column('is_default', sa.Boolean(), nullable=False, server_default='false'),
        sa.Column(
            'created_at',
            postgresql.TIMESTAMP(timezone=True),
            server_default=sa.text('now()'),
            nullable=False,
        ),
        sa.Column(
            'updated_at',
            postgresql.TIMESTAMP(timezone=True),
            server_default=sa.text('now()'),
            nullable=False,
        ),
        sa.ForeignKeyConstraint(['address_id'], ['addresses.id']),
        sa.ForeignKeyConstraint(['user_id'], ['users.id']),
        sa.PrimaryKeyConstraint('id')
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_table('user_addresses')
    op.drop_table('addresses')
