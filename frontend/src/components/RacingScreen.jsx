import { useState, useEffect } from 'react';

/**
 * 경주 진행 화면 컴포넌트
 */
const RacingScreen = ({ carNames, raceHistory, randomNumbers, onComplete }) => {
  const [currentRound, setCurrentRound] = useState(0);
  const [displayedPositions, setDisplayedPositions] = useState(
    carNames.reduce((acc, name) => ({ ...acc, [name]: 0 }), {})
  );
  const [displayedRandoms, setDisplayedRandoms] = useState({});
  const [showRandoms, setShowRandoms] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (currentRound >= raceHistory.length) {
      // 모든 라운드 완료
      const timer = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }

    // 각 라운드를 순차적으로 표시
    const timer = setTimeout(() => {
      // 랜덤 숫자 먼저 표시
      if (randomNumbers && randomNumbers[currentRound]) {
        setDisplayedRandoms(randomNumbers[currentRound]);
        setShowRandoms(true);
        setIsExiting(false);
        
        // 1초 후 주사위 퇴장 애니메이션 시작
        setTimeout(() => {
          setIsExiting(true);
        }, 1000);
        
        // 1.5초 후 위치 업데이트 및 주사위 숨김
        setTimeout(() => {
          setDisplayedPositions(raceHistory[currentRound]);
          setShowRandoms(false);
          setIsExiting(false);
        }, 1500);
      } else {
        setDisplayedPositions(raceHistory[currentRound]);
      }
      
      setCurrentRound(prev => prev + 1);
    }, 2000);

    return () => clearTimeout(timer);
  }, [currentRound, raceHistory, randomNumbers, onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">🏁 경주 진행 중</h2>
          <p className="text-gray-600">
            라운드: {Math.min(currentRound, raceHistory.length)} / {raceHistory.length}
          </p>
        </div>

        <div className="space-y-4">
          {carNames.map((name) => {
            const randomNum = displayedRandoms[name];
            const isMoved = randomNum >= 4;
            
            return (
              <div key={name} className="bg-gray-50 rounded-lg p-4 animate-slide-in">
                <div className="flex items-center mb-2">
                  <span className="font-bold text-lg text-gray-800 w-24">{name}</span>
                  
                  {/* 랜덤 숫자 표시 */}
                  {showRandoms && randomNum !== undefined && (
                    <div className={`mr-3 px-3 py-1 rounded-full font-bold text-sm ${
                      isExiting ? 'animate-dice-exit' : 'animate-dice-roll'
                    } ${
                      isMoved 
                        ? 'bg-green-100 text-green-700 border-2 border-green-400' 
                        : 'bg-red-100 text-red-700 border-2 border-red-400'
                    }`}>
                      🎲 {randomNum}
                    </div>
                  )}
                  
                  <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                      style={{ 
                        width: `${Math.min((displayedPositions[name] || 0) * 8, 100)}%` 
                      }}
                    >
                      <span className="text-white text-sm font-bold">
                        {displayedPositions[name] || 0}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-600 ml-24">
                  {'-'.repeat(displayedPositions[name] || 0)}
                  {displayedPositions[name] > 0 && ' 🚗'}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <div className="inline-block">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RacingScreen;


