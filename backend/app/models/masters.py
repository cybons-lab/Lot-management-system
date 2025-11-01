# backend/app/models/masters.py
"""
マスタテーブルのモデル定義
倉庫、仕入先、得意先、製品、単位換算
"""

from sqlalchemy import Column, Integer, Text, Float, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from .base_model import Base


class Warehouse(Base):
    """倉庫マスタ"""
    __tablename__ = "warehouses"
    
    warehouse_code = Column(Text, primary_key=True)
    warehouse_name = Column(Text, nullable=False)
    address = Column(Text)
    is_active = Column(Integer, default=1)
    
    # リレーション
    lots = relationship("Lot", back_populates="warehouse")


class Supplier(Base):
    """仕入先マスタ"""
    __tablename__ = "suppliers"
    
    supplier_code = Column(Text, primary_key=True)
    supplier_name = Column(Text, nullable=False)
    address = Column(Text)
    
    # リレーション
    lots = relationship("Lot", back_populates="supplier")
    purchase_requests = relationship("PurchaseRequest", back_populates="supplier")


class Customer(Base):
    """得意先マスタ"""
    __tablename__ = "customers"
    
    customer_code = Column(Text, primary_key=True)
    customer_name = Column(Text, nullable=False)
    address = Column(Text)
    
    # リレーション
    orders = relationship("Order", back_populates="customer")


class Product(Base):
    """製品マスタ"""
    __tablename__ = "products"
    
    product_code = Column(Text, primary_key=True)
    product_name = Column(Text, nullable=False)
    customer_part_no = Column(Text)
    maker_part_no = Column(Text)
    internal_unit = Column(Text, nullable=False, default='EA')  # 内部管理単位
    packaging = Column(Text)
    assemble_div = Column(Text)
    next_div = Column(Text)
    shelf_life_days = Column(Integer)
    requires_lot_number = Column(Integer, default=1)
    
    # リレーション
    lots = relationship("Lot", back_populates="product")
    conversions = relationship("ProductUomConversion", back_populates="product", cascade="all, delete-orphan")
    order_lines = relationship("OrderLine", back_populates="product")
    receipt_lines = relationship("ReceiptLine", back_populates="product")


class ProductUomConversion(Base):
    """製品単位換算テーブル"""
    __tablename__ = "product_uom_conversions"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    product_code = Column(Text, ForeignKey("products.product_code"), nullable=False)
    source_unit = Column(Text, nullable=False)  # 変換元単位 (例: "CASE")
    source_value = Column(Float, nullable=False, default=1.0)  # 変換元の値 (例: 1)
    internal_unit_value = Column(Float, nullable=False)  # 内部単位での値 (例: 10 EA)
    
    # リレーション
    product = relationship("Product", back_populates="conversions")
    
    __table_args__ = (
        UniqueConstraint('product_code', 'source_unit', name='uq_product_unit'),
    )
