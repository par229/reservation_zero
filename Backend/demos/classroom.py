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
            current_space=["False"] * capacity  # current_space를 capacity 크기의 False로 초기화
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

@csrf_exempt
def getclass(request):
    if request.method == 'GET':
        # 요청에서 class_room_id를 받아옵니다.
        classroom_id = request.GET.get('classroom_id')

        if classroom_id:
            try:
                # 해당 ID의 ClassRoom 객체를 찾습니다.
                classroom = ClassRoom.objects.get(id=classroom_id)

                # ClassRoom 정보를 JSON 형식으로 반환합니다.
                classroom_info = {
                    'classroom_id': classroom.id,
                    'course_name': classroom.course_name.name,  # Lecture의 name을 가져옴
                    'classroom_location': classroom.classroom_location,
                    'class_time': classroom.class_time,
                    'capacity': classroom.capacity,
                    'current_students': classroom.current_students,
                    'current_space': classroom.current_space,
                }

                return JsonResponse({'status': 200, 'classroom': classroom_info})

            except ClassRoom.DoesNotExist:
                return JsonResponse({'status': 400, 'error': 'ClassRoom does not exist'}, status=400)
        else:
            return JsonResponse({'status': 400, 'error': 'classroom_id is required'}, status=400)

    return JsonResponse({'status': 405, 'error': 'Method not allowed'}, status=405)


@csrf_exempt
def updateclass(request):
    if request.method == 'PUT':
        data = json.loads(request.body)
        
        classroom_id = data.get('classroom_id')  # 업데이트할 ClassRoom ID
        classroom_location = data.get('classroom_location')
        class_time = data.get('class_time')
        capacity = data.get('capacity')
        current_students = data.get('current_students')

        try:
            # 해당 ID의 ClassRoom 객체를 찾음
            classroom = ClassRoom.objects.get(id=classroom_id)
            
            # 필드 값이 제공되면 업데이트
            if classroom_location:
                classroom.classroom_location = classroom_location
            if class_time:
                classroom.class_time = class_time
            if capacity is not None:
                classroom.capacity = capacity
                classroom.current_space = [False] * capacity  # capacity에 맞춰 current_space 배열 업데이트
            if current_students is not None:
                classroom.current_students = current_students
            
            classroom.save()  # 변경 사항 저장

            return JsonResponse({'status': 200, 'message': 'ClassRoom updated successfully'})

        except ClassRoom.DoesNotExist:
            return JsonResponse({'status': 400, 'error': 'ClassRoom does not exist'}, status=400)
        except Exception as e:
            return JsonResponse({'status': 500, 'error': str(e)}, status=500)

    return JsonResponse({'status': 405, 'error': 'Method not allowed'}, status=405)

@csrf_exempt
def getallclasses(request):
    if request.method == 'GET':
        try:
            # 모든 ClassRoom 객체 조회
            classrooms = ClassRoom.objects.all()

            # 반환할 데이터 리스트 준비
            classroom_list = []
            for classroom in classrooms:
                classroom_info = {
                    'classroom_id': classroom.id,
                    'course_name': classroom.course_name.name,  # Lecture의 name을 가져옴
                    'classroom_location': classroom.classroom_location,
                    'class_time': classroom.class_time,
                    'capacity': classroom.capacity,
                    'current_students': classroom.current_students,
                    'current_space': classroom.current_space,
                }
                classroom_list.append(classroom_info)

            return JsonResponse({'status': 200, 'classrooms': classroom_list})

        except Exception as e:
            return JsonResponse({'status': 500, 'error': str(e)}, status=500)

    return JsonResponse({'status': 405, 'error': 'Method not allowed'}, status=405)