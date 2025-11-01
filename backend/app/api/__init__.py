# backend/app/api/__init__.py
"""
API Package
APIルーティングの集約
"""

from .routes import (
    masters_router,
    lots_router,
    receipts_router,
    orders_router,
    integration_router,
    admin_router,
)

__all__ = [
    "masters_router",
    "lots_router",
    "receipts_router",
    "orders_router",
    "integration_router",
    "admin_router",
]
