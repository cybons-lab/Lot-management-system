# backend/app/services/order_service.py
"""
受注サービス
ユースケース実装とトランザクション管理を担当
"""

from datetime import date
from typing import List, Optional, Tuple

from sqlalchemy.orm import Session

from app.domain.order import (
    DuplicateOrderError,
    InvalidOrderStatusError,
    OrderBusinessRules,
    OrderLineNotFoundError,
    OrderNotFoundError,
    OrderStateMachine,
    OrderValidationError,
)
from app.models import Order, OrderLine
from app.repositories.order_repository import OrderLineRepository, OrderRepository


class OrderService:
    """受注サービス"""
    
    def __init__(self, db: Session):
        self.db = db
        self.order_repo = OrderRepository(db)
        self.order_line_repo = OrderLineRepository(db)
    
    def create_order(
        self,
        order_no: str,
        customer_code: str,
        order_date: date,
        lines: List[dict]
    ) -> Order:
        """
        受注を作成
        
        Args:
            order_no: 受注番号
            customer_code: 得意先コード
            order_date: 受注日
            lines: 受注明細のリスト
            
        Returns:
            作成された受注エンティティ
            
        Raises:
            DuplicateOrderError: 受注番号が重複している場合
            OrderValidationError: バリデーションエラーの場合
        """
        # 受注番号のバリデーション
        OrderBusinessRules.validate_order_no(order_no)
        
        # 重複チェック
        existing_order = self.order_repo.find_by_order_no(order_no)
        if existing_order:
            raise DuplicateOrderError(order_no)
        
        # トランザクション開始
        with self.db.begin_nested():
            # 受注ヘッダ作成
            order = self.order_repo.create(
                order_no=order_no,
                customer_code=customer_code,
                order_date=order_date,
                status="open"
            )
            self.db.flush()  # IDを取得
            
            # 受注明細作成
            for line in lines:
                # 数量のバリデーション
                OrderBusinessRules.validate_quantity(
                    line["quantity"],
                    line["product_code"]
                )
                
                # 納期のバリデーション
                if line.get("due_date"):
                    OrderBusinessRules.validate_due_date(
                        line["due_date"],
                        order_date
                    )
                
                self.order_line_repo.create(
                    order_id=order.id,
                    line_no=line["line_no"],
                    product_code=line["product_code"],
                    quantity=line["quantity"],
                    unit=line["unit"],
                    due_date=line.get("due_date")
                )
        
        return order
    
    def get_order(self, order_id: int, with_lines: bool = False) -> Order:
        """
        受注を取得
        
        Args:
            order_id: 受注ID
            with_lines: 受注明細を含めるか
            
        Returns:
            受注エンティティ
            
        Raises:
            OrderNotFoundError: 受注が存在しない場合
        """
        order = self.order_repo.find_by_id(order_id, with_lines=with_lines)
        if not order:
            raise OrderNotFoundError(order_id)
        return order
    
    def get_orders(
        self,
        skip: int = 0,
        limit: int = 100,
        status: Optional[str] = None,
        customer_code: Optional[str] = None,
        date_from: Optional[date] = None,
        date_to: Optional[date] = None
    ) -> List[Order]:
        """
        受注一覧を取得
        
        Args:
            skip: スキップ件数
            limit: 取得件数
            status: ステータスフィルタ
            customer_code: 得意先コードフィルタ
            date_from: 開始日フィルタ
            date_to: 終了日フィルタ
            
        Returns:
            受注エンティティのリスト
        """
        return self.order_repo.find_all(
            skip=skip,
            limit=limit,
            status=status,
            customer_code=customer_code,
            date_from=date_from,
            date_to=date_to
        )
    
    def update_order_status(
        self,
        order_id: int,
        new_status: str
    ) -> Order:
        """
        受注ステータスを更新
        
        Args:
            order_id: 受注ID
            new_status: 新しいステータス
            
        Returns:
            更新された受注エンティティ
            
        Raises:
            OrderNotFoundError: 受注が存在しない場合
            InvalidOrderStatusError: 状態遷移が不正な場合
        """
        # 受注取得
        order = self.get_order(order_id)
        
        # 状態遷移チェック
        OrderStateMachine.validate_transition(
            order.status,
            new_status,
            operation=f"change status to {new_status}"
        )
        
        # トランザクション開始
        with self.db.begin_nested():
            self.order_repo.update_status(order, new_status)
        
        return order
    
    def cancel_order(self, order_id: int) -> Order:
        """
        受注をキャンセル
        
        Args:
            order_id: 受注ID
            
        Returns:
            キャンセルされた受注エンティティ
            
        Raises:
            OrderNotFoundError: 受注が存在しない場合
            InvalidOrderStatusError: キャンセルできない状態の場合
        """
        return self.update_order_status(order_id, "cancelled")
    
    def get_order_line(self, order_line_id: int) -> OrderLine:
        """
        受注明細を取得
        
        Args:
            order_line_id: 受注明細ID
            
        Returns:
            受注明細エンティティ
            
        Raises:
            OrderLineNotFoundError: 受注明細が存在しない場合
        """
        order_line = self.order_line_repo.find_by_id(order_line_id)
        if not order_line:
            raise OrderLineNotFoundError(order_line_id)
        return order_line
    
    def calculate_order_line_progress(
        self,
        order_line: OrderLine,
        allocated_qty: float
    ) -> float:
        """
        受注明細の進捗率を計算
        
        Args:
            order_line: 受注明細エンティティ
            allocated_qty: 引当済み数量
            
        Returns:
            進捗率（0-100%）
        """
        return OrderBusinessRules.calculate_progress_percentage(
            order_line.quantity,
            allocated_qty
        )
