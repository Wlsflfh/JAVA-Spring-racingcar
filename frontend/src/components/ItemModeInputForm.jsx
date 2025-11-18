import { useState } from 'react';

/**
 * 아이템 모드 - 자동차 이름과 목표 거리를 입력받는 폼 컴포넌트
 */
const ItemModeInputForm = ({ onStartGame, onShowHistory, onBack, error }) => {
  const [carNamesInput, setCarNamesInput] = useState('');
  const [targetDistance, setTargetDistance] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const carNames = carNamesInput.split(',').map(name => name.trim());
    onStartGame(carNames, targetDistance);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900">
      <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 max-w-md w-full">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={onBack}
          className="mb-4 flex items-center text-gray-600 hover:text-gray-800 transition"
        >
          <span className="text-xl mr-2">←</span>
          <span className="text-sm font-medium">모드 선택으로 돌아가기</span>
        </button>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            <span className="text-black">🎁</span> 자동차 경주
          </h1>
          <p className="text-gray-600 font-semibold">아이템 모드</p>
          <div className="mt-2 inline-block bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full">
            <p className="text-xs text-purple-800 font-medium">
              ⚡ 아이템으로 -3 ~ +5칸 이동 가능!
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
          <label
              htmlFor="carNames" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              자동차 이름
            </label>
            <input
              id="carNames"
              type="text"
              value={carNamesInput}
              onChange={(e) => setCarNamesInput(e.target.value)}
              placeholder="pobi,woni,jun (쉼표로 구분)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
            />
            <p className="mt-1 text-xs text-gray-500">
              * 이름은 5자 이하, 쉼표(,)로 구분해주세요
            </p>
          </div>

          <div>
            <label 
              htmlFor="targetDistance" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              목표 거리 <span className="text-purple-600">✨ NEW!</span>
            </label>
            <input
              id="targetDistance"
              type="number"
              value={targetDistance}
              onChange={(e) => setTargetDistance(e.target.value)}
              placeholder="30"
              min="10"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
            />
            <p className="mt-1 text-xs text-gray-500">
              * 목표 거리에 도달하면 경주 종료! (추천: 30칸)
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <p className="text-sm font-medium">⚠️ {error}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold py-3 px-4 rounded-lg hover:from-purple-600 hover:to-pink-700 transform hover:scale-105 transition duration-200 shadow-lg"
          >
            🎁 아이템 경주 시작
          </button>

          <button
            type="button"
            onClick={onShowHistory}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold py-3 px-4 rounded-lg hover:from-yellow-600 hover:to-orange-700 transform hover:scale-105 transition duration-200 shadow-lg"
          >
            🏆 역대 우승자 보기
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">🎮 아이템 모드 규칙</h3>
          <ul className="text-xs text-gray-600 space-y-2">
            <li className="flex items-start">
              <span className="mr-2">⚡</span>
              <span>매 턴마다 랜덤 아이템이 <strong>모든 차</strong>에 적용됩니다</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">🎯</span>
              <span>목표 거리에 <strong>먼저 도달</strong>한 차가 우승!</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">⚠️</span>
              <span><strong>후퇴 가능!</strong> 단, 0 미만으로는 내려가지 않습니다</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">🎲</span>
              <span>아이템: 번개의 호흡(+5), 부스터(+3), 날씨 좋음(+1), 졸음 쉼터(0), 천둥 번개(-1), 타이어 폭탄(-3)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ItemModeInputForm;

