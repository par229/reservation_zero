from django.contrib.auth import authenticate
from demos.models import CustomUser, Lecture
from django.http import JsonResponse
from rest_framework_simplejwt.tokens import RefreshToken
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt  # CSRF 검사를 비활성화 (프론트엔드에서 요청할 경우 필요)
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)  # JSON 데이터 파싱
        email = data.get('email')
        password = data.get('password')

        user = authenticate(email=email, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return JsonResponse({
                'status': 200,
                'access': str(refresh.access_token),
                'refresh': str(refresh)
            })
        else:
            return JsonResponse({'status': 401, 'error': 'Invalid credentials'}, status=401)
    return JsonResponse({'status': 405, 'error': 'Method not allowed'}, status=405)


@csrf_exempt
def logout(request):
    # 클라이언트가 JWT 토큰을 삭제하는 방식으로 로그아웃 처리
    return JsonResponse({'status': 200, 'message': 'Logout successful. Clear your token on the client side.'})


@csrf_exempt
def signup(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        password = data.get('password')
        email = data.get('email')  # 고유한 이메일을 아이디로 사용
        name = data.get('name')
        nickname = data.get('nickname')
        birth = data.get('birth')

        if CustomUser.objects.filter(email = email).exists():
            return JsonResponse({'status': 400, 'error': 'Username already exists'}, status=400)

        user = CustomUser.objects.create_user(
            email=email,
            password=password,
            name=name,
            nickname=nickname,
            birth=birth
        )
        refresh = RefreshToken.for_user(user)

        return JsonResponse({
            'status': 200,
            'message': 'User created successfully',
            'access': str(refresh.access_token),
            'refresh': str(refresh)
        })
    return JsonResponse({'status': 405, 'error': 'Method not allowed'}, status=405)


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