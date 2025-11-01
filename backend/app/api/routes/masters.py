# backend/app/api/routes/masters.py
"""
マスタ管理のAPIエンドポイント
倉庫、仕入先、得意先、製品
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.api.deps import get_db
from app.models import Warehouse, Supplier, Customer, Product
from app.schemas import (
    WarehouseCreate, WarehouseUpdate, WarehouseResponse,
    SupplierCreate, SupplierUpdate, SupplierResponse,
    CustomerCreate, CustomerUpdate, CustomerResponse,
    ProductCreate, ProductUpdate, ProductResponse,
)

router = APIRouter(prefix="/masters", tags=["masters"])


# ===== Warehouses =====
@router.get("/warehouses", response_model=List[WarehouseResponse])
def list_warehouses(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """倉庫一覧取得"""
    warehouses = db.query(Warehouse).offset(skip).limit(limit).all()
    return warehouses


@router.post("/warehouses", response_model=WarehouseResponse, status_code=201)
def create_warehouse(
    warehouse: WarehouseCreate,
    db: Session = Depends(get_db)
):
    """倉庫登録"""
    # 重複チェック
    existing = db.query(Warehouse).filter(
        Warehouse.warehouse_code == warehouse.warehouse_code
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="倉庫コードが既に存在します")
    
    db_warehouse = Warehouse(**warehouse.model_dump())
    db.add(db_warehouse)
    db.commit()
    db.refresh(db_warehouse)
    return db_warehouse


@router.put("/warehouses/{warehouse_code}", response_model=WarehouseResponse)
def update_warehouse(
    warehouse_code: str,
    warehouse: WarehouseUpdate,
    db: Session = Depends(get_db)
):
    """倉庫更新"""
    db_warehouse = db.query(Warehouse).filter(
        Warehouse.warehouse_code == warehouse_code
    ).first()
    if not db_warehouse:
        raise HTTPException(status_code=404, detail="倉庫が見つかりません")
    
    for key, value in warehouse.model_dump(exclude_unset=True).items():
        setattr(db_warehouse, key, value)
    
    db.commit()
    db.refresh(db_warehouse)
    return db_warehouse


# ===== Suppliers =====
@router.get("/suppliers", response_model=List[SupplierResponse])
def list_suppliers(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """仕入先一覧取得"""
    suppliers = db.query(Supplier).offset(skip).limit(limit).all()
    return suppliers


@router.post("/suppliers", response_model=SupplierResponse, status_code=201)
def create_supplier(
    supplier: SupplierCreate,
    db: Session = Depends(get_db)
):
    """仕入先登録"""
    existing = db.query(Supplier).filter(
        Supplier.supplier_code == supplier.supplier_code
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="仕入先コードが既に存在します")
    
    db_supplier = Supplier(**supplier.model_dump())
    db.add(db_supplier)
    db.commit()
    db.refresh(db_supplier)
    return db_supplier


# ===== Customers =====
@router.get("/customers", response_model=List[CustomerResponse])
def list_customers(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """得意先一覧取得"""
    customers = db.query(Customer).offset(skip).limit(limit).all()
    return customers


@router.post("/customers", response_model=CustomerResponse, status_code=201)
def create_customer(
    customer: CustomerCreate,
    db: Session = Depends(get_db)
):
    """得意先登録"""
    existing = db.query(Customer).filter(
        Customer.customer_code == customer.customer_code
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="得意先コードが既に存在します")
    
    db_customer = Customer(**customer.model_dump())
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)
    return db_customer


# ===== Products =====
@router.get("/products", response_model=List[ProductResponse])
def list_products(
    skip: int = 0,
    limit: int = 100,
    search: str = None,
    db: Session = Depends(get_db)
):
    """製品一覧取得"""
    query = db.query(Product)
    
    if search:
        query = query.filter(
            (Product.product_name.contains(search)) |
            (Product.product_code.contains(search))
        )
    
    products = query.offset(skip).limit(limit).all()
    return products


@router.post("/products", response_model=ProductResponse, status_code=201)
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db)
):
    """製品登録"""
    existing = db.query(Product).filter(
        Product.product_code == product.product_code
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="製品コードが既に存在します")
    
    db_product = Product(**product.model_dump())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product


@router.get("/products/{product_code}", response_model=ProductResponse)
def get_product(
    product_code: str,
    db: Session = Depends(get_db)
):
    """製品詳細取得"""
    product = db.query(Product).filter(
        Product.product_code == product_code
    ).first()
    if not product:
        raise HTTPException(status_code=404, detail="製品が見つかりません")
    return product
