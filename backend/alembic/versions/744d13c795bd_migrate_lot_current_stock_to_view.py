"""migrate lot_current_stock to view (safe: ensure stock_movements exists & rename old table)"""

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = "744d13c795bd"
down_revision = "5f68d2a452b8"
branch_labels = None
depends_on = None


def _table_exists(table: str) -> bool:
    bind = op.get_bind()
    return bind.execute(
        sa.text(
            """
            SELECT 1
              FROM pg_class c
              JOIN pg_namespace n ON n.oid = c.relnamespace
             WHERE n.nspname = current_schema()
               AND c.relname  = :t
               AND c.relkind  = 'r'
             LIMIT 1
            """
        ),
        {"t": table},
    ).first() is not None


def _index_exists(index: str) -> bool:
    bind = op.get_bind()
    return bind.execute(
        sa.text(
            """
            SELECT 1
              FROM pg_indexes
             WHERE schemaname = current_schema()
               AND indexname  = :i
             LIMIT 1
            """
        ),
        {"i": index},
    ).first() is not None


def upgrade():
    bind = op.get_bind()

    # 0) stock_movements が無ければ最小限ではなく完全定義で作成（01_db_schema.sql に準拠）
    if not _table_exists("stock_movements"):
        # シーケンスとテーブル
        op.execute("CREATE SEQUENCE IF NOT EXISTS public.stock_movements_id_seq;")
        op.execute(
            """
            CREATE TABLE public.stock_movements (
                id              INTEGER NOT NULL,
                lot_id          INTEGER,
                reason          TEXT NOT NULL,
                quantity_delta  NUMERIC(15,4) NOT NULL,
                occurred_at     TIMESTAMP WITHOUT TIME ZONE,
                created_at      TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
                updated_at      TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
                created_by      VARCHAR(50),
                updated_by      VARCHAR(50),
                deleted_at      TIMESTAMP WITHOUT TIME ZONE,
                revision        INTEGER DEFAULT 1 NOT NULL,
                product_id      TEXT NOT NULL,
                warehouse_id    INTEGER NOT NULL,
                source_table    VARCHAR(50),
                source_id       INTEGER,
                batch_id        VARCHAR(100)
            );
            """
        )
        op.execute(
            "ALTER TABLE ONLY public.stock_movements ALTER COLUMN id SET DEFAULT nextval('public.stock_movements_id_seq');"
        )
        op.execute(
            "ALTER TABLE ONLY public.stock_movements ADD CONSTRAINT stock_movements_pkey PRIMARY KEY (id);"
        )
        # 既存スキーマは products(product_code) を参照
        op.execute(
            "ALTER TABLE ONLY public.stock_movements "
            "ADD CONSTRAINT fk_stock_movements_product FOREIGN KEY (product_id) "
            "REFERENCES public.products(product_code);"
        )
        op.execute(
            "ALTER TABLE ONLY public.stock_movements "
            "ADD CONSTRAINT stock_movements_lot_id_fkey FOREIGN KEY (lot_id) "
            "REFERENCES public.lots(id) ON DELETE CASCADE;"
        )
        op.execute(
            "ALTER TABLE ONLY public.stock_movements "
            "ADD CONSTRAINT stock_movements_warehouse_id_fkey FOREIGN KEY (warehouse_id) "
            "REFERENCES public.warehouses(id) ON DELETE RESTRICT;"
        )
        # インデックス
        if not _index_exists("ix_stock_movements_lot"):
            op.execute(
                "CREATE INDEX ix_stock_movements_lot ON public.stock_movements USING btree (lot_id);"
            )
        if not _index_exists("idx_stock_movements_product_warehouse"):
            op.execute(
                "CREATE INDEX idx_stock_movements_product_warehouse ON public.stock_movements USING btree (product_id, warehouse_id);"
            )
        if not _index_exists("idx_stock_movements_occurred_at"):
            op.execute(
                "CREATE INDEX idx_stock_movements_occurred_at ON public.stock_movements USING btree (occurred_at);"
            )

    # 1) 旧 lot_current_stock テーブルがあれば退避名に変更（DROPしない）
    op.execute(
        """
        DO $$
        BEGIN
          IF EXISTS (
            SELECT 1 FROM pg_class c
            JOIN pg_namespace n ON n.oid = c.relnamespace
           WHERE n.nspname = current_schema()
             AND c.relname  = 'lot_current_stock'
             AND c.relkind  = 'r'
          ) THEN
            EXECUTE 'ALTER TABLE public.lot_current_stock RENAME TO lot_current_stock_history_backup';
          END IF;
        END$$;
        """
    )

    # 2) ビューを作成（または置換）
    op.execute(
        """
        CREATE OR REPLACE VIEW public.lot_current_stock AS
        SELECT
          sm.lot_id,
          sm.product_id,
          sm.warehouse_id,
          SUM(sm.quantity_delta)::NUMERIC(15,4) AS current_quantity,
          COALESCE(MAX(sm.occurred_at), MAX(sm.created_at)) AS last_updated
        FROM public.stock_movements sm
        WHERE sm.deleted_at IS NULL
          AND sm.lot_id IS NOT NULL
        GROUP BY sm.lot_id, sm.product_id, sm.warehouse_id
        HAVING SUM(sm.quantity_delta) <> 0;
        """
    )

    # 3) 旧マイグレーションで付けていた一時的なインデックス名が残っていれば削除（存在チェック付き）
    op.execute("DROP INDEX IF EXISTS public.ix_stock_movements_occurred;")
    op.execute("DROP INDEX IF EXISTS public.ix_stock_movements_pwl;")


def downgrade():
    # ビュー削除（存在チェック不要：IF EXISTS で安全に）
    op.execute("DROP VIEW IF EXISTS public.lot_current_stock;")

    # 退避したテーブル名を戻す（あれば）
    op.execute(
        """
        DO $$
        BEGIN
          IF EXISTS (
            SELECT 1 FROM pg_class c
            JOIN pg_namespace n ON n.oid = c.relnamespace
           WHERE n.nspname = current_schema()
             AND c.relname  = 'lot_current_stock_history_backup'
             AND c.relkind  = 'r'
          ) THEN
            EXECUTE 'ALTER TABLE public.lot_current_stock_history_backup RENAME TO lot_current_stock';
          END IF;
        END$$;
        """
    )

    # （注意）ここで stock_movements 自体は削除しません（他リビジョンが利用）
