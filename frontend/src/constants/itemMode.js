/**
 * 아이템 모드 상수 및 데이터
 */

export const ITEMS = {
  LIGHTNING_BREATH: {
    id: 'LIGHTNING_BREATH',
    name: '번개의 호흡',
    icon: '⚡',
    effect: 5,
    messages: [
      '번개의 호흡 제 1형 벽력일섬!!!',
      '으아아 못참겠다!!!!!!!!!!!!! 가자!!!!!!!!'
    ]
  },
  BOOSTER: {
    id: 'BOOSTER',
    name: '부스터',
    icon: '🚀',
    effect: 3,
    messages: [
      '부아앙! 부스터 발동!',
      '차 없는거 봐라ㅋㅋ 슝슝!',
      '앞으로 치고 나가기~zz'
    ]
  },
  NICE_WEATHER: {
    id: 'NICE_WEATHER',
    name: '날씨 좋음',
    icon: '☀️',
    effect: 1,
    messages: [
      '날씨 좋네~',
      '무난TV',
      '날이 선선하이 쥑이네~'
    ]
  },
  REST_AREA: {
    id: 'REST_AREA',
    name: '졸음 쉼터',
    icon: '😴',
    effect: 0,
    messages: [
      '졸음 쉼터 zzz',
      '비가 왜이리 많이오냐',
      '차가 좀 막히는걸;;'
    ]
  },
  THUNDER: {
    id: 'THUNDER',
    name: '천둥 번개',
    icon: '⛈️',
    effect: -1,
    messages: [
      '천둥 번개 우르릉 쾅쾅!',
      '으으 급똥;;'
    ]
  },
  TIRE_BOMB: {
    id: 'TIRE_BOMB',
    name: '타이어 폭탄',
    icon: '💣',
    effect: -3,
    messages: [
      '타이어 BOMB',
      '리버스 임펙트~',
      '뒤로뒤로 열매'
    ]
  }
};

// 아이템 배열 (랜덤 선택용)
export const ITEM_LIST = Object.values(ITEMS);

// 아이템 효과에 따른 색상
export const getItemColor = (effect) => {
  if (effect >= 5) return 'text-yellow-400';
  if (effect >= 3) return 'text-blue-400';
  if (effect >= 1) return 'text-green-400';
  if (effect === 0) return 'text-gray-400';
  if (effect >= -1) return 'text-orange-400';
  return 'text-red-400';
};

// 아이템 효과에 따른 배경색
export const getItemBgColor = (effect) => {
  if (effect >= 5) return 'bg-yellow-500/20 border-yellow-500';
  if (effect >= 3) return 'bg-blue-500/20 border-blue-500';
  if (effect >= 1) return 'bg-green-500/20 border-green-500';
  if (effect === 0) return 'bg-gray-500/20 border-gray-500';
  if (effect >= -1) return 'bg-orange-500/20 border-orange-500';
  return 'bg-red-500/20 border-red-500';
};

// 검증 상수
export const VALIDATION = {
  MIN_TARGET_DISTANCE: 10,
  MAX_TARGET_DISTANCE: 100,
  RECOMMENDED_TARGET_DISTANCE: 30,
  MAX_ROUNDS: 200, // 무한 루프 방지
  MIN_CAR_NAME_LENGTH: 1,
  MAX_CAR_NAME_LENGTH: 5
};

