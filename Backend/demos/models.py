from django.db import models
from django.contrib.auth.models import AbstractUser
import json

# Create your models here.

from django.contrib.auth.models import BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """
        Create and return a user with an email as the username.
        """
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """
        Create and return a superuser with an email as the username.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractUser):
    username = None  # username 필드를 제거
    email = models.EmailField(unique=True)  # 이메일을 아이디로 사용
    name = models.CharField(max_length=10, null=True, blank=True)
    nickname = models.CharField(max_length=20, unique=True, null=True, blank=True)
    birth = models.DateField(null=True, blank=True)

    objects = CustomUserManager()  # 커스텀 매니저 사용

    USERNAME_FIELD = 'email'  # 로그인 시 이메일을 사용
    REQUIRED_FIELDS = ['name', 'nickname', 'birth']  # 필수 필드 설정
  
class Lecture(models.Model):
    name = models.CharField(max_length=100)

class ClassRoom(models.Model):
    course_name = models.ForeignKey('Lecture', on_delete=models.CASCADE)
    classroom_location = models.CharField(max_length=100)
    class_time = models.DateTimeField()
    capacity = models.IntegerField()
    current_students = models.IntegerField()
    current_space = models.TextField(blank=True, default='[]')  # JSON 문자열로 저장

    def save(self, *args, **kwargs):
        if isinstance(self.current_space, list):  # 리스트가 있으면 문자열로 직렬화
            self.current_space = json.dumps(self.current_space)
        super().save(*args, **kwargs)

    def get_current_space(self):
        return json.loads(self.current_space)  # JSON 문자열을 리스트로 역직렬화


class Reservation(models.Model):
    student_name = models.CharField(max_length=100)
    classroom_location = models.ForeignKey(ClassRoom, on_delete=models.CASCADE)
    seat_number = models.IntegerField()

    def __str__(self):
<<<<<<< HEAD
        return f"{self.student_name} - {self.classroom_location.classroom_location} - Seat {self.seat_number}"
=======
        return f"{self.student_name} - {self.classroom_location.classroom_location} - Seat {self.seat_number}"
>>>>>>> main
