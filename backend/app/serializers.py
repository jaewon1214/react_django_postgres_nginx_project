from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import (
    Users,
    Products,
    Employees,
    Todos,
    Sales
)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ["id", "username", "age", "email", "city"]



class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = "__all__"

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employees
        fields = "__all__"

class TodosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todos
        fields = "__all__"

class SalesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sales
        fields = "__all__"


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'username', 'password', 'age', 'email', 'city']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"])
        return Users.objects.create(**validated_data)
