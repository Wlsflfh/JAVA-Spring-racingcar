/**
 * 경주 결과 화면 컴포넌트
 */
const ResultScreen = ({ winners, carNames, raceHistory, onRestart }) => {
  const finalPositions = raceHistory[raceHistory.length - 1] || {};
  const maxPosition = Math.max(...Object.values(finalPositions));

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-bounce-slow">🏆</div>
          <h2 className="text-4xl font-bold text-gray-800 mb-2">경주 종료!</h2>
          <p className="text-gray-600">최종 우승자가 결정되었습니다</p>
        </div>

        <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-xl p-6 mb-8 border-2 border-yellow-400">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">
            🎉 최종 우승자 🎉
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {winners.map((winner) => (
              <span 
                key={winner}
                className="bg-white px-6 py-3 rounded-full text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 shadow-lg"
              >
                {winner}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📊 최종 순위</h3>
          <div className="space-y-3">
            {carNames
              .sort((a, b) => (finalPositions[b] || 0) - (finalPositions[a] || 0))
              .map((name, index) => {
                const position = finalPositions[name] || 0;
                const isWinner = winners.includes(name);
                
                return (
                  <div 
                    key={name}
                    className={`flex items-center p-4 rounded-lg ${
                      isWinner 
                        ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400' 
                        : 'bg-gray-50'
                    }`}
                  >
                    <span className="text-2xl font-bold text-gray-400 w-12">
                      {index + 1}
                    </span>
                    <span className="font-bold text-lg text-gray-800 w-32">
                      {name}
                      {isWinner && ' 👑'}
                    </span>
                    <div className="flex-1">
                      <div className="bg-gray-200 rounded-full h-6 relative overflow-hidden">
                        <div 
                          className={`h-full rounded-full flex items-center justify-end pr-2 ${
                            isWinner 
                              ? 'bg-gradient-to-r from-yellow-400 to-orange-500' 
                              : 'bg-gradient-to-r from-blue-400 to-purple-500'
                          }`}
                          style={{ 
                            width: `${(position / maxPosition) * 100}%` 
                          }}
                        >
                          <span className="text-white text-xs font-bold">
                            {position}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onRestart}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition duration-200 shadow-lg"
          >
            🔄 다시 시작
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>총 {raceHistory.length}라운드 진행</p>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;


