# backend/app/models/base_model.py
"""
SQLAlchemy Base Model
共通のベースクラスと外部キー制約の設定
"""

from sqlalchemy import event
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.engine import Engine

# SQLiteで外部キー制約を有効化
@event.listens_for(Engine, "connect")
def set_sqlite_pragma(dbapi_conn, connection_record):
    """SQLite接続時にPRAGMA foreign_keys=ONを実行"""
    cursor = dbapi_conn.cursor()
    cursor.execute("PRAGMA foreign_keys=ON")
    cursor.close()

# 全てのモデルの基底クラス
Base = declarative_base()
