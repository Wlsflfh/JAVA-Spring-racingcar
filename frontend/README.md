# 🚗 자동차 경주 게임 - Frontend

우아한테크코스 자동차 경주 게임의 React 프론트엔드입니다.

## 🛠️ 기술 스택

- **React 18** - UI 라이브러리
- **Vite** - 빌드 도구
- **Tailwind CSS** - 스타일링
- **JavaScript (ES6+)** - 프로그래밍 언어

## 📁 프로젝트 구조

```
frontend/
├── src/
│   ├── components/          # React 컴포넌트
│   │   ├── ClassicModeInputForm.jsx    # 입력 폼 컴포넌트
│   │   ├── ClassicModeRacingScreen.jsx # 경주 진행 화면
│   │   └── ClassicModeResultScreen.jsx # 결과 화면
│   ├── hooks/               # 커스텀 훅
│   │   └── useRacingGame.js # 게임 로직 관리 훅
│   ├── services/            # API 서비스
│   │   └── racingApi.js     # 백엔드 API 통신
│   ├── utils/               # 유틸리티 함수
│   │   └── validator.js     # 입력값 검증
│   ├── App.jsx              # 메인 App 컴포넌트
│   ├── main.jsx             # 진입점
│   └── index.css            # 전역 스타일
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🚀 시작하기

### 1. 의존성 설치

```bash
cd frontend
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

### 3. 프로덕션 빌드

```bash
npm run build
```

## 🎮 주요 기능

### 1. 입력 화면 (`ClassicModeInputForm`)
- 자동차 이름 입력 (쉼표로 구분, 5자 이하)
- 시도 횟수 입력 (자연수)
- 클라이언트 측 유효성 검증
- 에러 메시지 표시

### 2. 경주 화면 (`ClassicModeRacingScreen`)
- 실시간 경주 진행 애니메이션
- 각 자동차의 위치를 시각적으로 표시
- 라운드별 순차 진행
- 프로그레스 바 애니메이션

### 3. 결과 화면 (`ClassicModeResultScreen`)
- 최종 우승자 표시
- 전체 순위 표시
- 다시 시작 기능

## 🔌 백엔드 API 연동

백엔드 서버는 `http://localhost:8080`에서 실행되어야 합니다.

### API 엔드포인트

#### POST `/api/racing/start`
경주 시작 요청

**Request Body:**
```json
{
  "carNames": ["pobi", "woni", "jun"],
  "roundCount": 5
}
```

**Response:**
```json
{
  "raceHistory": [
    { "pobi": 1, "woni": 0, "jun": 1 },
    { "pobi": 2, "woni": 1, "jun": 1 },
    ...
  ],
  "winners": ["pobi"]
}
```

## 🎨 디자인 특징

- **그라디언트 배경**: 보라색 계열의 아름다운 그라디언트
- **반응형 디자인**: 모바일부터 데스크톱까지 대응
- **부드러운 애니메이션**: 슬라이드, 바운스 등 다양한 애니메이션
- **직관적인 UI**: 사용자 친화적인 인터페이스
- **현대적인 디자인**: Tailwind CSS를 활용한 모던한 스타일

## 📝 입력 검증 규칙

- 자동차 이름: 5자 이하, 빈 값 불가, 중복 불가
- 시도 횟수: 1 이상의 자연수
- 모든 필드 필수 입력

## 🧪 개발 시 참고사항

### Vite 프록시 설정
`vite.config.js`에서 백엔드 API 프록시가 설정되어 있습니다:

```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    }
  }
}
```

### 커스텀 훅 사용
`useRacingGame` 훅을 통해 게임 상태를 관리합니다:
- 게임 상태 관리 (input, racing, result)
- API 호출 및 에러 처리
- 게임 초기화 및 재시작

## 🎯 향후 개선 사항

- [ ] 로딩 스피너 추가
- [ ] 경주 속도 조절 기능
- [ ] 사운드 이펙트 추가
- [ ] 경주 기록 저장 기능
- [ ] 다크 모드 지원
- [ ] 애니메이션 커스터마이징

## 👥 Contributors

- Frontend: **트루** ([@sorrybro2](https://github.com/sorrybro2))
- Backend: **진리로** ([@Wlsflfh](https://github.com/Wlsflfh))


