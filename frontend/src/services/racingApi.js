/**
 * 백엔드 API와 통신하는 서비스 레이어
 */

const API_BASE_URL = '/api';
const USE_MOCK = true; // 백엔드 없이 테스트할 때 true, 실제 API 사용시 false

/**
 * Mock 데이터 생성 (테스트용)
 */
const generateMockRaceData = (carNames, roundCount) => {
  const raceHistory = [];
  const randomNumbers = []; // 각 라운드의 랜덤 숫자 저장
  const positions = {};
  
  // 초기 위치 설정
  carNames.forEach(name => {
    positions[name] = 0;
  });
  
  // 각 라운드 시뮬레이션
  for (let round = 0; round < roundCount; round++) {
    const roundRandoms = {};
    
    carNames.forEach(name => {
      const randomNum = Math.floor(Math.random() * 10);
      roundRandoms[name] = randomNum; // 랜덤 숫자 저장
      
      if (randomNum >= 4) {
        positions[name] += 1;
      }
    });
    
    raceHistory.push({ ...positions });
    randomNumbers.push(roundRandoms);
  }
  
  // 우승자 찾기
  const maxPosition = Math.max(...Object.values(positions));
  const winners = carNames.filter(name => positions[name] === maxPosition);
  
  return { raceHistory, randomNumbers, winners };
};

/**
 * 자동차 경주 게임 시작 요청
 * @param {string[]} carNames - 자동차 이름 배열
 * @param {number} roundCount - 시도 횟수
 * @returns {Promise<Object>} 게임 결과 데이터
 */
export const startRacing = async (carNames, roundCount) => {
  // Mock 모드일 때
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(generateMockRaceData(carNames, roundCount));
      }, 500); // 0.5초 지연으로 실제 API 호출처럼 보이게
    });
  }
  
  // 실제 API 호출
  try {
    const response = await fetch(`${API_BASE_URL}/racing/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        carNames,
        roundCount: Number(roundCount),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '게임 시작에 실패했습니다.');
    }

    return await response.json();
  } catch (error) {
    console.error('Racing API Error:', error);
    throw error;
  }
};

/**
 * 게임 진행 상황 조회 (필요시 사용)
 * @param {string} gameId - 게임 ID
 * @returns {Promise<Object>} 게임 진행 상황
 */
export const getRacingStatus = async (gameId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/racing/${gameId}`);
    
    if (!response.ok) {
      throw new Error('게임 상태 조회에 실패했습니다.');
    }

    return await response.json();
  } catch (error) {
    console.error('Racing Status API Error:', error);
    throw error;
  }
};


