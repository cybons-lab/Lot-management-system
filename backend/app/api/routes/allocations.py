# backend/app/api/routes/allocations.py
"""
引当エンドポイント
I/O整形とHTTP例外変換のみを責務とする
"""

from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.domain.allocation import (
    DomainError,
    InsufficientStockError,
    InvalidTransitionError,
    NotFoundError,
)
from app.schemas import (
    AllocationResponse,
    DragAssignRequest,
    DragAssignResponse,
)
from app.services.allocation_service import AllocationService

router = APIRouter(prefix="/allocations", tags=["allocations"])


@router.post("/drag-assign", response_model=DragAssignResponse)
def drag_assign_allocation(
    request: DragAssignRequest,
    db: Session = Depends(get_db)
):
    """
    ドラッグ引当
    
    Args:
        request: 引当リクエスト
        db: DBセッション
        
    Returns:
        引当結果
    """
    service = AllocationService(db)
    
    try:
        # サービス層のユースケースを呼び出し
        allocation, movement = service.allocate_lot(
            order_line_id=request.order_line_id,
            lot_id=request.lot_id,
            allocate_qty=request.allocate_qty
        )
        
        # コミット
        db.commit()
        
        # レスポンス整形
        return DragAssignResponse(
            success=True,
            message=f"引当成功: {allocation.allocated_qty} 個",
            allocation_id=allocation.id
        )
    
    except NotFoundError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=e.message
        )
    
    except InsufficientStockError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=e.message
        )
    
    except DomainError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=e.message
        )
    
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal server error: {str(e)}"
        )


@router.delete("/{allocation_id}", status_code=status.HTTP_204_NO_CONTENT)
def cancel_allocation(
    allocation_id: int,
    db: Session = Depends(get_db)
):
    """
    引当取消
    
    Args:
        allocation_id: 引当ID
        db: DBセッション
    """
    service = AllocationService(db)
    
    try:
        # サービス層のユースケースを呼び出し
        allocation, movement = service.cancel_allocation(allocation_id)
        
        # コミット
        db.commit()
        
        return None
    
    except NotFoundError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=e.message
        )
    
    except InvalidTransitionError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=e.message
        )
    
    except DomainError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=e.message
        )
    
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal server error: {str(e)}"
        )


@router.get("/{allocation_id}", response_model=AllocationResponse)
def get_allocation(
    allocation_id: int,
    db: Session = Depends(get_db)
):
    """
    引当詳細取得
    
    Args:
        allocation_id: 引当ID
        db: DBセッション
        
    Returns:
        引当詳細
    """
    service = AllocationService(db)
    
    try:
        allocation = service.get_allocation(allocation_id)
        
        # レスポンス整形（Pydanticモデルに変換）
        return AllocationResponse.from_orm(allocation)
    
    except NotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=e.message
        )
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal server error: {str(e)}"
        )
