from sqlalchemy import Column, Integer, String, Float, DateTime, Enum
from sqlalchemy.sql import func
from app.core.database import Base
import enum


class LotStatus(str, enum.Enum):
    """ロットのステータス"""
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


class Lot(Base):
    """ロット管理テーブル"""
    __tablename__ = "lots"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    quantity = Column(Float, nullable=False)
    status = Column(
        Enum(LotStatus),
        default=LotStatus.PENDING,
        nullable=False,
        index=True
    )
    description = Column(String(1000), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False
    )

    def __repr__(self):
        return f"<Lot(id={self.id}, name={self.name}, status={self.status})>"
