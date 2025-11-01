from fastapi import APIRouter, HTTPException, status
from app.core.database import reset_db
from app.core.config import settings
from app.schemas import ResetResponse

router = APIRouter()


@router.post("/reset-database", response_model=ResetResponse)
async def reset_database():
    """
    データベースを完全にリセットする
    
    警告: このエンドポイントは全てのデータを削除します
    開発環境でのみ使用してください
    
    Returns:
        ResetResponse: リセット結果
    
    Raises:
        HTTPException: 本番環境で実行しようとした場合
    """
    # 本番環境では実行不可
    if not settings.is_development:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="データベースリセットは開発環境でのみ使用可能です"
        )
    
    try:
        # データベースをリセット
        reset_db()
        
        return ResetResponse(
            success=True,
            message="データベースが正常にリセットされました",
            deleted_tables=["lots"]  # 削除されたテーブル名のリスト
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"データベースリセット中にエラーが発生しました: {str(e)}"
        )


@router.get("/health")
async def health_check():
    """
    ヘルスチェックエンドポイント
    
    Returns:
        dict: ヘルスチェック結果
    """
    return {
        "status": "healthy",
        "environment": settings.ENVIRONMENT,
        "database": "sqlite"
    }
