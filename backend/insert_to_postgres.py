import os
import django
import json

# 변경됨: Django settings 연결
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

# 변경됨: Django 비밀번호 해시 함수 사용
from django.contrib.auth.hashers import make_password

# 변경됨: FastAPI SQLAlchemy 모델이 아니라 Django models.py의 모델 import
from app.models import (
    Users,
    Employees,
    Todos,
    Products,
    Sales,
)

MAX_INT = 2_147_483_647


def import_users(users):
    for u in users:
        try:
            user_id = int(u["id"])
        except ValueError:
            print(f"건너뜀(숫자 아님): {u['id']}")
            continue

        if user_id > MAX_INT:
            print(f"건너뜀(Integer 초과): {user_id}")
            continue

        Users.objects.create(
            id=user_id,
            username=u["name"],
            # 변경됨: Django check_password()와 호환되는 해시로 저장
            password=make_password(u["password"]),
            age=u["age"],
            email=u["email"],
            city=u["city"],
        )


def import_employees(employees):
    for e in employees:
        if not str(e["id"]).isdigit():
            print(f"건너뜀: {e['id']}")
            continue

        Employees.objects.create(
            id=int(e["id"]),
            name=e["name"],
            email=e["email"],
            job=e["job"],
            pay=int(e["pay"]),
        )


def import_todos(todos):
    for t in todos:
        Todos.objects.create(
            id=int(t["id"]),
            subject=t["subject"],
            checked=t["checked"],
        )


def import_products(products):
    for p in products:
        Products.objects.create(
            id=int(p["id"]),
            product_name=p["product_name"],
            color=p["color"],
            price=p["cost_price"],
            sale_price=p["sale_price"],
            product_category_code=p["category_code"],
        )


def import_sales(sales):
    for s in sales:
        Sales.objects.create(
            id=int(s["id"]),
            user_id=s["user_id"],
            product_id=s["product_id"],
            quantity=s["quantity"],
            discount_rate=s["discount_rate"],
            total_price=s["total_price"],
            created_at=s["created_at"],
        )


def main():
    with open("db.json", encoding="utf-8") as f:
        data = json.load(f)

    import_users(data["user"])
    import_employees(data["employees"])
    import_todos(data["todos"])
    import_products(data["product"])
    import_sales(data["sales"])

    print("데이터 Import 완료")


if __name__ == "__main__":
    main()