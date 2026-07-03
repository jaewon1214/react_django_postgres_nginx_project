#web
from app import models
from django.urls import path, include
from .views import (
    UserView,
    ProductView,
    EmployeeView,
    TodoView,
    SalesView,
    RegisterView,
    LoginView,
    MeView
)

urlpatterns = [
    path("users/", UserView.as_view()),
    path("users/<int:pk>/", UserView.as_view()),
    path("products/", ProductView.as_view()),
    path("products/<int:pk>/", ProductView.as_view()),
    path("employees/", EmployeeView.as_view()),
    path("employees/<int:pk>/", EmployeeView.as_view()),
    path("sales/", SalesView.as_view()),
    path("sales/<int:pk>/", SalesView.as_view()),
    path("todos/", TodoView.as_view()),
    path("todos/<int:pk>/", TodoView.as_view()),
    path('auth/register/', RegisterView.as_view()),
    path('auth/login/', LoginView.as_view()),
    path('auth/me/', MeView.as_view()),
]



