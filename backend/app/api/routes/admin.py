# backend/app/api/routes/admin.py
"""
管理機能のAPIエンドポイント
ヘルスチェック、データベースリセット等
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.api.deps import get_db
from app.core.config import settings
from app.core.database import drop_db, init_db
from app.schemas import ResponseBase

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/health")
def health_check():
    """ヘルスチェック"""
    return {
        "status": "healthy",
        "environment": settings.ENVIRONMENT,
        "app_name": settings.APP_NAME,
        "app_version": settings.APP_VERSION,
        "database": "sqlite" if "sqlite" in settings.DATABASE_URL else "other",
    }


@router.post("/reset-database", response_model=ResponseBase)
def reset_database(db: Session = Depends(get_db)):
    """
    データベースリセット
    
    警告: 全データが削除されます!
    本番環境では無効化してください。
    """
    if settings.ENVIRONMENT == "production":
        raise HTTPException(
            status_code=403,
            detail="本番環境ではデータベースのリセットはできません"
        )
    
    try:
        # 現在のセッションをクローズ
        db.close()
        
        # 全テーブル削除
        drop_db()
        
        # 全テーブル再作成
        init_db()
        
        return ResponseBase(
            success=True,
            message="データベースが正常にリセットされました",
            data={
                "environment": settings.ENVIRONMENT,
                "action": "reset_completed"
            }
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"データベースリセット中にエラーが発生しました: {str(e)}"
        )


@router.post("/init-sample-data", response_model=ResponseBase)
def init_sample_data(db: Session = Depends(get_db)):
    """
    サンプルデータ投入
    
    開発・テスト用のサンプルマスタデータを投入します
    """
    if settings.ENVIRONMENT == "production":
        raise HTTPException(
            status_code=403,
            detail="本番環境ではサンプルデータの投入はできません"
        )
    
    try:
        # サンプルデータSQL
        sample_data = """
        -- 倉庫
        INSERT OR IGNORE INTO warehouses (warehouse_code, warehouse_name, address) VALUES
        ('WH001', '第一倉庫', '東京都江東区'),
        ('WH002', '第二倉庫', '埼玉県川口市');
        
        -- 仕入先
        INSERT OR IGNORE INTO suppliers (supplier_code, supplier_name, address) VALUES
        ('SUP001', 'サプライヤーA', '大阪府大阪市'),
        ('SUP002', 'サプライヤーB', '愛知県名古屋市');
        
        -- 得意先
        INSERT OR IGNORE INTO customers (customer_code, customer_name, address) VALUES
        ('CUS001', '得意先A', '神奈川県横浜市'),
        ('CUS002', '得意先B', '千葉県千葉市');
        
        -- 製品
        INSERT OR IGNORE INTO products (product_code, product_name, internal_unit, requires_lot_number) VALUES
        ('PRD-0001', '製品A', 'EA', 1),
        ('PRD-0002', '製品B', 'EA', 1),
        ('PRD-0003', '製品C(ロット不要)', 'EA', 0);
        """
        
        for statement in sample_data.split(';'):
            if statement.strip():
                db.execute(text(statement))
        
        db.commit()
        
        return ResponseBase(
            success=True,
            message="サンプルデータを投入しました",
            data={
                "warehouses": 2,
                "suppliers": 2,
                "customers": 2,
                "products": 3,
            }
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"サンプルデータ投入中にエラーが発生しました: {str(e)}"
        )
