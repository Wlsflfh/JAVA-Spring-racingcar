import { useRacingGame } from './hooks/useRacingGame';
import InputForm from './components/InputForm';
import RacingScreen from './components/RacingScreen';
import ResultScreen from './components/ResultScreen';

/**
 * 메인 App 컴포넌트
 */
function App() {
  const {
    gameState,
    carNames,
    raceHistory,
    randomNumbers,
    winners,
    error,
    startGame,
    resetGame,
    showResult,
  } = useRacingGame();

  return (
    <div className="App">
      {gameState === 'input' && (
        <InputForm 
          onStartGame={startGame}
          error={error}
        />
      )}

      {gameState === 'racing' && (
        <RacingScreen
          carNames={carNames}
          raceHistory={raceHistory}
          randomNumbers={randomNumbers}
          onComplete={showResult}
        />
      )}

      {gameState === 'result' && (
        <ResultScreen
          winners={winners}
          carNames={carNames}
          raceHistory={raceHistory}
          onRestart={resetGame}
        />
      )}
    </div>
  );
}

export default App;


