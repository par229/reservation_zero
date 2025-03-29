from demos.models import Lecture
from django.http import JsonResponse
from rest_framework_simplejwt.tokens import RefreshToken
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def create_lecture(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        name = data.get('name')

        if not name:
            return JsonResponse({"error": "You should enter the name value"}, status=400)

        if Lecture.objects.filter(name=name).exists():
            return JsonResponse({"error": "already exist lecture"}, status=400)

        Lecture.objects.create(name=name)
        return JsonResponse({"message": f"lecture: '{name}' is created"}, status=201)
    
    return JsonResponse({"error": "wrong request"}, status=400)


@csrf_exempt
def delete_lecture(request):
    if request.method == 'DELETE':
        data = json.loads(request.body)
        name = data.get('name')

        if not name:
            return JsonResponse({"error": "You should enter the name value"}, status=400)

        lecture_qs = Lecture.objects.filter(name=name)
        if not lecture_qs.exists():
            return JsonResponse({"error": "the lecture dosen't exist"}, status=404)

        lecture_qs.delete()
        return JsonResponse({"message": f"lecture: '{name}' is deleted"}, status=200)
    
    return JsonResponse({"error": "wrong request"}, status=400)


@csrf_exempt
def find_lecture(request):
    if request.method == 'GET':
        data = json.loads(request.body)
        lecture_name = data.get('name')

        # 강의 입력 여부
        if not lecture_name:
            return JsonResponse({"error": "name은 필수 입력 값입니다."}, status=400)
        
        lecture_name = Lecture.objects.filter(name = lecture_name).first()

        if not lecture_name:
            return JsonResponse({"error": "존재하지 않는 강의입니다."}, status=400)
        
        # 강의 검색 성공
        return JsonResponse({"message": f"강의'{lecture_name.name}'가 검색되었습니다."}, status=200)
    
    return JsonResponse({"error": "잘못된 요청입니다."}, status=400)