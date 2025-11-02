"""Add forecast table (daily/dekad/monthly) and extend order_lines"""

import sqlalchemy as sa
from alembic import op

# Alembic識別子
revision = "001_add_forecast"
down_revision = None  # 初回マイグレーションなので None
branch_labels = None
depends_on = None


def upgrade():
    # forecast テーブル作成
    # (SQLite対応：ユニーク制約は create_table 内に内包します)
    op.create_table(  # type: ignore[attr-defined]
        "forecast",
        sa.Column("forecast_id", sa.String(36), primary_key=True),
        sa.Column("product_id", sa.String(64), nullable=False),
        sa.Column("client_id", sa.String(64), nullable=False),
        sa.Column("supplier_id", sa.String(64), nullable=False),
        sa.Column(
            "granularity", sa.String(16), nullable=False
        ),  # 'daily'|'dekad'|'monthly'
        sa.Column("date_day", sa.Date(), nullable=True),  # daily 用
        sa.Column(
            "date_dekad_start", sa.Date(), nullable=True
        ),  # dekad 用（1/11/21 のいずれか）
        sa.Column("year_month", sa.String(7), nullable=True),  # monthly 用 'YYYY-MM'
        sa.Column("qty_forecast", sa.Integer(), nullable=False),
        # 版管理
        sa.Column("version_no", sa.Integer(), nullable=False, server_default="1"),
        sa.Column(
            "version_issued_at",
            sa.DateTime(),
            nullable=False,
            server_default=sa.text("CURRENT_TIMESTAMP"),
        ),
        sa.Column(
            "source_system", sa.String(32), nullable=False, server_default="external"
        ),
        sa.Column(
            "is_active", sa.Boolean(), nullable=False, server_default=sa.text("1")
        ),
        # 監査
        sa.Column(
            "created_at",
            sa.DateTime(),
            nullable=False,
            server_default=sa.text("CURRENT_TIMESTAMP"),
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(),
            nullable=False,
            server_default=sa.text("CURRENT_TIMESTAMP"),
        ),
        # 粒度ごとの相互排他 CHECK
        sa.CheckConstraint(
            "("
            " (granularity='daily'   AND date_day IS NOT NULL     AND date_dekad_start IS NULL AND year_month IS NULL)"
            " OR "
            " (granularity='dekad'   AND date_dekad_start IS NOT NULL AND date_day IS NULL     AND year_month IS NULL)"
            " OR "
            " (granularity='monthly' AND year_month IS NOT NULL   AND date_day IS NULL         AND date_dekad_start IS NULL)"
            ")",
            name="ck_forecast_period_key_exclusivity",
        ),
        sa.CheckConstraint(
            "granularity in ('daily','dekad','monthly')", name="ck_forecast_granularity"
        ),
        sa.CheckConstraint("qty_forecast >= 0", name="ck_forecast_qty_nonneg"),
        # ★【修正点】ユニーク制約を create_table の引数として内包
        sa.UniqueConstraint(
            "product_id",
            "client_id",
            "supplier_id",
            "granularity",
            "date_day",
            "version_no",
            name="uq_forecast_daily",
        ),
        sa.UniqueConstraint(
            "product_id",
            "client_id",
            "supplier_id",
            "granularity",
            "date_dekad_start",
            "version_no",
            name="uq_forecast_dekad",
        ),
        sa.UniqueConstraint(
            "product_id",
            "client_id",
            "supplier_id",
            "granularity",
            "year_month",
            "version_no",
            name="uq_forecast_monthly",
        ),
    )

    # 検索用 index
    op.create_index(  # type: ignore[attr-defined]
        "ix_forecast_active_daily",
        "forecast",
        [
            "product_id",
            "client_id",
            "supplier_id",
            "granularity",
            "date_day",
            "is_active",
        ],
    )
    op.create_index(  # type: ignore[attr-defined]
        "ix_forecast_active_dekad",
        "forecast",
        [
            "product_id",
            "client_id",
            "supplier_id",
            "granularity",
            "date_dekad_start",
            "is_active",
        ],
    )
    op.create_index(  # type: ignore[attr-defined]
        "ix_forecast_active_monthly",
        "forecast",
        [
            "product_id",
            "client_id",
            "supplier_id",
            "granularity",
            "year_month",
            "is_active",
        ],
    )

    # order_lines の拡張
    op.add_column("order_lines", sa.Column("forecast_id", sa.String(36), nullable=True))  # type: ignore[attr-defined]
    op.add_column(
        "order_lines", sa.Column("forecast_granularity", sa.String(16), nullable=True)
    )  # type: ignore[attr-defined]
    op.add_column(
        "order_lines", sa.Column("forecast_match_status", sa.String(24), nullable=True)
    )  # type: ignore[attr-defined]
    op.add_column("order_lines", sa.Column("forecast_qty", sa.Integer(), nullable=True))  # type: ignore[attr-defined]
    op.add_column(
        "order_lines", sa.Column("forecast_version_no", sa.Integer(), nullable=True)
    )  # type: ignore[attr-defined]

    # 外部キー（SQLiteは失敗することがあるので try/except）
    try:
        op.create_foreign_key(  # type: ignore[attr-defined]
            "fk_order_lines_forecast",
            source_table="order_lines",
            referent_table="forecast",
            local_cols=["forecast_id"],
            remote_cols=["forecast_id"],
        )
    except Exception:
        pass


def downgrade():
    # 外部キー（try/except）
    try:
        op.drop_constraint("fk_order_lines_forecast", "order_lines", type_="foreignkey")  # type: ignore[attr-defined]
    except Exception:
        pass

    # order_lines から列を削除
    op.drop_column("order_lines", "forecast_version_no")  # type: ignore[attr-defined]
    op.drop_column("order_lines", "forecast_qty")  # type: ignore[attr-defined]
    op.drop_column("order_lines", "forecast_match_status")  # type: ignore[attr-defined]
    op.drop_column("order_lines", "forecast_granularity")  # type: ignore[attr-defined]
    op.drop_column("order_lines", "forecast_id")  # type: ignore[attr-defined]

    # インデックスを削除
    op.drop_index("ix_forecast_active_monthly", table_name="forecast")  # type: ignore[attr-defined]
    op.drop_index("ix_forecast_active_dekad", table_name="forecast")  # type: ignore[attr-defined]
    op.drop_index("ix_forecast_active_daily", table_name="forecast")  # type: ignore[attr-defined]

    # forecast テーブルを削除
    op.drop_table("forecast")  # type: ignore[attr-defined]
