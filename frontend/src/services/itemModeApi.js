/**
 * 아이템 모드 API 서비스
 * 백엔드 API와 통신하는 함수들
 */

const API_BASE_URL = 'http://localhost:8080/api/item-mode';

// 개발 모드 플래그 (백엔드 없이 테스트할 때 true로 설정)
const USE_MOCK_DATA = true; // 백엔드 준비되면 false로 변경

// 아이템 목록
const ITEMS = [
  { id: 'LIGHTNING_BREATH', name: '번개의 호흡', icon: '⚡', effect: 5, 
    messages: ['번개의 호흡 제 1형 벽력일섬!!!', '으아아 못참겠다!!!!!!!!!!!!! 가자!!!!!!!!'] },
  { id: 'BOOSTER', name: '부스터', icon: '🚀', effect: 3,
    messages: ['부아앙! 부스터 발동!', '차 없는거 봐라ㅋㅋ 슝슝!', '앞으로 치고 나가기~zz'] },
  { id: 'NICE_WEATHER', name: '날씨 좋음', icon: '☀️', effect: 1,
    messages: ['날씨 좋네~', '무난TV', '날이 선선하이 쥑이네~'] },
  { id: 'REST_AREA', name: '졸음 쉼터', icon: '😴', effect: 0,
    messages: ['졸음 쉼터 zzz', '비가 왜이리 많이오냐', '차가 좀 막히는걸;;'] },
  { id: 'THUNDER', name: '천둥 번개', icon: '⛈️', effect: -1,
    messages: ['천둥 번개 우르릉 쾅쾅!', '으으 급똥;;'] },
  { id: 'TIRE_BOMB', name: '타이어 폭탄', icon: '💣', effect: -3,
    messages: ['타이어 BOMB', '리버스 임펙트~', '뒤로뒤로 열매'] }
];

/**
 * Mock 데이터 생성 (백엔드 없이 테스트용)
 */
const generateMockRaceData = (carNames, targetDistance) => {
  const raceHistory = [];
  const itemHistory = []; // 각 라운드마다 각 차의 아이템 정보 배열
  const positions = carNames.map(() => 0);
  let round = 0;
  const MAX_ROUNDS = 200;

  // 초기 상태
  raceHistory.push([...positions]);

  // 목표 거리에 도달할 때까지 시뮬레이션
  while (Math.max(...positions) < targetDistance && round < MAX_ROUNDS) {
    round++;
    
    const roundItems = []; // 이번 라운드의 각 차량 아이템
    
    // 각 차마다 다른 랜덤 아이템 적용
    positions.forEach((pos, index) => {
      const randomItem = ITEMS[Math.floor(Math.random() * ITEMS.length)];
      const randomMessage = randomItem.messages[Math.floor(Math.random() * randomItem.messages.length)];
      
      // 해당 차의 아이템 정보 저장
      roundItems.push({
        carName: carNames[index],
        id: randomItem.id,
        name: randomItem.name,
        icon: randomItem.icon,
        effect: randomItem.effect,
        message: randomMessage
      });
      
      // 아이템 효과 적용
      positions[index] = Math.max(0, pos + randomItem.effect); // 0 미만으로 안 내려감
    });
    
    // 이번 라운드의 모든 차량 아이템 정보 저장
    itemHistory.push(roundItems);

    // 현재 라운드 위치 저장
    raceHistory.push([...positions]);
  }

  // 우승자 찾기 (목표 거리 도달한 차들)
  const maxPosition = Math.max(...positions);
  const winners = carNames.filter((name, index) => 
    positions[index] >= targetDistance || positions[index] === maxPosition
  );

  return {
    raceHistory,
    itemHistory, // [ [{car1Item}, {car2Item}, ...], [...], ... ]
    winners,
    totalRounds: round,
    finalPositions: positions
  };
};

/**
 * 아이템 모드 레이싱 시작
 * @param {string[]} carNames - 자동차 이름 배열
 * @param {number} targetDistance - 목표 거리
 * @returns {Promise<Object>} 레이싱 결과
 */
export const startItemModeRacing = async (carNames, targetDistance) => {
  // Mock 데이터 사용 (개발 중)
  if (USE_MOCK_DATA) {
    console.log('🎮 Mock 데이터로 테스트 중...');
    await new Promise(resolve => setTimeout(resolve, 500)); // 네트워크 지연 시뮬레이션
    return generateMockRaceData(carNames, targetDistance);
  }
  try {
    const response = await fetch(`${API_BASE_URL}/race`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        carNames,
        targetDistance: Number(targetDistance)
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '레이싱 시작에 실패했습니다.');
    }

    const data = await response.json();
    
    // 백엔드 응답 형식:
    // {
    //   raceHistory: [[0,0,0], [1,2,1], [4,5,2], ...],  // 각 라운드별 위치
    //   itemHistory: [                                   // 각 라운드별 아이템
    //     { id: 'BOOSTER', name: '부스터', icon: '🚀', effect: 3, message: '부아앙! 부스터 발동!' },
    //     ...
    //   ],
    //   winners: ['pobi'],                               // 우승자 배열
    //   totalRounds: 12,                                 // 총 라운드 수
    //   finalPositions: [30, 28, 25]                    // 최종 위치
    // }
    
    return data;
  } catch (error) {
    console.error('아이템 모드 레이싱 API 오류:', error);
    throw error;
  }
};

/**
 * 아이템 모드 우승자 조회
 * @returns {Promise<Object[]>} 역대 우승자 목록
 */
export const getItemModeWinners = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/winners`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('우승자 목록 조회에 실패했습니다.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('아이템 모드 우승자 조회 API 오류:', error);
    throw error;
  }
};

/**
 * 아이템 모드 검증 (옵션)
 * @param {string[]} carNames - 자동차 이름 배열
 * @param {number} targetDistance - 목표 거리
 * @returns {Promise<Object>} 검증 결과
 */
export const validateItemMode = async (carNames, targetDistance) => {
  try {
    const response = await fetch(`${API_BASE_URL}/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        carNames,
        targetDistance: Number(targetDistance)
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '검증에 실패했습니다.');
    }

    return await response.json();
  } catch (error) {
    console.error('아이템 모드 검증 API 오류:', error);
    throw error;
  }
};

