# backend/app/api/deps.py
"""
API 依存性注入ヘルパー
共通の依存関係とユーティリティ
"""

from typing import Generator
from sqlalchemy.orm import Session
from app.core.database import SessionLocal


def get_db() -> Generator[Session, None, None]:
    """
    データベースセッションの依存性注入
    
    Yields:
        Session: SQLAlchemyセッション
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
