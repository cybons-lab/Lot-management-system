"""migrate lot_current_stock to view (safe: rename old table instead of drop)

Revision ID: 744d13c795bd
Revises: 5f68d2a452b8
Create Date: 2025-11-09
"""
from alembic import op


# revision identifiers, used by Alembic.
revision = '744d13c795bd'
down_revision = '5f68d2a452b8'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # 1) 旧テーブル/履歴テーブルは削除せずリネームで退避（存在＆種別チェック込み）
    op.execute("""
    DO $$
    BEGIN
      -- lot_current_stock が 'r'(table) のときだけバックアップへリネーム
      IF EXISTS (
        SELECT 1 FROM pg_class c
        JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = 'public' AND c.relname = 'lot_current_stock' AND c.relkind = 'r'
      ) THEN
        PERFORM 1 FROM pg_class WHERE relname = 'lot_current_stock_backup';
        IF FOUND THEN
          -- 既にバックアップがあればそのまま（上書きしない）
          NULL;
        ELSE
          EXECUTE 'ALTER TABLE public.lot_current_stock RENAME TO lot_current_stock_backup';
        END IF;
      END IF;
    END$$;
    """)

    op.execute("""
    DO $$
    BEGIN
      -- 履歴テーブルがあればバックアップへ（存在しない環境も想定）
      IF EXISTS (
        SELECT 1 FROM pg_class c
        JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = 'public' AND c.relname = 'lot_current_stock_history' AND c.relkind = 'r'
      ) THEN
        PERFORM 1 FROM pg_class WHERE relname = 'lot_current_stock_history_backup';
        IF FOUND THEN
          NULL;
        ELSE
          EXECUTE 'ALTER TABLE public.lot_current_stock_history RENAME TO lot_current_stock_history_backup';
        END IF;
      END IF;
    END$$;
    """)

    # 2) VIEWを作成（lot × product × warehouse 粒度、論理削除を除外）
    op.execute("""
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
    """)

    # 3) 補助インデックス（部分インデックス、既存なら作成しない）
    op.execute("""
    CREATE INDEX IF NOT EXISTS ix_stock_movements_pwl
      ON public.stock_movements (product_id, warehouse_id)
      WHERE deleted_at IS NULL;
    """)
    op.execute("""
    CREATE INDEX IF NOT EXISTS ix_stock_movements_occurred
      ON public.stock_movements (occurred_at)
      WHERE deleted_at IS NULL;
    """)


def downgrade() -> None:
    # 1) VIEWを削除
    op.execute("DROP VIEW IF EXISTS public.lot_current_stock;")

    # 2) 退避していたテーブルがあれば元名へ戻す。無ければ元テーブルを再作成
    op.execute("""
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1 FROM pg_class c
        JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = 'public' AND c.relname = 'lot_current_stock_backup' AND c.relkind = 'r'
      ) THEN
        EXECUTE 'ALTER TABLE public.lot_current_stock_backup RENAME TO lot_current_stock';
      ELSE
        -- バックアップが無い場合のみ、元スキーマで再作成（ダンプの構造準拠）
        EXECUTE $$
        CREATE TABLE public.lot_current_stock (
          lot_id INTEGER NOT NULL,
          current_quantity DOUBLE PRECISION NOT NULL,
          last_updated TIMESTAMP WITHOUT TIME ZONE,
          created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
          updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
          created_by VARCHAR(50),
          updated_by VARCHAR(50),
          deleted_at TIMESTAMP WITHOUT TIME ZONE,
          revision INTEGER DEFAULT 1 NOT NULL,
          CONSTRAINT lot_current_stock_pkey PRIMARY KEY (lot_id)
        );
        $$;
        -- FKは元スキーマに合わせて復元
        EXECUTE 'ALTER TABLE ONLY public.lot_current_stock ADD CONSTRAINT lot_current_stock_lot_id_fkey FOREIGN KEY (lot_id) REFERENCES public.lots(id) ON DELETE CASCADE';
      END IF;
    END$$;
    """)

    # -- 履歴テーブルのリストア（バックアップがあれば戻す。無ければ何もしない）
    op.execute("""
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1 FROM pg_class c
        JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = 'public' AND c.relname = 'lot_current_stock_history_backup' AND c.relkind = 'r'
      ) THEN
        EXECUTE 'ALTER TABLE public.lot_current_stock_history_backup RENAME TO lot_current_stock_history';
      END IF;
    END$$;
    """)

    # 3) インデックスは残しても害が無いが、元に合わせて戻す場合は削除
    op.execute("DROP INDEX IF EXISTS public.ix_stock_movements_occurred;")
    op.execute("DROP INDEX IF EXISTS public.ix_stock_movements_pwl;")
