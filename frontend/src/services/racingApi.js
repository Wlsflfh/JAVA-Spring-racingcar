/**
 * 백엔드 API와 통신하는 서비스 레이어
 */

const API_BASE_URL = '/api/racing';
const USE_MOCK = false; // 백엔드 없이 테스트할 때 true, 실제 API 사용시 false

/**
 * 백엔드 응답을 프론트엔드 형식으로 변환
 * @param {Array<Array<Object>>} backendData - [[{"pobi": 5}, {"crong": 3}], ...]
 * @param {string[]} carNames - 자동차 이름 배열
 * @returns {Object} { positions: {...}, array: [...] }
 */
const convertBackendResponse = (backendData, carNames) => {
  if (!backendData || backendData.length === 0) {
    const initial = {};
    carNames.forEach(name => initial[name] = 0);
    return [initial];
  }

  return backendData.map(roundData => {
    const positions = {};
    carNames.forEach(name => {
      positions[name] = roundData.find(obj => obj[name] !== undefined)?.[name] || 0;
    });
    return positions;
  });
};
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
    const response = await fetch(`${API_BASE_URL}/classic`, {
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

    const data = await response.json();

    // 백엔드 응답 형식:
    // {
    //   raceHistory: [[{"pobi": 0}, {"crong": 0}], [{"pobi": 1}, {"crong": 0}], ...],
    //   randomNumbers: [[{"pobi": 5}, {"crong": 3}], ...],
    //   winners: ['pobi']
    // }

    // 프론트엔드 형식으로 변환
    return {
      raceHistory: convertBackendResponse(data.raceHistory, carNames),
      randomNumbers: convertBackendResponse(data.randomNumbers, carNames),
      winners: data.winners || []
    };
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

/**
 * 클래식 모드 역대 우승자 목록 조회
 * @returns {Promise<Array<Array<string>>>} 역대 우승자 목록 (예: [["pobi", "woni"], ["jun"]])
 */
export const getClassicWinnersHistory = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/classic/winners`);

    if (!response.ok) {
      throw new Error('클랫식 모드 역대 우승자 조회에 실패했습니다.');
    }

    return await response.json();
  } catch (error) {
    console.error('Classic Mode Winners History API Error:', error);
    throw error;
  }
};

/**
 * 아이템 모드 역대 우승자 목록 조회
 * @returns {Promise<Array<Array<string>>>} 역대 우승자 목록 (예: [["pobi", "woni"], ["jun"]])
 */
export const getItemWinnersHistory = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/item/winners`);

    if (!response.ok) {
      throw new Error('아이템 모드 역대 우승자 조회에 실패했습니다.');
    }

    return await response.json();
  } catch (error) {
    console.error('Item Mode Winners History API Error:', error);
    throw error;
  }
};
