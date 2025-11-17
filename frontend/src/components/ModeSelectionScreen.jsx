import { useNavigate } from 'react-router-dom';

/**
 * 게임 모드 선택 화면 컴포넌트
 * 클래식 모드와 아이템 모드 중 하나를 선택할 수 있습니다.
 */
function ModeSelectionScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* 배경 레이어 */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        {/* 도로 애니메이션 */}
        <div className="absolute inset-0 opacity-20">
          <div className="road-lines"></div>
        </div>
        
        {/* 움직이는 자동차들 */}
        <div className="racing-cars">
          <div className="car car-1">🏎️</div>
          <div className="car car-2">🏁</div>
          <div className="car car-3">🚗</div>
          <div className="car car-4">🚙</div>
        </div>
        
        {/* 반짝이는 별 효과 */}
        <div className="stars">
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
        </div>
        
        {/* 오버레이 */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* 콘텐츠 레이어 */}
      <div className="max-w-2xl w-full relative z-10">
        <h1 className="text-5xl font-bold text-center mb-4 text-white drop-shadow-lg">
          🏎️ 자동차 경주 게임
        </h1>
        <p className="text-center text-gray-200 mb-12 text-lg drop-shadow">
          플레이할 모드를 선택하세요
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 클래식 모드 카드 */}
          <button
            onClick={() => navigate('/classic')}
            className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-center group hover:scale-105"
          >
            <div className="text-6xl mb-4">🏁</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              클래식 모드
            </h2>
            <p className="text-gray-600 leading-relaxed">
              기본 레이싱 게임을 즐겨보세요.
              <br />
              순수한 운으로 승부하는 모드입니다.
            </p>
          </button>

          {/* 아이템 모드 카드 */}
          <button
            onClick={() => navigate('/item')}
            className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-center group hover:scale-105"
          >
            <div className="text-6xl mb-4">🎁</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              아이템 모드
            </h2>
            <p className="text-gray-600 leading-relaxed">
              다양한 아이템으로 더욱 재미있게!
              <br />
              전략적인 플레이를 즐겨보세요.
            </p>
          </button>
        </div>
      </div>

      {/* CSS 애니메이션 스타일 */}
      <style>{`
        @keyframes roadMove {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 100px;
          }
        }

        @keyframes carRace1 {
          0% {
            left: -100px;
            top: 15%;
          }
          100% {
            left: 110%;
            top: 15%;
          }
        }

        @keyframes carRace2 {
          0% {
            left: -100px;
            top: 35%;
          }
          100% {
            left: 110%;
            top: 35%;
          }
        }

        @keyframes carRace3 {
          0% {
            left: -100px;
            top: 60%;
          }
          100% {
            left: 110%;
            top: 60%;
          }
        }

        @keyframes carRace4 {
          0% {
            left: -100px;
            top: 85%;
          }
          100% {
            left: 110%;
            top: 85%;
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        .road-lines {
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            to bottom,
            transparent,
            transparent 40px,
            rgba(255, 255, 255, 0.4) 40px,
            rgba(255, 255, 255, 0.4) 60px
          );
          animation: roadMove 1s linear infinite;
        }

        .racing-cars {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .car {
          position: absolute;
          font-size: 3.5rem;
          filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.6));
        }

        .car-1 {
          animation: carRace1 6s linear infinite;
        }

        .car-2 {
          animation: carRace2 8s linear infinite;
          animation-delay: 2s;
        }

        .car-3 {
          animation: carRace3 7s linear infinite;
          animation-delay: 4s;
        }

        .car-4 {
          animation: carRace4 9s linear infinite;
          animation-delay: 1s;
        }

        .stars {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .star {
          position: absolute;
          width: 3px;
          height: 3px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
          animation: twinkle 2s ease-in-out infinite;
        }

        .star:nth-child(1) {
          top: 20%;
          left: 15%;
          animation-delay: 0s;
        }

        .star:nth-child(2) {
          top: 40%;
          left: 80%;
          animation-delay: 0.5s;
        }

        .star:nth-child(3) {
          top: 70%;
          left: 30%;
          animation-delay: 1s;
        }

        .star:nth-child(4) {
          top: 25%;
          left: 60%;
          animation-delay: 1.5s;
        }

        .star:nth-child(5) {
          top: 80%;
          left: 70%;
          animation-delay: 0.8s;
        }
      `}</style>
    </div>
  );
}

export default ModeSelectionScreen;

