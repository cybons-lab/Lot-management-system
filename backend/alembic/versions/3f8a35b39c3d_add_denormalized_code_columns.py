"""Add denormalized code columns for key relationships (idempotent & dual-schema)"""

from __future__ import annotations
from typing import Optional

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "3f8a35b39c3d"
down_revision = "952dcae456fb"
branch_labels = None
depends_on = None


def _has_column(table: str, column: str) -> bool:
    bind = op.get_bind()
    insp = sa.inspect(bind)
    return column in {c["name"] for c in insp.get_columns(table)}

def _has_index(index_name: str) -> bool:
    bind = op.get_bind()
    sql = """
      SELECT 1
        FROM pg_indexes
       WHERE schemaname = current_schema()
         AND indexname  = :idx
       LIMIT 1
    """
    return bind.execute(sa.text(sql), {"idx": index_name}).first() is not None

def _has_table(table: str) -> bool:
    bind = op.get_bind()
    insp = sa.inspect(bind)
    return table in insp.get_table_names(schema=None)


def upgrade() -> None:
    # --- 1) カラム追加（存在しなければ） ---
    # orders.customer_code
    if _has_table("orders") and not _has_column("orders", "customer_code"):
        op.add_column("orders", sa.Column("customer_code", sa.Text(), nullable=True))

    # order_lines.product_code
    if _has_table("order_lines") and not _has_column("order_lines", "product_code"):
        op.add_column("order_lines", sa.Column("product_code", sa.Text(), nullable=True))

    # lots.product_code / lots.supplier_code / lots.warehouse_code
    if _has_table("lots"):
        if not _has_column("lots", "product_code"):
            op.add_column("lots", sa.Column("product_code", sa.Text(), nullable=True))
        if not _has_column("lots", "supplier_code"):
            op.add_column("lots", sa.Column("supplier_code", sa.Text(), nullable=True))
        if not _has_column("lots", "warehouse_code"):
            op.add_column("lots", sa.Column("warehouse_code", sa.Text(), nullable=True))

    # --- 2) データ移送（両スキーマ対応） ---
    #   - id主キー型（products.id / suppliers.id / customers.id 等）でも
    #   - code主キー型（products.product_code / suppliers.supplier_code 等）でも動くように
    #     DO $$ BEGIN ... END $$ で条件分岐（存在する列で更新）

    # orders.customer_code ← customers
    op.execute("""
    DO $$
    BEGIN
      IF EXISTS (SELECT 1 FROM information_schema.columns
                  WHERE table_name='orders' AND column_name='customer_code')
      THEN
        -- id方式: orders.customer_id -> customers.id
        IF EXISTS (SELECT 1 FROM information_schema.columns
                    WHERE table_name='orders' AND column_name='customer_id')
           AND EXISTS (SELECT 1 FROM information_schema.columns
                        WHERE table_name='customers' AND column_name='id')
        THEN
          UPDATE orders o
             SET customer_code = c.customer_code
            FROM customers c
           WHERE o.customer_id = c.id
             AND o.customer_code IS DISTINCT FROM c.customer_code;
        ELSIF EXISTS (SELECT 1 FROM information_schema.columns
                        WHERE table_name='orders' AND column_name='customer_code') AND
              EXISTS (SELECT 1 FROM information_schema.columns
                        WHERE table_name='customers' AND column_name='customer_code')
        THEN
          -- code方式: すでに一致している可能性が高いので念のため整合のみ
          UPDATE orders o
             SET customer_code = o.customer_code
           WHERE TRUE; -- NO-OP（存在だけ担保）
        END IF;
      END IF;
    END$$;
    """)

    # order_lines.product_code ← products
    op.execute("""
    DO $$
    BEGIN
      IF EXISTS (SELECT 1 FROM information_schema.columns
                  WHERE table_name='order_lines' AND column_name='product_code')
      THEN
        -- id方式: order_lines.product_id -> products.id
        IF EXISTS (SELECT 1 FROM information_schema.columns
                    WHERE table_name='order_lines' AND column_name='product_id')
           AND EXISTS (SELECT 1 FROM information_schema.columns
                        WHERE table_name='products' AND column_name='id')
        THEN
          UPDATE order_lines ol
             SET product_code = p.product_code
            FROM products p
           WHERE ol.product_id = p.id
             AND ol.product_code IS DISTINCT FROM p.product_code;
        ELSIF EXISTS (SELECT 1 FROM information_schema.columns
                        WHERE table_name='products' AND column_name='product_code')
        THEN
          -- code方式に寄せる更新は不要（列はすでに product_code）
          NULL;
        END IF;
      END IF;
    END$$;
    """)

    # lots.(product_code, supplier_code, warehouse_code) ← products/suppliers/warehouses
    op.execute("""
    DO $$
    BEGIN
      IF EXISTS (SELECT 1 FROM information_schema.columns
                  WHERE table_name='lots' AND column_name='product_code')
      THEN
        IF EXISTS (SELECT 1 FROM information_schema.columns
                    WHERE table_name='lots' AND column_name='product_id')
           AND EXISTS (SELECT 1 FROM information_schema.columns
                        WHERE table_name='products' AND column_name='id')
        THEN
          UPDATE lots l
             SET product_code = p.product_code
            FROM products p
           WHERE l.product_id = p.id
             AND l.product_code IS DISTINCT FROM p.product_code;
        END IF;
      END IF;

      IF EXISTS (SELECT 1 FROM information_schema.columns
                  WHERE table_name='lots' AND column_name='supplier_code')
      THEN
        IF EXISTS (SELECT 1 FROM information_schema.columns
                    WHERE table_name='lots' AND column_name='supplier_id')
           AND EXISTS (SELECT 1 FROM information_schema.columns
                        WHERE table_name='suppliers' AND column_name='id')
        THEN
          UPDATE lots l
             SET supplier_code = s.supplier_code
            FROM suppliers s
           WHERE l.supplier_id = s.id
             AND l.supplier_code IS DISTINCT FROM s.supplier_code;
        END IF;
      END IF;

      IF EXISTS (SELECT 1 FROM information_schema.columns
                  WHERE table_name='lots' AND column_name='warehouse_code')
      THEN
        IF EXISTS (SELECT 1 FROM information_schema.columns
                    WHERE table_name='lots' AND column_name='warehouse_id')
           AND EXISTS (SELECT 1 FROM information_schema.columns
                        WHERE table_name='warehouses' AND column_name='warehouse_code')
        THEN
          UPDATE lots l
             SET warehouse_code = w.warehouse_code
            FROM warehouses w
           WHERE l.warehouse_id = w.id
             AND l.warehouse_code IS DISTINCT FROM w.warehouse_code;
        END IF;
      END IF;
    END$$;
    """)

    # --- 3) インデックス作成（存在しなければ） ---
    if _has_table("orders") and _has_column("orders", "customer_code") and not _has_index("ix_orders_customer_code"):
        op.create_index("ix_orders_customer_code", "orders", ["customer_code"])
    if _has_table("order_lines") and _has_column("order_lines", "product_code") and not _has_index("ix_order_lines_product_code"):
        op.create_index("ix_order_lines_product_code", "order_lines", ["product_code"])
    if _has_table("lots") and _has_column("lots", "product_code") and not _has_index("ix_lots_product_code"):
        op.create_index("ix_lots_product_code", "lots", ["product_code"])
    if _has_table("lots") and _has_column("lots", "supplier_code") and not _has_index("ix_lots_supplier_code"):
        op.create_index("ix_lots_supplier_code", "lots", ["supplier_code"])
    if _has_table("lots") and _has_column("lots", "warehouse_code") and not _has_index("ix_lots_warehouse_code"):
        op.create_index("ix_lots_warehouse_code", "lots", ["warehouse_code"])


