# backend/app/schemas/__init__.py
"""
Schemas Package
Pydantic スキーマの集約
"""

from .base import BaseSchema, TimestampMixin, ResponseBase

from .masters import (
    # Warehouse
    WarehouseBase, WarehouseCreate, WarehouseUpdate, WarehouseResponse,
    # Supplier
    SupplierBase, SupplierCreate, SupplierUpdate, SupplierResponse,
    # Customer
    CustomerBase, CustomerCreate, CustomerUpdate, CustomerResponse,
    # Product
    ProductBase, ProductCreate, ProductUpdate, ProductResponse,
    # ProductUomConversion
    ProductUomConversionBase, ProductUomConversionCreate, 
    ProductUomConversionUpdate, ProductUomConversionResponse,
)

from .inventory import (
    # Lot
    LotBase, LotCreate, LotUpdate, LotResponse,
    # StockMovement
    StockMovementBase, StockMovementCreate, StockMovementResponse,
    # LotCurrentStock
    LotCurrentStockResponse,
    # Receipt
    ReceiptHeaderBase, ReceiptHeaderCreate, ReceiptHeaderResponse,
    ReceiptLineBase, ReceiptLineCreate, ReceiptLineResponse,
    ReceiptCreateRequest, ReceiptResponse,
    # ExpiryRule
    ExpiryRuleBase, ExpiryRuleCreate, ExpiryRuleUpdate, ExpiryRuleResponse,
)

from .sales import (
    # Order
    OrderBase, OrderCreate, OrderUpdate, OrderResponse,
    OrderWithLinesResponse,
    # OrderLine
    OrderLineBase, OrderLineCreate, OrderLineResponse,
    # Allocation
    AllocationBase, AllocationCreate, AllocationResponse,
    DragAssignRequest, DragAssignResponse,
    # Shipping
    ShippingBase, ShippingCreate, ShippingUpdate, ShippingResponse,
    # PurchaseRequest
    PurchaseRequestBase, PurchaseRequestCreate, 
    PurchaseRequestUpdate, PurchaseRequestResponse,
)

from .integration import (
    # OCR
    OcrOrderRecord, OcrSubmissionRequest, OcrSubmissionResponse,
    # SAP
    SapRegisterTarget, SapRegisterOptions, SapRegisterRequest, 
    SapRegisterResponse, SapSyncLogResponse,
)

__all__ = [
    # Base
    "BaseSchema", "TimestampMixin", "ResponseBase",
    # Masters
    "WarehouseBase", "WarehouseCreate", "WarehouseUpdate", "WarehouseResponse",
    "SupplierBase", "SupplierCreate", "SupplierUpdate", "SupplierResponse",
    "CustomerBase", "CustomerCreate", "CustomerUpdate", "CustomerResponse",
    "ProductBase", "ProductCreate", "ProductUpdate", "ProductResponse",
    "ProductUomConversionBase", "ProductUomConversionCreate", 
    "ProductUomConversionUpdate", "ProductUomConversionResponse",
    # Inventory
    "LotBase", "LotCreate", "LotUpdate", "LotResponse",
    "StockMovementBase", "StockMovementCreate", "StockMovementResponse",
    "LotCurrentStockResponse",
    "ReceiptHeaderBase", "ReceiptHeaderCreate", "ReceiptHeaderResponse",
    "ReceiptLineBase", "ReceiptLineCreate", "ReceiptLineResponse",
    "ReceiptCreateRequest", "ReceiptResponse",
    "ExpiryRuleBase", "ExpiryRuleCreate", "ExpiryRuleUpdate", "ExpiryRuleResponse",
    # Sales
    "OrderBase", "OrderCreate", "OrderUpdate", "OrderResponse",
    "OrderWithLinesResponse",
    "OrderLineBase", "OrderLineCreate", "OrderLineResponse",
    "AllocationBase", "AllocationCreate", "AllocationResponse",
    "DragAssignRequest", "DragAssignResponse",
    "ShippingBase", "ShippingCreate", "ShippingUpdate", "ShippingResponse",
    "PurchaseRequestBase", "PurchaseRequestCreate", 
    "PurchaseRequestUpdate", "PurchaseRequestResponse",
    # Integration
    "OcrOrderRecord", "OcrSubmissionRequest", "OcrSubmissionResponse",
    "SapRegisterTarget", "SapRegisterOptions", "SapRegisterRequest", 
    "SapRegisterResponse", "SapSyncLogResponse",
]
