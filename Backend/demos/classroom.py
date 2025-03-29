from demos.models import CustomUser
from django.http import JsonResponse
from rest_framework_simplejwt.tokens import RefreshToken
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt 
def addclass(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        course_name = data.get('course_name')
        classroom_location = data.get('course_name')
        class_time = data.get('course_name')
        capacity = data.get('course_name')
        current_students = data.get('course_name')