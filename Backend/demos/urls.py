from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views, lecture, classroom

app_name = "demos"

urlpatterns = [
    path("signup/", views.signup, name="signup"),
    path("login/", TokenObtainPairView.as_view(), name="login"),  # JWT 로그인
    path("logout/", views.logout, name="logout"),
    path("addclass/", classroom.addclass, name="addclass"),
    path("lecture/create/", views.create_lecture, name="create_lecture"),
    path("lecture/delete/", views.delete_lecture, name="delete_lecture"),
    path("lecture/find/", views.find_lecture, name="search_lecture"),
    #path("deleteclass/", views.deleteclass, name="deleteclass"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
