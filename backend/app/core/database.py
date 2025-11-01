from sqlalchemy import create_engine, event
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.engine import Engine
from app.core.config import settings

# SQLiteの外部キー制約を有効化
@event.listens_for(Engine, "connect")
def set_sqlite_pragma(dbapi_conn, connection_record):
    """SQLite接続時に外部キー制約を有効化"""
    cursor = dbapi_conn.cursor()
    cursor.execute("PRAGMA foreign_keys=ON")
    cursor.close()

# データベースエンジンの作成
engine = create_engine(
    settings.DATABASE_URL,
    connect_args={"check_same_thread": False},  # SQLite用の設定
    echo=settings.is_development,  # 開発環境ではSQLログを出力
)

# セッションローカルの作成
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# ベースクラスの作成
Base = declarative_base()


def get_db():
    """
    データベースセッションを取得する依存性注入用の関数
    
    Yields:
        Session: データベースセッション
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    """
    データベースの初期化（テーブル作成）
    """
    from app.models import Base as ModelsBase
    ModelsBase.metadata.create_all(bind=engine)


def reset_db():
    """
    データベースのリセット（全テーブル削除後、再作成）
    警告: 全データが削除されます
    """
    from app.models import Base as ModelsBase
    ModelsBase.metadata.drop_all(bind=engine)
    ModelsBase.metadata.create_all(bind=engine)
