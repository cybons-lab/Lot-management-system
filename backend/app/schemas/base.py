# backend/app/schemas/base.py
"""
Pydantic Base Schemas
共通の基底スキーマ
"""

from pydantic import BaseModel, ConfigDict
from datetime import datetime, date
from typing import Optional


class BaseSchema(BaseModel):
    """共通基底スキーマ"""
    model_config = ConfigDict(from_attributes=True)


class TimestampMixin(BaseModel):
    """タイムスタンプミックスイン"""
    created_at: datetime
    updated_at: Optional[datetime] = None


class ResponseBase(BaseModel):
    """API共通レスポンス"""
    success: bool
    message: Optional[str] = None
    data: Optional[dict] = None
