# reservation_zeroton
---------------------------------------------------------------------------
일정
---------------------------------------------------------------------------
목요일 
- 개발 시작 (파트 분담 및 개발 범위 논의)

금요일 
- 개발 중간 지점 (기본 기능 구현 및 디자인 완성)

토요일 
- 오전 (상세 기능 구현 및 디자인)
- 오후 (발표 자료 준비 및 에러 보완)

작업환경
---------------------------------------------------------------------------
메인 언어 : JAVA
프론트 : 코틀린 /
백엔드 : spring /
데이터 : sqlite

---------------------------------------------------------------------------
유저별 화면 정보
---------------------------------------------------------------------------

홈 화면 -> 로그인 화면(회원가입, ID/PW 찾기) -> (예약 및 현황, 출석 확인, 질문 입력, 사용자 정보, 알림) : 사용자 화면

-------------------------------------------------------------------------------------------------------------
홈 화면 -> 로그인 화면(회원가입, ID/PW 찾기) -> 관리자 대시보드(출석 현황, 질문 현황, 알림)             : 관리자 화면

---------------------------------------------------------------------------
구현 화면 목록
---------------------------------------------------------------------------

1. 홈 화면 > 어플 로그 및 이름
2. 회원가입 > ID, PW(KISA에 부합하는 비밀번호 형식), 학번, 이름, 학과, 학년
3. 로그인 화면 -> ID/PW
4. 출석 확인 -> 출석 / 결석
5. 예약 및 현황 -> 자리 예약 가능 / 불가능
6. 사용자 정보 -> 학번, 학과, 이름, 학년, 출석여부, 현재 자리 상태(출석, 자리비움, 결석)
7. 관리자 대시보드 -> 출석 및 질문 현황 확인 가능
8. 질문입력 -> 출석자 채팅 기능 활성화
9. 알림 -> '출석 10분전 입니다'
---------------------------------------------------------------------------
## UI 흐름도
![ReservationZeroton UI 흐름도](images/reservation-zeroton-improved-flow.svg)

# StudyNest Project Structure

## Directory Structure

```
studynest/
├── app/                    # 애플리케이션 라우팅 및 페이지
│   ├── (tabs)/            # 탭 네비게이션
│   │   ├── layout.tsx     # 탭 레이아웃
│   │   ├── index.tsx      # 홈 화면
│   │   ├── attendance.tsx # 출석 관리 화면
│   │   ├── question.tsx   # 질문 화면
│   │   ├── profile.tsx    # 프로필 화면
│   │   └── admin-dashboard.tsx # 관리자 대시보드
│   ├── layout.tsx         # 앱 전체 레이아웃
│   ├── index.tsx          # 앱 진입점
│   ├── login.tsx          # 로그인 화면
│   ├── register.tsx       # 회원가입 화면
│   ├── forgot-password.tsx # 비밀번호 찾기 화면
│   └── not-found.tsx      # 404 페이지
├── assets/                # 정적 자원
│   ├── fonts/             # 폰트 파일
│   └── images/            # 이미지 파일
├── components/            # 재사용 가능한 UI 컴포넌트
├── constants/             # 상수 정의
├── hooks/                 # 커스텀 React 훅
├── services/              # 백엔드 API 통신 로직
├── store/                 # 상태 관리
├── types/                 # TypeScript 타입 정의
├── utils/                 # 유틸리티 함수
├── config/                # 환경 설정
└── context/               # React Context API
```

## 폴더별 파일 구조 (권장 사항) AI의 명령

### services/ 폴더
백엔드 API 통신 관련 로직을 포함합니다.

```
services/
├── api.ts                 # API 클라이언트 설정 (axios 등)
├── auth.service.ts        # 인증 관련 API
├── reservation.service.ts # 좌석 예약 관련 API
├── attendance.service.ts  # 출석 관련 API
└── question.service.ts    # 질문 관련 API
```

### store/ 폴더
상태 관리 (Redux, Zustand 등)를 위한 파일들을 포함합니다.

```
store/
├── auth/                  # 인증 상태 관리
├── reservation/           # 예약 상태 관리
├── attendance/            # 출석 상태 관리
└── question/              # 질문 상태 관리
```

### types/ 폴더
TypeScript 타입 정의를 포함합니다.

```
types/
├── api.types.ts           # API 응답 타입
├── user.types.ts          # 사용자 관련 타입
├── reservation.types.ts   # 예약 관련 타입
├── attendance.types.ts    # 출석 관련 타입
└── question.types.ts      # 질문 관련 타입
```

### utils/ 폴더
유틸리티 함수를 포함합니다.

```
utils/
├── axios-interceptor.ts   # API 요청/응답 처리
├── storage.ts             # 로컬 스토리지 관리
├── format.ts              # 데이터 포맷팅
└── validation.ts          # 데이터 유효성 검사
```

### config/ 폴더
환경 설정 관련 파일을 포함합니다.

```
config/
├── env.ts                 # 환경 변수 설정
└── api.config.ts          # API 엔드포인트 설정
```

### context/ 폴더
React Context API 사용 시 필요한 파일을 포함합니다.

```
context/
├── AuthContext.tsx        # 인증 컨텍스트
└── ReservationContext.tsx # 예약 컨텍스트
```

## 기타 폴더
- **components/**: 재사용 가능한 UI 컴포넌트
- **constants/**: 상수 정의
- **hooks/**: 커스텀 React 훅
- **assets/**: 정적 자원 (폰트, 이미지 등)
