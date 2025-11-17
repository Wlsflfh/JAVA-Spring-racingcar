/**
 * 아이템 모드 결과 화면 컴포넌트
 */
const ItemModeResultScreen = ({ 
  winners, 
  carNames, 
  finalPositions,
  targetDistance,
  totalRounds,
  onRestart,
  onShowHistory
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* 우승 축하 */}
        <div className="text-center mb-8 animate-bounce">
          <div className="text-8xl mb-4">🏆</div>
          <h1 className="text-5xl font-bold text-white mb-4">
            우승을 축하합니다!
          </h1>
          <div className="text-3xl font-bold text-yellow-400">
            {winners.map((winner, index) => (
              <span key={winner}>
                {winner}
                {index < winners.length - 1 && ', '}
              </span>
            ))}
          </div>
        </div>

        {/* 게임 통계 */}
        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 mb-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="text-center p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
              <div className="text-3xl font-bold text-purple-600">{totalRounds}</div>
              <div className="text-sm text-gray-600 mt-1">총 라운드</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
              <div className="text-3xl font-bold text-purple-600">{targetDistance}칸</div>
              <div className="text-sm text-gray-600 mt-1">목표 거리</div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
              🏁 최종 순위
            </h3>
            <div className="space-y-3">
              {carNames.map((name, index) => {
                const position = finalPositions[index];
                const isWinner = winners.includes(name);
                const rank = finalPositions
                  .slice()
                  .sort((a, b) => b - a)
                  .indexOf(position) + 1;

                return (
                  <div
                    key={name}
                    className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                      isWinner
                        ? 'bg-gradient-to-r from-yellow-200 to-yellow-100 border-2 border-yellow-400'
                        : 'bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`text-2xl font-bold ${
                        rank === 1 ? 'text-yellow-600' :
                        rank === 2 ? 'text-gray-500' :
                        rank === 3 ? 'text-orange-600' :
                        'text-gray-400'
                      }`}>
                        {rank === 1 && '🥇'}
                        {rank === 2 && '🥈'}
                        {rank === 3 && '🥉'}
                        {rank > 3 && `${rank}위`}
                      </div>
                      <div>
                        <div className={`font-bold ${isWinner ? 'text-yellow-800' : 'text-gray-800'}`}>
                          {name}
                          {isWinner && ' 🏆'}
                        </div>
                        <div className="text-xs text-gray-600">
                          {position >= targetDistance ? '목표 도달!' : `${position}칸 도달`}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-lg font-bold text-gray-700">
                        {position}칸
                      </div>
                      <div className="text-xs text-gray-500">
                        {Math.round((position / targetDistance) * 100)}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onRestart}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold py-4 px-6 rounded-xl hover:from-purple-600 hover:to-pink-700 transform hover:scale-105 transition duration-200 shadow-lg"
          >
            🔄 다시 시작
          </button>
          <button
            onClick={onShowHistory}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold py-4 px-6 rounded-xl hover:from-yellow-600 hover:to-orange-700 transform hover:scale-105 transition duration-200 shadow-lg"
          >
            🏆 역대 우승자 보기
          </button>
        </div>

        {/* 재미 요소 */}
        <div className="mt-6 text-center">
          <p className="text-white/80 text-sm">
            {totalRounds < 10 && '⚡ 번개같이 빠른 레이스였습니다!'}
            {totalRounds >= 10 && totalRounds < 20 && '🎯 완벽한 페이스의 레이스였습니다!'}
            {totalRounds >= 20 && totalRounds < 30 && '🏁 치열한 접전이었습니다!'}
            {totalRounds >= 30 && '🔥 극한의 아이템 배틀이었습니다!'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItemModeResultScreen;

