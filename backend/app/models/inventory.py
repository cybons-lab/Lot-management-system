# backend/app/models/inventory.py
"""
在庫関連のモデル定義
ロット、在庫変動、現在在庫、入荷伝票
"""

from sqlalchemy import Column, Integer, Text, Float, ForeignKey, UniqueConstraint, Index, Date, DateTime, func
from sqlalchemy.orm import relationship
from .base_model import Base


class Lot(Base):
    """ロットマスタ"""
    __tablename__ = "lots"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    supplier_code = Column(Text, ForeignKey("suppliers.supplier_code"), nullable=False)
    product_code = Column(Text, ForeignKey("products.product_code"), nullable=False)
    lot_number = Column(Text, nullable=False)
    receipt_date = Column(Date, nullable=False)
    mfg_date = Column(Date)
    expiry_date = Column(Date)
    warehouse_code = Column(Text, ForeignKey("warehouses.warehouse_code"))
    kanban_class = Column(Text)
    sales_unit = Column(Text)
    inventory_unit = Column(Text)
    received_by = Column(Text)
    source_doc = Column(Text)
    qc_certificate_status = Column(Text)
    qc_certificate_file = Column(Text)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
    # リレーション
    supplier = relationship("Supplier", back_populates="lots")
    product = relationship("Product", back_populates="lots")
    warehouse = relationship("Warehouse", back_populates="lots")
    movements = relationship("StockMovement", back_populates="lot", cascade="all, delete-orphan")
    current_stock = relationship("LotCurrentStock", back_populates="lot", uselist=False, cascade="all, delete-orphan")
    receipt_lines = relationship("ReceiptLine", back_populates="lot")
    allocations = relationship("Allocation", back_populates="lot")
    shippings = relationship("Shipping", back_populates="lot")
    
    __table_args__ = (
        UniqueConstraint('supplier_code', 'product_code', 'lot_number', name='uq_lot_supplier_product_no'),
    )


class StockMovement(Base):
    """在庫変動履歴(イベントソーシング)"""
    __tablename__ = "stock_movements"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    lot_id = Column(Integer, ForeignKey("lots.id", ondelete="CASCADE"), nullable=False)
    movement_type = Column(Text, nullable=False)  # receipt, allocate, ship, adjust, transfer_in, transfer_out
    quantity = Column(Float, nullable=False)  # +: 入荷/調整増, -: 引当/出荷/調整減
    related_id = Column(Text)  # 関連する伝票ID
    occurred_at = Column(DateTime, default=func.now())
    
    # リレーション
    lot = relationship("Lot", back_populates="movements")
    
    __table_args__ = (
        Index('ix_stock_movements_lot', 'lot_id'),
    )


class LotCurrentStock(Base):
    """ロット現在在庫(パフォーマンス最適化用サマリテーブル)"""
    __tablename__ = "lot_current_stock"
    
    lot_id = Column(Integer, ForeignKey("lots.id", ondelete="CASCADE"), primary_key=True)
    current_quantity = Column(Float, nullable=False, default=0.0)
    last_updated = Column(DateTime, default=func.now(), onupdate=func.now())
    
    # リレーション
    lot = relationship("Lot", back_populates="current_stock")


class ReceiptHeader(Base):
    """入荷伝票ヘッダ"""
    __tablename__ = "receipt_headers"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    receipt_no = Column(Text, unique=True)
    supplier_code = Column(Text, ForeignKey("suppliers.supplier_code"), nullable=False)
    warehouse_code = Column(Text, ForeignKey("warehouses.warehouse_code"), nullable=False)
    receipt_date = Column(Date, nullable=False)
    created_by = Column(Text)
    notes = Column(Text)
    created_at = Column(DateTime, default=func.now())
    
    # リレーション
    lines = relationship("ReceiptLine", back_populates="header", cascade="all, delete-orphan")


class ReceiptLine(Base):
    """入荷伝票明細"""
    __tablename__ = "receipt_lines"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    header_id = Column(Integer, ForeignKey("receipt_headers.id", ondelete="CASCADE"), nullable=False)
    line_no = Column(Integer, nullable=False)
    product_code = Column(Text, ForeignKey("products.product_code"), nullable=False)
    lot_id = Column(Integer, ForeignKey("lots.id"), nullable=False)
    quantity = Column(Float, nullable=False)
    unit = Column(Text)
    notes = Column(Text)
    created_at = Column(DateTime, default=func.now())
    
    # リレーション
    header = relationship("ReceiptHeader", back_populates="lines")
    product = relationship("Product", back_populates="receipt_lines")
    lot = relationship("Lot", back_populates="receipt_lines")
    
    __table_args__ = (
        UniqueConstraint('header_id', 'line_no', name='uq_receipt_header_line'),
    )


class ExpiryRule(Base):
    """消費期限計算ルール"""
    __tablename__ = "expiry_rules"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    product_code = Column(Text, ForeignKey("products.product_code"))
    supplier_code = Column(Text, ForeignKey("suppliers.supplier_code"))
    rule_type = Column(Text, nullable=False)  # days_from_receipt, days_from_mfg, fixed_date
    days = Column(Integer)
    fixed_date = Column(Date)
    is_active = Column(Integer, default=1)
    priority = Column(Integer, nullable=False)  # 優先度(低い数値=高優先)
