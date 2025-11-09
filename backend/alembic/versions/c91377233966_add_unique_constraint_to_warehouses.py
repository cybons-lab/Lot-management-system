"""add unique constraint to warehouses

Revision ID: c91377233966
Revises: 744d13c795bd
Create Date: 2025-11-09 22:18:49.953238

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'c91377233966'
down_revision = '744d13c795bd'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # 既に存在しない場合のみ追加（エラー防止）
    op.create_unique_constraint(
        "uq_warehouses_warehouse_code",
        "warehouses",
        ["warehouse_code"],
    )


def downgrade() -> None:
    op.drop_constraint(
        "uq_warehouses_warehouse_code",
        "warehouses",
        type_="unique",
    )