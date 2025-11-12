import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useRacingGame } from './hooks/useRacingGame';
import InputForm from './components/InputForm';
import RacingScreen from './components/RacingScreen';
import ResultScreen from './components/ResultScreen';
import Winners from './components/Winners';

function HomeGameRouter() {
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
            <InputForm onStartGame={startGame} error={error} />
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

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeGameRouter />} />
          <Route path="/winners" element={<Winners />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
