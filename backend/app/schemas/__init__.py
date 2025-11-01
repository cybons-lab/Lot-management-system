from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from app.models import LotStatus


# Lotスキーマ
class LotBase(BaseModel):
    """ロットの基本スキーマ"""
    name: str = Field(..., min_length=1, max_length=255, description="ロット名")
    quantity: float = Field(..., gt=0, description="数量")
    status: LotStatus = Field(default=LotStatus.PENDING, description="ステータス")
    description: Optional[str] = Field(None, max_length=1000, description="説明")


class LotCreate(LotBase):
    """ロット作成用スキーマ"""
    pass


class LotUpdate(BaseModel):
    """ロット更新用スキーマ"""
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    quantity: Optional[float] = Field(None, gt=0)
    status: Optional[LotStatus] = None
    description: Optional[str] = Field(None, max_length=1000)


class LotResponse(LotBase):
    """ロットレスポンス用スキーマ"""
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# APIレスポンススキーマ
class ApiResponse(BaseModel):
    """API共通レスポンススキーマ"""
    success: bool = Field(..., description="成功したかどうか")
    message: Optional[str] = Field(None, description="メッセージ")
    data: Optional[dict] = Field(None, description="データ")


class ResetResponse(BaseModel):
    """データベースリセットレスポンス"""
    success: bool
    message: str
    deleted_tables: list[str]
