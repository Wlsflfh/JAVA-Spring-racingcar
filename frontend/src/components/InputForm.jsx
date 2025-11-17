import { useState } from 'react';

/**
 * 자동차 이름과 시도 횟수를 입력받는 폼 컴포넌트
 */
const InputForm = ({ onStartGame, onShowHistory, error }) => {
  const [carNamesInput, setCarNamesInput] = useState('');
  const [roundCountInput, setRoundCountInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const carNames = carNamesInput.split(',').map(name => name.trim());
    onStartGame(carNames, roundCountInput);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🚗 자동차 경주</h1>
          <p className="text-gray-600">우아한테크코스 레이싱 게임</p>
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
            <p className="mt-1 text-xs text-gray-500">
              * 이름은 5자 이하, 쉼표(,)로 구분해주세요
            </p>
          </div>

          <div>
            <label 
              htmlFor="roundCount" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              시도 횟수
            </label>
            <input
              id="roundCount"
              type="number"
              value={roundCountInput}
              onChange={(e) => setRoundCountInput(e.target.value)}
              placeholder="5"
              min="1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
            <p className="mt-1 text-xs text-gray-500">
              * 1 이상의 자연수를 입력해주세요
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <p className="text-sm font-medium">⚠️ {error}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition duration-200 shadow-lg"
          >
            🏁 경주 시작
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
          <h3 className="text-sm font-semibold text-gray-700 mb-2">게임 규칙</h3>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• 각 자동차는 0~9 사이의 무작위 값을 받습니다</li>
            <li>• 4 이상일 경우 전진, 3 이하는 정지합니다</li>
            <li>• 가장 멀리 이동한 자동차가 우승합니다</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InputForm;


