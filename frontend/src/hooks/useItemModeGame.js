import { useState } from 'react';
import { startItemModeRacing } from '../services/itemModeApi';
import { validateItemModeInput } from '../utils/itemModeValidator';

/**
 * 아이템 모드 게임 로직을 관리하는 커스텀 훅
 */
export const useItemModeGame = () => {
  const [gameState, setGameState] = useState('input'); // 'input', 'racing', 'result', 'history'
  const [carNames, setCarNames] = useState([]);
  const [targetDistance, setTargetDistance] = useState(0);
  const [raceHistory, setRaceHistory] = useState([]); // 각 라운드별 위치
  const [itemHistory, setItemHistory] = useState([]); // 각 라운드별 아이템
  const [winners, setWinners] = useState([]);
  const [finalPositions, setFinalPositions] = useState([]);
  const [totalRounds, setTotalRounds] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * 아이템 모드 게임 시작
   */
  const startGame = async (inputCarNames, inputTargetDistance) => {
    try {
      setError(null);
      
      // 클라이언트 측 검증
      const trimmedNames = inputCarNames.map(name => name.trim());
      validateItemModeInput(trimmedNames, inputTargetDistance);
      
      setLoading(true);
      setCarNames(trimmedNames);
      setTargetDistance(Number(inputTargetDistance));
      
      // 백엔드 API 호출
      const result = await startItemModeRacing(trimmedNames, inputTargetDistance);
      
      // 결과 처리
      setRaceHistory(result.raceHistory || []);
      setItemHistory(result.itemHistory || []);
      setWinners(result.winners || []);
      setFinalPositions(result.finalPositions || []);
      setTotalRounds(result.totalRounds || 0);
      
      // 레이싱 애니메이션 시작
      setGameState('racing');
      return true;
    } catch (err) {
      setError(err.message);
      setLoading(false)
      return false;
    }
  };

  /**
   * 게임 초기화
   */
  const resetGame = () => {
    setGameState('input');
    setCarNames([]);
    setTargetDistance(0);
    setRaceHistory([]);
    setItemHistory([]);
    setWinners([]);
    setFinalPositions([]);
    setTotalRounds(0);
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
   * 입력 화면으로 돌아가기
   */
  const backToInput = () => {
    setGameState('input');
    setError(null);
  };

  /**
   * 역대 우승자 화면으로 이동
   */
  const showHistory = () => {
    setGameState('history');
  };

  return {
    gameState,
    carNames,
    targetDistance,
    raceHistory,
    itemHistory,
    winners,
    finalPositions,
    totalRounds,
    error,
    loading,
    startGame,
    resetGame,
    showResult,
    showHistory,
    backToInput,
  };
};