def downgrade() -> None:
    # 依存の可能性があるので index → column の順で戻す
    if _has_table("lots"):
        if _has_index("ix_lots_warehouse_code"):
            op.drop_index("ix_lots_warehouse_code", table_name="lots")
        if _has_index("ix_lots_supplier_code"):
            op.drop_index("ix_lots_supplier_code", table_name="lots")
        if _has_index("ix_lots_product_code"):
            op.drop_index("ix_lots_product_code", table_name="lots")
    if _has_table("order_lines") and _has_index("ix_order_lines_product_code"):
        op.drop_index("ix_order_lines_product_code", table_name="order_lines")
    if _has_table("orders") and _has_index("ix_orders_customer_code"):
        op.drop_index("ix_orders_customer_code", table_name="orders")

    # カラムはあっても無くても安全にDROP
    if _has_table("lots"):
        if _has_column("lots", "warehouse_code"):
            op.drop_column("lots", "warehouse_code")
        if _has_column("lots", "supplier_code"):
            op.drop_column("lots", "supplier_code")
        if _has_column("lots", "product_code"):
            op.drop_column("lots", "product_code")
    if _has_table("order_lines") and _has_column("order_lines", "product_code"):
        op.drop_column("order_lines", "product_code")
    if _has_table("orders") and _has_column("orders", "customer_code"):
        op.drop_column("orders", "customer_code")
