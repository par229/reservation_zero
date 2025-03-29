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