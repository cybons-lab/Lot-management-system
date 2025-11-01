# backend/app/core/database.py
"""
データベース接続設定
SQLAlchemyセッション管理
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from typing import Generator

from .config import settings
from app.models import Base


# エンジンの作成
engine = create_engine(
    settings.DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in settings.DATABASE_URL else {},
    echo=settings.ENVIRONMENT == "development",  # 開発環境ではSQLログを出力
)

# セッションファクトリの作成
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db() -> Generator[Session, None, None]:
    """
    データベースセッションの依存性注入用関数
    
    Yields:
        Session: SQLAlchemyセッション
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db() -> None:
    """
    データベースの初期化
    全テーブルの作成
    """
    # すべてのモデルをインポート(Base.metadataに登録)
    import app.models  # noqa
    
    # テーブル作成
    Base.metadata.create_all(bind=engine)
    print("✅ データベーステーブルを作成しました")


def drop_db() -> None:
    """
    データベースの削除
    全テーブルの削除(開発環境のみ)
    """
    if settings.ENVIRONMENT != "production":
        Base.metadata.drop_all(bind=engine)
        print("🗑️  データベーステーブルを削除しました")
    else:
        raise ValueError("本番環境ではデータベースの削除はできません")
