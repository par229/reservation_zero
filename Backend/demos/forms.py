from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import CustomUser

class SignupForm(UserCreationForm):

    # 사용자명 입력 필드 (텍스트 입력 필드, CSS 클래스 추가)
    username = forms.CharField(
        label="아이디",  # 폼에서 표시될 라벨
        widget=forms.TextInput(attrs={'class': 'form-control'})  # Bootstrap 스타일 적용
    )

    # 이메일 입력 필드 (이메일 유효성 검사 포함)
    email = forms.EmailField(
        label="이메일",
        widget=forms.EmailInput(attrs={'class': 'form-control'})
    )

    # 비밀번호 입력 필드 (마스킹 처리, 비밀번호 입력 전용)
    password1 = forms.CharField(
        label="비밀번호",
        widget=forms.PasswordInput(attrs={'class': 'form-control'})
    )

    # 비밀번호 확인 입력 필드 (비밀번호 재확인용)
    password2 = forms.CharField(
        label="비밀번호 확인",
        widget=forms.PasswordInput(attrs={'class': 'form-control'})
    )

    # Meta 클래스: 폼의 설정을 정의
    class Meta:
        model = CustomUser  # 이 폼이 연결될 데이터베이스 모델
        fields = ['username', 'email', 'password1', 'password2']  # 폼에 포함될 필드 목록

        # help_texts: 각 필드의 기본 도움말 제거
        help_texts = {
            'username': None,   # 사용자명 도움말 제거
            'password1': None,  # 비밀번호 도움말 제거
            'password2': None,  # 비밀번호 확인 도움말 제거
            'email': None       # 이메일 도움말 제거
        }
    
    # 이메일 중복 검사 메소드 (clean_email)
    def clean_email(self):
        # 사용자가 입력한 이메일 데이터 가져오기
        email = self.cleaned_data.get('email')

        # 데이터베이스에 동일한 이메일이 존재하는지 검사
        if CustomUser.objects.filter(email=email).exists():
            # 이미 존재하면 유효성 오류 발생
            raise forms.ValidationError("이미 사용 중인 이메일입니다.")
        
        # 유효한 경우 이메일 반환
        return email