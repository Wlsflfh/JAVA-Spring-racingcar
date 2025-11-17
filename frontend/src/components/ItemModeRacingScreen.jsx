import { useState, useEffect } from 'react';
import { getItemColor, getItemBgColor } from '../constants/itemMode';

/**
 * 아이템 모드 레이싱 화면 컴포넌트
 */
const ItemModeRacingScreen = ({ 
  carNames, 
  raceHistory, 
  targetDistance,
  itemHistory,
  onComplete 
}) => {
  const [currentRound, setCurrentRound] = useState(0);
  const [displayedPositions, setDisplayedPositions] = useState(
    carNames.map(() => 0)
  );
  const [currentRoundItems, setCurrentRoundItems] = useState([]); // 각 차의 아이템 배열

  useEffect(() => {
    if (currentRound < raceHistory.length) {
      const timer = setTimeout(() => {
        setDisplayedPositions(raceHistory[currentRound]);
        setCurrentRoundItems(itemHistory[currentRound] || []); // 이번 라운드 각 차의 아이템
        setCurrentRound(currentRound + 1);
      }, 2000); // 2초마다 다음 라운드

      return () => clearTimeout(timer);
    } else if (currentRound === raceHistory.length && raceHistory.length > 0) {
      // 레이스 완료
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  }, [currentRound, raceHistory, itemHistory, onComplete]);

  // 진행률 계산
  const getProgress = (position) => {
    return Math.min((position / targetDistance) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-white mb-3">
            🎁 아이템 레이싱
          </h1>
          <div className="flex justify-center gap-6 text-white">
            <div className="bg-white/20 backdrop-blur px-5 py-2 rounded-full">
              <span className="text-sm">라운드</span>
              <span className="ml-2 text-xl font-bold">{currentRound}</span>
            </div>
            <div className="bg-white/20 backdrop-blur px-5 py-2 rounded-full">
              <span className="text-sm">목표</span>
              <span className="ml-2 text-xl font-bold">{targetDistance}칸</span>
            </div>
          </div>
        </div>

        {/* 레이싱 트랙 - 한 줄에 모든 차량 */}
        <div className="mb-6 bg-white/10 backdrop-blur rounded-2xl p-8">
          <div className="relative h-32">
            {/* 트랙 배경 */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-xl border-2 border-white/20">
              {/* 거리 표시선들 */}
              <div className="absolute inset-0 flex">
                {[...Array(11)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 border-r border-white/10"
                  ></div>
                ))}
              </div>

              {/* 목표선 */}
              <div className="absolute right-0 top-0 bottom-0 w-2 bg-yellow-400 z-20">
                <div className="absolute -right-14 top-1/2 -translate-y-1/2 text-yellow-400 font-bold text-sm whitespace-nowrap">
                  🏁 GOAL
                </div>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-yellow-400/30 to-transparent"></div>
            </div>

            {/* 모든 자동차 */}
            {carNames.map((name, index) => {
              const position = displayedPositions[index];
              const progress = getProgress(position);
              const hasReachedGoal = position >= targetDistance;
              const isLeader = position === Math.max(...displayedPositions) && position > 0;
              const verticalPosition = (index * (100 / carNames.length)) + (50 / carNames.length);

              return (
                <div
                  key={name}
                  className="absolute transition-all duration-1000 ease-out"
                  style={{ 
                    left: `${Math.min(progress, 95)}%`,
                    top: `${verticalPosition}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="relative">
                    {/* 차량 이름 (위에) */}
                    <div className={`absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap font-bold text-xs px-2 py-1 rounded-full shadow-lg ${
                      hasReachedGoal ? 'bg-yellow-400 text-gray-900' : 
                      isLeader ? 'bg-blue-400 text-white' : 
                      'bg-white/90 text-gray-900'
                    }`}>
                      {hasReachedGoal && '🏆 '}
                      {isLeader && !hasReachedGoal && '👑 '}
                      {name}
                    </div>
                    {/* 차량 아이콘 */}
                    <div className="text-4xl transform transition-transform duration-500 hover:scale-125 cursor-pointer">
                      🏎️
                    </div>
                    {/* 위치 정보 (아래) */}
                    <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-white font-mono text-xs whitespace-nowrap bg-gray-900/70 px-2 py-0.5 rounded">
                      {position}/{targetDistance}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 아이템 카드 - 무조건 한 줄에 (동적 너비) */}
        <div className="mb-6">
          {currentRoundItems.length > 0 ? (
            <div className="flex gap-3 overflow-x-auto">
              {currentRoundItems.map((item, index) => (
                <div
                  key={`${item.carName}-${currentRound}`}
                  className={`flex-shrink-0 p-4 rounded-2xl border-2 ${getItemBgColor(item.effect)} backdrop-blur transform transition-all duration-500 hover:scale-105 animate-pulse`}
                  style={{ 
                    width: `${100 / currentRoundItems.length - 1}%`,
                    minWidth: '200px'
                  }}
                >
                  {/* 차량 이름 & 아이콘 */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🏎️</span>
                      <span className="font-bold text-white text-base">{item.carName}</span>
                    </div>
                    <div className="text-3xl">{item.icon}</div>
                  </div>

                  {/* 아이템 정보 */}
                  <div className="space-y-1">
                    <h3 className={`text-lg font-bold ${getItemColor(item.effect)} truncate`}>
                      {item.name}
                    </h3>
                    <p className="text-white text-xs font-medium leading-tight line-clamp-2">
                      {item.message}
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-white/20">
                      <span className="text-white/70 text-xs">효과</span>
                      <span className={`font-bold text-base ${getItemColor(item.effect)}`}>
                        {item.effect > 0 && `+${item.effect}칸`}
                        {item.effect === 0 && '0칸'}
                        {item.effect < 0 && `${item.effect}칸`}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-white/60 py-8 bg-white/5 rounded-2xl">
              경주 시작 대기 중...
            </div>
          )}
        </div>

        {/* 아이템 효과 설명 */}
        <div className="mt-8 bg-white/10 backdrop-blur rounded-2xl p-6">
          <h3 className="text-white font-bold text-center mb-4">🎲 아이템 효과</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl mb-1">⚡</div>
              <div className="text-yellow-400 font-bold">번개의 호흡</div>
              <div className="text-white/60">+5칸</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">🚀</div>
              <div className="text-blue-400 font-bold">부스터</div>
              <div className="text-white/60">+3칸</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">☀️</div>
              <div className="text-green-400 font-bold">날씨 좋음</div>
              <div className="text-white/60">+1칸</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">😴</div>
              <div className="text-gray-400 font-bold">졸음 쉼터</div>
              <div className="text-white/60">0칸</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">⛈️</div>
              <div className="text-orange-400 font-bold">천둥 번개</div>
              <div className="text-white/60">-1칸</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">💣</div>
              <div className="text-red-400 font-bold">타이어 폭탄</div>
              <div className="text-white/60">-3칸</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModeRacingScreen;

