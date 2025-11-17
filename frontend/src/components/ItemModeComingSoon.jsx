/**
 * 아이템 모드 준비중 화면 컴포넌트
 */
function ItemModeComingSoon({ onBack }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-12">
          {/* 뒤로가기 버튼 */}
          <button
            onClick={onBack}
            className="mb-6 flex items-center text-gray-600 hover:text-gray-800 transition"
          >
            <span className="text-xl mr-2">←</span>
            <span className="text-sm font-medium">모드 선택으로 돌아가기</span>
          </button>

          {/* 메인 콘텐츠 */}
          <div className="text-center">
            <div className="text-8xl mb-6 animate-bounce">🎁</div>
            
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              아이템 모드
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              더욱 재미있는 레이싱 게임을 위해<br />
              아이템 모드를 준비중입니다! 🚀
            </p>

            {/* 예정 기능 안내 */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 text-left">
              <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
                🎮 예정된 기능
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-3 text-xl">⚡</span>
                  <span><strong>부스터:</strong> 한 번에 2칸 전진!</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-3 text-xl">🛡️</span>
                  <span><strong>방어막:</strong> 방해 아이템 무효화</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-3 text-xl">🎯</span>
                  <span><strong>타겟 미사일:</strong> 상대방을 1칸 후진시키기</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-3 text-xl">⭐</span>
                  <span><strong>럭키 스타:</strong> 다음 턴 100% 전진</span>
                </li>
              </ul>
            </div>

            {/* 알림 신청 안내 (선택사항) */}
            <div className="mt-8 text-sm text-gray-500">
              조금만 기다려주세요! 곧 만나뵐 수 있습니다 😊
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModeComingSoon;

