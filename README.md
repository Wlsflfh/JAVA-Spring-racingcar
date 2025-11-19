# [오픈 미션] 🚗 자동차 경주 게임 서버 배포 - Backend

🚗 우아한테크코스 자동차 경주 게임 백엔드

## 🛠️ 기술 스택

- **Java 17+** - 메인 프로그래밍 언어
- **Spring Boot 3** - 애플리케이션의 구조화와 의존성 관리
- **Spring Data JPA** - Java와 데이터베이스(SQL) 연동을 위한 ORM 기술
- **MySQL** - 실제 경주 결과, 우승 기록 등을 저장하는 관계형 데이터베이스 관리 시스템
- **RESTful API** - 클라이언트(React 등)와 통신하는 표준화된 HTTP 기반 API 설계 패턴
- **Gradle** - 의존성 관리 및 프로젝트 빌드 자동화를 도와주는 빌드 도구

## 📝 기능 요구 사항
### 🚀 기존의 자동차 경주 기능 요구사항
- 주어진 횟수 동안 n대의 자동차는 전진 또는 멈출 수 있다.
- 각 자동차에 이름을 부여할 수 있다. 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.
- 자동차 이름은 쉼표(,)를 기준으로 구분하며 이름은 5자 이하만 가능하다.
- 사용자는 몇 번의 이동을 할 것인지를 입력할 수 있어야 한다.
- 전진하는 조건은 0에서 9 사이에서 무작위 값을 구한 후 무작위 값이 4 이상일 경우이다.
- 자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다. 우승자는 한 명 이상일 수 있다.
- 우승자가 여러 명일 경우 쉼표(,)를 이용하여 구분한다.

### 🚗 1차 추가 요구사항
- Spring Boot 기반으로 기존 프리코스 요구사항의 자동차 경주 게임 코드를 완성한다.
- 간단한 html 코드를 작성해 로컬 환경(localhost)에서 정상적으로 실행 가능해야 한다.
- H2 데이터베이스를 활용해 역대 우승자 명단을 관리하고 REST API로 제공해야 한다.
- 별도의 서버를 구축하여 백엔드 코드를 실제 서비스 환경에 배포한다.
- 프론트엔드와 API 연동이 원활히 이루어지도록 서버 환경을 구성하고 실제 배포까지 완료한다.

### 🏎️ 2차 추가 요구사항
- **아이템 모드 추가**: 클래식 모드와 아이템 모드 두가지 모드로 분리하여 게임을 운영한다.
### 아이템 모드 컨셉
클래식 모드와 다른 점:
- 입력: 라운드 수 → 목표 거리 (예: 30칸)
- 종료: 정해진 라운드 완료 → 한 대 이상이 목표 거리 도달
- 이동: 랜덤 0~1칸 → 아이템 효과로 -3 ~ +5칸
- 특징: 후퇴 가능! (단, 0 미만으로는 안 내려감)

**아이템 효과** (매 턴 모든 차에게 동일하게 적용),
- 번개의 호흡 (+5칸) → `"번개의 호흡 제 1형 벽력일섬!!!"` OR `"으아아 못참겠다!!!!!!!!!!!!! 가자!!!!!!!!"`
- 부스터 (+3칸) → `"부아앙! 부스터 발동!"` OR `"차 없는거 봐라ㅋㅋ 슝슝!"` OR `"앞으로 치고 나가기~zz"`
- 날씨 좋음 (+1칸) → `"날씨 좋네~" OR "무난TV"` OR `"날이 선선하이 쥑이네~"`
- 졸음 쉼터 (0칸) → `"졸음 쉼터 zzz"` OR `"비가 왜이리 많이오냐" OR "차가 좀 막히는걸;;"`
- 천둥 번개 (-1칸) → `"천둥 번개 우르릉 쾅쾅!"` OR `"으으 급똥;;"`
- 타이어 폭탄 (-3칸) → `"타이어 BOMB"` OR `"리버스 임펙트~"` OR `"뒤로뒤로 열매"`
- (각 아이템의 메시지는 OR로 구분된 것 중 랜덤으로 선택)
### **게임 로직**
1. 매 턴마다 6가지 아이템 중 랜덤으로 1개 선택
2. 선택된 아이템의 메시지도 랜덤 선택
3. 모든 차에게 동일하게 적용
4. 한 대 이상이 목표 거리 도달 시 게임 종료
5. 우승자: 목표 거리에 가장 먼저 도달한 차 (동시 도달 시 공동 우승)
6. 위치는 0 미만으로 안 내려감
7. 무한 루프 방지용 최대 라운드 제한 (최대 라운드 = 목표 거리 * 2)
8. 검증은 기존과 동일 (자동차 이름 1~5글자, 중복 불가)

