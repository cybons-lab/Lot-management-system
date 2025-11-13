from datetime import date
from decimal import Decimal

from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.main import app
from app.models import Customer, DeliveryPlace, Order, OrderLine, Product


def override_get_db():
    from app.db.session import SessionLocal

    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db


def _truncate_all(db: Session) -> None:
    db.query(OrderLine).delete()
    db.query(Order).delete()
    db.query(Product).delete()
    db.query(DeliveryPlace).delete()
    db.query(Customer).delete()
    db.commit()


def test_get_order_detail_includes_product_and_delivery_place():
    client = TestClient(app)
    db: Session = next(override_get_db())

    _truncate_all(db)

    customer = Customer(customer_code="CUST1", customer_name="Customer 1")
    delivery_place = DeliveryPlace(
        delivery_place_code="DP1",
        delivery_place_name="Main Distribution",
    )
    product = Product(
        product_code="PROD1",
        product_name="Sample Product",
        internal_unit="EA",
        base_unit="EA",
        packaging_qty=Decimal("1"),
        packaging_unit="EA",
    )
    product.delivery_place = delivery_place
    product.delivery_place_name = delivery_place.delivery_place_name

    db.add_all([customer, delivery_place, product])
    db.flush()

    order = Order(
        order_no="ORD-001",
        order_date=date.today(),
        status="open",
        customer_id=customer.id,
        customer_code=customer.customer_code,
    )
    db.add(order)
    db.flush()

    line = OrderLine(
        order_id=order.id,
        line_no=1,
        quantity=Decimal("5"),
        unit="EA",
        product_id=product.id,
    )
    db.add(line)
    db.commit()

    response = client.get(f"/orders/{order.id}")
    assert response.status_code == 200, response.text

    payload = response.json()
    assert payload["id"] == order.id
    assert payload["lines"], "order detail should include lines"

    first_line = payload["lines"][0]
    assert first_line["product_id"] == product.id
    assert first_line["product_code"] == product.product_code
    assert first_line["product_name"] == product.product_name
    assert first_line["delivery_place_code"] == delivery_place.delivery_place_code
    assert first_line["delivery_place_name"] == delivery_place.delivery_place_name

    _truncate_all(db)
