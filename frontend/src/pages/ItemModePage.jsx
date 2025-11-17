import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useItemModeGame } from '../hooks/useItemModeGame';
import ItemModeInputForm from '../components/ItemModeInputForm';
import ItemModeRacingScreen from '../components/ItemModeRacingScreen';
import ItemModeResultScreen from '../components/ItemModeResultScreen';
import WinnersHistoryScreen from '../components/WinnersHistoryScreen';

/**
 * 아이템 모드 페이지
 * /item/* 경로의 모든 라우트 관리
 */
function ItemModePage() {
  const navigate = useNavigate();
  const itemMode = useItemModeGame();

  /**
   * 모드 선택 화면으로 돌아가기
   */
  const handleBackToModeSelection = () => {
    navigate('/');
  };

  /**
   * 게임 시작 핸들러
   */
  const handleStartGame = async (carNames, targetDistance) => {
    await itemMode.startGame(carNames, targetDistance);
    navigate('/item/race');
  };

  /**
   * 레이싱 완료 핸들러
   */
  const handleRaceComplete = () => {
    itemMode.showResult();
    navigate('/item/result');
  };

  /**
   * 게임 재시작
   */
  const handleRestart = () => {
    itemMode.resetGame();
    navigate('/item');
  };

  /**
   * 역대 우승자 보기
   */
  const handleShowHistory = () => {
    navigate('/item/history');
  };

  /**
   * 역대 우승자에서 돌아가기
   */
  const handleBackFromHistory = () => {
    navigate('/item');
  };

  return (
    <Routes>
      {/* 아이템 모드 - 입력 화면 */}
      <Route 
        path="/" 
        element={
          <ItemModeInputForm
            onStartGame={handleStartGame}
            onShowHistory={handleShowHistory}
            onBack={handleBackToModeSelection}
            error={itemMode.error}
          />
        } 
      />

      {/* 아이템 모드 - 레이싱 화면 */}
      <Route 
        path="/race" 
        element={
          itemMode.carNames.length > 0 ? (
            <ItemModeRacingScreen
              carNames={itemMode.carNames}
              raceHistory={itemMode.raceHistory}
              targetDistance={itemMode.targetDistance}
              itemHistory={itemMode.itemHistory}
              onComplete={handleRaceComplete}
            />
          ) : (
            <Navigate to="/item" replace />
          )
        } 
      />

      {/* 아이템 모드 - 결과 화면 */}
      <Route 
        path="/result" 
        element={
          itemMode.winners.length > 0 ? (
            <ItemModeResultScreen
              winners={itemMode.winners}
              carNames={itemMode.carNames}
              finalPositions={itemMode.finalPositions}
              targetDistance={itemMode.targetDistance}
              totalRounds={itemMode.totalRounds}
              onRestart={handleRestart}
              onShowHistory={handleShowHistory}
            />
          ) : (
            <Navigate to="/item" replace />
          )
        } 
      />

      {/* 아이템 모드 - 역대 우승자 */}
      <Route 
        path="/history" 
        element={
          <WinnersHistoryScreen
            onBack={handleBackFromHistory}
          />
        } 
      />

      {/* 404 - 아이템 입력으로 리다이렉트 */}
      <Route path="*" element={<Navigate to="/item" replace />} />
    </Routes>
  );
}

export default ItemModePage;

