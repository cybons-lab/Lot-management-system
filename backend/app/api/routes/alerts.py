from fastapi import APIRouter

router = APIRouter()


@router.get("")
def get_alerts():
    """
    アラート一覧を取得（未実装）
    
    TODO: アラート機能の実装
    """
    return {"message": "アラート機能は今後実装予定です"}
