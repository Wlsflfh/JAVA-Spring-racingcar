import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useRacingGame } from '../hooks/useRacingGame';
import InputForm from '../components/InputForm';
import RacingScreen from '../components/RacingScreen';
import ResultScreen from '../components/ResultScreen';
import WinnersHistoryScreen from '../components/WinnersHistoryScreen';

/**
 * 클래식 모드 페이지
 * /classic/* 경로의 모든 라우트 관리
 */
function ClassicModePage() {
  const navigate = useNavigate();
  const classicMode = useRacingGame();

  /**
   * 모드 선택 화면으로 돌아가기
   */
  const handleBackToModeSelection = () => {
    navigate('/');
  };

  /**
   * 게임 시작 핸들러
   */
  const handleStartGame = async (carNames, attemptCount) => {
    const ok= await classicMode.startGame(carNames, attemptCount);
    if (!ok) return;
    navigate('/classic/race');
  };

  /**
   * 레이싱 완료 핸들러
   */
  const handleRaceComplete = () => {
    classicMode.showResult();
    navigate('/classic/result');
  };

  /**
   * 게임 재시작
   */
  const handleRestart = () => {
    classicMode.resetGame();
    navigate('/classic');
  };

  /**
   * 역대 우승자 보기
   */
  const handleShowHistory = () => {
    navigate('/classic/h' +
        'istory');
  };

  /**
   * 역대 우승자에서 돌아가기
   */
  const handleBackFromHistory = () => {
    navigate('/classic');
  };

  return (
    <Routes>
      {/* 클래식 모드 - 입력 화면 */}
      <Route 
        path="/" 
        element={
          <InputForm 
            onStartGame={handleStartGame}
            onShowHistory={handleShowHistory}
            onBack={handleBackToModeSelection}
            error={classicMode.error}
          />
        } 
      />

      {/* 클래식 모드 - 레이싱 화면 */}
      <Route 
        path="/race" 
        element={
          classicMode.carNames.length > 0 ? (
            <RacingScreen
              carNames={classicMode.carNames}
              raceHistory={classicMode.raceHistory}
              randomNumbers={classicMode.randomNumbers}
              onComplete={handleRaceComplete}
            />
          ) : (
            <Navigate to="/classic" replace />
          )
        } 
      />

      {/* 클래식 모드 - 결과 화면 */}
      <Route 
        path="/result" 
        element={
          classicMode.winners.length > 0 ? (
            <ResultScreen
              winners={classicMode.winners}
              carNames={classicMode.carNames}
              raceHistory={classicMode.raceHistory}
              onRestart={handleRestart}
            />
          ) : (
            <Navigate to="/classic" replace />
          )
        } 
      />

      {/* 클래식 모드 - 역대 우승자 */}
      <Route 
        path="/history" 
        element={
          <WinnersHistoryScreen
            onBack={handleBackFromHistory}
          />
        } 
      />

      {/* 404 - 클래식 입력으로 리다이렉트 */}
      <Route path="*" element={<Navigate to="/classic" replace />} />
    </Routes>
  );
}

export default ClassicModePage;

