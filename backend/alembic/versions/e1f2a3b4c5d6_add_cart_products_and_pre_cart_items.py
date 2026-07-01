"""add cart_products and pre_cart_items tables

Revision ID: e1f2a3b4c5d6
Revises: da35a4f8bbe4
Create Date: 2026-07-01 17:45:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = 'e1f2a3b4c5d6'
down_revision: Union[str, Sequence[str], None] = 'da35a4f8bbe4'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""

    # 1. Create pre_cart_status enum type — checkfirst avoids error if already exists
    pre_cart_status_enum = postgresql.ENUM(
        'not_selected', 'selected', 'removed', 'purchased',
        name='precartstatus',
        create_type=False,
    )
    pre_cart_status_enum.create(op.get_bind(), checkfirst=True)

    # 2. Create cart_products table first (no FK dependencies)
    op.create_table(
        'cart_products',
        sa.Column('id', sa.UUID(), nullable=False),
        sa.Column('order_id', sa.UUID(), nullable=True),
        sa.Column('accord_1_id', sa.String(), nullable=False),
        sa.Column('accord_1_volume_ml', sa.Numeric(5, 2), nullable=False),
        sa.Column('accord_2_id', sa.String(), nullable=True),
        sa.Column('accord_2_volume_ml', sa.Numeric(5, 2), nullable=True),
        sa.Column('accord_3_id', sa.String(), nullable=True),
        sa.Column('accord_3_volume_ml', sa.Numeric(5, 2), nullable=True),
        sa.Column('quantity', sa.Integer(), nullable=False, server_default='1'),
        sa.Column('combo_name', sa.String(), nullable=False),
        sa.Column('description', sa.Text(), nullable=False),
        sa.Column('justification', sa.Text(), nullable=False),
        sa.Column('deleted_at', postgresql.TIMESTAMP(timezone=True), nullable=True),
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
        sa.PrimaryKeyConstraint('id'),
    )

    # 3. Create pre_cart_items table (FK → users, user_sessions, cart_products)
    op.create_table(
        'pre_cart_items',
        sa.Column('id', sa.UUID(), nullable=False),
        sa.Column('user_id', sa.UUID(), nullable=False),
        sa.Column('session_id', sa.UUID(), nullable=False),
        sa.Column('product_id', sa.UUID(), nullable=False),
        sa.Column('recommendation_rank', sa.SmallInteger(), nullable=False),
        sa.Column('is_default_selected', sa.Boolean(), nullable=False, server_default='false'),
        sa.Column(
            'status',
            pre_cart_status_enum,
            nullable=False,
            server_default='not_selected',
        ),
        sa.Column('deleted_at', postgresql.TIMESTAMP(timezone=True), nullable=True),
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
        sa.ForeignKeyConstraint(['user_id'], ['users.id']),
        sa.ForeignKeyConstraint(['session_id'], ['user_sessions.id']),
        sa.ForeignKeyConstraint(['product_id'], ['cart_products.id']),
        sa.PrimaryKeyConstraint('id'),
    )

    # 4. Index for fast session-based lookups
    op.create_index(
        'ix_pre_cart_items_session_id',
        'pre_cart_items',
        ['session_id'],
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_index('ix_pre_cart_items_session_id', table_name='pre_cart_items')
    op.drop_table('pre_cart_items')
    op.drop_table('cart_products')

    # Drop the enum type
    pre_cart_status_enum = postgresql.ENUM(
        'not_selected', 'selected', 'removed', 'purchased',
        name='precartstatus'
    )
    pre_cart_status_enum.drop(op.get_bind())
