# backend/tests/test_orders_refactored.py
"""
受注モジュールのテストコード
既存API入出力の挙動を保証する回帰テスト
"""

import pytest
from datetime import date
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.main import app
from app.models import Base, Order, OrderLine, Customer, Product
from app.api.deps import get_db


# テスト用DB設定
SQLALCHEMY_TEST_DATABASE_URL = "sqlite:///./test_orders.db"
engine = create_engine(SQLALCHEMY_TEST_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture
def db_session():
    """テスト用DBセッション"""
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)


@pytest.fixture
def client(db_session):
    """テスト用クライアント"""
    def override_get_db():
        try:
            yield db_session
        finally:
            db_session.close()
    
    app.dependency_overrides[get_db] = override_get_db
    yield TestClient(app)
    app.dependency_overrides.clear()


@pytest.fixture
def setup_test_data(db_session):
    """テストデータをセットアップ"""
    # 得意先
    customer = Customer(customer_code="CUS-001", customer_name="得意先A")
    db_session.add(customer)
    
    # 製品
    product = Product(
        product_code="PROD-001",
        product_name="製品A",
        packaging_qty=1,
        packaging_unit="EA",
        internal_unit="EA",
        base_unit="EA"
    )
    db_session.add(product)
    
    db_session.commit()
    
    return {
        "customer_code": "CUS-001",
        "product_code": "PROD-001"
    }


class TestOrderAPI:
    """受注APIのテスト"""
    
    def test_create_order_success(self, client, setup_test_data):
        """受注作成が成功すること"""
        response = client.post(
            "/api/orders",
            json={
                "order_no": "ORD-001",
                "customer_code": setup_test_data["customer_code"],
                "order_date": "2024-11-01",
                "lines": [
                    {
                        "line_no": 1,
                        "product_code": setup_test_data["product_code"],
                        "quantity": 100.0,
                        "unit": "EA",
                        "due_date": "2024-11-15"
                    }
                ]
            }
        )
        
        # レスポンス検証
        assert response.status_code == 201
        data = response.json()
        assert data["order_no"] == "ORD-001"
        assert data["status"] == "open"
    
    def test_create_order_duplicate(self, client, setup_test_data, db_session):
        """重複受注番号でエラーが返ること"""
        # 事前に受注を作成
        order = Order(
            order_no="ORD-001",
            customer_code=setup_test_data["customer_code"],
            order_date=date(2024, 11, 1),
            status="open"
        )
        db_session.add(order)
        db_session.commit()
        
        # 重複した受注番号で作成
        response = client.post(
            "/api/orders",
            json={
                "order_no": "ORD-001",
                "customer_code": setup_test_data["customer_code"],
                "order_date": "2024-11-01",
                "lines": []
            }
        )
        
        # レスポンス検証
        assert response.status_code == 409
        assert "already exists" in response.json()["detail"]
    
    def test_get_order_success(self, client, setup_test_data, db_session):
        """受注詳細取得が成功すること"""
        # 事前に受注を作成
        order = Order(
            order_no="ORD-001",
            customer_code=setup_test_data["customer_code"],
            order_date=date(2024, 11, 1),
            status="open"
        )
        db_session.add(order)
        db_session.flush()
        
        order_line = OrderLine(
            order_id=order.id,
            line_no=1,
            product_code=setup_test_data["product_code"],
            quantity=100.0,
            unit="EA"
        )
        db_session.add(order_line)
        db_session.commit()
        
        # 受注詳細取得
        response = client.get(f"/api/orders/{order.id}")
        
        # レスポンス検証
        assert response.status_code == 200
        data = response.json()
        assert data["order_no"] == "ORD-001"
        assert len(data["lines"]) == 1
    
    def test_update_order_status_success(self, client, setup_test_data, db_session):
        """受注ステータス更新が成功すること"""
        # 事前に受注を作成
        order = Order(
            order_no="ORD-001",
            customer_code=setup_test_data["customer_code"],
            order_date=date(2024, 11, 1),
            status="open"
        )
        db_session.add(order)
        db_session.commit()
        
        # ステータス更新
        response = client.patch(
            f"/api/orders/{order.id}/status",
            json={"status": "allocated"}
        )
        
        # レスポンス検証
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "allocated"
    
    def test_cancel_order_success(self, client, setup_test_data, db_session):
        """受注キャンセルが成功すること"""
        # 事前に受注を作成
        order = Order(
            order_no="ORD-001",
            customer_code=setup_test_data["customer_code"],
            order_date=date(2024, 11, 1),
            status="open"
        )
        db_session.add(order)
        db_session.commit()
        
        # キャンセル
        response = client.delete(f"/api/orders/{order.id}/cancel")
        
        # レスポンス検証
        assert response.status_code == 204
        
        # DB確認: ステータスが"cancelled"に変更されていること
        db_session.refresh(order)
        assert order.status == "cancelled"


class TestOrderStateMachine:
    """受注状態遷移のテスト"""
    
    def test_valid_transitions(self):
        """許可された状態遷移"""
        from app.domain.order import OrderStateMachine
        
        # open -> allocated
        assert OrderStateMachine.can_transition("open", "allocated") is True
        
        # allocated -> shipped
        assert OrderStateMachine.can_transition("allocated", "shipped") is True
        
        # shipped -> closed
        assert OrderStateMachine.can_transition("shipped", "closed") is True
    
    def test_invalid_transitions(self):
        """禁止された状態遷移"""
        from app.domain.order import OrderStateMachine, InvalidOrderStatusError
        
        # closed -> open（終端状態からの遷移は不可）
        assert OrderStateMachine.can_transition("closed", "open") is False
        
        # 例外が発生すること
        with pytest.raises(InvalidOrderStatusError):
            OrderStateMachine.validate_transition("closed", "open")


class TestOrderBusinessRules:
    """受注ビジネスルールのテスト"""
    
    def test_validate_quantity(self):
        """数量バリデーション"""
        from app.domain.order import OrderBusinessRules, OrderValidationError
        
        # 正常ケース
        OrderBusinessRules.validate_quantity(100.0, "PROD-001")
        
        # エラーケース（0以下）
        with pytest.raises(OrderValidationError):
            OrderBusinessRules.validate_quantity(0.0, "PROD-001")
        
        with pytest.raises(OrderValidationError):
            OrderBusinessRules.validate_quantity(-10.0, "PROD-001")
    
    def test_calculate_progress_percentage(self):
        """進捗率計算"""
        from app.domain.order import OrderBusinessRules
        
        # 50%
        assert OrderBusinessRules.calculate_progress_percentage(100.0, 50.0) == 50.0
        
        # 100%
        assert OrderBusinessRules.calculate_progress_percentage(100.0, 100.0) == 100.0
        
        # 0%
        assert OrderBusinessRules.calculate_progress_percentage(100.0, 0.0) == 0.0
