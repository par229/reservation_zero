from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views, lecture, classroom, reservation

app_name = "demos"

urlpatterns = [
    path("signup/", views.signup, name="signup"),
    path("login/", TokenObtainPairView.as_view(), name="login"),  # JWT 로그인
    path("logout/", views.logout, name="logout"),
    path("addclass/", classroom.addclass, name="addclass"),
<<<<<<< HEAD
    path("deleteclass/", classroom.deleteclass, name="deleteclass"),
    path("updateclass/", classroom.updateclass, name="updateclass"),
    path("getclass/", classroom.getclass, name ="getclass"),
    path("getallclasses/", classroom.getallclasses, name="getallclasses"),
    path('make_reservation/', reservation.make_reservation, name='make_reservation'),
    path('delete_reservation/', reservation.delete_reservation, name='delete_reservation'),
    path('view_reservations/', reservation.view_reservations, name='view_reservations'),
=======
    path("lecture/create/", views.create_lecture, name="create_lecture"),
    path("lecture/delete/", views.delete_lecture, name="delete_lecture"),
    path("lecture/find/", views.find_lecture, name="search_lecture"),
    #path("deleteclass/", views.deleteclass, name="deleteclass"),
>>>>>>> ea6eb5a (feat: 강의 추가, 삭제, 검색 로직 추가)
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
