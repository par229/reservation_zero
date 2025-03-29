from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Lecture, ClassRoom
import json

@csrf_exempt
def addclass(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        course_name = data.get('course_name')  # 강의 이름을 받아옴
        classroom_location = data.get('classroom_location')  # 교실 위치
        class_time = data.get('class_time')  # 수업 시간
        capacity = data.get('capacity')  # 정원
        current_students = data.get('current_students')  # 현재 학생 수

        # 해당 강의가 존재하는지 확인
        try:
            lecture = Lecture.objects.get(id=course_name)
        except Lecture.DoesNotExist:
            return JsonResponse({'status': 400, 'error': 'Lecture does not exist'}, status=400)

        # ClassRoom 객체 생성
        classroom = ClassRoom.objects.create(
            course_name=lecture,  # 강의 객체를 연결
            classroom_location=classroom_location,
            class_time=class_time,
            capacity=capacity,
            current_students=current_students,
            current_space=[False] * capacity  # current_space를 capacity 크기의 False로 초기화
        )

        return JsonResponse({'status': 200, 'message': 'ClassRoom created successfully', 'classroom_id': classroom.id})
    
    return JsonResponse({'status': 405, 'error': 'Method not allowed'}, status=405)

@csrf_exempt
def deleteclass(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        classroom_id = data.get('classroom_id')  # 삭제할 ClassRoom의 ID
        
        try:
            # 해당 ID의 ClassRoom 객체를 가져옴
            classroom = ClassRoom.objects.get(id=classroom_id)
            classroom.delete()  # 해당 객체 삭제
            return JsonResponse({'status': 200, 'message': 'ClassRoom deleted successfully'})
        except ClassRoom.DoesNotExist:
            return JsonResponse({'status': 400, 'error': 'ClassRoom does not exist'}, status=400)

    return JsonResponse({'status': 405, 'error': 'Method not allowed'}, status=405)