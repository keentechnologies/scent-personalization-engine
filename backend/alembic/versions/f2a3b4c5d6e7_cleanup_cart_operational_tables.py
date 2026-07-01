"""cleanup cart operational tables and add activity trace table

Revision ID: f2a3b4c5d6e7
Revises: e1f2a3b4c5d6
Create Date: 2026-07-01 20:25:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = 'f2a3b4c5d6e7'
down_revision: Union[str, Sequence[str], None] = 'e1f2a3b4c5d6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # 1. Drop status enum and deleted_at from pre_cart_items
    op.drop_column('pre_cart_items', 'status')
    op.drop_column('pre_cart_items', 'deleted_at')

    # 2. Drop deleted_at from cart_products
    op.drop_column('cart_products', 'deleted_at')

    # 3. Create the new cart_activity_traces table
    op.create_table(
        'cart_activity_traces',
        sa.Column('id', sa.UUID(), nullable=False),
        sa.Column('user_id', sa.UUID(), nullable=False),
        sa.Column('session_id', sa.UUID(), nullable=False),
        sa.Column('action_type', sa.String(), nullable=False),
        sa.Column('recommendation_rank', sa.SmallInteger(), nullable=False),
        sa.Column('combo_name', sa.String(), nullable=False),
        sa.Column('formula_snapshot', postgresql.JSONB(astext_type=sa.Text()), nullable=False),
        sa.Column('old_quantity', sa.Integer(), nullable=True),
        sa.Column('new_quantity', sa.Integer(), nullable=True),
        sa.Column(
            'created_at',
            postgresql.TIMESTAMP(timezone=True),
            server_default=sa.text('now()'),
            nullable=False,
        ),
        sa.PrimaryKeyConstraint('id')
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_table('cart_activity_traces')

    # Re-add deleted_at to cart_products
    op.add_column('cart_products', sa.Column('deleted_at', postgresql.TIMESTAMP(timezone=True), nullable=True))

    # Re-add columns to pre_cart_items
    op.add_column('pre_cart_items', sa.Column('deleted_at', postgresql.TIMESTAMP(timezone=True), nullable=True))
    op.add_column(
        'pre_cart_items',
        sa.Column(
            'status',
            postgresql.ENUM('not_selected', 'selected', 'removed', 'purchased', name='precartstatus'),
            nullable=False,
            server_default='not_selected'
        )
    )
