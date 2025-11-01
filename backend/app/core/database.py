# backend/app/core/database.py
"""
データベース接続設定
SQLAlchemyセッション管理
"""

import os  # <-- 1. インポート
from pathlib import Path  # <-- 2. インポート
from typing import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from app.models import Base

from .config import settings

# エンジンの作成
engine = create_engine(
    settings.DATABASE_URL,
    connect_args={"check_same_thread": False}
    if "sqlite" in settings.DATABASE_URL
    else {},
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
    (開発環境のみ)
    """
    if settings.ENVIRONMENT != "production":
        # 🔽 --- ここから修正 --- 🔽

        # 1. アクティブな接続をすべて閉じる
        # これにより、Windowsでの "database is locked" や "PermissionError" を防ぐ
        engine.dispose()
        print("ℹ️  DBエンジンを破棄しました (接続プールをクローズ)")

        # 2. SQLiteの場合、物理ファイルを削除
        if "sqlite" in settings.DATABASE_URL:
            try:
                # DATABASE_URLからパスを抽出 (e.g., "sqlite:///D:\path\...")
                db_path_str = settings.DATABASE_URL.split(":///")[1]
                db_path = Path(db_path_str)

                if db_path.exists():
                    os.remove(db_path)
                    print(
                        f"🗑️  SQLite データベースファイル ({db_path}) を物理削除しました"
                    )
                else:
                    print(
                        f"ℹ️  SQLite データベースファイル ({db_path}) は見つかりませんでした (削除スキップ)"
                    )
            except Exception as e:
                print(f"⚠️ SQLiteファイルの削除に失敗しました: {e}")

        # 3. SQLAlchemyのメタデータドロップも実行（非SQLite DB用）
        else:
            Base.metadata.drop_all(bind=engine)
            print("🗑️  データベーステーブルを削除しました")
        # 🔼 --- 修正完了 --- 🔼
    else:
        raise ValueError("本番環境ではデータベースの削除はできません")
