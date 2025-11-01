# backend/app/models/sales.py
"""
販売関連のモデル定義
受注、受注明細、引当、出荷
"""

from sqlalchemy import Column, Integer, Text, Float, ForeignKey, UniqueConstraint, Index, Date, DateTime, func
from sqlalchemy.orm import relationship
from .base_model import Base


class Order(Base):
    """受注ヘッダ"""
    __tablename__ = "orders"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    order_no = Column(Text, unique=True, nullable=False)
    customer_code = Column(Text, ForeignKey("customers.customer_code"), nullable=False)
    order_date = Column(Date)
    status = Column(Text, default='open')  # open, allocated, shipped, closed, cancelled
    sap_order_id = Column(Text)
    sap_status = Column(Text)
    sap_sent_at = Column(DateTime)
    sap_error_msg = Column(Text)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
    # リレーション
    customer = relationship("Customer", back_populates="orders")
    lines = relationship("OrderLine", back_populates="order", cascade="all, delete-orphan")
    sap_sync_logs = relationship("SapSyncLog", back_populates="order")


class OrderLine(Base):
    """受注明細"""
    __tablename__ = "order_lines"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    order_id = Column(Integer, ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    line_no = Column(Integer, nullable=False)
    product_code = Column(Text, ForeignKey("products.product_code"), nullable=False)
    quantity = Column(Float, nullable=False)
    unit = Column(Text)
    due_date = Column(Date)
    created_at = Column(DateTime, default=func.now())
    
    # リレーション
    order = relationship("Order", back_populates="lines")
    product = relationship("Product", back_populates="order_lines")
    allocations = relationship("Allocation", back_populates="order_line", cascade="all, delete-orphan")
    shippings = relationship("Shipping", back_populates="order_line")
    purchase_requests = relationship("PurchaseRequest", back_populates="src_order_line")
    
    __table_args__ = (
        UniqueConstraint('order_id', 'line_no', name='uq_order_line'),
    )


class Allocation(Base):
    """引当(受注明細とロットの紐付け)"""
    __tablename__ = "allocations"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    order_line_id = Column(Integer, ForeignKey("order_lines.id", ondelete="CASCADE"), nullable=False)
    lot_id = Column(Integer, ForeignKey("lots.id", ondelete="CASCADE"), nullable=False)
    allocated_qty = Column(Float, nullable=False)
    allocated_at = Column(DateTime, default=func.now())
    
    # リレーション
    order_line = relationship("OrderLine", back_populates="allocations")
    lot = relationship("Lot", back_populates="allocations")
    
    __table_args__ = (
        Index('ix_alloc_ol', 'order_line_id'),
        Index('ix_alloc_lot', 'lot_id'),
    )


class Shipping(Base):
    """出荷記録"""
    __tablename__ = "shipping"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    lot_id = Column(Integer, ForeignKey("lots.id"), nullable=False)
    order_line_id = Column(Integer, ForeignKey("order_lines.id"))
    shipped_quantity = Column(Float, nullable=False)
    shipping_date = Column(Date, nullable=False)
    destination_code = Column(Text)
    destination_name = Column(Text)
    destination_address = Column(Text)
    contact_person = Column(Text)
    contact_phone = Column(Text)
    delivery_time_slot = Column(Text)
    tracking_number = Column(Text)
    carrier = Column(Text)
    carrier_service = Column(Text)
    notes = Column(Text)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
    # リレーション
    lot = relationship("Lot", back_populates="shippings")
    order_line = relationship("OrderLine", back_populates="shippings")


class PurchaseRequest(Base):
    """仮発注(在庫不足時)"""
    __tablename__ = "purchase_requests"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    product_code = Column(Text, ForeignKey("products.product_code"), nullable=False)
    supplier_code = Column(Text, ForeignKey("suppliers.supplier_code"), nullable=False)
    requested_qty = Column(Float, nullable=False)
    unit = Column(Text)
    reason_code = Column(Text, nullable=False)  # shortage, expired, etc.
    src_order_line_id = Column(Integer, ForeignKey("order_lines.id"))
    requested_date = Column(Date, default=func.current_date())
    desired_receipt_date = Column(Date)
    status = Column(Text, default='draft')  # draft, submitted, ordered, received, cancelled
    sap_po_id = Column(Text)
    notes = Column(Text)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
    # リレーション
    supplier = relationship("Supplier", back_populates="purchase_requests")
    src_order_line = relationship("OrderLine", back_populates="purchase_requests")
