from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import CustomUser, Lecture, ClassRoom

admin.site.register(CustomUser)
admin.site.register(Lecture)
admin.site.register(ClassRoom)