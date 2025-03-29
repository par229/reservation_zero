from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Lecture, ClassRoom, Reservation
import json

@csrf_exempt
def make_reservation(request):
    data = json.loads(request.body)
    classroom_location = data.get('classroom_location')
    seat = data.get('seat')
    student_name = data.get('name')
    
    try:
        # 해당하는 강의실 객체를 찾음
        class_room = ClassRoom.objects.get(classroom_location=classroom_location)

        # 강의실이 가득 찼는지 확인
        if class_room.capacity <= class_room.current_students:
            return JsonResponse({'status': 400, 'error': 'Classroom is full'}, status=400)

        # 좌석 번호가 유효한지 확인
        if seat < 0 or seat >= class_room.capacity:
            return JsonResponse({'status': 400, 'error': 'Invalid seat number'}, status=400)

        # 선택한 좌석이 이미 예약되어 있는지 확인
        if class_room.current_space[seat] != False:
            return JsonResponse({'status': 400, 'error': 'Selected seat is already booked'}, status=400)

        # 좌석 예약: 선택한 좌석에 학생 이름을 저장
        class_room.current_space[seat] = student_name

        # 학생 수 업데이트
        class_room.current_students += 1

        # 변경사항 저장
        class_room.save()

        # Create a new reservation object
        reservation = Reservation.objects.create(
            classroom_location=class_room,
            seat=seat,
            student_name=student_name
        )

        # Optionally, save reservation time or other details
        reservation.save()

        return JsonResponse({'status': 200, 'message': 'Reservation successful'})

    except ClassRoom.DoesNotExist:
        return JsonResponse({'status': 400, 'error': 'Classroom does not exist'}, status=400)
    except Exception as e:
        return JsonResponse({'status': 500, 'error': str(e)}, status=500)

    
@csrf_exempt
def delete_reservation(request):
    data = json.loads(request.body)
    classroom_location = data.get('classroom_location')
    seat = data.get('seat')
    student_name = data.get('name')
    
    try:
        # 해당 강의실 객체 조회
        class_room = ClassRoom.objects.get(classroom_location=classroom_location)

        # 선택한 좌석이 예약되어 있지 않은 경우
        if class_room.current_space[seat] == False:
            return JsonResponse({'status': 400, 'error': 'Selected seat is not booked'}, status=400)

        # 예약된 좌석이 요청한 학생과 다른 경우
        if class_room.current_space[seat] != student_name:
            return JsonResponse({'status': 400, 'error': 'Seat is booked by another student'}, status=400)

        # 예약 취소: 해당 좌석을 False로 설정
        class_room.current_space[seat] = False

        # 학생 수 감소
        class_room.current_students -= 1

        # 변경사항 저장
        class_room.save()

        # 예약 취소 후, 학생의 예약 정보 반환
        reservations = Reservation.objects.filter(student_name=student_name)
        courses = [{"course_name": reservation.classroom_location.course_name, 
                    "classroom_location": reservation.classroom_location.classroom_location,
                    "seat_number": reservation.seat_number} for reservation in reservations]

        return JsonResponse({
            'status': 200,
            'message': 'Reservation cancelled successfully',
            'courses': courses  # 학생이 예약한 강의 정보 반환
        })

    except ClassRoom.DoesNotExist:
        return JsonResponse({'status': 400, 'error': 'Classroom does not exist'}, status=400)
    except Exception as e:
        return JsonResponse({'status': 500, 'error': str(e)}, status=500)
    
@csrf_exempt
def view_reservations(request):
    data = json.loads(request.body)
    student_name = data.get('name')
    
    try:
        # 학생이 예약한 모든 과목과 좌석을 조회
        reservations = Reservation.objects.filter(student_name=student_name)

        # 예약된 강의 정보와 좌석 번호 반환
        courses = [{"course_name": reservation.classroom_location.course_name, 
                    "classroom_location": reservation.classroom_location.classroom_location,
                    "seat_number": reservation.seat_number} for reservation in reservations]

        return JsonResponse({
            'status': 200,
            'courses': courses  # 학생이 예약한 강의 정보
        })

    except Exception as e:
        return JsonResponse({'status': 500, 'error': str(e)}, status=500)

