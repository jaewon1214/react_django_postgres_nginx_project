#service
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
import jwt
from datetime import datetime, timedelta
from rest_framework.permissions import AllowAny
from django.conf import settings
from django.contrib.auth.hashers import check_password


from .models import (
    Users,
    Products,
    Employees,
    Todos,
    Sales
)
from .serializers import (
    ProductSerializer,
    UserSerializer,
    UserRegisterSerializer,
    EmployeeSerializer,
    TodosSerializer,
    SalesSerializer
)
from rest_framework.permissions import IsAuthenticated


def create_token(user):
    payload = {
        "user_id": user.id,
        "username": user.username,
        "exp": datetime.utcnow() + settings.JWT_ACCESS_TOKEN_EXPIRE,
        "iat": datetime.utcnow(),
    }

    token = jwt.encode(
        payload,
        settings.JWT_SECRET,
        algorithm=settings.JWT_ALGORITHM,
    )
    return token


def get_user_from_token(request):
    auth_header = request.headers.get('Authorization')

    if not auth_header:
        return None, '토큰이 없습니다.'

    try:
        token_type, token = auth_header.split(' ')

        if token_type != 'Bearer':
            return None, 'Bearer 토큰 형식이 아닙니다.'

        payload = jwt.decode(
            token,
            settings.JWT_SECRET,
            algorithms=[settings.JWT_ALGORITHM],
        )
        user = Users.objects.get(id=payload['user_id'])

        return user, None

    except jwt.ExpiredSignatureError:
        return None, '토큰이 만료되었습니다.'
    except jwt.InvalidTokenError:
        return None, '유효하지 않은 토큰입니다.'
    except Users.DoesNotExist:
        return None, '사용자를 찾을 수 없습니다.'
    except ValueError:
        return None, 'Authorization 형식이 잘못되었습니다.'


class RegisterView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            return Response(
                UserSerializer(user).data,
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response(
                {'message': 'username, password가 필요합니다.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = Users.objects.get(username=username)
        except Users.DoesNotExist:
            return Response(
                {'message': '아이디 또는 비밀번호가 틀렸습니다.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        if not check_password(password, user.password):
            return Response(
                {'message': '아이디 또는 비밀번호가 틀렸습니다.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        token = create_token(user)

        return Response({
            'message': '로그인 성공',
            'accessToken': token,
            'user': UserSerializer(user).data
        })



class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)




class UserView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    # get all / get one
    def get(self, request, pk=None):
        if pk is None:
            users = Users.objects.all()
            serializer = UserSerializer(users, many=True)
            return Response(serializer.data)

        try:
            user = Users.objects.get(pk=pk)
        except Users.DoesNotExist:
            return Response(
                {"message": "사용자를 찾을 수 없습니다."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = UserSerializer(user)
        return Response(serializer.data)

    # post
    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # put
    def put(self, request, pk):
        try:
            user = Users.objects.get(pk=pk)
        except Users.DoesNotExist:
            return Response(
                {"message": "사용자를 찾을 수 없습니다."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = UserSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # delete
    def delete(self, request, pk):
        try:
            user = Users.objects.get(pk=pk)
        except Users.DoesNotExist:
            return Response(
                {"message": "사용자를 찾을 수 없습니다."},
                status=status.HTTP_404_NOT_FOUND
            )

        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ProductView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    # get all / get one
    def get(self, request, pk=None):
        if pk is None:
            product = Products.objects.all()
            serializer = ProductSerializer(product, many=True)
            return Response(serializer.data)

        try:
            product = Products.objects.get(pk=pk)
        except Products.DoesNotExist:
            return Response(
                {"message": "사용자를 찾을 수 없습니다."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = ProductSerializer(product)
        return Response(serializer.data)

    # post
    def post(self, request):
        serializer = ProductSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # put
    def put(self, request, pk):
        try:
            product = Products.objects.get(pk=pk)
        except Products.DoesNotExist:
            return Response(
                {"message": "사용자를 찾을 수 없습니다."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = ProductSerializer(product, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # delete
    def delete(self, request, pk):
        try:
            product = Products.objects.get(pk=pk)
        except Products.DoesNotExist:
            return Response(
                {"message": "사용자를 찾을 수 없습니다."},
                status=status.HTTP_404_NOT_FOUND
            )

        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class EmployeeView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    # get all / get one
    def get(self, request, pk=None):
        if pk is None:
            emp = Employees.objects.all()
            serializer = EmployeeSerializer(emp, many=True)
            return Response(serializer.data)

        try:
            emp = Employees.objects.get(pk=pk)
        except Employees.DoesNotExist:
            return Response(
                {"message": "사용자를 찾을 수 없습니다."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = EmployeeSerializer(emp)
        return Response(serializer.data)

    # post
    def post(self, request):
        serializer = EmployeeSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # put
    def put(self, request, pk):
        try:
            emp = Employees.objects.get(pk=pk)
        except Employees.DoesNotExist:
            return Response(
                {"message": "사용자를 찾을 수 없습니다."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = EmployeeSerializer(emp, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # delete
    def delete(self, request, pk):
        try:
            emp = Employees.objects.get(pk=pk)
        except Employees.DoesNotExist:
            return Response(
                {"message": "사용자를 찾을 수 없습니다."},
                status=status.HTTP_404_NOT_FOUND
            )

        emp.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class TodoView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    # get all / get one
    def get(self, request, pk=None):
        if pk is None:
            todo = Todos.objects.all()
            serializer = TodosSerializer(todo, many=True)
            return Response(serializer.data)

        try:
            todo = Todos.objects.get(pk=pk)
        except Todos.DoesNotExist:
            return Response(
                {"message": "사용자를 찾을 수 없습니다."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = TodosSerializer(todo)
        return Response(serializer.data)

    # post
    def post(self, request):
        serializer = TodosSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # put
    def put(self, request, pk):
        try:
            todo = Todos.objects.get(pk=pk)
        except Todos.DoesNotExist:
            return Response(
                {"message": "사용자를 찾을 수 없습니다."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = TodosSerializer(todo, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # delete
    def delete(self, request, pk):
        try:
            todo = Todos.objects.get(pk=pk)
        except Todos.DoesNotExist:
            return Response(
                {"message": "사용자를 찾을 수 없습니다."},
                status=status.HTTP_404_NOT_FOUND
            )

        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class SalesView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    # get all / get one
    def get(self, request, pk=None):
        if pk is None:
            sales = Sales.objects.all()
            serializer = SalesSerializer(sales, many=True)
            return Response(serializer.data)

        try:
            sales = Sales.objects.get(pk=pk)
        except Sales.DoesNotExist:
            return Response(
                {"message": "사용자를 찾을 수 없습니다."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = SalesSerializer(user)
        return Response(serializer.data)



