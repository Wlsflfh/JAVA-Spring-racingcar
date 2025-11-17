import { useState } from 'react';
import { startRacing } from '../services/racingApi';
import { validateInput } from '../utils/validator';

/**
 * 자동차 경주 게임 로직을 관리하는 커스텀 훅
 */
export const useRacingGame = () => {
  const [gameState, setGameState] = useState('input'); // 'input', 'racing', 'result', 'history'
  const [carNames, setCarNames] = useState([]);
  const [roundCount, setRoundCount] = useState(0);
  const [raceHistory, setRaceHistory] = useState([]); // 각 라운드별 자동차 위치
  const [randomNumbers, setRandomNumbers] = useState([]); // 각 라운드별 랜덤 숫자
  const [winners, setWinners] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * 게임 시작
   */
  const startGame = async (inputCarNames, inputRoundCount) => {
    try {
      setError(null);
      
      // 클라이언트 측 검증
      const trimmedNames = inputCarNames.map(name => name.trim());
      validateInput(trimmedNames, inputRoundCount);
      
      setLoading(true);
      setCarNames(trimmedNames);
      setRoundCount(Number(inputRoundCount));
      
      // 백엔드 API 호출
      const result = await startRacing(trimmedNames, inputRoundCount);
      
      // 결과 처리
      setRaceHistory(result.raceHistory || []);
      setRandomNumbers(result.randomNumbers || []);
      setWinners(result.winners || []);
      
      // 경주 애니메이션 시작
      setGameState('racing');
      
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  /**
   * 게임 초기화
   */
  const resetGame = () => {
    setGameState('input');
    setCarNames([]);
    setRoundCount(0);
    setRaceHistory([]);
    setRandomNumbers([]);
    setWinners([]);
    setError(null);
    setLoading(false);
  };

  /**
   * 결과 화면으로 이동
   */
  const showResult = () => {
    setGameState('result');
    setLoading(false);
  };

  /**
   * 역대 우승자 화면으로 이동
   */
  const showHistory = () => {
    setGameState('history');
  };

  /**
   * 입력 화면으로 돌아가기
   */
  const backToInput = () => {
    setGameState('input');
    setError(null);
  };

  return {
    gameState,
    carNames,
    roundCount,
    raceHistory,
    randomNumbers,
    winners,
    error,
    loading,
    startGame,
    resetGame,
    showResult,
    showHistory,
    backToInput,
  };
};


