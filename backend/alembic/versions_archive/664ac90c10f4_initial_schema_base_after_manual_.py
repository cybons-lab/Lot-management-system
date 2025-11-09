"""Initial schema base after manual migration

Revision ID: 664ac90c10f4
Revises: 
Create Date: 2025-11-08 18:09:32.122000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '664ac90c10f4'
down_revision = None
branch_labels = None
depends_on = None


# alembic/versions/664ac90c10f4_initial_schema_base_after_manual_.py

def upgrade() -> None:
    # --- Bootstrap base tables for a clean DB (no-op if already exist) ---
    op.execute("""
    CREATE TABLE IF NOT EXISTS suppliers (
        supplier_code TEXT PRIMARY KEY,
        supplier_name  TEXT NOT NULL,
        address        TEXT,
        created_at     TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
        updated_at     TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
        created_by     VARCHAR(50),
        updated_by     VARCHAR(50),
        deleted_at     TIMESTAMP WITHOUT TIME ZONE,
        revision       INTEGER DEFAULT 1 NOT NULL
    );
    """)

    op.execute("""
    CREATE TABLE IF NOT EXISTS customers (
        customer_code TEXT PRIMARY KEY,
        customer_name TEXT NOT NULL,
        address       TEXT,
        created_at    TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
        updated_at    TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
        created_by    VARCHAR(50),
        updated_by    VARCHAR(50),
        deleted_at    TIMESTAMP WITHOUT TIME ZONE,
        revision      INTEGER DEFAULT 1 NOT NULL
    );
    """)

    op.execute("""
    CREATE TABLE IF NOT EXISTS warehouses (
        id             SERIAL PRIMARY KEY,
        warehouse_code TEXT NOT NULL,
        warehouse_name TEXT NOT NULL,
        address        TEXT,
        is_active      INTEGER DEFAULT 1,
        created_at     TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
        updated_at     TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
        created_by     VARCHAR(50),
        updated_by     VARCHAR(50),
        deleted_at     TIMESTAMP WITHOUT TIME ZONE,
        revision       INTEGER DEFAULT 1 NOT NULL
    );
    """)

    op.execute("""
    CREATE TABLE IF NOT EXISTS products (
        product_code   TEXT PRIMARY KEY,
        product_name   TEXT NOT NULL,
        internal_unit  TEXT NOT NULL,
        base_unit      TEXT NOT NULL DEFAULT 'EA',
        packaging_unit TEXT NOT NULL DEFAULT 'EA',
        packaging_qty  NUMERIC(15,4) NOT NULL DEFAULT 1,
        supplier_code  TEXT,
        customer_part_no      TEXT,
        maker_item_code       TEXT,
        supplier_item_code    TEXT,
        assemble_div          TEXT,
        next_div              TEXT,
        ji_ku_text            TEXT,
        kumitsuke_ku_text     TEXT,
        shelf_life_days       INTEGER,
        requires_lot_number   INTEGER NOT NULL DEFAULT 0,
        delivery_place_id     INTEGER,
        delivery_place_name   TEXT,
        shipping_warehouse_name TEXT,
        created_at     TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
        updated_at     TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
        created_by     VARCHAR(50),
        updated_by     VARCHAR(50),
        deleted_at     TIMESTAMP WITHOUT TIME ZONE,
        revision       INTEGER DEFAULT 1 NOT NULL
    );
    """)

    op.execute("""
    CREATE TABLE IF NOT EXISTS lots (
        id           SERIAL PRIMARY KEY,
        lot_number   TEXT NOT NULL,
        receipt_date DATE NOT NULL,
        mfg_date     DATE,
        expiry_date  DATE,
        warehouse_id INTEGER,
        supplier_code TEXT,
        product_code  TEXT,
        kanban_class  TEXT,
        received_by   TEXT,
        created_at   TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
        updated_at   TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
        created_by   VARCHAR(50),
        updated_by   VARCHAR(50),
        deleted_at   TIMESTAMP WITHOUT TIME ZONE,
        revision     INTEGER DEFAULT 1 NOT NULL
    );
    """)

    op.execute("""
    CREATE TABLE IF NOT EXISTS orders (
        id               SERIAL PRIMARY KEY,
        order_no         TEXT NOT NULL,
        order_date       DATE,
        status           TEXT,
        sap_order_id     TEXT,
        sap_status       TEXT,
        sap_sent_at      TIMESTAMP WITHOUT TIME ZONE,
        sap_error_msg    TEXT,
        customer_order_no TEXT,
        -- 後続の変更で customer_code に移行するため、ここでは列は用意しない
        created_at       TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
        updated_at       TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
        created_by       VARCHAR(50),
        updated_by       VARCHAR(50),
        deleted_at       TIMESTAMP WITHOUT TIME ZONE,
        revision         INTEGER DEFAULT 1 NOT NULL
    );
    """)

    op.execute("""
    CREATE TABLE IF NOT EXISTS order_lines (
        id           SERIAL PRIMARY KEY,
        order_id     INTEGER NOT NULL,
        line_no      INTEGER NOT NULL,
        quantity     NUMERIC(15,4) NOT NULL,
        unit         TEXT,
        -- 後続で product_code / forecast_id 等が追加される
        created_at   TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
        updated_at   TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
        created_by   VARCHAR(50),
        updated_by   VARCHAR(50),
        deleted_at   TIMESTAMP WITHOUT TIME ZONE,
        revision     INTEGER DEFAULT 1 NOT NULL
    );
    """)

    op.execute("""
    CREATE TABLE IF NOT EXISTS allocations (
        id            SERIAL PRIMARY KEY,
        order_line_id INTEGER NOT NULL,
        lot_id        INTEGER NOT NULL,
        allocated_qty NUMERIC(15,4) NOT NULL,
        destination_id INTEGER,
        created_at    TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
        updated_at    TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
        created_by    VARCHAR(50),
        updated_by    VARCHAR(50),
        deleted_at    TIMESTAMP WITHOUT TIME ZONE,
        revision      INTEGER DEFAULT 1 NOT NULL
    );
    """)

    op.execute("""
    CREATE TABLE IF NOT EXISTS forecasts (
        id                SERIAL PRIMARY KEY,
        forecast_id       VARCHAR(36),
        product_id        INTEGER,
        customer_id       INTEGER,
        granularity       VARCHAR(16) NOT NULL,
        date_day          DATE,
        date_dekad_start  DATE,
        year_month        VARCHAR(7),
        qty_forecast      INTEGER NOT NULL,
        version_no        INTEGER NOT NULL,
        version_issued_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
        source_system     VARCHAR(32) NOT NULL,
        is_active         BOOLEAN NOT NULL DEFAULT TRUE,
        created_at        TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
        updated_at        TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
        created_by        VARCHAR(50),
        updated_by        VARCHAR(50),
        deleted_at        TIMESTAMP WITHOUT TIME ZONE,
        revision          INTEGER DEFAULT 1 NOT NULL
    );
    """)

    # 以降は既存の op.create_table / batch_alter_table をそのまま実行
    # ### commands auto generated by Alembic - please adjust! ###
    # （以下、元のコード続き）


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('warehouses', schema=None) as batch_op:
        batch_op.create_table_comment(
        '倉庫マスタ（保管拠点）',
        existing_comment=None
    )
        batch_op.drop_index(batch_op.f('ix_warehouses_warehouse_code'))
        batch_op.create_unique_constraint('uq_warehouses_warehouse_code', ['warehouse_code'])
        batch_op.create_index('uq_warehouses_id', ['id'], unique=True)
        batch_op.alter_column('revision',
               existing_type=sa.INTEGER(),
               comment='楽観的ロック用リビジョン番号',
               existing_nullable=False,
               existing_server_default=sa.text('1'))
        batch_op.alter_column('deleted_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='論理削除日時',
               existing_nullable=True)
        batch_op.alter_column('updated_by',
               existing_type=sa.VARCHAR(length=50),
               comment='更新者',
               existing_nullable=True)
        batch_op.alter_column('created_by',
               existing_type=sa.VARCHAR(length=50),
               comment='作成者',
               existing_nullable=True)
        batch_op.alter_column('updated_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='レコード更新日時',
               existing_nullable=False,
               existing_server_default=sa.text('now()'))
        batch_op.alter_column('created_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='レコード作成日時',
               existing_nullable=False,
               existing_server_default=sa.text('now()'))
        batch_op.alter_column('is_active',
               existing_type=sa.Integer(),
               type_=sa.BOOLEAN(),
               nullable=False,
               comment='有効フラグ（1=有効,0=無効）',
               existing_server_default=sa.text('true'))
        batch_op.alter_column('address',
               existing_type=sa.TEXT(),
               comment='住所',
               existing_nullable=True)
        batch_op.alter_column('warehouse_name',
               existing_type=sa.String(length=128),
               type_=sa.TEXT(),
               comment='倉庫名称',
               existing_nullable=False)
        batch_op.alter_column('warehouse_code',
               existing_type=sa.String(length=32),
               type_=sa.TEXT(),
               comment='倉庫コード（UK）',
               existing_nullable=False)
        batch_op.alter_column('id',
               existing_type=sa.INTEGER(),
               comment='主キー（自動採番）',
               existing_nullable=False,
               autoincrement=True)

    with op.batch_alter_table('unit_conversions', schema=None) as batch_op:
        batch_op.add_column(sa.Column('factor', sa.NUMERIC(precision=10, scale=4), autoincrement=False, nullable=False, comment='換算係数（1 from_unit = factor to_unit）'))
        batch_op.create_table_comment(
        '単位換算マスタ（入出力単位 ⇔ 内部単位）',
        existing_comment=None
    )
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('fk_unit_conversions_product', 'products', ['product_id'], ['id'], ondelete='CASCADE')
        batch_op.drop_constraint('uq_unit_conversion', type_='unique')
        batch_op.create_unique_constraint('uq_product_units', ['product_id', 'from_unit', 'to_unit'])
        batch_op.alter_column('revision',
               existing_type=sa.INTEGER(),
               comment='楽観的ロック用リビジョン番号',
               existing_nullable=False,
               existing_server_default=sa.text('1'))
        batch_op.alter_column('deleted_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='論理削除日時',
               existing_nullable=True)
        batch_op.alter_column('updated_by',
               existing_type=sa.VARCHAR(length=50),
               comment='更新者',
               existing_nullable=True)
        batch_op.alter_column('created_by',
               existing_type=sa.VARCHAR(length=50),
               comment='作成者',
               existing_nullable=True)
        batch_op.alter_column('updated_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='レコード更新日時',
               existing_nullable=False,
               existing_server_default=sa.text('now()'))
        batch_op.alter_column('created_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='レコード作成日時',
               existing_nullable=False,
               existing_server_default=sa.text('now()'))
        batch_op.alter_column('to_unit',
               existing_type=sa.Text(),
               type_=sa.VARCHAR(length=10),
               comment='変換先単位',
               existing_nullable=False)
        batch_op.alter_column('from_unit',
               existing_type=sa.Text(),
               type_=sa.VARCHAR(length=10),
               comment='変換元単位',
               existing_nullable=False)
        batch_op.alter_column('product_id',
               existing_type=sa.Text(),
               type_=sa.INTEGER(),
               nullable=False,
               comment='製品ID（FK: products.id / NULL=グローバル定義）')
        batch_op.alter_column('id',
               existing_type=sa.INTEGER(),
               comment='主キー（自動採番）',
               existing_nullable=False,
               autoincrement=True)
        batch_op.drop_column('conversion_factor')

    with op.batch_alter_table('suppliers', schema=None) as batch_op:
        batch_op.add_column(sa.Column('id', sa.INTEGER(), server_default=sa.text("nextval('suppliers_id_seq'::regclass)"), autoincrement=True, nullable=False, comment='主キー（自動採番）'))
        batch_op.create_table_comment(
        '仕入先マスタ',
        existing_comment=None
    )
        batch_op.create_unique_constraint('uq_suppliers_supplier_code', ['supplier_code'])
        batch_op.create_index('ix_suppliers_supplier_code', ['supplier_code'], unique=False)
        batch_op.alter_column('revision',
               existing_type=sa.INTEGER(),
               comment='楽観的ロック用リビジョン番号',
               existing_nullable=False,
               existing_server_default=sa.text('1'))
        batch_op.alter_column('deleted_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='論理削除日時',
               existing_nullable=True)
        batch_op.alter_column('updated_by',
               existing_type=sa.VARCHAR(length=50),
               comment='更新者',
               existing_nullable=True)
        batch_op.alter_column('created_by',
               existing_type=sa.VARCHAR(length=50),
               comment='作成者',
               existing_nullable=True)
        batch_op.alter_column('updated_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='レコード更新日時',
               existing_nullable=False,
               existing_server_default=sa.text('now()'))
        batch_op.alter_column('created_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='レコード作成日時',
               existing_nullable=False,
               existing_server_default=sa.text('now()'))
        batch_op.alter_column('address',
               existing_type=sa.TEXT(),
               comment='住所',
               existing_nullable=True)
        batch_op.alter_column('supplier_name',
               existing_type=sa.TEXT(),
               comment='仕入先名称',
               existing_nullable=False)
        batch_op.alter_column('supplier_code',
               existing_type=sa.TEXT(),
               comment='仕入先コード（PK/UK）',
               existing_nullable=False)

    with op.batch_alter_table('stock_movements', schema=None) as batch_op:
        batch_op.add_column(sa.Column('batch_id', sa.VARCHAR(length=100), autoincrement=False, nullable=True, comment='バッチ処理単位の識別子'))
        batch_op.add_column(sa.Column('quantity_delta', sa.NUMERIC(precision=15, scale=4), autoincrement=False, nullable=False, comment='数量増減（正=入庫、負=出庫）'))
        batch_op.add_column(sa.Column('source_id', sa.INTEGER(), autoincrement=False, nullable=True, comment='参照元レコードID（追跡用）'))
        batch_op.add_column(sa.Column('product_id', sa.INTEGER(), autoincrement=False, nullable=False, comment='製品ID（FK候補：products.product_code/id）'))
        batch_op.add_column(sa.Column('source_table', sa.VARCHAR(length=50), autoincrement=False, nullable=True, comment='参照元テーブル名（追跡用）'))
        batch_op.add_column(sa.Column('occurred_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=True, comment='発生日時'))
        batch_op.create_table_comment(
        '在庫移動履歴（入出庫/移動/調整/廃棄）',
        existing_comment=None
    )
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('stock_movements_lot_id_fkey', 'lots', ['lot_id'], ['id'], ondelete='CASCADE')
        batch_op.create_foreign_key('fk_stock_movements_product', 'products', ['product_id'], ['id'], ondelete='RESTRICT')
        batch_op.create_foreign_key('stock_movements_warehouse_id_fkey', 'warehouses', ['warehouse_id'], ['id'], ondelete='RESTRICT')
        batch_op.drop_index(batch_op.f('ix_stock_movements_warehouse_id'))
        batch_op.drop_index('ix_stock_movements_warehouse_date')
        batch_op.drop_index(batch_op.f('ix_stock_movements_lot_id'))
        batch_op.drop_index('ix_stock_movements_lot_date')
        batch_op.create_index('ix_stock_movements_lot', ['lot_id'], unique=False)
        batch_op.create_index('idx_stock_movements_product_warehouse', ['product_id', 'warehouse_id'], unique=False)
        batch_op.create_index('idx_stock_movements_occurred_at', ['occurred_at'], unique=False)
        batch_op.alter_column('revision',
               existing_type=sa.INTEGER(),
               comment='楽観的ロック用リビジョン番号',
               existing_nullable=False,
               existing_server_default=sa.text('1'))
        batch_op.alter_column('deleted_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='論理削除日時',
               existing_nullable=True)
        batch_op.alter_column('updated_by',
               existing_type=sa.VARCHAR(length=50),
               comment='更新者',
               existing_nullable=True)
        batch_op.alter_column('created_by',
               existing_type=sa.VARCHAR(length=50),
               comment='作成者',
               existing_nullable=True)
        batch_op.alter_column('updated_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='レコード更新日時',
               existing_nullable=False,
               existing_server_default=sa.text('now()'))
        batch_op.alter_column('created_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='レコード作成日時',
               existing_nullable=False,
               existing_server_default=sa.text('now()'))
        batch_op.alter_column('reason',
               existing_type=sa.TEXT(),
               comment='移動理由（inbound/outbound/transfer/adjustment/scrap）',
               existing_nullable=False)
        batch_op.alter_column('warehouse_id',
               existing_type=sa.INTEGER(),
               comment='倉庫ID（FK: warehouses.id）',
               existing_nullable=False)
        batch_op.alter_column('lot_id',
               existing_type=sa.INTEGER(),
               nullable=True,
               comment='ロットID（FK: lots.id）')
        batch_op.alter_column('id',
               existing_type=sa.INTEGER(),
               comment='主キー（自動採番）',
               existing_nullable=False,
               autoincrement=True)
        batch_op.drop_column('movement_date')
        batch_op.drop_column('reference_doc_id')
        batch_op.drop_column('reference_doc_type')
        batch_op.drop_column('quantity')
        batch_op.drop_column('movement_type')

    with op.batch_alter_table('sap_sync_logs', schema=None) as batch_op:
        batch_op.create_table_comment(
        'SAP連携の実行ログ（送信ペイロードと結果）',
        existing_comment=None
    )
        batch_op.alter_column('revision',
               existing_type=sa.INTEGER(),
               comment='楽観的ロック用リビジョン番号',
               existing_nullable=False,
               existing_server_default=sa.text('1'))
        batch_op.alter_column('deleted_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='論理削除日時',
               existing_nullable=True)
        batch_op.alter_column('updated_by',
               existing_type=sa.VARCHAR(length=50),
               comment='更新者',
               existing_nullable=True)
        batch_op.alter_column('created_by',
               existing_type=sa.VARCHAR(length=50),
               comment='作成者',
               existing_nullable=True)
        batch_op.alter_column('updated_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='レコード更新日時',
               existing_nullable=False,
               existing_server_default=sa.text('now()'))
        batch_op.alter_column('created_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='レコード作成日時',
               existing_nullable=False,
               existing_server_default=sa.text('now()'))
        batch_op.alter_column('executed_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='連携実行日時',
               existing_nullable=True)
        batch_op.alter_column('status',
               existing_type=sa.TEXT(),
               comment='連携状態（pending/success/failed/retry等）',
               existing_nullable=True)
        batch_op.alter_column('result',
               existing_type=sa.TEXT(),
               comment='応答内容（JSON文字列）',
               existing_nullable=True)
        batch_op.alter_column('payload',
               existing_type=sa.TEXT(),
               comment='送信ペイロード（JSON文字列）',
               existing_nullable=True)
        batch_op.alter_column('order_id',
               existing_type=sa.INTEGER(),
               comment='対象受注ID（FK: orders.id）',
               existing_nullable=True)
        batch_op.alter_column('id',
               existing_type=sa.INTEGER(),
               comment='主キー（自動採番）',
               existing_nullable=False,
               autoincrement=True)

    with op.batch_alter_table('purchase_requests', schema=None) as batch_op:
        batch_op.add_column(sa.Column('src_order_line_id', sa.INTEGER(), autoincrement=False, nullable=True, comment='起点受注明細ID（FK: order_lines.id）'))
        batch_op.add_column(sa.Column('notes', sa.TEXT(), autoincrement=False, nullable=True, comment='備考'))
        batch_op.add_column(sa.Column('product_id', sa.INTEGER(), autoincrement=False, nullable=True, comment='製品ID（FK: products.id）'))
        batch_op.add_column(sa.Column('reason_code', sa.TEXT(), autoincrement=False, nullable=False, comment='依頼理由コード'))
        batch_op.add_column(sa.Column('desired_receipt_date', sa.DATE(), autoincrement=False, nullable=True, comment='希望入庫日'))
        batch_op.add_column(sa.Column('unit', sa.TEXT(), autoincrement=False, nullable=True, comment='単位'))
        batch_op.add_column(sa.Column('supplier_id', sa.INTEGER(), autoincrement=False, nullable=True, comment='仕入先ID（FK: suppliers.id）'))
        batch_op.add_column(sa.Column('sap_po_id', sa.TEXT(), autoincrement=False, nullable=True, comment='SAP発注番号（連携後）'))
        batch_op.create_table_comment(
        '購買依頼（補充や手配の内部起票）',
        existing_comment=None
    )
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('fk_purchase_requests_supplier', 'suppliers', ['supplier_id'], ['id'], ondelete='RESTRICT')
        batch_op.create_foreign_key('fk_purchase_requests_product', 'products', ['product_id'], ['id'], ondelete='RESTRICT')
        batch_op.create_foreign_key('purchase_requests_src_order_line_id_fkey', 'order_lines', ['src_order_line_id'], ['id'])
        batch_op.alter_column('revision',
               existing_type=sa.INTEGER(),
               comment='楽観的ロック用リビジョン番号',
               existing_nullable=False,
               existing_server_default=sa.text('1'))
        batch_op.alter_column('deleted_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='論理削除日時',
               existing_nullable=True)
        batch_op.alter_column('updated_by',
               existing_type=sa.VARCHAR(length=50),
               comment='更新者',
               existing_nullable=True)
        batch_op.alter_column('created_by',
               existing_type=sa.VARCHAR(length=50),
               comment='作成者',
               existing_nullable=True)
        batch_op.alter_column('updated_at',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True,
               comment='レコード更新日時')
        batch_op.alter_column('created_at',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True,
               comment='レコード作成日時')
        batch_op.alter_column('status',
               existing_type=sa.TEXT(),
               comment='状態',
               existing_nullable=True)
        batch_op.alter_column('requested_date',
               existing_type=sa.DATE(),
               nullable=True,
               comment='依頼日')
        batch_op.alter_column('requested_qty',
               existing_type=sa.Numeric(precision=15, scale=4),
               type_=sa.DOUBLE_PRECISION(precision=53),
               comment='依頼数量',
               existing_nullable=False)
        batch_op.alter_column('id',
               existing_type=sa.INTEGER(),
               comment='主キー（自動採番）',
               existing_nullable=False,
               autoincrement=True)
        batch_op.drop_column('supplier_code')
        batch_op.drop_column('product_code')

    with op.batch_alter_table('products', schema=None) as batch_op:
        batch_op.add_column(sa.Column('supplier_id', sa.INTEGER(), autoincrement=False, nullable=True, comment='主要仕入先ID（FK: suppliers.id）'))
        batch_op.add_column(sa.Column('id', sa.INTEGER(), server_default=sa.text("nextval('products_id_seq'::regclass)"), autoincrement=True, nullable=False, comment='主キー（自動採番）'))
        batch_op.create_table_comment(
        '商品マスタ',
        existing_comment=None
    )
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('fk_products_supplier', 'suppliers', ['supplier_id'], ['id'], ondelete='RESTRICT')
        batch_op.create_unique_constraint('uq_products_product_code', ['product_code'])
        batch_op.create_index('ix_products_product_code', ['product_code'], unique=False)
        batch_op.alter_column('revision',
               existing_type=sa.INTEGER(),
               comment='楽観的ロック用リビジョン番号',
               existing_nullable=False,
               existing_server_default=sa.text('1'))
        batch_op.alter_column('deleted_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='論理削除日時',
               existing_nullable=True)
        batch_op.alter_column('updated_by',
               existing_type=sa.VARCHAR(length=50),
               comment='更新者',
               existing_nullable=True)
        batch_op.alter_column('created_by',
               existing_type=sa.VARCHAR(length=50),
               comment='作成者',
               existing_nullable=True)
        batch_op.alter_column('updated_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='レコード更新日時',
               existing_nullable=False,
               existing_server_default=sa.text('now()'))
        batch_op.alter_column('created_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='レコード作成日時',
               existing_nullable=False,
               existing_server_default=sa.text('now()'))
        batch_op.alter_column('shipping_warehouse_name',
               existing_type=sa.Text(),
               type_=sa.VARCHAR(),
               existing_nullable=True)
        batch_op.alter_column('delivery_place_name',
               existing_type=sa.Text(),
               type_=sa.VARCHAR(),
               existing_nullable=True)
        batch_op.alter_column('delivery_place_id',
               existing_type=sa.INTEGER(),
               comment='デフォルト納入場所ID（FK: delivery_places.id）',
               existing_nullable=True)
        batch_op.alter_column('requires_lot_number',
               existing_type=sa.INTEGER(),
               nullable=True,
               comment='ロット必須フラグ（0/1）')
        batch_op.alter_column('shelf_life_days',
               existing_type=sa.INTEGER(),
               comment='想定賞味/有効日数',
               existing_nullable=True)
        batch_op.alter_column('kumitsuke_ku_text',
               existing_type=sa.Text(),
               type_=sa.VARCHAR(),
               comment='組付区分テキスト（任意メタ）',
               existing_nullable=True)
        batch_op.alter_column('ji_ku_text',
               existing_type=sa.Text(),
               type_=sa.VARCHAR(),
               comment='事業区分テキスト（任意メタ）',
               existing_nullable=True)
        batch_op.alter_column('next_div',
               existing_type=sa.TEXT(),
               comment='NEXT区分（得意先出荷時の区分、必要に応じ使用）',
               existing_nullable=True)
        batch_op.alter_column('assemble_div',
               existing_type=sa.TEXT(),
               comment='組立区分（将来拡張）',
               existing_nullable=True)
        batch_op.alter_column('supplier_item_code',
               existing_type=sa.Text(),
               type_=sa.VARCHAR(),
               comment='仕入先側の品番',
               existing_nullable=True)
        batch_op.alter_column('maker_item_code',
               existing_type=sa.TEXT(),
               comment='メーカー品番（製造元品番）',
               existing_nullable=True)
        batch_op.alter_column('customer_part_no',
               existing_type=sa.TEXT(),
               comment='先方品番（得意先側品番）',
               existing_nullable=True)
        batch_op.alter_column('base_unit',
               existing_type=sa.Text(),
               type_=sa.VARCHAR(length=10),
               comment='基本単位（例: EA）',
               existing_nullable=False,
               existing_server_default=sa.text("'EA'::character varying"))
        batch_op.alter_column('internal_unit',
               existing_type=sa.TEXT(),
               comment='内部管理単位（在庫基準単位）',
               existing_nullable=False)
        batch_op.alter_column('packaging_unit',
               existing_type=sa.Text(),
               type_=sa.VARCHAR(length=20),
               comment='包装単位',
               existing_nullable=False,
               existing_server_default=sa.text("'EA'::character varying"))
        batch_op.alter_column('packaging_qty',
               existing_type=sa.Numeric(precision=15, scale=4),
               type_=sa.NUMERIC(precision=10, scale=2),
               comment='包装数量（1箱あたり数量等）',
               existing_nullable=False,
               existing_server_default=sa.text("'1'::numeric"))
        batch_op.alter_column('product_name',
               existing_type=sa.TEXT(),
               comment='製品名称',
               existing_nullable=False)
        batch_op.alter_column('product_code',
               existing_type=sa.TEXT(),
               comment='製品コード（社内品番, PK/UK）',
               existing_nullable=False)
        batch_op.drop_column('supplier_code')

    with op.batch_alter_table('orders', schema=None) as batch_op:
        batch_op.add_column(sa.Column('customer_id', sa.INTEGER(), autoincrement=False, nullable=True, comment='得意先ID（FK: customers.id）'))
        batch_op.create_table_comment(
        '受注ヘッダ',
        existing_comment=None
    )
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('fk_orders_customer', 'customers', ['customer_id'], ['id'], ondelete='RESTRICT')
        batch_op.create_index('uq_orders_customer_order_no_per_customer', ['customer_id', 'customer_order_no'], unique=True, postgresql_where='(customer_order_no IS NOT NULL)')
        batch_op.create_index('ix_orders_customer_id_order_date', ['customer_id', 'order_date'], unique=False)
        batch_op.alter_column('revision',
               existing_type=sa.INTEGER(),
               comment='楽観的ロック用リビジョン番号',
               existing_nullable=False,
               existing_server_default=sa.text('1'))
        batch_op.alter_column('deleted_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='論理削除日時',
               existing_nullable=True)
        batch_op.alter_column('updated_by',
               existing_type=sa.VARCHAR(length=50),
               comment='更新者',
               existing_nullable=True)
        batch_op.alter_column('created_by',
               existing_type=sa.VARCHAR(length=50),
               comment='作成者',
               existing_nullable=True)
        batch_op.alter_column('updated_at',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True,
               comment='レコード更新日時')
        batch_op.alter_column('created_at',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True,
               comment='レコード作成日時')
        batch_op.alter_column('customer_order_no',
               existing_type=sa.TEXT(),
               comment='先方注文番号（原票）',
               existing_nullable=True)
        batch_op.alter_column('sap_error_msg',
               existing_type=sa.TEXT(),
               comment='SAP連携エラー内容',
               existing_nullable=True)
        batch_op.alter_column('sap_sent_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='SAP送信日時',
               existing_nullable=True)
        batch_op.alter_column('sap_status',
               existing_type=sa.TEXT(),
               comment='SAP連携状態',
               existing_nullable=True)
        batch_op.alter_column('sap_order_id',
               existing_type=sa.TEXT(),
               comment='SAP側受注番号（登録後）',
               existing_nullable=True)
        batch_op.alter_column('status',
               existing_type=sa.TEXT(),
               nullable=False,
               comment='受注ステータス')
        batch_op.alter_column('order_date',
               existing_type=sa.DATE(),
               nullable=False,
               comment='受注日')
        batch_op.alter_column('order_no',
               existing_type=sa.TEXT(),
               comment='受注番号（外部連携ID等）',
               existing_nullable=False)
        batch_op.alter_column('id',
               existing_type=sa.INTEGER(),
               comment='主キー（自動採番）',
               existing_nullable=False,
               autoincrement=True,
               existing_server_default=sa.text("nextval('orders_id_seq'::regclass)"))
        batch_op.drop_column('customer_code')

    with op.batch_alter_table('order_lines', schema=None) as batch_op:
        batch_op.add_column(sa.Column('product_id', sa.INTEGER(), autoincrement=False, nullable=True, comment='製品ID（将来変更用：FK想定）'))
        batch_op.create_table_comment(
        '受注明細',
        existing_comment=None
    )
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('fk_order_lines_product', 'products', ['product_id'], ['id'], ondelete='RESTRICT')
        batch_op.drop_index('ix_order_lines_product_code')
        batch_op.drop_index('ix_order_lines_order_id')
        batch_op.alter_column('revision',
               existing_type=sa.INTEGER(),
               comment='楽観的ロック用リビジョン番号',
               existing_nullable=False,
               existing_server_default=sa.text('1'))
        batch_op.alter_column('deleted_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='論理削除日時',
               existing_nullable=True)
        batch_op.alter_column('updated_by',
               existing_type=sa.VARCHAR(length=50),
               comment='更新者',
               existing_nullable=True)
        batch_op.alter_column('created_by',
               existing_type=sa.VARCHAR(length=50),
               comment='作成者',
               existing_nullable=True)
        batch_op.alter_column('updated_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='レコード更新日時',
               existing_nullable=False,
               existing_server_default=sa.text('now()'))
        batch_op.alter_column('created_at',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True,
               comment='レコード作成日時')
        batch_op.alter_column('unit',
               existing_type=sa.TEXT(),
               comment='単位',
               existing_nullable=True)
        batch_op.alter_column('quantity',
               existing_type=sa.Numeric(precision=15, scale=4),
               type_=sa.DOUBLE_PRECISION(precision=53),
               comment='受注数量',
               existing_nullable=False)
        batch_op.alter_column('line_no',
               existing_type=sa.INTEGER(),
               comment='明細行番号',
               existing_nullable=False)
        batch_op.alter_column('order_id',
               existing_type=sa.INTEGER(),
               comment='受注ID（FK: orders.id）',
               existing_nullable=False)
        batch_op.alter_column('id',
               existing_type=sa.INTEGER(),
               comment='主キー（自動採番）',
               existing_nullable=False,
               autoincrement=True,
               existing_server_default=sa.text("nextval('order_lines_id_seq'::regclass)"))
        batch_op.drop_column('forecast_id')
        batch_op.drop_column('delivery_date')
        batch_op.drop_column('status')
        batch_op.drop_column('product_code')

    with op.batch_alter_table('order_line_warehouse_allocation', schema=None) as batch_op:
        batch_op.create_table_comment(
        '受注明細×倉庫の引当（複数倉庫対応中間）',
        existing_comment=None
    )
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint('uq_orderline_warehouse', type_='unique')
        batch_op.drop_index('ix_olwa_warehouse_id')
        batch_op.drop_index('ix_olwa_order_line_id')
        batch_op.create_unique_constraint('uq_order_line_warehouse', ['order_line_id', 'warehouse_id'])
        batch_op.alter_column('revision',
               existing_type=sa.INTEGER(),
               comment='楽観的ロック用リビジョン番号',
               existing_nullable=False,
               existing_server_default=sa.text('1'))
        batch_op.alter_column('deleted_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='論理削除日時',
               existing_nullable=True)
        batch_op.alter_column('updated_by',
               existing_type=sa.VARCHAR(length=50),
               comment='更新者',
               existing_nullable=True)
        batch_op.alter_column('created_by',
               existing_type=sa.VARCHAR(length=50),
               comment='作成者',
               existing_nullable=True)
        batch_op.alter_column('updated_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='レコード更新日時',
               existing_nullable=False,
               existing_server_default=sa.text('now()'))
        batch_op.alter_column('created_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='レコード作成日時',
               existing_nullable=False,
               existing_server_default=sa.text('now()'))
        batch_op.alter_column('quantity',
               existing_type=sa.Numeric(precision=15, scale=4),
               type_=sa.DOUBLE_PRECISION(precision=53),
               comment='倉庫別引当数量',
               existing_nullable=False)
        batch_op.alter_column('warehouse_id',
               existing_type=sa.INTEGER(),
               comment='倉庫ID（FK: warehouses.id）',
               existing_nullable=False)
        batch_op.alter_column('order_line_id',
               existing_type=sa.INTEGER(),
               comment='受注明細ID（FK: order_lines.id）',
               existing_nullable=False)
        batch_op.alter_column('id',
               existing_type=sa.INTEGER(),
               comment='主キー（自動採番）',
               existing_nullable=False,
               autoincrement=True)

    with op.batch_alter_table('lots', schema=None) as batch_op:
        batch_op.add_column(sa.Column('product_id', sa.INTEGER(), autoincrement=False, nullable=True, comment='製品ID（FK: products.id）'))
        batch_op.add_column(sa.Column('warehouse_code_old', sa.TEXT(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('supplier_id', sa.INTEGER(), autoincrement=False, nullable=True, comment='仕入先ID（FK: suppliers.id）'))
        batch_op.create_table_comment(
        'ロットマスタ（入庫実績由来のトレーサビリティ情報）',
        existing_comment=None
    )
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('fk_lots_supplier', 'suppliers', ['supplier_id'], ['id'], ondelete='RESTRICT')
        batch_op.create_foreign_key('fk_lots_product', 'products', ['product_id'], ['id'], ondelete='RESTRICT')
        batch_op.create_foreign_key('fk_lots_warehouse_id__warehouses_id', 'warehouses', ['warehouse_id'], ['id'], ondelete='RESTRICT')
        batch_op.drop_constraint('uq_lot_supplier_product_no', type_='unique')
        batch_op.alter_column('revision',
               existing_type=sa.INTEGER(),
               comment='楽観的ロック用リビジョン番号',
               existing_nullable=False,
               existing_server_default=sa.text('1'))
        batch_op.alter_column('deleted_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='論理削除日時',
               existing_nullable=True)
        batch_op.alter_column('updated_by',
               existing_type=sa.VARCHAR(length=50),
               comment='更新者',
               existing_nullable=True)
        batch_op.alter_column('created_by',
               existing_type=sa.VARCHAR(length=50),
               comment='作成者',
               existing_nullable=True)
        batch_op.alter_column('updated_at',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True,
               comment='レコード更新日時')
        batch_op.alter_column('created_at',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True,
               comment='レコード作成日時')
        batch_op.alter_column('received_by',
               existing_type=sa.TEXT(),
               comment='入庫担当者',
               existing_nullable=True)
        batch_op.alter_column('kanban_class',
               existing_type=sa.TEXT(),
               comment='かんばん区分',
               existing_nullable=True)
        batch_op.alter_column('warehouse_id',
               existing_type=sa.INTEGER(),
               nullable=True,
               comment='保管倉庫ID（FK: warehouses.id）')
        batch_op.alter_column('expiry_date',
               existing_type=sa.DATE(),
               comment='有効期限',
               existing_nullable=True)
        batch_op.alter_column('mfg_date',
               existing_type=sa.DATE(),
               comment='製造日',
               existing_nullable=True)
        batch_op.alter_column('receipt_date',
               existing_type=sa.DATE(),
               comment='入庫日',
               existing_nullable=False)
        batch_op.alter_column('lot_number',
               existing_type=sa.TEXT(),
               comment='ロット番号（手動/外部入力）',
               existing_nullable=False)
        batch_op.alter_column('id',
               existing_type=sa.INTEGER(),
               comment='主キー（自動採番）',
               existing_nullable=False,
               autoincrement=True,
               existing_server_default=sa.text("nextval('lots_id_seq'::regclass)"))
        batch_op.drop_column('product_code')
        batch_op.drop_column('supplier_code')

    with op.batch_alter_table('lot_current_stock', schema=None) as batch_op:
        batch_op.create_table_comment(
        'ロット別現在庫数（1ロット=1行の集計値）',
        existing_comment=None
    )
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('lot_current_stock_lot_id_fkey', 'lots', ['lot_id'], ['id'], ondelete='CASCADE')
        batch_op.alter_column('revision',
               existing_type=sa.INTEGER(),
               comment='楽観的ロック用リビジョン番号',
               existing_nullable=False,
               existing_server_default=sa.text('1'))
        batch_op.alter_column('deleted_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='論理削除日時',
               existing_nullable=True)
        batch_op.alter_column('updated_by',
               existing_type=sa.VARCHAR(length=50),
               comment='更新者',
               existing_nullable=True)
        batch_op.alter_column('created_by',
               existing_type=sa.VARCHAR(length=50),
               comment='作成者',
               existing_nullable=True)
        batch_op.alter_column('updated_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='レコード更新日時',
               existing_nullable=False,
               existing_server_default=sa.text('now()'))
        batch_op.alter_column('created_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='レコード作成日時',
               existing_nullable=False,
               existing_server_default=sa.text('now()'))
        batch_op.alter_column('last_updated',
               existing_type=postgresql.TIMESTAMP(),
               comment='最終更新日時',
               existing_nullable=True)
        batch_op.alter_column('current_quantity',
               existing_type=sa.DOUBLE_PRECISION(precision=53),
               comment='現在庫数量（入庫-出庫-引当の計算結果）',
               existing_nullable=False)
        batch_op.alter_column('lot_id',
               existing_type=sa.INTEGER(),
               comment='ロットID（PK/FK: lots.id）',
               existing_nullable=False)

    with op.batch_alter_table('inbound_submissions', schema=None) as batch_op:
        batch_op.add_column(sa.Column('source_uri', sa.TEXT(), autoincrement=False, nullable=True, comment='受信ソースURI（ファイル名/パス/URL等）'))
        batch_op.create_table_comment(
        '外部入力の受信単位（OCR/EDI/手動等）のトラッキング',
        existing_comment=None
    )
        batch_op.alter_column('revision',
               existing_type=sa.INTEGER(),
               comment='楽観的ロック用リビジョン番号',
               existing_nullable=False,
               existing_server_default=sa.text('1'))
        batch_op.alter_column('deleted_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='論理削除日時',
               existing_nullable=True)
        batch_op.alter_column('updated_by',
               existing_type=sa.VARCHAR(length=50),
               comment='更新者',
               existing_nullable=True)
        batch_op.alter_column('created_by',
               existing_type=sa.VARCHAR(length=50),
               comment='作成者',
               existing_nullable=True)
        batch_op.alter_column('updated_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='レコード更新日時',
               existing_nullable=False,
               existing_server_default=sa.text('now()'))
        batch_op.alter_column('created_at',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True,
               comment='レコード作成日時')
        batch_op.alter_column('error_details',
               existing_type=sa.TEXT(),
               comment='エラー詳細（テキスト/JSON可）',
               existing_nullable=True)
        batch_op.alter_column('skipped_records',
               existing_type=sa.INTEGER(),
               comment='スキップ件数',
               existing_nullable=True)
        batch_op.alter_column('failed_records',
               existing_type=sa.INTEGER(),
               comment='失敗件数',
               existing_nullable=True)
        batch_op.alter_column('processed_records',
               existing_type=sa.INTEGER(),
               comment='処理済み件数',
               existing_nullable=True)
        batch_op.alter_column('total_records',
               existing_type=sa.INTEGER(),
               comment='受信レコード総数',
               existing_nullable=True)
        batch_op.alter_column('status',
               existing_type=sa.TEXT(),
               comment='処理状態（pending/success/failed等）',
               existing_nullable=True)
        batch_op.alter_column('submission_date',
               existing_type=postgresql.TIMESTAMP(),
               comment='受信日時',
               existing_nullable=True)
        batch_op.alter_column('operator',
               existing_type=sa.TEXT(),
               comment='操作者（ユーザーIDまたはロボ名）',
               existing_nullable=True)
        batch_op.alter_column('source',
               existing_type=sa.VARCHAR(length=20),
               comment='入力経路（ocr/manual/edi等）',
               existing_nullable=False,
               existing_server_default=sa.text("'ocr'::character varying"))
        batch_op.alter_column('submission_id',
               existing_type=sa.TEXT(),
               comment='受信側の一意識別子（重複防止）',
               existing_nullable=True)
        batch_op.alter_column('id',
               existing_type=sa.INTEGER(),
               comment='主キー（自動採番）',
               existing_nullable=False,
               autoincrement=True)
        batch_op.drop_column('target_type')
        batch_op.drop_column('schema_version')
        batch_op.drop_column('source_file')

    with op.batch_alter_table('forecasts', schema=None) as batch_op:
        batch_op.create_table_comment(
        '需要予測（DELFOR等のEDI受信データ）',
        existing_comment=None
    )
        batch_op.create_foreign_key('fk_forecasts_customer', 'customers', ['customer_id'], ['id'], ondelete='RESTRICT')
        batch_op.create_foreign_key('fk_forecasts_product', 'products', ['product_id'], ['id'], ondelete='RESTRICT')
        batch_op.drop_index('idx_customer_product')
        batch_op.alter_column('revision',
               existing_type=sa.INTEGER(),
               comment='楽観的ロック用リビジョン番号',
               existing_nullable=False,
               existing_server_default=sa.text('1'))
        batch_op.alter_column('deleted_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='論理削除日時',
               existing_nullable=True)
        batch_op.alter_column('updated_by',
               existing_type=sa.VARCHAR(length=50),
               comment='更新者',
               existing_nullable=True)
        batch_op.alter_column('created_by',
               existing_type=sa.VARCHAR(length=50),
               comment='作成者',
               existing_nullable=True)
        batch_op.alter_column('updated_at',
               existing_type=sa.DateTime(),
               type_=postgresql.TIMESTAMP(timezone=True),
               comment='レコード更新日時',
               existing_nullable=False)
        batch_op.alter_column('created_at',
               existing_type=sa.DateTime(),
               type_=postgresql.TIMESTAMP(timezone=True),
               comment='レコード作成日時',
               existing_nullable=False)
        batch_op.alter_column('is_active',
               existing_type=sa.BOOLEAN(),
               comment='有効版フラグ',
               existing_nullable=False)
        batch_op.alter_column('source_system',
               existing_type=sa.VARCHAR(length=32),
               comment='受信元システム識別子',
               existing_nullable=False)
        batch_op.alter_column('version_issued_at',
               existing_type=postgresql.TIMESTAMP(timezone=True),
               comment='版の発行日時（受信基準時刻）',
               existing_nullable=False)
        batch_op.alter_column('version_no',
               existing_type=sa.INTEGER(),
               comment='版番号（同一期間内の差替管理）',
               existing_nullable=False)
        batch_op.alter_column('qty_forecast',
               existing_type=sa.INTEGER(),
               comment='予測数量',
               existing_nullable=False)
        batch_op.alter_column('year_month',
               existing_type=sa.VARCHAR(length=7),
               comment='月次キー（YYYY-MM, granularity=monthly時）',
               existing_nullable=True)
        batch_op.alter_column('date_dekad_start',
               existing_type=sa.DATE(),
               comment='旬開始日キー（granularity=dekad時）',
               existing_nullable=True)
        batch_op.alter_column('date_day',
               existing_type=sa.DATE(),
               comment='日次キー（granularity=daily時）',
               existing_nullable=True)
        batch_op.alter_column('granularity',
               existing_type=sa.VARCHAR(length=16),
               comment='粒度（daily/weekly/dekadなど）',
               existing_nullable=False)
        batch_op.alter_column('customer_id',
               existing_type=sa.String(length=64),
               type_=sa.INTEGER(),
               comment='得意先ID（FK: customers.*）/または得意先コード',
               existing_nullable=False)
        batch_op.alter_column('product_id',
               existing_type=sa.String(length=64),
               type_=sa.INTEGER(),
               comment='製品ID/または製品コード',
               existing_nullable=False)
        batch_op.alter_column('forecast_id',
               existing_type=sa.Integer(),
               type_=sa.VARCHAR(length=36),
               nullable=False,
               comment='外部予測ID（一意）')
        batch_op.alter_column('id',
               existing_type=sa.INTEGER(),
               comment='主キー（自動採番）',
               existing_nullable=False,
               autoincrement=True)
        batch_op.drop_column('supplier_id')

    with op.batch_alter_table('expiry_rules', schema=None) as batch_op:
        batch_op.add_column(sa.Column('priority', sa.INTEGER(), autoincrement=False, nullable=False, comment='優先順位（小さいほど優先）'))
        batch_op.add_column(sa.Column('is_active', sa.BOOLEAN(), server_default=sa.text('true'), autoincrement=False, nullable=False, comment='有効フラグ'))
        batch_op.add_column(sa.Column('product_id', sa.INTEGER(), autoincrement=False, nullable=True, comment='製品ID（FK: products.id / NULL=全製品）'))
        batch_op.add_column(sa.Column('rule_type', sa.TEXT(), autoincrement=False, nullable=False, comment='ルール種別（days/fixed_date）'))
        batch_op.add_column(sa.Column('supplier_id', sa.INTEGER(), autoincrement=False, nullable=True, comment='仕入先ID（FK: suppliers.id / NULL=全仕入先）'))
        batch_op.add_column(sa.Column('fixed_date', sa.DATE(), autoincrement=False, nullable=True, comment='固定日付'))
        batch_op.add_column(sa.Column('days', sa.INTEGER(), autoincrement=False, nullable=True, comment='有効日数（製造日から）'))
        batch_op.create_table_comment(
        '有効期限ルール定義（製品/仕入先ごと）',
        existing_comment=None
    )
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('fk_expiry_rules_product', 'products', ['product_id'], ['id'], ondelete='SET NULL')
        batch_op.create_foreign_key('fk_expiry_rules_supplier', 'suppliers', ['supplier_id'], ['id'], ondelete='SET NULL')
        batch_op.drop_constraint('uq_expiry_rule', type_='unique')
        batch_op.alter_column('revision',
               existing_type=sa.INTEGER(),
               comment='楽観的ロック用リビジョン番号',
               existing_nullable=False,
               existing_server_default=sa.text('1'))
        batch_op.alter_column('deleted_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='論理削除日時',
               existing_nullable=True)
        batch_op.alter_column('updated_by',
               existing_type=sa.VARCHAR(length=50),
               comment='更新者',
               existing_nullable=True)
        batch_op.alter_column('created_by',
               existing_type=sa.VARCHAR(length=50),
               comment='作成者',
               existing_nullable=True)
        batch_op.alter_column('updated_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='レコード更新日時',
               existing_nullable=False,
               existing_server_default=sa.text('now()'))
        batch_op.alter_column('created_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='レコード作成日時',
               existing_nullable=False,
               existing_server_default=sa.text('now()'))
        batch_op.alter_column('id',
               existing_type=sa.INTEGER(),
               comment='主キー（自動採番）',
               existing_nullable=False,
               autoincrement=True)
        batch_op.drop_column('warning_days')
        batch_op.drop_column('shelf_life_days')
        batch_op.drop_column('supplier_code')
        batch_op.drop_column('product_code')

    with op.batch_alter_table('delivery_places', schema=None) as batch_op:
        batch_op.add_column(sa.Column('delivery_place_code', sa.VARCHAR(), autoincrement=False, nullable=False, comment='納入場所コード（UK）'))
        batch_op.add_column(sa.Column('delivery_place_name', sa.VARCHAR(), autoincrement=False, nullable=False, comment='納入場所名称'))
        batch_op.add_column(sa.Column('postal_code', sa.VARCHAR(), autoincrement=False, nullable=True, comment='郵便番号'))
        batch_op.create_table_comment(
        '納入場所マスタ（配送先情報）',
        existing_comment=None
    )
        batch_op.drop_index(batch_op.f('ix_delivery_places_place_code'))
        batch_op.create_unique_constraint('uq_delivery_places_code', ['delivery_place_code'])
        batch_op.create_index('ix_delivery_places_delivery_place_code', ['delivery_place_code'], unique=False)
        batch_op.alter_column('revision',
               existing_type=sa.INTEGER(),
               comment='楽観的ロック用リビジョン番号',
               existing_nullable=False,
               existing_server_default=sa.text('1'))
        batch_op.alter_column('deleted_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='論理削除日時',
               existing_nullable=True)
        batch_op.alter_column('updated_by',
               existing_type=sa.VARCHAR(length=50),
               comment='更新者',
               existing_nullable=True)
        batch_op.alter_column('created_by',
               existing_type=sa.VARCHAR(length=50),
               comment='作成者',
               existing_nullable=True)
        batch_op.alter_column('updated_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='レコード更新日時',
               existing_nullable=False,
               existing_server_default=sa.text('now()'))
        batch_op.alter_column('created_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='レコード作成日時',
               existing_nullable=False,
               existing_server_default=sa.text('now()'))
        batch_op.alter_column('is_active',
               existing_type=sa.Integer(),
               type_=sa.BOOLEAN(),
               comment='有効フラグ（1=有効,0=無効）',
               existing_nullable=False,
               existing_server_default=sa.text('true'))
        batch_op.alter_column('address',
               existing_type=sa.Text(),
               type_=sa.VARCHAR(),
               comment='住所',
               existing_nullable=True)
        batch_op.alter_column('id',
               existing_type=sa.INTEGER(),
               comment='主キー（自動採番）',
               existing_nullable=False,
               autoincrement=True,
               existing_server_default=sa.text("nextval('delivery_places_id_seq'::regclass)"))
        batch_op.drop_column('place_name')
        batch_op.drop_column('place_code')

    with op.batch_alter_table('customers', schema=None) as batch_op:
        batch_op.add_column(sa.Column('id', sa.INTEGER(), server_default=sa.text("nextval('customers_id_seq'::regclass)"), autoincrement=True, nullable=False, comment='主キー（自動採番）'))
        batch_op.create_table_comment(
        '得意先マスタ',
        existing_comment=None
    )
        batch_op.create_unique_constraint('uq_customers_customer_code', ['customer_code'])
        batch_op.create_index('ix_customers_customer_code', ['customer_code'], unique=False)
        batch_op.alter_column('revision',
               existing_type=sa.INTEGER(),
               comment='楽観的ロック用リビジョン番号',
               existing_nullable=False,
               existing_server_default=sa.text('1'))
        batch_op.alter_column('deleted_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='論理削除日時',
               existing_nullable=True)
        batch_op.alter_column('updated_by',
               existing_type=sa.VARCHAR(length=50),
               comment='更新者',
               existing_nullable=True)
        batch_op.alter_column('created_by',
               existing_type=sa.VARCHAR(length=50),
               comment='作成者',
               existing_nullable=True)
        batch_op.alter_column('updated_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='レコード更新日時',
               existing_nullable=False,
               existing_server_default=sa.text('now()'))
        batch_op.alter_column('created_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='レコード作成日時',
               existing_nullable=False,
               existing_server_default=sa.text('now()'))
        batch_op.alter_column('address',
               existing_type=sa.TEXT(),
               comment='住所',
               existing_nullable=True)
        batch_op.alter_column('customer_name',
               existing_type=sa.TEXT(),
               comment='得意先名称',
               existing_nullable=False)
        batch_op.alter_column('customer_code',
               existing_type=sa.TEXT(),
               comment='得意先コード（PK/UK）',
               existing_nullable=False)

    with op.batch_alter_table('allocations', schema=None) as batch_op:
        batch_op.create_table_comment(
        '受注明細へのロット引当情報',
        existing_comment=None
    )
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('allocations_lot_id_fkey', 'lots', ['lot_id'], ['id'], ondelete='CASCADE')
        batch_op.drop_index('ix_allocations_order_line')
        batch_op.drop_index('ix_allocations_lot')
        batch_op.create_index('ix_alloc_ol', ['order_line_id'], unique=False)
        batch_op.create_index('ix_alloc_lot', ['lot_id'], unique=False)
        batch_op.alter_column('revision',
               existing_type=sa.INTEGER(),
               comment='楽観的ロック用リビジョン番号',
               existing_nullable=False,
               existing_server_default=sa.text('1'))
        batch_op.alter_column('deleted_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='論理削除日時',
               existing_nullable=True)
        batch_op.alter_column('updated_by',
               existing_type=sa.VARCHAR(length=50),
               comment='更新者',
               existing_nullable=True)
        batch_op.alter_column('created_by',
               existing_type=sa.VARCHAR(length=50),
               comment='作成者',
               existing_nullable=True)
        batch_op.alter_column('updated_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='レコード更新日時',
               existing_nullable=False,
               existing_server_default=sa.text('now()'))
        batch_op.alter_column('created_at',
               existing_type=postgresql.TIMESTAMP(),
               comment='レコード作成日時',
               existing_nullable=False,
               existing_server_default=sa.text('now()'))
        batch_op.alter_column('destination_id',
               existing_type=sa.INTEGER(),
               comment='納入場所ID（FK: delivery_places.id）',
               existing_nullable=True)
        batch_op.alter_column('allocated_qty',
               existing_type=sa.Numeric(precision=15, scale=4),
               type_=sa.DOUBLE_PRECISION(precision=53),
               comment='引当数量',
               existing_nullable=False)
        batch_op.alter_column('lot_id',
               existing_type=sa.INTEGER(),
               comment='ロットID（FK: lots.id）',
               existing_nullable=False)
        batch_op.alter_column('order_line_id',
               existing_type=sa.INTEGER(),
               comment='受注明細ID（FK: order_lines.id）',
               existing_nullable=False)
        batch_op.alter_column('id',
               existing_type=sa.INTEGER(),
               comment='主キー（自動採番）',
               existing_nullable=False,
               autoincrement=True)
        batch_op.drop_column('allocation_date')

    op.drop_table('shipping')
    with op.batch_alter_table('receipt_lines', schema=None) as batch_op:
        batch_op.drop_index('ix_receipt_lines_lot')

    op.drop_table('receipt_lines')
    op.drop_table('product_uom_conversions')
    with op.batch_alter_table('receipt_headers', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_receipt_headers_warehouse_id'))

    op.drop_table('receipt_headers')
    op.drop_table('next_div_map')
    # ### end Alembic commands ###
    # ### end Alembic commands ###
