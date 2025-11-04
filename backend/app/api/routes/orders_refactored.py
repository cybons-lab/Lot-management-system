# backend/app/api/routes/orders.py
"""
受注エンドポイント
I/O整形とHTTP例外変換のみを責務とする
"""

from datetime import date
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.domain.order import (
    DuplicateOrderError,
    InvalidOrderStatusError,
    OrderDomainError,
    OrderLineNotFoundError,
    OrderNotFoundError,
    OrderValidationError,
)
from app.schemas import (
    OrderCreate,
    OrderResponse,
    OrderUpdate,
    OrderWithLinesResponse,
)
from app.services.order_service import OrderService

router = APIRouter(prefix="/orders", tags=["orders"])


@router.get("", response_model=List[OrderResponse])
def list_orders(
    skip: int = 0,
    limit: int = 100,
    status: Optional[str] = None,
    customer_code: Optional[str] = None,
    date_from: Optional[date] = None,
    date_to: Optional[date] = None,
    db: Session = Depends(get_db)
):
    """
    受注一覧取得
    
    Args:
        skip: スキップ件数
        limit: 取得件数
        status: ステータスフィルタ
        customer_code: 得意先コードフィルタ
        date_from: 開始日フィルタ
        date_to: 終了日フィルタ
        db: DBセッション
        
    Returns:
        受注一覧
    """
    service = OrderService(db)
    
    try:
        orders = service.get_orders(
            skip=skip,
            limit=limit,
            status=status,
            customer_code=customer_code,
            date_from=date_from,
            date_to=date_to
        )
        return orders
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal server error: {str(e)}"
        )


@router.get("/{order_id}", response_model=OrderWithLinesResponse)
def get_order(
    order_id: int,
    db: Session = Depends(get_db)
):
    """
    受注詳細取得
    
    Args:
        order_id: 受注ID
        db: DBセッション
        
    Returns:
        受注詳細
    """
    service = OrderService(db)
    
    try:
        order = service.get_order(order_id, with_lines=True)
        return order
    
    except OrderNotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=e.message
        )
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal server error: {str(e)}"
        )


@router.post("", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
def create_order(
    request: OrderCreate,
    db: Session = Depends(get_db)
):
    """
    受注作成
    
    Args:
        request: 受注作成リクエスト
        db: DBセッション
        
    Returns:
        作成された受注
    """
    service = OrderService(db)
    
    try:
        # サービス層のユースケースを呼び出し
        order = service.create_order(
            order_no=request.order_no,
            customer_code=request.customer_code,
            order_date=request.order_date,
            lines=request.lines
        )
        
        # コミット
        db.commit()
        db.refresh(order)
        
        return order
    
    except DuplicateOrderError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=e.message
        )
    
    except OrderValidationError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=e.message
        )
    
    except OrderDomainError as e:
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


@router.patch("/{order_id}/status", response_model=OrderResponse)
def update_order_status(
    order_id: int,
    request: OrderUpdate,
    db: Session = Depends(get_db)
):
    """
    受注ステータス更新
    
    Args:
        order_id: 受注ID
        request: ステータス更新リクエスト
        db: DBセッション
        
    Returns:
        更新された受注
    """
    service = OrderService(db)
    
    try:
        order = service.update_order_status(order_id, request.status)
        
        # コミット
        db.commit()
        db.refresh(order)
        
        return order
    
    except OrderNotFoundError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=e.message
        )
    
    except InvalidOrderStatusError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=e.message
        )
    
    except OrderDomainError as e:
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


@router.delete("/{order_id}/cancel", status_code=status.HTTP_204_NO_CONTENT)
def cancel_order(
    order_id: int,
    db: Session = Depends(get_db)
):
    """
    受注キャンセル
    
    Args:
        order_id: 受注ID
        db: DBセッション
    """
    service = OrderService(db)
    
    try:
        service.cancel_order(order_id)
        
        # コミット
        db.commit()
        
        return None
    
    except OrderNotFoundError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=e.message
        )
    
    except InvalidOrderStatusError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=e.message
        )
    
    except OrderDomainError as e:
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