## 📁프로젝트 구조
```text
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── racingcar/
│   │   │       ├── aop/                                                # AOP 설정
│   │   │       │   └── TimeTraceAop.java
│   │   │       ├── config/                                             # 환경/빈 설정
│   │   │       │   ├── SpringConfig.java
│   │   │       │   └── WebConfig.java
│   │   │       ├── controller/                                         # REST API Controller
│   │   │       │   ├── HomeController.java
│   │   │       │   ├── RacingGameApiController.java
│   │   │       │   └── WinnersApiController.java
│   │   │       ├── domain/                                             # 핵심 도메인 모델/로직
│   │   │       │   ├── AttemptsCount.java
│   │   │       │   ├── GoalDistance.java
│   │   │       │   ├── Car.java
│   │   │       │   ├── Cars.java
│   │   │       │   ├── ClassicWinners.java
│   │   │       │   ├── ItemWinners.java
│   │   │       │   └── RoundResult.java
│   │   │       ├── dto/                                                # DTO 클래스
│   │   │       │   ├── CarNamesDto.java
│   │   │       │   ├── RaceResultDto.java
│   │   │       │   └── RacingResult.java
│   │   │       ├── mapper/                                             # 매퍼 클래스
│   │   │       │   └── RaceResultMapper.java
│   │   │       └── repository/                                         # JPA Repository
│   │   │           ├── SpringDataJpaCarRepository.java
│   │   │           ├── SpringDataJpaClassicWinnerRepository.java
│   │   │           └── SpringDataJpaItemWinnerRepository.java
│   │   └── resources/
│   │       └── application.properties                                  # 환경설정
│   └── test/
│       └── java/racingcar/                                             # 단위/통합 테스트
│                ├── domain/
│                │   ├── CarTest.java
│                │   └── CarsTest.java
│                └── service/
│                    └── RacingGameServiceTest.java
├── build.gradle
└── README.md
```

## 🚀 시작하기
1. 의존성 설치 및 빌드
   ```bash
   ./gradlew build
   ```
2. 서버 실행
   ```bash
   ./gradlew bootRun
   ```
   서버 기본 포트: 8080
3. API 테스트
   Swagger UI 또는 Postman 등으로 엔드포인트에 직접 요청 가능합니다.

## 🔌 주요 REST API
### 1. 경주 시작
- POST /api/racing/
- Request Body
```json
{
"carNames": ["pobi", "woni", "jun"],
"roundCount": 5
}
```
- Response
```json
{
"raceHistory": [
{"pobi": 1, "woni": 0, "jun": 1},
{"pobi": 2, "woni": 1, "jun": 1}
],
"winners": ["pobi"]
}
```

### 2. 경주 과정(클래식/아이템)
- GET /api/racing/classic/race
- GET /api/racing/item/race

### 3. 경주 결과 및 우승자 발표(클래식/아이템)
- GET /api/racing/classic/result
- GET /api/racing/item/result

### 4. 역대 우승자 조회(클래식/아이템)
- GET /api/racing/classic/history
- GET /api/racing/item/history

## 🎯 향후 개선 사항
- Spring boot 코드 개선 - 애플리케이션 성능 및 유지보수성을 높이기 위한 더 좋은 코드 작성
- CI/CD 기능 공부 - 자동화된 빌드와 배포 프로세스 구축 목표
- Docker 공부 - 컨테이너 기반 개발환경 이해 및 활용

## 👥 Contributors

- Frontend: **트루** ([@sorrybro2](https://github.com/sorrybro2))
- Backend: **진리로** ([@Wlsflfh](https://github.com/Wlsflfh))
